import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Button } from '../ui/button';
import { useGetUserFriends } from '../../app/hooks/user-hooks';

interface UserSearchModalProps {
  open: boolean;
  onClose: () => void;
  onStartChat: (friend: { name: string; profileImage?: string }) => void;
  currentUserName: string;
}

export default function UserSearchModal({
  open,
  onClose,
  onStartChat,
  currentUserName,
}: UserSearchModalProps) {
  const { data: friends, isLoading } = useGetUserFriends(currentUserName);
  const [search, setSearch] = useState('');

  const filteredFriends = friends?.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Start New Chat</DialogTitle>
      <DialogContent>
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          type="text"
          placeholder="Search friends..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {filteredFriends?.map(friend => (
              <li
                key={friend.name}
                className="flex items-center gap-3 py-2 border-b last:border-b-0"
              >
                <Avatar src={friend.profileImage || undefined} />
                <span className="flex-1">{friend.name}</span>
                <Button
                  size="sm"
                  onClick={() =>
                    onStartChat({
                      name: friend.name,
                      profileImage: friend.profileImage,
                    })
                  }
                >
                  Chat
                </Button>
              </li>
            ))}
            {filteredFriends?.length === 0 && <li>No friends found.</li>}
          </ul>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
