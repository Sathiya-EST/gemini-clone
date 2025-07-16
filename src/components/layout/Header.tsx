"use client";

import { useAuthStore } from "../../store/authStore";
import { Button } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut, MessageCircle, Menu, X } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface HeaderProps {
  onMobileSidebarToggle?: () => void;
  showMobileMenuButton?: boolean;
  isMobileSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onMobileSidebarToggle,
  showMobileMenuButton = false,
  isMobileSidebarOpen = false,
}) => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Mobile menu button + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle button */}
            {showMobileMenuButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMobileSidebarToggle}
                className="md:hidden p-2"
                aria-label="Toggle sidebar"
              >
                {isMobileSidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}

            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100 hidden sm:block">
                Gemini Clone
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            {user && (
              <div className="flex items-center gap-2">
                {/* User info - hidden on very small screens */}
                <div className="hidden sm:block">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.countryCode} {user.phone}
                  </span>
                </div>

                {/* Mobile user info - show only phone number */}
                <div className="sm:hidden">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {user.phone}
                  </span>
                </div>

                {/* Logout button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 p-2"
                  aria-label="Logout"
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
