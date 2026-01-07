'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { LogOut, Package, Truck, AlertTriangle, User, Building, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// --- TIPOS DE DATOS ---
type UserData = {
  usuario: string;
  nom: string;
  empresa: string;
  rol: 'administrador' | 'treballador' | 'client';
};

type Shipment = {
  tracking_code: string;
  client: string;
  origin: string;
  destination: string;
  status: 'Lliurat' | 'En trànsit' | 'En magatzem' | 'Retingut' | 'Incidència';
  eta: string;
};

const API_URL = 'https://sheetdb.io/api/v1/rgytng002juic';

// --- COMPONENTES AUXILIARES ---

// Skeleton Loader para la Carga
const DashboardSkeleton = () => (
  <div className="container py-10">
    <div className="flex justify-between items-center mb-6">
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
    <Skeleton className="h-64 w-full" />
  </div>
);

// Barra de Progreso para Tarjetas de Cliente
const ProgressBar = ({ status }: { status: Shipment['status'] }) => {
  const getStatusInfo = (status: Shipment['status']) => {
    switch (status) {
      case 'En magatzem': return { width: '10%', color: 'bg-orange-500' };
      case 'En trànsit': return { width: '50%', color: 'bg-blue-500' };
      case 'Lliurat': return { width: '100%', color: 'bg-green-500' };
      default: return { width: '10%', color: 'bg-gray-400' };
    }
  };
  const { width, color } = getStatusInfo(status);

  return (
    <div className="w-full bg-muted rounded-full h-2.5">
      <div
        className={cn("h-2.5 rounded-full transition-all duration-700 ease-out", color)}
        style={{ width: width }}
      ></div>
    </div>
  );
};


// --- VISTAS POR ROL ---

// Vista para Administradores
const AdminView = ({ shipments }: { shipments: Shipment[] }) => {
  const kpis = useMemo(() => {
    const total = shipments.length;
    const inTransit = shipments.filter(s => s.status === 'En trànsit').length;
    const incidents = shipments.filter(s => s.status === 'Retingut' || s.status === 'Incidència').length;
    return { total, inTransit, incidents };
  }, [shipments]);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Envíos Activos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Tránsito</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.inTransit}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidencias</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{kpis.incidents}</div>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Tabla Maestra de Envíos</h2>
      <MasterTable shipments={shipments} />
    </div>
  );
};

// Vista para Trabajadores
const WorkerView = ({ shipments }: { shipments: Shipment[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredShipments = useMemo(() => {
    if (!searchTerm) return shipments;
    return shipments.filter(s =>
      s.tracking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.client.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [shipments, searchTerm]);

  return (
    <div>
        <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Buscar por código de tracking o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-lg pl-10"
            />
        </div>
        <MasterTable shipments={filteredShipments} />
    </div>
  );
};

// Vista para Clientes
const ClientView = ({ shipments, user }: { shipments: Shipment[], user: UserData }) => {
  const clientShipments = useMemo(() => {
    return shipments.filter(s => 
        s.client && user.empresa && 
        s.client.trim().toLowerCase() === user.empresa.trim().toLowerCase()
    );
  }, [shipments, user.empresa]);

  if (clientShipments.length === 0) {
    return <p>No se han encontrado envíos para tu empresa ({user.empresa}).</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clientShipments.map(shipment => (
        <Card key={shipment.tracking_code}>
          <CardHeader>
            <CardTitle className="text-base font-bold">{shipment.tracking_code}</CardTitle>
            <CardDescription>{shipment.origin} → {shipment.destination}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Estado: <span className="font-bold">{shipment.status}</span></p>
              <ProgressBar status={shipment.status} />
            </div>
            <div>
              <p className="text-sm font-medium">Entrega estimada (ETA)</p>
              <p className="font-semibold">{shipment.eta}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Tabla Maestra compartida
const MasterTable = ({ shipments }: { shipments: Shipment[] }) => {
    const getStatusColor = (status: Shipment['status']) => {
        switch(status) {
            case 'Lliurat': return 'text-green-500';
            case 'En trànsit': return 'text-orange-500';
            case 'Incidència':
            case 'Retingut': return 'text-red-500';
            default: return 'text-muted-foreground';
        }
    };
    
    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tracking ID</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Ruta</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>ETA</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shipments.map((s) => (
                        <TableRow key={s.tracking_code}>
                            <TableCell className="font-medium">{s.tracking_code}</TableCell>
                            <TableCell>{s.client}</TableCell>
                            <TableCell>{s.origin} → {s.destination}</TableCell>
                            <TableCell className={cn("font-semibold", getStatusColor(s.status))}>{s.status}</TableCell>
                            <TableCell>{s.eta}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};


// --- COMPONENTE PRINCIPAL DEL DASHBOARD ---
export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Proteger la ruta y cargar datos de usuario
    try {
      const userDataString = localStorage.getItem('user');
      if (userDataString) {
        setUser(JSON.parse(userDataString));
      } else {
        router.push('/login');
        return;
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      router.push('/login');
      return;
    }
    
    // 2. Cargar datos de envíos
    const fetchShipments = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Error al obtener los datos de envíos');
            }
            const data = await response.json();
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
    localStorage.removeItem('user');
    router.push('/login');
  };

  const renderContent = () => {
    if (isLoading) {
      return <DashboardSkeleton />;
    }

    if (!user) return null; // No renderizar nada si el usuario no está cargado

    switch (user.rol) {
      case 'administrador':
        return <AdminView shipments={shipments} />;
      case 'treballador':
        return <WorkerView shipments={shipments} />;
      case 'client':
        return <ClientView shipments={shipments} user={user} />;
      default:
        return <p>Rol de usuario no reconocido.</p>;
    }
  };
  
  if (isLoading || !user) {
    return (
        <div className="min-h-screen bg-background">
             <div className="container py-10">{renderContent()}</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
        <div className="container py-10">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Hola, {user.nom}</h1>
                <Button onClick={handleLogout} variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                </Button>
            </header>
            
            <main>
                {renderContent()}
            </main>
        </div>
    </div>
  );
}
