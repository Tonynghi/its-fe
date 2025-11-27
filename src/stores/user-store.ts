import { create } from 'zustand';
import type { User } from '../types';

type UserStore = {
  user?: User;
  setUser: (user: User | undefined) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user })),
}));
