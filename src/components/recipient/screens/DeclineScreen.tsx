import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig } from '@/types';
import {
  Card,
  SecondaryButton,
  IconBadge,
} from '@/components/ui';
import { pageTransition, scaleIn, fadeInUp } from '@/lib/animations';

interface DeclineScreenProps {
  config: InviteConfig;
  onCreateOwn: () => void;
}

export function DeclineScreen({ config, onCreateOwn }: DeclineScreenProps) {
  const { t, language } = useLanguage();

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
            <SecondaryButton onClick={onCreateOwn} fullWidth>
              {t('recipient_confirmation_create_own')}
            </SecondaryButton>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-stone-500">
              {language === 'he'
                ? `${t('recipient_decline_notification')} ${config.senderName}`
                : `${config.senderName} ${t('recipient_decline_notification')}`}
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
