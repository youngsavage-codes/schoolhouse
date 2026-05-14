import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  email: string;
  role: 'admin' | 'teacher' | 'parent';
  isActive: boolean;
  isEmailVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
};

interface UserState {
  user: User | null;
  isAuthenticated: boolean;

  // actions
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // ✅ set user after login/signup
      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      // ✅ logout
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      // ✅ update partial user (e.g. verify email)
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);