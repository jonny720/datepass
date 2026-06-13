import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig, ActivityId } from '@/types';
import type { useEasterEggState } from '@/hooks/useEasterEggState';
import { ACTIVITIES } from '@/data';
import { getInviteTypeConfig } from '@/config/inviteTypes';
import {
  Card,
  StepHeader,
  PrimaryButton,
  OptionCard,
} from '@/components/ui';
import { EasterEgg } from '@/components/recipient/EasterEgg';
import { getRandomPlacementForScreen } from '@/config/easterEggPlacements';
import { pageTransition, fadeInUp, staggerContainer } from '@/lib/animations';

interface ActivityChoiceScreenProps {
  config: InviteConfig;
  onSelect: (activity: ActivityId) => void;
  easterEggState: ReturnType<typeof useEasterEggState>;
}

export function ActivityChoiceScreen({ config, onSelect, easterEggState }: ActivityChoiceScreenProps) {
  const { t } = useLanguage();
  const [selectedActivity, setSelectedActivity] = useState<ActivityId | null>(null);
  const inviteTypeConfig = getInviteTypeConfig(config.inviteType);
  const activityIds = config.activityIds.length > 0 ? config.activityIds : inviteTypeConfig.activityOptions;

  const availableActivities = ACTIVITIES.filter((activity) =>
    activityIds.includes(activity.id)
  );

  const handleSelect = () => {
    if (selectedActivity) {
      onSelect(selectedActivity);
    }
  };

  return (
    <motion.div 
      key="activity-choice"
      className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-8"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        variants={fadeInUp}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <StepHeader
            title={t('recipient_activity_title')}
            subtitle={t('recipient_activity_subtitle')}
          />

          <motion.div 
            className="mb-6 space-y-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {availableActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <OptionCard
                    selected={selectedActivity === activity.id}
                    onClick={() => setSelectedActivity(activity.id)}
                    icon={<Icon className="h-6 w-6" />}
                    title={t(activity.titleKey as keyof typeof t)}
                    description={t(activity.subtitleKey as keyof typeof t)}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <PrimaryButton
              onClick={handleSelect}
              disabled={!selectedActivity}
              fullWidth
              size="lg"
            >
              {t('continue')}
            </PrimaryButton>
          </motion.div>
        </Card>
      </motion.div>

      {/* Easter egg - always render to keep Portal alive */}
      <EasterEgg
        theme={config.theme}
        placement={getRandomPlacementForScreen('activities')}
        onReveal={easterEggState.markAsRevealed}
        hasBeenRevealed={easterEggState.hasBeenRevealed}
      />
    </motion.div>
  );
}
