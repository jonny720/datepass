import type { Language, InviteType, ThemeId, IntroTone, IntroCard, ActivityId, DateSlot, YesButtonCopy, RecipientGender } from './invite';

export interface CreatorDraft {
  step: number;
  inviteType: InviteType;
  language: Language;
  senderName: string;
  recipientName: string;
  recipientGender: RecipientGender;
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
  inviteType: 'date',
  language: 'en',
  senderName: '',
  recipientName: '',
  recipientGender: 'private',
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

export const TOTAL_STEPS = 9;
