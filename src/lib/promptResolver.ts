import type { Language } from '@/types';
import { INTRO_PROMPTS_EN } from '@/data/content/introPrompts.en';
import { INTRO_PROMPTS_HE } from '@/data/content/introPrompts.he';

/**
 * Resolves a prompt key (e.g., "playful-8") to its localized display label.
 * 
 * @param promptKey - The internal prompt ID (e.g., "playful-8", "flirty-3")
 * @param language - The target language ('en' or 'he')
 * @returns The localized prompt label, or a fallback if the key is unknown
 * 
 * @example
 * getPromptLabel('playful-8', 'en') // "I can probably beat you at..."
 * getPromptLabel('unknown-key', 'en') // "A question about me"
 */
export function getPromptLabel(promptKey: string, language: Language): string {
  const prompts = language === 'he' ? INTRO_PROMPTS_HE : INTRO_PROMPTS_EN;
  const prompt = prompts.find(p => p.id === promptKey);
  
  if (prompt) {
    return prompt.prompt;
  }
  
  // Fallback for unknown keys - never expose raw internal IDs
  return language === 'he' ? 'שאלה עליי' : 'A question about me';
}

/**
 * Check if a prompt key exists in the data
 */
export function isValidPromptKey(promptKey: string, language: Language): boolean {
  const prompts = language === 'he' ? INTRO_PROMPTS_HE : INTRO_PROMPTS_EN;
  return prompts.some(p => p.id === promptKey);
}
