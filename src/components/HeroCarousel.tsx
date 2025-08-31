"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  autoChangeInterval?: number;
}

export default function HeroCarousel({ 
  images, 
  autoChangeInterval = 5000 
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoChangeInterval);

    return () => clearInterval(interval);
  }, [images.length, autoChangeInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative h-full w-full"
        >
          <Image 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt} 
            fill 
            className="object-cover" 
            priority={true}
          />
          
          {/* Overlay with text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xl font-bold md:text-2xl"
              >
                {images[currentIndex].title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-2 text-sm opacity-90 md:text-base"
              >
                {images[currentIndex].subtitle}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: autoChangeInterval / 1000, 
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </div>
    </div>
  );
}
