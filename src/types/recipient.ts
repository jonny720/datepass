import type { ActivityId, DateSlot } from './invite';

export interface RecipientResponse {
  step: number;
  wantsDate: boolean | null;
  selectedActivity: ActivityId | null;
  selectedSlot: DateSlot | null;
  prefersWhatsappCoordination: boolean;
}

export const INITIAL_RESPONSE: RecipientResponse = {
  step: 1,
  wantsDate: null,
  selectedActivity: null,
  selectedSlot: null,
  prefersWhatsappCoordination: false,
};

export const RECIPIENT_STEPS = {
  ARRIVAL: 1,
  INTRO_CARDS: 2,
  MAIN_QUESTION: 3,
  ACTIVITY_CHOICE: 4,
  SLOT_CHOICE: 5,
  CONFIRMATION: 6,
} as const;
