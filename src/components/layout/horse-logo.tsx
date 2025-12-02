'use client';
import React from 'react';
import { Horse } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HorseLogo({ className }: { className?: string }) {
  return (
    <Horse className={cn('h-14 w-14 text-accent', className)} />
  );
}
