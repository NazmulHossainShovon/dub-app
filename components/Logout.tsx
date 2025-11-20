'use client';

import { useRouter } from 'next/navigation';
import { handleLogout } from '../utils/logout';
import { Store } from '../app/lib/store';
import { useContext } from 'react';

interface LogoutProps {
  className?: string;
}

export default function Logout({
  className = 'text-white bg-red-600 hover:bg-red-700 hover:text-gray-300 cursor-pointer px-3 py-1 rounded-md transition-colors duration-200',
}: LogoutProps) {
  const { dispatch } = useContext(Store);
  const router = useRouter();

  const handleUserLogout = () => {
    handleLogout(dispatch, router);
  };

  return (
    <button onClick={handleUserLogout} className={className}>
      Logout
    </button>
  );
}
