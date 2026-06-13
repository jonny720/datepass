import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig } from '@/types';
import type { useEasterEggState } from '@/hooks/useEasterEggState';
import { PrimaryButton } from '@/components/ui';
import { CruiseTicket, OceanWaves, FloatingElements } from '@/components/cruise';
import { MissionDossier, GridLines, RadarElements } from '@/components/mission';
import { NatureInvitation, NatureElements } from '@/components/nature';
import { PartyInvitation, PartyElements } from '@/components/party';
import { AfterDarkInvitation, AfterDarkElements } from '@/components/afterdark';
import { EasterEgg } from '@/components/recipient/EasterEgg';
import { HiddenStamp } from '@/components/recipient/HiddenStamp';
import { OpeningAnimation } from '@/components/recipient/OpeningAnimation';
import { getRandomPlacementForScreen } from '@/config/easterEggPlacements';
import { pageTransition, fadeInUp, scaleIn, gentlePulse, float, prefersReducedMotion } from '@/lib/animations';

interface ArrivalScreenProps {
  config: InviteConfig;
  onNext: () => void;
  easterEggState: ReturnType<typeof useEasterEggState>;
  stampState: ReturnType<typeof useEasterEggState>;
}

export function ArrivalScreen({ config, onNext, easterEggState, stampState }: ArrivalScreenProps) {
  const { t } = useLanguage();
  const reduceMotion = prefersReducedMotion();
  const [showOpening, setShowOpening] = useState(true);

  // Theme-specific rendering components
  const renderThemeContent = () => {
    switch (config.theme) {
      case 'cruise':
        return {
          background: 'ocean-background-soft',
          decorations: <><OceanWaves /><FloatingElements /></>,
          card: <CruiseTicket recipientName={config.recipientName} senderName={config.senderName} variant="invitation" />
        };
      
      case 'secret_mission':
        return {
          background: 'mission-background-soft',
          decorations: <><GridLines /><RadarElements /></>,
          card: <MissionDossier recipientName={config.recipientName} senderName={config.senderName} variant="invitation" />
        };
      
      case 'nature':
        return {
          background: 'nature-background-soft',
          decorations: <NatureElements />,
          card: <NatureInvitation recipientName={config.recipientName} senderName={config.senderName} variant="invitation" />
        };
      
      case 'party':
        return {
          background: 'party-background-soft',
          decorations: <PartyElements />,
          card: <PartyInvitation recipientName={config.recipientName} senderName={config.senderName} variant="invitation" />
        };
      
      case 'after_dark':
        return {
          background: 'after-dark-background',
          decorations: <AfterDarkElements />,
          card: <AfterDarkInvitation recipientName={config.recipientName} senderName={config.senderName} variant="invitation" />
        };
      
      default:
        return {
          background: 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50',
          decorations: null,
          card: <NatureInvitation recipientName={config.recipientName} senderName={config.senderName} variant="invitation" />
        };
    }
  };

  const { background, decorations, card } = renderThemeContent();

  return (
    <>
      <AnimatePresence>
        {showOpening && (
          <OpeningAnimation
            theme={config.theme}
            recipientName={config.recipientName}
            openingMessage={config.openingMessage}
            onComplete={() => setShowOpening(false)}
          />
        )}
      </AnimatePresence>

      <motion.div 
        key={`arrival-${config.theme}`}
        className={`relative flex min-h-screen flex-col items-center justify-center ${background} px-4 py-12`}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
      {/* Theme decorations */}
      {decorations}

      {/* Easter egg - always render to keep Portal alive */}
      <EasterEgg
        theme={config.theme}
        placement={getRandomPlacementForScreen('arrival')}
        onReveal={easterEggState.markAsRevealed}
        hasBeenRevealed={easterEggState.hasBeenRevealed}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          variants={!reduceMotion ? scaleIn : fadeInUp}
          initial="initial"
          animate={!reduceMotion ? ['animate', 'animate'] : 'animate'}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="relative"
            variants={!reduceMotion ? float : {}}
            animate={!reduceMotion ? 'animate' : undefined}
          >
            {card}
            {/* Hidden stamp partially peeking from edge */}
            <HiddenStamp
              theme={config.theme}
              onReveal={stampState.markAsRevealed}
              hasBeenRevealed={stampState.hasBeenRevealed}
            />
          </motion.div>
        </motion.div>

        {/* Open Button */}
        <motion.div 
          className="mt-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          <motion.div
            variants={!reduceMotion ? gentlePulse : {}}
            animate={!reduceMotion ? 'animate' : undefined}
          >
            <PrimaryButton onClick={onNext} fullWidth size="lg">
              {t('recipient_arrival_open_button')}
            </PrimaryButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
    </>
  );
}
