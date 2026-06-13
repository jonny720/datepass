import type { ActivityId, DateSlot, RecipientGender } from './invite';

export type ArrivalPreference = 'pickup' | 'self';

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
  recipientGender: 'female',
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
  INTRO_CARDS: 2,
  MAIN_QUESTION: 3,
  ARRIVAL_PREFERENCE: 4,
  ACTIVITY_CHOICE: 5,
  SLOT_CHOICE: 6,
  CONFIRMATION: 7,
} as const;
