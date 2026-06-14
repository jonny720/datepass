import {
  Anchor,
  Waves,
  Compass,
  Ship,
  Fingerprint,
  ScanLine,
  MapPin,
  Shield,
  Leaf,
  Sun,
  Mountain,
  Sparkles,
  Music,
  PartyPopper,
  Star,
  Trophy,
  Theater,
  Hotel,
  Plane,
  Ticket,
  Cloud,
  Moon,
  Flame,
  Heart,
  Gem,
  BadgeCheck,
  type LucideIcon,
} from 'lucide-react';
import type { ThemeId } from '@/types';

export interface ThemeIconSet {
  primary: LucideIcon;
  secondary: LucideIcon;
  tertiary: LucideIcon;
  accent: LucideIcon;
}

export const THEME_ICONS: Record<ThemeId, ThemeIconSet> = {
  cruise: {
    primary: Anchor,
    secondary: Waves,
    tertiary: Compass,
    accent: Ship,
  },
  secret_mission: {
    primary: Fingerprint,
    secondary: ScanLine,
    tertiary: MapPin,
    accent: Shield,
  },
  nature: {
    primary: Leaf,
    secondary: Sun,
    tertiary: Mountain,
    accent: Sparkles,
  },
  party: {
    primary: Music,
    secondary: PartyPopper,
    tertiary: Star,
    accent: Sparkles,
  },
  after_dark: {
    primary: Moon,
    secondary: Sparkles,
    tertiary: Flame,
    accent: Heart,
  },
  'black-tie': {
    primary: Gem,
    secondary: Sparkles,
    tertiary: BadgeCheck,
    accent: Star,
  },
  generic: {
    primary: Sparkles,
    secondary: Ticket,
    tertiary: Star,
    accent: Heart,
  },
  stadium: {
    primary: Trophy,
    secondary: ScanLine,
    tertiary: Star,
    accent: Sparkles,
  },
  concert: {
    primary: Music,
    secondary: Sparkles,
    tertiary: Ticket,
    accent: Star,
  },
  theater: {
    primary: Theater,
    secondary: Star,
    tertiary: Ticket,
    accent: Sparkles,
  },
  hotel: {
    primary: Hotel,
    secondary: Sparkles,
    tertiary: Heart,
    accent: Star,
  },
  flight: {
    primary: Plane,
    secondary: Cloud,
    tertiary: MapPin,
    accent: Ticket,
  },
};

/**
 * Get the icon set for a given theme
 */
export function getThemeIcons(theme: ThemeId): ThemeIconSet {
  return THEME_ICONS[theme];
}

/**
 * Get a specific icon from a theme (cycles through the icon set based on index)
 */
export function getThemeIconByIndex(theme: ThemeId, index: number): LucideIcon {
  const icons = THEME_ICONS[theme];
  const iconArray = [icons.primary, icons.secondary, icons.tertiary, icons.accent];
  return iconArray[index % iconArray.length];
}
