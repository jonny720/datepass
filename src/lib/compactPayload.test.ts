import { describe, it, expect } from 'vitest';
import {
  toCompactPayload,
  fromCompactPayload,
  validateCompactPayload,
  type CompactInvitePayloadV2,
} from './compactPayload';
import type { InviteConfig } from '@/types';

describe('compactPayload', () => {
  const baseConfig: InviteConfig = {
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

  describe('toCompactPayload', () => {
    it('converts minimal config to compact payload', () => {
      const compact = toCompactPayload(baseConfig);

      expect(compact).toEqual({
        v: 2,
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
      });
    });

    it('converts Hebrew language correctly', () => {
      const hebrewConfig: InviteConfig = {
        ...baseConfig,
        language: 'he',
        senderName: 'אלכס',
        recipientName: 'ירדן',
      };

      const compact = toCompactPayload(hebrewConfig);

      expect(compact.l).toBe('h');
      expect(compact.s).toBe('אלכס');
      expect(compact.r).toBe('ירדן');
    });

    it('maps theme to compact code', () => {
      const themes: Array<{ theme: 'cruise' | 'secret_mission' | 'nature' | 'party' | 'after_dark'; code: string }> = [
        { theme: 'cruise', code: 'c' },
        { theme: 'secret_mission', code: 'm' },
        { theme: 'nature', code: 'n' },
        { theme: 'party', code: 'p' },
        { theme: 'after_dark', code: 'd' },
      ];

      themes.forEach(({ theme, code }) => {
        const config: InviteConfig = { ...baseConfig, theme };
        const compact = toCompactPayload(config);
        expect(compact.t).toBe(code);
      });
    });

    it('maps intro tone to compact code', () => {
      const tones: Array<{ tone: 'light' | 'flirty' | 'absurd'; code: string }> = [
        { tone: 'light', code: 'p' },
        { tone: 'flirty', code: 'f' },
        { tone: 'absurd', code: 'a' },
      ];

      tones.forEach(({ tone, code }) => {
        const config: InviteConfig = { ...baseConfig, introTone: tone };
        const compact = toCompactPayload(config);
        expect(compact.i).toBe(code);
      });
    });

    it('maps activities to compact codes', () => {
      const config: InviteConfig = {
        ...baseConfig,
        activityIds: ['drinks', 'restaurant', 'coffee', 'sunset-walk'],
      };

      const compact = toCompactPayload(config);

      expect(compact.a).toEqual(['d', 'r', 'c', 's']);
    });

    it('includes intro cards as tuples', () => {
      const config: InviteConfig = {
        ...baseConfig,
        introCards: [
          { id: '1', promptKey: 'intro_card_1', answer: 'Pizza' },
          { id: '2', promptKey: 'intro_card_2', answer: 'Mountains' },
        ],
      };

      const compact = toCompactPayload(config);

      expect(compact.c).toEqual([
        ['intro_card_1', 'Pizza'],
        ['intro_card_2', 'Mountains'],
      ]);
    });

    it('includes date slots as tuples', () => {
      const config: InviteConfig = {
        ...baseConfig,
        dateSlots: [
          { id: '1', date: '2026-06-20', time: '19:00' },
          { id: '2', date: '2026-06-21', time: '20:30' },
        ],
      };

      const compact = toCompactPayload(config);

      expect(compact.d).toEqual([
        ['2026-06-20', '19:00'],
        ['2026-06-21', '20:30'],
      ]);
    });

    it('includes WhatsApp number when present', () => {
      const config: InviteConfig = {
        ...baseConfig,
        whatsappNumber: '+1234567890',
      };

      const compact = toCompactPayload(config);

      expect(compact.n).toBe('+1234567890');
    });

    it('omits empty intro cards array', () => {
      const config: InviteConfig = {
        ...baseConfig,
        introCards: [],
      };

      const compact = toCompactPayload(config);

      expect(compact.c).toBeUndefined();
    });

    it('omits empty activities array', () => {
      const config: InviteConfig = {
        ...baseConfig,
        activityIds: [],
      };

      const compact = toCompactPayload(config);

      expect(compact.a).toBeUndefined();
    });

    it('omits empty date slots array', () => {
      const config: InviteConfig = {
        ...baseConfig,
        dateSlots: [],
      };

      const compact = toCompactPayload(config);

      expect(compact.d).toBeUndefined();
    });

    it('omits empty WhatsApp number', () => {
      const config: InviteConfig = {
        ...baseConfig,
        whatsappNumber: '',
      };

      const compact = toCompactPayload(config);

      expect(compact.n).toBeUndefined();
    });

    it('omits whitespace-only WhatsApp number', () => {
      const config: InviteConfig = {
        ...baseConfig,
        whatsappNumber: '   ',
      };

      const compact = toCompactPayload(config);

      expect(compact.n).toBeUndefined();
    });
  });

  describe('fromCompactPayload', () => {
    it('converts minimal compact payload to config', () => {
      const compact: CompactInvitePayloadV2 = {
        v: 2,
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
      };

      const config = fromCompactPayload(compact);

      expect(config).toMatchObject({
        version: 1,
        language: 'en',
        senderName: 'Alice',
        recipientName: 'Bob',
        theme: 'cruise',
        introTone: 'light',
        whatsappNumber: '',
      });
      expect(config.introCards).toEqual([]);
      expect(config.activityIds).toEqual([]);
      expect(config.dateSlots).toEqual([]);
    });

    it('converts Hebrew language correctly', () => {
      const compact: CompactInvitePayloadV2 = {
        v: 2,
        l: 'h',
        s: 'אלכס',
        r: 'ירדן',
        t: 'c',
        i: 'p',
      };

      const config = fromCompactPayload(compact);

      expect(config.language).toBe('he');
      expect(config.senderName).toBe('אלכס');
      expect(config.recipientName).toBe('ירדן');
    });

    it('maps theme codes back to full names', () => {
      const themes = [
        { code: 'c', theme: 'cruise' },
        { code: 'm', theme: 'secret_mission' },
        { code: 'n', theme: 'nature' },
        { code: 'p', theme: 'party' },
        { code: 'd', theme: 'after_dark' },
      ];

      themes.forEach(({ code, theme }) => {
        const compact: CompactInvitePayloadV2 = {
          v: 2,
          l: 'e',
          s: 'Alice',
          r: 'Bob',
          t: code,
          i: 'p',
        };
        const config = fromCompactPayload(compact);
        expect(config.theme).toBe(theme);
      });
    });

    it('maps intro tone codes back to full names', () => {
      const tones = [
        { code: 'p', tone: 'light' },
        { code: 'f', tone: 'flirty' },
        { code: 'a', tone: 'absurd' },
      ];

      tones.forEach(({ code, tone }) => {
        const compact: CompactInvitePayloadV2 = {
          v: 2,
          l: 'e',
          s: 'Alice',
          r: 'Bob',
          t: 'c',
          i: code,
        };
        const config = fromCompactPayload(compact);
        expect(config.introTone).toBe(tone);
      });
    });

    it('maps activity codes back to full IDs', () => {
      const compact: CompactInvitePayloadV2 = {
        v: 2,
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
        a: ['d', 'r', 'c', 's'],
      };

      const config = fromCompactPayload(compact);

      expect(config.activityIds).toEqual(['drinks', 'restaurant', 'coffee', 'sunset-walk']);
    });

    it('restores intro cards from tuples with generated IDs', () => {
      const compact: CompactInvitePayloadV2 = {
        v: 2,
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
        c: [
          ['intro_card_1', 'Pizza'],
          ['intro_card_2', 'Mountains'],
        ],
      };

      const config = fromCompactPayload(compact);

      expect(config.introCards).toEqual([
        { id: '1', promptKey: 'intro_card_1', answer: 'Pizza' },
        { id: '2', promptKey: 'intro_card_2', answer: 'Mountains' },
      ]);
    });

    it('restores date slots from tuples with generated IDs', () => {
      const compact: CompactInvitePayloadV2 = {
        v: 2,
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
        d: [
          ['2026-06-20', '19:00'],
          ['2026-06-21', '20:30'],
        ],
      };

      const config = fromCompactPayload(compact);

      expect(config.dateSlots).toEqual([
        { id: '1', date: '2026-06-20', time: '19:00' },
        { id: '2', date: '2026-06-21', time: '20:30' },
      ]);
    });

    it('restores WhatsApp number when present', () => {
      const compact: CompactInvitePayloadV2 = {
        v: 2,
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
        n: '+1234567890',
      };

      const config = fromCompactPayload(compact);

      expect(config.whatsappNumber).toBe('+1234567890');
    });

    it('throws error for unsupported version', () => {
      const compact = {
        v: 999,
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
      } as unknown as CompactInvitePayloadV2;

      expect(() => fromCompactPayload(compact)).toThrow('Unsupported payload version: 999');
    });

    it('round-trips complete config correctly', () => {
      const original: InviteConfig = {
        version: 1,
        language: 'he',
        senderName: 'שרה',
        recipientName: 'דוד',
        theme: 'secret_mission',
        introTone: 'flirty',
        introCards: [
          { id: '1', promptKey: 'intro_card_1', answer: 'קפה' },
          { id: '2', promptKey: 'intro_card_2', answer: 'הרים' },
        ],
        activityIds: ['coffee', 'sunset-walk', 'movie'],
        dateSlots: [
          { id: '1', date: '2026-06-20', time: '19:00' },
          { id: '2', date: '2026-06-21', time: '20:30' },
        ],
        whatsappNumber: '+972501234567',
      };

      const compact = toCompactPayload(original);
      const restored = fromCompactPayload(compact);

      // IDs are regenerated, so compare without them
      expect(restored.language).toBe(original.language);
      expect(restored.senderName).toBe(original.senderName);
      expect(restored.recipientName).toBe(original.recipientName);
      expect(restored.theme).toBe(original.theme);
      expect(restored.introTone).toBe(original.introTone);
      expect(restored.whatsappNumber).toBe(original.whatsappNumber);
      expect(restored.activityIds).toEqual(original.activityIds);
      expect(restored.introCards.map(c => ({ promptKey: c.promptKey, answer: c.answer }))).toEqual(
        original.introCards.map(c => ({ promptKey: c.promptKey, answer: c.answer }))
      );
      expect(restored.dateSlots.map(d => ({ date: d.date, time: d.time }))).toEqual(
        original.dateSlots.map(d => ({ date: d.date, time: d.time }))
      );
    });
  });

  describe('validateCompactPayload', () => {
    it('validates correct payload', () => {
      const payload: CompactInvitePayloadV2 = {
        v: 2,
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
      };

      expect(validateCompactPayload(payload)).toBe(true);
    });

    it('rejects null', () => {
      expect(validateCompactPayload(null)).toBe(false);
    });

    it('rejects undefined', () => {
      expect(validateCompactPayload(undefined)).toBe(false);
    });

    it('rejects non-object', () => {
      expect(validateCompactPayload('string')).toBe(false);
      expect(validateCompactPayload(123)).toBe(false);
      expect(validateCompactPayload(true)).toBe(false);
    });

    it('rejects missing version', () => {
      const payload = {
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
      };

      expect(validateCompactPayload(payload)).toBe(false);
    });

    it('rejects wrong version type', () => {
      const payload = {
        v: '2',
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
      };

      expect(validateCompactPayload(payload)).toBe(false);
    });

    it('rejects missing required fields', () => {
      const payloads = [
        { v: 2, s: 'Alice', r: 'Bob', t: 'c', i: 'p' }, // missing l
        { v: 2, l: 'e', r: 'Bob', t: 'c', i: 'p' }, // missing s
        { v: 2, l: 'e', s: 'Alice', t: 'c', i: 'p' }, // missing r
        { v: 2, l: 'e', s: 'Alice', r: 'Bob', i: 'p' }, // missing t
        { v: 2, l: 'e', s: 'Alice', r: 'Bob', t: 'c' }, // missing i
      ];

      payloads.forEach((payload) => {
        expect(validateCompactPayload(payload)).toBe(false);
      });
    });

    it('accepts payload with optional fields', () => {
      const payload: CompactInvitePayloadV2 = {
        v: 2,
        l: 'e',
        s: 'Alice',
        r: 'Bob',
        t: 'c',
        i: 'p',
        n: '+1234567890',
        c: [['key', 'value']],
        a: ['d', 'r'],
        d: [['2026-06-20', '19:00']],
      };

      expect(validateCompactPayload(payload)).toBe(true);
    });

    it('rejects invalid optional field types', () => {
      const payloads = [
        {
          v: 2,
          l: 'e',
          s: 'Alice',
          r: 'Bob',
          t: 'c',
          i: 'p',
          n: 123, // should be string
        },
        {
          v: 2,
          l: 'e',
          s: 'Alice',
          r: 'Bob',
          t: 'c',
          i: 'p',
          c: 'not-array', // should be array
        },
        {
          v: 2,
          l: 'e',
          s: 'Alice',
          r: 'Bob',
          t: 'c',
          i: 'p',
          a: 'not-array', // should be array
        },
        {
          v: 2,
          l: 'e',
          s: 'Alice',
          r: 'Bob',
          t: 'c',
          i: 'p',
          d: 'not-array', // should be array
        },
      ];

      payloads.forEach((payload) => {
        expect(validateCompactPayload(payload)).toBe(false);
      });
    });
  });
});
