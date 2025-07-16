"use client";

import { useParams } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { ChatInterface } from "../../../components/chat/ChatInterface";
import { useChatStore } from "../../../store/chatStore";

export default function ChatPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { chatrooms } = useChatStore();

  // const chatroom = chatrooms.find((room) => room.id === id);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col h-full">
        {/* Mobile Header */}
        {/* <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 md:hidden">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {chatroom?.title}
          </h1>
        </div> */}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col p-2 md:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 h-full flex flex-col">
            {/* Desktop Header */}
            {/* <div className="hidden md:flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                {chatroom?.title}
              </h1>
            </div> */}

            <ChatInterface chatroomId={id as string} />
          </div>
        </div>
      </div>
    </div>
  );
}
