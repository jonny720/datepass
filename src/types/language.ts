import type { Language } from './invite';

export type Direction = 'ltr' | 'rtl';

export interface LanguageConfig {
  code: Language;
  direction: Direction;
  name: string;
}

export type { Language };
