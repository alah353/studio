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
    description: 'Soluciones de transporte por carretera eficientes y flexibles para toda Europa.',
  },
  {
    icon: <Ship className="h-10 w-10 text-primary" />,
    title: 'Transporte Marítimo',
    description: 'Conectamos continentes con nuestros servicios de carga marítima, seguros y económicos.',
  },
  {
    icon: <Plane className="h-10 w-10 text-primary" />,
    title: 'Transporte Aéreo',
    description: 'La máxima velocidad para tus envíos más urgentes a cualquier destino del mundo.',
  },
];

const features = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: 'Rapidez Insuperable',
    description: 'Optimizamos cada ruta para garantizar los tiempos de entrega más cortos del mercado.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: 'Seguridad Garantizada',
    description: 'Tecnología de punta y protocolos estrictos para proteger tu carga en todo momento.',
  },
  {
    icon: <Globe className="h-8 w-8 text-accent" />,
    title: 'Cobertura Internacional',
    description: 'Nuestra red global nos permite llegar a cualquier rincón del planeta, sin excepciones.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full">
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
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end text-center text-primary-foreground pb-16 md:pb-24">
          <div className="container">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              Tu mundo, sin fronteras. Entregas que conectan.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl">
              Llevamos tus mercancías a cualquier destino con la máxima rapidez y seguridad. Descubre la logística que impulsa tu negocio.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">
                Solicita tu presupuesto <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Nuestros Servicios Clave</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ofrecemos una gama completa de soluciones logísticas diseñadas para satisfacer todas tus necesidades de transporte.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="text-center transition-transform hover:-translate-y-2 hover:shadow-lg">
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
            <h2 className="font-headline text-3xl font-bold md:text-4xl">¿Por Qué Elegir SwiftRoute?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Somos más que una empresa de transporte. Somos tu socio estratégico en logística.
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
          <h2 className="font-headline text-3xl font-bold md:text-4xl">¿Listo para optimizar tu logística?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Contacta con nuestro equipo de expertos y descubre cómo podemos ayudarte a alcanzar tus objetivos.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">
              Habla con un especialista
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
