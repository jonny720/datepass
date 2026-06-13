import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Language } from '@/types';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/config/languages';
import { translate, type TranslationKey } from '@/i18n';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  config: typeof LANGUAGES[Language];
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const config = LANGUAGES[language];
    document.documentElement.setAttribute('lang', config.code);
    document.documentElement.setAttribute('dir', config.direction);
  }, [language]);

  const t = useCallback(
    (key: TranslationKey) => translate(language, key),
    [language]
  );

  const value = {
    language,
    setLanguage,
    config: LANGUAGES[language],
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
