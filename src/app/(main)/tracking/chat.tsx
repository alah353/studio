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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const formSchema = z.object({
  prompt: z.string().min(1),
});

type Message = {
    role: 'user' | 'bot';
    text: string;
}

export function Chat() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const userMessage: Message = { role: 'user', text: values.prompt };
    setMessages(prev => [...prev, userMessage]);
    form.reset();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: values.prompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage: Message = { role: 'bot', text: data.response };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error handling chat:', error);
      const errorMessage: Message = { role: 'bot', text: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.' };
      setMessages(prev => [...prev, errorMessage]);
    }


    setIsSubmitting(false);
  }

  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Bot /> Asistente de Incidencias
            </CardTitle>
            <CardDescription>¿Tienes alguna duda o incidencia? Nuestro asistente virtual está aquí para ayudarte al instante.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-[500px]">
            <ScrollArea className="flex-1 pr-4 mb-4">
                <div className="space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : '')}>
                             {msg.role === 'bot' && (
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback><Bot size={20}/></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn("p-3 rounded-lg max-w-sm", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                               <p className="text-sm">{msg.text}</p>
                            </div>
                            {msg.role === 'user' && (
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback><User size={20} /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                     {isSubmitting && messages[messages.length - 1]?.role === 'user' && (
                        <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                                <AvatarFallback><Bot size={20} /></AvatarFallback>
                            </Avatar>
                            <div className="p-3 rounded-lg bg-muted flex items-center">
                                <Loader2 className="h-5 w-5 animate-spin" />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                            <Input placeholder="Ej: Mi paquete está retrasado, ¿cuál es el estado?" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" size="icon" disabled={isSubmitting}>
                        <Send />
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
