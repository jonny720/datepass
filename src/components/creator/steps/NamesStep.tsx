import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft } from '@/types';
import {
  Card,
  StepHeader,
  PrimaryButton,
  TextInput,
} from '@/components/ui';

interface NamesStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
}

export function NamesStep({ draft, updateDraft, onNext }: NamesStepProps) {
  const { t } = useLanguage();

  const handleSenderNameChange = (value: string) => {
    updateDraft({ senderName: value });
  };

  const handleRecipientNameChange = (value: string) => {
    updateDraft({ recipientName: value });
  };

  const isValid = draft.senderName.trim().length > 0 && draft.recipientName.trim().length > 0;

  return (
    <Card>
      <StepHeader
        title={t('creator_names_title')}
        subtitle={t('creator_names_subtitle')}
      />

      <div className="space-y-4">
        <TextInput
          label={t('creator_your_name')}
          value={draft.senderName}
          onChange={handleSenderNameChange}
          placeholder="Alex"
          error={draft.senderName.length > 0 && !draft.senderName.trim() ? t('creator_name_required') : undefined}
        />

        <TextInput
          label={t('creator_recipient_name')}
          value={draft.recipientName}
          onChange={handleRecipientNameChange}
          placeholder="Jordan"
          error={draft.recipientName.length > 0 && !draft.recipientName.trim() ? t('creator_name_required') : undefined}
        />
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={onNext} disabled={!isValid} fullWidth size="lg">
          {t('next')}
        </PrimaryButton>
      </div>
    </Card>
  );
}
