import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Space_Grotesk, PT_Sans } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'SwiftRoute Logistics - Potencia y Velocidad en Logística',
  description: 'Soluciones de transporte y logística a nivel global. Velocidad, seguridad e innovación para conectar tu negocio con el mundo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={cn('min-h-screen bg-background font-body antialiased', spaceGrotesk.variable, ptSans.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
