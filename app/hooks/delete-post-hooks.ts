'use client';

import { useMutation } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

const useDeleteSharedPost = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await apiClient.delete(`/api/posts/shared/${id}`);
      return res.data;
    },
  });
};

export { useDeleteSharedPost };
