import type { Language } from '@/types';

interface DuckMessage {
  en: string;
  he: string;
}

export const DUCK_MESSAGES: DuckMessage[] = [
  {
    en: 'This duck has no role in the process.',
    he: 'לברווז הזה אין שום תפקיד בתהליך.',
  },
  {
    en: 'You found the completely unnecessary duck.',
    he: 'מצאת את הברווז המיותר לחלוטין.',
  },
  {
    en: 'The duck approves. For unclear reasons.',
    he: 'הברווז מאשר. מסיבות לא ברורות.',
  },
];

export function getRandomDuckMessage(language: Language): string {
  const message = DUCK_MESSAGES[Math.floor(Math.random() * DUCK_MESSAGES.length)];
  return message[language];
}

export function shouldShowDuck(): boolean {
  return Math.random() < 0.2; // 20% probability
}
