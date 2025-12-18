'use client';

import { useState, useEffect } from 'react';

export default function PrivacyPolicyPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    setLastUpdatedDate(
      new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  return (
    <div className="bg-background">
      <main className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h1 className="font-headline text-4xl font-bold mb-8">Política de Privacidad</h1>
          <div className="prose prose-invert lg:prose-xl mx-auto text-muted-foreground space-y-6">
            <p><strong>Última actualización:</strong> {lastUpdatedDate || '...'}</p>

            <h2 className="font-headline text-2xl font-bold text-foreground">1. Introducción</h2>
            <p>Bienvenido a Horse S.L. ("nosotros", "nuestro"). Nos comprometemos a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web.</p>
            
            <h2 className="font-headline text-2xl font-bold text-foreground">2. Recopilación de su Información</h2>
            <p>Podemos recopilar información sobre usted de varias maneras. La información que podemos recopilar en el Sitio incluye:</p>
            <ul>
              <li><strong>Datos Personales:</strong> Información de identificación personal, como su nombre, dirección de correo electrónico y número de teléfono, que usted nos proporciona voluntariamente cuando se registra en el Sitio o cuando elige participar en diversas actividades relacionadas con el Sitio, como formularios de contacto y solicitudes de servicio.</li>
              <li><strong>Datos de Uso:</strong> Información que nuestro servidor recopila automáticamente cuando usted accede al Sitio, como su dirección IP, su tipo de navegador, su sistema operativo, sus tiempos de acceso y las páginas que ha visto directamente antes y después de acceder al Sitio.</li>
            </ul>

            <h2 className="font-headline text-2xl font-bold text-foreground">3. Uso de su Información</h2>
            <p>Tener información precisa sobre usted nos permite brindarle una experiencia fluida, eficiente y personalizada. Específicamente, podemos usar la información recopilada sobre usted a través del Sitio para:</p>
            <ul>
              <li>Responder a sus solicitudes de servicio y atención al cliente.</li>
              <li>Enviarle un correo electrónico con la confirmación de su solicitud.</li>
              <li>Mejorar la eficiencia y el funcionamiento del Sitio.</li>
              <li>Monitorear y analizar el uso y las tendencias para mejorar su experiencia con el Sitio.</li>
            </ul>

            <h2 className="font-headline text-2xl font-bold text-foreground">4. Divulgación de su Información</h2>
            <p>No compartiremos, venderemos, alquilaremos ni intercambiaremos su información con terceros para sus fines promocionales.</p>
            <p>Podemos compartir información que hemos recopilado sobre usted en ciertas situaciones. Su información puede ser divulgada de la siguiente manera:</p>
            <ul>
              <li><strong>Por Ley o para Proteger Derechos:</strong> Si creemos que la divulgación de información sobre usted es necesaria para responder a un proceso legal, para investigar o remediar posibles violaciones de nuestras políticas, o para proteger los derechos, la propiedad y la seguridad de otros, podemos compartir su información según lo permitido o requerido por cualquier ley, regla o regulación aplicable.</li>
            </ul>

            <h2 className="font-headline text-2xl font-bold text-foreground">5. Seguridad de su Información</h2>
            <p>Utilizamos medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger su información personal. Si bien hemos tomado medidas razonables para proteger la información personal que nos proporciona, tenga en cuenta que a pesar de nuestros esfuerzos, ninguna medida de seguridad es perfecta o impenetrable, y no se puede garantizar que ningún método de transmisión de datos esté libre de intercepciones u otro tipo de uso indebido.</p>
            
            <h2 className="font-headline text-2xl font-bold text-foreground">6. Contacto</h2>
            <p>Si tiene preguntas o comentarios sobre esta Política de Privacidad, por favor contáctenos en: <a href="mailto:contacto@horsesl.com" className="text-accent hover:underline">contacto@horsesl.com</a>.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
