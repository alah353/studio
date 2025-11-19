import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, Target, Eye, Handshake, Leaf, Heart } from 'lucide-react';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-team');

const values = [
  { icon: <Handshake className="h-6 w-6 text-accent" />, title: 'Compromiso', description: 'Nos comprometemos con tus objetivos como si fueran los nuestros.' },
  { icon: <CheckCircle className="h-6 w-6 text-accent" />, title: 'Puntualidad', description: 'La entrega a tiempo es el pilar de nuestra reputación y servicio.' },
  { icon: <Heart className="h-6 w-6 text-accent" />, title: 'Innovación', description: 'Aplicamos la última tecnología para optimizar cada proceso logístico.' },
  { icon: <Leaf className="h-6 w-6 text-accent" />, title: 'Sostenibilidad', description: 'Operamos de manera responsable para proteger nuestro planeta.' },
];

const team = [
  { name: 'Ana García', role: 'CEO y Fundadora', avatar: 'https://picsum.photos/seed/ana/150/150' },
  { name: 'Carlos Martínez', role: 'Director de Operaciones', avatar: 'https://picsum.photos/seed/carlos/150/150' },
  { name: 'Lucía Fernández', role: 'Jefa de Logística Internacional', avatar: 'https://picsum.photos/seed/lucia/150/150' },
  { name: 'Javier Rodríguez', role: 'Responsable de Tecnología', avatar: 'https://picsum.photos/seed/javier/150/150' },
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Conectando tu negocio con el futuro de la logística</h1>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            Más de una década de experiencia nos avala como líderes en soluciones de transporte y logística a nivel global.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-4">Nuestra Trayectoria</h2>
              <p className="text-muted-foreground mb-4">
                Fundada en 2010, SwiftRoute Logistics nació con la ambición de revolucionar el sector del transporte de mercancías. Empezamos con una pequeña flota de camiones y un gran sueño: conectar empresas y mercados de manera más eficiente.
              </p>
              <p className="text-muted-foreground">
                Hoy, somos un operador logístico integral con presencia en los cinco continentes. Nuestra historia es una de crecimiento constante, impulsado por la innovación, la confianza de nuestros clientes y un equipo humano excepcional.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <Target className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline">Misión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Proveer soluciones logísticas superiores que impulsen el éxito de nuestros clientes, a través de la innovación y un servicio excepcional.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <Eye className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline">Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Ser el referente mundial en logística inteligente y sostenible, creando valor para nuestros clientes, equipo y la sociedad.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold">Nuestros Valores</h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">Los principios que guían cada una de nuestras acciones.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  {value.icon}
                </div>
                <h3 className="mt-6 font-headline text-xl font-semibold">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="font-headline text-3xl font-bold mb-4">Nuestro Equipo, Tu Confianza</h2>
                    <p className="text-muted-foreground mb-6">
                        El verdadero motor de SwiftRoute Logistics es nuestro equipo de profesionales. Expertos apasionados por la logística, dedicados a encontrar la mejor solución para cada cliente y cada envío. Su experiencia y atención personalizada son nuestra mayor garantía.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        {team.map((member) => (
                        <div key={member.name} className="flex items-center space-x-4">
                            <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                {aboutImage && (
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <Image 
                            src={aboutImage.imageUrl} 
                            alt={aboutImage.description}
                            data-ai-hint={aboutImage.imageHint} 
                            width={600} 
                            height={400}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
            </div>
        </div>
      </section>
    </div>
  );
}
