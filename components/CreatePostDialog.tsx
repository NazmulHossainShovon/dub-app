'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Textarea } from 'components/ui/textarea';
import { Input } from 'components/ui/input';

interface CreatePostDialogProps {
  post: string;
  setPost: (post: string) => void;
  images: File[];
  setImages: (images: File[]) => void;
  handlePost: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
}

export default function CreatePostDialog({
  post,
  setPost,
  images,
  setImages,
  handlePost,
  handleImageChange,
  handleRemoveImage,
}: CreatePostDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded text-white cursor-pointer transition-colors">
        <span>Whats on your mind?</span>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <DialogTitle className="text-gray-900 dark:text-white">
          Create Post
        </DialogTitle>
        <div className="grid w-full gap-1.5">
          <Textarea
            onChange={e => setPost(e.target.value)}
            id="message"
            rows={10}
            className="resize-none text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="What's on your mind?"
          />
          <Input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/gif"
            onChange={handleImageChange}
            className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 file:bg-gray-100 dark:file:bg-gray-700 file:text-gray-900 dark:file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
          />
          <div className="flex flex-row gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview ${index}`}
                  className="w-16 h-16 object-cover rounded border border-gray-300 dark:border-gray-600"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white p-2 rounded transition-colors"
            onClick={handlePost}
          >
            Post
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
