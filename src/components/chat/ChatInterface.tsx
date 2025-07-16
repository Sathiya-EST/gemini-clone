'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '../../store/chatStore';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { scrollToBottom } from '../../lib/utils';

interface ChatInterfaceProps {
  chatroomId: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatroomId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isTyping, setCurrentChatroom } = useChatStore();
  
  const chatMessages = messages[chatroomId] || [];

  useEffect(() => {
    setCurrentChatroom(chatroomId);
    return () => setCurrentChatroom(null);
  }, [chatroomId, setCurrentChatroom]);

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom(messagesEndRef.current.parentElement!);
    }
  }, [chatMessages, isTyping]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={chatMessages} chatroomId={chatroomId} />
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <MessageInput />
      </div>
    </div>
  );
};