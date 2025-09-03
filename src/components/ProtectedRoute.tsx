"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'investor' | 'admin';
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        router.push('/');
        return;
      }
    }
  }, [user, loading, router, requiredRole, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-amber-700 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null; // Will redirect
  }

  return <>{children}</>;
}