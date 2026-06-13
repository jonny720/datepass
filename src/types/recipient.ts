import type { ActivityId, DateSlot } from './invite';

export type ArrivalPreference = 'pickup' | 'self';
export type RecipientGender = 'male' | 'female' | 'private';

export interface RecipientResponse {
  step: number;
  recipientGender: RecipientGender | null;
  wantsDate: boolean | null;
  arrivalPreference: ArrivalPreference | null;
  selectedActivity: ActivityId | null;
  selectedSlot: DateSlot | null;
  prefersWhatsappCoordination: boolean;
  personalNote: string;
  foundEasterEgg: boolean;
  foundStamp: boolean;
  foundDuck: boolean;
}

export const INITIAL_RESPONSE: RecipientResponse = {
  step: 1,
  recipientGender: null,
  wantsDate: null,
  arrivalPreference: null,
  selectedActivity: null,
  selectedSlot: null,
  prefersWhatsappCoordination: false,
  personalNote: '',
  foundEasterEgg: false,
  foundStamp: false,
  foundDuck: false,
};

export const RECIPIENT_STEPS = {
  ARRIVAL: 1,
  GENDER: 2,
  INTRO_CARDS: 3,
  MAIN_QUESTION: 4,
  ARRIVAL_PREFERENCE: 5,
  ACTIVITY_CHOICE: 6,
  SLOT_CHOICE: 7,
  CONFIRMATION: 8,
} as const;
