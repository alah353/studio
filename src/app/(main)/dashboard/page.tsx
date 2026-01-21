'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { LogOut, Package, Truck, AlertTriangle, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// --- TIPOS DE DATOS ---
type UserData = {
  usuario: string;
  nom: string;
  empresa: string;
  rol: 'administrador' | 'administardor' | 'treballador' | 'client';
};

type Shipment = {
  tracking_code: string;
  client: string;
  origin: string;
  destination: string;
  status: 'Lliurat' | 'En trànsit' | 'En magatzem' | 'Retingut' | 'Incidència';
  eta: string;
  location: string;
};

const API_URL = 'https://sheetdb.io/api/v1/rgytng002juic';

// --- COMPONENTES AUXILIARES ---

const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
    <Skeleton className="h-10 w-1/2" />
    <Skeleton className="h-64 w-full" />
  </div>
);

const ProgressBar = ({ status }: { status: Shipment['status'] }) => {
  const getStatusInfo = (status: Shipment['status']) => {
    if (status.includes('Lliurat')) return { width: '100%', color: 'bg-green-500' };
    if (status.includes('En trànsit')) return { width: '50%', color: 'bg-blue-500' };
    if (status.includes('En magatzem')) return { width: '20%', color: 'bg-yellow-500' };
    if (status.includes('Incidència') || status.includes('Retingut')) return { width: '10%', color: 'bg-red-500' };
    return { width: '5%', color: 'bg-gray-400' };
  };

  const { width, color } = getStatusInfo(status);

  return (
    <div className="w-full bg-muted rounded-full h-2.5 mt-2">
      <div
        className={cn("h-2.5 rounded-full transition-all duration-700 ease-out", color)}
        style={{ width }}
      ></div>
    </div>
  );
};


// --- VISTAS POR ROL ---

const AdminView = ({ shipments }: { shipments: Shipment[] }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const kpis = useMemo(() => {
        const total = shipments.length;
        const inTransit = shipments.filter(s => s.status === 'En trànsit').length;
        const incidents = shipments.filter(s => s.status === 'Retingut' || s.status === 'Incidència').length;
        return { total, inTransit, incidents };
    }, [shipments]);

    const filteredShipments = useMemo(() => {
        if (!searchTerm) return shipments;
        return shipments.filter(s =>
            (s.tracking_code?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (s.client?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );
    }, [shipments, searchTerm]);

    return (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Envíos</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{kpis.total}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">En Tránsito</CardTitle>
                        <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{kpis.inTransit}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Incidencias</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold text-red-500">{kpis.incidents}</div></CardContent>
                </Card>
            </div>
             <div>
                <div className="mb-4 relative max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por código o cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10"
                    />
                </div>
                <MasterTable shipments={filteredShipments} />
            </div>
        </div>
    );
};

const WorkerView = ({ shipments }: { shipments: Shipment[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredShipments = useMemo(() => {
    if (!searchTerm) return shipments;
    return shipments.filter(s =>
      (s.tracking_code?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (s.client?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }, [shipments, searchTerm]);

  return (
    <div>
        <div className="mb-4 relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Buscar por código o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
            />
        </div>
        <MasterTable shipments={filteredShipments} />
    </div>
  );
};

const ClientView = ({ shipments, user }: { shipments: Shipment[], user: UserData }) => {
  const clientShipments = useMemo(() => {
    if (!user.empresa) return [];
    
    // Debugging log
    console.log("Comparando Usuario:", user.empresa, "con primer Tracking:", shipments[0]?.client);

    const userCompany = user.empresa.toString().toLowerCase().trim();
    
    return shipments.filter(shipment => {
      if (!shipment.client) return false;
      const shipmentClient = shipment.client.toString().toLowerCase().trim();
      return shipmentClient === userCompany;
    });

  }, [shipments, user.empresa]);

  if (clientShipments.length === 0) {
    return <p>No se han encontrado envíos para tu empresa ({user.empresa}).</p>;
  }

  return (
    <div>
        <h2 className="text-2xl font-semibold mb-6">Mis Envíos Activos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clientShipments.map(shipment => (
            <Card key={shipment.tracking_code}>
            <CardHeader>
                <CardTitle className="text-lg font-bold">{shipment.tracking_code}</CardTitle>
                <CardDescription>{shipment.origin} → {shipment.destination}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <p className="text-sm font-medium">Estado: <span className="font-semibold">{shipment.status}</span></p>
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
    </div>
  );
};

// --- TABLA MAESTRA (COMPARTIDA) ---
const MasterTable = ({ shipments }: { shipments: Shipment[] }) => {
    const getStatusBadge = (status: Shipment['status']) => {
        const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
        if (status.includes('Lliurat')) return cn(baseClasses, "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200");
        if (status.includes('En trànsit')) return cn(baseClasses, "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200");
        if (status.includes('En magatzem')) return cn(baseClasses, "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200");
        if (status.includes('Incidència') || status.includes('Retingut')) return cn(baseClasses, "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200");
        return cn(baseClasses, "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200");
    };
    
    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tracking</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Origen</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Ubicación</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shipments.map((s) => (
                        <TableRow key={s.tracking_code}>
                            <TableCell className="font-medium">{s.tracking_code}</TableCell>
                            <TableCell>{s.client}</TableCell>
                            <TableCell>{s.origin}</TableCell>
                            <TableCell>{s.destination}</TableCell>
                            <TableCell><span className={getStatusBadge(s.status)}>{s.status}</span></TableCell>
                            <TableCell>{s.location}</TableCell>
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
      localStorage.removeItem('user');
      router.push('/login');
      return;
    }
    
    // 2. Cargar datos de envíos
    const fetchShipments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error al obtener los datos de envíos');
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
    localStorage.removeItem('user');
    router.push('/login');
  };

  const renderContent = () => {
    if (!user) return <DashboardSkeleton />;

    const isAdmin = user.rol === 'administrador' || user.rol === 'administardor';

    if (isLoading) {
      return <DashboardSkeleton />;
    }

    if (isAdmin) {
        return <AdminView shipments={shipments} />;
    } else if (user.rol === 'treballador') {
        return <WorkerView shipments={shipments} />;
    } else if (user.rol === 'client') {
        return <ClientView shipments={shipments} user={user} />;
    } else {
        return <p>Rol de usuario no reconocido.</p>;
    }
  };
  
  if (!user) {
      return (
          <div className="min-h-screen bg-background flex items-center justify-center">
              <DashboardSkeleton />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-background">
        <div className="container py-10">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Hola, {user.nom}</h1>
                <Button onClick={handleLogout} variant="destructive" size="sm">
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
