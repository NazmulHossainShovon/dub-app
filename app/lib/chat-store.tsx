'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ChatRoom {
  id: string;
  name: string;
  lastMessage?: string;
  lastActivity?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  messageType?: string;
  chatRoomId: string;
}

interface ChatState {
  activeChats: ChatRoom[];
  currentChatRoom: ChatRoom | null;
  messages: Message[];
  onlineUsers: string[];
  typingUsers: string[];
}

const initialState: ChatState = {
  activeChats: [],
  currentChatRoom: null,
  messages: [],
  onlineUsers: [],
  typingUsers: [],
};

type Action =
  | { type: 'SET_ACTIVE_CHATS'; payload: ChatRoom[] }
  | { type: 'SET_CURRENT_CHAT_ROOM'; payload: ChatRoom | null }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_ONLINE_USERS'; payload: string[] }
  | { type: 'SET_TYPING_USERS'; payload: string[] };

function chatReducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case 'SET_ACTIVE_CHATS':
      return { ...state, activeChats: action.payload };
    case 'SET_CURRENT_CHAT_ROOM':
      return { ...state, currentChatRoom: action.payload, messages: [] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_ONLINE_USERS':
      return { ...state, onlineUsers: action.payload };
    case 'SET_TYPING_USERS':
      return { ...state, typingUsers: action.payload };
    default:
      return state;
  }
}

const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
