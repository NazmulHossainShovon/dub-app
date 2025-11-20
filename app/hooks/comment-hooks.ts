'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

// Creates a new comment for a post using the backend /api/comments endpoint
// Backend expects: { postId: string, content: string }
const useCreateComment = () => {
  return useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => {
      const res = await apiClient.post('/api/comments', {
        postId,
        content,
      });
      return res.data;
    },
  });
};

import type { CommentType } from '../lib/types';

type BackendComment = {
  _id: string;
  postId: string;
  userId: { _id: string; name: string } | string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type GetCommentsHookType = {
  postId?: string;
};

const useGetComments = ({ postId }: GetCommentsHookType) => {
  return useQuery<CommentType[]>({
    queryKey: ['comments', postId],
    enabled: !!postId,
    queryFn: async () => {
      const res = await apiClient.get<BackendComment[]>(
        `/api/comments/post/${postId}`
      );
      // Map backend shape to frontend CommentType shape
      const mapped: CommentType[] = res.data.map(c => ({
        _id: c._id,
        comment: c.content,
        userName: typeof c.userId === 'string' ? c.userId : c.userId.name,
        createdAt: c.createdAt,
      }));
      return mapped;
    },
  });
};

const useDeleteComment = () => {
  return useMutation({
    mutationFn: async ({ commentId }: { commentId: string }) => {
      const res = await apiClient.delete<{ message: string }>(
        `/api/comments/${commentId}`
      );
      return res.data;
    },
  });
};

const useUpdateComment = () => {
  return useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => {
      const res = await apiClient.put<BackendComment>(
        `/api/comments/${commentId}`,
        { content }
      );
      return res.data;
    },
  });
};

export { useCreateComment, useGetComments, useDeleteComment, useUpdateComment };
