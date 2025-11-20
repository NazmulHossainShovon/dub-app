'use client';

import { SharedPost } from '../app/lib/types';
import CommentsDialog from './CommentsDialog';
import {
  useCreateComment,
  useGetComments,
  useDeleteComment,
  useUpdateComment,
} from '@/hooks/comment-hooks';
import { useContext } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Store } from '@/lib/store';
import SharedPostHeader from './SharedPost/SharedPostHeader';
import ShareMessage from './SharedPost/ShareMessage';
import OriginalPostContainer from './SharedPost/OriginalPostContainer';
import OriginalPostHeader from './SharedPost/OriginalPostHeader';
import OriginalPostContent from './SharedPost/OriginalPostContent';

import { useDeleteSharedPost } from '@/hooks/delete-post-hooks';

type SharedPostCardProps = {
  sharedPost: SharedPost;
  refetch: () => void;
  isLoggedInUser: boolean;
  profileImage?: string;
};

function SharedPostCard({
  sharedPost,
  refetch,
  isLoggedInUser,
  profileImage,
}: SharedPostCardProps) {
  const { mutateAsync: deletePost } = useDeleteSharedPost();
  const { mutateAsync: createComment } = useCreateComment();
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { mutateAsync: updateComment } = useUpdateComment();
  const { toast } = useToast();
  const {
    state: { userInfo },
  } = useContext(Store);

  const originalPost = sharedPost.originalPost;
  const { data: comments, refetch: refetchComments } = useGetComments({
    postId: originalPost?._id,
  });

  if (!originalPost) {
    return null; // Don't render if original post is missing
  }

  const handleDeletePost = async () => {
    await deletePost({ id: sharedPost._id });
    refetch();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)}d`;
    }
  };

  // Comments dialog handlers and data for readability
  const commentsData = comments ?? [];

  const handleAddComment = async (comment: string) => {
    try {
      await createComment({ postId: originalPost._id, content: comment });
      await refetchComments();
      toast({ title: 'Comment added' });
    } catch (e) {
      toast({ title: 'Failed to add comment', variant: 'destructive' });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({ commentId });
      await refetchComments();
      toast({ title: 'Comment deleted' });
    } catch (e) {
      toast({ title: 'Failed to delete comment', variant: 'destructive' });
    }
  };

  const handleUpdateComment = async (commentId: string, content: string) => {
    try {
      await updateComment({ commentId, content });
      await refetchComments();
      toast({ title: 'Comment updated' });
    } catch (e) {
      toast({ title: 'Failed to update comment', variant: 'destructive' });
    }
  };

  return (
    <div className="bg-white rounded-lg w-[90%] md:w-[30%] p-4 border border-gray-200 shadow">
      <SharedPostHeader
        sharedByUserName={sharedPost.sharedByUserName}
        createdAt={sharedPost.createdAt}
        profileImage={profileImage}
        isLoggedInUser={isLoggedInUser}
        onDeletePost={handleDeletePost}
        formatDate={formatDate}
      />

      <ShareMessage shareMessage={sharedPost.shareMessage} />

      <OriginalPostContainer>
        <OriginalPostHeader
          authorName={originalPost.authorName}
          authorImage={originalPost.authorImage}
          createdAt={originalPost.createdAt}
          formatDate={formatDate}
        />

        <OriginalPostContent
          postText={originalPost.post}
          images={originalPost.images}
        />
      </OriginalPostContainer>

      <CommentsDialog
        comments={commentsData}
        onComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        onUpdateComment={handleUpdateComment}
        currentUserName={userInfo.name}
      />
    </div>
  );
}

export default SharedPostCard;
