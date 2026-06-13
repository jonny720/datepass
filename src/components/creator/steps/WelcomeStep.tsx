import { Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft } from '@/types';
import { INVITATION_PRESETS, type InvitationPreset } from '@/data/presets';
import {
  Card,
  StepHeader,
  PrimaryButton,
  SegmentedControl,
  IconBadge,
} from '@/components/ui';

interface WelcomeStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
}

export function WelcomeStep({ draft, updateDraft, onNext }: WelcomeStepProps) {
  const { t, language } = useLanguage();

  const handleLanguageChange = (value: string) => {
    updateDraft({ language: value as 'en' | 'he' });
  };

  const handlePresetSelect = (preset: InvitationPreset) => {
    const introCards = preset.getIntroCards(draft.language);
    updateDraft({
      theme: preset.theme,
      introTone: preset.tone,
      activityIds: preset.activityIds,
      introCards,
    });
    onNext();
  };

  return (
    <>
      <div className="mb-8 flex justify-center">
        <IconBadge variant="primary" size="lg">
          <Heart className="h-12 w-12" fill="currentColor" />
        </IconBadge>
      </div>

      <Card>
        <StepHeader
          title={t('creator_welcome_title')}
          subtitle={t('creator_welcome_subtitle')}
        />

        <div className="mb-6">
          <label className="mb-3 block text-base font-semibold text-stone-900">
            {t('creator_choose_language')}
          </label>
          <SegmentedControl
            options={[
              { value: 'en', label: 'English' },
              { value: 'he', label: 'עברית' },
            ]}
            value={draft.language}
            onChange={handleLanguageChange}
            className="w-full"
          />
        </div>

        {/* Quick Start Presets */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-pink-600" />
            <label className="text-base font-semibold text-stone-900">
              {t('creator_quick_start')}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {INVITATION_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className="rounded-lg border-2 border-stone-200 bg-white px-3 py-2 text-center text-sm font-medium text-stone-700 transition-all hover:border-pink-400 hover:bg-pink-50 hover:text-pink-700"
              >
                {language === 'he' ? preset.nameHe : preset.nameEn}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-stone-500 text-center">
            {t('creator_quick_start_hint')}
          </p>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-stone-500">{t('or')}</span>
          </div>
        </div>

        <PrimaryButton onClick={onNext} fullWidth size="lg">
          {t('creator_custom_invitation')}
        </PrimaryButton>
      </Card>
    </>
  );
}
