import { useState } from 'react';
import { MessageCircle, AlertCircle, Info, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft, HumorLevel, NoButtonMode } from '@/types';
import { getDefaultNoButtonMode } from '@/lib/compactPayload';
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
  SegmentedControl,
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
  const isCustomInvite = draft.inviteType === 'custom';
  const [showAdvanced, setShowAdvanced] = useState(false);
  const noButtonMode = draft.advancedSettings.noButtonMode || getDefaultNoButtonMode(draft.inviteType);
  const humorLevel = draft.advancedSettings.humorLevel || 'normal';
  const customOptions = draft.customOptions;
  const trimmedCustomOptions = customOptions.map((option) => option.trim()).filter(Boolean);

  const updateAdvancedSettings = (updates: CreatorDraft['advancedSettings']) => {
    updateDraft({
      advancedSettings: {
        ...draft.advancedSettings,
        ...updates,
      },
    });
  };

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
    updateDraft({
      localPhoneNumber: '',
      ...(isCustomInvite && {
        customMainQuestion: (draft.customMainQuestion || '').trim(),
        customOptions: trimmedCustomOptions,
      }),
    });
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

  const updateCustomOption = (index: number, value: string) => {
    updateDraft({
      customOptions: customOptions.map((option, optionIndex) =>
        optionIndex === index ? value.slice(0, 40) : option
      ),
    });
  };

  const addCustomOption = () => {
    if (customOptions.length >= 6) return;
    updateDraft({ customOptions: [...customOptions, ''] });
  };

  const removeCustomOption = (index: number) => {
    updateDraft({ customOptions: customOptions.filter((_, optionIndex) => optionIndex !== index) });
  };

  const normalizeAndContinue = () => {
    if (isCustomInvite) {
      updateDraft({
        customMainQuestion: (draft.customMainQuestion || '').trim(),
        customOptions: trimmedCustomOptions,
      });
    }

    handleContinue();
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

        <div className="rounded-xl border border-stone-200 bg-stone-50/70">
          <button
            type="button"
            onClick={() => setShowAdvanced((isOpen) => !isOpen)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            aria-expanded={showAdvanced}
          >
            <span>
              <span className="block text-sm font-semibold text-stone-800">
                {t('creator_advanced_title')}
              </span>
              <span className="mt-0.5 block text-xs text-stone-500">
                {t('creator_advanced_subtitle')}
              </span>
            </span>
            <ChevronDown className={`h-4 w-4 flex-shrink-0 text-stone-500 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>

          {showAdvanced && (
            <div className="space-y-4 border-t border-stone-200 px-4 py-4">
              {isCustomInvite && (
                <div className="rounded-lg border border-purple-100 bg-white p-3">
                  <p className="mb-3 text-xs leading-relaxed text-stone-500">
                    {t('creator_custom_details_subtitle')}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="custom-main-question" className="mb-2 block text-sm font-medium text-stone-700">
                        {t('creator_custom_question_label')}
                      </label>
                      <input
                        id="custom-main-question"
                        value={draft.customMainQuestion || ''}
                        onChange={(event) => updateDraft({ customMainQuestion: event.target.value.slice(0, 80) })}
                        placeholder={t('creator_custom_question_placeholder')}
                        maxLength={80}
                        className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                      />
                      <p className="mt-1 text-xs text-stone-500">
                        {t('creator_custom_question_helper')}
                      </p>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="block text-sm font-medium text-stone-700">
                        {t('creator_custom_options_label')}
                      </label>
                        <span className="text-xs text-stone-500">{customOptions.length}/6</span>
                      </div>
                      <p className="mb-2 text-xs text-stone-500">
                        {t('creator_custom_options_helper')}
                      </p>

                      <div className="space-y-2">
                        {customOptions.map((option, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              value={option}
                              onChange={(event) => updateCustomOption(index, event.target.value)}
                              maxLength={40}
                              className="min-w-0 flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                            />
                            <button
                              type="button"
                              onClick={() => removeCustomOption(index)}
                              className="rounded-lg border border-stone-200 px-3 text-sm font-semibold text-stone-600"
                            >
                              {t('creator_slots_remove')}
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={addCustomOption}
                        disabled={customOptions.length >= 6}
                        className="mt-3 text-sm font-semibold text-purple-700 disabled:text-stone-400"
                      >
                        {t('creator_slots_add')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={!!draft.advancedSettings.askForRide}
                  onChange={(event) => updateAdvancedSettings({ askForRide: event.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-purple-600 focus:ring-purple-500"
                />
                <span>
                  <span className="block text-sm font-semibold text-stone-800">
                    {t('creator_advanced_ride_label')}
                  </span>
                  <span className="block text-xs text-stone-500">
                    {t('creator_advanced_ride_helper')}
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={!!draft.advancedSettings.askSpontaneityLevel}
                  onChange={(event) => updateAdvancedSettings({ askSpontaneityLevel: event.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-purple-600 focus:ring-purple-500"
                />
                <span>
                  <span className="block text-sm font-semibold text-stone-800">
                    {t('creator_advanced_spontaneity_label')}
                  </span>
                  <span className="block text-xs text-stone-500">
                    {t('creator_advanced_spontaneity_helper')}
                  </span>
                </span>
              </label>

              <div>
                <p className="mb-2 text-sm font-semibold text-stone-800">
                  {t('creator_advanced_no_button_label')}
                </p>
                <SegmentedControl
                  value={noButtonMode}
                  onChange={(value) => updateAdvancedSettings({ noButtonMode: value as NoButtonMode })}
                  className="w-full justify-between overflow-x-auto"
                  options={[
                    { value: 'playful', label: t('creator_advanced_no_button_playful') },
                    { value: 'gentle', label: t('creator_advanced_no_button_gentle') },
                    { value: 'normal', label: t('creator_advanced_no_button_normal') },
                  ]}
                />
                <p className="mt-2 text-xs text-stone-500">
                  {t(`creator_advanced_no_button_helper_${noButtonMode}` as never)}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-stone-800">
                  {t('creator_advanced_humor_label')}
                </p>
                <SegmentedControl
                  value={humorLevel}
                  onChange={(value) => updateAdvancedSettings({ humorLevel: value as HumorLevel })}
                  className="w-full justify-between overflow-x-auto"
                  options={[
                    { value: 'soft', label: t('creator_advanced_humor_soft') },
                    { value: 'normal', label: t('creator_advanced_humor_normal') },
                    { value: 'chaos', label: t('creator_advanced_humor_chaos') },
                  ]}
                />
                <p className="mt-2 text-xs text-stone-500">
                  {t(`creator_advanced_humor_helper_${humorLevel}` as never)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} size="lg">
          {t('back')}
        </SecondaryButton>
        {(draft.localPhoneNumber || '').trim() ? (
          <PrimaryButton onClick={normalizeAndContinue} fullWidth size="lg">
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
