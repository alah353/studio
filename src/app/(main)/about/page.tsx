import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, Target, Eye, Rocket, Zap, Award } from 'lucide-react';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-team');

const values = [
  { icon: <Zap className="h-6 w-6 text-accent" />, title: 'Potencia', description: 'Nuestra fuerza motriz es superar tus expectativas con energía y decisión.' },
  { icon: <Rocket className="h-6 w-6 text-accent" />, title: 'Velocidad', description: 'En la logística, cada segundo cuenta. Somos los más rápidos porque tu tiempo es oro.' },
  { icon: <CheckCircle className="h-6 w-6 text-accent" />, title: 'Precisión', description: 'Cada movimiento es calculado, cada entrega es perfecta. La exactitud es nuestro sello.' },
  { icon: <Award className="h-6 w-6 text-accent" />, title: 'Liderazgo', description: 'No seguimos el camino, lo creamos. Innovamos para mantenerte siempre en cabeza.' },
];

const team = [
  { name: 'Ricardo "El Semental" Ibáñez', role: 'CEO y Fundador', avatar: 'https://picsum.photos/seed/ricardo/150/150' },
  { name: 'Isabel "La Yegua" Herrero', role: 'Directora de Operaciones', avatar: 'https://picsum.photos/seed/isabel/150/150' },
  { name: 'Javier "El Potro" Jiménez', role: 'Jefe de Logística Global', avatar: 'https://picsum.photos/seed/javier-j/150/150' },
  { name: 'Sofía "La Amazona" Castillo', role: 'Responsable de Tecnología', avatar: 'https://picsum.photos/seed/sofia/150/150' },
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">La Fuerza Indomable que Mueve tu Negocio</h1>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
            En Horse S.L., no solo transportamos mercancías; inyectamos pura potencia y velocidad en cada eslabón de tu cadena de suministro.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-4">Nuestra Estirpe</h2>
              <p className="text-muted-foreground mb-4">
                Horse S.L. nació de una visión audaz: crear una empresa de logística con la fuerza y el espíritu de un caballo de carreras. Desde nuestros humildes comienzos en 2010, hemos galopado sin descanso, rompiendo barreras y estableciendo nuevos récords de velocidad y eficiencia en el sector.
              </p>
              <p className="text-muted-foreground">
                No somos simples transportistas; somos estrategas, pioneros y, sobre todo, un equipo de pura sangre dedicado a la victoria de nuestros clientes. Nuestra historia es la de una carrera imparable hacia la excelencia logística.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <Target className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline">Misión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Liberar el máximo potencial de nuestros clientes a través de soluciones logísticas que combinan potencia bruta, velocidad y una ejecución impecable.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <Eye className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline">Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Convertirnos en el motor indiscutible de la logística global, sinónimo de poder, innovación y un rendimiento que deja atrás a la competencia.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold">Nuestro ADN Ganador</h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">Los principios que nos hacen galopar más rápido y con más fuerza.</p>
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
                    <h2 className="font-headline text-3xl font-bold mb-4">El Equipo de Pura Sangre</h2>
                    <p className="text-muted-foreground mb-6">
                        En Horse S.L., nuestro equipo no trabaja, compite para ganar. Son jinetes expertos en logística, estrategas natos que doman la complejidad para llevar tu negocio a la victoria, con una dedicación que roza lo legendario.
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
