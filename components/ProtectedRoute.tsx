'use client';

import { useContext, useEffect, useState } from 'react';
import { Store } from '../app/lib/store';
import { usePathname, useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    state: { userInfo },
  } = useContext(Store);
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if user is authenticated
      const isAuthenticated =
        localStorage.getItem('user-info') || userInfo?.name;

      if (!isAuthenticated) {
        // Save the current path to redirect back after login
        localStorage.setItem('redirectPath', pathname);
        router.push('/login');
      } else {
        // User is authenticated, stop checking
        setIsChecking(false);
      }
    }
  }, [userInfo, router, pathname]);

  // If we're still checking, show loading spinner
  if (isChecking && !userInfo?.name) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If user is authenticated, render children
  if (userInfo?.name) {
    return <>{children}</>;
  }

  // This should not happen, but just in case
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
