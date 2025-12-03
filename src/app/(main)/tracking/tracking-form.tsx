'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, MapPin, Clock, PackageCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type TrackShipmentOutput = {
    status: string;
    route: string;
    estimatedDeliveryTime: string;
};

// Mock function to simulate API response
const getMockTrackingData = (trackingNumber: string): TrackShipmentOutput | null => {
    if (trackingNumber === '123456789') {
        return {
            status: 'En tránsito',
            route: 'Madrid, España -> París, Francia',
            estimatedDeliveryTime: '2 días'
        };
    }
    if (trackingNumber.startsWith('ERR')) {
        return null; // Simulate not found
    }
    // Fictional data for any other valid-looking number
    return {
        status: 'En preparación',
        route: 'Almacén Central (Tarragona)',
        estimatedDeliveryTime: '4 días'
    };
};


export function TrackingForm() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackShipmentOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (trackingNumber.length < 5) {
      const message = 'El número de seguimiento debe tener al menos 5 caracteres.';
      setError(message);
      toast({
        variant: 'destructive',
        title: 'Error de Validación',
        description: message,
      });
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const data = getMockTrackingData(trackingNumber);
      
      if (!data) {
        throw new Error('No se encontró el envío. Por favor, verifica el número de seguimiento.');
      }

      setResult(data);
    } catch (err: any) {
      const message = err.message || 'Ocurrió un error inesperado.';
      setError(message);
      toast({
        variant: 'destructive',
        title: 'Error de Seguimiento',
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              name="trackingNumber"
              placeholder="Ej: 123456789"
              required
              className="flex-grow text-base"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                'Rastrear Envío'
              )}
            </Button>
          </div>
        </form>

        {error && !result && (
            <Alert variant="destructive" className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {result && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="font-headline text-2xl font-bold mb-6 text-center">Información del Envío</h3>
            <div className="grid gap-6 sm:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estado</CardTitle>
                        <PackageCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{result.status}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ruta Actual</CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{result.route}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Entrega Estimada</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{result.estimatedDeliveryTime}</div>
                    </CardContent>
                </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
