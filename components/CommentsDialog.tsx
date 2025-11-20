'use client';

import { useState } from 'react';
import Link from 'next/link';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { CommentType } from '../app/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

type CommentsDialogProps = {
  comments: CommentType[];
  onComment: (comment: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onUpdateComment: (commentId: string, content: string) => Promise<void>;
  currentUserName: string;
};

export default function CommentsDialog({
  comments,
  onComment,
  onDeleteComment,
  onUpdateComment,
  currentUserName,
}: CommentsDialogProps) {
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');

  const handleComment = async () => {
    if (comment.trim()) {
      await onComment(comment);
      setComment('');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    await onDeleteComment(commentId);
  };

  const startEditing = (comment: CommentType) => {
    setEditingCommentId(comment._id);
    setEditingContent(comment.comment);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const saveEditing = async () => {
    if (!editingCommentId) return;
    const trimmed = editingContent.trim();
    if (!trimmed) return;
    await onUpdateComment(editingCommentId, trimmed);
    setEditingCommentId(null);
    setEditingContent('');
  };

  return (
    <Dialog>
      <DialogTrigger>
        <CommentIcon className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogDescription className=" flex flex-col gap-2 p-3">
          <div className="flex flex-row gap-3 pl-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="comment">write a comment</Label>
              <Textarea
                onChange={e => setComment(e.target.value)}
                id="comment"
                value={comment}
                rows={3}
                className=" resize-none"
              />
            </div>

            <Button className="relative top-4" onClick={handleComment}>
              Comment
            </Button>
          </div>

          <div className=" flex flex-col gap-4 h-60 pr-3 overflow-y-scroll">
            {comments?.map((comment, index) => (
              <div
                key={index}
                className="flex flex-row bg-slate-200  rounded-md gap-3 p-2"
              >
                <Link href={`/${comment.userName}`}>
                  <DialogClose>
                    <Avatar>
                      <AvatarImage
                        src={`https://nazmul.sirv.com/facebook/${comment.userName}.png`}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DialogClose>
                </Link>

                <div className="w-[75%] flex flex-col gap-1">
                  <p className=" font-bold text-black">{comment.userName}</p>
                  {editingCommentId === comment._id ? (
                    <div className="flex flex-col gap-2">
                      <Textarea
                        value={editingContent}
                        onChange={e => setEditingContent(e.target.value)}
                        rows={3}
                        className="resize-none"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={saveEditing}>
                          <SaveIcon fontSize="small" className="mr-1" /> Save
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={cancelEditing}
                        >
                          <CloseIcon fontSize="small" className="mr-1" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className=" text-black">{comment.comment}</p>
                  )}
                </div>
                {comment.userName === currentUserName && (
                  <div className="flex items-start gap-2">
                    {editingCommentId !== comment._id && (
                      <EditIcon
                        onClick={() => startEditing(comment)}
                        className=" cursor-pointer"
                        fontSize="small"
                      />
                    )}
                    <DeleteIcon
                      onClick={() => handleDeleteComment(comment._id)}
                      className=" cursor-pointer"
                      fontSize="small"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
