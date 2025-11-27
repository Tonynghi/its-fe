import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore, useUserStore } from '../stores';
import { Role } from '../types';
import { ToastContainer } from 'react-toastify';

const router = createRouter({
  routeTree,
  context: {
    authContext: { isAuthenticated: false, isManager: false },
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const AppRouter = () => {
  const { token } = useAuthStore();
  const { user } = useUserStore();

  return (
    <RouterProvider
      router={router}
      context={{
        authContext: {
          isAuthenticated: !!token,
          isManager: user?.role === Role.TUTOR,
        },
      }}
    />
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
