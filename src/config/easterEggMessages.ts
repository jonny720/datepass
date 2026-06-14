import type { ThemeId } from '@/types';
import {
  Anchor,
  Compass,
  Fingerprint,
  Leaf,
  Sun,
  Music,
  PartyPopper,
  Moon,
  Sparkles,
  Heart,
  Star,
  type LucideIcon,
} from 'lucide-react';

export interface EasterEggMessage {
  id: string;
  theme: ThemeId;
  en: string;
  he: string;
  icon: LucideIcon;
}

export const EASTER_EGG_MESSAGES: EasterEggMessage[] = [
  // Cruise theme
  {
    id: 'cruise_1',
    theme: 'cruise',
    en: "You found the captain's secret stash.",
    he: 'מצאת את המחבוא הסודי של הקפטן.',
    icon: Anchor,
  },
  {
    id: 'cruise_2',
    theme: 'cruise',
    en: 'Hidden treasure unlocked. Mostly emotional.',
    he: 'אוצר סודי נפתח. בעיקר רגשי.',
    icon: Compass,
  },
  {
    id: 'cruise_3',
    theme: 'cruise',
    en: 'Smooth sailing bonus discovered.',
    he: 'בונוס שייט חלק התגלה.',
    icon: Anchor,
  },

  // Secret Mission theme
  {
    id: 'mission_1',
    theme: 'secret_mission',
    en: 'Secret intel unlocked.',
    he: 'מידע מסווג נפתח.',
    icon: Fingerprint,
  },
  {
    id: 'mission_2',
    theme: 'secret_mission',
    en: 'Agent curiosity level: suspiciously high.',
    he: 'רמת הסקרנות של הסוכנת: גבוהה באופן מחשיד.',
    icon: Fingerprint,
  },
  {
    id: 'mission_3',
    theme: 'secret_mission',
    en: 'Classified file accessed successfully.',
    he: 'גישה לקובץ מסווג הושלמה בהצלחה.',
    icon: Fingerprint,
  },

  // Nature theme
  {
    id: 'nature_1',
    theme: 'nature',
    en: 'You found a tiny forest secret.',
    he: 'מצאת סוד קטן מהיער.',
    icon: Leaf,
  },
  {
    id: 'nature_2',
    theme: 'nature',
    en: 'Nature approves this decision.',
    he: 'הטבע מאשר את ההחלטה הזאת.',
    icon: Sun,
  },
  {
    id: 'nature_3',
    theme: 'nature',
    en: 'Hidden in plain sight, like a good mushroom.',
    he: 'מוסתר לעין, כמו פטרייה טובה.',
    icon: Leaf,
  },

  // Party theme
  {
    id: 'party_1',
    theme: 'party',
    en: 'Bonus confetti unlocked.',
    he: 'פתחת קונפטי בונוס.',
    icon: PartyPopper,
  },
  {
    id: 'party_2',
    theme: 'party',
    en: 'Party level increased by 12%.',
    he: 'רמת המסיבה עלתה ב־12%.',
    icon: Music,
  },
  {
    id: 'party_3',
    theme: 'party',
    en: 'Secret dance move discovered.',
    he: 'תנועת ריקוד סודית התגלתה.',
    icon: PartyPopper,
  },

  // After Dark theme
  {
    id: 'after_dark_1',
    theme: 'after_dark',
    en: 'You found the after-hours bonus.',
    he: 'מצאת את בונוס שעות הלילה.',
    icon: Moon,
  },
  {
    id: 'after_dark_2',
    theme: 'after_dark',
    en: 'Curiosity looks good on you.',
    he: 'סקרנות מחמיאה לך.',
    icon: Sparkles,
  },
  {
    id: 'after_dark_3',
    theme: 'after_dark',
    en: 'Midnight secret successfully found.',
    he: 'סוד חצות נמצא בהצלחה.',
    icon: Moon,
  },

];

// Rare bonus messages
export interface RareBonusMessage {
  en: string;
  he: string;
  icon: LucideIcon;
}

export const RARE_BONUS_MESSAGES: RareBonusMessage[] = [
  {
    en: 'Okay, this one was extra hidden.',
    he: 'טוב, זה כבר היה סוד ממש מוסתר.',
    icon: Star,
  },
  {
    en: 'You are unusually committed to finding secrets.',
    he: 'את מחויבת באופן חריג למציאת סודות.',
    icon: Heart,
  },
  {
    en: 'Secret level: expert.',
    he: 'רמת סודות: מומחית.',
    icon: Sparkles,
  },
];

export function getRandomMessageForTheme(theme: ThemeId): EasterEggMessage {
  const themeMessages = EASTER_EGG_MESSAGES.filter((msg) => msg.theme === theme);
  const fallbackMessages = themeMessages.length > 0
    ? themeMessages
    : EASTER_EGG_MESSAGES.filter((msg) => msg.theme === 'party');
  return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
}

export function getRandomRareBonus(): RareBonusMessage {
  return RARE_BONUS_MESSAGES[Math.floor(Math.random() * RARE_BONUS_MESSAGES.length)];
}

export function shouldShowRareBonus(): boolean {
  return Math.random() < 0.15; // 15% chance
}
