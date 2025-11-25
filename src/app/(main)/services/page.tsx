import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Check } from 'lucide-react';

const services = [
  {
    id: 'land',
    title: 'Transporte Terrestre: Pura Potencia sobre Ruedas',
    description: 'Nuestra división terrestre es un motor imparable. Con una flota que encarna la fuerza bruta y la agilidad, conquistamos el asfalto. Ofrecemos servicios de Carga Completa (FTL) y Grupaje (LTL) con la precisión de un relojero y la potencia de un muscle car, garantizando que tu mercancía llegue no solo a tiempo, sino con una demostración de poder.',
    advantages: ['Dominio total de rutas europeas', 'Flota optimizada para máxima potencia y eficiencia', 'Seguimiento en tiempo real: control absoluto', 'Servicio "puerta a puerta" de alta competición'],
    imageId: 'service-land'
  },
  {
    id: 'sea',
    title: 'Transporte Marítimo: La Fuerza de los Océanos',
    description: 'Navegamos los mares con la determinación de un titán. Gestionamos tus contenedores completos (FCL) y grupajes (LCL) con una estrategia naval que optimiza cada milla náutica. Ideal para grandes volúmenes donde la fuerza y la constancia son la clave de la victoria.',
    advantages: ['Economía de escala para cargas masivas', 'Capacidad de carga colosal', 'Gestión de aduanas con precisión militar', 'Alianzas estratégicas en cada puerto del mundo'],
    imageId: 'service-sea'
  },
  {
    id: 'air',
    title: 'Transporte Aéreo: Velocidad Supersónica',
    description: 'Cuando la urgencia es tu campo de batalla, nuestro servicio aéreo es tu caza de combate. Rompemos la barrera del sonido para que tus mercancías de alto valor, urgentes o perecederas lleguen a su destino con una velocidad que desafía la física. No volamos, nos teletransportamos.',
    advantages: ['Tiempos de entrega que destrozan cronómetros', 'Seguridad de nivel presidencial', 'Acceso prioritario a las principales aerolíneas', 'La solución definitiva para cargas críticas'],
    imageId: 'service-air'
  },
  {
    id: 'logistics',
    title: 'Logística de Combate 360°',
    description: 'Esto no es logística, es estrategia de guerra comercial. Tomamos el control total de tu cadena de suministro. Desde la planificación y el aprovisionamiento hasta la entrega final, orquestamos cada movimiento para aplastar a la competencia en costes y tiempos.',
    advantages: ['Un único general para toda tu campaña logística', 'Aniquilación de costes de inventario y operativos', 'Visibilidad total del campo de batalla logístico', 'Estrategias personalizadas para tu conquista del mercado'],
    imageId: 'service-logistics'
  },
  {
    id: 'warehousing',
    title: 'Almacenamiento Estratégico y Distribución Fulminante',
    description: 'Nuestros almacenes son fortalezas de eficiencia. Ubicados en puntos neurálgicos, actúan como bases de operaciones avanzadas para tu mercancía. Con tecnología de vanguardia, gestionamos tu inventario y lanzamos operaciones de distribución capilar con la rapidez de un rayo.',
    advantages: ['Fortalezas logísticas en ubicaciones clave', 'Arsenal tecnológico para una gestión de inventario superior', 'Servicios de valor añadido: preparación para el combate comercial', 'Transforma tus costes fijos en un arma competitiva'],
    imageId: 'service-warehouse'
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Nuestro Arsenal de Servicios</h1>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Cada servicio es un arma diseñada para la victoria en el competitivo campo de batalla del comercio global.
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
