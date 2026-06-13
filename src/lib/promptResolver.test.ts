import { describe, it, expect } from 'vitest';
import { getPromptLabel, isValidPromptKey } from './promptResolver';

describe('promptResolver', () => {
  describe('getPromptLabel', () => {
    it('resolves known light prompt in English', () => {
      const label = getPromptLabel('light-1', 'en');
      expect(label).toBe('In my free time I like to...');
    });

    it('resolves known light prompt (light-8) in English', () => {
      const label = getPromptLabel('light-8', 'en');
      expect(label).toBe('I can probably beat you at...');
    });

    it('resolves known flirty prompt in English', () => {
      const label = getPromptLabel('flirty-1', 'en');
      expect(label).toBeTruthy();
      expect(label).not.toBe('flirty-1'); // Should not return raw key
    });

    it('resolves known absurd prompt in English', () => {
      const label = getPromptLabel('absurd-1', 'en');
      expect(label).toBeTruthy();
      expect(label).not.toBe('absurd-1'); // Should not return raw key
    });

    it('resolves known prompt in Hebrew', () => {
      const label = getPromptLabel('light-1', 'he');
      expect(label).toBeTruthy();
      expect(label).not.toBe('light-1'); // Should not return raw key
    });

    it('returns fallback for unknown prompt in English', () => {
      const label = getPromptLabel('unknown-key-999', 'en');
      expect(label).toBe('A question about me');
      expect(label).not.toContain('unknown');
      expect(label).not.toContain('999');
    });

    it('returns fallback for unknown prompt in Hebrew', () => {
      const label = getPromptLabel('invalid-prompt', 'he');
      expect(label).toBe('שאלה עליי');
      expect(label).not.toContain('invalid');
    });

    it('never exposes raw internal prompt IDs', () => {
      const unknownLabel = getPromptLabel('some-internal-id', 'en');
      expect(unknownLabel).not.toContain('internal');
      expect(unknownLabel).not.toContain('id');
      expect(unknownLabel).toBe('A question about me');
    });
  });

  describe('isValidPromptKey', () => {
    it('returns true for valid light prompt', () => {
      expect(isValidPromptKey('light-1', 'en')).toBe(true);
    });

    it('returns true for valid flirty prompt', () => {
      expect(isValidPromptKey('flirty-1', 'en')).toBe(true);
    });

    it('returns false for unknown prompt', () => {
      expect(isValidPromptKey('unknown-999', 'en')).toBe(false);
    });

    it('works with Hebrew prompts', () => {
      expect(isValidPromptKey('light-1', 'he')).toBe(true);
    });
  });
});
