'use server';
/**
 * @fileOverview A real-time shipment tracking AI agent.
 *
 * - trackShipment - A function that handles the shipment tracking process.
 * - TrackShipmentInput - The input type for the trackShipment function.
 * - TrackShipmentOutput - The return type for the trackShipment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrackShipmentInputSchema = z.object({
  trackingNumber: z.string().describe('The tracking number of the shipment.'),
});
export type TrackShipmentInput = z.infer<typeof TrackShipmentInputSchema>;

const TrackShipmentOutputSchema = z.object({
  status: z.string().describe('The current status of the shipment.'),
  route: z.string().describe('The current route of the shipment.'),
  estimatedDeliveryTime: z
    .string()
    .describe('The estimated delivery time of the shipment.'),
});
export type TrackShipmentOutput = z.infer<typeof TrackShipmentOutputSchema>;

export async function trackShipment(input: TrackShipmentInput): Promise<TrackShipmentOutput> {
  return trackShipmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trackShipmentPrompt',
  input: {schema: TrackShipmentInputSchema},
  output: {schema: TrackShipmentOutputSchema},
  prompt: `You are an AI assistant specializing in real-time shipment tracking, using predictive algorithms for dynamic updates.
  Given the tracking number, provide the current status, route, and estimated delivery time of the shipment.

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
    const {output} = await prompt(input);
    return output!;
  }
);
