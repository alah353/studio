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

  // We must ALWAYS render the Provider to avoid context errors in client components during SSR.
  // We handle the mount-specific logic internally or let components re-render after hydration.
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
