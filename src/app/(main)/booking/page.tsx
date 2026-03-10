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
  Calendar,
  Layers,
  Container,
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
  
  // Fields for Transport
  const [origen, setOrigen] = useState('');
  const [desti, setDesti] = useState('');
  const [dataRecollida, setDataRecollida] = useState('');
  const [carrega, setCarrega] = useState('');

  // Fields for Warehousing/Logistics
  const [espai, setEspai] = useState('');
  const [durada, setDurada] = useState('');
  const [tipusMercaderia, setTipusMercaderia] = useState('General');
  const [serveisExtres, setServeisExtres] = useState('');

  // 1. LÒGICA D'AUTENTICACIÓ
  useEffect(() => {
    const horseUser = localStorage.getItem('horse_user');
    if (!horseUser) {
      router.push('/login');
    } else {
      try {
        const parsedUser = JSON.parse(horseUser);
        setUser(parsedUser);
        fetchSolicituds(parsedUser);
      } catch (e) {
        localStorage.removeItem('horse_user');
        router.push('/login');
      }
    }
  }, [router]);

  // 2. FUNCIÓ GET (Històric robust)
  const fetchSolicituds = async (usuariActual: any) => {
    setLoading(true);
    try {
      const userRole = String(usuariActual.rol || '').toLowerCase();
      const userName = String(usuariActual.usuario || '').toLowerCase().trim();

      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error en la resposta de la xarxa');
      const data: BookingRequest[] = await response.json();
      
      let filtered: BookingRequest[] = [];
      
      if (userRole.includes('admin')) {
        filtered = data;
      } else {
        filtered = data.filter((s: any) => {
          const solUser = String(s.usuari || '').toLowerCase().trim();
          return solUser === userName;
        });
      }
        
      setSolicituds(filtered.reverse()); 
    } catch (err) {
      console.error('Error carregant sol·licituds:', err);
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
    
    // Dynamic concatenation based on service type
    let detallsConcatenats = '';
    if (servei.includes('Transport')) {
      detallsConcatenats = `Servei: ${servei} | Origen: ${origen} | Destí: ${desti} | Data Recollida: ${dataRecollida} | Càrrega: ${carrega}`;
    } else {
      detallsConcatenats = `Servei: ${servei} | Espai: ${espai} | Durada: ${durada} | Mercaderia: ${tipusMercaderia} | Extres: ${serveisExtres}`;
    }

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
              estat: 'Pendent',
              detalls: detallsConcatenats,
            },
          ],
        }),
      });

      if (response.ok) {
        setSuccessMsg('Sol·licitud enviada correctament!');
        // Reset all fields
        setOrigen('');
        setDesti('');
        setCarrega('');
        setDataRecollida('');
        setEspai('');
        setDurada('');
        setTipusMercaderia('General');
        setServeisExtres('');
        fetchSolicituds(user);
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
      <div className="container max-w-6xl mx-auto space-y-12">
        
        {/* Capçalera */}
        <header className="flex items-center gap-4">
          <Truck className="h-10 w-10 text-amber-500" />
          <h1 className="font-heading text-4xl font-bold">Gestió de Comandes</h1>
        </header>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Secció Formulari (Més gran) */}
          <section className="lg:col-span-3 space-y-6">
            <Card className="bg-[#0f172a] border-gray-800 shadow-2xl">
              <CardHeader className="border-b border-gray-800/50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-amber-500" />
                  Nova Sol·licitud de Servei
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Selecció de Servei */}
                  <div className="space-y-4">
                    <Label htmlFor="servei" className="text-amber-500 font-semibold tracking-wide uppercase text-xs">Tipus de Servei</Label>
                    <Select value={servei} onValueChange={(val) => {
                      setServei(val);
                      setError(null);
                      setSuccessMsg(null);
                    }}>
                      <SelectTrigger className="bg-[#1e293b] border-gray-800 text-white h-12">
                        <SelectValue placeholder="Selecciona un servei" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e293b] border-gray-800 text-white">
                        <SelectItem value="Transport Terrestre">Transport Terrestre</SelectItem>
                        <SelectItem value="Transport Marítim">Transport Marítim</SelectItem>
                        <SelectItem value="Transport Aeri">Transport Aeri</SelectItem>
                        <SelectItem value="Emmagatzematge i Logística">Emmagatzematge i Logística</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Camps Condicionals: TRANSPORT */}
                  {servei.includes('Transport') && (
                    <div className="grid gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="origen" className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-gray-500" /> Origen
                          </Label>
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
                          <Label htmlFor="desti" className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-gray-500" /> Destí
                          </Label>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dataRecollida" className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-gray-500" /> Data de Recollida
                          </Label>
                          <Input
                            id="dataRecollida"
                            type="date"
                            value={dataRecollida}
                            onChange={(e) => setDataRecollida(e.target.value)}
                            className="bg-[#1e293b] border-gray-800 text-white block w-full"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="carrega" className="flex items-center gap-2">
                            <Container className="h-3 w-3 text-gray-500" /> Càrrega (Pes/Volum)
                          </Label>
                          <Input
                            id="carrega"
                            placeholder="Ex: 500kg / 2m3"
                            value={carrega}
                            onChange={(e) => setCarrega(e.target.value)}
                            className="bg-[#1e293b] border-gray-800 text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Camps Condicionals: WAREHOUSING */}
                  {servei === 'Emmagatzematge i Logística' && (
                    <div className="grid gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="espai" className="flex items-center gap-2">
                            <Layers className="h-3 w-3 text-gray-500" /> Espai Necessari
                          </Label>
                          <Input
                            id="espai"
                            placeholder="Ex: 50 m2 o 10 palets"
                            value={espai}
                            onChange={(e) => setEspai(e.target.value)}
                            className="bg-[#1e293b] border-gray-800 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="durada" className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gray-500" /> Durada Estimada
                          </Label>
                          <Input
                            id="durada"
                            placeholder="Ex: 3 mesos / Indefinit"
                            value={durada}
                            onChange={(e) => setDurada(e.target.value)}
                            className="bg-[#1e293b] border-gray-800 text-white"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tipusMercaderia">Tipus de Mercaderia</Label>
                          <Select value={tipusMercaderia} onValueChange={setTipusMercaderia}>
                            <SelectTrigger className="bg-[#1e293b] border-gray-800 text-white">
                              <SelectValue placeholder="Selecciona tipus" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1e293b] border-gray-800 text-white">
                              <SelectItem value="General">Càrrega General</SelectItem>
                              <SelectItem value="Refrigerada">Refrigerada / Congelada</SelectItem>
                              <SelectItem value="Perillosa">Perillosa (ADR)</SelectItem>
                              <SelectItem value="Fràgil">Fràgil / Alt Valor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="serveisExtres">Serveis Extres</Label>
                          <Input
                            id="serveisExtres"
                            placeholder="Picking, Packing, Etiquetatge..."
                            value={serveisExtres}
                            onChange={(e) => setServeisExtres(e.target.value)}
                            className="bg-[#1e293b] border-gray-800 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Alertes de missatges */}
                  {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-900/50 text-red-400 rounded-lg text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  {successMsg && (
                    <div className="flex items-center gap-2 p-4 bg-green-900/20 border border-green-900/50 text-green-400 rounded-lg text-sm">
                      <CheckCircle className="h-4 w-4" />
                      {successMsg}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg shadow-lg shadow-amber-500/10 transition-all active:scale-[0.98]"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      'Enviar Sol·licitud de Reserva'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Secció Històric (Més estreta) */}
          <section className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-500" />
              {String(user.rol).toLowerCase().includes('admin') ? 'Panell d\'Administració' : 'L\'Històric de reserves'}
            </h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                <p className="animate-pulse">Sincronitzant amb la xarxa...</p>
              </div>
            ) : solicituds.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-10" />
                <p>No s'ha trobat cap sol·licitud activa.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                {solicituds.map((item) => (
                  <Card key={item.id} className="bg-[#0f172a] border-gray-800 hover:border-gray-700 transition-all group">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <p className="text-[10px] font-mono text-amber-500/60 tracking-widest">{item.id}</p>
                          <p className="text-sm font-bold text-gray-100">{item.data}</p>
                          {String(user.rol).toLowerCase().includes('admin') && (
                            <p className="text-[11px] text-amber-500/80 font-medium">Usuari: {item.usuari}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            variant="outline"
                            className={
                              item.estat === 'Pendent' 
                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/30 px-3 py-1' 
                                : 'bg-green-500/10 text-green-400 border-green-500/30 px-3 py-1'
                            }
                          >
                            {item.estat === 'Pendent' ? (
                              <Clock className="h-3 w-3 mr-1.5" />
                            ) : (
                              <CheckCircle className="h-3 w-3 mr-1.5" />
                            )}
                            {item.estat}
                          </Badge>
                          {(item.estat === 'Acceptada' || item.estat === 'Aprovada') && (
                            <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1.5 border-gray-700 hover:bg-gray-800 font-bold uppercase tracking-tighter">
                              <FileDown className="h-3 w-3" />
                              Albarà
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="p-3 bg-[#1e293b]/40 rounded-lg border border-gray-800/40 text-[13px] leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors">
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
          width: 5px;
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
