import type { HumorLevel, Language, InviteType } from '@/types';
import { getInviteTypeConfig } from './inviteTypes';

type LocalizedList = Record<Language, string[]>;
type LocalizedText = Record<Language, string>;

const DEFAULT_HUMOR: HumorLevel = 'normal';

export const NO_BUTTON_LABELS_BY_HUMOR: Record<HumorLevel, LocalizedList> = {
  soft: {
    en: ['No worries', 'That is okay', 'Still okay to say no', 'No pressure'],
    he: ['אין בעיה', 'זה לגמרי בסדר', 'מותר גם לא', 'בלי לחץ'],
  },
  normal: {
    en: ['Maybe another time', 'Are you sure?', 'Almost', 'Nice try', 'Still trying?', 'Persistent, huh?', 'Fine, you can click me now'],
    he: ['אולי בפעם אחרת', 'בטוח/ה?', 'כמעט', 'ניסיון יפה', 'עדיין מנסה?', 'עקשן/ית, אה?', 'טוב, עכשיו באמת אפשר ללחוץ'],
  },
  chaos: {
    en: ['Absolutely not the fun button', 'This button has left the meeting', 'Denied by the vibe council', 'Try again, brave soul', 'The button is negotiating', 'Legal says maybe', 'Fine. The chaos permits it'],
    he: ['זה ממש לא הכפתור הכיפי', 'הכפתור יצא מהישיבה', 'נדחה על ידי ועדת הווייב', 'נסו שוב, אמיצים', 'הכפתור מנהל משא ומתן', 'המחלקה המשפטית אומרת אולי', 'טוב. הכאוס מאשר'],
  },
};

export const NO_BUTTON_PERSISTENCE_BY_HUMOR: Record<HumorLevel, LocalizedText> = {
  soft: {
    en: 'No pressure. The playful button is just being dramatic.',
    he: 'בלי לחץ. הכפתור פשוט קצת דרמטי.',
  },
  normal: {
    en: 'Respect for the persistence.',
    he: 'מכבדים את ההתמדה.',
  },
  chaos: {
    en: 'The refusal department is experiencing theatrical turbulence.',
    he: 'מחלקת הסירובים חווה טלטלה תיאטרלית.',
  },
};

export const CONFIRMATION_SUBTITLES_BY_HUMOR: Record<HumorLevel, LocalizedText> = {
  soft: {
    en: 'Here is the plan, nice and simple',
    he: 'הנה התוכנית, פשוט ונעים',
  },
  normal: {
    en: "Here's what we agreed on",
    he: 'הנה מה שסיכמנו',
  },
  chaos: {
    en: 'The plan survived the vibe audit',
    he: 'התוכנית שרדה את ביקורת הווייב',
  },
};

export const SCORE_DISCLAIMERS_BY_HUMOR: Record<HumorLevel, LocalizedList> = {
  soft: {
    en: ['A friendly estimate.', 'Mostly vibes, gently measured.', 'Looks promising enough.'],
    he: ['הערכה ידידותית.', 'בעיקר וייבים, נמדדו בעדינות.', 'נראה מבטיח מספיק.'],
  },
  normal: {
    en: ['Source: advanced guessing.', 'Scientifically questionable. Emotionally convincing.', 'Calculated using highly suspicious mathematics.', 'Results verified by nobody.'],
    he: ['מקור: ניחוש מתקדם.', 'מדעית מפוקפק. רגשית משכנע.', 'חושב באמצעות מתמטיקה חשודה מאוד.', 'התוצאות לא אומתו על ידי אף אחד.'],
  },
  chaos: {
    en: ['Certified by a spreadsheet with feelings.', 'The numbers screamed yes.', 'Peer reviewed by dramatic intuition.', 'Statistically impossible, emotionally approved.'],
    he: ['אושר על ידי גיליון עם רגשות.', 'המספרים צעקו כן.', 'עבר ביקורת עמיתים של אינטואיציה דרמטית.', 'סטטיסטית בלתי אפשרי, רגשית מאושר.'],
  },
};

