import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  token?: string;
  setToken: (token: string | undefined) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token) => set(() => ({ token })),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
