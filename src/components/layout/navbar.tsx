'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu, User, CalendarPlus } from 'lucide-react';
import { HorseLogo } from './horse-logo';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Sobre Nosotros' },
  { href: '/services', label: 'Servicios' },
  { href: '/fleet', label: 'Flota' },
  { href: '/tracking', label: 'Seguimiento' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contacto' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('horse_user');
      setIsLoggedIn(!!user);
    }
  }, [pathname]);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-4">
            <HorseLogo />
            <span className="hidden sm:inline-block font-bold font-heading text-3xl text-white">Horse S.L.</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === href ? 'text-primary' : 'text-foreground/60'
              )}
            >
              {label}
            </Link>
          ))}
          
          {isLoggedIn && (
            <Link
              href="/booking"
              className={cn(
                'flex items-center gap-1 transition-colors hover:text-amber-500',
                pathname === '/booking' ? 'text-amber-500' : 'text-foreground/60'
              )}
            >
              <CalendarPlus className="h-4 w-4" />
              <span>Booking</span>
            </Link>
          )}

           <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              className={cn(
                'transition-colors hover:text-primary',
                (pathname === '/dashboard' || pathname === '/login') ? 'text-primary' : 'text-foreground/60'
              )}
            >
              <User className="h-5 w-5" />
              <span className="sr-only">{isLoggedIn ? "Dashboard" : "Login"}</span>
            </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mb-8 flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                 <HorseLogo className="w-24 h-auto" />
                <span className="ml-2 font-bold font-heading text-lg text-white">Horse S.L.</span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'text-lg',
                      pathname === href ? 'text-primary font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    {label}
                  </Link>
                ))}
                {isLoggedIn && (
                  <Link
                    href="/booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'text-lg',
                      pathname === '/booking' ? 'text-amber-500 font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    Booking
                  </Link>
                )}
                <Link
                  href={isLoggedIn ? "/dashboard" : "/login"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'text-lg',
                    pathname === '/dashboard' || pathname === '/login' ? 'text-primary font-semibold' : 'text-muted-foreground'
                  )}
                >
                  {isLoggedIn ? "Dashboard" : "Login"}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
