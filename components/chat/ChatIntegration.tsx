'use client';

import FriendChatHeader from './FriendChatHeader';
import { useState, useContext, useEffect } from 'react';
import { useChatSocket } from '../../app/hooks/use-chat';
import { useChat } from '../../app/lib/chat-store';
import ChatSidebar from './ChatSidebar';
import { Store } from '../../app/lib/store';
import { useGetUserFriends } from '../../app/hooks/user-hooks';
import apiClient from '../../app/lib/api-client';
import ChatWindowContainer from './ChatWindowContainer';
import { ArrowLeft, MessageSquareMore } from 'lucide-react';

export default function ChatIntegration() {
  const [open, setOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>(
    undefined
  );
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const {
    state: { userInfo },
  } = useContext(Store);
  const { data: friends = [], isLoading } = useGetUserFriends(userInfo.name);
  const currentUserId = userInfo._id;
  const {
    state: chatState,
    sendMessage,
    joinRoom,
  } = useChatSocket(currentUserId);
  const { dispatch } = useChat();

  // Fetch chat rooms for the current user
  useEffect(() => {
    if (!currentUserId) return;
    setLoadingRooms(true);
    apiClient
      .get(`/api/chat/rooms/${currentUserId}`)
      .then((res: { data: any[] }) => setChatRooms(res.data))
      .finally(() => setLoadingRooms(false));
  }, [currentUserId]);

  // Find or create a chat room with a friend

  const getOrCreateChatRoom = async (friendId: string) => {
    // Try to find an existing room with these two participants (by user IDs)
    let room = chatRooms.find(
      r =>
        Array.isArray(r.participants) &&
        r.participants.length === 2 &&
        r.participants.includes(currentUserId) &&
        r.participants.includes(friendId)
    );

    if (room) return room;
    // Create new room
    const res = await apiClient.post('/api/chat/rooms', {
      participantIds: [currentUserId, friendId],
    });
    setChatRooms(prev => [...prev, res.data]);
    return res.data;
  };

  // Join the room when a chat is selected
  const handleSelectChat = async (friendName: string) => {
    // Find friend by name to get their _id
    const friend = friends.find(f => f.name === friendName);
    if (!friend || !friend._id) return;
    const room = await getOrCreateChatRoom(friend._id);
    if (room && room._id) {
      setSelectedChatId(prev => {
        const newId = prev === room._id ? undefined : room._id;
        if (newId) joinRoom(newId);
        return newId;
      });
    }
  };
  // Fetch messages when selectedChatId changes and is defined
  useEffect(() => {
    if (!selectedChatId) return;
    let isMounted = true;
    (async () => {
      try {
        const res = await apiClient.get(`/api/chat/messages/${selectedChatId}`);
        if (Array.isArray(res.data)) {
          // Each message should have chatRoomId
          const messages = res.data.map((msg: any) => ({
            ...msg,
            chatRoomId: selectedChatId,
          }));
          if (isMounted) {
            dispatch({ type: 'SET_MESSAGES', payload: messages });
          }
        }
      } catch (err) {
        // Optionally handle error
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [selectedChatId, dispatch]);

  const handleSendMessage = (message: string) => {
    if (selectedChatId && message.trim()) {
      sendMessage(selectedChatId, message);
      // Fetch all messages for this chat room from the database
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-gray-800 text-gray-100 rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:bg-gray-700 focus:outline-none"
        onClick={() => setOpen(v => !v)}
        aria-label="Open Chat"
      >
        <MessageSquareMore />
      </button>
      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 bg-gray-900 rounded-lg shadow-2xl flex w-[300px] h-[400px] overflow-hidden border border-gray-700
          sm:w-[350px] sm:h-[500px] sm:right-2 sm:bottom-20
          xs:w-full xs:h-[90vh] xs:right-0 xs:bottom-0 xs:rounded-none xs:border-0 xs:shadow-none xs:max-w-full xs:max-h-[100vh]"
        >
          <ChatSidebar
            chats={
              isLoading
                ? []
                : friends.map(friend => {
                    // Find chat room for this friend by user ID
                    const room = chatRooms.find(
                      r =>
                        Array.isArray(r.participants) &&
                        r.participants.length === 2 &&
                        r.participants.includes(currentUserId) &&
                        r.participants.includes(friend._id)
                    );
                    return {
                      id: friend.name, // keep id as friend name for selection
                      name: friend.name,
                      profileImage: friend.profileImage,
                      chatRoomId: room?._id,
                    };
                  })
            }
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChatId}
          />
          {selectedChatId && (
            <div className="flex-1 flex flex-col">
              <div className="flex fixed items-center gap-2">
                <button
                  type="button"
                  className="p-2 w-fit rounded hover:bg-gray-700 bg-gray-800 text-gray-100 mb-2 "
                  onClick={() => setSelectedChatId(undefined)}
                  aria-label="Back to chat list"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                {/* Show user image for the selected chat */}
                <FriendChatHeader
                  friends={friends}
                  chatRooms={chatRooms}
                  currentUserId={currentUserId}
                  selectedChatId={selectedChatId}
                />
              </div>

              <ChatWindowContainer
                chatRoomId={selectedChatId}
                onSendMessage={handleSendMessage}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
