'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../lib/api-client';
import { Post, SharedPost } from '../lib/types';

type GetPostsHookType = {
  userName: string | undefined;
  currentPage: number;
};

// Combined post type that matches backend CombinedPost
type PostWithSharedFlag = Post & { isShared: false };
type SharedPostWithFlag = SharedPost & { isShared: true };
type CombinedPost = PostWithSharedFlag | SharedPostWithFlag;

type GetPostHookResponseType = {
  posts: CombinedPost[];
  totalPages: number;
};

type GetFriendsPostsHookType = {
  currentPage: number;
};

const useCreatePost = () => {
  return useMutation({
    mutationFn: async ({ post, images }: { post: string; images: string[] }) => {
      const res = await apiClient.post('/api/posts/create', {
        post,
        images,
      });
      return res.data;
    },
  });
};

const useGetPosts = ({ userName, currentPage }: GetPostsHookType) => {
  return useQuery({
    queryKey: ['posts', userName, currentPage],
    queryFn: async () => {
      const res = await apiClient.get<GetPostHookResponseType>('/api/posts', {
        params: { userName, currentPage },
      });
      return res.data;
    },
  });
};

const useGetFriendPosts = ({ currentPage }: GetFriendsPostsHookType) =>
  useQuery({
    queryKey: ['friendsPosts', currentPage],
    queryFn: async () => {
      const res = await apiClient.get<GetPostHookResponseType>(
        '/api/posts/friends',
        {
          params: { currentPage },
        }
      );
      return res.data;
    },
  });

const useDeletePost = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await apiClient.delete(`/api/posts/delete/${id}`);
      return res.data;
    },
  });
};

const useLikePost = () => {
  return useMutation({
    mutationFn: async ({ userName, postId }: { userName: string; postId: string }) => {
      const res = await apiClient.put<Post>('/api/posts/like', {
        userName,
        postId,
      });
      return res.data;
    },
  });
};

const useUnlikePost = () => {
  return useMutation({
    mutationFn: async ({ userName, postId }: { userName: string; postId: string }) => {
      const res = await apiClient.put('/api/posts/unlike', {
        userName,
        postId,
      });
      return res.data;
    },
  });
};

const useCommentPost = () => {
  return useMutation({
    mutationFn: async ({ userName, postId, comment }: { userName: string; postId: string; comment: string }) => {
      const res = await apiClient.put<Post>('/api/posts/comment', {
        userName,
        postId,
        comment,
      });
      return res.data;
    },
  });
};

const useDeleteComment = () => {
  return useMutation({
    mutationFn: async ({ postId, commentId }: { postId: string; commentId: string }) => {
      const res = await apiClient.delete<{ message: string; post: Post }>(
        '/api/posts/comment',
        {
          data: {
            postId,
            commentId,
          },
        }
      );
      return res.data;
    },
  });
};

const useSharePost = () => {
  return useMutation({
    mutationFn: async ({ originalPostId, shareMessage }: { originalPostId: string; shareMessage?: string }) => {
      const res = await apiClient.post('/api/posts/share', {
        originalPostId,
        shareMessage,
      });
      return res.data;
    },
  });
};

const useUpdatePost = () => {
  return useMutation({
    mutationFn: async ({ id, post }: { id: string; post: string }) => {
      const res = await apiClient.put<{ message: string; doc: Post }>(
        '/api/posts/update',
        {
          id,
          post,
        }
      );
      return res.data;
    },
  });
};

export {
  useCreatePost,
  useGetPosts,
  useDeletePost,
  useLikePost,
  useUnlikePost,
  useUpdatePost,
  useGetFriendPosts,
  useCommentPost,
  useDeleteComment,
  useSharePost,
};
