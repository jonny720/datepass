import type { HumorLevel, Language } from '@/types';
import { SCORE_DISCLAIMERS_BY_HUMOR, resolveHumorLevel } from './humorCopy';

interface CalculationStep {
  en: string;
  he: string;
}

export const CALCULATION_STEPS: CalculationStep[] = [
  {
    en: 'Calculating compatibility...',
    he: 'מחשבים התאמה...',
  },
  {
    en: 'Checking dessert preferences...',
    he: 'בודקים העדפות קינוחים...',
  },
  {
    en: 'Estimating awkward silence probability...',
    he: 'מעריכים את הסיכוי לשתיקה מביכה...',
  },
  {
    en: 'Ignoring scientific standards...',
    he: 'מתעלמים מסטנדרטים מדעיים...',
  },
];

interface ScoreDisclaimer {
  en: string;
  he: string;
}

export const SCORE_DISCLAIMERS: ScoreDisclaimer[] = [
  {
    en: 'Source: advanced guessing.',
    he: 'מקור: ניחוש מתקדם.',
  },
  {
    en: 'Scientifically questionable. Emotionally convincing.',
    he: 'מדעית מפוקפק. רגשית משכנע.',
  },
  {
    en: 'Calculated using highly suspicious mathematics.',
    he: 'חושב באמצעות מתמטיקה חשודה מאוד.',
  },
  {
    en: 'Results verified by nobody.',
    he: 'התוצאות לא אומתו על ידי אף אחד.',
  },
];

export function getCalculationStep(index: number, language: Language): string {
  if (index < 0 || index >= CALCULATION_STEPS.length) {
    return '';
  }
  return CALCULATION_STEPS[index][language];
}

export function getScoreDisclaimer(
  index: number,
  language: Language,
  humorLevel?: HumorLevel
): string {
  const resolvedHumorLevel = resolveHumorLevel(humorLevel);
  const disclaimers = SCORE_DISCLAIMERS_BY_HUMOR[resolvedHumorLevel][language];
  return disclaimers[index % disclaimers.length];
}

export function generateCompatibilityScore(inviteId: string = ''): number {
  // Generate deterministic score based on invite ID to avoid changes on rerender
  // If no ID, fallback to random
  if (!inviteId) {
    return Math.floor(Math.random() * (99 - 85 + 1)) + 85;
  }
  
  // Simple hash function for deterministic score
  let hash = 0;
  for (let i = 0; i < inviteId.length; i++) {
    hash = ((hash << 5) - hash) + inviteId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  // Map hash to 85-99 range
  const range = 99 - 85 + 1;
  return 85 + (Math.abs(hash) % range);
}
