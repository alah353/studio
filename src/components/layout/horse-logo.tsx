'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function HorseLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/caballodefinitivoletra1.png"
      alt="Horse S.L. Logo"
      width={220}
      height={220}
      className={cn('w-[220px] h-auto', className)}
      priority
      style={{ width: '220px', height: 'auto' }}
    />
  );
}
