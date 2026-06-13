import { useEffect } from 'react';
import { useCreatorState } from '@/hooks/useCreatorState';
import { useLanguage } from '@/hooks/useLanguage';
import { CreatorProvider } from '@/contexts/CreatorContext';
import { ScreenContainer, ProgressIndicator } from '@/components/ui';
import { TOTAL_STEPS } from '@/types';

// Step components
import { NamesStep } from './steps/NamesStep';
import { ThemeStep } from './steps/ThemeStep';
import { ToneStep } from './steps/ToneStep';
import { IntroCardsStep } from './steps/IntroCardsStep';
import { ActivitiesStep } from './steps/ActivitiesStep';
import { DateSlotsStep } from './steps/DateSlotsStep';
import { WhatsAppStep } from './steps/WhatsAppStep';
import { ReviewStep } from './steps/ReviewStep';

export function CreatorFlow() {
  const { draft, updateDraft, nextStep, prevStep, resetDraft } = useCreatorState();
  const { setLanguage } = useLanguage();

  // Sync global language with draft language
  useEffect(() => {
    setLanguage(draft.language);
  }, [draft.language, setLanguage]);

  const renderStep = () => {
    const props = {
      draft,
      updateDraft,
      onNext: nextStep,
      onBack: prevStep,
      onReset: resetDraft,
    };

    switch (draft.step) {
      case 1:
        return <NamesStep {...props} />;
      case 2:
        return <ThemeStep {...props} />;
      case 3:
        return <ToneStep {...props} />;
      case 4:
        return <IntroCardsStep {...props} />;
      case 5:
        return <ActivitiesStep {...props} />;
      case 6:
        return <DateSlotsStep {...props} />;
      case 7:
        return <WhatsAppStep {...props} />;
      case 8:
        return <ReviewStep {...props} />;
      default:
        return <NamesStep {...props} />;
    }
  };

  return (
    <CreatorProvider onReset={resetDraft}>
      {draft.step === 8 ? (
        // ReviewStep renders full-bleed without container padding
        <>
          <ReviewStep {...{ draft, updateDraft, onNext: nextStep, onBack: prevStep, onReset: resetDraft }} />
        </>
      ) : (
        // All other steps use the standard padded container
        <ScreenContainer>
          {draft.step > 1 && (
            <ProgressIndicator currentStep={draft.step} totalSteps={TOTAL_STEPS - 1} />
          )}
          {renderStep()}
        </ScreenContainer>
      )}
    </CreatorProvider>
  );
}
