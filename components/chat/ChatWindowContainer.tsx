import { useContext } from 'react';
import ChatWindow from './ChatWindow';
import { Store } from '../../app/lib/store';
import { useChat } from '../../app/lib/chat-store';

interface ChatWindowContainerProps {
  chatRoomId: string;
  onSendMessage?: (message: string) => void;
}

const ChatWindowContainer: React.FC<ChatWindowContainerProps> = ({
  chatRoomId,
  onSendMessage,
}) => {
  const {
    state: { userInfo },
  } = useContext(Store);
  const { state: chatState } = useChat();

  // Filter messages for the current chatRoomId
  const messages = chatState.messages.filter(
    msg => msg && msg.chatRoomId === chatRoomId
  );

  // Always provide a fallback for onSendMessage
  const handleSend = onSendMessage || (() => {});
  return (
    <ChatWindow
      messages={messages}
      onSendMessage={handleSend}
      currentUserId={userInfo._id}
    />
  );
};

export default ChatWindowContainer;
