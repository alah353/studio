'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ca' | 'en';

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
    // Home Page Translations
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
    dialog_desc_request: 'Com més detall ens faciliti sobre la mercaderia, quantitats, mides i dates, més precisa serà la nostra oferta.'
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
    // Home Page Translations
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
    dialog_desc_request: 'The more detail you provide about the goods, quantities, measurements and dates, the more accurate our offer will be.'
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('horse_lang') as Language;
    if (savedLang && (savedLang === 'ca' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
    setMounted(true);
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
