import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft, ActivityId } from '@/types';
import { ACTIVITIES } from '@/data';
import {
  Card,
  StepHeader,
  PrimaryButton,
  SecondaryButton,
  OptionCard,
  InlineNotice,
} from '@/components/ui';

interface ActivitiesStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MIN_ACTIVITIES = 1;
const MAX_ACTIVITIES = 4;

export function ActivitiesStep({ draft, updateDraft, onNext, onBack }: ActivitiesStepProps) {
  const { t } = useLanguage();

  const handleActivityToggle = (activityId: ActivityId) => {
    const isSelected = draft.activityIds.includes(activityId);

    if (isSelected) {
      updateDraft({
        activityIds: draft.activityIds.filter((id) => id !== activityId),
      });
    } else if (draft.activityIds.length < MAX_ACTIVITIES) {
      updateDraft({
        activityIds: [...draft.activityIds, activityId],
      });
    }
  };

  const isValid =
    draft.activityIds.length >= MIN_ACTIVITIES &&
    draft.activityIds.length <= MAX_ACTIVITIES;

  return (
    <Card>
      <StepHeader
        title={t('creator_activities_title')}
        subtitle={t('creator_activities_subtitle')}
      />

      {!isValid && draft.activityIds.length > 0 && (
        <InlineNotice variant="warning" className="mb-4">
          {t('creator_activities_min_max')}
        </InlineNotice>
      )}

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {ACTIVITIES.map((activity) => {
          const Icon = activity.icon;
          const isSelected = draft.activityIds.includes(activity.id);

          return (
            <OptionCard
              key={activity.id}
              selected={isSelected}
              onClick={() => handleActivityToggle(activity.id)}
              icon={<Icon className="h-6 w-6" />}
              title={t(activity.titleKey as keyof typeof t)}
              description={t(activity.subtitleKey as keyof typeof t)}
              compact
            />
          );
        })}
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} size="lg">
          {t('back')}
        </SecondaryButton>
        <PrimaryButton onClick={onNext} disabled={!isValid} fullWidth size="lg">
          {t('next')}
        </PrimaryButton>
      </div>
    </Card>
  );
}
