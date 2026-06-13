import { useState } from 'react';
import { MessageCircle, Copy, Check, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig, RecipientResponse } from '@/types';
import { ACTIVITIES } from '@/data';
import {
  Card,
  PrimaryButton,
  SecondaryButton,
  IconBadge,
} from '@/components/ui';
import { CruiseTicket, OceanWaves, FloatingElements } from '@/components/cruise';
import { MissionDossier, GridLines, RadarElements } from '@/components/mission';
import { pageTransition, scaleIn, fadeInUp, staggerContainer } from '@/lib/animations';
import {
  buildRecipientConfirmationWhatsAppUrl,
  buildRecipientConfirmationMessage,
} from '@/lib/recipientConfirmation';

interface ConfirmationScreenProps {
  config: InviteConfig;
  response: RecipientResponse;
  onCreateOwn: () => void;
}

export function ConfirmationScreen({
  config,
  response,
  onCreateOwn,
}: ConfirmationScreenProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const isCruiseTheme = config.theme === 'cruise';
  const isMissionTheme = config.theme === 'secret_mission';

  const selectedActivity = ACTIVITIES.find(
    (a) => a.id === response.selectedActivity
  );

  const activityName = selectedActivity
    ? String(t(selectedActivity.titleKey as keyof ReturnType<typeof useLanguage>['t']))
    : '';

  const getWhatsAppUrl = () => {
    return buildRecipientConfirmationWhatsAppUrl({
      creatorPhone: config.whatsappNumber,
      language: config.language,
      activityName,
      selectedSlot: response.selectedSlot ?? undefined,
      coordinateLater: !response.selectedSlot,
    });
  };

  const handleCopySummary = async () => {
    const message = buildRecipientConfirmationMessage({
      creatorPhone: config.whatsappNumber,
      language: config.language,
      activityName,
      selectedSlot: response.selectedSlot ?? undefined,
      coordinateLater: !response.selectedSlot,
    });

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Generate a playful compatibility score
  const compatibilityScore = Math.floor(Math.random() * (99 - 85 + 1)) + 85;

  // Cruise theme rendering
  if (isCruiseTheme) {
    return (
      <motion.div 
        key="confirmation-cruise"
        className="relative flex min-h-screen flex-col items-center justify-center ocean-background-soft px-4 py-12"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Ocean waves decoration */}
        <OceanWaves />
        
        {/* Floating decorative elements */}
        <FloatingElements />

        {/* Success badge */}
        <motion.div 
          className="relative z-10 mb-6 flex justify-center"
          variants={scaleIn}
        >
          <IconBadge variant="success" size="lg">
            <Check className="h-12 w-12" />
          </IconBadge>
        </motion.div>

        {/* Main content */}
        <motion.div 
          className="relative z-10 w-full max-w-md space-y-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Confirmation title */}
          <motion.div 
            className="text-center"
            variants={fadeInUp}
          >
            <h1 className="mb-2 text-3xl font-bold text-stone-900">
              {t('recipient_confirmation_title')}
            </h1>
            <p className="text-lg text-stone-700">
              {t('recipient_confirmation_subtitle')}
            </p>
          </motion.div>

          {/* Cruise ticket showing confirmation */}
          <motion.div variants={fadeInUp}>
            <CruiseTicket
              recipientName={config.recipientName}
              senderName={config.senderName}
              variant="confirmation"
            />
          </motion.div>

          {/* Activity and Time details */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white/90 backdrop-blur-sm">
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm font-semibold text-stone-500">
                    {t('recipient_confirmation_activity')}
                  </p>
                  <p className="text-lg font-bold text-stone-900">
                    {selectedActivity &&
                      t(selectedActivity.titleKey as keyof typeof t)}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-stone-500">
                    {t('recipient_confirmation_when')}
                  </p>
                  <p className="text-lg font-bold text-stone-900">
                    {response.selectedSlot
                      ? `${response.selectedSlot.date} at ${response.selectedSlot.time}`
                      : t('recipient_confirmation_coordinate')}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Compatibility Score */}
          <motion.div 
            className="rounded-xl bg-white/80 p-4 text-center backdrop-blur-sm"
            variants={fadeInUp}
          >
            <div className="mb-2 flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" fill="currentColor" />
              <span className="text-2xl font-bold text-pink-600">
                {compatibilityScore}%
              </span>
              <Heart className="h-5 w-5 text-pink-600" fill="currentColor" />
            </div>
            <p className="text-xs italic text-stone-600">
              {t('recipient_confirmation_score_disclaimer')}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="space-y-3"
            variants={fadeInUp}
          >
            <PrimaryButton
              onClick={() => window.open(getWhatsAppUrl(), '_blank')}
              fullWidth
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t('recipient_confirmation_whatsapp_send')}
            </PrimaryButton>

            <SecondaryButton onClick={handleCopySummary} fullWidth size="lg">
              {copied ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  {t('recipient_confirmation_copied')}
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-5 w-5" />
                  {t('recipient_confirmation_copy')}
                </>
              )}
            </SecondaryButton>

            <SecondaryButton onClick={onCreateOwn} fullWidth size="lg">
              {t('recipient_confirmation_create_own')}
            </SecondaryButton>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // Secret mission theme rendering
  if (isMissionTheme) {
    return (
      <motion.div 
        key="confirmation-mission"
        className="relative flex min-h-screen flex-col items-center justify-center mission-background-soft px-4 py-12"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Grid decoration */}
        <GridLines />
        
        {/* Radar decorative elements */}
        <RadarElements />

        {/* Success badge */}
        <motion.div 
          className="relative z-10 mb-6 flex justify-center"
          variants={scaleIn}
        >
          <IconBadge variant="success" size="lg">
            <Check className="h-12 w-12" />
          </IconBadge>
        </motion.div>

        {/* Main content */}
        <motion.div 
          className="relative z-10 w-full max-w-md space-y-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Confirmation title */}
          <motion.div 
            className="text-center"
            variants={fadeInUp}
          >
            <h1 className="mb-2 text-3xl font-bold text-stone-900">
              {t('recipient_confirmation_title')}
            </h1>
            <p className="text-lg text-stone-700">
              {t('recipient_confirmation_subtitle')}
            </p>
          </motion.div>

          {/* Mission dossier showing confirmation */}
          <motion.div variants={fadeInUp}>
            <MissionDossier
              recipientName={config.recipientName}
              senderName={config.senderName}
              variant="confirmation"
            />
          </motion.div>

          {/* Activity and Time details */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white/90 backdrop-blur-sm">
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm font-semibold text-stone-500">
                    {t('recipient_confirmation_activity')}
                  </p>
                  <p className="text-lg font-bold text-stone-900">
                    {selectedActivity &&
                      t(selectedActivity.titleKey as keyof typeof t)}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-stone-500">
                    {t('recipient_confirmation_when')}
                  </p>
                  <p className="text-lg font-bold text-stone-900">
                    {response.selectedSlot
                      ? `${response.selectedSlot.date} at ${response.selectedSlot.time}`
                      : t('recipient_confirmation_coordinate')}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Compatibility Score */}
          <motion.div 
            className="rounded-xl bg-white/80 p-4 text-center backdrop-blur-sm"
            variants={fadeInUp}
          >
            <div className="mb-2 flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" fill="currentColor" />
              <span className="text-2xl font-bold text-pink-600">
                {compatibilityScore}%
              </span>
              <Heart className="h-5 w-5 text-pink-600" fill="currentColor" />
            </div>
            <p className="text-xs italic text-stone-600">
              {t('recipient_confirmation_score_disclaimer')}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="space-y-3"
            variants={fadeInUp}
          >
            <PrimaryButton
              onClick={() => window.open(getWhatsAppUrl(), '_blank')}
              fullWidth
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t('recipient_confirmation_whatsapp_send')}
            </PrimaryButton>

            <SecondaryButton onClick={handleCopySummary} fullWidth size="lg">
              {copied ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  {t('recipient_confirmation_copied')}
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-5 w-5" />
                  {t('recipient_confirmation_copy')}
                </>
              )}
            </SecondaryButton>

            <SecondaryButton onClick={onCreateOwn} fullWidth size="lg">
              {t('recipient_confirmation_create_own')}
            </SecondaryButton>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // Fallback theme rendering (generic card)
  return (
    <motion.div 
      key="confirmation-fallback"
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
        <IconBadge variant="success" size="lg">
          <Check className="h-12 w-12" />
        </IconBadge>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        <Card className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-stone-900">
            {t('recipient_confirmation_title')}
          </h1>
          <p className="text-lg text-stone-600">
            {t('recipient_confirmation_subtitle')}
          </p>
        </div>

        {/* Summary */}
        <div className="mb-6 space-y-4 rounded-xl bg-stone-50 p-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-stone-500">
              {t('recipient_confirmation_activity')}
            </p>
            <p className="text-lg font-bold text-stone-900">
              {selectedActivity &&
                t(selectedActivity.titleKey as keyof typeof t)}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm font-semibold text-stone-500">
              {t('recipient_confirmation_when')}
            </p>
            <p className="text-lg font-bold text-stone-900">
              {response.selectedSlot
                ? `${response.selectedSlot.date} at ${response.selectedSlot.time}`
                : t('recipient_confirmation_coordinate')}
            </p>
          </div>
        </div>

        {/* Compatibility Score Disclaimer */}
        <div className="mb-6 rounded-xl bg-pink-50 p-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 text-pink-600" fill="currentColor" />
            <span className="text-2xl font-bold text-pink-600">
              {compatibilityScore}%
            </span>
            <Heart className="h-5 w-5 text-pink-600" fill="currentColor" />
          </div>
          <p className="text-xs italic text-stone-600">
            {t('recipient_confirmation_score_disclaimer')}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <PrimaryButton
            onClick={() => window.open(getWhatsAppUrl(), '_blank')}
            fullWidth
            size="lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            {t('recipient_confirmation_whatsapp_send')}
          </PrimaryButton>

          <SecondaryButton onClick={handleCopySummary} fullWidth size="lg">
            {copied ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                {t('recipient_confirmation_copied')}
              </>
            ) : (
              <>
                <Copy className="mr-2 h-5 w-5" />
                {t('recipient_confirmation_copy')}
              </>
            )}
          </SecondaryButton>

          <SecondaryButton onClick={onCreateOwn} fullWidth size="lg">
            {t('recipient_confirmation_create_own')}
          </SecondaryButton>
        </div>
      </Card>
      </motion.div>
    </motion.div>
  );
}
