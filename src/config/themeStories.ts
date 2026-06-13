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
