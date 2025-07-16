"use client";

import { useEffect, useMemo, useRef } from "react";
import { useChatStore } from "../../store/chatStore";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";
import { scrollToBottom } from "../../lib/utils";

interface ChatInterfaceProps {
  chatroomId: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatroomId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { messages, isTyping, setCurrentChatroom } = useChatStore();

  const chatMessages = useMemo(() => {
    return messages[chatroomId] || [];
  }, [messages, chatroomId]);

  useEffect(() => {
    setCurrentChatroom(chatroomId);
    return () => setCurrentChatroom(null);
  }, [chatroomId, setCurrentChatroom]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      scrollToBottom(messagesContainerRef.current);
    }
  }, [chatMessages, isTyping]);

  return (
    <div className="flex flex-col min-h-[85vh]">
      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto min-h-0 scroll-smooth"
        style={{
          scrollBehavior: "smooth",
          overflowAnchor: "none",
        }}
      >
        <div className="max-w-4xl min-h-[20vh] max-h-[70vh] overflow-x-hidden mx-auto px-4 py-6">
          <MessageList messages={chatMessages} chatroomId={chatroomId} />
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};
