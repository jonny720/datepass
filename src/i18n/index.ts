import type { Language } from '@/types';
import type { TranslationKey, Translations } from './types';
import { en } from './en';
import { he } from './he';

export const translations: Translations = {
  en,
  he,
};

export function translate(
  language: Language,
  key: TranslationKey
): string {
  return translations[language][key];
}

export type { TranslationKey, TranslationDictionary } from './types';
