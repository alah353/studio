import { ContactForm } from './contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactDetails = [
    {
      icon: <Mail className="h-6 w-6 text-accent" />,
      title: "Email",
      value: "contacto@swiftroute.com",
      description: "Para consultas generales y presupuestos."
    },
    {
      icon: <Phone className="h-6 w-6 text-accent" />,
      title: "Teléfono",
      value: "+34 912 345 678",
      description: "Atención personalizada de 9:00 a 18:00."
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      title: "Oficina Central",
      value: "Calle de la Logística 123, 28080 Madrid, España",
      description: "Visítanos para una consulta presencial."
    }
]

export default function ContactPage() {
  return (
    <div className="bg-background">
      <header className="py-16 md:py-24 text-center bg-card">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Contacta con Nosotros</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Estamos aquí para ayudarte. Rellena el formulario o utiliza uno de nuestros canales de contacto para hablar con un experto.
          </p>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="font-headline text-3xl font-bold">Información de Contacto</h2>
              <p className="text-muted-foreground">
                Nuestro equipo de atención al cliente está listo para ofrecerte una atención personalizada y resolver todas tus dudas.
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
