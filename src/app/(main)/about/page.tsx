import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, Target, Eye, Rocket, Zap, Award } from 'lucide-react';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-team');

const values = [
  { icon: <Zap className="h-6 w-6 text-accent" />, title: 'Velocidad', description: 'Actuamos con rapidez y decisión para superar tus expectativas.' },
  { icon: <Rocket className="h-6 w-6 text-accent" />, title: 'Innovación', description: 'Aplicamos la última tecnología para optimizar cada proceso logístico.' },
  { icon: <CheckCircle className="h-6 w-6 text-accent" />, title: 'Precisión', description: 'Cada envío es manejado con el máximo cuidado y exactitud.' },
  { icon: <Award className="h-6 w-6 text-accent" />, title: 'Compromiso', description: 'Tu éxito es nuestro motor. Nos dedicamos a cumplir nuestras promesas.' },
];

const team = [
  { name: 'Elena García', role: 'CEO y Fundadora', avatar: 'https://picsum.photos/seed/elena/150/150' },
  { name: 'Carlos Martínez', role: 'Director de Operaciones', avatar: 'https://picsum.photos/seed/carlos/150/150' },
  { name: 'Javier Soler', role: 'Jefe de Logística Global', avatar: 'https://picsum.photos/seed/javier/150/150' },
  { name: 'Sofía Mendoza', role: 'Responsable de Tecnología', avatar: 'https://picsum.photos/seed/sofia-m/150/150' },
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">La Fuerza que Mueve tu Negocio</h1>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            En SwiftRoute Logistics, no solo transportamos mercancías; impulsamos el crecimiento de tu negocio con soluciones logísticas a medida.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-4">Nuestra Historia</h2>
              <p className="text-muted-foreground mb-4">
                SwiftRoute Logistics nació en 2010 de una visión clara: revolucionar el sector logístico a través de la tecnología y un enfoque centrado en el cliente. Desde nuestros inicios, hemos crecido de forma constante, ampliando nuestra red y perfeccionando nuestros servicios para ofrecer una eficiencia sin precedentes.
              </p>
              <p className="text-muted-foreground">
                Hoy, somos un equipo de expertos apasionados por la logística, comprometidos con la innovación y dedicados a superar los desafíos de la cadena de suministro de nuestros clientes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <Target className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline">Misión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Ofrecer soluciones logísticas inteligentes y eficientes que impulsen el éxito de nuestros clientes, combinando tecnología avanzada, una red global y un servicio excepcional.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <Eye className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline">Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Ser el socio logístico de referencia a nivel mundial, reconocido por nuestra innovación, fiabilidad y nuestro impacto positivo en la cadena de suministro global.</p>
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
                    <h2 className="font-headline text-3xl font-bold mb-4">Nuestro Equipo</h2>
                    <p className="text-muted-foreground mb-6">
                        Contamos con un equipo de profesionales altamente cualificados y apasionados por la logística. Su experiencia y dedicación son la clave de nuestro éxito y el de nuestros clientes.
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
