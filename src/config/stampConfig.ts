import type { HumorLevel, ThemeId, Language } from '@/types';
import { STAMP_MESSAGES_BY_HUMOR, pickHumorMessage, resolveHumorLevel } from './humorCopy';

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
  temptation: {
    label: {
      en: '18+\nONLY',
      he: '18+\nבלבד',
    },
    rotation: -10,
    color: 'text-pink-700',
    borderColor: 'border-pink-700',
  },
  'black-tie': {
    label: { en: 'EVENING\nAPPROVED', he: 'הערב\nאושר' },
    rotation: -7,
    color: 'text-yellow-700',
    borderColor: 'border-yellow-700',
  },
  'power-play': {
    label: { en: 'TERMS\nACCEPTED', he: 'תנאים\nאושרו' },
    rotation: -8,
    color: 'text-red-700',
    borderColor: 'border-red-700',
  },
  generic: {
    label: { en: 'PLAN\nPASS', he: 'אישור\nתוכנית' },
    rotation: -9,
    color: 'text-sky-700',
    borderColor: 'border-sky-700',
  },
  stadium: {
    label: { en: 'MATCH\nDAY', he: 'יום\nמשחק' },
    rotation: 9,
    color: 'text-green-700',
    borderColor: 'border-green-700',
  },
  concert: {
    label: { en: 'LIVE\nPASS', he: 'כניסה\nחיה' },
    rotation: -7,
    color: 'text-fuchsia-700',
    borderColor: 'border-fuchsia-700',
  },
  theater: {
    label: { en: 'CURTAIN\nREADY', he: 'מסך\nמוכן' },
    rotation: 7,
    color: 'text-rose-700',
    borderColor: 'border-rose-700',
  },
  hotel: {
    label: { en: 'KEYCARD\nOK', he: 'כרטיס\nחדר' },
    rotation: -6,
    color: 'text-amber-700',
    borderColor: 'border-amber-700',
  },
  flight: {
    label: { en: 'BOARDING\nPASS', he: 'כרטיס\nעלייה' },
    rotation: 8,
    color: 'text-blue-700',
    borderColor: 'border-blue-700',
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

export function getRandomStampMessage(language: Language, humorLevel?: HumorLevel): string {
  const resolvedHumorLevel = resolveHumorLevel(humorLevel);
  return pickHumorMessage(STAMP_MESSAGES_BY_HUMOR[resolvedHumorLevel], language);
}
