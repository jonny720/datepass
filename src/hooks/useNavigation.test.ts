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
      expect(url).toContain('#/invite/');
      expect(url).toMatch(/^https?:\/\//);
    });

    it('creates URL with encoded config', () => {
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
      expect(url).toContain('#/invite/');
      
      // Extract encoded part
      const hashIndex = url.indexOf('#/invite/');
      expect(hashIndex).toBeGreaterThan(-1);
      
      const encoded = url.slice(hashIndex + 9);
      expect(encoded).toBeTypeOf('string');
      expect(encoded.length).toBeGreaterThan(0);
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
      expect(url).toContain('#/invite/');
      expect(url).toBeTypeOf('string');
    });
  });
});
