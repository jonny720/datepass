import { Sparkles, Heart, Palette, HeartHandshake, Flame, Coffee } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft, IntroTone } from '@/types';
import {
  Card,
  StepHeader,
  PrimaryButton,
  SecondaryButton,
  OptionCard,
} from '@/components/ui';

interface ToneStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TONES: Array<{ id: IntroTone; icon: typeof Sparkles }> = [
  { id: 'light', icon: Sparkles },
  { id: 'flirty', icon: Heart },
  { id: 'absurd', icon: Palette },
  { id: 'romantic', icon: HeartHandshake },
  { id: 'bold', icon: Flame },
  { id: 'dry', icon: Coffee },
];

export function ToneStep({ draft, updateDraft, onNext, onBack }: ToneStepProps) {
  const { t } = useLanguage();

  const handleToneSelect = (tone: IntroTone) => {
    updateDraft({ introTone: tone });
  };

  return (
    <Card>
      <StepHeader
        title={t('creator_tone_title')}
        subtitle={t('creator_tone_subtitle')}
      />

      <div className="mb-6 space-y-3">
        {TONES.map((tone) => {
          const Icon = tone.icon;
          return (
            <OptionCard
              key={tone.id}
              selected={draft.introTone === tone.id}
              onClick={() => handleToneSelect(tone.id)}
              icon={<Icon className="h-6 w-6" />}
              title={t(`creator_tone_${tone.id}` as keyof typeof t)}
              description={t(`creator_tone_${tone.id}_desc` as keyof typeof t)}
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
