import type { HumorLevel, Language } from '@/types';
import { SECRET_MESSAGES_BY_HUMOR, pickHumorMessage, resolveHumorLevel } from './humorCopy';

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

export const ANNOYED_DUCK_MESSAGES: DuckMessage[] = [
  { en: 'Okay, that was one tap too many.', he: 'טוב, זו כבר נגיעה אחת יותר מדי.' },
  { en: 'Please stop poking the duck.', he: 'די להציק לברווז.' },
  { en: 'The duck has boundaries.', he: 'גם לברווז יש גבולות.' },
  { en: 'This duck did not consent to unlimited tapping.', he: 'הברווז לא אישר נגיעות ללא הגבלה.' },
  { en: 'You have officially annoyed the duck.', he: 'הצלחת לעצבן את הברווז רשמית.' },
  { en: 'The duck is considering legal action.', he: 'הברווז שוקל צעדים משפטיים.' },
  { en: 'Still tapping? Bold choice.', he: 'עדיין נוגעים? בחירה אמיצה.' },
  { en: 'The duck has left emotionally.', he: 'הברווז עזב רגשית.' },
  { en: 'That is enough duck interaction for today.', he: 'זה מספיק אינטראקציה עם ברווז להיום.' },
  { en: 'The duck remembers everything.', he: 'הברווז זוכר הכול.' },
  { en: 'Quack means no.', he: 'קוואק אומר לא.' },
];

export function getRandomDuckMessage(
  language: Language,
  previousMessage?: string,
  humorLevel?: HumorLevel
): string {
  const resolvedHumorLevel = resolveHumorLevel(humorLevel);
  return pickHumorMessage(
    SECRET_MESSAGES_BY_HUMOR[resolvedHumorLevel],
    language,
    previousMessage
  );
}

export function getAnnoyedDuckMessage(language: Language, tapCount: number): string {
  const index = Math.max(0, tapCount - 4) % ANNOYED_DUCK_MESSAGES.length;
  return ANNOYED_DUCK_MESSAGES[index][language];
}

export function shouldShowDuck(): boolean {
  return true;
}
