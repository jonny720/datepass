import type { ThemeId } from '@/types';

/**
 * Theme story configuration
 * Contains theme-specific copy and metadata to create cohesive experiences
 */

export interface ThemeStory {
  // Ticket/Card metadata labels
  metadata: {
    primary: { en: string; he: string };
    secondary: { en: string; he: string };
    tertiary: { en: string; he: string };
    quaternary: { en: string; he: string };
    status: { en: string; he: string };
  };
  // Values for metadata fields
  values: {
    primary: { en: string; he: string };
    secondary: { en: string; he: string };
    tertiary: { en: string; he: string };
    quaternary: { en: string; he: string };
    status: { en: string; he: string };
  };
}

export const THEME_STORIES: Record<ThemeId, ThemeStory> = {
  cruise: {
    metadata: {
      primary: { en: 'Destination', he: 'יעד' },
      secondary: { en: 'Departure', he: 'מועד יציאה' },
      tertiary: { en: 'Duration', he: 'משך' },
      quaternary: { en: 'Boarding Group', he: 'קבוצת עלייה' },
      status: { en: 'Boarding Status', he: 'סטטוס עלייה' },
    },
    values: {
      primary: { en: 'Classified', he: 'מסווג' },
      secondary: { en: 'Pending Approval', he: 'ממתין לאישור' },
      tertiary: { en: 'One Evening', he: 'ערב אחד' },
      quaternary: { en: 'Two', he: 'שניים' },
      status: { en: 'Awaiting Response', he: 'ממתין לתגובה' },
    },
  },
  secret_mission: {
    metadata: {
      primary: { en: 'Mission Status', he: 'סטטוס משימה' },
      secondary: { en: 'Objective', he: 'מטרה' },
      tertiary: { en: 'Duration', he: 'משך' },
      quaternary: { en: 'Risk Level', he: 'רמת סיכון' },
      status: { en: 'Clearance Required', he: 'נדרש אישור' },
    },
    values: {
      primary: { en: 'Awaiting Approval', he: 'ממתין לאישור' },
      secondary: { en: 'Classified', he: 'מסווג' },
      tertiary: { en: 'One Evening', he: 'ערב אחד' },
      quaternary: { en: 'Suspiciously Enjoyable', he: 'מהנה באופן חשוד' },
      status: { en: 'One Tap', he: 'הקשה אחת' },
    },
  },
  nature: {
    metadata: {
      primary: { en: 'Forecast', he: 'תחזית' },
      secondary: { en: 'Route', he: 'מסלול' },
      tertiary: { en: 'Duration', he: 'משך' },
      quaternary: { en: 'Required Equipment', he: 'ציוד נדרש' },
      status: { en: 'RSVP', he: 'אישור הגעה' },
    },
    values: {
      primary: { en: 'High chance of a good evening', he: 'סיכוי גבוה לערב טוב' },
      secondary: { en: 'Still undecided', he: 'עדיין לא הוחלט' },
      tertiary: { en: 'One Evening', he: 'ערב אחד' },
      quaternary: { en: 'Good mood', he: 'מצב רוח טוב' },
      status: { en: 'Awaiting', he: 'ממתין' },
    },
  },
  party: {
    metadata: {
      primary: { en: 'Guest List', he: 'רשימת אורחים' },
      secondary: { en: 'Energy Level', he: 'רמת אנרגיה' },
      tertiary: { en: 'Duration', he: 'משך' },
      quaternary: { en: 'Dress Code', he: 'קוד לבוש' },
      status: { en: 'RSVP Status', he: 'סטטוס אישור' },
    },
    values: {
      primary: { en: 'Extremely selective', he: 'סלקטיבי במיוחד' },
      secondary: { en: 'Promising', he: 'מבטיח' },
      tertiary: { en: 'One Evening', he: 'ערב אחד' },
      quaternary: { en: 'Whatever works', he: 'מה שנוח' },
      status: { en: 'Awaiting', he: 'ממתין' },
    },
  },
  after_dark: {
    metadata: {
      primary: { en: 'Status', he: 'סטטוס' },
      secondary: { en: 'Location', he: 'מיקום' },
      tertiary: { en: 'Duration', he: 'משך' },
      quaternary: { en: 'Recommended Mood', he: 'מצב רוח מומלץ' },
      status: { en: 'Confirmation', he: 'אישור' },
    },
    values: {
      primary: { en: 'Awaiting confirmation', he: 'ממתין לאישור' },
      secondary: { en: 'Classified', he: 'מסווג' },
      tertiary: { en: 'One Evening', he: 'ערב אחד' },
      quaternary: { en: 'Slightly curious', he: 'סקרן במעט' },
      status: { en: 'Required', he: 'נדרש' },
    },
  },
  temptation: {
    metadata: {
      primary: { en: 'Mood', he: 'אווירה' },
      secondary: { en: 'Boundary', he: 'גבול' },
      tertiary: { en: 'Duration', he: 'משך' },
      quaternary: { en: 'Recommended Energy', he: 'אנרגיה מומלצת' },
      status: { en: '18+ Notice', he: 'סימון 18+' },
    },
    values: {
      primary: { en: 'Playfully provocative', he: 'פרובוקטיבי בקטע משחקי' },
      secondary: { en: 'Adults only', he: 'למבוגרים בלבד' },
      tertiary: { en: 'One Evening', he: 'ערב אחד' },
      quaternary: { en: 'Confident curiosity', he: 'סקרנות בטוחה בעצמה' },
      status: { en: 'No validation', he: 'ללא אימות' },
    },
  },
  'black-tie': {
    metadata: {
      primary: { en: 'Dress Code', he: 'קוד לבוש' },
      secondary: { en: 'Mood', he: 'מצב רוח' },
      tertiary: { en: 'Access', he: 'גישה' },
      quaternary: { en: 'Evening', he: 'ערב' },
      status: { en: 'Approval', he: 'אישור' },
    },
    values: {
      primary: { en: 'Black tie optional', he: 'אלגנטי' },
      secondary: { en: 'Elegant', he: 'קלאסי' },
      tertiary: { en: 'Reserved', he: 'שמורה' },
      quaternary: { en: 'One proper evening', he: 'ערב כמו שצריך' },
      status: { en: 'Awaiting', he: 'ממתין' },
    },
  },
  'power-play': {
    metadata: {
      primary: { en: 'Access', he: 'גישה' },
      secondary: { en: 'Rule One', he: 'חוק ראשון' },
      tertiary: { en: 'Safe Word', he: 'מילת ביטחון' },
      quaternary: { en: 'Tone', he: 'טון' },
      status: { en: 'Permission', he: 'אישור' },
    },
    values: {
      primary: { en: 'Restricted', he: 'מוגבלת' },
      secondary: { en: 'Consent first', he: 'הסכמה קודם' },
      tertiary: { en: 'Required', he: 'חובה' },
      quaternary: { en: 'Controlled tension', he: 'מתח בשליטה' },
      status: { en: 'Awaiting', he: 'ממתין' },
    },
  },
  generic: {
    metadata: {
      primary: { en: 'Plan', he: 'תוכנית' },
      secondary: { en: 'Status', he: 'סטטוס' },
      tertiary: { en: 'Duration', he: 'משך' },
      quaternary: { en: 'Mood', he: 'אווירה' },
      status: { en: 'Reply', he: 'תשובה' },
    },
    values: {
      primary: { en: 'Open invitation', he: 'הזמנה פתוחה' },
      secondary: { en: 'Awaiting answer', he: 'ממתין לתשובה' },
      tertiary: { en: 'To be decided', he: 'יוחלט בהמשך' },
      quaternary: { en: 'Good energy', he: 'אנרגיה טובה' },
      status: { en: 'Requested', he: 'מתבקשת' },
    },
  },
  stadium: {
    metadata: {
      primary: { en: 'Fixture', he: 'משחק' },
      secondary: { en: 'Section', he: 'יציע' },
      tertiary: { en: 'Duration', he: 'משך' },
      quaternary: { en: 'Score', he: 'תוצאה' },
      status: { en: 'Kickoff', he: 'שריקה' },
    },
    values: {
      primary: { en: 'Home plan', he: 'תוכנית ביתית' },
      secondary: { en: 'Best available', he: 'הכי טוב שיש' },
      tertiary: { en: 'Match night', he: 'ערב משחק' },
      quaternary: { en: '0-0 for now', he: '0-0 בינתיים' },
      status: { en: 'Pending', he: 'ממתין' },
    },
  },
  concert: {
    metadata: {
      primary: { en: 'Show', he: 'מופע' },
      secondary: { en: 'Stage', he: 'במה' },
      tertiary: { en: 'Set Length', he: 'משך סט' },
      quaternary: { en: 'Volume', he: 'ווליום' },
      status: { en: 'Ticket', he: 'כרטיס' },
    },
    values: {
      primary: { en: 'Live plan', he: 'תוכנית חיה' },
      secondary: { en: 'Main', he: 'מרכזית' },
      tertiary: { en: 'One evening', he: 'ערב אחד' },
      quaternary: { en: 'Promising', he: 'מבטיח' },
      status: { en: 'Reserved-ish', he: 'שמורה בערך' },
    },
  },
  theater: {
    metadata: {
      primary: { en: 'Curtain', he: 'מסך' },
      secondary: { en: 'Seat', he: 'מושב' },
      tertiary: { en: 'Runtime', he: 'משך' },
      quaternary: { en: 'Drama', he: 'דרמה' },
      status: { en: 'Admission', he: 'כניסה' },
    },
    values: {
      primary: { en: 'Rising soon', he: 'עולה בקרוב' },
      secondary: { en: 'Good one', he: 'טוב' },
      tertiary: { en: 'One act', he: 'מערכה אחת' },
      quaternary: { en: 'Tasteful', he: 'בטעם טוב' },
      status: { en: 'Awaiting', he: 'ממתין' },
    },
  },
  hotel: {
    metadata: {
      primary: { en: 'Stay', he: 'שהייה' },
      secondary: { en: 'Keycard', he: 'כרטיס חדר' },
      tertiary: { en: 'Nights', he: 'לילות' },
      quaternary: { en: 'Comfort', he: 'נוחות' },
      status: { en: 'Check-in', he: 'צק אין' },
    },
    values: {
      primary: { en: 'Possible escape', he: 'בריחה אפשרית' },
      secondary: { en: 'Ready', he: 'מוכן' },
      tertiary: { en: 'To decide', he: 'נחליט' },
      quaternary: { en: 'High', he: 'גבוהה' },
      status: { en: 'Pending', he: 'ממתין' },
    },
  },
  flight: {
    metadata: {
      primary: { en: 'Route', he: 'מסלול' },
      secondary: { en: 'Gate', he: 'שער' },
      tertiary: { en: 'Flight Time', he: 'משך טיסה' },
      quaternary: { en: 'Baggage', he: 'כבודה' },
      status: { en: 'Boarding', he: 'עלייה' },
    },
    values: {
      primary: { en: 'Somewhere good', he: 'למקום טוב' },
      secondary: { en: 'TBD', he: 'יקבע' },
      tertiary: { en: 'Worth it', he: 'שווה את זה' },
      quaternary: { en: 'Good mood only', he: 'מצב רוח טוב בלבד' },
      status: { en: 'Awaiting', he: 'ממתין' },
    },
  },
};

/**
 * Get theme-specific copy for a given theme
 */
export function getThemeStory(theme: ThemeId): ThemeStory {
  return THEME_STORIES[theme];
}

/**
 * Get a specific metadata label for a theme
 */
export function getThemeMetadataLabel(
  theme: ThemeId,
  field: keyof ThemeStory['metadata'],
  language: 'en' | 'he'
): string {
  return THEME_STORIES[theme].metadata[field][language];
}

/**
 * Get a specific value for a theme
 */
export function getThemeValue(
  theme: ThemeId,
  field: keyof ThemeStory['values'],
  language: 'en' | 'he'
): string {
  return THEME_STORIES[theme].values[field][language];
}
