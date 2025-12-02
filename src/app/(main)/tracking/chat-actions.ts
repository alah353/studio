import {ai} from '@/ai/genkit';
import { trackShipment } from '@/ai/flows/real-time-shipment-tracking';
import { z } from 'zod';

const incidentTool = ai.defineTool(
    {
      name: 'incidentTool',
      description: 'Use this tool to get the status of a shipment to answer user questions.',
      inputSchema: z.object({ trackingNumber: z.string() }),
      outputSchema: z.any(),
    },
    async ({ trackingNumber }) => {
        try {
            return await trackShipment({ trackingNumber });
        } catch (e) {
            return {error: 'No se encontró el envío. Por favor, verifica el número de seguimiento.'}
        }
    }
);


export async function handleChat(prompt: string): Promise<string> {

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
        prompt: `Responde a la pregunta del usuario "${prompt}" usando la siguiente información: ${JSON.stringify(toolResponse)}`,
        model: 'googleai/gemini-2.5-flash',
    });
    return secondResponse.text;
  }


  return llmResponse.text;
}
