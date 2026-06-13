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
  const { t } = useLanguage();

  const handleThemeSelect = (themeId: ThemeId) => {
    updateDraft({ theme: themeId });
  };

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
