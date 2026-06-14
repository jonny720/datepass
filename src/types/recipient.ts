import type { ActivityId, DateSlot, RecipientGender } from './invite';

export type ArrivalPreference = 'pickup' | 'self';

export interface RecipientResponse {
  step: number;
  recipientGender: RecipientGender | null;
  wantsDate: boolean | null;
  arrivalPreference: ArrivalPreference | null;
  selectedActivity: ActivityId | null;
  selectedCustomOption: string | null;
  selectedSlot: DateSlot | null;
  rideAnswer: string | null;
  spontaneityAnswer: string | null;
  boundariesAnswer: string | null;
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
  selectedCustomOption: null,
  selectedSlot: null,
  rideAnswer: null,
  spontaneityAnswer: null,
  boundariesAnswer: null,
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
  ADVANCED_DETAILS: 7,
  BOUNDARIES: 8,
  CONFIRMATION: 9,
} as const;
