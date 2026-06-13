import { useState } from 'react';
import { MessageCircle, AlertCircle, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft } from '@/types';
import { validateLocalPhoneNumber } from '@/lib/phoneUtils';
import { findCountryByIso2 } from '@/data/countryDialingCodes';
import {
  Card,
  StepHeader,
  PrimaryButton,
  SecondaryButton,
  TextInput,
  IconBadge,
  CountryDialCodeSelect,
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

  const handleCountryChange = (iso2: string) => {
    updateDraft({ selectedCountryIso2: iso2 });
    // Clear validation error when user changes country
    if (showValidationError) {
      setShowValidationError(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    updateDraft({ localPhoneNumber: value });
    // Clear validation error when user types
    if (showValidationError) {
      setShowValidationError(false);
    }
  };

  const handleSkip = () => {
    updateDraft({ localPhoneNumber: '' });
    onNext();
  };

  const handleContinue = () => {
    const trimmedValue = (draft.localPhoneNumber || '').trim();
    
    // If empty, allow skipping
    if (!trimmedValue) {
      handleSkip();
      return;
    }
    
    // Get the dial code for the selected country
    const country = findCountryByIso2(draft.selectedCountryIso2);
    if (!country) {
      setShowValidationError(true);
      return;
    }
    
    // Validate phone number with dial code
    if (!validateLocalPhoneNumber(country.dialCode, trimmedValue)) {
      setShowValidationError(true);
      return;
    }
    
    // Phone number is valid, continue
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
        <div className="space-y-3">
          <CountryDialCodeSelect
            value={draft.selectedCountryIso2 || 'IL'}
            onChange={handleCountryChange}
            label={t('creator_whatsapp_country_label')}
          />
          
          <div>
            <TextInput
              label={t('creator_whatsapp_phone_label')}
              value={draft.localPhoneNumber || ''}
              onChange={handlePhoneChange}
              placeholder={t('creator_whatsapp_placeholder')}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
            />
            <p className="mt-1.5 text-xs text-stone-500">
              {t('creator_whatsapp_helper')}
            </p>
          </div>
          
          {showValidationError && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3">
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
            <div className="text-xs text-blue-700">
              <p>{t('creator_whatsapp_privacy_note')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} size="lg">
          {t('back')}
        </SecondaryButton>
        {(draft.localPhoneNumber || '').trim() ? (
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
