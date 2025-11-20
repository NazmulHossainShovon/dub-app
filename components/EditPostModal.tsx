'use client';

import React, { useState } from 'react';
import { useUpdatePost } from '@/hooks/post-hooks';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Post } from '@/lib/types';

type EditPostModalProps = {
  post: string;
  id: string;
  onPostUpdate: (post: Post) => void;
};

const EditPostModal = (props: EditPostModalProps) => {
  const { post, id, onPostUpdate } = props;
  const [updatedPost, setUpdatedPost] = useState(post);
  const { mutateAsync: updatePost } = useUpdatePost();

  const handleUpdatePost = async () => {
    const result = await updatePost({ post: updatedPost, id: id });
    onPostUpdate(result.doc);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full text-left pl-2 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white">
        Edit
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Edit Post</DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Make changes to your post here. Click update when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Textarea
            onChange={e => setUpdatedPost(e.target.value)}
            defaultValue={post}
            className="min-h-[120px] dark:text-white"
          />
          <DialogClose asChild>
            <Button onClick={handleUpdatePost}>Update</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

EditPostModal.displayName = 'EditPostModal';

export default EditPostModal;
