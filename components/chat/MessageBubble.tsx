import React from 'react';
import { Trash } from 'lucide-react';
import apiClient from '../../app/lib/api-client';
import { useChat } from '../../app/lib/chat-store';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  messageType?: string;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const { dispatch, state } = useChat();

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/chat/messages/${message.id}`);
      // Remove message from chat-store
      dispatch({
        type: 'SET_MESSAGES',
        payload: state.messages.filter(m => m.id !== message.id),
      });
    } catch (err) {
      // Optionally show error
      alert('Failed to delete message');
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative rounded-lg px-4 py-2 max-w-xs break-words shadow text-sm ${
          isOwn ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-900'
        }`}
      >
        <div className="flex items-center gap-2">
          <span>{message.content}</span>
          {isOwn && (
            <button
              className="ml-2 p-1 rounded hover:bg-gray-500/20 transition"
              title="Delete message"
              onClick={handleDelete}
            >
              <Trash size={16} className="text-gray-400 hover:text-red-500" />
            </button>
          )}
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
