import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, Target, Eye, Rocket, Zap, Award } from 'lucide-react';

const headerImage = PlaceHolderImages.find(p => p.id === 'about-header');

const values = [
  { icon: <Zap className="h-6 w-6 text-accent" />, title: 'Velocidad', description: 'Actuamos con rapidez y decisión para superar tus expectativas.' },
  { icon: <Rocket className="h-6 w-6 text-accent" />, title: 'Innovación', description: 'Aplicamos la última tecnología para optimizar cada proceso logístico.' },
  { icon: <CheckCircle className="h-6 w-6 text-accent" />, title: 'Precisión', description: 'Cada envío es manejado con el máximo cuidado y exactitud.' },
  { icon: <Award className="h-6 w-6 text-accent" />, title: 'Compromiso', description: 'Tu éxito es nuestro motor. Nos dedicamos a cumplir nuestras promesas.' },
];

const team = [
  { name: 'Ali Ahrika', role: 'CEO y Fundador', avatar: 'https://picsum.photos/seed/ali/150/150', bio: 'Con más de 20 años de experiencia en el sector logístico, Ali fundó Horse S.L. con la visión de crear una empresa que combinara la última tecnología con un servicio al cliente excepcional. Su liderazgo ha sido fundamental para el crecimiento y la expansión internacional de la compañía.' },
  { name: 'Laura Gómez', role: 'Directora Comercial', avatar: 'https://picsum.photos/seed/laura/150/150', bio: 'Experta en desarrollo de negocio y relaciones con clientes, Laura es la fuerza impulsora detrás de nuestra estrategia comercial. Su enfoque en soluciones personalizadas asegura que cada cliente reciba el mejor servicio posible.' },
  { name: 'Marcos Roca', role: 'Responsable de Flota', avatar: 'https://picsum.photos/seed/marcos/150/150', bio: 'Marcos supervisa nuestra moderna flota de vehículos, garantizando que cada unidad cumpla con los más altos estándares de seguridad y eficiencia. Su pasión por la mecánica y la innovación mantiene a Horse S.L. a la vanguardia.' },
  { name: 'Sofía Chen', role: 'Especialista en Atención al Cliente', avatar: 'https://picsum.photos/seed/sofia-c/150/150', bio: 'Sofía es el corazón de nuestro equipo de soporte. Con una dedicación inquebrantable, se asegura de que cada consulta y cada incidencia se resuelvan de manera rápida y satisfactoria, garantizando la tranquilidad de nuestros clientes.' },
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <header className="relative h-64 md:h-80 w-full">
        {headerImage && (
            <Image
                src={headerImage.imageUrl}
                alt={headerImage.description}
                data-ai-hint={headerImage.imageHint}
                fill
                className="object-cover"
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="container">
            <h1 className="font-headline text-4xl font-bold md:text-5xl">La Fuerza que Mueve tu Negocio</h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-primary-foreground/90">
                En Horse S.L., no solo transportamos mercancías; impulsamos el crecimiento de tu negocio con soluciones logísticas a medida.
            </p>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-4">Nuestra Historia</h2>
              <p className="text-muted-foreground mb-4">
                Horse S.L. nació en 2010 de una visión clara: revolucionar el sector logístico a través de la tecnología y un enfoque centrado en el cliente. Desde nuestros inicios, hemos crecido de forma constante, ampliando nuestra red y perfeccionando nuestros servicios para ofrecer una eficiencia sin precedentes.
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
            <div className="grid md:grid-cols-1 gap-12 items-center">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold mb-4">Nuestro Equipo</h2>
                    <p className="text-muted-foreground mb-10 max-w-3xl mx-auto">
                        Contamos con un equipo de profesionales altamente cualificados y apasionados por la logística. Su experiencia y dedicación son la clave de nuestro éxito y el de nuestros clientes.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member) => (
                      <Card key={member.name}>
                        <CardContent className="pt-6 flex flex-col items-center text-center">
                          <Avatar className="w-24 h-24 mb-4">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-sm text-accent font-semibold mb-2">{member.role}</p>
                          <p className="text-xs text-muted-foreground">{member.bio}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

    