'use client';

import { useAuth } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthRedirect() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && isSignedIn && pathname === '/') {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, pathname, router]);

  return null;
}
