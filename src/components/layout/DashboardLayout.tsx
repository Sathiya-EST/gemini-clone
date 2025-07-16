'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../hooks/useAuth';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentChatroomId?: string;
}

export function DashboardLayout({ children, currentChatroomId }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}