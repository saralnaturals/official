"use client";

interface SimpleSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function SimpleSpinner({ size = 'md', className = '' }: SimpleSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 border-green-600 ${sizeClasses[size]} ${className}`} />
  );
}