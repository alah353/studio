'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, Printer, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const API_URL = 'https://sheetdb.io/api/v1/rgytng002juic';

type DocumentLine = {
  num_factura: string;
  data: string;
  usuari: string;
  concepte: string;
  unitats: string;
  preu_unitari: string;
  iva: string;
  estat: 'Pagada' | 'Pendent' | 'Vençuda';
};

type User = {
  usuari: string;
  nom: string;
  rol: string;
  empresa: string;
  fiscalid: string;
  adreca: string;
  telefon: string;
};

type UserData = {
    usuario: string;
    nom: string;
    empresa: string;
    rol: string;
};

type ProcessedInvoice = {
  num_factura: string;
  data: string;
  estat: 'Pagada' | 'Pendent' | 'Vençuda';
  clientInfo: User;
  items: DocumentLine[];
  subtotal: number;
  totalIva: number;
  total: number;
};

const COMPANY_INFO = {
    name: 'Horse S.L.',
    address: 'Polígono Industrial Riuclar, 43006 Tarragona, España',
    fiscalId: 'NIF: B-12345678',
    email: 'facturacion@horsesl.com'
};

const parseSpanishDate = (dateString: string): Date => {
    if (!dateString || typeof dateString !== 'string') return new Date();
    const parts = dateString.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return new Date(Number(year), Number(month) - 1, Number(day));
    }
    return new Date(dateString);
};

