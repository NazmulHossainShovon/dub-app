import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  messageType?: string;
}

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  currentUserId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  currentUserId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-900 pt-8">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-900">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            message={msg}
            isOwn={msg.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-700 p-2 bg-gray-800">
        <ChatInput onSend={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
