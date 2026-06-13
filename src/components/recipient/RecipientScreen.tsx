import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigation } from '@/hooks/useNavigation';
import { useRecipientState } from '@/hooks/useRecipientState';
import { useEasterEggState } from '@/hooks/useEasterEggState';
import type { InviteConfig } from '@/types';
import { RECIPIENT_STEPS } from '@/types';
import {
  ArrivalScreen,
  IntroCardsScreen,
  MainQuestionScreen,
  ActivityChoiceScreen,
  SlotChoiceScreen,
  ConfirmationScreen,
  DeclineScreen,
} from './screens';

interface RecipientScreenProps {
  config: InviteConfig;
}

export function RecipientScreen({ config }: RecipientScreenProps) {
  const { language, setLanguage } = useLanguage();
  const { navigate } = useNavigation();
  const {
    response,
    setResponse,
    nextStep,
    setWantsDate,
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

  // Sync language with invite config
  useEffect(() => {
    if (config.language !== language) {
      setLanguage(config.language);
    }
  }, [config.language, language, setLanguage]);

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

  const handleActivitySelect = (activity: typeof config.activityIds[number]) => {
    setSelectedActivity(activity);
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

      case RECIPIENT_STEPS.INTRO_CARDS:
        return <IntroCardsScreen config={config} onNext={nextStep} easterEggState={easterEggState} duckState={duckState} />;

      case RECIPIENT_STEPS.MAIN_QUESTION:
        return (
          <MainQuestionScreen
            config={config}
            onYes={handleYes}
            onNo={handleNo}
            onDecline={handleDecline}
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
        return <DeclineScreen config={config} onCreateOwn={handleCreateOwn} />;

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
