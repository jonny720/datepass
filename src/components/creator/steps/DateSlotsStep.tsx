import { Plus, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft, DateSlot } from '@/types';
import {
  Card,
  StepHeader,
  PrimaryButton,
  SecondaryButton,
} from '@/components/ui';

interface DateSlotsStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MAX_SLOTS = 3;

export function DateSlotsStep({ draft, updateDraft, onNext, onBack }: DateSlotsStepProps) {
  const { t } = useLanguage();

  const handleAddSlot = () => {
    if (draft.dateSlots.length < MAX_SLOTS) {
      const newSlot: DateSlot = {
        id: Date.now().toString(),
        date: '',
        time: '',
      };
      updateDraft({ dateSlots: [...draft.dateSlots, newSlot] });
    }
  };

  const handleRemoveSlot = (id: string) => {
    updateDraft({
      dateSlots: draft.dateSlots.filter((slot) => slot.id !== id),
    });
  };

  const handleSlotChange = (id: string, field: 'date' | 'time', value: string) => {
    updateDraft({
      dateSlots: draft.dateSlots.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot
      ),
    });
  };

  const handleSkip = () => {
    updateDraft({ dateSlots: [] });
    onNext();
  };

  return (
    <Card>
      <StepHeader
        title={t('creator_slots_title')}
        subtitle={t('creator_slots_subtitle')}
      />

      <div className="mb-6 space-y-3">
        {draft.dateSlots.map((slot) => (
          <div
            key={slot.id}
            className="w-full max-w-full rounded-xl border-2 border-stone-200 bg-white p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-2 min-w-0">
              <span className="text-sm font-medium text-stone-700 truncate">
                {t('creator_slots_date')} & {t('creator_slots_time')}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveSlot(slot.id)}
                className="flex-shrink-0 text-stone-400 hover:text-rose-500 transition-colors"
                aria-label="Remove slot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 w-full min-w-0">
              <div className="min-w-0 w-full">
                <label className="mb-1.5 block text-xs font-medium text-stone-600">
                  {t('creator_slots_date')}
                </label>
                <input
                  type="date"
                  value={slot.date}
                  onChange={(e) => handleSlotChange(slot.id, 'date', e.target.value)}
                  className="datepass-native-input"
                />
              </div>

              <div className="min-w-0 w-full">
                <label className="mb-1.5 block text-xs font-medium text-stone-600">
                  {t('creator_slots_time')}
                </label>
                <input
                  type="time"
                  value={slot.time}
                  onChange={(e) => handleSlotChange(slot.id, 'time', e.target.value)}
                  className="datepass-native-input"
                />
              </div>
            </div>
          </div>
        ))}

        {draft.dateSlots.length < MAX_SLOTS && (
          <button
            type="button"
            onClick={handleAddSlot}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 py-4 text-sm font-medium text-stone-600 transition-colors hover:border-stone-400 hover:bg-stone-100"
          >
            <Plus className="h-4 w-4" />
            {t('creator_slots_add')}
          </button>
        )}
      </div>

      <div className="flex gap-3">
        <SecondaryButton onClick={onBack} size="lg">
          {t('back')}
        </SecondaryButton>
        {draft.dateSlots.length === 0 ? (
          <PrimaryButton onClick={handleSkip} fullWidth size="lg">
            {t('creator_slots_skip')}
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={onNext} fullWidth size="lg">
            {t('next')}
          </PrimaryButton>
        )}
      </div>
    </Card>
  );
}
