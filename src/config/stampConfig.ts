import type { ThemeId, Language } from '@/types';

interface StampMessage {
  en: string;
  he: string;
}

export interface StampConfig {
  label: {
    en: string;
    he: string;
  };
  rotation: number;
  color: string;
  borderColor: string;
}

export const THEME_STAMPS: Record<ThemeId, StampConfig> = {
  cruise: {
    label: {
      en: 'BOARDING\nCHECKED',
      he: 'עלייה\nלספינה',
    },
    rotation: -12,
    color: 'text-blue-700',
    borderColor: 'border-blue-700',
  },
  secret_mission: {
    label: {
      en: 'CLASSIFIED',
      he: 'סודי',
    },
    rotation: 8,
    color: 'text-red-700',
    borderColor: 'border-red-700',
  },
  nature: {
    label: {
      en: '🍃\nAPPROVED',
      he: '🍃\nמאושר',
    },
    rotation: -15,
    color: 'text-green-700',
    borderColor: 'border-green-700',
  },
  party: {
    label: {
      en: 'VIP-ish',
      he: 'VIP-ish',
    },
    rotation: 10,
    color: 'text-purple-700',
    borderColor: 'border-purple-700',
  },
  after_dark: {
    label: {
      en: 'AFTER\nHOURS',
      he: 'אחרי\nשעות',
    },
    rotation: -8,
    color: 'text-indigo-700',
    borderColor: 'border-indigo-700',
  },
};

export const STAMP_MESSAGES: StampMessage[] = [
  {
    en: 'Approved by a highly questionable committee.',
    he: 'אושר על ידי ועדה מפוקפקת במיוחד.',
  },
  {
    en: 'Official enough.',
    he: 'רשמי מספיק.',
  },
  {
    en: 'This stamp has no legal value.',
    he: 'לחותמת הזאת אין שום תוקף משפטי.',
  },
];

export function getRandomStampMessage(language: Language): string {
  const message = STAMP_MESSAGES[Math.floor(Math.random() * STAMP_MESSAGES.length)];
  return message[language];
}
