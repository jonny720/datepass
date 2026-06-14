import { Anchor, Shield, Leaf, PartyPopper, Moon, Sparkles, Trophy, Music, Theater, Hotel, Plane, Flag, Mic2, Drama, KeyRound, Cloud, Gem, BadgeCheck } from 'lucide-react';
import type { ActivityId, Language, ThemeId } from '@/types';

export type LocalizedString = Record<Language, string>;

export interface ThemeMetadataLine {
  label: LocalizedString;
  value: LocalizedString;
}

export interface ThemeVisualIdentity {
  backgroundClass: string;
  surfaceClass: string;
  accentClass: string;
  textClass: string;
  mutedTextClass: string;
  icon: typeof Anchor;
  decorativeIcons: Array<typeof Anchor>;
  openingMotif: LocalizedString;
  openingSubtitle: LocalizedString;
  ticketMetadata: ThemeMetadataLine[];
  yesStamp: LocalizedString;
  vibeLabel: LocalizedString;
  vibeCalculationLines: LocalizedString[];
  easterEggMessages: LocalizedString[];
  mainQuestions?: LocalizedString[];
  questionSubtitle?: LocalizedString;
  yesButtonLabels?: LocalizedString[];
  noButtonLabels?: LocalizedString[];
  declineMessages?: LocalizedString[];
  recipientBadge?: LocalizedString;
  activitySubtitles?: Partial<Record<ActivityId, LocalizedString>>;
}

export interface ThemeConfig {
  id: ThemeId;
  icon: typeof Anchor;
  gradientClass: string;
  decorativeComponent?: string; // Reference to component name
  visualIdentity?: ThemeVisualIdentity;
}

const genericActivitySubtitles: Partial<Record<ActivityId, LocalizedString>> = {
  coffee: { en: 'Easy plan, good delivery.', he: 'תוכנית פשוטה, הגשה טובה.' },
  drinks: { en: 'Flexible plan energy.', he: 'אנרגיה של תוכנית גמישה.' },
  restaurant: { en: 'A polished choice.', he: 'בחירה מלוטשת.' },
  movie: { en: 'Simple plan, better company.', he: 'תוכנית פשוטה, חברה טובה יותר.' },
  'surprise-me': { en: 'Works for almost anything.', he: 'מתאים כמעט לכל דבר.' },
};

const stadiumActivitySubtitles: Partial<Record<ActivityId, LocalizedString>> = {
  competitive: { en: 'Live match energy.', he: 'אנרגיה של משחק חי.' },
  food: { en: 'Pre-game food is mandatory.', he: 'אוכל לפני משחק זה חובה.' },
  pizza: { en: 'Pre-game food is mandatory.', he: 'אוכל לפני משחק זה חובה.' },
  drinks: { en: 'Good seats, better company.', he: 'מושבים טובים, חברה טובה יותר.' },
  games: { en: 'Extra time allowed.', he: 'הארכה מותרת.' },
};

const concertActivitySubtitles: Partial<Record<ActivityId, LocalizedString>> = {
  music: { en: 'Live show energy.', he: 'אנרגיה של הופעה חיה.' },
  drinks: { en: 'Pre-show drinks approved.', he: 'דרינקים לפני הופעה מאושרים.' },
  karaoke: { en: 'Encore strongly possible.', he: 'הדרן בהחלט אפשרי.' },
  food: { en: 'Backstage snacks count.', he: 'חטיפים מאחורי הקלעים נחשבים.' },
  'surprise-me': { en: 'Secret track energy.', he: 'אנרגיה של רצועה סודית.' },
};

const theaterActivitySubtitles: Partial<Record<ActivityId, LocalizedString>> = {
  movie: { en: 'Curtain, lights, drama.', he: 'מסך, אורות, דרמה.' },
  creative: { en: 'A tasteful first act.', he: 'מערכה ראשונה בטעם טוב.' },
  restaurant: { en: 'Intermission dinner energy.', he: 'אנרגיה של ארוחת הפסקה.' },
  drinks: { en: 'Lobby drinks, elegant chaos.', he: 'דרינקים בלובי, כאוס אלגנטי.' },
  'surprise-me': { en: 'A secret scene awaits.', he: 'סצנה סודית מחכה.' },
};

