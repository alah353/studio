'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function HorseLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/caballodefinitivoletra1.png"
      alt="Horse S.L. Logo"
      width={240}
      height={240}
      className={cn('h-20 w-auto', className)}
      priority
    />
  );
}
