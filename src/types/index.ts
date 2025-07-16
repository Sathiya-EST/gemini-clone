export interface User {
  id: string;
  phone: string;
  countryCode: string;
  isAuthenticated: boolean;
}

export interface Country {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  flag: string;
}

export interface Chatroom {
  id: string;
  title: string;
  createdAt: Date;
  lastMessage?: string;
  lastMessageAt?: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  chatroomId: string;
  image?: string;
}

export interface ChatState {
  chatrooms: Chatroom[];
  messages: Record<string, Message[]>;
  currentChatroom: string | null;
  isTyping: boolean;
  searchQuery: string;
}