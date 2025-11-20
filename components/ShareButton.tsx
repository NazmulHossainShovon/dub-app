'use client';

import { useState, useContext } from 'react';
import { Store } from '../app/lib/store';
import { Post } from '../app/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { DropdownMenuItem } from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useSharePost } from '@/hooks/post-hooks';
import ImageWithSkeleton from './ImageWithSkeleton';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

type ShareButtonProps = {
  post: Post;
  onShareSuccess?: () => void;
  as?: 'button' | 'menuitem';
};

export default function ShareButton({
  post,
  onShareSuccess,
  as = 'menuitem',
}: ShareButtonProps) {
  const {
    state: { userInfo },
  } = useContext(Store);
  const [shareMessage, setShareMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutateAsync: sharePost, isPending } = useSharePost();
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await sharePost({
        originalPostId: post._id,
        shareMessage,
      });
      toast({
        title: 'Post shared successfully',
      });
      setShareMessage('');
      setIsDialogOpen(false);
      onShareSuccess?.();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast({
        title: err.response?.data.message,
      });
    }
  };

  const TriggerComponent = as === 'button' ? Button : DropdownMenuItem;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <TriggerComponent
          onSelect={as === 'menuitem' ? e => e.preventDefault() : undefined}
        >
          Share Post
        </TriggerComponent>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
          <DialogDescription>
            Share this post with your friends
          </DialogDescription>
        </DialogHeader>

        {/* Original Post Content */}
        <div className="border rounded-lg p-3 bg-gray-50">
          <div className="flex flex-row gap-3 mb-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  post.authorImage ||
                  `https://nazmul.sirv.com/facebook/${post.authorName}.png`
                }
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-sm">{post.authorName}</p>
            </div>
          </div>

          <p className="text-sm mb-2">{post.post}</p>

          {post.images && post.images.length > 0 && (
            <div className="flex flex-row gap-2">
              {post.images.map((image, index) => (
                <ImageWithSkeleton
                  key={index}
                  src={image}
                  alt={`post content ${index}`}
                  className="w-12 h-12 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* Share Message Input */}
        <div className="grid w-full gap-1.5">
          <Label htmlFor="shareMessage">Add a comment (optional)</Label>
          <Textarea
            id="shareMessage"
            placeholder="What do you think about this post?"
            value={shareMessage}
            onChange={e => setShareMessage(e.target.value)}
            rows={3}
            className="resize-none dark:text-white"
          />
        </div>

        {/* Share Button */}
        <Button onClick={handleShare} disabled={isPending} className="w-full">
          {isPending ? 'Sharing...' : 'Share Now'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
