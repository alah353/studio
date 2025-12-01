import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const headerImage = PlaceHolderImages.find(p => p.id === 'blog-header');

const blogPosts = [
  {
    title: '5 Tendencias en Logística para 2024 que Debes Conocer',
    excerpt: 'Descubre las innovaciones que están transformando la cadena de suministro, desde la inteligencia artificial hasta la sostenibilidad y la logística urbana.',
    date: '15 de Mayo, 2024',
    imageId: 'blog-post-1',
  },
  {
    title: 'Cómo Optimizar tus Costes de Transporte Marítimo',
    excerpt: 'Consejos prácticos y estrategias para reducir gastos sin comprometer la eficiencia ni los tiempos de entrega en tus envíos internacionales.',
    date: '28 de Abril, 2024',
    imageId: 'blog-post-2',
  },
  {
    title: 'La Importancia de la Logística Verde en el Mundo Actual',
    excerpt: 'Analizamos cómo las prácticas sostenibles no solo benefician al planeta, sino que también mejoran la reputación y la eficiencia de tu empresa.',
    date: '10 de Abril, 2024',
    imageId: 'blog-post-3',
  },
];

export default function BlogPage() {
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
             <h1 className="font-headline text-4xl font-bold md:text-5xl text-white">Blog y Noticias del Sector</h1>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-white/90">
                Mantente al día con las últimas novedades, análisis de tendencias y consejos prácticos de nuestros expertos en logística.
            </p>
          </div>
        </div>
      </header>
      
      <main className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const image = PlaceHolderImages.find(p => p.id === post.imageId);
              return (
                <Card key={post.title} className="flex flex-col overflow-hidden">
                  {image && (
                    <div className="aspect-w-16 aspect-h-9">
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
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground pt-1">{post.date}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="link" className="px-0">
                      <Link href="#">
                        Leer más <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

    
