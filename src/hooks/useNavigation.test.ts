import { describe, expect, it, beforeEach } from 'vitest';
import { createInviteUrl } from './useNavigation';
import type { InviteConfig } from '@/types';
import { SAMPLE_INVITE } from '@/data';

describe('useNavigation', () => {
  beforeEach(() => {
    // Reset URL hash before each test
    window.location.hash = '';
  });

  describe('createInviteUrl', () => {
    it('creates a valid invite URL', () => {
      const url = createInviteUrl(SAMPLE_INVITE);
      expect(url).toContain('?i=');
      expect(url).toMatch(/^https?:\/\//);
    });

    it('creates URL with compressed config', () => {
      const config: InviteConfig = {
        version: 1,
        language: 'en',
        senderName: 'Test',
        recipientName: 'User',
        theme: 'cruise',
        introTone: 'playful',
        introCards: [],
        activityIds: ['coffee'],
        dateSlots: [{ id: '1', date: '2026-06-20', time: '19:00' }],
      };

      const url = createInviteUrl(config);
      expect(url).toContain('?i=');
      
      // Extract compressed part from query parameter
      const urlObj = new URL(url);
      const compressed = urlObj.searchParams.get('i');
      expect(compressed).toBeTypeOf('string');
      expect(compressed!.length).toBeGreaterThan(0);
    });

    it('handles Hebrew config correctly', () => {
      const hebrewConfig: InviteConfig = {
        version: 1,
        language: 'he',
        senderName: 'אלכס',
        recipientName: 'ירדן',
        theme: 'secret_mission',
        introTone: 'flirty',
        introCards: [
          { id: '1', promptKey: 'test', answer: 'תשובה' },
        ],
        activityIds: ['restaurant'],
        dateSlots: [{ id: '1', date: '2026-06-21', time: '20:00' }],
      };

      const url = createInviteUrl(hebrewConfig);
      expect(url).toContain('?i=');
      expect(url).toBeTypeOf('string');
    });
  });
});
