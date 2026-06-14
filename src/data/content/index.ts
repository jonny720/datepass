import type { InviteType, Language, IntroTone, ThemeId } from '@/types';
import { INTRO_PROMPTS_EN, type TonedIntroPrompt } from './introPrompts.en';
import { INTRO_PROMPTS_HE } from './introPrompts.he';

export type { TonedIntroPrompt };

const TYPE_PROMPTS: Record<Exclude<InviteType, 'date'>, Record<Language, TonedIntroPrompt[]>> = {
  birthday: {
    en: [
      { id: 'birthday_know', tone: 'light', prompt: 'What you should know before arriving', answers: ['Cake may be involved. Expectations are high.'] },
      { id: 'birthday_rule', tone: 'light', prompt: 'The official birthday rule', answers: ['Nobody leaves before the good part.'] },
      { id: 'birthday_happen', tone: 'light', prompt: 'What will probably happen', answers: ['Food, music, and one overly dramatic toast.'] },
      { id: 'birthday_equipment', tone: 'light', prompt: 'Required equipment', answers: ['Good mood. Optional gift. Strong snack opinions.'] },
    ],
    he: [
      { id: 'birthday_know', tone: 'light', prompt: 'מה כדאי לדעת לפני שמגיעים', answers: ['כנראה תהיה עוגה. הציפיות גבוהות.'] },
      { id: 'birthday_rule', tone: 'light', prompt: 'חוק יום ההולדת הרשמי', answers: ['לא הולכים לפני החלק הטוב.'] },
      { id: 'birthday_happen', tone: 'light', prompt: 'מה כנראה יקרה', answers: ['אוכל, מוזיקה וברכה אחת דרמטית מדי.'] },
      { id: 'birthday_equipment', tone: 'light', prompt: 'ציוד חובה', answers: ['מצב רוח טוב. מתנה לא חובה. דעות חזקות על חטיפים.'] },
    ],
  },
  'friends-night': {
    en: [
      { id: 'friends_include', tone: 'light', prompt: 'The evening may include', answers: ['Snacks, games, and at least one terrible idea.'] },
      { id: 'friends_warning', tone: 'light', prompt: 'Important warning', answers: ['Nobody is allowed to take the score too seriously.'] },
      { id: 'friends_talent', tone: 'light', prompt: 'My unnecessary talent tonight', answers: ['Making simple plans weirdly competitive.'] },
      { id: 'friends_rule', tone: 'light', prompt: 'The official house rule', answers: ['Good vibes first. Winning second. Maybe.'] },
    ],
    he: [
      { id: 'friends_include', tone: 'light', prompt: 'הערב עשוי לכלול', answers: ['חטיפים, משחקים ולפחות רעיון גרוע אחד.'] },
      { id: 'friends_warning', tone: 'light', prompt: 'אזהרה חשובה', answers: ['אסור לקחת את התוצאה יותר מדי ברצינות.'] },
      { id: 'friends_talent', tone: 'light', prompt: 'הכישרון המיותר שלי הערב', answers: ['להפוך תוכניות פשוטות לתחרותיות מדי.'] },
      { id: 'friends_rule', tone: 'light', prompt: 'חוק הבית הרשמי', answers: ['וייב טוב קודם. ניצחון אחר כך. אולי.'] },
    ],
  },
  custom: {
    en: [
      { id: 'custom_plan', tone: 'light', prompt: 'The plan may include', answers: ['Good timing, good company, and a tiny bit of mystery.'] },
      { id: 'custom_reason', tone: 'light', prompt: 'Why this deserves a yes', answers: ['Because a regular message felt too plain.'] },
      { id: 'custom_vibe', tone: 'light', prompt: 'Current plan energy', answers: ['Flexible, optimistic, and lightly overproduced.'] },
      { id: 'custom_rule', tone: 'light', prompt: 'The only rule', answers: ['Say yes only if it actually sounds good.'] },
    ],
    he: [
      { id: 'custom_plan', tone: 'light', prompt: 'התוכנית עשויה לכלול', answers: ['תזמון טוב, חברה טובה וקצת מסתורין.'] },
      { id: 'custom_reason', tone: 'light', prompt: 'למה זה שווה כן', answers: ['כי הודעה רגילה הרגישה פשוטה מדי.'] },
      { id: 'custom_vibe', tone: 'light', prompt: 'אנרגיית התוכנית כרגע', answers: ['גמישה, אופטימית ומושקעת קצת יותר מדי.'] },
      { id: 'custom_rule', tone: 'light', prompt: 'החוק היחיד', answers: ['להגיד כן רק אם זה באמת נשמע טוב.'] },
    ],
  },
};

