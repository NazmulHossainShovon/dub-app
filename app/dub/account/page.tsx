'use client';

import { useContext } from 'react';
import { Store } from '../../lib/store';

export default function AccountPage() {
  const {
    state: { userInfo },
  } = useContext(Store);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Account Information
          </h1>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                User Information
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Name:</span>{' '}
                  {userInfo?.name || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span>{' '}
                  {userInfo?.email || 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Minutes Left
              </h2>
              <div className="text-4xl font-bold text-indigo-600">
                {userInfo?.secondsLeft !== undefined ? (() => {
                  const totalMinutes = userInfo.secondsLeft / 60;
                  const minutes = Math.floor(totalMinutes);
                  const seconds = Math.round((totalMinutes - minutes) * 60);
                  return (
                    <>
                      {minutes} minutes {seconds > 0 ? `${seconds} seconds` : ''}
                    </>
                  );
                })() : '0 minutes 0 seconds'}
              </div>
              <p className="text-gray-600 mt-2">
                This is the amount of video dubbing time you have remaining.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
