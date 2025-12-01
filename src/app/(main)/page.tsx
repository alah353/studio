import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, ShieldCheck, Zap } from 'lucide-react';

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
        <Image
          src="/cabecerainicio.jpg"
          alt="Cabecera de inicio de Horse S.L."
          fill
          className="object-cover"
          priority
        />
        
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="container">
            <h1 className="font-headline text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
              Horse S.L: Tu Mundo, Entregado.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
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
          <Image
            src="/servicios.png"
            alt="Nuestros servicios"
            width={1200}
            height={400}
            className="w-full h-auto"
          />
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
      <section className="relative py-16 md:py-24">
        <Image
            src="/portacontenedores.png"
            alt="Buque de portacontenedores en el mar"
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container text-center text-white">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">¿Listo para optimizar tu logística?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
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
