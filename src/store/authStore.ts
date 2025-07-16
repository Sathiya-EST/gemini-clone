import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { generateId } from '@/lib/utils';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (phone: string, countryCode: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      login: async (phone: string, countryCode: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ isLoading: false });
      },
      verifyOTP: async (otp: string) => {
        set({ isLoading: true });
        // Simulate OTP verification
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (otp === '123456') {
          set({
            user: {
              id: generateId(),
              phone: '1234567890',
              countryCode: '+1',
              isAuthenticated: true,
            },
            isLoading: false,
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);