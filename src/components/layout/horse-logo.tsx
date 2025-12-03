'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function HorseLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/logocaballo1.png"
      alt="Horse S.L. Logo"
      width={80}
      height={80}
      className={cn('h-14 w-14', className)}
      priority
    />
  );
}
