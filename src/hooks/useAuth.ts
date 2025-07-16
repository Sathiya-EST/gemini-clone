import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';

export const useAuth = (requireAuth = true) => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !user?.isAuthenticated) {
      router.push('/auth');
    } else if (!requireAuth && user?.isAuthenticated) {
      router.push('/dashboard');
    }
  }, [user, requireAuth, router]);

  return { user, isAuthenticated: user?.isAuthenticated || false };
};
