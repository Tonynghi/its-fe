import { useForm } from '@tanstack/react-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';
import { handleAxiosError } from '../../../helpers';
import {
  LearningContentsService,
  SubjectsService,
  TopicsService,
} from '../../../services';
import { useRef, useState } from 'react';
import { useUserStore } from '../../../stores';
import classNames from 'classnames';

export const Route = createFileRoute('/_layout/create-content/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.authContext.isManager) {
      throw redirect({ to: '/learning-contents' });
    }
  },
});

function RouteComponent() {
  const uploadRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { user } = useUserStore();

  const [subjectId, setSubjectId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [topicIds, setTopicIds] = useState<Array<string>>([]);

  const handleUploadClick = () => uploadRef.current?.click();
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const { data: subjectData } = useQuery({
    queryKey: ['subject'],
    queryFn: () => {
      return SubjectsService.getAllSubjects({ currentPage: 1, pageSize: 100 });
    },
  });

  const { data: topicData, refetch } = useQuery({
    queryKey: ['topics', subjectId],
    queryFn: () => {
      return TopicsService.getAllTopics({
        currentPage: 1,
        pageSize: 100,
        subjectId,
      });
    },
    enabled: false,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({
      name,
      description,
    }: {
      name: string;
      description: string;
    }) => {
      if (!subjectId) {
        throw new Error('You must choose a subject for this content first!');
      }
      if (!file) {
        throw new Error('You must upload a file first!');
      }
      if (!user) {
        throw new Error(
          'No user specified to use this feature! Please log in first!',
        );
      }
      const { data } = await LearningContentsService.getUploadUrl({
        fileName: file.name,
        mimeType: file.type,
        subjectId,
      });
      const { presignedUrl, bucket, objectName } = data;
      await LearningContentsService.uploadToGoogleCloud(file, presignedUrl);
      return LearningContentsService.postContent({
        name,
        subjectId,
        description,
        topicIds,
        bucket,
        objectName,
        userId: user._id,
      });
    },
    onSuccess: ({ data }) => {
      toast.success(`New learning content ${data.name} has been created!`);
      navigate({ to: '/learning-contents' });
    },
    onError: (error) => {
      handleAxiosError(error, (message) => toast.error(message));
    },
  });

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    onSubmit: async ({ value }) => {
      if (!value.name) {
        toast.error('You must enter subject name');
        return;
      }
      await mutateAsync({
        name: value.name,
        description: value.description,
      });
    },
  });
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Upload a new learning content</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-row gap-4 w-full items-start">
          <label className="py-2 font-bold w-24">Name:</label>
          <form.Field
            name="name"
            children={(field) => (
              <div className="border border-tertiary w-full px-4 py-2 rounded-lg flex flex-row gap-4 items-center">
                <input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Enter content name..."
                  className="outline-none w-full"
                />
              </div>
            )}
          />
        </div>
        <div className="flex flex-row gap-4 w-full items-start">
          <label className="py-2 font-bold w-24">Subject:</label>

          <select
            value={subjectId}
            onChange={(e) => {
              setTopicIds([]);
              refetch();
              setSubjectId(e.target.value);
            }}
            id={'subjectId'}
            name={'subjectId'}
            className="border w-full border-tertiary px-4 py-2 rounded-lg flex flex-row gap-4 items-center appearance-none focus:border-primary focus:ring-primary"
          >
            <option value={''}>No subject chosen</option>
            {(subjectData?.data.results || []).map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        {subjectId && (
          <div className="flex flex-row gap-4 w-full items-start">
            <label className="py-2 font-bold w-24">Topics:</label>
            <div className="flex flex-row relative flex-wrap gap-2">
              {(topicData?.data.results || []).map((topic) => {
                const selected = topicIds.includes(topic._id);

                return (
                  <div
                    key={topic._id}
                    onClick={() => {
                      if (selected) {
                        setTopicIds((curr) =>
                          curr.filter((value) => value !== topic._id),
                        );
                      } else {
                        setTopicIds((curr) => curr.concat([topic._id]));
                      }
                    }}
                    className={classNames(
                      'rounded-lg px-4 py-2 text-white cursor-pointer duration-200 ease-in-out',
                      selected
                        ? 'bg-primary hover:bg-primary-700'
                        : 'bg-tertiary hover:bg-tertiary-700',
                    )}
                  >
                    {topic.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-row gap-4 w-full items-start">
          <label className="py-2 font-bold w-24">Description:</label>
          <form.Field
            name="description"
            children={(field) => (
              <div className="border border-tertiary w-full px-4 py-2 rounded-lg flex flex-row gap-4 items-center">
                <textarea
                  rows={5}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  id={field.name}
                  name={field.name}
                  placeholder="Enter content description (Optional)..."
                  className="outline-none w-full"
                />
              </div>
            )}
          />
        </div>
        <div className="flex flex-row gap-4 w-full items-center">
          <label className="py-2 font-bold w-24">File:</label>
          <div
            onClick={handleUploadClick}
            className={classNames(
              'border cursor-pointer hover:border-primary duration-200 ease-in-out border-tertiary rounded-lg flex items-center justify-center px-4 py-2 w-full',
              file ? '' : 'border-dashed',
            )}
          >
            {file ? (
              <div className="flex flex-row justify-between w-full">
                <div>{file.name}</div>
                <div>{file.type}</div>
              </div>
            ) : (
              <span>Click to upload file</span>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-4 w-full justify-end items-center">
          <button
            type="button"
            onClick={() => navigate({ to: '/learning-contents' })}
            className="text-primary border-primary border px-4 py-2 font-bold bg-none rounded-lg cursor-pointer hover:bg-primary hover:text-white ease-in-out duration-200"
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            type="submit"
            className="bg-primary px-4 py-2 font-bold text-white rounded-lg cursor-pointer hover:bg-primary-700 ease-in-out duration-200"
          >
            Create
          </button>
        </div>
      </form>
      <input
        ref={uploadRef}
        type="file"
        className="hidden"
        onChange={handleUploadFile}
      />
    </div>
  );
}
