'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentType } from '../../app/lib/types';

type CommentsSectionProps = {
  showComments: boolean;
  comments: CommentType[];
  currentUserName: string;
  onAddComment: (comment: string) => void;
  onDeleteComment: (commentId: string) => void;
  formatDate: (dateString: string) => string;
};

function CommentsSection({
  showComments,
  comments,
  currentUserName,
  onAddComment,
  onDeleteComment,
  formatDate,
}: CommentsSectionProps) {
  const [comment, setComment] = useState('');

  const handleSubmitComment = () => {
    if (comment.trim()) {
      onAddComment(comment);
      setComment('');
    }
  };

  if (!showComments) return null;

  return (
    <div className="mt-3 border-t pt-3">
      {/* Add Comment */}
      <div className="flex gap-2 mb-3">
        <Textarea
          placeholder="Write a comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="flex-1 min-h-[60px] text-xs"
        />
        <Button
          onClick={handleSubmitComment}
          size="sm"
          disabled={!comment.trim()}
        >
          Post
        </Button>
      </div>

      {/* Comments List */}
      <div className="space-y-2">
        {comments.map((comment: CommentType) => (
          <div key={comment._id} className="flex justify-between items-start">
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg p-2">
                <Link
                  href={`/user/${comment.userName}`}
                  className="font-semibold text-xs hover:underline"
                >
                  {comment.userName}
                </Link>
                <p className="text-xs mt-1">{comment.comment}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-2">
                {formatDate(comment.createdAt)}
              </p>
            </div>
            {comment.userName === currentUserName && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteComment(comment._id)}
                className="h-6 w-6 p-0 text-red-500"
              >
                <DeleteIcon className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;
