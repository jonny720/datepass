import { useState } from 'react';
import { MessageCircle, Copy, Check, Heart, Share2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig, RecipientResponse } from '@/types';
import type { useEasterEggState } from '@/hooks/useEasterEggState';
import { ACTIVITIES } from '@/data';
import {
  Card,
  PrimaryButton,
  SecondaryButton,
  IconBadge,
} from '@/components/ui';
import { CruiseTicket, OceanWaves, FloatingElements } from '@/components/cruise';
import { MissionDossier, GridLines, RadarElements } from '@/components/mission';
import { EasterEgg } from '@/components/recipient/EasterEgg';
import { CompatibilityCalculation } from '@/components/recipient/CompatibilityCalculation';
import { getRandomPlacementForScreen } from '@/config/easterEggPlacements';
import { generateCompatibilityScore, getScoreDisclaimer } from '@/config/compatibilityConfig';
import { pageTransition, scaleIn, fadeInUp, staggerContainer } from '@/lib/animations';
import { getInviteTypeConfig } from '@/config/inviteTypes';
import { heByGender } from '@/lib/hebrewGender';
import {
  buildRecipientConfirmationWhatsAppUrl,
  buildRecipientConfirmationMessage,
} from '@/lib/recipientConfirmation';

interface ConfirmationScreenProps {
  config: InviteConfig;
  response: RecipientResponse;
  onCreateOwn: () => void;
  easterEggState: ReturnType<typeof useEasterEggState>;
}