export const CALCULATION_STEPS_BY_HUMOR: Record<HumorLevel, Record<Language, Record<InviteType, string[]>>> = {
  soft: {
    en: {
      date: ['Checking the vibe gently...', 'Looking for a good time...', 'Keeping expectations kind...'],
      birthday: ['Checking celebration energy...', 'Making room for cake...', 'Keeping things easy...'],
      'friends-night': ['Checking group energy...', 'Estimating snack comfort...', 'Keeping the plan flexible...'],
      custom: ['Reading the plan softly...', 'Checking basic vibes...', 'Keeping it simple...'],
    },
    he: {
      date: ['בודקים את הווייב בעדינות...', 'מחפשים זמן טוב...', 'שומרים על ציפיות נעימות...'],
      birthday: ['בודקים אנרגיית חגיגה...', 'משאירים מקום לעוגה...', 'שומרים על זה קליל...'],
      'friends-night': ['בודקים אנרגיה קבוצתית...', 'מעריכים נוחות חטיפים...', 'שומרים על תוכנית גמישה...'],
      custom: ['קוראים את התוכנית בעדינות...', 'בודקים וייב בסיסי...', 'שומרים על זה פשוט...'],
    },
  },
  normal: {
    en: {
      date: getInviteTypeConfig('date').calculationSteps.en,
      birthday: getInviteTypeConfig('birthday').calculationSteps.en,
      'friends-night': getInviteTypeConfig('friends-night').calculationSteps.en,
      custom: getInviteTypeConfig('custom').calculationSteps.en,
    },
    he: {
      date: getInviteTypeConfig('date').calculationSteps.he,
      birthday: getInviteTypeConfig('birthday').calculationSteps.he,
      'friends-night': getInviteTypeConfig('friends-night').calculationSteps.he,
      custom: getInviteTypeConfig('custom').calculationSteps.he,
    },
  },
  chaos: {
    en: {
      date: ['Running chemistry through a dramatic machine...', 'Cross-examining the calendar...', 'Inventing numbers with confidence...', 'Approving the suspiciously good plan...'],
      birthday: ['Measuring cake gravity...', 'Consulting the confetti authorities...', 'Overestimating celebration power...', 'Declaring the party statistically necessary...'],
      'friends-night': ['Calculating snack destiny...', 'Stress-testing questionable decisions...', 'Summoning group-chat energy...', 'Declaring maximum acceptable nonsense...'],
      custom: ['Interrogating the plan...', 'Shaking the vibe meter...', 'Adding unnecessary confidence...', 'Stamping this as probably iconic...'],
    },
    he: {
      date: ['מעבירים כימיה במכונה דרמטית...', 'חוקרים את היומן בחקירה נגדית...', 'ממציאים מספרים בביטחון...', 'מאשרים תוכנית חשודה לטובה...'],
      birthday: ['מודדים כוח משיכה של עוגה...', 'מתייעצים עם רשויות הקונפטי...', 'מפריזים באנרגיית חגיגה...', 'מכריזים שהמסיבה הכרחית סטטיסטית...'],
      'friends-night': ['מחשבים גורל חטיפים...', 'בודקים החלטות מפוקפקות בעומס...', 'מזמנים אנרגיית קבוצת וואטסאפ...', 'מכריזים על שטויות ברמה מותרת...'],
      custom: ['חוקרים את התוכנית...', 'מנערים את מד הווייב...', 'מוסיפים ביטחון לא נחוץ...', 'חותמים שזה כנראה אייקוני...'],
    },
  },
};

export const STAMP_MESSAGES_BY_HUMOR: Record<HumorLevel, LocalizedList> = {
  soft: {
    en: ['Approved with gentle enthusiasm.', 'Official enough, kindly.', 'A small stamp of approval.'],
    he: ['אושר בהתלהבות עדינה.', 'רשמי מספיק, בנעימות.', 'חותמת אישור קטנה.'],
  },
  normal: {
    en: ['Approved by a highly questionable committee.', 'Official enough.', 'This stamp has no legal value.'],
    he: ['אושר על ידי ועדה מפוקפקת במיוחד.', 'רשמי מספיק.', 'לחותמת הזאת אין שום תוקף משפטי.'],
  },
  chaos: {
    en: ['Stamped by the department of unnecessary certainty.', 'Legally meaningless. Emotionally loud.', 'This stamp kicked the door open.'],
    he: ['נחתם על ידי מחלקת הביטחון הלא נחוץ.', 'חסר תוקף משפטי. רועש רגשית.', 'החותמת הזאת פתחה את הדלת בבעיטה.'],
  },
};

export const SECRET_MESSAGES_BY_HUMOR: Record<HumorLevel, LocalizedList> = {
  soft: {
    en: ['You found a tiny bonus.', 'A small secret says hello.', 'Curiosity noted kindly.'],
    he: ['מצאת בונוס קטן.', 'סוד קטן אומר שלום.', 'הסקרנות נרשמה בעדינות.'],
  },
  normal: {
    en: ['This secret has no role in the process.', 'You found the completely unnecessary secret.', 'The secret approves. For unclear reasons.'],
    he: ['לסוד הזה אין שום תפקיד בתהליך.', 'מצאת את הסוד המיותר לחלוטין.', 'הסוד מאשר. מסיבות לא ברורות.'],
  },
  chaos: {
    en: ['The secret has entered the chat with a clipboard.', 'A tiny committee is now emotionally invested.', 'This was not planned, which makes it official.'],
    he: ['הסוד נכנס לצאט עם קלסר.', 'ועדה קטנה מעורבת רגשית עכשיו.', 'זה לא תוכנן, ולכן זה רשמי.'],
  },
};

export function resolveHumorLevel(level?: HumorLevel): HumorLevel {
  return level || DEFAULT_HUMOR;
}

export function pickHumorMessage(
  messages: LocalizedList,
  language: Language,
  previousMessage?: string
): string {
  const availableMessages = messages[language].filter((message) => message !== previousMessage);
  const pool = availableMessages.length > 0 ? availableMessages : messages[language];
  return pool[Math.floor(Math.random() * pool.length)];
}
