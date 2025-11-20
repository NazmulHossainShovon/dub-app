'use client';

import { Button } from '../ui/button';
import { twMerge } from 'tailwind-merge';
import CommentIcon from '@mui/icons-material/Comment';
import ShareButton from '../ShareButton';

import { Post } from '../../app/lib/types';

type OriginalPostActionsProps = {
  isLiked: boolean;
  onLike: () => void;
  onUnlike: () => void;
  onToggleComments: () => void;
  post: Post;
};

function OriginalPostActions({
  isLiked,
  onLike,
  onUnlike,
  onToggleComments,
  post,
}: OriginalPostActionsProps) {
  return (
    <div className="flex items-center justify-between border-t pt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={isLiked ? onUnlike : onLike}
        className={twMerge(
          'flex-1 text-xs',
          isLiked ? 'text-blue-600' : 'text-gray-600'
        )}
      >
        👍 {isLiked ? 'Unlike' : 'Like'}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleComments}
        className="flex-1 text-xs text-gray-600"
      >
        <CommentIcon className="mr-1 h-4 w-4" />
        Comment
      </Button>
    </div>
  );
}

export default OriginalPostActions;
