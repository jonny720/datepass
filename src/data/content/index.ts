import type { Language, IntroTone } from '@/types';
import { INTRO_PROMPTS_EN, type TonedIntroPrompt } from './introPrompts.en';
import { INTRO_PROMPTS_HE } from './introPrompts.he';

export type { TonedIntroPrompt };

export function getIntroPrompts(language: Language, tone: IntroTone): TonedIntroPrompt[] {
  const allPrompts = language === 'he' ? INTRO_PROMPTS_HE : INTRO_PROMPTS_EN;
  return allPrompts.filter((prompt) => prompt.tone === tone);
}

/**
 * Get three recommended default prompts for a given tone
 * Returns the first 3 prompts of the specified tone
 */
export function getDefaultPrompts(language: Language, tone: IntroTone): TonedIntroPrompt[] {
  const prompts = getIntroPrompts(language, tone);
  return prompts.slice(0, 3);
}
