'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertTriangle, Printer, Download } from 'lucide-react';
import { HorseLogo } from '@/components/layout/horse-logo';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
    const [printingInvoiceId, setPrintingInvoiceId] = useState<string | null>(null);
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

                if (!usersRes.ok || !documentsRes.ok) throw new Error('Error al connectar');

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

    if (loading) return <div className="flex justify-center items-center min-h-screen"><Loader2 className="h-12 w-12 animate-spin text-amber-500" /></div>;

    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-4">
            <main className="container mx-auto">
                <header className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="font-heading text-4xl font-bold">Àrea de Documents</h1>
                        <p className="text-muted-foreground mt-2">Consulta i descarrega les teves factures oficials.</p>
                    </div>
                </header>

                <div className="space-y-8">
                    {processedInvoices.length > 0 ? (
                        processedInvoices.map(invoice => (
                            <Card key={invoice.num_factura} className="overflow-hidden shadow-lg border-gray-800">
                                <CardHeader className="bg-muted/50 p-4 flex flex-row justify-between items-center">
                                    <div>
                                        <CardTitle className="text-xl">Factura #{invoice.num_factura}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{invoice.data}</p>
                                    </div>
                                    <Badge className={invoice.estat === 'Pagada' ? 'bg-green-600' : 'bg-amber-600'}>{invoice.estat}</Badge>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Concepte</TableHead>
                                                <TableHead className="text-right">Total</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {invoice.items.map((item, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{item.concepte}</TableCell>
                                                    <TableCell className="text-right">{(parseFloat(item.preu_unitari) * parseInt(item.unitats)).toFixed(2)} €</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <div className="flex justify-between items-end border-t pt-4">
                                        <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2">
                                            <Download className="h-4 w-4" /> PDF
                                        </Button>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-amber-500">{invoice.total.toFixed(2)} €</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card className="p-12 text-center text-muted-foreground">No s'han trobat documents.</Card>
                    )}
                </div>
            </main>
        </div>
    );
}
