export type EasterEggPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type EasterEggScreen = 'arrival' | 'personality' | 'activities' | 'slots' | 'confirmation';

export const EASTER_EGG_SAFE_PLACEMENTS: Record<EasterEggScreen, EasterEggPlacement[]> = {
  arrival: ['bottom-right', 'top-left'],
  personality: ['top-right', 'bottom-left'],
  activities: ['top-right'],
  slots: ['bottom-right'],
  confirmation: ['top-left'],
};

export function getRandomPlacementForScreen(screen: EasterEggScreen): EasterEggPlacement {
  const placements = EASTER_EGG_SAFE_PLACEMENTS[screen];
  return placements[Math.floor(Math.random() * placements.length)];
}

export function getRandomScreen(): EasterEggScreen {
  const screens: EasterEggScreen[] = ['arrival', 'personality', 'activities', 'slots', 'confirmation'];
  return screens[Math.floor(Math.random() * screens.length)];
}
