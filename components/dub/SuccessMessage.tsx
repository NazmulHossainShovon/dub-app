import React from 'react';
import DownloadButton from './DownloadButton';

interface SuccessMessageProps {
  mergedVideoUrl: string;
  handleDownload: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  mergedVideoUrl, 
  handleDownload 
}) => {
  return (
    <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800">
      Video processed successfully!
      {mergedVideoUrl && (
        <div className="mt-2">
          <DownloadButton onClick={handleDownload} />
        </div>
      )}
    </div>
  );
};

export default SuccessMessage;