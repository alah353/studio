import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Montserrat, Open_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Horse S.L. - Solucions Logístiques Globals',
  description: 'Operador logístic de confiança. Seguiment d\'enviaments en temps real a horse-logistics.cat.',
  icons: {
    icon: '/caballodefinitivoletra1.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={cn('min-h-screen bg-background font-body antialiased', montserrat.variable, openSans.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
