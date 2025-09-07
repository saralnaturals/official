"use client";

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

type Size = 'sm' | 'lg';

type Props = { size?: Size };

const SIZE_MAP: Record<Size, number> = { sm: 24, lg: 72 };

export default function Avatar({ size = 'sm' }: Props) {
  const { user } = useAuth();
  const src = user?.avatar ?? null;
  const name = user?.name ?? '';
  const initial = name ? name[0] : 'A';
  const px = SIZE_MAP[size];

  if (src) {
    return (
      <Image src={src} alt={name || 'avatar'} width={px} height={px} className="rounded-full object-cover" unoptimized />
    );
  }

  return (
    <div className="rounded-full bg-amber-700 text-white flex items-center justify-center" style={{ width: px, height: px }}>
      <span className={size === 'lg' ? 'text-2xl' : 'text-xs'}>{initial}</span>
    </div>
  );
}
