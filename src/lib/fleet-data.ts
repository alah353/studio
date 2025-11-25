export type FleetVehicle = {
    id: string;
    type: 'truck' | 'ship' | 'plane';
    name: string;
    model: string;
    imageId: string;
    specs: {
        capacity: string;
        range: string;
    };
    status: 'Operativo' | 'En Mantenimiento' | 'En Ruta';
    currentRoute: string;
    history: { date: string; event: string }[];
};

export const fleetData: FleetVehicle[] = [
    {
        id: 'truck-001',
        type: 'truck',
        name: 'Hércules 01',
        model: 'Volvo FH Electric',
        imageId: 'fleet-truck-1',
        specs: { capacity: '44 Toneladas', range: '300 km por carga' },
        status: 'Operativo',
        currentRoute: 'Patio de Maniobras (Tarragona)',
        history: [{ date: '2024-06-10', event: 'Mantenimiento completo' }]
    },
    {
        id: 'truck-002',
        type: 'truck',
        name: 'Centauro 05',
        model: 'Scania R 450',
        imageId: 'fleet-truck-2',
        specs: { capacity: '40 Toneladas', range: '2,500 km' },
        status: 'En Ruta',
        currentRoute: 'Tarragona -> Lyon',
        history: [{ date: '2024-05-20', event: 'Revisión de neumáticos' }]
    },
    {
        id: 'truck-003',
        type: 'truck',
        name: 'Titán 03',
        model: 'Mercedes-Benz Actros L',
        imageId: 'fleet-truck-3',
        specs: { capacity: '42 Toneladas', range: '2,800 km' },
        status: 'Operativo',
        currentRoute: 'Patio de Maniobras (Tarragona)',
        history: [{ date: '2024-06-15', event: 'Inspección de motor' }]
    },
    {
        id: 'ship-001',
        type: 'ship',
        name: 'Poseidón',
        model: 'Triple-E Class',
        imageId: 'fleet-ship-1',
        specs: { capacity: '18,270 TEU', range: 'Global' },
        status: 'En Ruta',
        currentRoute: 'Algeciras -> Shanghai',
        history: [{ date: '2024-04-01', event: 'Inspección en dique seco' }]
    },
    {
        id: 'ship-002',
        type: 'ship',
        name: 'Leviatán',
        model: 'Evergreen A-Class',
        imageId: 'fleet-ship-2',
        specs: { capacity: '23,992 TEU', range: 'Global' },
        status: 'Operativo',
        currentRoute: 'Puerto de Valencia',
        history: [{ date: '2024-05-05', event: 'Actualización de sistemas de navegación' }]
    },
    {
        id: 'plane-001',
        type: 'plane',
        name: 'Ícaro 777',
        model: 'Boeing 777F',
        imageId: 'fleet-plane-1',
        specs: { capacity: '102 Toneladas', range: '9,070 km' },
        status: 'En Ruta',
        currentRoute: 'Madrid -> Ciudad de México',
        history: [{ date: '2024-06-18', event: 'Mantenimiento de motores' }]
    }
];
