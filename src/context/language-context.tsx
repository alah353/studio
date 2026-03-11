'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ca' | 'es' | 'en';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  ca: {
    inici: 'Inici',
    sobre_nosaltres: 'Sobre Nosaltres',
    serveis: 'Serveis',
    flota: 'Flota',
    seguiment: 'Seguiment',
    blog: 'Blog',
    contacte: 'Contacte',
    booking: 'Reserves',
    dashboard: 'Panell',
    login: 'Accés',
    tancar_sessio: 'Sortir',
    benvingut: 'Benvingut',
    hola: 'Hola',
    nova_comanda: 'Nova Comanda',
    factures: 'Factures',
    solicitar_servei: 'Sol·licitar Servei',
    seguiment_enviament: 'Seguiment d\'enviament',
    detalls_comanda: 'Detalls de la comanda',
    estat_enviament: 'Estat de l\'enviament',
    // Home Page
    hero_title: 'Horse S.L: El Teu Món, Lliurat.',
    hero_subtitle: "Desbloqueja el potencial del teu negoci amb la nostra logística d'avantguarda. Velocitat, seguretat i abast global al teu servei.",
    hero_cta: 'Desbloqueja el Teu Potencial',
    services_title: 'Els Nostres Serveis',
    services_subtitle: 'Solucions a mida per a cada necessitat logística. Descobreix com podem ajudar-te a moure el teu món.',
    service_land_title: 'Transport Terrestre',
    service_sea_title: 'Transport Marítim',
    service_air_title: 'Transport Aeri',
    service_land_desc: 'Connectem ciutats i països amb una flota moderna i versàtil.',
    service_sea_desc: 'El teu millor aliat per al comerç internacional a gran escala.',
    service_air_desc: "La solució definitiva per a enviaments urgents i d'alt valor.",
    request_service: 'Sol·licitar Servei',
    view_all_services: 'Veure tots els serveis',
    why_choose_us_title: 'Per Què Triar-nos?',
    why_choose_us_subtitle: "Combinem tecnologia de punta, una xarxa global i un equip d'experts per oferir un servei logístic sense igual.",
    feature_speed_title: 'Velocitat i Fiabilitat',
    feature_speed_desc: 'Optimitzem cada ruta per garantir el lliurament més ràpid i segur possible. El teu temps és la nostra prioritat.',
    feature_security_title: 'Seguretat Integral',
    feature_security_desc: 'La teva càrrega està protegida en cada etapa del viatge. Oferim seguiment i monitoratge constants per a la teva tranquil·litat.',
    feature_global_title: 'Cobertura Global',
    feature_global_desc: 'La nostra extensa xarxa de socis ens permet arribar a qualsevol racó del planeta, sense importar la complexitat de la destinació.',
    cta_title: 'Llest per optimitzar la teva logística?',
    cta_subtitle: 'Contacta amb els nostres especialistes i descobreix com Horse S.L. pot transformar la teva cadena de subministrament.',
    cta_button: 'Parla amb un expert',
    dialog_title_request: 'Sol·licitud de Servei',
    dialog_desc_request: 'Com més detall ens faciliti sobre la mercaderia, quantitats, mides i dates, més precisa serà la nostra oferta.',
    // About Page
    about_title: 'La Força que Mou el teu Negoci',
    about_subtitle: 'A Horse S.L., no només transportem mercaderies; impulsem el creixement del teu negoci amb solucions logístiques a mida.',
    about_history_title: 'La Nostra Història',
    about_history_p1: 'Horse S.L. va néixer el 2010 d\'una visió clara: revolucionar el sector logístic a través de la tecnologia i un enfocament centrat en el client.',
    about_mision_title: 'Missió',
    about_mision_desc: 'Oferir solucions logístiques intel·ligents i eficients que impulsin l\'èxit dels nostres clients.',
    about_vision_title: 'Visió',
    about_vision_desc: 'Ser el soci logístic de referència a nivell mundial, reconegut per la nostra innovació i fiabilitat.',
    about_values_title: 'Els Nostres Valors',
    about_team_title: 'El Nostre Equip',
    // Contact Page
    contact_title: 'Contacta amb Nosaltres',
    contact_subtitle: 'Estem llistos per ajudar-te. Contacta amb el nostre equip d\'experts i descobreix com podem optimitzar la teva logística.',
    contact_info_title: 'Informació de Contacte',
    contact_form_title: 'Envia\'ns un Missatge',
    contact_form_desc: 'Omple el formulari i un dels nostres experts es posarà en contacte amb tu al més aviat possible.'
  },
  es: {
    inici: 'Inicio',
    sobre_nosaltres: 'Sobre Nosotros',
    serveis: 'Servicios',
    flota: 'Flota',
    seguiment: 'Seguimiento',
    blog: 'Blog',
    contacte: 'Contacto',
    booking: 'Reservas',
    dashboard: 'Panel',
    login: 'Acceso',
    tancar_sessio: 'Salir',
    benvingut: 'Bienvenido',
    hola: 'Hola',
    nova_comanda: 'Nuevo Pedido',
    factures: 'Facturas',
    solicitar_servei: 'Solicitar Servicio',
    seguiment_enviament: 'Seguimiento de envío',
    detalls_comanda: 'Detalles del pedido',
    estat_enviament: 'Estado del envío',
    // Home Page
    hero_title: 'Horse S.L: Tu Mundo, Entregado.',
    hero_subtitle: 'Desbloquea el potencial de tu negocio con nuestra logística de vanguardia. Velocidad, seguridad y alcance global a tu servicio.',
    hero_cta: 'Desbloquea Tu Potencial',
    services_title: 'Nuestros Servicios',
    services_subtitle: 'Soluciones a medida para cada necesidad logística. Descubre cómo podemos ayudarte a mover tu mundo.',
    service_land_title: 'Transporte Terrestre',
    service_sea_title: 'Transporte Marítimo',
    service_air_title: 'Transporte Aéreo',
    service_land_desc: 'Conectamos ciudades y países con una flota moderna y versátil.',
    service_sea_desc: 'Tu mejor aliado para el comercio internacional a gran escala.',
    service_air_desc: 'La solución definitiva para envíos urgentes y de alto valor.',
    request_service: 'Solicitar Servicio',
    view_all_services: 'Ver todos los servicios',
    why_choose_us_title: '¿Por Qué Elegirnos?',
    why_choose_us_subtitle: 'Combinamos tecnología de punta, una red global y un equipo de expertos para ofrecer un servicio logístico sin igual.',
    feature_speed_title: 'Velocidad y Fiabilidad',
    feature_speed_desc: 'Optimizamos cada ruta para garantizar la entrega más rápida y segura posible. Tu tiempo es nuestra prioridad.',
    feature_security_title: 'Seguridad Integral',
    feature_security_desc: 'Tu carga está protegida en cada etapa del viaje. Ofrecemos seguimiento y monitoreo constantes para tu tranquilidad.',
    feature_global_title: 'Cobertura Global',
    feature_global_desc: 'Nuestra extensa red de socios nos permite llegar a cualquier rincón del planeta, sin importar la complejidad del destino.',
    cta_title: '¿Listo para optimizar tu logística?',
    cta_subtitle: 'Contacta con nuestros especialistas y descubre cómo Horse S.L. puede transformar tu cadena de suministro.',
    cta_button: 'Habla con un experto',
    dialog_title_request: 'Solicitud de Servicio',
    dialog_desc_request: 'Cuanto más detalle nos facilite sobre la mercancía, cantidades, medidas y fechas, más precisa será nuestra oferta.',
    // About Page
    about_title: 'La Fuerza que Mueve tu Negocio',
    about_subtitle: 'En Horse S.L., no solo transportamos mercancías; impulsamos el crecimiento de tu negocio con soluciones logísticas a medida.',
    about_history_title: 'Nuestra Historia',
    about_history_p1: 'Horse S.L. nació en 2010 de una visión clara: revolucionar el sector logístico a través de la tecnología y un enfoque centrado en el cliente.',
    about_mision_title: 'Misión',
    about_mision_desc: 'Ofrecer soluciones logísticas inteligentes y eficientes que impulsen el éxito de nuestros clientes.',
    about_vision_title: 'Visión',
    about_vision_desc: 'Ser el socio logístico de referencia a nivel mundial, reconocido por nuestra innovación y fiabilidad.',
    about_values_title: 'Nuestros Valores',
    about_team_title: 'Nuestro Equipo',
    // Contact Page
    contact_title: 'Contacta con Nosotros',
    contact_subtitle: 'Estamos listos para ayudarte. Contacta con nuestro equipo de expertos y descubre cómo podemos optimizar tu logística.',
    contact_info_title: 'Información de Contacto',
    contact_form_title: 'Envíanos un Mensaje',
    contact_form_desc: 'Rellena el formulario y uno de nuestros expertos se pondrá en contacto contigo a la mayor brevedad.'
  },
  en: {
    inici: 'Home',
    sobre_nosaltres: 'About Us',
    serveis: 'Services',
    flota: 'Fleet',
    seguiment: 'Tracking',
    blog: 'Blog',
    contacte: 'Contact',
    booking: 'Booking',
    dashboard: 'Dashboard',
    login: 'Login',
    tancar_sessio: 'Logout',
    benvingut: 'Welcome',
    hola: 'Hello',
    nova_comanda: 'New Order',
    factures: 'Invoices',
    solicitar_servei: 'Request Service',
    seguiment_enviament: 'Shipment Tracking',
    detalls_comanda: 'Order details',
    estat_enviament: 'Shipment status',
    // Home Page
    hero_title: 'Horse S.L: Your World, Delivered.',
    hero_subtitle: 'Unlock the potential of your business with our cutting-edge logistics. Speed, security and global reach at your service.',
    hero_cta: 'Unleash Your Potential',
    services_title: 'Our Services',
    services_subtitle: 'Tailor-made solutions for every logistical need. Discover how we can help you move your world.',
    service_land_title: 'Land Transport',
    service_sea_title: 'Sea Transport',
    service_air_title: 'Air Transport',
    service_land_desc: 'We connect cities and countries with a modern and versatile fleet.',
    service_sea_desc: 'Your best ally for large-scale international trade.',
    service_air_desc: 'The definitive solution for urgent and high-value shipments.',
    request_service: 'Request Service',
    view_all_services: 'View all services',
    why_choose_us_title: 'Why Choose Us?',
    why_choose_us_subtitle: 'We combine cutting-edge technology, a global network and a team of experts to offer an unparalleled logistics service.',
    feature_speed_title: 'Speed and Reliability',
    feature_speed_desc: 'We optimize every route to guarantee the fastest and safest delivery possible. Your time is our priority.',
    feature_security_title: 'Comprehensive Security',
    feature_security_desc: 'Your cargo is protected at every stage of the journey. We offer constant tracking and monitoring for your peace of mind.',
    feature_global_title: 'Global Coverage',
    feature_global_desc: 'Our extensive network of partners allows us to reach any corner of the planet, regardless of the destination\'s complexity.',
    cta_title: 'Ready to optimize your logistics?',
    cta_subtitle: 'Contact our specialists and discover how Horse S.L. can transform your supply chain.',
    cta_button: 'Talk to an expert',
    dialog_title_request: 'Service Request',
    dialog_desc_request: 'The more detail you provide about the goods, quantities, measurements and dates, the more accurate our offer will be.',
    // About Page
    about_title: 'The Force that Moves your Business',
    about_subtitle: 'At Horse S.L., we don\'t just transport goods; we drive the growth of your business with tailor-made logistics solutions.',
    about_history_title: 'Our History',
    about_history_p1: 'Horse S.L. was born in 2010 from a clear vision: to revolutionize the logistics sector through technology and a client-centered approach.',
    about_mision_title: 'Mission',
    about_mision_desc: 'To offer smart and efficient logistics solutions that drive the success of our clients.',
    about_vision_title: 'Vision',
    about_vision_desc: 'To be the reference logistics partner worldwide, recognized for our innovation and reliability.',
    about_values_title: 'Our Values',
    about_team_title: 'Our Team',
    // Contact Page
    contact_title: 'Contact Us',
    contact_subtitle: 'We are ready to help. Contact our team of experts and discover how we can optimize your logistics.',
    contact_info_title: 'Contact Information',
    contact_form_title: 'Send us a Message',
    contact_form_desc: 'Fill out the form and one of our experts will get in touch with you as soon as possible.'
  }
};

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ca');

  useEffect(() => {
    const savedLang = localStorage.getItem('horse_lang') as Language;
    if (savedLang && (savedLang === 'ca' || savedLang === 'en' || savedLang === 'es')) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('horse_lang', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
