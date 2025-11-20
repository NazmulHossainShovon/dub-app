'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import MenuDotsIcon from '@/icons/MenuDotsIcon';
import DeleteIcon from '@mui/icons-material/Delete';

type SharedPostHeaderProps = {
  sharedByUserName: string;
  createdAt: string;
  profileImage?: string;
  isLoggedInUser: boolean;
  onDeletePost: () => void;
  formatDate: (dateString: string) => string;
};

function SharedPostHeader({
  sharedByUserName,
  createdAt,
  profileImage,
  isLoggedInUser,
  onDeletePost,
  formatDate,
}: SharedPostHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={profileImage} className="object-cover" />
          <AvatarFallback>
            {sharedByUserName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <Link
            href={`/${sharedByUserName}`}
            className="font-semibold text-sm hover:underline"
          >
            {sharedByUserName}
          </Link>
          <p className="text-xs text-gray-500">
            shared • {formatDate(createdAt)}
          </p>
        </div>
      </div>
      {isLoggedInUser && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MenuDotsIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onDeletePost} className="text-red-600">
              <DeleteIcon className="mr-2 h-4 w-4" />
              Delete Share
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

export default SharedPostHeader;
