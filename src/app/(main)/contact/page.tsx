import { ContactForm } from './contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const contactDetails = [
    {
      icon: <Mail className="h-6 w-6 text-accent" />,
      title: "Email",
      value: "contacto@horsesl.com",
      description: "Para consultas generales y cotizaciones."
    },
    {
      icon: <Phone className="h-6 w-6 text-accent" />,
      title: "Teléfono",
      value: "+34 977 54 32 10",
      description: "Atención directa de lunes a viernes, 9h-18h."
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      title: "Oficina Central",
      value: "Polígono Industrial Riuclar, 43006 Tarragona, España",
      description: "Visítanos para una consulta personalizada."
    }
]

export default function ContactPage() {
  const contactHeader = PlaceHolderImages.find(p => p.id === 'contact-header');

  return (
    <div className="bg-background">
      <header className="relative h-64 md:h-80 w-full">
        {contactHeader && (
          <Image
              src={contactHeader.imageUrl}
              alt={contactHeader.description}
              data-ai-hint={contactHeader.imageHint}
              fill
              className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="container">
             <h1 className="font-headline text-4xl font-bold md:text-5xl text-white">Contacta con Nosotros</h1>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-white/90">
                Estamos listos para ayudarte. Contacta con nuestro equipo de expertos y descubre cómo podemos optimizar tu logística.
            </p>
          </div>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="font-headline text-3xl font-bold">Información de Contacto</h2>
              <p className="text-muted-foreground">
                Nuestro equipo está a tu disposición para resolver tus dudas y ofrecerte soluciones a medida para tus necesidades logísticas.
              </p>
              <div className="space-y-6">
                {contactDetails.map(detail => (
                    <div key={detail.title} className="flex items-start">
                        <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mr-4">
                            {detail.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{detail.title}</h3>
                            <p className="text-foreground">{detail.value}</p>
                            <p className="text-sm text-muted-foreground">{detail.description}</p>
                        </div>
                    </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

    