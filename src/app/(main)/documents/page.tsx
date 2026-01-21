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

// --- 1. CONFIGURACIÓ I TIPUS ---

const API_URL = 'https://sheetdb.io/api/v1/rgytng002juic';

type DocumentLine = {
  num_factura: string;
  data: string;
  usuari: string;
  descripcio: string;
  unitats: string;
  preu_unitari: string;
  iva: string;
  estat: 'Pagada' | 'Pendent' | 'Vençuda';
};

type User = {
  usuari: string; // Email
  nom: string;
  rol: 'admin' | 'administrador' | 'administardor' | 'treballador' | 'client';
  empresa: string;
  fiscalid: string;
  adreca: string;
  telefon: string;
};

// User data from localStorage
type UserData = {
    usuario: string; // This is the key in localStorage, it's 'usuario' not 'usuari'
    nom: string;
    empresa: string;
    rol: 'admin' | 'administrador' | 'administardor' | 'treballador' | 'client';
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


// --- 2. COMPONENT DE FACTURA IMPRIMIBLE ---

const PrintableInvoice = ({ invoice, companyInfo }: { invoice: ProcessedInvoice, companyInfo: typeof COMPANY_INFO }) => (
    <div className="bg-white text-black p-8 A4-size">
        <header className="flex justify-between items-start pb-8 border-b-2 border-gray-200">
            <div>
                <HorseLogo className="w-48 h-auto" />
                <div className="text-xs text-gray-600 mt-4">
                    <p>{companyInfo.name}</p>
                    <p>{companyInfo.address}</p>
                    <p>{companyInfo.fiscalId}</p>
                    <p>{companyInfo.email}</p>
                </div>
            </div>
            <div className="text-right">
                <h1 className="text-4xl font-bold text-gray-800">FACTURA</h1>
                <p className="text-gray-700 mt-2">#{invoice.num_factura}</p>
                <p className="text-sm text-gray-500">Data: {new Date(invoice.data).toLocaleDateString('es-ES')}</p>
            </div>
        </header>

        <section className="my-8">
            <div className="text-sm">
                <h2 className="font-semibold text-gray-500 mb-2">FACTURAR A:</h2>
                <p className="font-bold text-gray-800">{invoice.clientInfo.empresa}</p>
                <p>{invoice.clientInfo.adreca}</p>
                <p>NIF: {invoice.clientInfo.fiscalid}</p>
                <p>Email: {invoice.clientInfo.usuari}</p>
            </div>
        </section>

        <section>
            <table className="w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-3 text-left font-semibold text-gray-600">Descripció</th>
                        <th className="p-3 text-right font-semibold text-gray-600">Quant.</th>
                        <th className="p-3 text-right font-semibold text-gray-600">Preu Unit.</th>
                        <th className="p-3 text-right font-semibold text-gray-600">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.items.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-3">{item.descripcio}</td>
                            <td className="p-3 text-right">{item.unitats}</td>
                            <td className="p-3 text-right">{parseFloat(item.preu_unitari).toFixed(2)} €</td>
                            <td className="p-3 text-right">{(parseFloat(item.preu_unitari) * parseInt(item.unitats)).toFixed(2)} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>

        <section className="mt-8 flex justify-end">
            <div className="w-full max-w-xs text-sm">
                <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold text-gray-800">{invoice.subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">IVA ({invoice.items[0]?.iva || '21'}%):</span>
                    <span className="font-semibold text-gray-800">{invoice.totalIva.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between py-3 bg-gray-100 px-2 rounded-md mt-2">
                    <span className="font-bold text-lg">TOTAL:</span>
                    <span className="font-bold text-lg">{invoice.total.toFixed(2)} €</span>
                </div>
            </div>
        </section>

        <footer className="mt-16 text-center text-xs text-gray-400 border-t pt-4">
            <p>Gràcies per la seva confiança.</p>
            <p>{companyInfo.name} | {companyInfo.address}</p>
        </footer>
        <style jsx global>{`
          @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .no-print {
                display: none !important;
            }
            .A4-size {
                width: 210mm;
                height: 297mm;
                margin: 0;
                padding: 0;
                box-shadow: none;
                border: none;
            }
          }
        `}</style>
    </div>
);


// --- 3. COMPONENT PRINCIPAL DE LA PÀGINA ---

export default function DocumentsPage() {
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);
    const [documents, setDocuments] = useState<DocumentLine[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [printingInvoiceId, setPrintingInvoiceId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // 1. Proteger la ruta y cargar datos de usuario
        const userDataString = localStorage.getItem('user');
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

        // 2. Cargar datos de API
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [usersRes, documentsRes] = await Promise.all([
                    fetch(`${API_URL}?sheet=usuaris`),
                    fetch(`${API_URL}?sheet=documents`),
                ]);

                if (!usersRes.ok || !documentsRes.ok) {
                    throw new Error('No s\'ha pogut connectar a la base de dades.');
                }

                const usersData: User[] = await usersRes.json();
                const documentsData: DocumentLine[] = await documentsRes.json();

                setUsers(usersData);
                setDocuments(documentsData);

            } catch (e: any) {
                console.error(e);
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
        const userRole = currentUser.rol.toLowerCase();

        // Filter documents based on role
        if (['admin', 'administrador', 'administardor', 'treballador'].includes(userRole)) {
            filteredDocs = documents;
        } else if (userRole === 'client') {
            const currentUserEmail = currentUser.usuario.toLowerCase().trim();
            filteredDocs = documents.filter(doc => doc.usuari && doc.usuari.toLowerCase().trim() === currentUserEmail);
        } else {
            return []; // No access for other roles
        }

        // Group by invoice number
        const groupedByInvoiceNumber = filteredDocs.reduce<Record<string, DocumentLine[]>>((acc, doc) => {
            if (!doc.num_factura) return acc;
            acc[doc.num_factura] = acc[doc.num_factura] || [];
            acc[doc.num_factura].push(doc);
            return acc;
        }, {});

        // Process each group into an invoice object
        return Object.values(groupedByInvoiceNumber).map((items: DocumentLine[]): ProcessedInvoice | null => {
            if (!items.length) return null;

            const firstItem = items[0];
            const clientInfo = users.find(u => u.usuari && u.usuari.toLowerCase().trim() === firstItem.usuari.toLowerCase().trim());

            // If we can't find the client's fiscal data, we can't generate a proper invoice.
            if (!clientInfo) return null;

            const subtotal = items.reduce((sum, item) => {
                const price = parseFloat(item.preu_unitari);
                const units = parseInt(item.unitats, 10);
                return sum + (isNaN(price) || isNaN(units) ? 0 : price * units);
            }, 0);

            const totalIva = items.reduce((sum, item) => {
                const price = parseFloat(item.preu_unitari);
                const units = parseInt(item.unitats, 10);
                const ivaRate = parseInt(item.iva, 10);
                const lineTotal = isNaN(price) || isNaN(units) ? 0 : price * units;
                const lineIva = isNaN(ivaRate) ? lineTotal * 0.21 : lineTotal * (ivaRate / 100);
                return sum + lineIva;
            }, 0);
            
            const total = subtotal + totalIva;

            return {
                num_factura: firstItem.num_factura,
                data: firstItem.data,
                estat: firstItem.estat,
                clientInfo,
                items,
                subtotal,
                totalIva,
                total,
            };
        }).filter((invoice): invoice is ProcessedInvoice => invoice !== null)
          .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());


    }, [documents, users, currentUser]);

    const handlePrint = (invoiceId: string) => {
        setPrintingInvoiceId(invoiceId);
        setTimeout(() => {
            window.print();
        }, 100);
    };

    useEffect(() => {
        if (printingInvoiceId) {
            const afterPrint = () => setPrintingInvoiceId(null);
            window.addEventListener('afterprint', afterPrint);
            return () => window.removeEventListener('afterprint', afterPrint);
        }
    }, [printingInvoiceId]);

    const getStatusBadge = (status: ProcessedInvoice['estat']) => {
        switch (status) {
            case 'Pagada': return <Badge variant="default" className="bg-green-600 text-white">Pagada</Badge>;
            case 'Pendent': return <Badge variant="secondary" className="bg-yellow-500 text-black">Pendent</Badge>;
            case 'Vençuda': return <Badge variant="destructive">Vençuda</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-accent" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-8">
                 <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error de Càrrega</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }
    
    if (printingInvoiceId) {
        const invoiceToPrint = processedInvoices.find(inv => inv.num_factura === printingInvoiceId);
        if (!invoiceToPrint) return null;
        return <PrintableInvoice invoice={invoiceToPrint} companyInfo={COMPANY_INFO} />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground no-print">
            <main className="container mx-auto py-10 px-4">
                <header className="mb-10">
                    <h1 className="font-headline text-4xl font-bold">Àrea Privada de Documents</h1>
                    <p className="text-muted-foreground mt-2">
                        {currentUser?.rol === 'client' 
                         ? `Mostrant documents per a ${currentUser.empresa}`
                         : `Accés d'administrador: ${currentUser?.nom}`}
                    </p>
                </header>

                <div className="space-y-8">
                    {processedInvoices.length > 0 ? (
                        processedInvoices.map(invoice => (
                            <Card key={invoice.num_factura} className="overflow-hidden shadow-lg">
                                <CardHeader className="bg-card-foreground/5 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <div>
                                        <CardTitle className="font-headline text-xl">Factura #{invoice.num_factura}</CardTitle>
                                        <p className="text-sm text-muted-foreground">Data: {new Date(invoice.data).toLocaleDateString('es-ES')}</p>
                                    </div>
                                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                                        {getStatusBadge(invoice.estat)}
                                        { currentUser && !['client'].includes(currentUser.rol) && <p className="text-sm font-semibold mt-1">{invoice.clientInfo.empresa}</p> }
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="p-4 overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Descripció</TableHead>
                                                    <TableHead className="text-right">Quant.</TableHead>
                                                    <TableHead className="text-right">Preu Unit.</TableHead>
                                                    <TableHead className="text-right">IVA</TableHead>
                                                    <TableHead className="text-right">Total Línia</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {invoice.items.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{item.descripcio}</TableCell>
                                                        <TableCell className="text-right">{item.unitats}</TableCell>
                                                        <TableCell className="text-right">{parseFloat(item.preu_unitari).toFixed(2)} €</TableCell>
                                                        <TableCell className="text-right">{item.iva}%</TableCell>
                                                        <TableCell className="text-right font-medium">{(parseFloat(item.preu_unitari) * parseInt(item.unitats)).toFixed(2)} €</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <Separator />
                                    <div className="p-4 bg-card-foreground/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <div className="flex gap-4">
                                            <Button variant="outline" onClick={() => handlePrint(invoice.num_factura)}>
                                                <Printer className="mr-2 h-4 w-4" /> Imprimir
                                            </Button>
                                             <Button variant="outline" onClick={() => handlePrint(invoice.num_factura)}>
                                                <Download className="mr-2 h-4 w-4" /> Descarregar PDF
                                            </Button>
                                        </div>
                                        <div className="space-y-1 text-right text-sm">
                                            <p>Subtotal: <span className="font-semibold">{invoice.subtotal.toFixed(2)} €</span></p>
                                            <p>IVA: <span className="font-semibold">{invoice.totalIva.toFixed(2)} €</span></p>
                                            <p className="text-lg font-bold text-primary">Total: <span className="font-bold">{invoice.total.toFixed(2)} €</span></p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                         <Card>
                            <CardContent className="p-8 text-center">
                                <h3 className="font-headline text-xl">No s'han trobat documents</h3>
                                <p className="text-muted-foreground mt-2">No hi ha cap document que coincideixi amb els teus criteris.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}
