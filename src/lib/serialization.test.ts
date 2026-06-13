import { describe, expect, it } from 'vitest';
import {
  encodeInvite,
  decodeInvite,
  isValidEncodedInvite,
  InviteValidationError,
} from './serialization';
import type { InviteConfig } from '@/types';

describe('serialization', () => {
  const validConfig: InviteConfig = {
    version: 1,
    language: 'en',
    senderName: 'Alice',
    recipientName: 'Bob',
    theme: 'cruise',
    introTone: 'playful',
    introCards: [
      { id: '1', promptKey: 'test', answer: 'Test answer' },
    ],
    activityIds: ['coffee', 'sunset-walk'],
    dateSlots: [
      { id: '1', date: '2026-06-20', time: '19:00' },
    ],
    whatsappNumber: '+1234567890',
  };

  describe('encodeInvite', () => {
    it('encodes a valid config to a string', () => {
      const encoded = encodeInvite(validConfig);
      expect(encoded).toBeTypeOf('string');
      expect(encoded.length).toBeGreaterThan(0);
    });

    it('produces URL-safe output (no +, /, or =)', () => {
      const encoded = encodeInvite(validConfig);
      expect(encoded).not.toMatch(/[+/=]/);
    });

    it('handles Hebrew text correctly', () => {
      const hebrewConfig: InviteConfig = {
        ...validConfig,
        language: 'he',
        senderName: 'אלכס',
        recipientName: 'ירדן',
        introCards: [
          { id: '1', promptKey: 'test', answer: 'תשובה בעברית' },
        ],
      };
      const encoded = encodeInvite(hebrewConfig);
      expect(encoded).toBeTypeOf('string');
      expect(encoded.length).toBeGreaterThan(0);
    });

    it('handles special Unicode characters', () => {
      const unicodeConfig: InviteConfig = {
        ...validConfig,
        senderName: '🎉 Alex',
        recipientName: 'Bob 💝',
      };
      const encoded = encodeInvite(unicodeConfig);
      expect(encoded).toBeTypeOf('string');
    });
  });

  describe('decodeInvite', () => {
    it('decodes a valid encoded config', () => {
      const encoded = encodeInvite(validConfig);
      const decoded = decodeInvite(encoded);
      expect(decoded).toEqual(validConfig);
    });

    it('decodes Hebrew text correctly', () => {
      const hebrewConfig: InviteConfig = {
        ...validConfig,
        language: 'he',
        senderName: 'אלכס',
        recipientName: 'ירדן',
        introCards: [
          { id: '1', promptKey: 'test', answer: 'תשובה בעברית' },
        ],
      };
      const encoded = encodeInvite(hebrewConfig);
      const decoded = decodeInvite(encoded);
      expect(decoded).toEqual(hebrewConfig);
    });

    it('handles mixed Hebrew and English text', () => {
      const mixedConfig: InviteConfig = {
        ...validConfig,
        senderName: 'Alex אלכס',
        recipientName: 'Bob בוב',
      };
      const encoded = encodeInvite(mixedConfig);
      const decoded = decodeInvite(encoded);
      expect(decoded).toEqual(mixedConfig);
    });

    it('throws InviteValidationError for invalid base64', () => {
      expect(() => decodeInvite('not-valid-base64!!!')).toThrow(
        InviteValidationError
      );
    });

    it('throws InviteValidationError for malformed JSON', () => {
      const invalidBase64 = btoa('not json');
      expect(() => decodeInvite(invalidBase64)).toThrow(
        InviteValidationError
      );
    });

    it('throws InviteValidationError for unsupported version', () => {
      const invalidConfig = { ...validConfig, version: 999 };
      const encoded = encodeInvite(invalidConfig as InviteConfig);
      expect(() => decodeInvite(encoded)).toThrow(InviteValidationError);
      expect(() => decodeInvite(encoded)).toThrow(/Unsupported version/);
    });

    it('throws InviteValidationError for missing required fields', () => {
      const incompleteConfig = { version: 1, language: 'en' };
      const encoded = btoa(JSON.stringify(incompleteConfig));
      expect(() => decodeInvite(encoded)).toThrow(InviteValidationError);
    });

    it('throws InviteValidationError for invalid language', () => {
      const invalidConfig = { ...validConfig, language: 'fr' };
      const json = JSON.stringify(invalidConfig);
      const encoded = btoa(json);
      expect(() => decodeInvite(encoded)).toThrow(InviteValidationError);
      expect(() => decodeInvite(encoded)).toThrow(/Invalid language/);
    });

    it('throws InviteValidationError for empty sender name', () => {
      const invalidConfig = { ...validConfig, senderName: '  ' };
      const json = JSON.stringify(invalidConfig);
      const bytes = new TextEncoder().encode(json);
      const base64 = btoa(String.fromCharCode(...bytes));
      const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      expect(() => decodeInvite(urlSafe)).toThrow(InviteValidationError);
      expect(() => decodeInvite(urlSafe)).toThrow(/Invalid sender name/);
    });

    it('throws InviteValidationError for invalid theme', () => {
      const invalidConfig = { ...validConfig, theme: 'invalid-theme' };
      const json = JSON.stringify(invalidConfig);
      const bytes = new TextEncoder().encode(json);
      const base64 = btoa(String.fromCharCode(...bytes));
      const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      expect(() => decodeInvite(urlSafe)).toThrow(InviteValidationError);
      expect(() => decodeInvite(urlSafe)).toThrow(/Invalid theme/);
    });

    it('allows empty date slots array', () => {
      const validConfigEmptySlots = { ...validConfig, dateSlots: [] };
      const json = JSON.stringify(validConfigEmptySlots);
      const bytes = new TextEncoder().encode(json);
      const base64 = btoa(String.fromCharCode(...bytes));
      const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      expect(() => decodeInvite(urlSafe)).not.toThrow();
      const decoded = decodeInvite(urlSafe);
      expect(decoded.dateSlots).toEqual([]);
    });
  });

  describe('isValidEncodedInvite', () => {
    it('returns true for valid encoded invite', () => {
      const encoded = encodeInvite(validConfig);
      expect(isValidEncodedInvite(encoded)).toBe(true);
    });

    it('returns false for invalid encoded invite', () => {
      expect(isValidEncodedInvite('invalid')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(isValidEncodedInvite('')).toBe(false);
    });

    it('returns false for malformed base64', () => {
      expect(isValidEncodedInvite('not-valid-base64!!!')).toBe(false);
    });
  });

  describe('round-trip encoding', () => {
    it('preserves data through encode/decode cycle', () => {
      const encoded = encodeInvite(validConfig);
      const decoded = decodeInvite(encoded);
      expect(decoded).toEqual(validConfig);
    });

    it('handles config without optional whatsappNumber', () => {
      const configWithoutWhatsapp: InviteConfig = {
        ...validConfig,
        whatsappNumber: undefined,
      };
      const encoded = encodeInvite(configWithoutWhatsapp);
      const decoded = decodeInvite(encoded);
      expect(decoded).toEqual(configWithoutWhatsapp);
    });

    it('handles multiple intro cards', () => {
      const configWithMultipleCards: InviteConfig = {
        ...validConfig,
        introCards: [
          { id: '1', promptKey: 'q1', answer: 'Answer 1' },
          { id: '2', promptKey: 'q2', answer: 'Answer 2' },
          { id: '3', promptKey: 'q3', answer: 'Answer 3' },
        ],
      };
      const encoded = encodeInvite(configWithMultipleCards);
      const decoded = decodeInvite(encoded);
      expect(decoded).toEqual(configWithMultipleCards);
    });

    it('handles all activity types', () => {
      const configWithAllActivities: InviteConfig = {
        ...validConfig,
        activityIds: [
          'drinks',
          'restaurant',
          'coffee',
          'sunset-walk',
          'movie',
          'competitive',
          'creative',
          'surprise-me',
        ],
      };
      const encoded = encodeInvite(configWithAllActivities);
      const decoded = decodeInvite(encoded);
      expect(decoded).toEqual(configWithAllActivities);
    });
  });
});
