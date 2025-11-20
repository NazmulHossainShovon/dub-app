import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [value, setValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSend} className="flex gap-2">
      <input
        className="flex-1 border border-gray-600 bg-gray-900 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-500 placeholder-gray-400"
        type="text"
        placeholder="Type a message..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="bg-gray-700 text-gray-100 px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500"
        disabled={!value.trim()}
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
