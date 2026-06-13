import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig, RecipientGender } from '@/types';
import { heByGender } from '@/lib/hebrewGender';
import {
  Card,
  SecondaryButton,
  IconBadge,
} from '@/components/ui';
import { pageTransition, scaleIn, fadeInUp } from '@/lib/animations';

interface DeclineScreenProps {
  config: InviteConfig;
  onCreateOwn: () => void;
  onRegret?: () => void;
  recipientGender?: RecipientGender | null;
}

export function DeclineScreen({ config, onCreateOwn, onRegret, recipientGender }: DeclineScreenProps) {
  const { t, language } = useLanguage();
  const notificationText = language === 'he'
    ? `${heByGender(recipientGender, {
        male: 'לא יקבל את התשובה אם לא תגיד לו',
        female: 'לא יקבל את התשובה אם לא תגידי לו',
        private: 'לא יקבל את התשובה אם לא תספרו לו',
      })} ${config.senderName}`
    : `${config.senderName} ${t('recipient_decline_notification')}`;

  return (
    <motion.div 
      key="decline"
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-12"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div 
        className="mb-8 flex justify-center"
        variants={scaleIn}
      >
        <IconBadge variant="secondary" size="lg">
          <Heart className="h-12 w-12" />
        </IconBadge>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        <Card className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="mb-3 text-2xl font-bold text-stone-900">
              {t('recipient_decline_title')}
            </h1>
            <p className="text-base text-stone-600">
              {t('recipient_decline_subtitle')}
            </p>
          </div>

          <div className="space-y-3">
            {onRegret && (
              <button
                type="button"
                onClick={onRegret}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 px-5 py-3 text-button-label-lg font-semibold text-white shadow-md transition-all duration-200 hover:from-pink-600 hover:to-pink-700 active:from-pink-700 active:to-pink-800"
              >
                {t('recipient_decline_regret')}
              </button>
            )}
            <SecondaryButton onClick={onCreateOwn} fullWidth>
              {t('recipient_confirmation_create_own')}
            </SecondaryButton>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-stone-500">
              {notificationText}
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
