import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft, InviteType } from '@/types';
import { INVITE_TYPE_ORDER, getInviteTypeConfig } from '@/config/inviteTypes';
import { Card, OptionCard, StepHeader } from '@/components/ui';

interface InviteTypeStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
}

const TYPE_EMOJIS: Record<InviteType, string> = {
  date: '💌',
  birthday: '🎂',
  'friends-night': '🎲',
};

export function InviteTypeStep({ draft, updateDraft, onNext }: InviteTypeStepProps) {
  const { t, language } = useLanguage();

  const handleSelect = (inviteType: InviteType) => {
    const config = getInviteTypeConfig(inviteType);
    const activityIds = draft.activityIds.filter((id) =>
      config.activityOptions.includes(id)
    );

    updateDraft({
      inviteType,
      theme: config.defaultTheme,
      activityIds,
      introCards: [],
    });
    onNext();
  };

  return (
    <Card>
      <StepHeader title={t('creator_type_title')} subtitle="" />

      <div className="space-y-3">
        {INVITE_TYPE_ORDER.map((inviteType) => {
          const config = getInviteTypeConfig(inviteType);

          return (
            <OptionCard
              key={inviteType}
              selected={(draft.inviteType || 'date') === inviteType}
              onClick={() => handleSelect(inviteType)}
              icon={<span className="text-2xl leading-none">{TYPE_EMOJIS[inviteType]}</span>}
              title={config.labels[language]}
              description={config.subtitles[language]}
              compact
            />
          );
        })}
      </div>
    </Card>
  );
}
