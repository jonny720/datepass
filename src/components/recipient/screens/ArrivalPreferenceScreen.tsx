import { useState } from 'react';
import { Car, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { ArrivalPreference, InviteConfig } from '@/types';
import type { useEasterEggState } from '@/hooks/useEasterEggState';
import {
  Card,
  StepHeader,
  PrimaryButton,
  OptionCard,
} from '@/components/ui';
import { EasterEgg } from '@/components/recipient/EasterEgg';
import { getRandomPlacementForScreen } from '@/config/easterEggPlacements';
import { pageTransition, fadeInUp, staggerContainer } from '@/lib/animations';

interface ArrivalPreferenceScreenProps {
  config: InviteConfig;
  onSelect: (preference: ArrivalPreference) => void;
  easterEggState: ReturnType<typeof useEasterEggState>;
}

export function ArrivalPreferenceScreen({
  config,
  onSelect,
  easterEggState,
}: ArrivalPreferenceScreenProps) {
  const { t } = useLanguage();
  const [selectedPreference, setSelectedPreference] = useState<ArrivalPreference | null>(null);

  const handleContinue = () => {
    if (selectedPreference) {
      onSelect(selectedPreference);
    }
  };

  return (
    <motion.div
      key="arrival-preference"
      className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-8"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
        <Card>
          <StepHeader
            title={t('recipient_arrival_preference_title')}
            subtitle={t('recipient_arrival_preference_subtitle')}
          />

          <motion.div
            className="mb-6 space-y-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <OptionCard
                selected={selectedPreference === 'pickup'}
                onClick={() => setSelectedPreference('pickup')}
                icon={<Car className="h-6 w-6" />}
                title={t('recipient_arrival_preference_pickup')}
                description={t('recipient_arrival_preference_pickup_desc')}
              />
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <OptionCard
                selected={selectedPreference === 'self'}
                onClick={() => setSelectedPreference('self')}
                icon={<MapPin className="h-6 w-6" />}
                title={t('recipient_arrival_preference_self')}
                description={t('recipient_arrival_preference_self_desc')}
              />
            </motion.div>
          </motion.div>

          <PrimaryButton
            onClick={handleContinue}
            disabled={!selectedPreference}
            fullWidth
            size="lg"
          >
            {t('continue')}
          </PrimaryButton>
        </Card>
      </motion.div>

      <EasterEgg
        theme={config.theme}
        placement={getRandomPlacementForScreen('activities')}
        onReveal={easterEggState.markAsRevealed}
        hasBeenRevealed={easterEggState.hasBeenRevealed}
      />
    </motion.div>
  );
}
