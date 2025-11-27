import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import {
  EyeClosedIcon,
  EyeIcon,
  LockKeyholeIcon,
  MailIcon,
  UserIcon,
} from 'lucide-react';
import { useState } from 'react';
import { handleAxiosError } from '../../helpers';
import { toast } from 'react-toastify';
import { AuthService, type SignUpRequest } from '../../services';
import { Role } from '../../types';
import { useAuthStore } from '../../stores';
import { z } from 'zod';

export const Route = createFileRoute('/sign-up/')({
  validateSearch: (search) =>
    z
      .object({
        next: z.string().optional().catch(''),
      })
      .parse(search),
  component: RouteComponent,
  beforeLoad: ({ context, search }) => {
    if (context.authContext.isAuthenticated) {
      throw redirect({ to: search.next || '/learning-contents' });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useAuthStore();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (request: SignUpRequest) => {
      return AuthService.signUp(request);
    },
    onSuccess: ({ data }) => {
      setToken(data.accessToken);
      navigate({ to: '/learning-contents' });
    },
    onError: (error) => {
      setToken(undefined);
      handleAxiosError(error, (message) => toast.error(message));
    },
  });

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: Role.STUDENT,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  const roleOptions = [
    {
      label: 'Student',
      value: Role.STUDENT,
    },
    {
      label: 'Tutor',
      value: Role.TUTOR,
    },
  ];

  return (
    <div className="w-dvw h-dvh flex flex-row justify-between gap-20 p-10">
      <img
        src="sign-up-bg.webp"
        className="h-full relative w-120 object-cover rounded-lg"
      />
      <div className="flex flex-col h-full justify-center gap-4 items-center w-120 mr-40">
        <h1 className="font-bold text-2xl">Sign up</h1>
        <div>Create an account and begin your study now</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col w-full gap-4"
        >
          <form.Field
            name="name"
            children={(field) => (
              <div className="border border-tertiary px-4 py-2 rounded-lg flex flex-row gap-4 items-center">
                <UserIcon />
                <input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Enter your name..."
                  className="outline-none w-full"
                />
              </div>
            )}
          />
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
          />
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
          />
          <form.Field
            name="role"
            children={(field) => (
              <div className="flex flex-row gap-4 items-center">
                <label className="font-bold">Role:</label>
                <select
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value as Role)}
                  id={field.name}
                  name={field.name}
                  className="border w-full border-tertiary px-4 py-2 rounded-lg flex flex-row gap-4 items-center appearance-none focus:border-primary focus:ring-primary"
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
          <button
            disabled={isPending}
            type="submit"
            className="bg-primary px-4 py-2 w-full font-bold text-white rounded-lg cursor-pointer hover:bg-primary-700 ease-in-out duration-200"
          >
            Sign up
          </button>
          <div className="text-center">
            Already have an account? Sign in{' '}
            <button
              type="button"
              onClick={() => {
                navigate({ to: '/sign-in' });
              }}
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