export function ConfirmationScreen({
  config,
  response,
  onCreateOwn,
  easterEggState,
}: ConfirmationScreenProps) {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const [scoreDisclaimerIndex, setScoreDisclaimerIndex] = useState(0);
  const [showCalculation, setShowCalculation] = useState(true);
  const MAX_NOTE_LENGTH = 160;
  const inviteTypeConfig = getInviteTypeConfig(config.inviteType);
  const isDateInvite = (config.inviteType || 'date') === 'date';

  const isCruiseTheme = config.theme === 'cruise';
  const isMissionTheme = config.theme === 'secret_mission';

  const selectedActivity = ACTIVITIES.find(
    (a) => a.id === response.selectedActivity
  );

  const arrivalPreferenceLabel = response.arrivalPreference
    ? language === 'he'
      ? response.arrivalPreference === 'pickup'
        ? heByGender(response.recipientGender, {
            male: 'אני צריך איסוף',
            female: 'אני צריכה איסוף',
            private: t('recipient_confirmation_arrival_pickup'),
          })
        : heByGender(response.recipientGender, {
            male: 'אני אגיע בעצמי',
            female: 'אני אגיע בעצמי',
            private: t('recipient_confirmation_arrival_self'),
          })
      : t(
          response.arrivalPreference === 'pickup'
            ? 'recipient_confirmation_arrival_pickup'
            : 'recipient_confirmation_arrival_self'
        )
    : '';
  const arrivalPreferenceHeader = language === 'he'
    ? heByGender(response.recipientGender, {
        male: 'איך מגיע',
        female: 'איך מגיעה',
        private: t('recipient_confirmation_arrival_preference'),
      })
    : t('recipient_confirmation_arrival_preference');

  const selectedTimeLabel = response.selectedSlot
    ? language === 'he'
      ? `${response.selectedSlot.date} בשעה ${response.selectedSlot.time}`
      : `${response.selectedSlot.date} at ${response.selectedSlot.time}`
    : t('recipient_confirmation_coordinate');

  const activityName = selectedActivity
    ? String(t(selectedActivity.titleKey as keyof ReturnType<typeof useLanguage>['t']))
    : '';

  // Cycle through playful score disclaimers using new config
  const handleScoreTap = () => {
    // Haptic feedback
    navigator.vibrate?.(15);
    setScoreDisclaimerIndex((prev) => (prev + 1) % 4);
  };

  const handleCalculationComplete = () => {
    setShowCalculation(false);
  };

  // Build confirmation message (same for all actions)
  const confirmationMessage = buildRecipientConfirmationMessage({
    creatorPhone: config.whatsappNumber,
    inviteType: config.inviteType,
    language,
    activityName,
    selectedSlot: response.selectedSlot ?? undefined,
    coordinateLater: !response.selectedSlot,
    arrivalPreference: response.arrivalPreference,
    recipientGender: response.recipientGender,
    personalNote: personalNote.trim(),
    noteHeader: t('recipient_confirmation_note_header'),
    foundEasterEgg: response.foundEasterEgg,
  });

  // Build WhatsApp URL (returns null if no valid phone)
  const whatsappUrl = buildRecipientConfirmationWhatsAppUrl({
    creatorPhone: config.whatsappNumber,
    inviteType: config.inviteType,
    language,
    activityName,
    selectedSlot: response.selectedSlot ?? undefined,
    coordinateLater: !response.selectedSlot,
    arrivalPreference: response.arrivalPreference,
    recipientGender: response.recipientGender,
    personalNote: personalNote.trim(),
    noteHeader: t('recipient_confirmation_note_header'),
    foundEasterEgg: response.foundEasterEgg,
  });

  // Development diagnostics
  if (import.meta.env.DEV) {
    console.debug('DatePass recipient WhatsApp confirmation', {
      creatorPhone: config.whatsappNumber,
      hasValidPhone: whatsappUrl !== null,
      whatsappUrl,
      messageLength: confirmationMessage.length,
    });
  }

  const hasValidCreatorPhone = whatsappUrl !== null;

  const handleWhatsAppConfirmation = () => {
    if (!whatsappUrl) return;
    
    // Use direct navigation for reliable iPhone behavior
    // Avoids popup blockers and works from WhatsApp webview
    window.location.assign(whatsappUrl);
  };

  const handleCopyConfirmation = async () => {
    try {
      await navigator.clipboard.writeText(confirmationMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareConfirmation = async () => {
    if (!navigator.share) return;
    
    try {
      await navigator.share({
        text: confirmationMessage,
      });
    } catch (err) {
      // User cancelled or share failed - ignore
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  };

  // Check if Web Share API is available
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  // Generate a deterministic compatibility score based on invite config
  const compatibilityScore = generateCompatibilityScore(
    `${config.senderName}-${config.recipientName}-${config.theme}`
  );

  // Get current score disclaimer
  const currentDisclaimer = getScoreDisclaimer(scoreDisclaimerIndex, language);

  // Cruise theme rendering
  if (isCruiseTheme) {
    return (
      <>
        {/* Compatibility calculation overlay */}
        <AnimatePresence>
          {showCalculation && (
            <CompatibilityCalculation
              inviteType={config.inviteType}
              onComplete={handleCalculationComplete}
            />
          )}
        </AnimatePresence>

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

        {/* Easter egg - always render to keep Portal alive */}
        <EasterEgg
          theme={config.theme}
          placement={getRandomPlacementForScreen('confirmation')}
          onReveal={easterEggState.markAsRevealed}
          hasBeenRevealed={easterEggState.hasBeenRevealed}
        />

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
                    {selectedTimeLabel}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-stone-500">
                    {arrivalPreferenceHeader}
                  </p>
                  <p className="text-lg font-bold text-stone-900">
                    {arrivalPreferenceLabel}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Optional Personal Note */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white/90 backdrop-blur-sm">
              <div className="space-y-2">
                <label htmlFor="personal-note-cruise" className="text-sm font-semibold text-stone-700">
                  {t('recipient_confirmation_note_label')}
                </label>
                <p className="text-xs text-stone-500">
                  {t('recipient_confirmation_note_helper')}
                </p>
                <textarea
                  id="personal-note-cruise"
                  value={personalNote}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= MAX_NOTE_LENGTH) {
                      setPersonalNote(value);
                    }
                  }}
                  placeholder={t('recipient_confirmation_note_placeholder')}
                  rows={3}
                  maxLength={MAX_NOTE_LENGTH}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
                <div className="flex justify-end">
                  <span className={`text-xs ${personalNote.length >= MAX_NOTE_LENGTH ? 'text-pink-600 font-semibold' : 'text-stone-400'}`}>
                    {personalNote.length} / {MAX_NOTE_LENGTH}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Compatibility Score - Interactive */}
          <motion.div 
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 p-6 text-center shadow-md transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            variants={fadeInUp}
            onClick={handleScoreTap}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleScoreTap();
              }
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Sparkle decoration */}
            <motion.div
              className="absolute right-2 top-2 text-pink-400"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>

            <div className="mb-3 flex items-center justify-center gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {isDateInvite ? (
                  <Heart className="h-6 w-6 text-pink-600" fill="currentColor" />
                ) : (
                  <Sparkles className="h-6 w-6 text-pink-600" />
                )}
              </motion.div>
              <motion.span 
                className="text-4xl font-bold text-pink-600"
                key={scoreDisclaimerIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                {compatibilityScore}%
              </motion.span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
              >
                {isDateInvite ? (
                  <Heart className="h-6 w-6 text-pink-600" fill="currentColor" />
                ) : (
                  <Sparkles className="h-6 w-6 text-pink-600" />
                )}
              </motion.div>
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
              {inviteTypeConfig.scoreLabel[language]}
            </p>
            <motion.p 
              className="text-sm font-medium italic text-stone-700"
              key={`disclaimer-${scoreDisclaimerIndex}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentDisclaimer}
            </motion.p>
            
            {/* Tap hint */}
            <p className="mt-2 text-xs text-stone-400 opacity-0 transition-opacity group-hover:opacity-100">
              Tap for more
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="space-y-3"
            variants={fadeInUp}
          >
            {hasValidCreatorPhone ? (
              <>
                <PrimaryButton
                  onClick={handleWhatsAppConfirmation}
                  fullWidth
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t('recipient_confirmation_whatsapp_send')}
                </PrimaryButton>

                <SecondaryButton onClick={handleCopyConfirmation} fullWidth size="lg">
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
              </>
            ) : (
              <>
                <PrimaryButton onClick={handleCopyConfirmation} fullWidth size="lg">
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
                </PrimaryButton>

                <p className="text-center text-sm text-stone-600 py-2">
                  {t('recipient_confirmation_no_whatsapp_message')}
                </p>

                {canShare && (
                  <SecondaryButton onClick={handleShareConfirmation} fullWidth size="lg">
                    <Share2 className="mr-2 h-5 w-5" />
                    {t('recipient_confirmation_share')}
                  </SecondaryButton>
                )}
              </>
            )}

          </motion.div>

          {/* Viral CTA - Subtle */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 text-center"
          >
            <button
              onClick={onCreateOwn}
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors underline"
            >
              {t('recipient_confirmation_create_own')}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
      </>
    );
  }

  // Secret mission theme rendering
  if (isMissionTheme) {
    return (
      <>
        {/* Compatibility calculation overlay */}
        <AnimatePresence>
          {showCalculation && (
            <CompatibilityCalculation
              inviteType={config.inviteType}
              onComplete={handleCalculationComplete}
            />
          )}
        </AnimatePresence>

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

        {/* Easter egg - always render to keep Portal alive */}
        <EasterEgg
          theme={config.theme}
          placement={getRandomPlacementForScreen('confirmation')}
          onReveal={easterEggState.markAsRevealed}          hasBeenRevealed={easterEggState.hasBeenRevealed}        />

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
                    {selectedTimeLabel}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-stone-500">
                    {arrivalPreferenceHeader}
                  </p>
                  <p className="text-lg font-bold text-stone-900">
                    {arrivalPreferenceLabel}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Optional Personal Note */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white/90 backdrop-blur-sm">
              <div className="space-y-2">
                <label htmlFor="personal-note-mission" className="text-sm font-semibold text-stone-700">
                  {t('recipient_confirmation_note_label')}
                </label>
                <p className="text-xs text-stone-500">
                  {t('recipient_confirmation_note_helper')}
                </p>
                <textarea
                  id="personal-note-mission"
                  value={personalNote}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= MAX_NOTE_LENGTH) {
                      setPersonalNote(value);
                    }
                  }}
                  placeholder={t('recipient_confirmation_note_placeholder')}
                  rows={3}
                  maxLength={MAX_NOTE_LENGTH}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
                <div className="flex justify-end">
                  <span className={`text-xs ${personalNote.length >= MAX_NOTE_LENGTH ? 'text-pink-600 font-semibold' : 'text-stone-400'}`}>
                    {personalNote.length} / {MAX_NOTE_LENGTH}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Compatibility Score - Interactive */}
          <motion.div 
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 p-6 text-center shadow-md transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            variants={fadeInUp}
            onClick={handleScoreTap}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleScoreTap();
              }
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Sparkle decoration */}
            <motion.div
              className="absolute right-2 top-2 text-pink-400"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>

            <div className="mb-3 flex items-center justify-center gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {isDateInvite ? (
                  <Heart className="h-6 w-6 text-pink-600" fill="currentColor" />
                ) : (
                  <Sparkles className="h-6 w-6 text-pink-600" />
                )}
              </motion.div>
              <motion.span 
                className="text-4xl font-bold text-pink-600"
                key={scoreDisclaimerIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                {compatibilityScore}%
              </motion.span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
              >
                {isDateInvite ? (
                  <Heart className="h-6 w-6 text-pink-600" fill="currentColor" />
                ) : (
                  <Sparkles className="h-6 w-6 text-pink-600" />
                )}
              </motion.div>
            </div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
              {inviteTypeConfig.scoreLabel[language]}
            </p>
            <motion.p 
              className="text-sm font-medium italic text-stone-700"
              key={`disclaimer-mission-${scoreDisclaimerIndex}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentDisclaimer}
            </motion.p>
            
            {/* Tap hint */}
            <p className="mt-2 text-xs text-stone-400 opacity-0 transition-opacity group-hover:opacity-100">
              Tap for more
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="space-y-3"
            variants={fadeInUp}
          >
            {hasValidCreatorPhone ? (
              <>
                <PrimaryButton
                  onClick={handleWhatsAppConfirmation}
                  fullWidth
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t('recipient_confirmation_whatsapp_send')}
                </PrimaryButton>

                <SecondaryButton onClick={handleCopyConfirmation} fullWidth size="lg">
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
              </>
            ) : (
              <>
                <PrimaryButton onClick={handleCopyConfirmation} fullWidth size="lg">
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
                </PrimaryButton>

                <p className="text-center text-sm text-stone-600 py-2">
                  {t('recipient_confirmation_no_whatsapp_message')}
                </p>

                {canShare && (
                  <SecondaryButton onClick={handleShareConfirmation} fullWidth size="lg">
                    <Share2 className="mr-2 h-5 w-5" />
                    {t('recipient_confirmation_share')}
                  </SecondaryButton>
                )}
              </>
            )}

          </motion.div>

          {/* Viral CTA - Subtle */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 text-center"
          >
            <button
              onClick={onCreateOwn}
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors underline"
            >
              {t('recipient_confirmation_create_own')}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
      </>
    );
  }

  // Fallback theme rendering (generic card)
  return (
    <>
      {/* Compatibility calculation overlay */}
      <AnimatePresence>
        {showCalculation && (
          <CompatibilityCalculation
            inviteType={config.inviteType}
            onComplete={handleCalculationComplete}
          />
        )}
      </AnimatePresence>

      <motion.div 
        key="confirmation-fallback"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-12"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
      {/* Easter egg - always render to keep Portal alive */}
      <EasterEgg
        theme={config.theme}
        placement={getRandomPlacementForScreen('confirmation')}
        onReveal={easterEggState.markAsRevealed}
        hasBeenRevealed={easterEggState.hasBeenRevealed}
      />

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
              {selectedTimeLabel}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm font-semibold text-stone-500">
              {arrivalPreferenceHeader}
            </p>
            <p className="text-lg font-bold text-stone-900">
              {arrivalPreferenceLabel}
            </p>
          </div>
        </div>

        {/* Compatibility Score Disclaimer */}
        <div className="mb-6 rounded-xl bg-pink-50 p-4 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
            {inviteTypeConfig.scoreLabel[language]}
          </p>
          <div className="mb-2 flex items-center justify-center gap-2">
            {isDateInvite ? (
              <Heart className="h-5 w-5 text-pink-600" fill="currentColor" />
            ) : (
              <Sparkles className="h-5 w-5 text-pink-600" />
            )}
            <span className="text-2xl font-bold text-pink-600">
              {compatibilityScore}%
            </span>
            {isDateInvite ? (
              <Heart className="h-5 w-5 text-pink-600" fill="currentColor" />
            ) : (
              <Sparkles className="h-5 w-5 text-pink-600" />
            )}
          </div>
          <p className="text-xs italic text-stone-600">
            {t('recipient_confirmation_score_disclaimer')}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {hasValidCreatorPhone ? (
            <>
              <PrimaryButton
                onClick={handleWhatsAppConfirmation}
                fullWidth
                size="lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t('recipient_confirmation_whatsapp_send')}
              </PrimaryButton>

              <SecondaryButton onClick={handleCopyConfirmation} fullWidth size="lg">
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
            </>
          ) : (
            <>
              <PrimaryButton onClick={handleCopyConfirmation} fullWidth size="lg">
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
              </PrimaryButton>

              <p className="text-center text-sm text-stone-600 py-2">
                {t('recipient_confirmation_no_whatsapp_message')}
              </p>

              {canShare && (
                <SecondaryButton onClick={handleShareConfirmation} fullWidth size="lg">
                  <Share2 className="mr-2 h-5 w-5" />
                  {t('recipient_confirmation_share')}
                </SecondaryButton>
              )}
            </>
          )}

          {/* Viral CTA - Subtle */}
          <div className="mt-6 text-center">
            <button
              onClick={onCreateOwn}
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors underline"
            >
              {t('recipient_confirmation_create_own')}
            </button>
          </div>
        </div>
      </Card>
      </motion.div>
    </motion.div>
    </>
  );
}
