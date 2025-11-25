import { fleetData } from '@/lib/fleet-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, HardDrive, Gauge, MapPin, Wrench, CheckCircle } from 'lucide-react';
import { FleetVehicle } from '@/lib/fleet-data';

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = fleetData.find((v) => v.id === params.id);

  if (!vehicle) {
    notFound();
  }

  const image = PlaceHolderImages.find((p) => p.id === vehicle.imageId);

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
      <main className="py-16 md:py-24">
        <div className="container">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href="/fleet">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a la Flota
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              <Card>
                  {image && (
                    <div className="relative aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        data-ai-hint={image.imageHint}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                   <CardHeader>
                        <CardTitle className="font-headline text-4xl">{vehicle.name}</CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">{vehicle.model}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex items-center justify-between mb-6">
                            <Badge variant={getStatusVariant(vehicle.status)} className="text-lg px-4 py-1">{vehicle.status}</Badge>
                         </div>

                        <div className="grid sm:grid-cols-2 gap-6 text-lg">
                            <div className="flex items-center gap-3">
                                <HardDrive className="h-6 w-6 text-accent" />
                                <div>
                                    <p className="font-semibold">Capacidad</p>
                                    <p className="text-muted-foreground">{vehicle.specs.capacity}</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Gauge className="h-6 w-6 text-accent" />
                                <div>
                                    <p className="font-semibold">Autonomía</p>
                                    <p className="text-muted-foreground">{vehicle.specs.range}</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3 col-span-2">
                                <MapPin className="h-6 w-6 text-accent" />
                                <div>
                                    <p className="font-semibold">Ubicación / Ruta Actual</p>
                                    <p className="text-muted-foreground">{vehicle.currentRoute}</p>
                                </div>
                            </div>
                        </div>

                    </CardContent>
              </Card>
            </div>
            <div className="md:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Historial y Mantenimiento</CardTitle>
                        <CardDescription>Registro de eventos clave del vehículo.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {vehicle.history.map((event, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        {event.event.includes('Mantenimiento') ? <Wrench className="h-5 w-5 text-accent" /> : <CheckCircle className="h-5 w-5 text-green-500" />}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{event.event}</p>
                                        <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                 </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
