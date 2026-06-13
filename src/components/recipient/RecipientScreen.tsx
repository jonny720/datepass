import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { useLanguage } from '@/hooks/useLanguage';
import { useRecipientState } from '@/hooks/useRecipientState';
import { useEasterEggState } from '@/hooks/useEasterEggState';
import type { InviteConfig, RecipientGender } from '@/types';
import { RECIPIENT_STEPS } from '@/types';
import {
  ArrivalScreen,
  GenderChoiceScreen,
  IntroCardsScreen,
  MainQuestionScreen,
  ArrivalPreferenceScreen,
  ActivityChoiceScreen,
  SlotChoiceScreen,
  ConfirmationScreen,
  DeclineScreen,
} from './screens';

interface RecipientScreenProps {
  config: InviteConfig;
}

export function RecipientScreen({ config }: RecipientScreenProps) {
  const { navigate } = useNavigation();
  const { setLanguage } = useLanguage();
  const {
    response,
    setResponse,
    nextStep,
    setRecipientGender,
    setWantsDate,
    setArrivalPreference,
    setSelectedActivity,
    setSelectedSlot,
    setPrefersWhatsappCoordination,
    setFoundEasterEgg,
    setFoundStamp,
    setFoundDuck,
  } = useRecipientState(config);
  const easterEggState = useEasterEggState({
    onFound: () => setFoundEasterEgg(true),
  });
  const stampState = useEasterEggState({
    onFound: () => setFoundStamp(true),
  });
  const duckState = useEasterEggState({
    onFound: () => setFoundDuck(true),
  });

  useEffect(() => {
    setLanguage(config.language);
  }, [config.language, setLanguage]);

  const handleYes = () => {
    setWantsDate(true);
    nextStep();
  };

  const handleNo = () => {
    setWantsDate(false);
    // Show decline screen
    setResponse((prev) => ({ ...prev, step: -1 }));
  };

  const handleDecline = () => {
    setWantsDate(false);
    // Show decline screen immediately
    setResponse((prev) => ({ ...prev, step: -1 }));
  };

  const handleRegretDecline = () => {
    setWantsDate(null);
    setResponse((prev) => ({ ...prev, step: RECIPIENT_STEPS.MAIN_QUESTION }));
  };

  const handleGenderSelect = (gender: RecipientGender) => {
    setRecipientGender(gender);
    nextStep();
  };

  const handleActivitySelect = (activity: typeof config.activityIds[number]) => {
    setSelectedActivity(activity);
    nextStep();
  };

  const handleArrivalPreferenceSelect = (preference: 'pickup' | 'self') => {
    setArrivalPreference(preference);
    nextStep();
  };

  const handleSlotSelect = (slot: typeof config.dateSlots[number]) => {
    setSelectedSlot(slot);
    setPrefersWhatsappCoordination(false);
    nextStep();
  };

  const handleWhatsappCoordinate = () => {
    setSelectedSlot(null);
    setPrefersWhatsappCoordination(true);
    nextStep();
  };

  const handleCreateOwn = () => {
    navigate({ type: 'landing' });
  };

  const renderStep = () => {
    switch (response.step) {
      case RECIPIENT_STEPS.ARRIVAL:
        return <ArrivalScreen config={config} onNext={nextStep} easterEggState={easterEggState} stampState={stampState} />;

      case RECIPIENT_STEPS.GENDER:
        return <GenderChoiceScreen onSelect={handleGenderSelect} />;

      case RECIPIENT_STEPS.INTRO_CARDS:
        return <IntroCardsScreen config={config} onNext={nextStep} easterEggState={easterEggState} duckState={duckState} />;

      case RECIPIENT_STEPS.MAIN_QUESTION:
        return (
          <MainQuestionScreen
            config={config}
            onYes={handleYes}
            onNo={handleNo}
            onDecline={handleDecline}
            recipientGender={response.recipientGender}
          />
        );

      case RECIPIENT_STEPS.ARRIVAL_PREFERENCE:
        return (
          <ArrivalPreferenceScreen
            config={config}
            onSelect={handleArrivalPreferenceSelect}
            easterEggState={easterEggState}
            recipientGender={response.recipientGender}
          />
        );

      case RECIPIENT_STEPS.ACTIVITY_CHOICE:
        return (
          <ActivityChoiceScreen
            config={config}
            onSelect={handleActivitySelect}
            easterEggState={easterEggState}
          />
        );

      case RECIPIENT_STEPS.SLOT_CHOICE:
        return (
          <SlotChoiceScreen
            config={config}
            onSelectSlot={handleSlotSelect}
            onCoordinateWhatsapp={handleWhatsappCoordinate}
            easterEggState={easterEggState}
          />
        );

      case RECIPIENT_STEPS.CONFIRMATION:
        return (
          <ConfirmationScreen
            config={config}
            response={response}
            onCreateOwn={handleCreateOwn}
            easterEggState={easterEggState}
          />
        );

      case -1: // Decline screen
        return (
          <DeclineScreen
            config={config}
            onCreateOwn={handleCreateOwn}
            onRegret={handleRegretDecline}
            recipientGender={response.recipientGender}
          />
        );

      default:
        return <ArrivalScreen config={config} onNext={nextStep} easterEggState={easterEggState} stampState={stampState} />;
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {renderStep()}
    </AnimatePresence>
  );
}
