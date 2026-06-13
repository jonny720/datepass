import { describe, expect, it } from 'vitest';
import { translate, translations } from './index';
import type { TranslationKey } from './types';

describe('i18n', () => {
  describe('translations', () => {
    it('includes both English and Hebrew', () => {
      expect(translations).toHaveProperty('en');
      expect(translations).toHaveProperty('he');
    });

    it('has matching keys for both languages', () => {
      const enKeys = Object.keys(translations.en).sort();
      const heKeys = Object.keys(translations.he).sort();
      expect(enKeys).toEqual(heKeys);
    });

    it('has no empty strings in English', () => {
      const allowedEmpty = ['creator_names_subtitle', 'creator_theme_subtitle', 'creator_slots_empty_state', 'creator_review_subtitle'];
      const enValues = Object.entries(translations.en);
      enValues.forEach(([key, value]) => {
        expect(value).toBeTypeOf('string');
        if (!allowedEmpty.includes(key)) {
          expect(value.trim()).not.toBe('');
        }
      });
    });

    it('has no empty strings in Hebrew', () => {
      const allowedEmpty = ['creator_names_subtitle', 'creator_theme_subtitle', 'creator_slots_empty_state', 'creator_review_subtitle'];
      const heValues = Object.entries(translations.he);
      heValues.forEach(([key, value]) => {
        expect(value).toBeTypeOf('string');
        if (!allowedEmpty.includes(key)) {
          expect(value.trim()).not.toBe('');
        }
      });
    });
  });

  describe('translate', () => {
    it('returns English translation for en language', () => {
      const result = translate('en', 'app_title');
      expect(result).toBe('DatePass');
    });

    it('returns Hebrew translation for he language', () => {
      const result = translate('he', 'app_title');
      expect(result).toBe('DatePass');
    });

    it('translates landing_subtitle correctly', () => {
      const enResult = translate('en', 'landing_subtitle');
      const heResult = translate('he', 'landing_subtitle');
      
      expect(enResult).toBe('Create playful invitations');
      expect(heResult).toBe('צרו הזמנות אינטראקטיביות מקוריות');
    });

    it('translates all keys without errors', () => {
      const keys = Object.keys(translations.en) as TranslationKey[];
      
      keys.forEach((key) => {
        expect(() => translate('en', key)).not.toThrow();
        expect(() => translate('he', key)).not.toThrow();
      });
    });

    it('returns different translations for different languages', () => {
      const enSubtitle = translate('en', 'landing_subtitle');
      const heSubtitle = translate('he', 'landing_subtitle');
      
      // Should be different (except for brand names like 'DatePass')
      if (enSubtitle !== 'DatePass') {
        expect(enSubtitle).not.toBe(heSubtitle);
      }
    });
  });
});
