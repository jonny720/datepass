import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft, ThemeId } from '@/types';
import { THEME_CONFIGS, THEME_IDS } from '@/config/themes';
import {
  Card,
  StepHeader,
  PrimaryButton,
  SecondaryButton,
  OptionCard,
} from '@/components/ui';

interface ThemeStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ThemeStep({ draft, updateDraft, onNext, onBack }: ThemeStepProps) {
  const { t, language } = useLanguage();

  const handleThemeSelect = (themeId: ThemeId) => {
    updateDraft({ theme: themeId });
  };

  const handleOpeningMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 100); // Enforce max length
    updateDraft({ openingMessage: value });
  };

  const remainingChars = 100 - (draft.openingMessage?.length || 0);

  return (
    <Card>
      <StepHeader
        title={t('creator_theme_title')}
        subtitle={t('creator_theme_subtitle')}
      />

      <div className="mb-6 space-y-3">
        {THEME_IDS.map((themeId) => {
          const theme = THEME_CONFIGS[themeId];
          const Icon = theme.icon;
          const titleKey = `creator_theme_${themeId}`;
          const descKey = `creator_theme_${themeId}_desc`;
          return (
            <OptionCard
              key={themeId}
              selected={draft.theme === themeId}
              onClick={() => handleThemeSelect(themeId)}
              icon={<Icon className="h-6 w-6" />}
              title={t(titleKey as never)}
              description={t(descKey as never)}
            />
          );
        })}
      </div>

      {/* Optional opening message */}
      <div className="mb-6">
        <label htmlFor="opening-message" className="mb-2 block text-sm font-medium text-stone-700">
          {t('creator_opening_message_label')}
          <span className="ml-1 text-xs text-stone-500">({t('optional')})</span>
        </label>
        <textarea
          id="opening-message"
          value={draft.openingMessage || ''}
          onChange={handleOpeningMessageChange}
          placeholder={t('creator_opening_message_placeholder')}
          maxLength={100}
          rows={2}
          className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm transition-colors focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
        />
        <div className={`mt-1 text-right text-xs ${remainingChars < 20 ? 'text-orange-600' : 'text-stone-500'}`}>
          {remainingChars} {language === 'en' ? 'characters left' : 'תווים נותרו'}
        </div>
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} size="lg">
          {t('back')}
        </SecondaryButton>
        <PrimaryButton onClick={onNext} fullWidth size="lg">
          {t('next')}
        </PrimaryButton>
      </div>
    </Card>
  );
}
