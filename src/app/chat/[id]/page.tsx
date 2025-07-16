'use client';

import { useParams } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { ChatInterface } from '../../../components/chat/ChatInterface';
import { useChatStore } from '../../../store/chatStore';
import { Button } from '../../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { chatrooms } = useChatStore();
  
  const chatroom = chatrooms.find(room => room.id === id);

  if (!isAuthenticated) {
    return null;
  }

  if (!chatroom) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Chatroom not found</p>
        <Link href="/dashboard">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border h-[70vh] flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">{chatroom.title}</h1>
        </div>
        
        <ChatInterface chatroomId={id as string} />
      </div>
    </div>
  );
}