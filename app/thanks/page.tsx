'use client';

import React, { useContext, useState } from 'react';
import { Store } from '../lib/store';
import apiClient from '../lib/api-client';
import { User } from '../lib/types';

const ThanksPage = () => {
  const { state, dispatch } = useContext(Store);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch current user info from localStorage to get the username
  const currentUserInfo =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user-info') || '{}')
      : {};

  const handleReturnHome = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      if (currentUserInfo.name) {
        const response = await apiClient.get<User>('api/users', {
          params: { userName: currentUserInfo.name },
        });

        // Update the store with the latest user info from the backend
        dispatch({ type: 'sign-in', payload: response.data });

        // Navigate to home page
        window.location.href = '/dub';
      } else {
        // If no user info in localStorage, just navigate to home
        window.location.href = '/dub';
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Loading...</h1>
          <p className="text-gray-700">Updating your information...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">
            There was an issue updating your information.
          </p>
          <div className="mt-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-6">
          We appreciate your visit. Your support means a lot to us.
        </p>
        <div className="mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleReturnHome}
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThanksPage;
