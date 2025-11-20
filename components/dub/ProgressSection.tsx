import React from 'react';

interface ProgressSectionProps {
  isUploading: boolean;
  uploadProgress: number;
  uploadedFileName: string;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ 
  isUploading, 
  uploadProgress, 
  uploadedFileName 
}) => {
  if (!isUploading && uploadProgress === 0) return null;

  return (
    <div className="mt-2">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{uploadedFileName}</span>
        <span>{isUploading ? `${uploadProgress}%` : 'Uploaded'}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${isUploading ? uploadProgress : 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressSection;