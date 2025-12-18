'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { HorseLogo } from './horse-logo';
import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center">
              <HorseLogo />
              <span className="ml-2 text-xl font-bold font-headline">Horse S.L.</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Potencia y velocidad en logística. Soluciones de transporte veloces, seguras y con alcance global.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Twitter /></a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <p className="font-medium font-headline">Navegación</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">Sobre Nosotros</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary">Servicios</Link></li>
                <li><Link href="/fleet" className="text-muted-foreground hover:text-primary">Flota</Link></li>
                <li><Link href="/tracking" className="text-muted-foreground hover:text-primary">Seguimiento</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium font-headline">Servicios</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/services#land" className="text-muted-foreground hover:text-primary">Transporte Terrestre</Link></li>
                <li><Link href="/services#sea" className="text-muted-foreground hover:text-primary">Transporte Marítimo</Link></li>
                <li><Link href="/services#air" className="text-muted-foreground hover:text-primary">Transporte Aéreo</Link></li>
                <li><Link href="/services#logistics" className="text-muted-foreground hover:text-primary">Logística Integral</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium font-headline">Legal</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Política de Privacidad</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Términos de Servicio</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          {currentYear && <p>&copy; {currentYear} Horse S.L. Todos los derechos reservados.</p>}
        </div>
      </div>
    </footer>
  );
}
