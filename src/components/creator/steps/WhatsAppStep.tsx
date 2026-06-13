import { useState } from 'react';
import { MessageCircle, AlertCircle, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft } from '@/types';
import { validateWhatsAppPhoneNumber, normalizeWhatsAppPhoneNumber } from '@/lib/phoneUtils';
import {
  Card,
  StepHeader,
  PrimaryButton,
  SecondaryButton,
  TextInput,
  IconBadge,
} from '@/components/ui';

interface WhatsAppStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function WhatsAppStep({ draft, updateDraft, onNext, onBack }: WhatsAppStepProps) {
  const { t } = useLanguage();
  const [showValidationError, setShowValidationError] = useState(false);

  const handleWhatsAppChange = (value: string) => {
    updateDraft({ whatsappNumber: value });
    // Clear validation error when user types
    if (showValidationError) {
      setShowValidationError(false);
    }
  };

  const handleSkip = () => {
    updateDraft({ whatsappNumber: '' });
    onNext();
  };

  const handleContinue = () => {
    const trimmedValue = draft.whatsappNumber.trim();
    
    // If empty, allow skipping
    if (!trimmedValue) {
      handleSkip();
      return;
    }
    
    // Validate phone number
    if (!validateWhatsAppPhoneNumber(trimmedValue)) {
      setShowValidationError(true);
      return;
    }
    
    // Normalize and save
    const normalized = normalizeWhatsAppPhoneNumber(trimmedValue);
    updateDraft({ whatsappNumber: normalized || '' });
    onNext();
  };

  return (
    <Card>
      <div className="mb-6 flex justify-center">
        <IconBadge variant="secondary" size="md">
          <MessageCircle className="h-6 w-6" />
        </IconBadge>
      </div>

      <StepHeader
        title={t('creator_whatsapp_title')}
        subtitle={t('creator_whatsapp_subtitle')}
      />

      <div className="mb-6 space-y-4">
        <div>
          <TextInput
            label={t('creator_whatsapp_label')}
            value={draft.whatsappNumber}
            onChange={handleWhatsAppChange}
            placeholder={t('creator_whatsapp_placeholder')}
            type="tel"
          />
          <p className="mt-1.5 text-xs text-stone-500">
            {t('creator_whatsapp_helper')}
          </p>
          
          {showValidationError && (
            <div className="mt-2 flex items-start gap-2 rounded-lg bg-red-50 p-3">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700">
                {t('creator_whatsapp_validation_error')}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-lg bg-blue-50 p-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-700 space-y-1">
              <p>{t('creator_whatsapp_privacy_note')}</p>
              <p>{t('creator_whatsapp_no_auto_send')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} size="lg">
          {t('back')}
        </SecondaryButton>
        {draft.whatsappNumber.trim() ? (
          <PrimaryButton onClick={handleContinue} fullWidth size="lg">
            {t('next')}
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleSkip} fullWidth size="lg">
            {t('creator_whatsapp_skip')}
          </PrimaryButton>
        )}
      </div>
    </Card>
  );
}
