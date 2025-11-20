import React from 'react';

interface ActionButtonsProps {
  handleReset: () => void;
  s3Url: string;
  processS3Url: (data: { s3Url: string; targetLanguage?: string; voiceGender?: string }) => void;
  selectedLanguage: string;
  selectedGender: 'male' | 'female';
  onProcessStart: () => void; // Function to call when processing starts
  processingStarted: boolean; // Whether processing has started
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  handleReset, 
  s3Url, 
  processS3Url,
  selectedLanguage,
  selectedGender,
  onProcessStart,
  processingStarted
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex-1"
        >
          Reset
        </button>

        {s3Url && !processingStarted && (
          <button
            type="button"
            onClick={() => {
              processS3Url({ s3Url, targetLanguage: selectedLanguage, voiceGender: selectedGender });
              onProcessStart(); // Set processing started state when clicked
            }}
            className="bg-black hover:bg-black/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex-1"
          >
            Start Processing
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;