const hotelActivitySubtitles: Partial<Record<ActivityId, LocalizedString>> = {
  coffee: { en: 'Lobby coffee counts.', he: 'קפה בלובי נחשב.' },
  restaurant: { en: 'Room-service mood.', he: 'אווירת שירות חדרים.' },
  drinks: { en: 'Lounge energy.', he: 'אנרגיה של לאונג׳.' },
  'sunset-walk': { en: 'Small getaway approved.', he: 'בריחה קטנה מאושרת.' },
  'surprise-me': { en: 'Room upgrade potential.', he: 'פוטנציאל לשדרוג חדר.' },
};

const flightActivitySubtitles: Partial<Record<ActivityId, LocalizedString>> = {
  coffee: { en: 'Gate coffee before boarding.', he: 'קפה בשער לפני העלייה.' },
  food: { en: 'Airport snacks are valid.', he: 'חטיפי שדה תעופה זה תקף.' },
  'sunset-walk': { en: 'Route line included.', he: 'קו מסלול כלול.' },
  movie: { en: 'In-flight entertainment energy.', he: 'אווירת בידור בטיסה.' },
  'surprise-me': { en: 'Destination classified.', he: 'יעד מסווג.' },
};

const blackTieActivitySubtitles: Partial<Record<ActivityId, LocalizedString>> = {
  drinks: { en: 'A proper drink. No plastic cups.', he: 'דרינק כמו שצריך. בלי כוסות פלסטיק.' },
  restaurant: { en: 'Dinner with actual napkins.', he: 'ארוחה עם מפיות אמיתיות.' },
  coffee: { en: 'Simple, polished, low pressure.', he: 'פשוט, מלוטש, בלי לחץ.' },
  movie: { en: 'Classic choice. Acceptable popcorn etiquette required.', he: 'בחירה קלאסית. נדרש נימוס פופקורן בסיסי.' },
  creative: { en: 'A little culture never hurt.', he: 'קצת תרבות לא הזיקה לאף אחד.' },
  'surprise-me': { en: 'A refined risk.', he: 'סיכון מעודן.' },
};

