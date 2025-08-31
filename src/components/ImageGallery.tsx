"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  autoScrollInterval?: number;
  showTitles?: boolean;
}

export default function ImageGallery({ 
  images, 
  autoScrollInterval = 3000, 
  showTitles = true 
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [images.length, autoScrollInterval, isDragging]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setTranslateX(0);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setTranslateX(0);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTranslateX(0);
  }, [images.length]);

  // Touch/Mouse handlers for swipe
  const handleTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setTranslateX(diff);
  }, [isDragging, startX]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(translateX) > 50) {
      if (translateX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else {
      setTranslateX(0);
    }
  }, [isDragging, translateX, goToPrevious, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  return (
    <div className="relative w-full">
      {/* Main Image Display */}
      <div 
        ref={containerRef}
        className="relative w-full h-[60vh] min-h-[400px] overflow-hidden bg-amber-50 dark:bg-neutral-800"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              transform: index === currentIndex 
                ? `translateX(${translateX}px) scale(${isDragging ? 0.98 : 1})`
                : 'translateX(0) scale(1.05)',
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              draggable={false}
            />
            {showTitles && (image.title || image.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 text-white">
                <div className="max-w-4xl mx-auto">
                  {image.title && (
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{image.title}</h3>
                  )}
                  {image.description && (
                    <p className="text-lg md:text-xl opacity-90">{image.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-amber-50/90 dark:bg-neutral-800/90 hover:bg-amber-100 dark:hover:bg-neutral-700 text-amber-900 dark:text-neutral-200 p-3 rounded-full shadow-xl transition-all hover:scale-110 z-10"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-50/90 dark:bg-neutral-800/90 hover:bg-amber-100 dark:hover:bg-neutral-700 text-amber-900 dark:text-neutral-200 p-3 rounded-full shadow-xl transition-all hover:scale-110 z-10"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium z-10">
        {currentIndex + 1} of {images.length}
      </div>

      {/* Swipe Indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs z-10">
        {isDragging ? 'Swipe to navigate' : 'Swipe or use arrows'}
      </div>
    </div>
  );
}
