import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft } from '@/types';
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

  const handleWhatsAppChange = (value: string) => {
    updateDraft({ whatsappNumber: value });
  };

  const handleSkip = () => {
    updateDraft({ whatsappNumber: '' });
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

      <div className="mb-6">
        <TextInput
          label={`WhatsApp (${t('optional')})`}
          value={draft.whatsappNumber}
          onChange={handleWhatsAppChange}
          placeholder={t('creator_whatsapp_placeholder')}
          type="tel"
        />
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} size="lg">
          {t('back')}
        </SecondaryButton>
        {draft.whatsappNumber.trim() ? (
          <PrimaryButton onClick={onNext} fullWidth size="lg">
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
