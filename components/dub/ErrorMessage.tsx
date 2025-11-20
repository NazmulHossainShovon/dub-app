import React from 'react';

interface ErrorMessageProps {
  error?: {
    message?: string;
  };
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800">
      {error?.message || 'An error occurred while processing the video'}
    </div>
  );
};

export default ErrorMessage;