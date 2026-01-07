'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building, LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type UserData = {
  nom: string;
  empresa: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        router.push('/login');
      }
    } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        router.push('/login');
    } finally {
        setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
        <div className="container py-16 md:py-24">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-6 w-1/3" />
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                </CardContent>
            </Card>
        </div>
    )
  }

  if (!user) {
    return null; // or a redirect component
  }

  return (
    <div className="container py-16 md:py-24">
        <div className="flex justify-center">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">Benvingut, {user.nom}!</CardTitle>
                <CardDescription>Aquest és el teu panell de control personalitzat.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="space-y-4 text-lg">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <User className="h-6 w-6 text-accent" />
                        <div>
                            <p className="font-semibold text-muted-foreground">Nom d'usuari</p>
                            <p className="font-bold text-foreground">{user.nom}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Building className="h-6 w-6 text-accent" />
                        <div>
                            <p className="font-semibold text-muted-foreground">Empresa</p>
                            <p className="font-bold text-foreground">{user.empresa}</p>
                        </div>
                    </div>
                </div>
                <Button onClick={handleLogout} variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Tancar Sessió
                </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
