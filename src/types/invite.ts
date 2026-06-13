export type Language = 'he' | 'en';

export type InviteType = 'date' | 'birthday' | 'friends-night';
export type RecipientGender = 'male' | 'female' | 'private';

export type ThemeId = 'cruise' | 'secret_mission' | 'nature' | 'party' | 'after_dark';

export type IntroTone = 'light' | 'flirty' | 'absurd' | 'romantic' | 'bold' | 'dry';

export type YesButtonCopy =
  | 'yes_lets_do'
  | 'im_in'
  | 'you_convinced'
  | 'okay_worked'
  | 'fine_cute'
  | 'im_coming'
  | 'wouldnt_miss_it'
  | 'count_me_in'
  | 'obviously_yes'
  | 'say_less'
  | 'obviously'
  | 'dangerous_im_in';

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
  | 'cake'
  | 'food'
  | 'music'
  | 'games'
  | 'playstation'
  | 'board-games'
  | 'pizza'
  | 'bbq'
  | 'karaoke'
  | 'surprise-me';

export interface DateSlot {
  id: string;
  date: string;
  time: string;
}

export interface InviteConfig {
  version: 1;
  inviteType?: InviteType;
  language: Language;
  senderName: string;
  recipientName: string;
  recipientGender?: RecipientGender;
  theme: ThemeId;
  introTone: IntroTone;
  introCards: IntroCard[];
  activityIds: ActivityId[];
  dateSlots: DateSlot[];
  whatsappNumber?: string;
  openingMessage?: string;
  yesButtonCopy?: YesButtonCopy;
}
