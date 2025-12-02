'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Truck, Ship, Plane, Wifi, BrainCircuit, Bot } from 'lucide-react';
import { fleetData, FleetVehicle } from '@/lib/fleet-data';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const techFeatures = [
    { icon: <Wifi className="h-6 w-6 text-accent" />, title: 'Seguimiento en Tiempo Real', description: 'Visibilidad completa de tus envíos 24/7. Nuestra plataforma te permite conocer la ubicación y el estado de tu carga en todo momento.' },
    { icon: <BrainCircuit className="h-6 w-6 text-accent" />, title: 'IA para Optimización de Rutas', description: 'Nuestros algoritmos analizan datos en tiempo real para diseñar las rutas más rápidas y eficientes, reduciendo costes y tiempos de entrega.' },
    { icon: <Bot className="h-6 w-6 text-accent" />, title: 'Automatización de Almacenes', description: 'Implementamos robótica y sistemas automatizados en nuestros centros logísticos para una gestión de inventario y preparación de pedidos sin errores y a máxima velocidad.' },
];

type FilterType = 'all' | 'truck' | 'ship' | 'plane';


export default function FleetPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredFleet = filter === 'all' ? fleetData : fleetData.filter(v => v.type === filter);

  const fleetHeader = PlaceHolderImages.find(p => p.id === 'fleet-header');
  const techMap = PlaceHolderImages.find(p => p.id === 'tech-map');
  
  const getIconForType = (type: FleetVehicle['type']) => {
    switch (type) {
        case 'truck': return <Truck className="h-6 w-6 text-primary" />;
        case 'ship': return <Ship className="h-6 w-6 text-primary" />;
        case 'plane': return <Plane className="h-6 w-6 text-primary" />;
    }
  }

  const getStatusVariant = (status: FleetVehicle['status']) => {
    switch (status) {
        case 'Operativo': return 'default';
        case 'En Mantenimiento': return 'secondary';
        case 'En Ruta': return 'outline';
        default: return 'default';
    }
  }

  return (
    <div className="bg-background">
      <header className="relative h-64 md:h-80 w-full">
        {fleetHeader && (
          <Image
              src={fleetHeader.imageUrl}
              alt={fleetHeader.description}
              data-ai-hint={fleetHeader.imageHint}
              fill
              className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="container">
            <h1 className="font-headline text-4xl font-bold md:text-5xl text-white">Flota Moderna y Tecnología Avanzada</h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-white/90">
                Combinamos activos de primer nivel con la tecnología más innovadora para garantizar una logística superior.
            </p>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold">Nuestros Activos</h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">Explora nuestra flota y descubre la potencia detrás de cada envío.</p>
          </div>
          
          <div className="flex justify-center gap-2 mb-10">
              <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'default' : 'outline'}>Todos</Button>
              <Button onClick={() => setFilter('truck')} variant={filter === 'truck' ? 'default' : 'outline'}><Truck className="mr-2"/> Terrestre</Button>
              <Button onClick={() => setFilter('ship')} variant={filter === 'ship' ? 'default' : 'outline'}><Ship className="mr-2"/> Marítima</Button>
              <Button onClick={() => setFilter('plane')} variant={filter === 'plane' ? 'default' : 'outline'}><Plane className="mr-2"/> Aérea</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFleet.map(vehicle => {
                const image = PlaceHolderImages.find(p => p.id === vehicle.imageId);
                return (
                    <Card key={vehicle.id} className="flex flex-col overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl">
                        {image && (
                            <div className="aspect-w-16 aspect-h-9 bg-muted">
                                <Image
                                    src={image.imageUrl}
                                    alt={image.description}
                                    data-ai-hint={image.imageHint}
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                        <CardHeader className="flex-row items-start gap-4">
                            {getIconForType(vehicle.type)}
                            <div>
                                <CardTitle className="font-headline text-xl">{vehicle.name}</CardTitle>

                                <CardDescription>{vehicle.model}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div className="text-sm text-muted-foreground space-y-2">
                                <p><span className="font-semibold text-foreground">Capacidad:</span> {vehicle.specs.capacity}</p>
                                <p><span className="font-semibold text-foreground">Ruta Actual:</span> {vehicle.currentRoute}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <Badge variant={getStatusVariant(vehicle.status)}>{vehicle.status}</Badge>
                                <Button asChild variant="link" className="px-0">
                                  <Link href={`/fleet/${vehicle.id}`}>Ver Ficha Técnica</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
          </div>

        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                {techMap && (
                  <Image
                      src={techMap.imageUrl}
                      alt={techMap.description}
                      data-ai-hint={techMap.imageHint}
                      fill
                      className="object-cover"
                    />
                )}
            </div>
            <div>
              <h2 className="font-headline text-3xl font-bold mb-6">Nuestra Tecnología</h2>
              <ul className="space-y-6">
                {techFeatures.map((feature) => (
                  <li key={feature.title} className="flex items-start">
                    <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    