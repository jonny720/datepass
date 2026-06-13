import { motion } from 'framer-motion';
import { User, UserRound, ShieldQuestion } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { RecipientGender } from '@/types';
import { Card, OptionCard, StepHeader } from '@/components/ui';
import { pageTransition, fadeInUp } from '@/lib/animations';

interface GenderChoiceScreenProps {
  onSelect: (gender: RecipientGender) => void;
}

const OPTIONS: Array<{
  id: RecipientGender;
  icon: typeof User;
  labelKey: 'recipient_gender_male' | 'recipient_gender_female' | 'recipient_gender_private';
}> = [
  { id: 'male', icon: User, labelKey: 'recipient_gender_male' },
  { id: 'female', icon: UserRound, labelKey: 'recipient_gender_female' },
  { id: 'private', icon: ShieldQuestion, labelKey: 'recipient_gender_private' },
];

export function GenderChoiceScreen({ onSelect }: GenderChoiceScreenProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      key="gender-choice"
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-12"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={fadeInUp} className="w-full max-w-md">
        <Card>
          <StepHeader title={t('recipient_gender_title')} subtitle={t('recipient_gender_subtitle')} />
          <div className="space-y-3">
            {OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <OptionCard
                  key={option.id}
                  onClick={() => onSelect(option.id)}
                  icon={<Icon className="h-6 w-6" />}
                  title={t(option.labelKey)}
                  compact
                />
              );
            })}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
