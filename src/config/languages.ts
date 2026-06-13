import type { Language, LanguageConfig } from '@/types/language';

export const LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    direction: 'ltr',
    name: 'English',
  },
  he: {
    code: 'he',
    direction: 'rtl',
    name: 'עברית',
  },
};

export const DEFAULT_LANGUAGE: Language = 'en';
