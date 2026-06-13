import { useEffect, useState } from 'react';
import { CheckCircle, Share2, Copy, Eye, Edit, RotateCcw, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { createInviteUrl } from '@/hooks/useNavigation';
import { InvitationTicket } from '../InvitationTicket';
import { RecipientScreen } from '@/components/recipient/RecipientScreen';
import type { CreatorDraft, InviteConfig } from '@/types';
import { buildInternationalWhatsAppNumber } from '@/lib/phoneUtils';
import { findCountryByIso2 } from '@/data/countryDialingCodes';
import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '@/components/ui';
import { fadeInUp, staggerChildren } from '@/lib/animations';

// Import theme decorations
import { FloatingElements as CruiseElements } from '@/components/cruise/FloatingElements';
import { GridLines as MissionElements } from '@/components/mission/GridLines';
import { NatureElements } from '@/components/nature/NatureElements';
import { PartyElements } from '@/components/party/PartyElements';
import { AfterDarkElements } from '@/components/afterdark/AfterDarkElements';

interface ReviewStepProps {
  draft: CreatorDraft;
  onBack: () => void;
  onReset: () => void;
}

export function ReviewStep({ draft, onBack, onReset }: ReviewStepProps) {
  const { t } = useLanguage();
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewConfig, setPreviewConfig] = useState<InviteConfig | null>(null);

  // Auto-generate invite URL on mount
  useEffect(() => {
    // Build international WhatsApp number if provided
    let whatsappNumber: string | undefined;
    if (draft.localPhoneNumber.trim()) {
      const country = findCountryByIso2(draft.selectedCountryIso2);
      if (country) {
        whatsappNumber = buildInternationalWhatsAppNumber({
          dialCode: country.dialCode,
          localNumber: draft.localPhoneNumber,
        });
      }
    }

    const inviteConfig: InviteConfig = {
      version: 1,
      language: draft.language,
      senderName: draft.senderName,
      recipientName: draft.recipientName,
      theme: draft.theme,
      introTone: draft.introTone,
      introCards: draft.introCards,
      activityIds: draft.activityIds,
      dateSlots: draft.dateSlots,
      whatsappNumber,
    };

    const url = createInviteUrl(inviteConfig);
    setInviteUrl(url);
  }, [draft]);

  const handleCopyLink = async () => {
    if (!inviteUrl) return;

    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (!inviteUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: t('app_title'),
          text: t('recipient_title'),
          url: inviteUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    } else {
      // Fallback: copy to clipboard
      handleCopyLink();
    }
  };

  const handleWhatsApp = () => {
    if (!inviteUrl) return;

    // Build WhatsApp message with the complete invite URL
    const message = `${t('recipient_title')} 💌\n\n${inviteUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handlePreview = () => {
    // Build international WhatsApp number if provided
    let whatsappNumber: string | undefined;
    if (draft.localPhoneNumber.trim()) {
      const country = findCountryByIso2(draft.selectedCountryIso2);
      if (country) {
        whatsappNumber = buildInternationalWhatsAppNumber({
          dialCode: country.dialCode,
          localNumber: draft.localPhoneNumber,
        });
      }
    }

    const config: InviteConfig = {
      version: 1,
      language: draft.language,
      senderName: draft.senderName,
      recipientName: draft.recipientName,
      theme: draft.theme,
      introTone: draft.introTone,
      introCards: draft.introCards,
      activityIds: draft.activityIds,
      dateSlots: draft.dateSlots,
      whatsappNumber,
    };

    setPreviewConfig(config);
    setShowPreview(true);
  };

  const handleExitPreview = () => {
    setShowPreview(false);
    setPreviewConfig(null);
  };

  const handleEdit = () => {
    onBack();
  };

  // Theme-specific background classes
  const getBackgroundClass = () => {
    switch (draft.theme) {
      case 'cruise':
        return 'cruise-background';
      case 'secret_mission':
        return 'mission-background';
      case 'nature':
        return 'nature-background-soft';
      case 'party':
        return 'party-background-soft';
      case 'after_dark':
        return 'after-dark-background-soft';
      default:
        return 'bg-gradient-to-br from-stone-50 to-stone-100';
    }
  };

  // Render theme decorations
  const renderDecorations = () => {
    switch (draft.theme) {
      case 'cruise':
        return <CruiseElements />;
      case 'secret_mission':
        return <MissionElements />;
      case 'nature':
        return <NatureElements />;
      case 'party':
        return <PartyElements />;
      case 'after_dark':
        return <AfterDarkElements />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Preview Mode */}
      {showPreview && previewConfig && (
        <div className="fixed inset-0 z-50 flex flex-col">
          {/* Sticky Exit Bar */}
          <div className="sticky top-0 z-50 flex items-center justify-between border-b border-stone-300 bg-amber-100 px-4 py-3 shadow-md">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-amber-800" />
              <span className="font-semibold text-amber-900">
                {t('creator_review_preview_mode')}
              </span>
            </div>
            <button
              onClick={handleExitPreview}
              className="flex items-center gap-2 rounded-lg bg-amber-800 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-900"
            >
              <X className="h-4 w-4" />
              {t('creator_review_exit_preview')}
            </button>
          </div>

          {/* Recipient Flow */}
          <div className="flex-1 overflow-auto">
            <RecipientScreen config={previewConfig} />
          </div>
        </div>
      )}

      {/* Normal Review Screen */}
      {!showPreview && (
        <div className={`relative flex min-h-screen flex-col ${getBackgroundClass()}`}>
          {renderDecorations()}

          <motion.div
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 safe-area-insets"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {/* Success Animation */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg">
                <CheckCircle className="h-10 w-10 flex-shrink-0 text-white" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeInUp} className="mb-8 text-center">
              <h1 className="text-screen-title mb-3 text-stone-900">
                {t('creator_review_title')}
              </h1>
              <p className="text-body text-stone-600">
                {t('creator_review_subtitle')}
              </p>
            </motion.div>

            {/* Invitation Ticket */}
            <motion.div variants={fadeInUp} className="mb-8 w-full flex justify-center">
              <InvitationTicket
                theme={draft.theme}
                senderName={draft.senderName}
                recipientName={draft.recipientName}
              />
            </motion.div>

            {/* Summary Chips */}
            <motion.div variants={fadeInUp} className="mb-8 flex flex-wrap justify-center gap-2">
              {draft.introCards.length > 0 && (
                <div className="text-chip rounded-full bg-white/90 px-4 py-2 font-medium text-stone-700 shadow-sm backdrop-blur-sm">
                  {draft.introCards.length} {t('creator_review_summary_cards')}
                </div>
              )}
              {draft.activityIds.length > 0 && (
                <div className="text-chip rounded-full bg-white/90 px-4 py-2 font-medium text-stone-700 shadow-sm backdrop-blur-sm">
                  {draft.activityIds.length} {t('creator_review_summary_activities')}
                </div>
              )}
              {draft.dateSlots.length > 0 ? (
                <div className="text-chip rounded-full bg-white/90 px-4 py-2 font-medium text-stone-700 shadow-sm backdrop-blur-sm">
                  {draft.dateSlots.length} {t('creator_review_summary_slots')}
                </div>
              ) : (
                <div className="text-chip rounded-full bg-white/90 px-4 py-2 font-medium text-stone-700 shadow-sm backdrop-blur-sm">
                  {t('creator_review_summary_coordinate')}
                </div>
              )}
            </motion.div>

            {/* Share Actions */}
            <motion.div variants={fadeInUp} className="w-full max-w-md space-y-3">
              {/* Primary Share */}
              <PrimaryButton onClick={handleShare} fullWidth size="lg">
                <Share2 className="h-5 w-5 flex-shrink-0" />
                {t('creator_review_share_button')}
              </PrimaryButton>

              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-3">
                <SecondaryButton onClick={handleWhatsApp} fullWidth size="lg">
                  {t('creator_review_whatsapp_button')}
                </SecondaryButton>

                <SecondaryButton onClick={handleCopyLink} fullWidth size="lg">
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      {t('creator_review_copied')}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 flex-shrink-0" />
                      {t('creator_review_copy_button')}
                    </>
                  )}
                </SecondaryButton>
              </div>
            </motion.div>

            {/* Tertiary Actions */}
            <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap justify-center gap-4">
              <TextButton onClick={handlePreview} className="text-stone-600 hover:text-stone-900">
                <Eye className="h-4 w-4 flex-shrink-0" />
                {t('creator_review_preview_button')}
              </TextButton>

              <TextButton onClick={handleEdit} className="text-stone-600 hover:text-stone-900">
                <Edit className="h-4 w-4 flex-shrink-0" />
                {t('creator_review_edit_button')}
              </TextButton>

              <TextButton onClick={onReset} className="text-stone-600 hover:text-stone-900">
                <RotateCcw className="h-4 w-4 flex-shrink-0" />
                {t('creator_review_reset_button')}
              </TextButton>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
}
