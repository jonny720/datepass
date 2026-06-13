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
  {
    en: 'Quack responsibly.',
    he: 'געגעו באחריות.',
  },
  {
    en: 'The duck has reviewed the invitation and has notes.',
    he: 'הברווז עבר על ההזמנה ויש לו הערות.',
  },
  {
    en: 'This duck charges by the quack.',
    he: 'הברווז הזה גובה לפי געגע.',
  },
  {
    en: 'No ducks were consulted during planning.',
    he: 'לא התייעצו עם ברווזים בזמן התכנון.',
  },
  {
    en: 'The duck says the vibes are statistically unusual.',
    he: 'הברווז אומר שהווייבים חריגים סטטיסטית.',
  },
  {
    en: 'Tiny duck. Large opinions.',
    he: 'ברווז קטן. דעות גדולות.',
  },
  {
    en: 'The duck is pretending this was intentional.',
    he: 'הברווז מעמיד פנים שזה היה בכוונה.',
  },
  {
    en: 'Duck detected. Productivity reduced.',
    he: 'זוהה ברווז. הפרודוקטיביות ירדה.',
  },
  {
    en: 'The duck refuses to explain itself.',
    he: 'הברווז מסרב להסביר את עצמו.',
  },
  {
    en: 'This is now a duck-approved operation.',
    he: 'זו עכשיו פעולה באישור ברווז.',
  },
  {
    en: 'The duck brought no snacks. Suspicious.',
    he: 'הברווז לא הביא חטיפים. חשוד.',
  },
  {
    en: 'The duck has entered stealth mode badly.',
    he: 'הברווז נכנס למצב התגנבות בצורה גרועה.',
  },
  {
    en: 'Quack if you think this is legally binding.',
    he: 'געגע אם זה נראה לך מחייב משפטית.',
  },
  {
    en: 'The duck is emotionally invested now.',
    he: 'הברווז כבר מעורב רגשית.',
  },
  {
    en: 'You clicked the duck. The duck will remember this.',
    he: 'לחצת על הברווז. הברווז יזכור את זה.',
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
