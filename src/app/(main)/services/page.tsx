import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Check } from 'lucide-react';

const services = [
  {
    id: 'land',
    title: 'Transporte Terrestre',
    description: 'Nuestra red de transporte terrestre es la columna vertebral de la logística europea. Ofrecemos servicios de carga completa (FTL) y grupaje (LTL) con una flota moderna y monitorizada para garantizar flexibilidad y seguridad.',
    advantages: ['Flexibilidad en horarios y rutas', 'Seguimiento GPS en tiempo real', 'Cobertura nacional e internacional', 'Entrega puerta a puerta'],
    imageId: 'service-land'
  },
  {
    id: 'sea',
    title: 'Transporte Marítimo',
    description: 'Conectamos los principales puertos del mundo, gestionando tus envíos FCL (Contenedor Completo) y LCL (Grupaje) con la máxima eficiencia. Ideal para grandes volúmenes y cargas no urgentes.',
    advantages: ['Solución más económica para grandes distancias', 'Alta capacidad de carga', 'Gestión aduanera integral', 'Red de agentes portuarios global'],
    imageId: 'service-sea'
  },
  {
    id: 'air',
    title: 'Transporte Aéreo',
    description: 'Cuando la velocidad es crítica, nuestro servicio de carga aérea es la solución. Colaboramos con las principales aerolíneas para ofrecer tiempos de tránsito mínimos y máxima prioridad para tus mercancías.',
    advantages: ['Tiempos de entrega más rápidos', 'Seguridad y menor riesgo de daños', 'Cobertura mundial a los principales aeropuertos', 'Ideal para mercancías de alto valor o perecederas'],
    imageId: 'service-air'
  },
  {
    id: 'logistics',
    title: 'Logística Integral',
    description: 'Vamos más allá del transporte. Ofrecemos una gestión 360° de tu cadena de suministro, desde la planificación y el aprovisionamiento hasta la entrega final, optimizando costes y tiempos.',
    advantages: ['Un único interlocutor para toda la cadena', 'Optimización de inventario y costes', 'Visibilidad y control total del proceso', 'Soluciones personalizadas a tu negocio'],
    imageId: 'service-logistics'
  },
  {
    id: 'warehousing',
    title: 'Almacenamiento y Distribución',
    description: 'Nuestros almacenes estratégicamente ubicados están equipados con la última tecnología para la gestión de inventario, picking, packing y distribución capilar, adaptándonos a tus necesidades de stock.',
    advantages: ['Almacenes estratégicamente ubicados', 'Sistemas de gestión de almacén (SGA) avanzados', 'Servicios de valor añadido (etiquetado, empaquetado)', 'Reducción de costes de almacenamiento'],
    imageId: 'service-warehouse'
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Soluciones Logísticas a tu Medida</h1>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Desde el transporte local hasta la gestión integral de la cadena de suministro global, tenemos un servicio para cada necesidad.
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
                    <ul className="space-y-3">
                      {service.advantages.map((adv) => (
                        <li key={adv} className="flex items-center">
                          <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span className="text-foreground">{adv}</span>
                        </li>
                      ))}
                    </ul>
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
