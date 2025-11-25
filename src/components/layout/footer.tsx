import Link from 'next/link';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { HorseLogo } from '@/components/layout/horse-logo';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center">
              <HorseLogo className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold font-headline">SwiftRoute</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Potencia y velocidad en logística. Soluciones de transporte veloces, seguras y con alcance global.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Facebook /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <p className="font-medium font-headline">Navegación</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">Sobre Nosotros</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary">Servicios</Link></li>
                <li><Link href="/fleet" className="text-muted-foreground hover:text-primary">Flota y Tecnología</Link></li>
                <li><Link href="/tracking" className="text-muted-foreground hover:text-primary">Seguimiento</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium font-headline">Legal</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Política de Privacidad</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Términos de Servicio</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Política de Cookies</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium font-headline">Contacto</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Email: contacto@swiftroute.com</li>
                <li>Teléfono: +34 912 345 678</li>
                <li>Dirección: Calle de la Logística 123, 28080 Madrid, España</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SwiftRoute Logistics. Todos los derechos reservados.</p>
            <p className="mt-4 text-xs text-muted-foreground sm:mt-0">Diseñado para la velocidad y la eficiencia global.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
