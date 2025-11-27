import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { handleAxiosError } from '../../../helpers';
import { toast } from 'react-toastify';
import { SubjectsService, type CreateSubjectRequest } from '../../../services';

export const Route = createFileRoute('/_layout/create-subject/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ name, description }: CreateSubjectRequest) => {
      return SubjectsService.createSubject({ name, description });
    },
    onSuccess: ({ data }) => {
      toast.success(`New subject ${data.name} has been created!`);
      navigate({ to: '/manage-contents' });
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
      await mutateAsync(value);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Create a new subject</h1>
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
                  placeholder="Enter subject name..."
                  className="outline-none w-full"
                />
              </div>
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
                  placeholder="Enter subject description (Optional)..."
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
