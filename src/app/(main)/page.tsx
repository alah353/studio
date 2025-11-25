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
    title: 'Velocidad y Fiabilidad',
    description: 'Optimizamos cada ruta para garantizar la entrega más rápida y segura posible. Tu tiempo es nuestra prioridad.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: 'Seguridad Integral',
    description: 'Tu carga está protegida en cada etapa del viaje. Ofrecemos seguimiento y monitorización constantes para tu tranquilidad.',
  },
  {
    icon: <Globe className="h-8 w-8 text-accent" />,
    title: 'Cobertura Global',
    description: 'Nuestra extensa red de socios nos permite llegar a cualquier rincón del planeta, sin importar la complejidad del destino.',
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="container">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              Horse S.L: Tu Mundo, Entregado.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl text-primary-foreground/90">
              Desbloquea el potencial de tu negocio con nuestra logística de vanguardia. Velocidad, seguridad y alcance global a tu servicio.
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
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Nuestros Servicios</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Soluciones logísticas integrales, diseñadas para cubrir cada una de tus necesidades con la máxima eficiencia.
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
            <h2 className="font-headline text-3xl font-bold md:text-4xl">¿Por Qué Elegirnos?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Combinamos tecnología de punta, una red global y un equipo de expertos para ofrecer un servicio logístico sin igual.
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
            Contacta con nuestros especialistas y descubre cómo Horse S.L. puede transformar tu cadena de suministro.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
            <Link href="/contact">
              Habla con un experto
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
