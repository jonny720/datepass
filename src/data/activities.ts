import type { ActivityId } from '@/types';
import type { LucideIcon } from 'lucide-react';
import {
  Coffee,
  Utensils,
  Wine,
  Sunset,
  Film,
  Trophy,
  Palette,
  Sparkles,
} from 'lucide-react';

export interface Activity {
  id: ActivityId;
  icon: LucideIcon;
  titleKey: string;
  subtitleKey: string;
}

export const ACTIVITIES: Activity[] = [
  {
    id: 'coffee',
    icon: Coffee,
    titleKey: 'activity_coffee',
    subtitleKey: 'activity_coffee_subtitle',
  },
  {
    id: 'drinks',
    icon: Wine,
    titleKey: 'activity_drinks',
    subtitleKey: 'activity_drinks_subtitle',
  },
  {
    id: 'restaurant',
    icon: Utensils,
    titleKey: 'activity_restaurant',
    subtitleKey: 'activity_restaurant_subtitle',
  },
  {
    id: 'sunset-walk',
    icon: Sunset,
    titleKey: 'activity_sunset_walk',
    subtitleKey: 'activity_sunset_walk_subtitle',
  },
  {
    id: 'movie',
    icon: Film,
    titleKey: 'activity_movie',
    subtitleKey: 'activity_movie_subtitle',
  },
  {
    id: 'competitive',
    icon: Trophy,
    titleKey: 'activity_competitive',
    subtitleKey: 'activity_competitive_subtitle',
  },
  {
    id: 'creative',
    icon: Palette,
    titleKey: 'activity_creative',
    subtitleKey: 'activity_creative_subtitle',
  },
  {
    id: 'surprise-me',
    icon: Sparkles,
    titleKey: 'activity_surprise_me',
    subtitleKey: 'activity_surprise_me_subtitle',
  },
];
