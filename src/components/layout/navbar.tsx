'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu, User } from 'lucide-react';
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
    // Check for user in localStorage only on client-side
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    }
  }, [pathname]); // Re-check on route change


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-4">
            <HorseLogo />
            <span className="hidden sm:inline-block font-bold font-headline text-3xl text-white">Horse S.L.</span>
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
                <span className="ml-2 font-bold font-headline text-lg text-white">Horse S.L.</span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {[...navLinks, { href: isLoggedIn ? "/dashboard" : "/login", label: isLoggedIn ? "Dashboard" : "Login" }].map(({ href, label }) => (
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
