import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Globe, ShieldCheck, Ship, Truck, Plane, Zap } from 'lucide-react';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

const services = [
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: 'Transporte Terrestre',
    description: 'Nuestra flota de carretera, ágil y potente, garantiza entregas veloces en toda Europa.',
  },
  {
    icon: <Ship className="h-10 w-10 text-primary" />,
    title: 'Transporte Marítimo',
    description: 'Dominamos los océanos para conectar continentes, moviendo grandes volúmenes con fuerza y fiabilidad.',
  },
  {
    icon: <Plane className="h-10 w-10 text-primary" />,
    title: 'Transporte Aéreo',
    description: 'La máxima expresión de velocidad para tus envíos más críticos, directos a cualquier destino global.',
  },
];

const features = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: 'Potencia y Velocidad',
    description: 'Como un pura sangre, nuestra logística está diseñada para la máxima velocidad y rendimiento.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: 'Fiabilidad Absoluta',
    description: 'Tu carga es sagrada. La protegemos con la fuerza y la nobleza de un corcel de confianza.',
  },
  {
    icon: <Globe className="h-8 w-8 text-accent" />,
    title: 'Alcance Global Imparable',
    description: 'Nuestra red galopa sin descanso para conquistar cualquier rincón del planeta para ti.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <div className="container">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              Horse S.L: La Potencia que Impulsa tu Mundo.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl">
              Desatamos la fuerza de una logística sin precedentes. Velocidad, poder y precisión para llevar tu negocio a la meta.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              <Link href="/contact">
                Desata tu Potencial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Nuestros Servicios de Élite</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Diseñados para la victoria, nuestros servicios logísticos cubren todas las distancias con una potencia inigualable.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="text-center transition-transform hover:-translate-y-2 hover:shadow-lg border-primary/20 bg-card">
                <CardHeader>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    {service.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-headline text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">¿Por Qué Galopar con Nosotros?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No solo movemos mercancías. Inyectamos la potencia de un motor de pura sangre en tu cadena de suministro.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  {feature.icon}
                </div>
                <h3 className="mt-6 font-headline text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">¿Listo para liderar la carrera?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Contacta con nuestros estrategas y descubre cómo la potencia de Horse S.L. puede transformar tu logística.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
            <Link href="/contact">
              Habla con un especialista
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
