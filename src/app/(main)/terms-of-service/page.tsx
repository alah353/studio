export default function TermsOfServicePage() {
  return (
    <div className="bg-background">
      <main className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h1 className="font-headline text-4xl font-bold mb-8">Términos de Servicio</h1>
          <div className="prose prose-invert lg:prose-xl mx-auto text-muted-foreground space-y-6">
            <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2 className="font-headline text-2xl font-bold text-foreground">1. Acuerdo de los Términos</h2>
            <p>Estos Términos de Servicio constituyen un acuerdo legalmente vinculante hecho entre usted, ya sea personalmente o en nombre de una entidad ("usted") y Horse S.L. ("nosotros", "nuestro"), con respecto a su acceso y uso del sitio web, así como cualquier otra forma de medio, canal de medios, sitio web móvil o aplicación móvil relacionada, vinculada o conectada de otro modo (colectivamente, el "Sitio").</p>
            <p>Usted acepta que al acceder al Sitio, ha leído, entendido y aceptado estar sujeto a todos estos Términos de Servicio. Si no está de acuerdo con todos estos Términos de Servicio, se le prohíbe expresamente usar el Sitio y debe interrumpir su uso de inmediato.</p>

            <h2 className="font-headline text-2xl font-bold text-foreground">2. Propiedad Intelectual</h2>
            <p>A menos que se indique lo contrario, el Sitio es de nuestra propiedad y todo el código fuente, bases de datos, funcionalidad, software, diseños de sitios web, audio, video, texto, fotografías y gráficos en el Sitio (colectivamente, el "Contenido") y las marcas comerciales, marcas de servicio y logotipos contenidos en él (las "Marcas") son de nuestra propiedad o están controlados por nosotros o se nos han licenciado, y están protegidos por las leyes de derechos de autor y marcas registradas y varias otras leyes de propiedad intelectual.</p>

            <h2 className="font-headline text-2xl font-bold text-foreground">3. Representaciones del Usuario</h2>
            <p>Al usar el Sitio, usted declara y garantiza que: (1) toda la información de registro que envíe será verdadera, precisa, actual y completa; (2) mantendrá la exactitud de dicha información y la actualizará rápidamente según sea necesario; (3) tiene la capacidad legal y acepta cumplir con estos Términos de Servicio; y (4) su uso del Sitio no violará ninguna ley o regulación aplicable.</p>

            <h2 className="font-headline text-2xl font-bold text-foreground">4. Actividades Prohibidas</h2>
            <p>No puede acceder ni usar el Sitio para ningún propósito que no sea aquel para el que ponemos a disposición el Sitio. El Sitio no puede ser utilizado en conexión con ningún esfuerzo comercial, excepto aquellos que estén específicamente respaldados o aprobados por nosotros.</p>

            <h2 className="font-headline text-2xl font-bold text-foreground">5. Ley Aplicable</h2>
            <p>Estos Términos de Servicio y su uso del Sitio se rigen e interpretan de acuerdo con las leyes de España, sin tener en cuenta sus principios de conflicto de leyes.</p>
            
            <h2 className="font-headline text-2xl font-bold text-foreground">6. Contacto</h2>
            <p>Para resolver una queja sobre el Sitio o para recibir más información sobre el uso del Sitio, contáctenos en: <a href="mailto:contacto@horsesl.com" className="text-accent hover:underline">contacto@horsesl.com</a>.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
