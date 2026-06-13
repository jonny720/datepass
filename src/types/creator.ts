import type { Language, ThemeId, IntroTone, IntroCard, ActivityId, DateSlot, YesButtonCopy } from './invite';

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
  openingMessage?: string;
  yesButtonCopy?: YesButtonCopy;
}

export const INITIAL_DRAFT: CreatorDraft = {
  step: 1,
  language: 'en',
  senderName: '',
  recipientName: '',
  theme: 'cruise',
  introTone: 'light',
  introCards: [],
  activityIds: [],
  dateSlots: [],
  selectedCountryIso2: 'IL',
  localPhoneNumber: '',
  openingMessage: '',
  yesButtonCopy: 'yes_lets_do',
};

export const TOTAL_STEPS = 8;
