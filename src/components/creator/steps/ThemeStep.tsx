import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import type { CreatorDraft, ThemeId } from '@/types';
import { THEME_CONFIGS, THEME_IDS } from '@/config/themes';
import { getInviteTypeConfig } from '@/config/inviteTypes';
import {
  ADULT_THEMES_STORAGE_KEY,
  ENABLE_ADULT_THEMES,
  isAdultThemeId,
  isAdultThemeUnlockCode,
} from '@/config/adultThemesConfig';
import {
  Card,
  StepHeader,
  PrimaryButton,
  SecondaryButton,
  OptionCard,
  TextInput,
  ConfirmDialog,
} from '@/components/ui';

interface ThemeStepProps {
  draft: CreatorDraft;
  updateDraft: (updates: Partial<CreatorDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ThemeStep({ draft, updateDraft, onNext, onBack }: ThemeStepProps) {
  const { t, language } = useLanguage();
  const [adultThemesUnlocked, setAdultThemesUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(ADULT_THEMES_STORAGE_KEY) === 'true';
  });
  const [unlockInput, setUnlockInput] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [pendingAdultTheme, setPendingAdultTheme] = useState<ThemeId | null>(null);
  const inviteTypeConfig = getInviteTypeConfig(draft.inviteType);
  const orderedThemeIds = useMemo(() => {
    const ordered = [
      ...inviteTypeConfig.recommendedThemes,
      ...THEME_IDS.filter((themeId) => !inviteTypeConfig.recommendedThemes.includes(themeId)),
    ];

    if (!ENABLE_ADULT_THEMES || adultThemesUnlocked) return ordered;
    return ordered.filter((themeId) => !isAdultThemeId(themeId));
  }, [adultThemesUnlocked, inviteTypeConfig.recommendedThemes]);

  useEffect(() => {
    if (adultThemesUnlocked || !isAdultThemeId(draft.theme)) return;
    updateDraft({ theme: orderedThemeIds[0] || 'cruise' });
  }, [adultThemesUnlocked, draft.theme, orderedThemeIds, updateDraft]);

  const handleThemeSelect = (themeId: ThemeId) => {
    if (themeId === 'power-play') {
      setPendingAdultTheme(themeId);
      return;
    }

    updateDraft({ theme: themeId });
  };

  const handleOpeningMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 100); // Enforce max length
    updateDraft({ openingMessage: value });
  };

  const handleAdultThemeUnlock = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAdultThemeUnlockCode(unlockInput)) {
      setUnlockError(language === 'he' ? 'קוד שגוי.' : 'Wrong code.');
      return;
    }

    window.localStorage.setItem(ADULT_THEMES_STORAGE_KEY, 'true');
    setAdultThemesUnlocked(true);
    setUnlockInput('');
    setUnlockError('');
  };

  const remainingChars = 100 - (draft.openingMessage?.length || 0);

  return (
    <Card>
      <StepHeader
        title={t('creator_theme_title')}
        subtitle={t('creator_theme_subtitle')}
      />

      <div className="mb-6 space-y-3">
        {orderedThemeIds.map((themeId) => {
          const theme = THEME_CONFIGS[themeId];
          const Icon = theme.icon;
          const themeKey = themeId.replace(/-/g, '_');
          const titleKey = `creator_theme_${themeKey}`;
          const descKey = `creator_theme_${themeKey}_desc`;
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

      {ENABLE_ADULT_THEMES && !adultThemesUnlocked && (
        <form
          onSubmit={handleAdultThemeUnlock}
          className="mb-6 rounded-xl border border-stone-200 bg-stone-50 p-4"
        >
          <div className="mb-3">
            <p className="text-sm font-semibold text-stone-800">
              {language === 'he' ? 'פתיחת נושאים למבוגרים' : 'Unlock adult themes'}
            </p>
            <p className="mt-1 text-xs text-stone-500">
              {language === 'he'
                ? 'הזינו קוד כדי להציג את הנושאים הנוספים.'
                : 'Enter the code to show the extra themes.'}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TextInput
              id="adult-theme-unlock-code"
              value={unlockInput}
              onChange={(value) => {
                setUnlockInput(value);
                setUnlockError('');
              }}
              error={unlockError}
              inputMode="numeric"
              autoComplete="off"
              placeholder={language === 'he' ? 'קוד פתיחה' : 'Unlock code'}
              className="bg-white"
            />
            <PrimaryButton type="submit" size="md" className="sm:self-start">
              {language === 'he' ? 'פתיחה' : 'Unlock'}
            </PrimaryButton>
          </div>
        </form>
      )}

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
      <ConfirmDialog
        isOpen={pendingAdultTheme === 'power-play'}
        title={language === 'he' ? 'ערכת משחקי שליטה למבוגרים' : 'Adult power-play theme'}
        description={
          language === 'he'
            ? 'הערכה משתמשת בטון בוגר ונועז יותר סביב שליטה, חוקים, גבולות והסכמה. כדאי להשתמש בה רק אם ברור שהצד השני בנוח עם הזמנה בסגנון הזה.'
            : 'This theme uses a stronger adult tone around control, rules, boundaries, and consent. Use it only when the recipient is clearly comfortable with this kind of invitation.'
        }
        confirmLabel={language === 'he' ? 'להשתמש בערכה' : 'Use this theme'}
        cancelLabel={language === 'he' ? 'ביטול' : 'Cancel'}
        onConfirm={() => {
          updateDraft({ theme: 'power-play' });
          setPendingAdultTheme(null);
        }}
        onCancel={() => setPendingAdultTheme(null)}
      />
    </Card>
  );
}
