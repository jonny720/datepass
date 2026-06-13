import type { Language, ThemeId, IntroTone, IntroCard, ActivityId, DateSlot } from './invite';

export interface CreatorDraft {
  step: number;
  language: Language;
  senderName: string;
  recipientName: string;
  theme: ThemeId;
  introTone: IntroTone;
  introCards: IntroCard[];
  activityIds: ActivityId[];
  dateSlots: DateSlot[];
  selectedCountryIso2: string;
  localPhoneNumber: string;
}

export const INITIAL_DRAFT: CreatorDraft = {
  step: 1,
  language: 'en',
  senderName: '',
  recipientName: '',
  theme: 'cruise',
  introTone: 'playful',
  introCards: [],
  activityIds: [],
  dateSlots: [],
  selectedCountryIso2: 'IL',
  localPhoneNumber: '',
};

export const TOTAL_STEPS = 8;
