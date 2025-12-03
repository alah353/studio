import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

// Initialize Genkit and define the model within the API route
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

// Define the tracking tool directly within the API route
const incidentTool = ai.defineTool(
  {
    name: 'incidentTool',
    description:
      'Use this tool to get the status of a shipment to answer user questions.',
    inputSchema: z.object({ trackingNumber: z.string() }),
    outputSchema: z.any(),
  },
  async ({ trackingNumber }) => {
    // Hardcoded response for demo purposes
    if (trackingNumber === '123456789') {
      return {
          status: 'En tránsito',
          route: 'Madrid, España -> París, Francia',
          estimatedDeliveryTime: '2 días'
      };
    }

    // Define a simple prompt-based tracking flow for other numbers
    const trackShipmentPrompt = ai.definePrompt({
        name: 'trackShipmentPrompt',
        input: { schema: z.object({ trackingNumber: z.string() }) },
        output: { schema: z.object({
            status: z.string(),
            route: z.string(),
            estimatedDeliveryTime: z.string()
        }) },
        prompt: `You are an AI assistant specializing in real-time shipment tracking.
        Given the tracking number, provide a fictional but realistic current status, route, and estimated delivery time.
        Tracking Number: {{{trackingNumber}}}`,
    });
    
    try {
        const { output } = await trackShipmentPrompt({ trackingNumber });
        return output;
    } catch (e) {
      return {
        error:
          'No se encontró el envío. Por favor, verifica el número de seguimiento.',
      };
    }
  }
);

async function handleChat(prompt: string): Promise<string> {
  const llmResponse = await ai.generate({
    prompt: `Eres un asistente virtual de atención al cliente para una empresa de logística llamada Horse S.L. 
    Tu objetivo es resolver incidencias de los clientes de manera rápida y eficiente. 
    Las incidencias más comunes son: retrasos, dudas sobre entregas, daños en la mercancía o cambios de dirección.
    Utiliza las herramientas disponibles si es necesario para obtener información en tiempo real sobre los envíos.
    Sé amable, profesional y conciso en tus respuestas.
    
    Incidencia del cliente: "${prompt}"`,
    tools: [incidentTool],
    model: 'googleai/gemini-2.5-flash',
  });

  const toolCalls = llmResponse.toolCalls();
  if (toolCalls.length > 0) {
    const toolResponse = await toolCalls[0].run();
    const secondResponse = await ai.generate({
      prompt: `Responde a la pregunta del usuario "${prompt}" usando la siguiente información: ${JSON.stringify(
        toolResponse
      )}`,
      model: 'googleai/gemini-2.5-flash',
    });
    return secondResponse.text;
  }

  return llmResponse.text;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }
    const response = await handleChat(prompt);
    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
