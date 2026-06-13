import type { ActivityId, InviteType, Language, ThemeId, YesButtonCopy } from '@/types';

export type ActivityOption = ActivityId;
export type YesCopyOption = YesButtonCopy;

export interface ShareCopyPreset {
  id: string;
  message: Record<Language, string>;
}

export interface InviteTypeConfig {
  id: InviteType;
  labels: Record<Language, string>;
  subtitles: Record<Language, string>;
  mainQuestion: Record<Language, string>;
  questionSubtitle: Record<Language, string>;
  openingSubtitle: Record<Language, string>;
  defaultTheme: ThemeId;
  recommendedThemes: ThemeId[];
  activityOptions: ActivityOption[];
  yesCopyOptions: YesCopyOption[];
  noCopyOptions: Record<Language, string[]>;
  shareCopyPresets: ShareCopyPreset[];
  confirmationIntro: Record<Language, string>;
  scoreLabel: Record<Language, string>;
  calculationSteps: Record<Language, string[]>;
}

export const INVITE_TYPE_ORDER: InviteType[] = ['date', 'birthday', 'friends-night'];

export const INVITE_TYPE_CONFIGS: Record<InviteType, InviteTypeConfig> = {
  date: {
    id: 'date',
    labels: {
      en: 'Date invite',
      he: 'הזמנה לדייט',
    },
    subtitles: {
      en: 'Ask someone out in a playful way.',
      he: 'להציע לצאת בצורה קלילה ומצחיקה.',
    },
    mainQuestion: {
      en: 'So, what do you think?',
      he: 'אז… מה דעתך?',
    },
    questionSubtitle: {
      en: 'Want to go out with me?',
      he: 'בא לך לצאת איתי?',
    },
    openingSubtitle: {
      en: 'A small invitation is waiting for you.',
      he: 'הזמנה קטנה מחכה לך.',
    },
    defaultTheme: 'cruise',
    recommendedThemes: ['cruise', 'nature', 'after_dark', 'temptation', 'secret_mission', 'party'],
    activityOptions: ['coffee', 'drinks', 'restaurant', 'sunset-walk', 'movie', 'competitive', 'creative', 'surprise-me'],
    yesCopyOptions: ['yes_lets_do', 'im_in', 'you_convinced', 'okay_worked', 'fine_cute'],
    noCopyOptions: {
      en: ['Maybe another time', 'Are you sure?', 'Almost', 'Nice try', 'Still trying?', 'Persistent, huh?', 'Fine, you can click me now'],
      he: ['אולי בפעם אחרת', 'בטוחה?', 'כמעט', 'ניסיון יפה', 'עדיין מנסה?', 'עקשנית, אה?', 'טוב, עכשיו באמת אפשר ללחוץ'],
    },
    shareCopyPresets: [
      {
        id: 'date_1',
        message: {
          en: 'I made something small for you 🙂',
          he: 'יש לי משהו קטן בשבילך 🙂',
        },
      },
      {
        id: 'date_2',
        message: {
          en: 'I thought asking you out on WhatsApp was too boring.',
          he: 'חשבתי שלהציע לך לצאת בוואטסאפ זה קצת משעמם מדי.',
        },
      },
    ],
    confirmationIntro: {
      en: 'I accepted the invitation 😌',
      he: 'אישרתי את ההזמנה 😌',
    },
    scoreLabel: {
      en: 'Compatibility',
      he: 'התאמה',
    },
    calculationSteps: {
      en: ['Analyzing chemistry...', 'Checking calendar alignment...', 'Inventing impressive numbers...'],
      he: ['מנתחים כימיה...', 'בודקים התאמת יומנים...', 'ממציאים מספרים מרשימים...'],
    },
  },
  birthday: {
    id: 'birthday',
    labels: {
      en: 'Birthday invite',
      he: 'הזמנה ליום הולדת',
    },
    subtitles: {
      en: 'Invite people to celebrate with you.',
      he: 'להזמין אנשים לחגוג איתך.',
    },
    mainQuestion: {
      en: 'Are you coming to celebrate with me?',
      he: 'בא לך לבוא לחגוג איתי?',
    },
    questionSubtitle: {
      en: 'You are officially invited to celebrate.',
      he: 'הוזמנת רשמית לחגוג.',
    },
    openingSubtitle: {
      en: 'You are officially invited to celebrate.',
      he: 'הוזמנת רשמית לחגוג.',
    },
    defaultTheme: 'party',
    recommendedThemes: ['party', 'nature', 'secret_mission'],
    activityOptions: ['cake', 'food', 'drinks', 'music', 'games', 'surprise-me'],
    yesCopyOptions: ['im_coming', 'wouldnt_miss_it', 'count_me_in', 'obviously_yes'],
    noCopyOptions: {
      en: ["Can't make it", 'Are you sure?', 'Suspicious choice', 'Last chance', 'Fine, you can click me now'],
      he: ['לא מסתדר', 'בטוח/ה?', 'בחירה חשודה', 'הזדמנות אחרונה', 'טוב, עכשיו באמת אפשר ללחוץ'],
    },
    shareCopyPresets: [
      {
        id: 'birthday_1',
        message: {
          en: 'You are officially invited to celebrate 🎂',
          he: 'הוזמנת רשמית לחגוג 🎂',
        },
      },
      {
        id: 'birthday_2',
        message: {
          en: 'A small birthday plan is waiting for you.',
          he: 'תוכנית יום הולדת קטנה מחכה לך.',
        },
      },
    ],
    confirmationIntro: {
      en: 'I accepted the invitation 🎉',
      he: 'אישרתי הגעה 🎉',
    },
    scoreLabel: {
      en: 'Vibe match',
      he: 'התאמת וייב',
    },
    calculationSteps: {
      en: ['Checking cake probability...', 'Estimating celebration energy...', 'Ignoring scientific standards...'],
      he: ['בודקים הסתברות לעוגה...', 'מעריכים אנרגיית חגיגה...', 'מתעלמים מסטנדרטים מדעיים...'],
    },
  },
  'friends-night': {
    id: 'friends-night',
    labels: {
      en: 'Friends night',
      he: 'ערב חברים',
    },
    subtitles: {
      en: 'Plan a casual night with friends.',
      he: 'לתכנן ערב קליל עם חברים.',
    },
    mainQuestion: {
      en: 'Are you in for friends night?',
      he: 'בא לך להצטרף לערב חברים?',
    },
    questionSubtitle: {
      en: 'A very important evening is being planned.',
      he: 'ערב חשוב מאוד נמצא בתכנון.',
    },
    openingSubtitle: {
      en: 'A very important evening is being planned.',
      he: 'ערב חשוב מאוד נמצא בתכנון.',
    },
    defaultTheme: 'party',
    recommendedThemes: ['party', 'secret_mission', 'nature'],
    activityOptions: ['playstation', 'board-games', 'pizza', 'movie', 'bbq', 'karaoke', 'surprise-me'],
    yesCopyOptions: ['im_in', 'say_less', 'obviously', 'dangerous_im_in'],
    noCopyOptions: {
      en: ["Can't make it", 'Are you sure?', 'Suspicious choice', 'Last chance', 'Fine, you can click me now'],
      he: ['לא מסתדר', 'בטוח/ה?', 'בחירה חשודה', 'הזדמנות אחרונה', 'טוב, עכשיו באמת אפשר ללחוץ'],
    },
    shareCopyPresets: [
      {
        id: 'friends_1',
        message: {
          en: 'A very important evening is being planned 🎲',
          he: 'ערב חשוב מאוד נמצא בתכנון 🎲',
        },
      },
      {
        id: 'friends_2',
        message: {
          en: 'This plan may include snacks and questionable decisions.',
          he: 'התוכנית עשויה לכלול חטיפים והחלטות מפוקפקות.',
        },
      },
    ],
    confirmationIntro: {
      en: "I'm in 🎲",
      he: 'אני בפנים 🎲',
    },
    scoreLabel: {
      en: 'Vibe match',
      he: 'התאמת וייב',
    },
    calculationSteps: {
      en: ['Calculating chaos level...', 'Checking snack compatibility...', 'Estimating laugh probability...'],
      he: ['מחשבים רמת כאוס...', 'בודקים התאמת חטיפים...', 'מעריכים הסתברות לצחוק...'],
    },
  },
};

export function getInviteTypeConfig(inviteType?: InviteType): InviteTypeConfig {
  return INVITE_TYPE_CONFIGS[inviteType || 'date'];
}
