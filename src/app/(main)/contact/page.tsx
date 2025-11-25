import { ContactForm } from './contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactDetails = [
    {
      icon: <Mail className="h-6 w-6 text-accent" />,
      title: "Email",
      value: "contacto@horsesl.com",
      description: "Para planes de ataque y presupuestos."
    },
    {
      icon: <Phone className="h-6 w-6 text-accent" />,
      title: "Teléfono",
      value: "+34 912 345 678",
      description: "Línea directa con nuestro alto mando."
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      title: "Cuartel General",
      value: "Calle de la Potencia 1, 28080 Madrid, España",
      description: "Visítanos para planificar tu próxima ofensiva."
    }
]

export default function ContactPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Habla con un Estratega</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Estamos listos para la acción. Contacta con nosotros y descubre cómo podemos potenciar tu logística a un nivel superior.
          </p>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="font-headline text-3xl font-bold">Canales de Contacto</h2>
              <p className="text-muted-foreground">
                Nuestro equipo de élite está preparado para ofrecerte una atención implacable y resolver tus desafíos logísticos más complejos.
              </p>
              <div className="space-y-6">
                {contactDetails.map(detail => (
                    <div key={detail.title} className="flex items-start">
                        <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mr-4">
                            {detail.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{detail.title}</h3>
                            <p className="text-foreground">{detail.value}</p>
                            <p className="text-sm text-muted-foreground">{detail.description}</p>
                        </div>
                    </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
