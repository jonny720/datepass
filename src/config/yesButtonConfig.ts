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
