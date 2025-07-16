import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chatroom, Message, ChatState } from '../types';
import { generateId } from '../lib/utils';

interface ChatStore extends ChatState {
  createChatroom: (title: string) => void;
  deleteChatroom: (id: string) => void;
  setCurrentChatroom: (id: string | null) => void;
  sendMessage: (content: string, image?: string) => void;
  loadMoreMessages: (chatroomId: string) => void;
  setTyping: (isTyping: boolean) => void;
  setSearchQuery: (query: string) => void;
  getFilteredChatrooms: () => Chatroom[];
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      messages: {},
      currentChatroom: null,
      isTyping: false,
      searchQuery: '',
      
      createChatroom: (title: string) => {
        const newChatroom: Chatroom = {
          id: generateId(),
          title,
          createdAt: new Date(),
        };
        
        set((state) => ({
          chatrooms: [newChatroom, ...state.chatrooms],
          messages: {
            ...state.messages,
            [newChatroom.id]: [],
          },
        }));
      },
      
      deleteChatroom: (id: string) => {
        set((state) => {
          const newMessages = { ...state.messages };
          delete newMessages[id];
          
          return {
            chatrooms: state.chatrooms.filter(room => room.id !== id),
            messages: newMessages,
            currentChatroom: state.currentChatroom === id ? null : state.currentChatroom,
          };
        });
      },
      
      setCurrentChatroom: (id: string | null) => {
        set({ currentChatroom: id });
      },
      
      sendMessage: (content: string, image?: string) => {
        const { currentChatroom } = get();
        if (!currentChatroom) return;
        
        const userMessage: Message = {
          id: generateId(),
          content,
          sender: 'user',
          timestamp: new Date(),
          chatroomId: currentChatroom,
          image,
        };
        
        set((state) => ({
          messages: {
            ...state.messages,
            [currentChatroom]: [
              ...(state.messages[currentChatroom] || []),
              userMessage,
            ],
          },
        }));
        
        // Simulate AI response
        set({ isTyping: true });
        setTimeout(() => {
          const aiMessage: Message = {
            id: generateId(),
            content: generateAIResponse(content),
            sender: 'ai',
            timestamp: new Date(),
            chatroomId: currentChatroom,
          };
          
          set((state) => ({
            messages: {
              ...state.messages,
              [currentChatroom]: [
                ...(state.messages[currentChatroom] || []),
                aiMessage,
              ],
            },
            isTyping: false,
          }));
        }, 2000 + Math.random() * 1000); // Throttled response
      },
      
      loadMoreMessages: (chatroomId: string) => {
        // Simulate loading older messages
        const dummyMessages: Message[] = Array.from({ length: 10 }, (_, i) => ({
          id: generateId(),
          content: `Older message ${i + 1}`,
          sender: i % 2 === 0 ? 'user' : 'ai',
          timestamp: new Date(Date.now() - (i + 1) * 3600000),
          chatroomId,
        }));
        
        set((state) => ({
          messages: {
            ...state.messages,
            [chatroomId]: [
              ...dummyMessages,
              ...(state.messages[chatroomId] || []),
            ],
          },
        }));
      },
      
      setTyping: (isTyping: boolean) => {
        set({ isTyping });
      },
      
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },
      
      getFilteredChatrooms: () => {
        const { chatrooms, searchQuery } = get();
        if (!searchQuery) return chatrooms;
        
        return chatrooms.filter(room =>
          room.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);

const generateAIResponse = (userMessage: string): string => {
  const responses = [
    "That's an interesting question! Let me think about that.",
    "I understand what you're asking. Here's my perspective:",
    "Thanks for sharing that with me. I'd be happy to help.",
    "That's a great point. Let me elaborate on that topic.",
    "I can definitely help you with that. Here's what I know:",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};