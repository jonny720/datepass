import { Anchor, Shield, Leaf, PartyPopper, Moon } from 'lucide-react';
import type { ThemeId } from '@/types';

export interface ThemeConfig {
  id: ThemeId;
  icon: typeof Anchor;
  gradientClass: string;
  decorativeComponent?: string; // Reference to component name
}

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
};

export const THEME_IDS: ThemeId[] = ['cruise', 'secret_mission', 'nature', 'party', 'after_dark'];
