"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { usePathname } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const currentChatroomId = pathname?.startsWith("/chat/")
    ? pathname.split("/chat/")[1]
    : undefined;

  const shouldShowSidebar =
    pathname === "/dashboard" ||
    pathname?.startsWith("/chat/") ||
    pathname?.startsWith("/search");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Sidebar - Only show on dashboard and chat pages */}
            {shouldShowSidebar && (
              <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                currentChatroomId={currentChatroomId}
                isMobileOpen={isMobileSidebarOpen}
                onMobileToggle={() =>
                  setIsMobileSidebarOpen(!isMobileSidebarOpen)
                }
              />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <Header
                onMobileSidebarToggle={
                  shouldShowSidebar
                    ? () => setIsMobileSidebarOpen(!isMobileSidebarOpen)
                    : undefined
                }
                showMobileMenuButton={shouldShowSidebar}
              />

              {/* Main Content */}
              <main className="flex-1">{children}</main>
            </div>
          </div>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
