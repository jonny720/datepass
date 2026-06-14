import type { ThemeId } from '@/types';

export const ENABLE_ADULT_THEMES = true;
export const ADULT_THEMES_STORAGE_KEY = 'datepass_adult_themes_unlocked';

const THEME_GATE_PRIMARY = '30';
const THEME_GATE_SECONDARY = '07';
const THEME_GATE_FINAL = '1991';
const ADULT_THEME_IDS: readonly ThemeId[] = ['after_dark', 'temptation', 'power-play'];

function getThemeGateValue(): string {
  return `${THEME_GATE_PRIMARY}${THEME_GATE_SECONDARY}${THEME_GATE_FINAL}`;
}

function normalizeUnlockInput(value: string): string {
  return value.replace(/\D/g, '');
}

// Lightweight client-side obfuscation only.
// This is not real security; it only prevents casual discovery in the frontend UI/source.
export function isAdultThemeUnlockCode(input: string): boolean {
  return normalizeUnlockInput(input) === getThemeGateValue();
}

export function isAdultThemeId(themeId: ThemeId): boolean {
  return ADULT_THEME_IDS.includes(themeId);
}
