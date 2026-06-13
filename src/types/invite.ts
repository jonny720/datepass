export type Language = 'he' | 'en';

export type ThemeId = 'cruise' | 'secret_mission' | 'nature' | 'party' | 'after_dark';

export type IntroTone = 'playful' | 'flirty' | 'absurd';

export interface IntroCard {
  id: string;
  promptKey: string;
  answer: string;
}

export type ActivityId =
  | 'drinks'
  | 'restaurant'
  | 'coffee'
  | 'sunset-walk'
  | 'movie'
  | 'competitive'
  | 'creative'
  | 'surprise-me';

export interface DateSlot {
  id: string;
  date: string;
  time: string;
}

export interface InviteConfig {
  version: 1;
  language: Language;
  senderName: string;
  recipientName: string;
  theme: ThemeId;
  introTone: IntroTone;
  introCards: IntroCard[];
  activityIds: ActivityId[];
  dateSlots: DateSlot[];
  whatsappNumber?: string;
}
