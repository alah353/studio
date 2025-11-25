import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Truck, Ship, Plane, Wifi, BrainCircuit, Bot } from 'lucide-react';

const fleetImage = PlaceHolderImages.find(p => p.id === 'fleet-trucks');
const techImage = PlaceHolderImages.find(p => p.id === 'tech-map');

const vehicleTypes = [
  { icon: <Truck className="h-8 w-8 text-primary" />, title: 'Flota Terrestre', description: 'Camiones y tráileres de última generación, equipados para todo tipo de carga. Garantizamos flexibilidad y eficiencia en rutas nacionales e internacionales.' },
  { icon: <Ship className="h-8 w-8 text-primary" />, title: 'Conexiones Marítimas', description: 'Nuestra red de alianzas con las principales navieras nos permite ofrecer un servicio marítimo global, fiable y competitivo para carga contenerizada.' },
  { icon: <Plane className="h-8 w-8 text-primary" />, title: 'Carga Aérea', description: 'Colaboramos con las mejores aerolíneas de carga para ofrecerte soluciones rápidas y seguras para tus envíos más urgentes a cualquier parte del mundo.' },
];

const techFeatures = [
    { icon: <Wifi className="h-6 w-6 text-accent" />, title: 'Seguimiento en Tiempo Real', description: 'Visibilidad completa de tus envíos 24/7. Nuestra plataforma te permite conocer la ubicación y el estado de tu carga en todo momento.' },
    { icon: <BrainCircuit className="h-6 w-6 text-accent" />, title: 'IA para Optimización de Rutas', description: 'Nuestros algoritmos analizan datos en tiempo real para diseñar las rutas más rápidas y eficientes, reduciendo costes y tiempos de entrega.' },
    { icon: <Bot className="h-6 w-6 text-accent" />, title: 'Automatización de Almacenes', description: 'Implementamos robótica y sistemas automatizados en nuestros centros logísticos para una gestión de inventario y preparación de pedidos sin errores y a máxima velocidad.' },
];

export default function FleetPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Flota Moderna y Tecnología Avanzada</h1>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Combinamos activos de primer nivel con la tecnología más innovadora para garantizar una logística superior.
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
              <h2 className="font-headline text-3xl font-bold mb-6">Nuestros Activos</h2>
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
