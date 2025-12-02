'use server';

import { trackShipment } from '@/ai/flows/real-time-shipment-tracking';
import { NextResponse } from 'next/server';

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
      data = await trackShipment({ trackingNumber });
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
