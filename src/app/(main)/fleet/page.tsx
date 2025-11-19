import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Truck, Ship, Plane, Wifi, Map, Cpu } from 'lucide-react';

const fleetImage = PlaceHolderImages.find(p => p.id === 'fleet-trucks');
const techImage = PlaceHolderImages.find(p => p.id === 'tech-map');

const vehicleTypes = [
  { icon: <Truck className="h-8 w-8 text-primary" />, title: 'Camiones y Tráileres', description: 'Flota versátil para carga seca, refrigerada y de gran volumen.' },
  { icon: <Ship className="h-8 w-8 text-primary" />, title: 'Portacontenedores', description: 'Acceso a una red global de buques para todo tipo de contenedores.' },
  { icon: <Plane className="h-8 w-8 text-primary" />, title: 'Aviones de Carga', description: 'Partnerships estratégicos para envíos aéreos urgentes y prioritarios.' },
];

const techFeatures = [
    { icon: <Wifi className="h-6 w-6 text-accent" />, title: 'GPS y Seguimiento en Tiempo Real', description: 'Cada vehículo y contenedor está equipado con tecnología GPS avanzada, permitiendo un seguimiento preciso y en directo de tu mercancía desde cualquier dispositivo.' },
    { icon: <Map className="h-6 w-6 text-accent" />, title: 'Trazabilidad Completa', description: 'Nuestro sistema de trazabilidad digital registra cada hito del viaje, desde la recogida hasta la entrega, ofreciendo una transparencia total y auditorías fiables.' },
    { icon: <Cpu className="h-6 w-6 text-accent" />, title: 'Innovaciones Logísticas', description: 'Implementamos algoritmos de optimización de rutas, análisis predictivo de tiempos de entrega e integración API para una gestión de la cadena de suministro más inteligente y eficiente.' },
];

export default function FleetPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Flota Moderna y Tecnología de Vanguardia</h1>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Invertimos en los mejores activos y las herramientas más avanzadas para garantizar un servicio de máxima calidad.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {fleetImage && (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={fleetImage.imageUrl}
                  alt={fleetImage.description}
                  data-ai-hint={fleetImage.imageHint}
                  width={600}
                  height={450}
                  className="object-cover w-full"
                />
              </div>
            )}
            <div>
              <h2 className="font-headline text-3xl font-bold mb-6">Nuestra Flota</h2>
              <div className="space-y-6">
                {vehicleTypes.map((vehicle) => (
                  <Card key={vehicle.title} className="bg-background">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        {vehicle.icon}
                        <CardTitle className="font-headline text-xl">{vehicle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{vehicle.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-last">
              {techImage && (
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={techImage.imageUrl}
                    alt={techImage.description}
                    data-ai-hint={techImage.imageHint}
                    width={600}
                    height={450}
                    className="object-cover w-full"
                  />
                </div>
              )}
            </div>
            <div>
              <h2 className="font-headline text-3xl font-bold mb-6">Tecnología que Marca la Diferencia</h2>
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
