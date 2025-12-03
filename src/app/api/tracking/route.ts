'use server';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

// Initialize Genkit and define the model within the API route
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

const TrackShipmentInputSchema = z.object({
  trackingNumber: z.string().describe('The tracking number of the shipment.'),
});

const TrackShipmentOutputSchema = z.object({
  status: z.string().describe('The current status of the shipment.'),
  route: z.string().describe('The current route of the shipment.'),
  estimatedDeliveryTime: z
    .string()
    .describe('The estimated delivery time of the shipment.'),
});

const trackShipmentPrompt = ai.definePrompt({
  name: 'trackShipmentPrompt',
  input: {schema: TrackShipmentInputSchema},
  output: {schema: TrackShipmentOutputSchema},
  prompt: `You are an AI assistant specializing in real-time shipment tracking, using predictive algorithms for dynamic updates.
  Given the tracking number, provide a fictional but realistic current status, route, and estimated delivery time for the shipment.

  Tracking Number: {{{trackingNumber}}}
  `,
});

const trackShipmentFlow = ai.defineFlow(
  {
    name: 'trackShipmentFlow',
    inputSchema: TrackShipmentInputSchema,
    outputSchema: TrackShipmentOutputSchema,
  },
  async input => {
    const {output} = await trackShipmentPrompt(input);
    return output!;
  }
);


export async function POST(req: Request) {
  try {
    const { trackingNumber } = await req.json();

    if (!trackingNumber) {
      return NextResponse.json(
        { error: 'El número de seguimiento es obligatorio.' },
        { status: 400 }
      );
    }
    
    let data;
    if (trackingNumber === '123456789') {
      data = {
          status: 'En tránsito',
          route: 'Madrid, España -> París, Francia',
          estimatedDeliveryTime: '2 días'
      };
    } else {
      data = await trackShipmentFlow({ trackingNumber });
    }

    if (!data) {
        return NextResponse.json({ error: 'No se encontró el envío. Por favor, verifica el número de seguimiento.' }, { status: 404 });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error en la API de seguimiento:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado al procesar la solicitud.' },
      { status: 500 }
    );
  }
}
