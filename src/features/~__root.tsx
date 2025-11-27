import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';

type RouterContext = {
  authContext: { isAuthenticated: boolean; isManager: boolean };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Suspense></Suspense>
    </>
  );
}
