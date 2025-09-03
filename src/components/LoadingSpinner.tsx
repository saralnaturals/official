"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useCycle } from 'framer-motion';

interface LoadingSpinnerProps {
  isLoading?: boolean;
  onComplete?: () => void;
  duration?: number;
  progress?: number; // New prop for external progress control
}

export default function LoadingSpinner({
  isLoading = true,
  onComplete,
  duration = 3000,
  progress
}: LoadingSpinnerProps) {
  const [liquidProgress, setLiquidProgress] = useState(0);
  const [loadingTextCycle, cycleLoadingText] = useCycle(
    "Loading...",
    "लोड हो रहा है..."
  );
  const [subtitleCycle, cycleSubtitle] = useCycle(
    "Preparing fresh dairy experience",
    "ताजा डेयरी अनुभव तैयार कर रहे हैं"
  );

  useEffect(() => {
    if (!isLoading) return;

    // If external progress is provided, use it
    if (progress !== undefined) {
      setLiquidProgress(progress);
      if (progress >= 100 && onComplete) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
      return;
    }

    // Otherwise, use internal animation
    setLiquidProgress(0);

    // Liquid filling animation
    const liquidInterval = setInterval(() => {
      setLiquidProgress(prev => {
        if (prev >= 100) {
          clearInterval(liquidInterval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50); // 50 steps for smooth animation

    // Complete loading when liquid is full
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      clearInterval(liquidInterval);
      clearTimeout(completeTimer);
    };
  }, [isLoading, duration, onComplete, progress]);

  // Cycle text every 3 seconds
  useEffect(() => {
    if (!isLoading) return;

    const textInterval = setInterval(() => {
      cycleLoadingText();
      cycleSubtitle();
    }, 3000);

    return () => clearInterval(textInterval);
  }, [isLoading, cycleLoadingText, cycleSubtitle]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-amber-50 dark:bg-neutral-900">
      <div className="text-center">
        {/* Circular Container */}
        <div className="relative mx-auto mb-6 h-32 w-32">
          {/* Glass Effect Outer Circle */}
          <div className="absolute inset-0 rounded-full border-4 border-amber-300/50 dark:border-neutral-700 shadow-2xl bg-blue-100 dark:bg-neutral-800 backdrop-blur-sm"></div>

          {/* Milk Fill with Glass Effect */}
          <motion.div
            className="absolute inset-1 rounded-full bg-gradient-to-t from-white/90 via-white/80 to-white/70 overflow-hidden shadow-inner border border-white/30 dark:border-gray-600 backdrop-blur-sm"
            style={{
              clipPath: `polygon(0 ${100 - liquidProgress}%, 100% ${100 - liquidProgress}%, 100% 100%, 0 100%)`
            }}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Milk Foam Effect */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/90 to-transparent opacity-90 rounded-t-full"></div>

            {/* Milk Bubbles Effect */}
            <div className="absolute inset-0 opacity-70">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-md border-2 border-blue-200 dark:border-white/50"
                  style={{
                    left: `${15 + i * 12}%`,
                    top: `${25 + (i % 3) * 15}%`,
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>

            {/* Milk Surface Ripples */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-300 rounded-full border border-blue-400 dark:bg-white/60 dark:border-white/40"
                  style={{
                    left: `${i * 8 - 8}px`,
                    top: `${i * 4 - 4}px`,
                  }}
                  animate={{
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Logo Container - Always Visible */}
          <div className="absolute inset-4 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <Image
                src="/brand/logo-transparent.png"
                alt="Saral Naturals"
                width={80}
                height={80}
                className="object-contain drop-shadow-lg"
                priority
                style={{ filter: 'drop-shadow(1px 1px 0px #f5f5dc) drop-shadow(-1px -1px 0px #f5f5dc)' }}
              />
            </motion.div>
          </div>

          {/* Progress Ring with Glass Effect */}
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="60"
              stroke="url(#glassGradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - liquidProgress / 100)}`}
              className="transition-all duration-300 ease-out drop-shadow-sm"
            />
            <defs>
              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(251, 191, 36, 0.8)" />
                <stop offset="50%" stopColor="rgba(245, 158, 11, 0.9)" />
                <stop offset="100%" stopColor="rgba(217, 119, 6, 1)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <motion.h3
            key={loadingTextCycle}
            className="text-xl font-semibold text-amber-900 dark:text-neutral-200 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {loadingTextCycle}
          </motion.h3>
          <motion.p
            key={subtitleCycle}
            className="text-sm text-amber-700 dark:text-neutral-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subtitleCycle}
          </motion.p>
        </motion.div>

        {/* Progress Percentage */}
        <motion.div
          className="mt-4 text-sm font-medium text-amber-800 dark:text-neutral-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {Math.round(liquidProgress)}%
        </motion.div>
      </div>
    </div>
  );
}