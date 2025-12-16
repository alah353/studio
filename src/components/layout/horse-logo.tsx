'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function HorseLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/caballodefinitivoletra1.png"
      alt="Horse S.L. Logo"
      width={120}
      height={120}
      className={cn('w-auto', className)}
      priority
    />
  );
}
