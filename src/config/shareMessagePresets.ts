import type { Language } from '@/types';

export interface ShareMessagePreset {
  id: string;
  message: {
    en: string;
    he: string;
  };
}

export const SHARE_MESSAGE_PRESETS: ShareMessagePreset[] = [
  {
    id: 'preset_1',
    message: {
      en: 'I made something small for you 🙂',
      he: 'יש לי משהו קטן בשבילך 🙂',
    },
  },
  {
    id: 'preset_2',
    message: {
      en: 'I thought asking you out on WhatsApp was too boring.',
      he: 'חשבתי שלהציע לך לצאת בוואטסאפ זה קצת משעמם מדי.',
    },
  },
  {
    id: 'preset_3',
    message: {
      en: 'I invested way too much effort into a simple question.',
      he: 'השקעתי יותר מדי בשביל שאלה די פשוטה.',
    },
  },
];

export function getShareMessagePreset(presetId: string, language: Language): string {
  const preset = SHARE_MESSAGE_PRESETS.find((p) => p.id === presetId);
  return preset ? preset.message[language] : SHARE_MESSAGE_PRESETS[0].message[language];
}
