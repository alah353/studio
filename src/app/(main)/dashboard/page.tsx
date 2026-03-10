'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LogOut, Package, Truck, FileText, CalendarPlus, MapPin, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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

// URL de l'API apuntant específicament a la pestanya de tracking
const API_URL = 'https://sheetdb.io/api/v1/rgytng002juic?sheet=tracking';

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
            if (!response.ok) throw new Error('Error al connectar amb l\'API');
            const data: Shipment[] = await response.json();
            // Invertim l'ordre per veure els darrers primer
            setShipments(data.reverse());
        } catch (error) {
            console.error('Error carregant enviaments:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchShipments();
  }, [router]);

  // Lògica de filtratge a prova de bales
  const filteredShipments = useMemo(() => {
    if (!user) return [];
    
    // Normalitzem rol i usuari per a la comparació
    const userRole = String(user.rol || '').toLowerCase().trim();
    const currentUserEmail = String(user.usuario || '').toLowerCase().trim();

    // L'administrador o el treballador ho veuen TOT
    if (userRole.includes('admin') || userRole.includes('treballador')) {
      return shipments;
    }

    // El client només veu els seus (comparació insensible a majúscules/minúscules)
    return shipments.filter(s => {
      const shipmentUser = String(s.usuari || '').toLowerCase().trim();
      return shipmentUser === currentUserEmail;
    });
  }, [shipments, user]);

  const handleLogout = () => {
    localStorage.removeItem('horse_user');
    router.push('/login');
  };

  const getStatusBadge = (status: string) => {
    const s = String(status || '').toLowerCase();
    if (s.includes('lliurat')) return <Badge className="bg-green-600">Lliurat</Badge>;
    if (s.includes('trànsit')) return <Badge className="bg-blue-600">En trànsit</Badge>;
    if (s.includes('magatzem')) return <Badge className="bg-amber-600">En magatzem</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
        <div className="container py-10">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-bold font-heading">Hola, {user.nom}</h1>
                    <p className="text-muted-foreground mt-1">{user.empresa} • {user.rol}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button asChild variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
                        <Link href="/booking">
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            Nova Comanda
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/documents">
                            <FileText className="mr-2 h-4 w-4" />
                            Factures
                        </Link>
                    </Button>
                    <Button onClick={handleLogout} variant="destructive" size="sm">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sortir
                    </Button>
                </div>
            </header>
            
            <main className="space-y-8">
                {/* Resum de Seguiment */}
                <Card className="border-gray-800 shadow-xl overflow-hidden">
                    <CardHeader className="bg-muted/30">
                        <div className="flex items-center gap-3">
                            <Truck className="h-6 w-6 text-amber-500" />
                            <div>
                                <CardTitle className="font-heading">
                                    {String(user.rol).toLowerCase().includes('admin') 
                                        ? 'Panell d\'Administració: Tots els enviaments' 
                                        : 'Seguiment dels teus enviaments'}
                                </CardTitle>
                                <CardDescription>
                                    Vista detallada de l'estat actual de la xarxa logística.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                          <div className="p-8 space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        ) : filteredShipments.length > 0 ? (
                          <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gray-800">
                                        <TableHead className="font-bold">Codi Tracking</TableHead>
                                        <TableHead className="font-bold">Client</TableHead>
                                        <TableHead className="font-bold">Ruta</TableHead>
                                        <TableHead className="font-bold">Estat</TableHead>
                                        <TableHead className="font-bold">Ubicació</TableHead>
                                        <TableHead className="font-bold text-right">ETA</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredShipments.map((shipment, idx) => (
                                        <TableRow key={idx} className="border-gray-800 hover:bg-muted/20">
                                            <TableCell className="font-mono text-amber-500 font-bold">
                                                {shipment.tracking_code}
                                            </TableCell>
                                            <TableCell className="text-xs">
                                                {shipment.client}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{shipment.origin}</span>
                                                    <span className="text-[10px] text-muted-foreground uppercase">Cap a {shipment.destination}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(shipment.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1.5 text-sm">
                                                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                                    {shipment.location}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                                    {shipment.eta}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                            <Package className="h-12 w-12 mb-4 opacity-20" />
                            <p>No s'han trobat dades a la pestanya 'tracking'.</p>
                          </div>
                        )}
                    </CardContent>
                </Card>

                {/* Secció Informativa */}
                <Card className="bg-amber-500/5 border-amber-500/20">
                    <CardHeader>
                        <CardTitle className="text-lg font-heading text-amber-500">Panell de Control Horse S.L.</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Aquest panell sincronitza en temps real amb la nostra flota. Els administradors tenen accés total per supervisar les operacions de tots els clients, mentre que els clients mantenen la seva privadesa veient només els seus actius.
                        </p>
                    </CardContent>
                </Card>
            </main>
        </div>
    </div>
  );
}