const THEME_PROMPTS: Partial<Record<ThemeId, Record<Language, TonedIntroPrompt[]>>> = {
  'black-tie': {
    en: [
      { id: 'black_tie_evening', tone: 'light', prompt: 'The evening may include', answers: ['Good conversation, better timing, and probably something worth dressing up for.', 'A proper drink, a little charm, and no rush.'] },
      { id: 'black_tie_detail', tone: 'light', prompt: 'Important detail', answers: ['I clean up well.', 'Elegance is encouraged. Overthinking is optional.'] },
      { id: 'black_tie_know', tone: 'light', prompt: 'What you should know', answers: ['I appreciate good manners, good humor, and people who arrive with presence.'] },
    ],
    he: [
      { id: 'black_tie_evening', tone: 'light', prompt: 'הערב עשוי לכלול', answers: ['שיחה טובה, תזמון טוב, וכנראה משהו ששווה להתלבש בשבילו.', 'דרינק כמו שצריך, קצת קסם, ובלי לחץ.'] },
      { id: 'black_tie_detail', tone: 'light', prompt: 'פרט חשוב', answers: ['אני יודע להיראות טוב כשצריך.', 'אלגנטיות מומלצת. חשיבת יתר — אופציונלית.'] },
      { id: 'black_tie_know', tone: 'light', prompt: 'מה כדאי לדעת', answers: ['אני מעריך נימוס, הומור טוב, ואנשים שמגיעים עם נוכחות.'] },
    ],
  },
  'power-play': {
    en: [
      { id: 'power_rule_one', tone: 'bold', prompt: 'Rule number one', answers: ['Nothing happens without a clear yes.', 'Boundaries are part of the game.', 'The rules can be playful. Consent is not optional.'] },
      { id: 'power_agreeing', tone: 'bold', prompt: 'What you are agreeing to', answers: ['A little tension, a little control, and a very clear escape route.', 'A private evening where the rules are negotiated first.', 'Curiosity, confidence, and no pressure.'] },
      { id: 'power_begin', tone: 'bold', prompt: 'Before we begin', answers: ['We choose the boundaries before we test them.', 'Safe word first. Trouble later.', 'You keep the right to stop the game at any moment.'] },
      { id: 'power_vibe', tone: 'bold', prompt: 'The vibe', answers: ['Dark, controlled, playful, and not entirely innocent.', 'A little restraint. A little tension. A lot of respect.', 'Private rules. Clear limits. Good chemistry.'] },
      { id: 'power_terms', tone: 'bold', prompt: 'Terms and conditions', answers: ['Read carefully. Misbehavior may be rewarded with eye contact.', 'By continuing, you agree to negotiate boundaries like a responsible adult.', 'The fine print says: consent first, confidence second.'] },
    ],
    he: [
      { id: 'power_rule_one', tone: 'bold', prompt: 'חוק מספר אחד', answers: ['לא קורה כלום בלי כן ברור.', 'גבולות הם חלק מהמשחק.', 'החוקים יכולים להיות שובבים. הסכמה היא לא אופציונלית.'] },
      { id: 'power_agreeing', tone: 'bold', prompt: 'למה מסכימים כאן', answers: ['קצת מתח, קצת שליטה, ודרך יציאה מאוד ברורה.', 'ערב פרטי שבו קודם מסכמים את החוקים.', 'סקרנות, ביטחון עצמי, ובלי לחץ.'] },
      { id: 'power_begin', tone: 'bold', prompt: 'לפני שמתחילים', answers: ['בוחרים את הגבולות לפני שבודקים אותם.', 'מילת ביטחון קודם. צרות אחר כך.', 'אפשר לעצור את המשחק בכל רגע.'] },
      { id: 'power_vibe', tone: 'bold', prompt: 'הווייב', answers: ['כהה, בשליטה, שובב, ולא לגמרי תמים.', 'קצת איפוק. קצת מתח. הרבה כבוד.', 'חוקים פרטיים. גבולות ברורים. כימיה טובה.'] },
      { id: 'power_terms', tone: 'bold', prompt: 'תנאי שימוש', answers: ['נא לקרוא בזהירות. התנהגות בעייתית עלולה לזכות בקשר עין.', 'בהמשך מאשרים לנהל משא ומתן על גבולות כמו מבוגרים אחראיים.', 'באותיות הקטנות כתוב: הסכמה קודם, ביטחון עצמי אחר כך.'] },
    ],
  },
};

export function getIntroPrompts(language: Language, tone: IntroTone, inviteType: InviteType = 'date', theme?: ThemeId): TonedIntroPrompt[] {
  if (theme && THEME_PROMPTS[theme]) {
    return THEME_PROMPTS[theme][language];
  }

  if (inviteType !== 'date') {
    return TYPE_PROMPTS[inviteType][language];
  }

  const allPrompts = language === 'he' ? INTRO_PROMPTS_HE : INTRO_PROMPTS_EN;
  return allPrompts.filter((prompt) => prompt.tone === tone);
}

/**
 * Get three recommended default prompts for a given tone
 * Returns the first 3 prompts of the specified tone
 */
export function getDefaultPrompts(language: Language, tone: IntroTone, inviteType: InviteType = 'date', theme?: ThemeId): TonedIntroPrompt[] {
  const prompts = getIntroPrompts(language, tone, inviteType, theme);
  return prompts.slice(0, 3);
}
