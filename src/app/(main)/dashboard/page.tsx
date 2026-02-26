'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { LogOut, Package, Truck, AlertTriangle, Search, FileText, CalendarPlus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type UserData = {
  usuario: string;
  nom: string;
  empresa: string;
  rol: string;
};

type Shipment = {
  tracking_code: string;
  client: string;
  origin: string;
  destination: string;
  status: string;
  eta: string;
  location: string;
  usuari?: string;
};

const API_URL = 'https://sheetdb.io/api/v1/rgytng002juic';

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userDataString = localStorage.getItem('horse_user');
    if (userDataString) {
      setUser(JSON.parse(userDataString));
    } else {
      router.push('/login');
      return;
    }
    
    const fetchShipments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_URL);
            const data: Shipment[] = await response.json();
            setShipments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchShipments();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('horse_user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
        <div className="container py-10">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Hola, {user.nom}</h1>
                <div className="flex flex-wrap items-center gap-4">
                    <Button asChild variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
                        <Link href="/booking">
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            Gestió Comandes
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/documents">
                            <FileText className="mr-2 h-4 w-4" />
                            Mis Documentos
                        </Link>
                    </Button>
                    <Button onClick={handleLogout} variant="destructive" size="sm">
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                    </Button>
                </div>
            </header>
            
            <main>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-64 w-full" />
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Resumen de Actividad</CardTitle>
                      <CardDescription>Visualiza el estado de tus operaciones logísticas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Bienvenido a tu panel de control de Horse S.L.</p>
                    </CardContent>
                  </Card>
                )}
            </main>
        </div>
    </div>
  );
}
