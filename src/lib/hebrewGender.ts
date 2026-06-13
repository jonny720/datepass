import type { RecipientGender } from '@/types';

export function heByGender(
  gender: RecipientGender | null | undefined,
  options: { male: string; female: string; private: string }
) {
  if (gender === 'male') return options.male;
  if (gender === 'female') return options.female;
  return options.private;
}
