import { describe, it, expect } from 'vitest';
import {
  encodeInviteConfigV2,
  decodeInviteConfigV2,
  validateGeneratedInviteUrl,
} from './compression';
import type { InviteConfig } from '@/types';

describe('compression', () => {
  const minimalConfig: InviteConfig = {
    version: 1,
    language: 'en',
    senderName: 'Alice',
    recipientName: 'Bob',
    theme: 'cruise',
    introTone: 'light',
    introCards: [],
    activityIds: [],
    dateSlots: [],
    whatsappNumber: '',
  };

  const complexConfig: InviteConfig = {
    version: 1,
    language: 'he',
    senderName: 'שרה',
    recipientName: 'דוד',
    theme: 'secret_mission',
    introTone: 'flirty',
    introCards: [
      { id: '1', promptKey: 'intro_card_1', answer: 'קפה טוב' },
      { id: '2', promptKey: 'intro_card_2', answer: 'הרים יפים' },
      { id: '3', promptKey: 'intro_card_3', answer: 'שקיעה רומנטית' },
    ],
    activityIds: ['coffee', 'sunset-walk', 'movie', 'restaurant'],
    dateSlots: [
      { id: '1', date: '2026-06-20', time: '19:00' },
      { id: '2', date: '2026-06-21', time: '20:30' },
    ],
    whatsappNumber: '+972501234567',
  };

  describe('encodeInviteConfigV2', () => {
    it('encodes minimal config', () => {
      const encoded = encodeInviteConfigV2(minimalConfig);

      expect(encoded).toBeTypeOf('string');
      expect(encoded.length).toBeGreaterThan(0);
    });

    it('encodes complex config', () => {
      const encoded = encodeInviteConfigV2(complexConfig);

      expect(encoded).toBeTypeOf('string');
      expect(encoded.length).toBeGreaterThan(0);
    });

    it('produces different outputs for different configs', () => {
      const encoded1 = encodeInviteConfigV2(minimalConfig);
      const encoded2 = encodeInviteConfigV2(complexConfig);

      expect(encoded1).not.toBe(encoded2);
    });

    it('compressed output is shorter than JSON', () => {
      const jsonLength = JSON.stringify(complexConfig).length;
      const encoded = encodeInviteConfigV2(complexConfig);

      // Compression should significantly reduce size
      expect(encoded.length).toBeLessThan(jsonLength);
    });

    it('handles Hebrew text correctly', () => {
      const hebrewConfig: InviteConfig = {
        ...minimalConfig,
        language: 'he',
        senderName: 'אלכס',
        recipientName: 'ירדן',
      };

      const encoded = encodeInviteConfigV2(hebrewConfig);
      const decoded = decodeInviteConfigV2(encoded);

      expect(decoded.language).toBe('he');
      expect(decoded.senderName).toBe('אלכס');
      expect(decoded.recipientName).toBe('ירדן');
    });

    it('handles emoji if present', () => {
      const configWithEmoji: InviteConfig = {
        ...minimalConfig,
        introCards: [
          { id: '1', promptKey: 'intro_card_1', answer: 'Pizza 🍕' },
          { id: '2', promptKey: 'intro_card_2', answer: 'Beach 🏖️' },
        ],
      };

      const encoded = encodeInviteConfigV2(configWithEmoji);
      const decoded = decodeInviteConfigV2(encoded);

      expect(decoded.introCards[0].answer).toBe('Pizza 🍕');
      expect(decoded.introCards[1].answer).toBe('Beach 🏖️');
    });

    it('handles long prompt answers', () => {
      const longAnswer = 'A'.repeat(500);
      const configWithLongAnswer: InviteConfig = {
        ...minimalConfig,
        introCards: [{ id: '1', promptKey: 'intro_card_1', answer: longAnswer }],
      };

      const encoded = encodeInviteConfigV2(configWithLongAnswer);
      const decoded = decodeInviteConfigV2(encoded);

      expect(decoded.introCards[0].answer).toBe(longAnswer);
    });

    it('produces URL-safe or percent-encoded output', () => {
      const encoded = encodeInviteConfigV2(complexConfig);

      // Should not contain raw newlines, spaces, or tabs
      expect(encoded).not.toMatch(/\n/);
      expect(encoded).not.toMatch(/\r/);
      expect(encoded).not.toMatch(/\t/);
      expect(encoded).not.toMatch(/ /);

      // lz-string's compressToEncodedURIComponent produces encodeURIComponent-safe output
      // which means it can contain alphanumerics and some special chars but no raw spaces
      const decoded = decodeURIComponent(encoded);
      expect(decoded).toBeTypeOf('string');
    });

    it('output can be safely used in URLs', () => {
      const encoded = encodeInviteConfigV2(complexConfig);

      // The key requirement: it should work in URLs
      // URLSearchParams will automatically handle encoding/decoding
      const testUrl = `https://example.com/?i=${encoded}`;
      
      expect(() => new URL(testUrl)).not.toThrow();
      
      // Test round-trip through URL
      const url = new URL(testUrl);
      const retrieved = url.searchParams.get('i');
      
      // URLSearchParams may decode some characters, but the payload should still be decodable
      expect(retrieved).toBeTypeOf('string');
      expect(retrieved!.length).toBeGreaterThan(0);
      
      // The real test: can we decode it?
      const roundTripped = decodeInviteConfigV2(retrieved!);
      expect(roundTripped.senderName).toBe(complexConfig.senderName);
      expect(roundTripped.recipientName).toBe(complexConfig.recipientName);
    });
  });

  describe('decodeInviteConfigV2', () => {
    it('decodes encoded config correctly', () => {
      const encoded = encodeInviteConfigV2(minimalConfig);
      const decoded = decodeInviteConfigV2(encoded);

      expect(decoded.language).toBe(minimalConfig.language);
      expect(decoded.senderName).toBe(minimalConfig.senderName);
      expect(decoded.recipientName).toBe(minimalConfig.recipientName);
      expect(decoded.theme).toBe(minimalConfig.theme);
      expect(decoded.introTone).toBe(minimalConfig.introTone);
    });

    it('round-trips complex config', () => {
      const encoded = encodeInviteConfigV2(complexConfig);
      const decoded = decodeInviteConfigV2(encoded);

      expect(decoded.language).toBe(complexConfig.language);
      expect(decoded.senderName).toBe(complexConfig.senderName);
      expect(decoded.recipientName).toBe(complexConfig.recipientName);
      expect(decoded.theme).toBe(complexConfig.theme);
      expect(decoded.introTone).toBe(complexConfig.introTone);
      expect(decoded.whatsappNumber).toBe(complexConfig.whatsappNumber);
      expect(decoded.activityIds).toEqual(complexConfig.activityIds);

      // Compare cards without IDs (they're regenerated)
      expect(decoded.introCards.map(c => ({ promptKey: c.promptKey, answer: c.answer }))).toEqual(
        complexConfig.introCards.map(c => ({ promptKey: c.promptKey, answer: c.answer }))
      );

      // Compare slots without IDs
      expect(decoded.dateSlots.map(d => ({ date: d.date, time: d.time }))).toEqual(
        complexConfig.dateSlots.map(d => ({ date: d.date, time: d.time }))
      );
    });

    it('throws error for invalid encoded string', () => {
      expect(() => decodeInviteConfigV2('invalid-garbage')).toThrow();
    });

    it('throws error for empty string', () => {
      expect(() => decodeInviteConfigV2('')).toThrow();
    });

    it('throws error for malformed JSON', () => {
      // Create a payload that decompresses to invalid JSON
      expect(() => decodeInviteConfigV2('not-valid-lz-compressed')).toThrow();
    });
  });

  describe('validateGeneratedInviteUrl', () => {
    it('validates correct URL with ?i= parameter', () => {
      const url = 'https://example.com/datepass/?i=abc123';

      expect(() => validateGeneratedInviteUrl(url)).not.toThrow();
    });

    it('validates localhost URL', () => {
      const url = 'http://localhost:5173/?i=abc123';

      expect(() => validateGeneratedInviteUrl(url)).not.toThrow();
    });

    it('throws error for missing payload', () => {
      const url = 'https://example.com/datepass/';

      expect(() => validateGeneratedInviteUrl(url)).toThrow('missing compact payload');
    });

    it('throws error for URL with whitespace', () => {
      const url = 'https://example.com/datepass/?i=abc 123';

      expect(() => validateGeneratedInviteUrl(url)).toThrow('contains whitespace');
    });

    it('throws error for URL with hash', () => {
      const url = 'https://example.com/datepass/?i=abc123#something';

      expect(() => validateGeneratedInviteUrl(url)).toThrow('should not contain a hash');
    });

    it('handles percent-encoded payloads in URLs', () => {
      const url = 'https://example.com/datepass/?i=abc%2Bdef';

      // This should work because URLSearchParams handles percent encoding
      expect(() => validateGeneratedInviteUrl(url)).not.toThrow();
    });

    it('throws error for invalid URL format', () => {
      const url = 'not-a-url';

      expect(() => validateGeneratedInviteUrl(url)).toThrow();
    });

    it('accepts URL with # but empty hash', () => {
      const url = 'https://example.com/datepass/?i=abc123#';

      // Empty hash (#) should be acceptable
      expect(() => validateGeneratedInviteUrl(url)).not.toThrow();
    });
  });

  describe('compression efficiency', () => {
    it('achieves significant compression for typical invitation', () => {
      const typicalConfig: InviteConfig = {
        version: 1,
        language: 'en',
        senderName: 'Alex',
        recipientName: 'Jordan',
        theme: 'cruise',
        introTone: 'light',
        introCards: [
          { id: '1', promptKey: 'intro_card_1', answer: 'Adventure awaits!' },
          { id: '2', promptKey: 'intro_card_2', answer: 'Life is short' },
        ],
        activityIds: ['coffee', 'sunset-walk', 'restaurant'],
        dateSlots: [
          { id: '1', date: '2026-06-20', time: '19:00' },
          { id: '2', date: '2026-06-21', time: '18:30' },
        ],
        whatsappNumber: '+1234567890',
      };

      const jsonLength = JSON.stringify(typicalConfig).length;
      const encoded = encodeInviteConfigV2(typicalConfig);

      const compressionRatio = encoded.length / jsonLength;

      // Should compress to less than 80% of original JSON size
      expect(compressionRatio).toBeLessThan(0.8);

      if (import.meta.env.DEV) {
        console.log('Compression test:', {
          originalJSON: jsonLength,
          compressed: encoded.length,
          ratio: Math.round(compressionRatio * 100) + '%',
        });
      }
    });

    it('produces short URLs for minimal invitations', () => {
      const encoded = encodeInviteConfigV2(minimalConfig);
      const baseUrl = 'https://jonny720.github.io/datepass/';
      const fullUrl = `${baseUrl}?i=${encoded}`;

      // Minimal invitation should produce a short URL
      expect(fullUrl.length).toBeLessThan(200);

      if (import.meta.env.DEV) {
        console.log('Minimal URL length:', fullUrl.length);
      }
    });

    it('produces reasonable URLs for complex invitations', () => {
      const encoded = encodeInviteConfigV2(complexConfig);
      const baseUrl = 'https://jonny720.github.io/datepass/';
      const fullUrl = `${baseUrl}?i=${encoded}`;

      // Complex invitation should still be under 700 characters
      expect(fullUrl.length).toBeLessThan(700);

      if (import.meta.env.DEV) {
        console.log('Complex URL length:', fullUrl.length);
      }
    });
  });
});
