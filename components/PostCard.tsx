'use client';

import { useContext, useEffect, useState } from 'react';
import {
  useCommentPost,
  useDeleteComment,
  useDeletePost,
  useLikePost,
  useUnlikePost,
} from '@/hooks/post-hooks';
import { Store } from '../app/lib/store';
import Link from 'next/link';
import EditPostModal from './EditPostModal';
import ShareButton from './ShareButton';
import { CommentType, Post } from '../app/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { twMerge } from 'tailwind-merge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import MenuDotsIcon from '@/icons/MenuDotsIcon';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import ImageWithSkeleton from './ImageWithSkeleton';
import CommentsDialog from './CommentsDialog';
import { useUpdateComment as useUpdateCommentApi } from '@/hooks/comment-hooks';

type PostCardProps = {
  id: string;
  text: string;
  authorName: string;
  createdAt: string;
  isLoggedInUser: boolean;
  refetch: () => void;
  likers: string[];
  comments: CommentType[];
  onPostUpdate: (updatedPost: Post) => void;
  images?: string[];
  profileImage?: string;
};

function convertDateFormat(dateString: string) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

export default function PostCard({
  text,
  authorName,
  createdAt,
  id,
  refetch,
  isLoggedInUser,
  likers,
  onPostUpdate,
  comments,
  images,
  profileImage,
}: PostCardProps) {
  const {
    state: { userInfo },
  } = useContext(Store);
  const { mutateAsync: deletePost } = useDeletePost();
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: unlikePost } = useUnlikePost();
  const { mutateAsync: commentPost } = useCommentPost();
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { mutateAsync: updateComment } = useUpdateCommentApi();
  const [allComments, setAllComments] = useState<CommentType[]>([]);
  const [likersDialogOpen, setLikersDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deletePost({ id });
    await refetch();
  };

  const handleLike = async () => {
    if (likers.includes(userInfo.name)) {
      await unlikePost({ userName: userInfo.name, postId: id });
    } else {
      await likePost({ userName: userInfo.name, postId: id });
    }

    await refetch();
  };

  const handleComment = async (comment: string) => {
    const updatedPost = await commentPost({
      userName: userInfo.name,
      postId: id,
      comment,
    });

    setAllComments(updatedPost.comments);
  };

  const handleDeleteComment = async (commentId: string) => {
    const res = await deleteComment({ postId: id, commentId });
    setAllComments(res.post.comments);
  };

  const handleUpdateComment = async (commentId: string, content: string) => {
    await updateComment({ commentId, content });
    // optimistic update: update local state content
    setAllComments(prev =>
      prev.map(c => (c._id === commentId ? { ...c, comment: content } : c))
    );
  };

  useEffect(() => {
    setAllComments(comments);
  }, [comments]);

  return (
    <div
      data-testid="post-card"
      className="flex flex-col gap-3 bg-white rounded-lg w-[90%] md:w-[30%] p-3 border border-gray-200 shadow"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <Link href={`/${authorName}`}>
            <Avatar>
              <AvatarImage src={profileImage} className=" object-cover" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          <div>
            <p className="font-bold">{authorName}</p>
            <p className=" text-xs">{convertDateFormat(createdAt)}</p>
          </div>
        </div>
        {/* options button and menu */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger data-testid="options">
              <MenuDotsIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ShareButton
                post={{
                  _id: id,
                  post: text,
                  authorName,
                  authorImage:
                    profileImage ||
                    `https://nazmul.sirv.com/facebook/${authorName}.png`,
                  createdAt,
                  updatedAt: createdAt,
                  userId: '',
                  likers,
                  images: images || [],
                  comments,
                  shareCount: 0,
                }}
                onShareSuccess={refetch}
              />
              {isLoggedInUser && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    data-testid="delete-post"
                    onClick={handleDelete}
                  >
                    Delete Post
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <EditPostModal
                    onPostUpdate={onPostUpdate}
                    id={id}
                    post={text}
                  />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <p>{text}</p>
      <div className="flex flex-row gap-2">
        {images?.map((image, index) => (
          <ImageWithSkeleton
            key={index}
            src={image}
            alt={`post content ${index}`}
            className="w-16 h-16 object-cover"
          />
        ))}
      </div>
      <div className="flex flex-row justify-center items-center gap-3 w-full">
        <Button
          className={twMerge(
            'bg-white text-slate-400 hover:bg-slate-100',
            likers?.includes(userInfo.name) && 'text-blue-600'
          )}
          onClick={handleLike}
        >
          {likers?.includes(userInfo.name) ? 'Unlike' : 'Like'}
        </Button>

        <Dialog open={likersDialogOpen} onOpenChange={setLikersDialogOpen}>
          <DialogTrigger className="hover:underline hover:cursor-pointer text-blue-600 dark:text-blue-400 transition-colors">
            {' '}
            {likers?.length} people{' '}
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <DialogTitle className="text-gray-900 dark:text-white">
              Likers
            </DialogTitle>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {likers?.map(liker => (
                <div
                  key={liker}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                >
                  <Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                    href={`/${liker}`}
                    onClick={() => setLikersDialogOpen(false)}
                    className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Avatar>
                      <AvatarImage
                        src={`https://nazmul.sirv.com/facebook/${liker}.png`}
                      />
                      <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{liker}</p>
                  </Link>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <CommentsDialog
          comments={allComments}
          onComment={handleComment}
          onDeleteComment={handleDeleteComment}
          onUpdateComment={handleUpdateComment}
          currentUserName={userInfo.name}
        />
      </div>
    </div>
  );
}
