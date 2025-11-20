'use client';

import { Avatar } from '@mui/material';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Store } from '../app/lib/store';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useGetUserFriends } from '../app/hooks/user-hooks';

export default function FriendList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    state: { userInfo },
  } = useContext(Store);

  // Fetch friends data with profile images
  const { data: friends, isLoading } = useGetUserFriends(userInfo.name);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger onClick={handleClick} className=" text-right">
          Friends
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {isLoading ? (
            <DropdownMenuItem>Loading...</DropdownMenuItem>
          ) : (
            friends?.map(friend => (
              <DropdownMenuItem onClick={handleClose} key={friend.name}>
                <Link className="flex  flex-row gap-2" href={`/${friend.name}`}>
                  <Avatar src={friend.profileImage || undefined} />
                  <div>{friend.name}</div>
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
