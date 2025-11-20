import React from 'react';

interface DownloadButtonProps {
  onClick: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
    >
      Download Dubbed Video
    </button>
  );
};

export default DownloadButton;