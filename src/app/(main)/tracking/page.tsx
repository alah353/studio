'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Package, Truck, MapPin, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type ShipmentData = {
  tracking_code: string;
  client: string;
  origin: string;
  destination: string;
  eta: string;
  location: string;
  status: 'En magatzem' | 'En trànsit' | 'Lliurat';
  usuari?: string;
};

type UserDataFromSheet = {
  usuari: string;
  empresa: string;
}

const STEPS = ['En magatzem', 'En trànsit', 'Lliurat'];
const API_URL = 'https://sheetdb.io/api/v1/rgytng002juic';

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null);

  const handleSearch = async () => {
    if (!trackingCode) {
      setError('Si us plau, introdueix un codi de seguiment.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setShipmentData(null);

    const searchUrl = `${API_URL}/search?tracking_code=${trackingCode}`;
    
    try {
      const response = await fetch(searchUrl);
      const data: ShipmentData[] = await response.json();
      
      if (data.length > 0) {
        let shipment = data[0];

        // If there is a user ID associated with the shipment, fetch the user data
        // to get the official company name from the 'usuaris' sheet.
        if (shipment.usuari) {
          const userSearchUrl = `${API_URL}/search?sheet=usuaris&usuari=${shipment.usuari}`;
          const userResponse = await fetch(userSearchUrl);

          if (userResponse.ok) {
            const userData: UserDataFromSheet[] = await userResponse.json();
            if (userData.length > 0) {
              // Overwrite the client name with the official one from the user record
              shipment = { ...shipment, client: userData[0].empresa };
            }
          }
        }
        
        setShipmentData(shipment);

      } else {
        setError('No hem trobat cap enviament amb aquest codi. Si us plau, verifica que el codi sigui correcte.');
      }
    } catch (err) {
      console.error(err);
      setError('Hi ha hagut un error en connectar amb el servidor de seguiment. Si us plau, intenta-ho de nou més tard.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: ShipmentData['status']) => {
    switch (status) {
      case 'En magatzem':
        return { color: 'bg-orange-500', width: '10%' };
      case 'En trànsit':
        return { color: 'bg-blue-500', width: '50%' };
      case 'Lliurat':
        return { color: 'bg-green-500', width: '100%' };
      default:
        return { color: 'bg-gray-400', width: '0%' };
    }
  };
  
  const currentStatusIndex = shipmentData ? STEPS.indexOf(shipmentData.status) : -1;
  const displayCode = shipmentData ? shipmentData.tracking_code : '';

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold md:text-5xl text-foreground">Localitza el teu enviament</h1>
          <p className="mt-4 text-lg text-muted-foreground">Introdueix el teu codi de seguiment per veure l'estat actual de la teva tramesa.</p>
        </div>

        <Card className="w-full shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.trim())}
                placeholder="Ex: HS-12345678"
                className="flex-grow text-base"
                disabled={isLoading}
                onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isLoading || !trackingCode} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Cercant...' : 'Cercar'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {error && (
          <Alert variant="destructive" className="mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {shipmentData && (
          <Card className="mt-8 shadow-lg overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-2xl">Resultats per: {displayCode}</CardTitle>
                    <CardDescription>A continuació es mostra la informació més recent del teu enviament.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                    <User className="h-4 w-4" />
                    <span>{shipmentData.client}</span>
                  </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-foreground">Estat de l'Enviament: <span className="font-bold">{shipmentData.status}</span></h3>
                <div className="relative h-2 bg-muted rounded-full">
                   <div 
                     className={cn("absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ease-out", getStatusInfo(shipmentData.status).color)} 
                     style={{ width: getStatusInfo(shipmentData.status).width }}
                   />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                   {STEPS.map((step, index) => (
                      <div key={step} className={cn("flex-1 text-center", { 'font-bold text-foreground': index <= currentStatusIndex })}>
                         <p>{step}</p>
                      </div>
                   ))}
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-8 text-sm">
                <div className="flex items-center gap-3">
                  <Package className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-muted-foreground">Origen</p>
                    <p className="font-bold text-foreground text-base">{shipmentData.origin}</p>
                  </div>
                </div>
                 <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-muted-foreground">Destí</p>
                    <p className="font-bold text-foreground text-base">{shipmentData.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-muted-foreground">Ubicació actual</p>
                    <p className="font-bold text-foreground text-base">{shipmentData.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-muted-foreground">Data prevista (ETA)</p>
                    <p className="font-bold text-foreground text-base">{shipmentData.eta}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
