'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Globe,
  ShieldCheck,
  Zap,
  Ship,
  Plane,
  Truck,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ServiceRequestForm } from '@/app/(main)/services/service-request-form';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-context';

export default function HomePage() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const { t } = useLanguage();

  const mainHero = PlaceHolderImages.find(p => p.id === 'main-hero');

  const handleSuccess = () => {
    if (openDialog) {
      setOpenDialog(null);
    }
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: t('feature_speed_title'),
      description: t('feature_speed_desc'),
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-accent" />,
      title: t('feature_security_title'),
      description: t('feature_security_desc'),
    },
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      title: t('feature_global_title'),
      description: t('feature_global_desc'),
    },
  ];

  const services = [
    {
      id: 'land',
      title: t('service_land_title'),
      description: t('service_land_desc'),
      icon: <Truck className="h-10 w-10 text-accent" />,
      imageId: 'service-land',
    },
    {
      id: 'sea',
      title: t('service_sea_title'),
      description: t('service_sea_desc'),
      icon: <Ship className="h-10 w-10 text-accent" />,
      imageId: 'service-sea',
    },
    {
      id: 'air',
      title: t('service_air_title'),
      description: t('service_air_desc'),
      icon: <Plane className="h-10 w-10 text-accent" />,
      imageId: 'service-air',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full">
        {mainHero && (
          <Image
            src={mainHero.imageUrl}
            alt={mainHero.description}
            data-ai-hint={mainHero.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}

        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="container">
            <h1 className="font-headline text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
              {t('hero_title')}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
              {t('hero_subtitle')}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
            >
              <Link href="/contact">
                {t('hero_cta')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              {t('services_title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('services_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const image = PlaceHolderImages.find(
                (p) => p.id === service.imageId
              );
              return (
                <Dialog
                  key={service.id}
                  open={openDialog === service.id}
                  onOpenChange={(isOpen) =>
                    setOpenDialog(isOpen ? service.id : null)
                  }
                >
                  <Card className="flex flex-col text-center items-center">
                    {image && (
                      <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card -mt-12 border-4 border-card z-10 relative">
                        {service.icon}
                      </div>
                      <CardTitle className="font-headline pt-2">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                    <div className="p-6 pt-0 w-full">
                      <DialogTrigger asChild>
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                          {t('request_service')}
                        </Button>
                      </DialogTrigger>
                    </div>
                  </Card>

                  <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-2xl">
                        {t('dialog_title_request')}: {service.title}
                      </DialogTitle>
                      <DialogDescription>
                        {t('dialog_desc_request')}
                      </DialogDescription>
                    </DialogHeader>
                    <ServiceRequestForm
                      serviceTitle={service.title}
                      onSuccess={handleSuccess}
                    />
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/services">
                {t('view_all_services')} <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              {t('why_choose_us_title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('why_choose_us_subtitle')}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  {feature.icon}
                </div>
                <h3 className="mt-6 font-headline text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <Image
          src="/portacontenedores.png"
          alt="Buque portacontenedores en el mar"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container text-center text-white">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            {t('cta_title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            {t('cta_subtitle')}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
          >
            <Link href="/contact">{t('cta_button')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
