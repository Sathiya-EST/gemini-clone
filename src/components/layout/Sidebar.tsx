"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChatStore } from "../../store/chatStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  MessageSquare,
  MoreHorizontal,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  X,
  Menu,
  SquarePen,
  Search,
  MenuIcon,
} from "lucide-react";

import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { CreateChatroom } from "../dashboard/CreateChatroom";
import toast from "react-hot-toast";
import Link from "next/link";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentChatroomId?: string;
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
}

export function Sidebar({
  isCollapsed,
  onToggle,
  currentChatroomId,
  isMobileOpen = false,
  onMobileToggle,
}: SidebarProps) {
  const router = useRouter();
  const { chatrooms, deleteChatroom, renameChatroom } = useChatStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCreateChat = (id: string) => {
    // setShowCreateForm(false);
    toast.success("Chatroom created successfully");
    router.push(`/chat/${id}`);
    if (isMobile && onMobileToggle) {
      onMobileToggle();
    }
  };

  const handleChatroomClick = (id: string) => {
    if (editingId !== id) {
      router.push(`/chat/${id}`);
      if (isMobile && onMobileToggle) {
        onMobileToggle();
      }
    }
  };

  const handleDeleteChatroom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this chatroom?")) {
      deleteChatroom(id);
      toast.success("Chatroom deleted successfully");
      if (currentChatroomId === id) {
        router.push("/dashboard");
      }
    }
  };

  const handleRenameChatroom = (id: string, currentTitle: string) => {
    setEditingId(id);
    setNewTitle(currentTitle);
  };

  const handleSaveRename = (
    id: string,
    e: React.MouseEvent | React.KeyboardEvent
  ) => {
    e.stopPropagation();
    if (newTitle.trim() === "") {
      toast.error("Chatroom title cannot be empty.");
      return;
    }
    renameChatroom(id, newTitle.trim());
    setEditingId(null);
    setNewTitle("");
    toast.success("Chatroom renamed successfully!");
  };

  const handleCancelRename = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setEditingId(null);
    setNewTitle("");
  };

  const MobileOverlay = () => (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-200",
        isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onMobileToggle}
    />
  );

  const isExpanded = !isCollapsed || isMobile;

  return (
    <>
      <MobileOverlay />

      <div
        className={cn(
          "bg-gray-50/95 h-full dark:bg-gray-900/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800 transition-all duration-200 flex flex-col z-50",
          // Desktop positioning and sizing
          "md:relative md:translate-x-0",
          isCollapsed ? "md:w-16" : "md:w-64",
          // Mobile positioning and sizing
          "fixed left-0 top-0 w-80 max-w-[85vw] sm:w-72 sm:max-w-[80vw]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-4 dark:border-gray-800/60  backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {/* {isExpanded && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Chats
              </h2>
            )} */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className={cn(
                "h-8 w-8 p-0 hidden md:flex hover:bg-gray-200 dark:hover:bg-gray-700",
                isCollapsed ? "ml-auto" : ""
              )}
            >
              <MenuIcon className="h-4 w-4" />
            </Button>
            {!isCollapsed && (
              <Link href="/search">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Search className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileToggle}
              className="h-8 w-8 p-0 md:hidden hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Desktop collapse/expand button */}
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className={cn(
                "h-8 w-8 p-0 hidden md:flex hover:bg-gray-200 dark:hover:bg-gray-700",
                isCollapsed ? "ml-auto" : ""
              )}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button> */}
          </div>

          {/* New Chat Button */}
          <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "flex items-center w-full mt-4 justify-center",
                  "bg-transparent border-none transition-colors duration-200",
                  isCollapsed && !isMobile
                    ? "p-0 h-10 w-10 min-w-0"
                    : "px-4 py-2"
                )}
              >
                <SquarePen
                  className={cn("h-4 w-4", isExpanded ? "mr-2" : "")}
                />
                {isExpanded && <span className="font-medium">New Chat</span>}
              </Button>
            </DialogTrigger>
            <CreateChatroom
              onClose={() => setShowCreateForm(false)}
              onSuccess={(id) => {
                handleCreateChat(id);
              }}
            />
          </Dialog>
        </div>

        {/* Chat List - Only render when expanded */}
        {isExpanded && (
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
              <div className="p-2 space-y-1">
                <p className="text-sm text-slate-400">Recent</p>
                <div className="max-h-[60vh] overflow-y-auto  overflow-x-hidden [&::-webkit-scrollbar]:hidden hover:[&::-webkit-scrollbar]:block [-ms-overflow-style:none] hover:[-ms-overflow-style:auto] [scrollbar-width:none] hover:[scrollbar-width:auto]">
                  {chatrooms.map((chatroom) => (
                    <div
                      key={chatroom.id}
                      className={cn(
                        "group  relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer transition-all duration-200 hover:scale-[1.01]",
                        currentChatroomId === chatroom.id
                          ? "bg-blue-100/80 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 shadow-sm border border-blue-200 dark:border-blue-800"
                          : "hover:bg-gray-100/80 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300"
                      )}
                      onClick={() => handleChatroomClick(chatroom.id)}
                    >
                      {/* <MessageSquare className="h-4 w-4 flex-shrink-0" /> */}

                      {editingId === chatroom.id ? (
                        <div className="flex-1 flex items-center space-x-1">
                          <Input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSaveRename(chatroom.id, e);
                              } else if (e.key === "Escape") {
                                handleCancelRename(e);
                              }
                            }}
                            className="h-7 text-sm px-2 py-1 flex-1 min-w-0 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                            autoFocus
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-green-100 dark:hover:bg-green-900/30"
                            onClick={(e) => handleSaveRename(chatroom.id, e)}
                          >
                            <Check className="h-3 w-3 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
                            onClick={(e) => handleCancelRename(e)}
                          >
                            <X className="h-3 w-3 text-red-600" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 truncate min-w-0">
                            <div className="truncate font-medium text-sm">
                              {chatroom.title}
                            </div>
                            {/* <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                            {new Date(chatroom?.createdAt).toLocaleDateString()}
                          </div> */}
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 flex-shrink-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRenameChatroom(
                                    chatroom.id,
                                    chatroom.title
                                  );
                                }}
                                className="cursor-pointer"
                              >
                                <Edit2 className="h-4 w-4 mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) =>
                                  handleDeleteChatroom(chatroom.id, e)
                                }
                                className="text-red-600 dark:text-red-400 cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {chatrooms.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No chats yet</p>
                    <p className="text-xs mt-1">Start a new conversation</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Collapsed state indicator */}
        {/* {isCollapsed && !isMobile && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-6 w-6 mx-auto text-gray-400 dark:text-gray-600" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mx-auto mt-2"></div>
            </div>
          </div>
        )} */}

        {isExpanded && (
          <div className="p-4 border-t border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
              <span>
                {chatrooms.length} {chatrooms.length === 1 ? "chat" : "chats"}
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
