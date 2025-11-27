import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  EyeClosedIcon,
  EyeIcon,
  LockKeyholeIcon,
  MailIcon,
} from 'lucide-react';
import { useState } from 'react';
import handleAxiosError from '../../helpers/handle-axios-error';
import { toast } from 'react-toastify';
import { AuthService, type SignInRequest } from '../../services/auth';

export const Route = createFileRoute('/sign-in/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ email, password }: SignInRequest) => {
      return AuthService.signIn({ email, password });
    },
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.accessToken);
    },
    onError: (error) => {
      handleAxiosError(error, (message) => toast.error(message));
    },
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  return (
    <div className="w-dvw h-dvh flex flex-row justify-between gap-20 p-10">
      <img
        src="sign-in-bg.jpg"
        className="h-full relative w-120 object-cover rounded-lg"
      />
      <div className="flex flex-col h-full justify-center gap-4 items-center w-120 mr-40">
        <h1 className="font-bold text-2xl">Sign in</h1>
        <div>Sign in now to start your journey</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col w-full gap-4"
        >
          <form.Field
            name="email"
            children={(field) => (
              <div className="border border-tertiary px-4 py-2 rounded-lg flex flex-row gap-4 items-center">
                <MailIcon />
                <input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="Enter your email..."
                  className="outline-none w-full"
                />
              </div>
            )}
          ></form.Field>
          <form.Field
            name="password"
            children={(field) => (
              <div className="border border-tertiary px-4 py-2 rounded-lg flex flex-row gap-4 items-center">
                <LockKeyholeIcon />
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password..."
                  className="outline-none w-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword((value) => !value);
                  }}
                  className="cursor-pointer aspect-square flex items-center justify-center h-full rounded-full bg-none hover:bg-tertiary-300 ease-in-out duration-200"
                >
                  {showPassword ? (
                    <EyeClosedIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
                </button>
              </div>
            )}
          ></form.Field>

          <button
            disabled={isPending}
            type="submit"
            className="bg-primary px-4 py-2 w-full font-bold text-white rounded-lg cursor-pointer hover:bg-primary-700 ease-in-out duration-200"
          >
            Sign in
          </button>
          <div className="text-center">
            Don't have an account yet? Sign up{' '}
            <button
              type="button"
              onClick={() => {}}
              className="text-primary hover:text-primary-700 underline ease-in-out duration-200 cursor-pointer"
            >
              here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
