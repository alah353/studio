import { TrackingForm } from './tracking-form';
import { PackageSearch } from 'lucide-react';

export default function TrackingPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <PackageSearch className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Seguimiento de Envíos</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Introduce tu número de seguimiento para consultar el estado y la ubicación de tu envío en tiempo real.
          </p>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container max-w-4xl">
            <TrackingForm />
        </div>
      </main>
    </div>
  );
}
