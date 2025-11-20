import React from 'react';

interface UploadSectionProps {
  isUploading: boolean;
  isPending: boolean;
  handleFileUpload: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ 
  isUploading, 
  isPending, 
  handleFileUpload 
}) => {
  return (
    <button
      type="button"
      onClick={handleFileUpload}
      className={`border-2 border-dashed border-gray-300 rounded-lg px-4 py-8 text-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors duration-300 flex flex-col items-center justify-center ${
        isUploading || isPending ? 'opacity-70 cursor-not-allowed' : ''
      }`}
      disabled={isUploading || isPending}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <span>Click to upload video</span>
      <span className="text-sm mt-1">(MP4, MOV, AVI, etc.)</span>
    </button>
  );
};

export default UploadSection;