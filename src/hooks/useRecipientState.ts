import { useState, useCallback } from 'react';
import type { RecipientResponse, ActivityId, DateSlot, InviteConfig } from '@/types';
import { INITIAL_RESPONSE, RECIPIENT_STEPS } from '@/types';

export function useRecipientState(config: InviteConfig) {
  const [response, setResponse] = useState<RecipientResponse>(INITIAL_RESPONSE);

  // Check if intro cards should be shown
  const hasValidIntroCards = config.introCards.some(
    card => card.answer && card.answer.trim()
  );

  const updateResponse = useCallback((updates: Partial<RecipientResponse>) => {
    setResponse((prev) => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setResponse((prev) => {
      let nextStep = prev.step + 1;

      // Skip intro cards if no valid cards exist
      if (nextStep === RECIPIENT_STEPS.INTRO_CARDS && !hasValidIntroCards) {
        nextStep = RECIPIENT_STEPS.MAIN_QUESTION;
      }

      // Skip slot choice if no slots exist
      if (nextStep === RECIPIENT_STEPS.SLOT_CHOICE && config.dateSlots.length === 0) {
        nextStep = RECIPIENT_STEPS.CONFIRMATION;
      }

      return { ...prev, step: nextStep };
    });
  }, [config.dateSlots.length, hasValidIntroCards]);

  const prevStep = useCallback(() => {
    setResponse((prev) => {
      let prevStep = prev.step - 1;

      // Skip intro cards if no valid cards exist
      if (prevStep === RECIPIENT_STEPS.INTRO_CARDS && !hasValidIntroCards) {
        prevStep = RECIPIENT_STEPS.ARRIVAL;
      }

      // Skip slot choice if no slots exist
      if (prevStep === RECIPIENT_STEPS.SLOT_CHOICE && config.dateSlots.length === 0) {
        prevStep = RECIPIENT_STEPS.ACTIVITY_CHOICE;
      }

      return { ...prev, step: prevStep };
    });
  }, [config.dateSlots.length, hasValidIntroCards]);

  const setWantsDate = useCallback((wants: boolean) => {
    setResponse((prev) => ({ ...prev, wantsDate: wants }));
  }, []);

  const setSelectedActivity = useCallback((activity: ActivityId) => {
    setResponse((prev) => ({ ...prev, selectedActivity: activity }));
  }, []);

  const setSelectedSlot = useCallback((slot: DateSlot | null) => {
    setResponse((prev) => ({ ...prev, selectedSlot: slot }));
  }, []);

  const setPrefersWhatsappCoordination = useCallback((prefers: boolean) => {
    setResponse((prev) => ({ ...prev, prefersWhatsappCoordination: prefers }));
  }, []);

  const setFoundEasterEgg = useCallback((found: boolean) => {
    setResponse((prev) => ({ ...prev, foundEasterEgg: found }));
  }, []);

  return {
    response,
    setResponse,
    updateResponse,
    nextStep,
    prevStep,
    setWantsDate,
    setSelectedActivity,
    setSelectedSlot,
    setPrefersWhatsappCoordination,
    setFoundEasterEgg,
  };
}