export const THEME_CONFIGS: Record<ThemeId, ThemeConfig> = {
  cruise: {
    id: 'cruise',
    icon: Anchor,
    gradientClass: 'ocean-background-soft',
    decorativeComponent: 'OceanWaves + FloatingElements',
  },
  secret_mission: {
    id: 'secret_mission',
    icon: Shield,
    gradientClass: 'mission-background-soft',
    decorativeComponent: 'GridLines + RadarElements',
  },
  nature: {
    id: 'nature',
    icon: Leaf,
    gradientClass: 'nature-background-soft',
    decorativeComponent: 'NatureElements',
  },
  party: {
    id: 'party',
    icon: PartyPopper,
    gradientClass: 'party-background-soft',
    decorativeComponent: 'PartyElements',
  },
  after_dark: {
    id: 'after_dark',
    icon: Moon,
    gradientClass: 'after-dark-background',
    decorativeComponent: 'AfterDarkElements',
  },
  'black-tie': {
    id: 'black-tie',
    icon: Gem,
    gradientClass: 'black-tie-background-soft',
    visualIdentity: {
      backgroundClass: 'black-tie-background-soft',
      surfaceClass: 'bg-[#fffaf0] border-yellow-700/30',
      accentClass: 'text-yellow-700',
      textClass: 'text-stone-950',
      mutedTextClass: 'text-stone-600',
      icon: Gem,
      decorativeIcons: [Gem, Sparkles, BadgeCheck],
      openingMotif: { en: 'An elegant invitation is waiting.', he: 'הזמנה אלגנטית מחכה לך.' },
      openingSubtitle: { en: 'Dress code: confidence.', he: 'קוד לבוש: ביטחון עצמי.' },
      ticketMetadata: [
        { label: { en: 'Dress code', he: 'קוד לבוש' }, value: { en: 'black tie optional', he: 'אלגנטי' } },
        { label: { en: 'Mood', he: 'מצב רוח' }, value: { en: 'elegant', he: 'קלאסי' } },
        { label: { en: 'Access', he: 'גישה' }, value: { en: 'reserved', he: 'שמורה' } },
        { label: { en: 'Evening status', he: 'סטטוס הערב' }, value: { en: 'awaiting approval', he: 'ממתין לאישור' } },
      ],
      yesStamp: { en: 'EVENING APPROVED', he: 'הערב אושר' },
      vibeLabel: { en: 'Elegance reading', he: 'קריאת אלגנטיות' },
      vibeCalculationLines: [
        { en: 'Checking dress-code energy...', he: 'בודקים אנרגיית קוד לבוש...' },
        { en: 'Measuring charm levels...', he: 'מודדים רמות קסם...' },
        { en: 'Polishing questionable assumptions...', he: 'מלטשים הנחות מפוקפקות...' },
      ],
      easterEggMessages: [
        { en: 'You found the VIP detail.', he: 'מצאת את פרט ה־VIP.' },
        { en: 'Classy secret unlocked.', he: 'סוד אלגנטי נפתח.' },
      ],
      mainQuestions: [
        { en: 'May I have this evening?', he: 'אפשר להזמין אותך לערב הזה?' },
        { en: 'Shall we make it a proper evening?', he: 'נעשה מזה ערב כמו שצריך?' },
      ],
      yesButtonLabels: [
        { en: 'With pleasure', he: 'בשמחה' },
        { en: "I'm in", he: 'אני בפנים' },
        { en: 'Sounds elegant', he: 'נשמע אלגנטי' },
        { en: 'You may', he: 'אפשר' },
      ],
      noButtonLabels: [
        { en: 'Not this time', he: 'לא הפעם' },
        { en: 'Maybe another evening', he: 'אולי בערב אחר' },
      ],
      declineMessages: [
        { en: 'All good. The invitation remains classy.', he: 'הכול טוב. ההזמנה נשארת אלגנטית.' },
      ],
      activitySubtitles: blackTieActivitySubtitles,
    },
  },
  generic: {
    id: 'generic',
    icon: Sparkles,
    gradientClass: 'generic-background-soft',
    visualIdentity: {
      backgroundClass: 'generic-background-soft',
      surfaceClass: 'bg-white/95 border-pink-100',
      accentClass: 'text-pink-600',
      textClass: 'text-stone-900',
      mutedTextClass: 'text-stone-600',
      icon: Sparkles,
      decorativeIcons: [Sparkles, PartyPopper, Sparkles],
      openingMotif: { en: 'A small invitation is waiting.', he: 'הזמנה קטנה מחכה לך.' },
      openingSubtitle: { en: 'Simple plan. Better delivery.', he: 'תוכנית פשוטה. הגשה טובה יותר.' },
      ticketMetadata: [
        { label: { en: 'Access', he: 'גישה' }, value: { en: 'invited', he: 'מוזמנ/ת' } },
        { label: { en: 'Mood', he: 'מצב רוח' }, value: { en: 'flexible', he: 'גמיש' } },
        { label: { en: 'Plan', he: 'תוכנית' }, value: { en: 'pending approval', he: 'ממתינה לאישור' } },
        { label: { en: 'Vibe', he: 'וייב' }, value: { en: 'promising', he: 'מבטיח' } },
      ],
      yesStamp: { en: 'INVITATION APPROVED', he: 'ההזמנה אושרה' },
      vibeLabel: { en: 'Vibe reading', he: 'קריאת וייב' },
      vibeCalculationLines: [
        { en: 'Checking invitation polish...', he: 'בודקים ליטוש הזמנה...' },
        { en: 'Measuring flexible plan energy...', he: 'מודדים אנרגיית תוכנית גמישה...' },
        { en: 'Approving good delivery...', he: 'מאשרים הגשה טובה...' },
      ],
      easterEggMessages: [
        { en: 'Tiny secret unlocked.', he: 'סוד קטן נפתח.' },
      ],
      activitySubtitles: genericActivitySubtitles,
    },
  },
  stadium: {
    id: 'stadium',
    icon: Trophy,
    gradientClass: 'stadium-background-soft',
    visualIdentity: {
      backgroundClass: 'stadium-background-soft',
      surfaceClass: 'bg-emerald-950 border-white/20 text-white',
      accentClass: 'text-lime-300',
      textClass: 'text-white',
      mutedTextClass: 'text-emerald-100',
      icon: Trophy,
      decorativeIcons: [Flag, Trophy, Shield],
      openingMotif: { en: 'Match invitation pending.', he: 'הזמנה למשחק ממתינה לאישור.' },
      openingSubtitle: { en: 'Kickoff starts after approval.', he: 'שריקת הפתיחה אחרי האישור.' },
      ticketMetadata: [
        { label: { en: 'Kickoff', he: 'שריקת פתיחה' }, value: { en: 'pending', he: 'ממתינה' } },
        { label: { en: 'Section', he: 'יציע' }, value: { en: 'good vibes', he: 'וייב טוב' } },
        { label: { en: 'Home team', he: 'קבוצת בית' }, value: { en: 'us', he: 'אנחנו' } },
        { label: { en: 'Result', he: 'תוצאה' }, value: { en: 'to be decided', he: 'תיקבע בהמשך' } },
      ],
      yesStamp: { en: 'KICKOFF APPROVED', he: 'שריקת פתיחה אושרה' },
      vibeLabel: { en: 'Match reading', he: 'קריאת משחק' },
      vibeCalculationLines: [
        { en: 'Reading the pitch...', he: 'קוראים את המגרש...' },
        { en: 'Checking home-team advantage...', he: 'בודקים יתרון ביתיות...' },
        { en: 'Waiting for the whistle...', he: 'מחכים לשריקה...' },
        { en: 'Approving extra time...', he: 'מאשרים הארכה...' },
      ],
      easterEggMessages: [
        { en: 'VAR checked it. Still approved.', he: 'ה־VAR בדק. עדיין מאושר.' },
        { en: 'You found the hidden ball.', he: 'מצאת את הכדור הנסתר.' },
        { en: 'The referee saw nothing.', he: 'השופט לא ראה כלום.' },
      ],
      activitySubtitles: stadiumActivitySubtitles,
    },
  },
  concert: {
    id: 'concert',
    icon: Music,
    gradientClass: 'concert-background-soft',
    visualIdentity: {
      backgroundClass: 'concert-background-soft',
      surfaceClass: 'bg-slate-950 border-fuchsia-300/30 text-white',
      accentClass: 'text-fuchsia-300',
      textClass: 'text-white',
      mutedTextClass: 'text-fuchsia-100',
      icon: Mic2,
      decorativeIcons: [Music, Mic2, Sparkles],
      openingMotif: { en: 'You are on the guest list.', he: 'את/ה ברשימת המוזמנים.' },
      openingSubtitle: { en: 'The show starts when you say yes.', he: 'המופע מתחיל כשאומרים כן.' },
      ticketMetadata: [
        { label: { en: 'Access', he: 'גישה' }, value: { en: 'guest list', he: 'רשימת מוזמנים' } },
        { label: { en: 'Volume', he: 'ווליום' }, value: { en: 'promising', he: 'מבטיח' } },
        { label: { en: 'Stage', he: 'במה' }, value: { en: 'almost ready', he: 'כמעט מוכנה' } },
        { label: { en: 'Encore', he: 'הדרן' }, value: { en: 'likely', he: 'סביר מאוד' } },
      ],
      yesStamp: { en: 'ACCESS GRANTED', he: 'גישה אושרה' },
      vibeLabel: { en: 'Vibe check', he: 'בדיקת וייב' },
      vibeCalculationLines: [
        { en: 'Checking the guest list...', he: 'בודקים את רשימת המוזמנים...' },
        { en: 'Sweeping stage lights...', he: 'מעבירים אורות במה...' },
        { en: 'Tuning the encore probability...', he: 'מכוונים הסתברות להדרן...' },
      ],
      easterEggMessages: [
        { en: 'Secret track unlocked.', he: 'רצועה סודית נפתחה.' },
        { en: 'You found the backstage pass.', he: 'מצאת את כרטיס מאחורי הקלעים.' },
      ],
      activitySubtitles: concertActivitySubtitles,
    },
  },
  theater: {
    id: 'theater',
    icon: Theater,
    gradientClass: 'theater-background-soft',
    visualIdentity: {
      backgroundClass: 'theater-background-soft',
      surfaceClass: 'bg-red-950 border-amber-300/30 text-white',
      accentClass: 'text-amber-300',
      textClass: 'text-white',
      mutedTextClass: 'text-amber-100',
      icon: Drama,
      decorativeIcons: [Drama, Theater, Sparkles],
      openingMotif: { en: 'The curtain is almost up.', he: 'המסך כמעט עולה.' },
      openingSubtitle: { en: 'Your seat is reserved-ish.', he: 'המושב שלך בערך שמור.' },
      ticketMetadata: [
        { label: { en: 'Curtain', he: 'המסך' }, value: { en: 'almost up', he: 'כמעט עולה' } },
        { label: { en: 'Seat', he: 'מושב' }, value: { en: 'reserved-ish', he: 'בערך שמור' } },
        { label: { en: 'Act one', he: 'מערכה ראשונה' }, value: { en: 'awaiting approval', he: 'ממתינה לאישור' } },
        { label: { en: 'Drama level', he: 'רמת דרמה' }, value: { en: 'tasteful', he: 'בטעם טוב' } },
      ],
      yesStamp: { en: 'CURTAIN APPROVED', he: 'המסך אושר' },
      vibeLabel: { en: 'Drama reading', he: 'קריאת דרמה' },
      vibeCalculationLines: [
        { en: 'Raising the curtain slightly...', he: 'מרימים מעט את המסך...' },
        { en: 'Checking seat reservation...', he: 'בודקים שמירת מושב...' },
        { en: 'Measuring tasteful drama...', he: 'מודדים דרמה בטעם טוב...' },
      ],
      easterEggMessages: [
        { en: 'Secret scene unlocked.', he: 'סצנה סודית נפתחה.' },
        { en: 'The audience noticed nothing.', he: 'הקהל לא שם לב לכלום.' },
      ],
      activitySubtitles: theaterActivitySubtitles,
    },
  },
  hotel: {
    id: 'hotel',
    icon: Hotel,
    gradientClass: 'hotel-background-soft',
    visualIdentity: {
      backgroundClass: 'hotel-background-soft',
      surfaceClass: 'bg-white/95 border-amber-200',
      accentClass: 'text-amber-700',
      textClass: 'text-stone-900',
      mutedTextClass: 'text-stone-600',
      icon: KeyRound,
      decorativeIcons: [KeyRound, Hotel, Sparkles],
      openingMotif: { en: 'Check-in is pending.', he: 'צ׳ק אין ממתין לאישור.' },
      openingSubtitle: { en: 'A small getaway is waiting.', he: 'בריחה קטנה מחכה לך.' },
      ticketMetadata: [
        { label: { en: 'Check-in', he: 'צ׳ק אין' }, value: { en: 'pending', he: 'ממתין' } },
        { label: { en: 'Room mood', he: 'מצב החדר' }, value: { en: 'promising', he: 'מבטיח' } },
        { label: { en: 'Keycard', he: 'כרטיס חדר' }, value: { en: 'almost active', he: 'כמעט פעיל' } },
        { label: { en: 'Do not disturb', he: 'נא לא להפריע' }, value: { en: 'optional', he: 'אופציונלי' } },
      ],
      yesStamp: { en: 'CHECK-IN APPROVED', he: 'צ׳ק אין אושר' },
      vibeLabel: { en: 'Check-in reading', he: 'קריאת צ׳ק אין' },
      vibeCalculationLines: [
        { en: 'Activating keycard...', he: 'מפעילים כרטיס חדר...' },
        { en: 'Checking room mood...', he: 'בודקים מצב חדר...' },
        { en: 'Warming lobby lights...', he: 'מחממים אורות לובי...' },
      ],
      easterEggMessages: [
        { en: 'Room upgrade unlocked.', he: 'שדרוג חדר נפתח.' },
        { en: 'You found the spare key.', he: 'מצאת את המפתח הרזרבי.' },
      ],
      activitySubtitles: hotelActivitySubtitles,
    },
  },
  flight: {
    id: 'flight',
    icon: Plane,
    gradientClass: 'flight-background-soft',
    visualIdentity: {
      backgroundClass: 'flight-background-soft',
      surfaceClass: 'bg-white/95 border-sky-200',
      accentClass: 'text-sky-700',
      textClass: 'text-stone-900',
      mutedTextClass: 'text-stone-600',
      icon: Plane,
      decorativeIcons: [Plane, Cloud, Sparkles],
      openingMotif: { en: 'Boarding is not closed yet.', he: 'העלייה למטוס עדיין פתוחה.' },
      openingSubtitle: { en: 'Destination: classified until approval.', he: 'יעד: מסווג עד האישור.' },
      ticketMetadata: [
        { label: { en: 'Boarding', he: 'עלייה למטוס' }, value: { en: 'open', he: 'פתוחה' } },
        { label: { en: 'Gate', he: 'שער' }, value: { en: 'good timing', he: 'תזמון טוב' } },
        { label: { en: 'Seat', he: 'מושב' }, value: { en: 'next to me', he: 'לידי' } },
        { label: { en: 'Destination', he: 'יעד' }, value: { en: 'classified', he: 'מסווג' } },
      ],
      yesStamp: { en: 'BOARDING APPROVED', he: 'העלייה למטוס אושרה' },
      vibeLabel: { en: 'Boarding reading', he: 'קריאת עלייה למטוס' },
      vibeCalculationLines: [
        { en: 'Checking the gate...', he: 'בודקים את השער...' },
        { en: 'Drawing route line...', he: 'מציירים קו מסלול...' },
        { en: 'Stamping boarding pass...', he: 'חותמים על כרטיס העלייה...' },
      ],
      easterEggMessages: [
        { en: 'Passport stamp unlocked.', he: 'חותמת דרכון נפתחה.' },
        { en: 'You found the secret gate.', he: 'מצאת את השער הסודי.' },
      ],
      activitySubtitles: flightActivitySubtitles,
    },
  },
};

