'use client';

import { TrackingForm } from './tracking-form';
import { PackageSearch } from 'lucide-react';
import { Chat } from './chat';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const headerImage = PlaceHolderImages.find(p => p.id === 'tracking-header');

export default function TrackingPage() {
  return (
    <div className="bg-background">
       <header className="relative h-64 md:h-80 w-full">
        {headerImage && (
            <Image
                src={headerImage.imageUrl}
                alt={headerImage.description}
                data-ai-hint={headerImage.imageHint}
                fill
                className="object-cover"
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="container">
             <h1 className="font-headline text-4xl font-bold md:text-5xl text-white">Seguimiento de Envíos</h1>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-white/90">
                Introduce tu número de seguimiento para consultar el estado y la ubicación de tu envío en tiempo real.
            </p>
          </div>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container max-w-4xl grid gap-16">
            <TrackingForm />
            <Chat />
        </div>
      </main>
    </div>
  );
}
