import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { Sidebar } from './components';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../stores';
import { UsersService } from '../services';
import { useEffect } from 'react';
import { handleAxiosError } from '../helpers';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.authContext.isAuthenticated) {
      throw redirect({ to: '/sign-in', search: { next: location.href } });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const { data, error, isPending } = useQuery({
    queryKey: ['token'],
    queryFn: () => {
      return UsersService.getMyProfile();
    },
  });

  useEffect(() => {
    if (error) {
      handleAxiosError(error, (message) => toast.error(message));
      navigate({ to: '/' });
      return;
    }

    if (data) {
      setUser(data.data);
    }
  }, [data, error, navigate, setUser]);

  return (
    <div className="w-dvw h-dvh p-5 flex flex-row gap-5 bg-[#F0F2F3]">
      <Sidebar />
      <div className="relative h-full w-full p-5 overflow-y-scroll no-scrollbar">
        {isPending ? (
          <div className="w-full h-full flex items-center justify-center">
            Loading...
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
