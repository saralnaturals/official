"use client";

import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingSpinner 
        isLoading={isLoading} 
        onComplete={() => setIsLoading(false)}
        duration={3000}
      />
      {!isLoading && children}
    </>
  );
}
