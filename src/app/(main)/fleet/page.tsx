import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Truck, Ship, Plane, Wifi, BrainCircuit, Bot } from 'lucide-react';

const fleetImage = PlaceHolderImages.find(p => p.id === 'fleet-trucks');
const techImage = PlaceHolderImages.find(p => p.id === 'tech-map');

const vehicleTypes = [
  { icon: <Truck className="h-8 w-8 text-primary" />, title: 'Caballería Terrestre', description: 'Una estampida de camiones y tráileres de última generación, listos para devorar kilómetros. Carga seca, refrigerada o sobredimensionada: nada se resiste a nuestra potencia.' },
  { icon: <Ship className="h-8 w-8 text-primary" />, title: 'Armada Marítima', description: 'Nuestra alianza con las principales navieras nos da el poder de un leviatán en los océanos. Controlamos las rutas marítimas para que tu carga llegue con la fuerza de una marea.' },
  { icon: <Plane className="h-8 w-8 text-primary" />, title: 'Fuerza Aérea de Carga', description: 'Nuestros socios aéreos son los halcones del cielo. Envíos urgentes que viajan a velocidades de vértigo, porque en los negocios, el que golpea primero, golpea dos veces.' },
];

const techFeatures = [
    { icon: <Wifi className="h-6 w-6 text-accent" />, title: 'Dominio Total con Seguimiento Predictivo', description: 'No solo ves dónde está tu carga; anticipamos su siguiente movimiento. Nuestra IA analiza rutas, tráfico y clima para un control absoluto en tiempo real.' },
    { icon: <BrainCircuit className="h-6 w-6 text-accent" />, title: 'IA para Optimización de Rutas', description: 'Nuestros algoritmos son estrategas digitales que diseñan las rutas más rápidas y eficientes. Ahorramos tiempo y combustible, aumentando tu ventaja competitiva.' },
    { icon: <Bot className="h-6 w-6 text-accent" />, title: 'Automatización y Robótica', description: 'En nuestros centros, la automatización avanzada y la robótica trabajan sin descanso, garantizando una gestión de inventario y preparación de pedidos a una velocidad sobrehumana.' },
];

export default function FleetPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Flota Imparable. Tecnología de Combate.</h1>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Poseemos el músculo y el cerebro. Activos de élite y la tecnología más agresiva para garantizar una superioridad logística total.
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
              <h2 className="font-headline text-3xl font-bold mb-6">Nuestro Músculo: La Flota</h2>
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
              <h2 className="font-headline text-3xl font-bold mb-6">Nuestro Cerebro: La Tecnología</h2>
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
