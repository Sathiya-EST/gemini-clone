// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Message } from "../../types";
// import { MessageComponent } from "./Message";
// import { useChatStore } from "../../store/chatStore";
// import { LoadingSkeleton } from "../common/LoadingSkeleton";

// interface MessageListProps {
//   messages: Message[];
//   chatroomId: string;
// }

// export const MessageList: React.FC<MessageListProps> = ({
//   messages,
//   chatroomId,
// }) => {
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const { loadMoreMessages } = useChatStore();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { updateMessage, deleteMessage } = useChatStore();

//   const handleScroll = () => {
//     if (containerRef.current) {
//       const { scrollTop } = containerRef.current;
//       if (scrollTop === 0 && !isLoadingMore) {
//         setIsLoadingMore(true);
//         setTimeout(() => {
//           loadMoreMessages(chatroomId);
//           setIsLoadingMore(false);
//         }, 1000);
//       }
//     }
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener("scroll", handleScroll);
//       return () => container.removeEventListener("scroll", handleScroll);
//     }
//   }, [chatroomId, handleScroll]);

//   return (
//     <div ref={containerRef} className="space-y-4">
//       {isLoadingMore && (
//         <div className="flex justify-center py-4">
//           <LoadingSkeleton />
//         </div>
//       )}

//       {messages.map((message) => (
//         <MessageComponent
//           key={message.id}
//           message={message}
//           onUpdateMessage={(messageId, newContent) =>
//             updateMessage(message.chatroomId, messageId, newContent)
//           }
//           onDeleteMessage={(messageId) =>
//             deleteMessage(message.chatroomId, messageId)
//           }
//         />
//       ))}

//       {messages.length === 0 && (
//         <div className="text-center text-gray-500 py-8">
//           <p>No messages yet. Start a conversation!</p>
//         </div>
//       )}
//     </div>
//   );
// };

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Message } from "../../types";
import { MessageComponent } from "./Message";
import { useChatStore } from "../../store/chatStore";
import { LoadingSkeleton } from "../common/LoadingSkeleton";
import { throttle } from "@/lib/utils";

interface MessageListProps {
  messages: Message[];
  chatroomId: string;
}

const INITIAL_PAGE_SIZE = 20;

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  chatroomId,
}) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { updateMessage, deleteMessage } = useChatStore();

  const visibleMessages = messages.slice(-visibleCount);

  const loadMore = () => {
    if (!isLoadingMore && visibleCount < messages.length) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 20, messages.length));
        setIsLoadingMore(false);
      }, 500);
    }
  };

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current;
      if (scrollTop === 0) {
        loadMore();
      }
    }
  }, [loadMore]);

  const throttledHandleScroll = useCallback(throttle(handleScroll, 300), [
    handleScroll,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", throttledHandleScroll);
      return () =>
        container.removeEventListener("scroll", throttledHandleScroll);
    }
  }, [throttledHandleScroll]);

  useEffect(() => {
    setVisibleCount(INITIAL_PAGE_SIZE);
  }, [chatroomId]);

  return (
    <div
      ref={containerRef}
      className="space-y-4 overflow-y-auto overflow-x-hidden h-full"
    >
      {isLoadingMore && (
        <div className="flex justify-center py-4">
          <LoadingSkeleton />
        </div>
      )}

      {visibleMessages.map((message) => (
        <MessageComponent
          key={message.id}
          message={message}
          onUpdateMessage={(messageId, newContent) =>
            updateMessage(message.chatroomId, messageId, newContent)
          }
          onDeleteMessage={(messageId) =>
            deleteMessage(message.chatroomId, messageId)
          }
        />
      ))}

      {messages.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No messages yet. Start a conversation!</p>
        </div>
      )}
    </div>
  );
};
