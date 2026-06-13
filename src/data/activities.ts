import type { ActivityId } from '@/types';
import type { LucideIcon } from 'lucide-react';
import {
  Coffee,
  Cake,
  Utensils,
  Wine,
  Sunset,
  Film,
  Trophy,
  Palette,
  Sparkles,
  Music,
  Gamepad2,
  Dice5,
  Pizza,
  Flame,
  Mic2,
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
  {
    id: 'cake',
    icon: Cake,
    titleKey: 'activity_cake',
    subtitleKey: 'activity_cake_subtitle',
  },
  {
    id: 'food',
    icon: Utensils,
    titleKey: 'activity_food',
    subtitleKey: 'activity_food_subtitle',
  },
  {
    id: 'music',
    icon: Music,
    titleKey: 'activity_music',
    subtitleKey: 'activity_music_subtitle',
  },
  {
    id: 'games',
    icon: Dice5,
    titleKey: 'activity_games',
    subtitleKey: 'activity_games_subtitle',
  },
  {
    id: 'playstation',
    icon: Gamepad2,
    titleKey: 'activity_playstation',
    subtitleKey: 'activity_playstation_subtitle',
  },
  {
    id: 'board-games',
    icon: Dice5,
    titleKey: 'activity_board_games',
    subtitleKey: 'activity_board_games_subtitle',
  },
  {
    id: 'pizza',
    icon: Pizza,
    titleKey: 'activity_pizza',
    subtitleKey: 'activity_pizza_subtitle',
  },
  {
    id: 'bbq',
    icon: Flame,
    titleKey: 'activity_bbq',
    subtitleKey: 'activity_bbq_subtitle',
  },
  {
    id: 'karaoke',
    icon: Mic2,
    titleKey: 'activity_karaoke',
    subtitleKey: 'activity_karaoke_subtitle',
  },
];
