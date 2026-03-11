'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Target, Eye, Rocket, Zap, Award } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: <Zap className="h-6 w-6 text-accent" />, title: 'Velocidad', description: 'Actuamos con rapidez y decisión para superar tus expectativas.' },
    { icon: <Rocket className="h-6 w-6 text-accent" />, title: 'Innovación', description: 'Aplicamos la última tecnología para optimizar cada proceso logístico.' },
    { icon: <CheckCircle className="h-6 w-6 text-accent" />, title: 'Precisión', description: 'Cada envío es manejado con el máximo cuidado y exactitud.' },
    { icon: <Award className="h-6 w-6 text-accent" />, title: 'Compromiso', description: 'Tu éxito es nuestro motor. Nos dedicamos a cumplir nuestras promesas.' },
  ];

  const team = [
    { name: 'Ali Ahrika', role: 'CEO y Fundador', avatar: 'https://picsum.photos/seed/ali/150/150', bio: 'Con más de 20 años de experiencia en el sector logístico, Ali fundó Horse S.L. con la visión de crear una empresa que combinara la última tecnología con un servicio al cliente excepcional.' },
    { name: 'Laura Gómez', role: 'Directora Comercial', avatar: 'https://picsum.photos/seed/laura/150/150', bio: 'Experta en desarrollo de negocio y relaciones con clientes, Laura es la fuerza impulsora detrás de nuestra estrategia comercial.' },
    { name: 'Marcos Roca', role: 'Responsable de Flota', avatar: 'https://picsum.photos/seed/marcos/150/150', bio: 'Marcos supervisa nuestra moderna flota de vehículos, garantizando que cada unidad cumpla con los más altos estándares.' },
    { name: 'Sofía Chen', role: 'Atención al Cliente', avatar: 'https://picsum.photos/seed/sofia-c/150/150', bio: 'Sofía es el corazón de nuestro equipo de soporte, asegurando una satisfacción total en cada consulta.' },
  ];

  return (
    <div className="bg-background">
      <header className="relative h-64 md:h-80 w-full">
        <Image
          src="/sobre1.png"
          alt="Sobre nosotros"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="container">
            <h1 className="font-headline text-4xl font-bold md:text-5xl text-white">{t('about_title')}</h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-white/90">
              {t('about_subtitle')}
            </p>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-4">{t('about_history_title')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('about_history_p1')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <Target className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline">{t('about_mision_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('about_mision_desc')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <Eye className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline">{t('about_vision_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('about_vision_desc')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold">{t('about_values_title')}</h2>
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
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold mb-10">{t('about_team_title')}</h2>
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
      </section>
    </div>
  );
}
