'use client';

import { useAuth } from '../../hooks/useAuth';
import { ChatroomList } from '../../components/dashboard/ChatroomList';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ChatroomList />
    </div>
  );
}
