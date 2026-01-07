'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

const API_URL = 'https://sheetdb.io/api/v1/rgytng002juic';

export default function LoginPage() {
  const [usuari, setUsuari] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!usuari || !contrasenya) {
      setError('Tots els camps són obligatoris.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/search?sheet=usuaris&usuari=${encodeURIComponent(usuari)}&contrasenya=${encodeURIComponent(contrasenya)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        localStorage.setItem('user', JSON.stringify({ nom: user.nom, empresa: user.empresa }));
        router.push('/dashboard');
      } else {
        setError('Dades incorrectes. Si us plau, verifica les teves credencials.');
      }
    } catch (err) {
      console.error(err);
      setError("Hi ha hagut un error en connectar amb el servidor. Si us plau, intenta-ho de nou més tard.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Accés d'Usuaris</CardTitle>
        <CardDescription>
          Introdueix les teves credencials per accedir al teu panell.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="usuari">Usuari</Label>
            <Input
              id="usuari"
              type="text"
              placeholder="El teu usuari"
              required
              value={usuari}
              onChange={(e) => setUsuari(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contrasenya">Contrasenya</Label>
            <Input
              id="contrasenya"
              type="password"
              required
              value={contrasenya}
              onChange={(e) => setContrasenya(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error d'accés</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading ? 'Entrant...' : 'Entrar'}
          </Button>
          <Button variant="link" asChild className="text-xs">
            <Link href="/">Tornar a l'inici</Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
