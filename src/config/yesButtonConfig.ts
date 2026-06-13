import type { YesButtonCopy, Language } from '@/types';

interface YesButtonOption {
  id: YesButtonCopy;
  label: {
    en: string;
    he: string;
  };
}

export const YES_BUTTON_OPTIONS: YesButtonOption[] = [
  {
    id: 'yes_lets_do',
    label: {
      en: "Yes, let's do it",
      he: 'יאללה, אני בפנים',
    },
  },
  {
    id: 'im_in',
    label: {
      en: "I'm in",
      he: 'אני בעניין',
    },
  },
  {
    id: 'you_convinced',
    label: {
      en: 'You convinced me',
      he: 'שכנעת אותי',
    },
  },
  {
    id: 'okay_worked',
    label: {
      en: 'Okay, that worked',
      he: 'טוב, זה עבד',
    },
  },
  {
    id: 'fine_cute',
    label: {
      en: 'Fine, this was cute',
      he: 'בסדר, זה היה חמוד',
    },
  },
  {
    id: 'im_coming',
    label: {
      en: "I'm coming",
      he: 'אני מגיע/ה',
    },
  },
  {
    id: 'wouldnt_miss_it',
    label: {
      en: "Wouldn't miss it",
      he: 'לא אפספס',
    },
  },
  {
    id: 'count_me_in',
    label: {
      en: 'Count me in',
      he: 'תספרו אותי',
    },
  },
  {
    id: 'obviously_yes',
    label: {
      en: 'Obviously yes',
      he: 'ברור שכן',
    },
  },
  {
    id: 'say_less',
    label: {
      en: 'Say less',
      he: 'לא צריך לשכנע',
    },
  },
  {
    id: 'obviously',
    label: {
      en: 'Obviously',
      he: 'ברור',
    },
  },
  {
    id: 'dangerous_im_in',
    label: {
      en: "This sounds dangerous, I'm in",
      he: 'זה נשמע מסוכן, אני בפנים',
    },
  },
];

export function getYesButtonLabel(
  yesButtonCopy: YesButtonCopy | undefined,
  language: Language
): string {
  const defaultCopy = 'yes_lets_do';
  const copy = yesButtonCopy || defaultCopy;
  const option = YES_BUTTON_OPTIONS.find((opt) => opt.id === copy);
  return option ? option.label[language] : YES_BUTTON_OPTIONS[0].label[language];
}
