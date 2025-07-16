'use client';

import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';
import { LogOut, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <MessageCircle className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">Gemini Clone</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user.countryCode} {user.phone}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};