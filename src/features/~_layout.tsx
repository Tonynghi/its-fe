import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Sidebar } from './components';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.authContext.isAuthenticated) {
      throw redirect({ to: '/sign-in', search: { next: location.href } });
    }
  },
});

function RouteComponent() {
  return (
    <div className="w-dvw h-dvh p-5 flex flex-row gap-10 bg-[#F0F2F3]">
      <Sidebar />
      <div className="relative h-full w-full p-5 overflow-y-scroll no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
