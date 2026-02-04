import { create } from 'zustand';
import { User } from './types';

type UserState = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