export const THEME_IDS: ThemeId[] = [
  'cruise',
  'secret_mission',
  'nature',
  'party',
  'after_dark',
  'black-tie',
  'generic',
  'stadium',
  'concert',
  'theater',
  'hotel',
  'flight',
];

export function getThemeVisualIdentity(theme: ThemeId): ThemeVisualIdentity | undefined {
  return THEME_CONFIGS[theme].visualIdentity;
}

export function getThemeActivitySubtitle(
  activityId: ActivityId,
  theme: ThemeId,
  language: Language
): string | undefined {
  return THEME_CONFIGS[theme].visualIdentity?.activitySubtitles?.[activityId]?.[language];
}

export function getThemeQuestion(theme: ThemeId, language: Language): string | undefined {
  return THEME_CONFIGS[theme].visualIdentity?.mainQuestions?.[0]?.[language];
}

export function getThemeQuestionSubtitle(theme: ThemeId, language: Language): string | undefined {
  return THEME_CONFIGS[theme].visualIdentity?.questionSubtitle?.[language];
}

export function getThemeYesLabels(theme: ThemeId, language: Language): string[] | undefined {
  return THEME_CONFIGS[theme].visualIdentity?.yesButtonLabels?.map((label) => label[language]);
}

export function getThemeNoLabels(theme: ThemeId, language: Language): string[] | undefined {
  return THEME_CONFIGS[theme].visualIdentity?.noButtonLabels?.map((label) => label[language]);
}

export function getThemeDeclineMessage(theme: ThemeId, language: Language): string | undefined {
  return THEME_CONFIGS[theme].visualIdentity?.declineMessages?.[0]?.[language];
}
