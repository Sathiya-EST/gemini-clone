'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

export default function HomePage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <LoadingSkeleton />
    </div>
  );
}
