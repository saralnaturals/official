"use client";

import React, { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  isLoading: boolean;
  duration?: number;
  progress?: number;
  onComplete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ 
  isLoading, 
  duration = 3000, 
  progress, 
  onComplete,
  size = 'md', 
  className = '' 
}: LoadingSpinnerProps) {
  const [localProgress, setLocalProgress] = useState(0);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  useEffect(() => {
    if (!isLoading) return;

    if (progress !== undefined) {
      setLocalProgress(progress);
      if (progress >= 100 && onComplete) {
        setTimeout(onComplete, 100);
      }
      return;
    }

    // Auto-progress if no progress prop provided
    const interval = setInterval(() => {
      setLocalProgress(prev => {
        const next = prev + (100 / (duration / 100));
        if (next >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 100);
          }
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, duration, progress, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-amber-50/90 dark:bg-neutral-900/90 backdrop-blur-sm">
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-green-600 mx-auto mb-4 ${sizeClasses[size]} ${className}`} />
        <p className="text-amber-900 dark:text-neutral-200 font-medium">Loading...</p>
        {(progress !== undefined || localProgress > 0) && (
          <div className="mt-4 w-48 mx-auto">
            <div className="bg-amber-200 dark:bg-neutral-700 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress !== undefined ? progress : localProgress}%` }}
              />
            </div>
            <p className="text-xs text-amber-700 dark:text-neutral-400 mt-1">
              {Math.round(progress !== undefined ? progress : localProgress)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}