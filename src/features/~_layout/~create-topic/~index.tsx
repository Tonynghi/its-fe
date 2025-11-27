import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';
import { handleAxiosError } from '../../../helpers';
import {
  type CreateTopicRequest,
  SubjectsService,
  TopicsService,
} from '../../../services';

export const Route = createFileRoute('/_layout/create-topic/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { data: subjectData } = useQuery({
    queryKey: [],
    queryFn: () => {
      return SubjectsService.getAllSubjects({ currentPage: 1, pageSize: 100 });
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({
      name,
      subjectId,
      description,
      tags,
    }: CreateTopicRequest) => {
      return TopicsService.createTopic({ name, subjectId, description, tags });
    },
    onSuccess: ({ data }) => {
      toast.success(`New topic ${data.name} has been created!`);
      navigate({ to: '/manage-contents' });
    },
    onError: (error) => {
      handleAxiosError(error, (message) => toast.error(message));
    },
  });

  const form = useForm({
    defaultValues: {
      name: '',
      subjectId: '',
      description: '',
      tags: '',
    },
    onSubmit: async ({ value }) => {
      if (!value.name) {
        toast.error('You must enter subject name');
        return;
      }
      if (!value.subjectId || value.subjectId === '') {
        toast.error('You must enter subject name');
        return;
      }
      await mutateAsync({
        name: value.name,
        description: value.description,
        subjectId: value.subjectId,
        tags: value.tags.trim().split(','),
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Create a new topic</h1>
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
                  placeholder="Enter topic name..."
                  className="outline-none w-full"
                />
              </div>
            )}
          />
        </div>
        <div className="flex flex-row gap-4 w-full items-start">
          <label className="py-2 font-bold w-24">Subject:</label>
          <form.Field
            name="subjectId"
            children={(field) => (
              <select
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                id={field.name}
                name={field.name}
                className="border w-full border-tertiary px-4 py-2 rounded-lg flex flex-row gap-4 items-center appearance-none focus:border-primary focus:ring-primary"
              >
                <option value={''}>No subject chosen</option>
                {(subjectData?.data.results || []).map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
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
                  placeholder="Enter topic description (Optional)..."
                  className="outline-none w-full"
                />
              </div>
            )}
          />
        </div>
        <div className="flex flex-row gap-4 w-full items-start">
          <label className="py-2 font-bold w-24">Tags:</label>
          <form.Field
            name="tags"
            children={(field) => (
              <div className="border border-tertiary w-full px-4 py-2 rounded-lg flex flex-row gap-4 items-center">
                <input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Enter tags for the topic, separated by comma..."
                  className="outline-none w-full"
                />
              </div>
            )}
          />
        </div>
        <div className="flex flex-row gap-4 w-full justify-end items-center">
          <button
            type="button"
            onClick={() => navigate({ to: '/manage-contents' })}
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
    </div>
  );
}
