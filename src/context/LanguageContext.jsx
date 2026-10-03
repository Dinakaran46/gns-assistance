import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('gns_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('gns_lang', lang);
  }, [lang]);

  const t = (path) => {
    const keys = path.split('.');
    let current = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = TRANSLATIONS['en'];
        for (const k of keys) {
          if (fallback && fallback[k] !== undefined) fallback = fallback[k];
          else return path;
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
