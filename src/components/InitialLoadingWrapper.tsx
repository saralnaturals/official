"use client";

import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface InitialLoadingWrapperProps {
  children: React.ReactNode;
}

export default function InitialLoadingWrapper({ children }: InitialLoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Start loading immediately
    setIsLoading(true);
    setLoadingProgress(0);

    // Simulate resource loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90; // Stop at 90% until everything is ready
        }
        return prev + Math.random() * 10; // Random progress increments
      });
    }, 200);

    // Wait for all resources to load
    const checkResourcesLoaded = () => {
      // Check if all critical resources are loaded
      const images = Array.from(document.querySelectorAll('img'));
      const scripts = Array.from(document.querySelectorAll('script')) as HTMLScriptElement[];
      const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
      
      // Check if all images are loaded
      const allImagesLoaded = images.every(img => img.complete);
      
      // Check if all scripts are loaded
      const allScriptsLoaded = scripts.every(script => !script.src || (script as any).readyState === 'complete');
      
      // Check if all stylesheets are loaded
      const allStylesLoaded = styles.every(style => style.sheet !== null);
      
      return allImagesLoaded && allScriptsLoaded && allStylesLoaded;
    };

    // Poll for resource completion
    const resourceCheckInterval = setInterval(() => {
      if (checkResourcesLoaded()) {
        clearInterval(resourceCheckInterval);
        setLoadingProgress(100);
        
        // Complete loading after a short delay
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, 100);

    // Fallback: Complete loading after 5 seconds maximum
    const fallbackTimer = setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(resourceCheckInterval);
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(resourceCheckInterval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Listen for page load events
  useEffect(() => {
    const handleLoad = () => {
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    const handleBeforeUnload = () => {
      setIsLoading(true);
      setLoadingProgress(0);
    };

    window.addEventListener('load', handleLoad);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (isLoading) {
    return (
      <LoadingSpinner 
        isLoading={true} 
        duration={3000}
        progress={loadingProgress}
        onComplete={() => setIsLoading(false)}
      />
    );
  }

  return <>{children}</>;
}
