'use client';

import { useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Store } from '@/lib/store';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch } = useContext(Store);

  useEffect(() => {
    const token = searchParams.get('token');
    const userString = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      router.push('/login?error=authentication_failed');
      return;
    }

    if (token && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));
        
        // Store token and user data
        localStorage.setItem('user-token', token);
        localStorage.setItem('user-info', JSON.stringify(user));
        dispatch({ type: 'sign-in', payload: user });
        
        // Redirect back to the original path or to home if no redirect path is set
        const redirectPath = localStorage.getItem('redirectPath') || '/';
        localStorage.removeItem('redirectPath'); // Clean up the redirect path
        router.push(redirectPath);
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login?error=authentication_failed');
      }
    } else {
      router.push('/login');
    }
  }, [searchParams, router, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}