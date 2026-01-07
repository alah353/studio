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
  const [usuariInput, setUsuariInput] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!usuariInput || !contrasenya) {
      setError('Tots els camps són obligatoris.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Fetch all users from the 'usuaris' sheet
      const response = await fetch(`${API_URL}?sheet=usuaris`);
      if (!response.ok) {
        throw new Error('No s\'ha pogut connectar a la base de dades.');
      }
      const data = await response.json();
      
      // 2. Log API data for debugging
      console.log('Dades API:', data);

      // 3. Find the user with robust comparison
      const foundUser = data.find((user: any) => {
        const usuariMatches = user.usuari && user.usuari.trim().toLowerCase() === usuariInput.trim().toLowerCase();
        // Explicitly convert both passwords to string for comparison
        const passwordMatches = user.password !== undefined && String(user.password) === String(contrasenya);
        return usuariMatches && passwordMatches;
      });

      if (foundUser) {
        // 4. If correct, save user data and redirect
        console.log('Login exitós per a:', foundUser.nom);
        const userToStore = {
          usuario: foundUser.usuari,
          nom: foundUser.nom,
          empresa: foundUser.empresa,
          rol: foundUser.rol,
        };
        localStorage.setItem('user', JSON.stringify(userToStore));
        router.push('/dashboard');
      } else {
        // 5. If incorrect, show error
        console.log(`Intent de login fallit per a l'usuari: "${usuariInput}"`);
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
              value={usuariInput}
              onChange={(e) => setUsuariInput(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contrasenya">Contrasenya</Label>
            <Input
              id="contrasenya"
              type="password"
              placeholder="La teva contrasenya"
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
