'use client';

import { useEffect, useRef, useState } from 'react';
import { Message } from '../../types';
import { MessageComponent } from './Message';
import { useChatStore } from '../../store/chatStore';
import { LoadingSkeleton } from '../common/LoadingSkeleton';

interface MessageListProps {
  messages: Message[];
  chatroomId: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, chatroomId }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { loadMoreMessages } = useChatStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current;
      if (scrollTop === 0 && !isLoadingMore) {
        setIsLoadingMore(true);
        setTimeout(() => {
          loadMoreMessages(chatroomId);
          setIsLoadingMore(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [chatroomId]);

  return (
    <div ref={containerRef} className="space-y-4">
      {isLoadingMore && (
        <div className="flex justify-center py-4">
          <LoadingSkeleton />
        </div>
      )}
      
      {messages.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
      
      {messages.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No messages yet. Start a conversation!</p>
        </div>
      )}
    </div>
  );
};