export default function DocumentsPage() {
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);
    const [documents, setDocuments] = useState<DocumentLine[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imprimiendoId, setImprimiendoId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userDataString = localStorage.getItem('horse_user');
        if (userDataString) {
            try {
                setCurrentUser(JSON.parse(userDataString));
            } catch (e) {
                router.push('/login');
                return;
            }
        } else {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersRes, documentsRes] = await Promise.all([
                    fetch(`${API_URL}?sheet=usuaris`),
                    fetch(`${API_URL}?sheet=documents`),
                ]);

                if (!usersRes.ok || !documentsRes.ok) throw new Error('Error al connectar amb el servidor');

                setUsers(await usersRes.json());
                setDocuments(await documentsRes.json());
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [router]);

    const processedInvoices = useMemo((): ProcessedInvoice[] => {
        if (!documents.length || !users.length || !currentUser) return [];

        let filteredDocs: DocumentLine[];
        const userRole = (currentUser.rol || '').toLowerCase();
        const userEmail = (currentUser.usuario || '').toLowerCase().trim();

        if (['admin', 'administrador', 'treballador'].some(r => userRole.includes(r))) {
            filteredDocs = documents;
        } else {
            filteredDocs = documents.filter(doc => (doc.usuari || '').toLowerCase().trim() === userEmail);
        }

        const grouped = filteredDocs.reduce<Record<string, DocumentLine[]>>((acc, doc) => {
            if (!doc.num_factura) return acc;
            acc[doc.num_factura] = acc[doc.num_factura] || [];
            acc[doc.num_factura].push(doc);
            return acc;
        }, {});

        return Object.values(grouped).map((items): ProcessedInvoice | null => {
            const clientInfo = users.find(u => (u.usuari || '').toLowerCase().trim() === items[0].usuari.toLowerCase().trim());
            if (!clientInfo) return null;

            const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.preu_unitari) * parseInt(item.unitats)), 0);
            const totalIva = items.reduce((sum, item) => sum + (parseFloat(item.preu_unitari) * parseInt(item.unitats) * (parseInt(item.iva) / 100)), 0);

            return {
                num_factura: items[0].num_factura,
                data: items[0].data,
                estat: items[0].estat,
                clientInfo,
                items,
                subtotal,
                totalIva,
                total: subtotal + totalIva,
            };
        }).filter((inv): inv is ProcessedInvoice => inv !== null)
          .sort((a, b) => parseSpanishDate(b.data).getTime() - parseSpanishDate(a.data).getTime());
    }, [documents, users, currentUser]);

    const handlePrint = (invoiceId: string) => {
        setImprimiendoId(invoiceId);
        // Donem temps al DOM per ocultar la resta d'elements abans de disparar el diàleg
        setTimeout(() => {
            window.print();
            setImprimiendoId(null);
        }, 150);
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen"><Loader2 className="h-12 w-12 animate-spin text-amber-500" /></div>;

    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-4">
            <main className="container mx-auto">
                <header className={cn("mb-10 flex justify-between items-center print:hidden", imprimiendoId && "hidden")}>
                    <div>
                        <h1 className="font-heading text-4xl font-bold">Àrea de Documents</h1>
                        <p className="text-muted-foreground mt-2">Consulta i descarrega les teves factures oficials.</p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/dashboard">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Tornar al Dashboard
                        </Link>
                    </Button>
                </header>

                <div className="space-y-8">
                    {processedInvoices.length > 0 ? (
                        processedInvoices.map(invoice => (
                            <Card 
                                key={invoice.num_factura} 
                                id={imprimiendoId === invoice.num_factura ? "zona-factura" : undefined}
                                className={cn(
                                    "overflow-hidden shadow-lg border-gray-800 transition-all",
                                    imprimiendoId && imprimiendoId !== invoice.num_factura ? "hidden" : "block"
                                )}
                            >
                                <CardHeader className="bg-muted/50 p-6 flex flex-row justify-between items-center">
                                    <div className="flex flex-col md:flex-row md:items-center gap-6 w-full">
                                        <div className="flex-1">
                                            <CardTitle className="text-2xl font-bold">Factura #{invoice.num_factura}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{invoice.data}</p>
                                        </div>
                                        <div className="hidden print:block text-right">
                                            <h3 className="font-bold text-lg">{COMPANY_INFO.name}</h3>
                                            <p className="text-xs text-muted-foreground">{COMPANY_INFO.address}</p>
                                            <p className="text-xs text-muted-foreground">{COMPANY_INFO.fiscalId}</p>
                                        </div>
                                        <Badge className={cn(
                                            "w-fit",
                                            invoice.estat === 'Pagada' ? 'bg-green-600' : 'bg-amber-600'
                                        )}>
                                            {invoice.estat}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                
                                <CardContent className="p-8 space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Dades del Client</h4>
                                            <p className="font-bold text-lg">{invoice.clientInfo.empresa}</p>
                                            <p className="text-sm">{invoice.clientInfo.adreca}</p>
                                            <p className="text-sm font-mono">{invoice.clientInfo.fiscalid}</p>
                                        </div>
                                        <div className="md:text-right space-y-2">
                                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contacte</h4>
                                            <p className="text-sm">{invoice.clientInfo.nom}</p>
                                            <p className="text-sm">{invoice.clientInfo.usuari}</p>
                                            <p className="text-sm">{invoice.clientInfo.telefon}</p>
                                        </div>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Concepte</TableHead>
                                                <TableHead className="text-right">Quantitat</TableHead>
                                                <TableHead className="text-right">P. Unitari</TableHead>
                                                <TableHead className="text-right">IVA</TableHead>
                                                <TableHead className="text-right">Total línia</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {invoice.items.map((item, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="font-medium">{item.concepte}</TableCell>
                                                    <TableCell className="text-right">{item.unitats}</TableCell>
                                                    <TableCell className="text-right">{parseFloat(item.preu_unitari).toFixed(2)} €</TableCell>
                                                    <TableCell className="text-right">{item.iva}%</TableCell>
                                                    <TableCell className="text-right">{(parseFloat(item.preu_unitari) * parseInt(item.unitats)).toFixed(2)} €</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                    <div className="flex flex-col items-end pt-6 border-t gap-2">
                                        <div className="w-full max-w-[250px] space-y-2">
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>Subtotal:</span>
                                                <span>{invoice.subtotal.toFixed(2)} €</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>IVA:</span>
                                                <span>{invoice.totalIva.toFixed(2)} €</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                                                <span className="font-bold text-lg">Total Factura:</span>
                                                <span className="text-2xl font-bold text-amber-500">{invoice.total.toFixed(2)} €</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-start print:hidden">
                                        <Button 
                                            variant="outline" 
                                            className="gap-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                                            onClick={() => handlePrint(invoice.num_factura)}
                                        >
                                            <Printer className="h-4 w-4" /> Imprimir / PDF
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card className="p-12 text-center text-muted-foreground">
                            No s'han trobat documents per al vostre compte.
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}
