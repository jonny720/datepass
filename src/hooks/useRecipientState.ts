import { useState, useCallback } from 'react';
import type { RecipientResponse, ActivityId, DateSlot, InviteConfig, ArrivalPreference } from '@/types';
import { INITIAL_RESPONSE, RECIPIENT_STEPS } from '@/types';

export function useRecipientState(config: InviteConfig) {
  const [response, setResponse] = useState<RecipientResponse>({
    ...INITIAL_RESPONSE,
    recipientGender: config.recipientGender || 'female',
  });

  // Check if intro cards should be shown
  const hasValidIntroCards = config.introCards.some(
    card => card.answer && card.answer.trim()
  );
  const hasAdvancedDetails = !!(
    config.advancedSettings?.askForRide ||
    config.advancedSettings?.askSpontaneityLevel
  );
  const hasPowerPlayBoundaries = config.theme === 'power-play';
  const isCustomInvite = config.inviteType === 'custom';

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

      if (nextStep === RECIPIENT_STEPS.ACTIVITY_CHOICE && isCustomInvite) {
        nextStep = RECIPIENT_STEPS.SLOT_CHOICE;
      }

      // Skip slot choice if no slots exist
      if (nextStep === RECIPIENT_STEPS.SLOT_CHOICE && config.dateSlots.length === 0) {
        nextStep = RECIPIENT_STEPS.ADVANCED_DETAILS;
      }

      if (nextStep === RECIPIENT_STEPS.ADVANCED_DETAILS && !hasAdvancedDetails) {
        nextStep = hasPowerPlayBoundaries
          ? RECIPIENT_STEPS.BOUNDARIES
          : RECIPIENT_STEPS.CONFIRMATION;
      }

      if (nextStep === RECIPIENT_STEPS.BOUNDARIES && !hasPowerPlayBoundaries) {
        nextStep = RECIPIENT_STEPS.CONFIRMATION;
      }

      return { ...prev, step: nextStep };
    });
  }, [config.dateSlots.length, hasAdvancedDetails, hasPowerPlayBoundaries, hasValidIntroCards, isCustomInvite]);

  const prevStep = useCallback(() => {
    setResponse((prev) => {
      let prevStep = prev.step - 1;

      // Skip intro cards if no valid cards exist
      if (prevStep === RECIPIENT_STEPS.INTRO_CARDS && !hasValidIntroCards) {
        prevStep = RECIPIENT_STEPS.ARRIVAL;
      }

      if (prevStep === RECIPIENT_STEPS.ACTIVITY_CHOICE && isCustomInvite) {
        prevStep = RECIPIENT_STEPS.ARRIVAL_PREFERENCE;
      }

      // Skip slot choice if no slots exist
      if (prevStep === RECIPIENT_STEPS.SLOT_CHOICE && config.dateSlots.length === 0) {
        prevStep = RECIPIENT_STEPS.ACTIVITY_CHOICE;
      }

      if (prevStep === RECIPIENT_STEPS.ADVANCED_DETAILS && !hasAdvancedDetails) {
        prevStep = config.dateSlots.length === 0
          ? RECIPIENT_STEPS.ACTIVITY_CHOICE
          : RECIPIENT_STEPS.SLOT_CHOICE;
      }

      if (prevStep === RECIPIENT_STEPS.BOUNDARIES && !hasPowerPlayBoundaries) {
        prevStep = hasAdvancedDetails
          ? RECIPIENT_STEPS.ADVANCED_DETAILS
          : config.dateSlots.length === 0
            ? RECIPIENT_STEPS.ACTIVITY_CHOICE
            : RECIPIENT_STEPS.SLOT_CHOICE;
      }

      return { ...prev, step: prevStep };
    });
  }, [config.dateSlots.length, hasAdvancedDetails, hasPowerPlayBoundaries, hasValidIntroCards, isCustomInvite]);

  const setWantsDate = useCallback((wants: boolean | null) => {
    setResponse((prev) => ({ ...prev, wantsDate: wants }));
  }, []);

  const setSelectedActivity = useCallback((activity: ActivityId) => {
    setResponse((prev) => ({ ...prev, selectedActivity: activity }));
  }, []);

  const setArrivalPreference = useCallback((arrivalPreference: ArrivalPreference) => {
    setResponse((prev) => ({ ...prev, arrivalPreference }));
  }, []);

  const setSelectedSlot = useCallback((slot: DateSlot | null) => {
    setResponse((prev) => ({ ...prev, selectedSlot: slot }));
  }, []);

  const setPrefersWhatsappCoordination = useCallback((prefers: boolean) => {
    setResponse((prev) => ({ ...prev, prefersWhatsappCoordination: prefers }));
  }, []);

  const setAdvancedAnswers = useCallback((updates: Pick<RecipientResponse, 'rideAnswer' | 'spontaneityAnswer'>) => {
    setResponse((prev) => ({ ...prev, ...updates }));
  }, []);

  const setBoundariesAnswer = useCallback((boundariesAnswer: string) => {
    setResponse((prev) => ({ ...prev, boundariesAnswer }));
  }, []);

  const setFoundEasterEgg = useCallback((found: boolean) => {
    setResponse((prev) => ({ ...prev, foundEasterEgg: found }));
  }, []);

  const setFoundStamp = useCallback((found: boolean) => {
    setResponse((prev) => ({ ...prev, foundStamp: found }));
  }, []);

  const setFoundDuck = useCallback((found: boolean) => {
    setResponse((prev) => ({ ...prev, foundDuck: found }));
  }, []);

  return {
    response,
    setResponse,
    updateResponse,
    nextStep,
    prevStep,
    setWantsDate,
    setArrivalPreference,
    setSelectedActivity,
    setSelectedSlot,
    setPrefersWhatsappCoordination,
    setAdvancedAnswers,
    setBoundariesAnswer,
    setFoundEasterEgg,
    setFoundStamp,
    setFoundDuck,
  };
}
