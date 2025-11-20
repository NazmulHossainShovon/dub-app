// FriendChatHeader.tsx
'use client';
import React from 'react';

interface FriendChatHeaderProps {
  friends: any[];
  chatRooms: any[];
  currentUserId: string;
  selectedChatId?: string;
}

const FriendChatHeader: React.FC<FriendChatHeaderProps> = ({
  friends,
  chatRooms,
  currentUserId,
  selectedChatId,
}) => {
  const friend = friends.find(f => {
    const room = chatRooms.find(
      r =>
        Array.isArray(r.participants) &&
        r.participants.length === 2 &&
        r.participants.includes(currentUserId) &&
        r.participants.includes(f._id)
    );
    return room && room._id === selectedChatId;
  });
  if (!friend) return null;
  return (
    <img
      src={
        friend.profileImage ||
        `https://nazmul.sirv.com/facebook/${friend.name}.png`
      }
      alt={friend.name}
      className="w-9 h-9 rounded-full object-cover border"
    />
  );
};

export default FriendChatHeader;
