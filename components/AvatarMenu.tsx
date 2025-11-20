'use client';

import { Menu, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React, { useContext } from 'react';
import { Store } from '../app/lib/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleLogout } from '../utils/logout';

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { dispatch, state } = useContext(Store);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar
        src={state.userInfo.profileImage}
        className="cursor-pointer"
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <Link href={`/social/${state.userInfo.name}`}>Profile</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
