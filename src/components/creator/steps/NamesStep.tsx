import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft, RecipientGender } from '@/types';
import {
  Card,
  OptionCard,
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
  const { t, language } = useLanguage();
  const [privatePopupMessage, setPrivatePopupMessage] = useState('');

  const handleSenderNameChange = (value: string) => {
    updateDraft({ senderName: value });
  };

  const handleRecipientNameChange = (value: string) => {
    updateDraft({ recipientName: value });
  };

  const handleGenderSelect = (recipientGender: RecipientGender) => {
    updateDraft({ recipientGender });
    if (recipientGender === 'private') {
      setPrivatePopupMessage(getPrivateGenderMessage(language));
      window.setTimeout(() => setPrivatePopupMessage(''), 2600);
    }
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

        <div>
          <p className="mb-2 text-sm font-medium text-stone-700">
            {t('creator_recipient_gender_label')}
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {RECIPIENT_GENDER_OPTIONS.map((option) => (
              <OptionCard
                key={option.id}
                selected={draft.recipientGender === option.id}
                onClick={() => handleGenderSelect(option.id)}
                title={t(option.labelKey)}
                compact
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={onNext} disabled={!isValid} fullWidth size="lg">
          {t('next')}
        </PrimaryButton>
      </div>
      {privatePopupMessage && createPortal(
        <div className="fixed inset-x-0 top-24 z-[100] flex justify-center px-4">
          <div className="rounded-xl bg-stone-900 px-6 py-4 text-center text-sm text-white shadow-2xl">
            {privatePopupMessage}
          </div>
        </div>,
        document.body
      )}
    </Card>
  );
}

const RECIPIENT_GENDER_OPTIONS: Array<{
  id: RecipientGender;
  labelKey: 'creator_recipient_gender_male' | 'creator_recipient_gender_female' | 'creator_recipient_gender_private';
}> = [
  { id: 'male', labelKey: 'creator_recipient_gender_male' },
  { id: 'female', labelKey: 'creator_recipient_gender_female' },
  { id: 'private', labelKey: 'creator_recipient_gender_private' },
];

function getPrivateGenderMessage(language: 'en' | 'he') {
  const messages = language === 'he'
    ? [
        'סליחה, הברווז אמר שזה עדיין קצת ענייננו.',
        'בסדר בסדר, לא שואלים. רק מתאימים ניסוח בשקט.',
        'מסתורי. מכובד. מעט דרמטי.',
        'קיבלנו. נשאיר את הסקרנות במגירה.',
        'המידע סווג ברמת “עזבו אותי”.',
        'צודק/ת. זו הייתה שאלה חטטנית עם כוונות טובות.',
        'המערכת מסמיקה וממשיכה הלאה.',
        'נרשם בפרוטוקול: לא ענייננו, אבל בנימוס.',
        'הברווז לחש “בסדר, הבנו”.',
        'בחירה מסתורית. האפליקציה תתמודד.',
        'הגבול הוצב. אנחנו עומדים מאחוריו במבוכה.',
      ]
    : [
        'Sorry, the app asked before thinking.',
        'Fair. We will mind our tiny invitation business.',
        'Mysterious. Respectable. Slightly dramatic.',
        'Understood. Curiosity has been escorted out.',
        'Classified under: absolutely none of our business.',
        'Fair point. The app is looking respectfully away.',
        'Noted. The form regrets its nosiness.',
        'Mystery selected. The invitation will survive.',
        'Respectfully backing away from the question.',
        'That answer has main-character privacy energy.',
      ];
  return messages[Math.floor(Math.random() * messages.length)];
}
