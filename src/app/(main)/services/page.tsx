'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ServiceRequestForm } from './service-request-form';
import { useState } from 'react';

const services = [
  {
    id: 'land',
    title: 'Transporte Terrestre',
    description: 'Conectamos ciudades y países con una flota moderna y versátil. Ofrecemos servicios de Carga Completa (FTL) y Grupaje (LTL), adaptándonos a tus necesidades de volumen y urgencia con la máxima fiabilidad y seguimiento en tiempo real.',
    advantages: ['Flexibilidad para cargas de cualquier tamaño', 'Rutas optimizadas para máxima eficiencia', 'Seguimiento GPS en toda la flota', 'Servicio puerta a puerta ágil y seguro'],
    imageId: 'service-land'
  },
  {
    id: 'sea',
    title: 'Transporte Marítimo',
    description: 'Tu mejor aliado para el comercio internacional. Gestionamos contenedores completos (FCL) y grupajes (LCL), garantizando soluciones económicas y fiables para grandes volúmenes de carga a cualquier puerto del mundo.',
    advantages: ['Soluciones rentables para largas distancias', 'Gran capacidad de carga', 'Gestión aduanera experta y sin complicaciones', 'Red global de puertos y socios estratégicos'],
    imageId: 'service-sea'
  },
  {
    id: 'air',
    title: 'Transporte Aéreo',
    description: 'La solución definitiva para envíos urgentes. Priorizamos tus mercancías de alto valor, perecederas o de entrega crítica para garantizar que lleguen a su destino en tiempo récord y con la máxima seguridad.',
    advantages: ['Tiempos de tránsito imbatibles', 'Máxima seguridad para cargas sensibles', 'Acceso prioritario a las principales aerolíneas', 'Cobertura global para envíos urgentes'],
    imageId: 'service-air'
  },
  {
    id: 'logistics',
    title: 'Logística Integral y Cadena de Suministro',
    description: 'Vamos más allá del transporte. Ofrecemos una gestión 360° de tu cadena de suministro. Desde la planificación y el aprovisionamiento hasta la entrega final, optimizamos cada eslabón para reducir costes y mejorar la eficiencia.',
    advantages: ['Un único punto de contacto para toda tu logística', 'Optimización de inventario y reducción de costes operativos', 'Visibilidad completa y análisis de datos', 'Estrategias personalizadas para mejorar tu competitividad'],
    imageId: 'service-logistics'
  },
  {
    id: 'warehousing',
    title: 'Almacenamiento y Distribución',
    description: 'Nuestros almacenes estratégicamente ubicados actúan como un centro neurálgico para tu mercancía. Con tecnología de vanguardia, gestionamos tu inventario y realizamos una distribución capilar rápida y precisa.',
    advantages: ['Almacenes seguros y modernos en ubicaciones clave', 'Gestión de inventario avanzada con tecnología WMS', 'Servicios de valor añadido (picking, packing, etc.)', 'Flexibilidad para adaptarnos a tus picos de demanda'],
    imageId: 'service-warehouse'
  },
];

export default function ServicesPage() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleSuccess = () => {
    if (openDialog) {
        setOpenDialog(null);
    }
  }

  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Un Mundo de Soluciones a tu Alcance</h1>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Descubre nuestro completo portafolio de servicios logísticos, diseñados para ofrecerte eficiencia, seguridad y alcance global.
          </p>
        </div>
      </header>
      
      <main className="py-16 md:py-24">
        <div className="container">
          <div className="space-y-20">
            {services.map((service, index) => {
              const image = PlaceHolderImages.find(p => p.id === service.imageId);
              return (
                <div key={service.id} className="grid md:grid-cols-2 gap-12 items-center">
                  <div className={index % 2 === 1 ? 'md:order-last' : ''}>
                    <h2 className="font-headline text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.advantages.map((adv) => (
                        <li key={adv} className="flex items-center">
                          <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span className="text-foreground">{adv}</span>
                        </li>
                      ))}
                    </ul>
                    <Dialog open={openDialog === service.id} onOpenChange={(isOpen) => setOpenDialog(isOpen ? service.id : null)}>
                        <DialogTrigger asChild>
                            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Solicitar Servicio</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                                <DialogTitle className="font-headline text-2xl">{service.title}</DialogTitle>
                                <DialogDescription>
                                    Completa el siguiente formulario para solicitar este servicio. Nos pondremos en contacto contigo a la brevedad.
                                </DialogDescription>
                            </DialogHeader>
                            <ServiceRequestForm serviceTitle={service.title} onSuccess={handleSuccess} />
                        </DialogContent>
                    </Dialog>
                  </div>
                  {image && (
                    <div className="rounded-lg overflow-hidden shadow-lg aspect-w-4 aspect-h-3">
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
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
