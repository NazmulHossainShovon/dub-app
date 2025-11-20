import apiClient from '@/lib/api-client';

// Function to get video duration from file
const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      resolve(video.duration);
    };
    
    video.onerror = () => {
      reject(new Error('Could not get video duration'));
    };
    
    video.src = URL.createObjectURL(file);
  });
};

export type UploadResult = {
  imageUrl: string;
  secondsLeft?: number;
};

export const uploadToS3 = async (
  file: File, 
  userName: string, 
  onProgress?: (progress: number) => void
): Promise<UploadResult> => {
  // Check if file is a video and get its duration
  let videoDuration: number | undefined;
  if (file.type.startsWith('video/')) {
    try {
      videoDuration = await getVideoDuration(file);
    } catch (error) {
      console.error('Error getting video duration:', error);
      throw new Error('Could not read video duration');
    }
  }

  // Get presigned URL from backend with video duration if applicable
  let url = `/api/s3/signed-url?contentType=${file.type}&userName=${userName}`;
  if (videoDuration !== undefined) {
    url += `&videoDuration=${Math.round(videoDuration)}`;
  }
  
  try {
    const response = await apiClient.get(url);
    const { uploadUrl, imageUrl, secondsLeft } = response.data;

    // Upload file to S3 with progress tracking
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      });
      
      // Handle upload completion
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });
      
      // Handle upload errors
      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });
      
      // Handle upload abort
      xhr.addEventListener('abort', () => {
        reject(new Error('Upload aborted'));
      });
      
      // Start the upload
      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    });

    return { imageUrl, secondsLeft };
  } catch (error: any) {
    // Re-throw the error with additional context
    throw error;
  }
};
