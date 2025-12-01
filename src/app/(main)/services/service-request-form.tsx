'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  // Carga
  loadType: z.string().min(1, { message: 'El tipo de carga es obligatorio.' }),
  merchandiseDescription: z.string().min(1, { message: 'La descripción es obligatoria.' }),
  quantity: z.string().min(1, { message: 'La cantidad es obligatoria.' }),
  volume: z.string().min(1, { message: 'El volumen es obligatorio.' }),
  weight: z.string().min(1, { message: 'El peso es obligatorio.' }),
  dimensions: z.string().optional(),
  packaging: z.string().min(1, { message: 'El tipo de embalaje es obligatorio.' }),
  
  // Logística
  origin: z.string().min(1, { message: 'El origen es obligatorio.' }),
  destination: z.string().min(1, { message: 'El destino es obligatorio.' }),
  pickupDate: z.string().min(1, { message: 'La fecha de recogida es obligatoria.' }),
  deliveryDate: z.string().min(1, { message: 'La fecha de entrega es obligatoria.' }),
  frequency: z.string().min(1, { message: 'La frecuencia es obligatoria.' }),
  specialRequirements: z.string().optional(),
  
  // Contacto
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  company: z.string().min(1, { message: 'El nombre de la empresa es obligatorio.' }),
  email: z.string().email({ message: 'Por favor, introduce una dirección de email válida.' }),
  phone: z.string().min(1, { message: 'El teléfono es obligatorio.' }),
});

type ServiceRequestFormProps = {
    serviceTitle: string;
    onSuccess: () => void;
}

export function ServiceRequestForm({ serviceTitle, onSuccess }: ServiceRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loadType: '',
      merchandiseDescription: '',
      quantity: '',
      volume: '',
      weight: '',
      dimensions: '',
      packaging: '',
      origin: '',
      destination: '',
      pickupDate: '',
      deliveryDate: '',
      frequency: 'Puntual',
      specialRequirements: '',
      name: '',
      company: '',
      email: '',
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setIsSuccess(false);
    console.log({ service: serviceTitle, ...values });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    form.reset();
    
    setTimeout(() => {
        onSuccess();
        setIsSuccess(false);
    }, 2000);
  }

  if (isSuccess) {
    return (
        <Alert className="mt-6 border-green-500 text-green-500">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>¡Solicitud Enviada!</AlertTitle>
            <AlertDescription>
                Hemos recibido tu solicitud para {serviceTitle}. Nos pondremos en contacto contigo pronto.
            </AlertDescription>
        </Alert>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 border-b pb-2">1. Detalles de la Carga</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="loadType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Carga</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Palets, Carga completa, ADR..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packaging"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Embalaje</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Palets europeos, cajas, a granel..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="merchandiseDescription"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Descripción de la Mercancía</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ej: Maquinaria industrial, material frágil, alimentos no perecederos..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad y Unidades</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 10 palets, 50 cajas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="dimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dimensiones (L×A×H)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 120x80x150 cm por palet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volumen Total (m³)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ej: 15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso Total (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ej: 1200" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 border-b pb-2">2. Detalles de la Operación</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origen (Ciudad, País, CP)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Barcelona, España, 08001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destino (Ciudad, País, CP)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: París, Francia, 75001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pickupDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha/Hora de Recogida</FormLabel>
                    <FormControl>
                       <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha/Hora de Entrega</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frecuencia del Servicio</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una frecuencia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Puntual">Envío puntual</SelectItem>
                        <SelectItem value="Diario">Recurrente: Diario</SelectItem>
                        <SelectItem value="Semanal">Recurrente: Semanal</SelectItem>
                        <SelectItem value="Mensual">Recurrente: Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Requisitos Especiales <span className="text-muted-foreground">(Opcional)</span></FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ej: Se necesita plataforma elevadora, control de temperatura, seguro adicional..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 border-b pb-2">3. Datos de Contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de tu empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="+34 123 456 789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSubmitting ? 'Enviando Solicitud...' : 'Enviar Solicitud de Oferta'}
        </Button>
      </form>
    </Form>
  );
}
