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

export function getRandomDuckMessage(language: Language, previousMessage?: string): string {
  const availableMessages = DUCK_MESSAGES.filter(
    (message) => message[language] !== previousMessage
  );
  const messages = availableMessages.length > 0 ? availableMessages : DUCK_MESSAGES;
  const message = messages[Math.floor(Math.random() * messages.length)];
  return message[language];
}

export function shouldShowDuck(): boolean {
  return true;
}
