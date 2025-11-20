import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

interface DubRequest {
  youtubeUrl: string;
}

interface S3DubRequest {
  s3Url: string;
  targetLanguage?: string;
  voiceGender?: string;
}

interface DubResponse {
  message: string;
  success: boolean;
  data?: {
    youtubeUrl: string;
    videoId: string;
    videoInfo: {
      title: string;
      thumbnail: string;
      duration: string;
    };
  };
}

// Interface for the S3 processing response
interface S3DubResponse {
  success: boolean;
  mergedVideoS3Url?: string;
}

export const useProcessYoutubeUrl = () => {
  return useMutation<DubResponse, Error, DubRequest>({
    mutationFn: async (data: DubRequest) => {
      const response = await apiClient.post<DubResponse>('/api/dub', data);
      return response.data;
    },
  });
};

export const useProcessS3Url = () => {
  return useMutation<S3DubResponse, Error, S3DubRequest>({
    mutationFn: async (data: S3DubRequest) => {
      const response = await apiClient.post<S3DubResponse>('/api/dub/s3', data);
      return response.data;
    },
  });
};