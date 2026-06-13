import type { ThemeId, IntroTone, ActivityId, IntroCard, Language } from '@/types';
import { getDefaultPrompts } from './content';

export interface InvitationPreset {
  id: string;
  nameEn: string;
  nameHe: string;
  theme: ThemeId;
  tone: IntroTone;
  activityIds: ActivityId[];
  getIntroCards: (language: Language) => IntroCard[];
}

export const INVITATION_PRESETS: InvitationPreset[] = [
  {
    id: 'funny-light',
    nameEn: 'Funny and light',
    nameHe: 'קליל ומצחיק',
    theme: 'cruise',
    tone: 'light',
    activityIds: ['coffee', 'sunset-walk', 'drinks'],
    getIntroCards: (language: Language) => {
      const prompts = getDefaultPrompts(language, 'light');
      return prompts.map((prompt) => ({
        id: prompt.id,
        promptKey: prompt.id,
        answer: prompt.answers[0],
      }));
    },
  },
  {
    id: 'first-date',
    nameEn: 'First date',
    nameHe: 'דייט ראשון',
    theme: 'nature',
    tone: 'light',
    activityIds: ['coffee', 'restaurant', 'sunset-walk'],
    getIntroCards: (language: Language) => {
      const prompts = getDefaultPrompts(language, 'light');
      return prompts.map((prompt) => ({
        id: prompt.id,
        promptKey: prompt.id,
        answer: prompt.answers[0],
      }));
    },
  },
  {
    id: 'romantic-evening',
    nameEn: 'Romantic evening',
    nameHe: 'ערב רומנטי',
    theme: 'cruise',
    tone: 'flirty',
    activityIds: ['restaurant', 'sunset-walk', 'drinks'],
    getIntroCards: (language: Language) => {
      const prompts = getDefaultPrompts(language, 'flirty');
      return prompts.map((prompt) => ({
        id: prompt.id,
        promptKey: prompt.id,
        answer: prompt.answers[0],
      }));
    },
  },
  {
    id: 'after-dark',
    nameEn: 'After Dark',
    nameHe: 'אחרי החשכה',
    theme: 'after_dark',
    tone: 'flirty',
    activityIds: ['drinks', 'sunset-walk', 'movie'],
    getIntroCards: (language: Language) => {
      const prompts = getDefaultPrompts(language, 'flirty');
      return prompts.map((prompt) => ({
        id: prompt.id,
        promptKey: prompt.id,
        answer: prompt.answers[0],
      }));
    },
  },
  {
    id: 'surprise-me',
    nameEn: 'Surprise me',
    nameHe: 'תפתיעו אותי',
    theme: 'party',
    tone: 'absurd',
    activityIds: ['surprise-me'],
    getIntroCards: (language: Language) => {
      const prompts = getDefaultPrompts(language, 'absurd');
      return prompts.map((prompt) => ({
        id: prompt.id,
        promptKey: prompt.id,
        answer: prompt.answers[0],
      }));
    },
  },
];

export function getPresetByLanguage(presetId: string, language: Language): string {
  const preset = INVITATION_PRESETS.find((p) => p.id === presetId);
  if (!preset) return '';
  return language === 'he' ? preset.nameHe : preset.nameEn;
}
