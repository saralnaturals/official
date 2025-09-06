"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function InitialLoadingWrapper() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);



  useEffect(() => {
    // Animate loader immediately
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 8, 90));
    }, 200);

    // Hide loader after hydration or fallback
    const timeout = setTimeout(() => setProgress(100), 4000);
    const removeLoader = setTimeout(() => setIsVisible(false), 4500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
      clearTimeout(removeLoader);
    };
  }, []);
  if (typeof window === "undefined") return null;
  if (!isVisible) return null;

  return (
    <div
      id="loader-overlay" 
      aria-hidden="true"
      role="presentation"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-amber-50 dark:bg-neutral-900"
    >
      <LoadingSpinner isLoading progress={progress} />
    </div>
  );
}
