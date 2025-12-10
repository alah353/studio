export type FleetVehicle = {
    id: string;
    type: 'truck' | 'ship' | 'plane';
    name: string;
    model: string;
    imageId: string;
    imageUrl: string;
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
        name: 'NAC-101',
        model: 'Volvo FH Electric',
        imageId: 'fleet-truck-1',
        imageUrl: 'https://images.unsplash.com/photo-1591419478162-a4dd21b7ec0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxlbGVjdHJpYyUyMHRydWNrfGVufDB8fHx8MTc2NDA1NTM4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        specs: { capacity: '44 Toneladas', range: '300 km por carga' },
        status: 'Operativo',
        currentRoute: 'Patio de Maniobras (Tarragona)',
        history: [{ date: '2024-06-10', event: 'Mantenimiento completo' }]
    },
    {
        id: 'truck-002',
        type: 'truck',
        name: 'NAC-102',
        model: 'Scania R 450',
        imageId: 'fleet-truck-2',
        imageUrl: 'https://images.unsplash.com/photo-1720811559337-c59b75acc4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzZW1pJTIwdHJ1Y2t8ZW58MHx8fHwxNzY0MDg0OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        specs: { capacity: '40 Toneladas', range: '2,500 km' },
        status: 'En Ruta',
        currentRoute: 'Tarragona -> Lyon',
        history: [{ date: '2024-05-20', event: 'Revisión de neumáticos' }]
    },
    {
        id: 'truck-003',
        type: 'truck',
        name: 'NAC-103',
        model: 'Mercedes-Benz Actros L',
        imageId: 'fleet-truck-3',
        imageUrl: '/mercedes.jpg',
        specs: { capacity: '42 Toneladas', range: '2,800 km' },
        status: 'Operativo',
        currentRoute: 'Patio de Maniobras (Tarragona)',
        history: [{ date: '2024-06-15', event: 'Inspección de motor' }]
    },
    {
        id: 'ship-001',
        type: 'ship',
        name: 'GLO-201',
        model: 'Triple-E Class',
        imageId: 'fleet-ship-1',
        imageUrl: 'https://images.unsplash.com/photo-1573014089159-8ee711dc5a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjb250YWluZXIlMjBzaGlwfGVufDB8fHx8MTc2Mzk5ODY4MXww&ixlib=rb-4.1.0&q=80&w=1080',
        specs: { capacity: '18,270 TEU', range: 'Global' },
        status: 'En Ruta',
        currentRoute: 'Algeciras -> Shanghai',
        history: [{ date: '2024-04-01', event: 'Inspección en dique seco' }]
    },
    {
        id: 'ship-002',
        type: 'ship',
        name: 'GLO-202',
        model: 'Evergreen A-Class',
        imageId: 'fleet-ship-2',
        imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjYXJnbyUyMHBvcnR8ZW58MHx8fHwxNzY0MDgwMDg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        specs: { capacity: '23,992 TEU', range: 'Global' },
        status: 'Operativo',
        currentRoute: 'Puerto de Valencia',
        history: [{ date: '2024-05-05', event: 'Actualización de sistemas de navegación' }]
    },
    {
        id: 'plane-001',
        type: 'plane',
        name: 'AIR-301',
        model: 'Boeing 777F',
        imageId: 'fleet-plane-1',
        imageUrl: 'https://images.unsplash.com/photo-1676926683400-4bdb6790a504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjYXJnbyUyMGFpcnBsYW5lfGVufDB8fHx8MTc2NDA4NTgyMXww&ixlib-rb-4.1.0&q=80&w=1080',
        specs: { capacity: '102 Toneladas', range: '9,070 km' },
        status: 'En Ruta',
        currentRoute: 'Madrid -> Ciudad de México',
        history: [{ date: '2024-06-18', event: 'Mantenimiento de motores' }]
    }
];
