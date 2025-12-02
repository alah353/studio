import { blogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find((p) => p.id === post.imageId);

  return (
    <div className="bg-background">
       <header className="relative h-64 md:h-96 w-full">
        {image && (
            <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover"
                priority
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="container">
             <h1 className="font-headline text-4xl font-bold md:text-5xl text-white">{post.title}</h1>
            <div className="mt-4 flex items-center justify-center gap-2 text-lg text-white/90">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container max-w-4xl">
            <div className="mb-12">
                <Button asChild variant="outline">
                <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al Blog
                </Link>
                </Button>
            </div>
          
            <article className="prose prose-invert lg:prose-xl mx-auto text-muted-foreground space-y-6">
                {post.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </article>
        </div>
      </main>
    </div>
  );
}
