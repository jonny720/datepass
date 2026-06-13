import { useState, useEffect } from 'react';
import type { EasterEggScreen } from '@/config/easterEggPlacements';
import { getRandomScreen } from '@/config/easterEggPlacements';

interface EasterEggState {
  targetScreen: EasterEggScreen;
  hasBeenRevealed: boolean;
  markAsRevealed: () => void;
  shouldShowOnScreen: (screen: EasterEggScreen) => boolean;
}

interface UseEasterEggStateOptions {
  onFound?: () => void;
}

/**
 * Manages Easter egg state for the recipient journey.
 * Ensures exactly one egg appears per session.
 */
export function useEasterEggState(options?: UseEasterEggStateOptions): EasterEggState {
  const [targetScreen, setTargetScreen] = useState<EasterEggScreen>('arrival');
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);

  // Initialize target screen once per session
  useEffect(() => {
    const screen = getRandomScreen();
    setTargetScreen(screen);
  }, []);

  const markAsRevealed = () => {
    setHasBeenRevealed(true);
    options?.onFound?.();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const shouldShowOnScreen = (_screen: EasterEggScreen) => {
    // Show on ALL screens until revealed (more discoverable)
    return !hasBeenRevealed;
  };

  return {
    targetScreen,
    hasBeenRevealed,
    markAsRevealed,
    shouldShowOnScreen,
  };
}
