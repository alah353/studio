'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Truck,
  PlusCircle,
  Package,
  MapPin,
  Loader2,
  CheckCircle,
  Clock,
  FileDown,
  AlertTriangle,
} from 'lucide-react';

const API_URL = 'https://sheetdb.io/api/v1/rgytng002juic?sheet=solicituds';

type BookingRequest = {
  id: string;
  data: string;
  usuari: string;
  estat: 'Pendent' | 'Acceptada' | 'Aprovada' | 'Rebutjada';
  detalls: string;
};

type UserData = {
  usuario: string;
  nom: string;
  empresa: string;
  rol: string;
};

export default function BookingPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [solicituds, setSolicituds] = useState<BookingRequest[]>([]);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form States
  const [servei, setServei] = useState('Transport Terrestre');
  const [origen, setOrigen] = useState('');
  const [desti, setDesti] = useState('');
  const [carrega, setCarrega] = useState('');

  // 1. LÒGICA D'AUTENTICACIÓ
  useEffect(() => {
    const horseUser = localStorage.getItem('horse_user');
    if (!horseUser) {
      router.push('/login');
    } else {
      try {
        const parsedUser = JSON.parse(horseUser);
        setUser(parsedUser);
        fetchHistory(parsedUser.usuario);
      } catch (e) {
        localStorage.removeItem('horse_user');
        router.push('/login');
      }
    }
  }, [router]);

  // 2. FUNCIÓ GET (Històric)
  const fetchHistory = async (userEmail: string) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data: BookingRequest[] = await response.json();
      
      const userFiltered = data
        .filter((item) => item.usuari === userEmail)
        .reverse(); // Les noves surtin primer
        
      setSolicituds(userFiltered);
    } catch (err) {
      setError('No s\'ha pogut carregar l\'històric.');
    } finally {
      setLoading(false);
    }
  };

  // 3. FUNCIÓ POST (Enviar Formulari)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    const randomID = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('es-ES');
    const detallsConcatenats = `Servei: ${servei} | Origen: ${origen} | Destí: ${desti} | Càrrega: ${carrega}`;
    const estat = 'Pendent';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          data: [
            {
              id: randomID,
              data: today,
              usuari: user.usuario,
              estat: estat,
              detalls: detallsConcatenats,
            },
          ],
        }),
      });

      if (response.ok) {
        setSuccessMsg('Sol·licitud enviada correctament!');
        setOrigen('');
        setDesti('');
        setCarrega('');
        fetchHistory(user.usuario);
      } else {
        setError('Error al enviar la sol·licitud.');
      }
    } catch (err) {
      setError('Error de connexió amb el servidor.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#020817] text-white py-12 px-4">
      <div className="container max-w-5xl mx-auto space-y-12">
        
        {/* Capçalera */}
        <header className="flex items-center gap-4">
          <Truck className="h-10 w-10 text-amber-500" />
          <h1 className="font-heading text-4xl font-bold">Gestió de Comandes</h1>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Secció Formulari */}
          <section className="space-y-6">
            <Card className="bg-[#0f172a] border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-amber-500" />
                  Nova Sol·licitud
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="servei">Tipus de Servei</Label>
                      <Select value={servei} onValueChange={setServei}>
                        <SelectTrigger className="bg-[#1e293b] border-gray-800 text-white">
                          <SelectValue placeholder="Selecciona un servei" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e293b] border-gray-800 text-white">
                          <SelectItem value="Transport Terrestre">Transport Terrestre</SelectItem>
                          <SelectItem value="Transport Marítim">Transport Marítim</SelectItem>
                          <SelectItem value="Transport Aeri">Transport Aeri</SelectItem>
                          <SelectItem value="Emmagatzematge">Emmagatzematge</SelectItem>
                          <SelectItem value="Logística">Logística</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="origen">Origen</Label>
                        <Input
                          id="origen"
                          placeholder="Ciutat de recollida"
                          value={origen}
                          onChange={(e) => setOrigen(e.target.value)}
                          className="bg-[#1e293b] border-gray-800 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="desti">Destí</Label>
                        <Input
                          id="desti"
                          placeholder="Ciutat d'entrega"
                          value={desti}
                          onChange={(e) => setDesti(e.target.value)}
                          className="bg-[#1e293b] border-gray-800 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="carrega">Càrrega</Label>
                      <Input
                        id="carrega"
                        placeholder="Pes, volum o descripció"
                        value={carrega}
                        onChange={(e) => setCarrega(e.target.value)}
                        className="bg-[#1e293b] border-gray-800 text-white"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-900 text-red-400 rounded-md text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  {successMsg && (
                    <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-900 text-green-400 rounded-md text-sm">
                      <CheckCircle className="h-4 w-4" />
                      {successMsg}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      'Enviar Sol·licitud'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Secció Històric */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-500" />
              Les meves sol·licituds
            </h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                <p>Carregant el teu històric...</p>
              </div>
            ) : solicituds.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-xl text-muted-foreground">
                <p>Encara no tens cap sol·licitud registrada.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {solicituds.map((item) => (
                  <Card key={item.id} className="bg-[#0f172a] border-gray-800 hover:border-gray-700 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <p className="text-xs font-mono text-amber-500/70">{item.id}</p>
                          <p className="text-sm font-semibold">{item.data}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            variant="outline"
                            className={
                              item.estat === 'Pendent' 
                                ? 'bg-amber-500/10 text-amber-500 border-amber-900/50' 
                                : 'bg-green-600/10 text-green-400 border-green-900/50'
                            }
                          >
                            {item.estat === 'Pendent' ? (
                              <Clock className="h-3 w-3 mr-1" />
                            ) : (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {item.estat}
                          </Badge>
                          {(item.estat === 'Acceptada' || item.estat === 'Aprovada') && (
                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 border-gray-700 hover:bg-gray-800">
                              <FileDown className="h-3 w-3" />
                              Albarà
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="p-3 bg-[#1e293b]/50 rounded border border-gray-800/50 text-sm text-gray-300">
                        {item.detalls}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #020817;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
}
