'use server';

import { trackShipment, TrackShipmentOutput } from '@/ai/flows/real-time-shipment-tracking';
import { z } from 'zod';

const schema = z.object({
  trackingNumber: z.string().min(5, { message: 'El número de seguimiento debe tener al menos 5 caracteres.' }),
});

export type FormState = {
  message: string;
  data?: TrackShipmentOutput;
  error?: boolean;
};

export async function handleTrackShipment(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = schema.safeParse({
      trackingNumber: formData.get('trackingNumber'),
    });

    if (!validatedFields.success) {
      return {
        message: validatedFields.error.flatten().fieldErrors.trackingNumber?.[0] || 'Entrada inválida.',
        error: true,
      };
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For simulation purposes, we will return mock data if the tracking number is not a real one from the prompt.
    // The GenAI flow might not have access to real-time carrier data.
    if (validatedFields.data.trackingNumber === '123456789') {
        const mockData: TrackShipmentOutput = {
            status: 'En tránsito',
            route: 'Madrid, España -> París, Francia',
            estimatedDeliveryTime: '2 días'
        };
        return { message: 'Envío encontrado.', data: mockData };
    }


    const result = await trackShipment(validatedFields.data);

    if (!result) {
        return { message: 'No se pudo obtener la información de seguimiento.', error: true };
    }

    return { message: 'Envío encontrado.', data: result };
  } catch (error) {
    console.error('Tracking Error:', error);
    return { message: 'No se encontró el envío. Por favor, verifica el número de seguimiento.', error: true };
  }
}
