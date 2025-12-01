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

const formSchema = z.object({
  loadType: z.string().min(2, { message: 'El tipo de carga debe tener al menos 2 caracteres.' }),
  origin: z.string().min(2, { message: 'El origen debe tener al menos 2 caracteres.' }),
  destination: z.string().min(2, { message: 'El destino debe tener al menos 2 caracteres.' }),
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce una dirección de email válida.' }),
  phone: z.string().optional(),
  specialRequirements: z.string().optional(),
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
      origin: '',
      destination: '',
      name: '',
      email: '',
      phone: '',
      specialRequirements: '',
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
    
    // Notify parent component about success to close dialog
    setTimeout(() => {
        onSuccess();
        // Reset success state for next time dialog opens
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="loadType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Carga</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Pallets, contenedores" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origen</FormLabel>
              <FormControl>
                <Input placeholder="Ciudad, País" {...field} />
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
                <FormLabel>Destino</FormLabel>
                <FormControl>
                <Input placeholder="Ciudad, País" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
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
                <FormLabel>Teléfono <span className="text-muted-foreground">(Opcional)</span></FormLabel>
                <FormControl>
                <Input placeholder="+34 123 456 789" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="specialRequirements"
            render={({ field }) => (
            <FormItem className="md:col-span-2">
                <FormLabel>Requerimientos Especiales <span className="text-muted-foreground">(Opcional)</span></FormLabel>
                <FormControl>
                <Textarea placeholder="Ej: Mercancía frágil, necesita refrigeración, etc." {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <Button type="submit" className="w-full md:col-span-2 bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSubmitting ? 'Enviando Solicitud...' : 'Enviar Solicitud'}
        </Button>
      </form>
    </Form>
  );
}
