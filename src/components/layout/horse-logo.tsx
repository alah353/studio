'use client';
import React from 'react';
import { cn } from '@/lib/utils';

export function HorseLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-14 w-14 text-accent', className)}
    >
      <path d="M12 2a4 4 0 0 0-4 4v1.27C6.1 8.1 5 9.4 5 11v3c0 1.2.7 2.3 1.7 2.8L8 18H5v2h14v-2h-3l1.3-1.2c1- .5 1.7-1.6 1.7-2.8v-3c0-1.6-1.1-2.9-2.9-3.73V6a4 4 0 0 0-4-4zM8 9h8" />
      <path d="M9 13.5a2.5 2.5 0 0 1 5 0" />
      <path d="M12 18.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
    </svg>
  );
}
