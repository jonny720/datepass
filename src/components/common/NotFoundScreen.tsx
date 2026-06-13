import { useNavigation } from '@/hooks/useNavigation';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { PrimaryButton, SecondaryButton, IconBadge } from '@/components/ui';
import { motion } from 'framer-motion';
import { pageTransition, scaleIn, fadeInUp } from '@/lib/animations';

/**
 * NotFoundScreen displays when a route doesn't match any known paths.
 * Provides clear feedback and navigation options.
 */
export function NotFoundScreen() {
  const { t } = useLanguage();
  const { navigate } = useNavigation();

  const goToLanding = () => navigate({ type: 'landing' });
  const goToCreator = () => navigate({ type: 'create' });

  return (
    <motion.div
      key="not-found"
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 px-4 py-12"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="mb-6 flex justify-center" variants={scaleIn}>
        <IconBadge variant="error" size="lg">
          <AlertCircle className="h-12 w-12 flex-shrink-0" />
        </IconBadge>
      </motion.div>

      <motion.div
        className="w-full max-w-md space-y-6 text-center"
        variants={fadeInUp}
      >
        <div>
          <h1 className="text-screen-title mb-3 text-stone-900">
            {t('app_not_found_title')}
          </h1>
          <p className="text-body text-stone-600">
            {t('app_not_found_subtitle')}
          </p>
        </div>

        <div className="space-y-3">
          <PrimaryButton onClick={goToCreator} fullWidth size="lg">
            {t('landing_create_button')}
          </PrimaryButton>
          <SecondaryButton onClick={goToLanding} fullWidth size="lg">
            {t('app_go_home')}
          </SecondaryButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
