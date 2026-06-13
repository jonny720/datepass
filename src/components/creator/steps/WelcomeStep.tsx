import { Heart } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft } from '@/types';
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
  const { t } = useLanguage();

  const handleLanguageChange = (value: string) => {
    updateDraft({ language: value as 'en' | 'he' });
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

        <PrimaryButton onClick={onNext} fullWidth size="lg">
          {t('next')}
        </PrimaryButton>
      </Card>
    </>
  );
}
