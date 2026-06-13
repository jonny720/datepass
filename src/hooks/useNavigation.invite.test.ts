import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createInviteUrl } from './useNavigation';
import type { InviteConfig } from '@/types';

const mockConfig: InviteConfig = {
  version: 1,
  senderName: 'Test Sender',
  recipientName: 'Test Recipient',
  language: 'en',
  theme: 'cruise',
  introTone: 'light',
  introCards: [],
  activityIds: ['coffee'],
  dateSlots: [],
  whatsappNumber: '',
};

describe('createInviteUrl (compressed)', () => {
  const originalLocation = window.location;
  const originalEnv = import.meta.env.BASE_URL;
  
  beforeEach(() => {
    // Mock window.location for testing
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://localhost:5173',
        pathname: '/',
      },
      writable: true,
      configurable: true,
    });
    
    // Reset BASE_URL
    (import.meta.env as { BASE_URL: string }).BASE_URL = '/';
  });

  afterEach(() => {
    // Restore original values
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
    (import.meta.env as { BASE_URL: string }).BASE_URL = originalEnv;
  });

  it('generates URL with compressed query parameter ?i=', () => {
    const url = createInviteUrl(mockConfig);
    
    expect(url).toContain('?i=');
    expect(url).toMatch(/^http:\/\/localhost:5173\/\?i=/);
  });

  it('does not use old ?invite= format', () => {
    const url = createInviteUrl(mockConfig);
    
    expect(url).not.toContain('?invite=');
  });

  it('does not use hash format', () => {
    const url = createInviteUrl(mockConfig);
    
    expect(url).not.toContain('#/invite/');
    expect(url).not.toContain('#');
  });

  it('includes complete compressed payload', () => {
    const url = createInviteUrl(mockConfig);
    const urlObj = new URL(url);
    const compactParam = urlObj.searchParams.get('i');
    
    expect(compactParam).toBeTruthy();
    expect(compactParam!.length).toBeGreaterThan(10);
  });

  it('compressed payload is substantially shorter than verbose', () => {
    const url = createInviteUrl(mockConfig);
    const urlObj = new URL(url);
    const compactParam = urlObj.searchParams.get('i');
    
    // Old verbose format would be ~272 chars for this config
    // New compressed should be significantly shorter
    expect(compactParam!.length).toBeLessThan(200);
  });

  it('generates URL with GitHub Pages base path', () => {
    // Simulate GitHub Pages deployment
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'https://username.github.io',
        pathname: '/datepass/',
      },
      writable: true,
      configurable: true,
    });

    // Mock import.meta.env.BASE_URL
    (import.meta.env as { BASE_URL: string }).BASE_URL = '/datepass/';

    const url = createInviteUrl(mockConfig);
    
    expect(url).toContain('/datepass/');
    expect(url).toContain('?i=');
    expect(url).toMatch(/^https:\/\/username\.github\.io\/datepass\/\?i=/);
  });

  it('does not contain whitespace', () => {
    const url = createInviteUrl(mockConfig);
    
    expect(url).not.toMatch(/\s/);
    expect(url).not.toMatch(/\n/);
    expect(url).not.toMatch(/\r/);
    expect(url).not.toMatch(/\t/);
  });

  it('handles Hebrew names correctly', () => {
    const hebrewConfig: InviteConfig = {
      ...mockConfig,
      senderName: 'שלום',
      recipientName: 'עולם',
      language: 'he',
    };

    const url = createInviteUrl(hebrewConfig);
    const urlObj = new URL(url);
    const compactParam = urlObj.searchParams.get('i');
    
    expect(compactParam).toBeTruthy();
    expect(url).toContain('?i=');
  });

  it('generates different URLs for different configs', () => {
    const config1 = { ...mockConfig, senderName: 'Alice' };
    const config2 = { ...mockConfig, senderName: 'Bob' };

    const url1 = createInviteUrl(config1);
    const url2 = createInviteUrl(config2);

    expect(url1).not.toBe(url2);
  });

  it('creates valid URL object', () => {
    const url = createInviteUrl(mockConfig);
    
    expect(() => new URL(url)).not.toThrow();
    
    const urlObj = new URL(url);
    expect(urlObj.protocol).toMatch(/^https?:$/);
    expect(urlObj.searchParams.has('i')).toBe(true);
  });

  it('preserves base path without duplicate slashes', () => {
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'https://example.com',
        pathname: '/app/',
      },
      writable: true,
      configurable: true,
    });

    (import.meta.env as { BASE_URL: string }).BASE_URL = '/app/';

    const url = createInviteUrl(mockConfig);
    
    // Should not have //
    expect(url).not.toContain('//app');
    expect(url).not.toContain('app//');
    expect(url).toMatch(/^https:\/\/example\.com\/app\/\?i=/);
  });

  it('typical invitation URL is under 700 characters', () => {
    const typicalConfig: InviteConfig = {
      version: 1,
      language: 'en',
      senderName: 'Alex',
      recipientName: 'Jordan',
      theme: 'secret_mission',
      introTone: 'flirty',
      introCards: [
        { id: '1', promptKey: 'intro_card_1', answer: 'Adventure awaits!' },
        { id: '2', promptKey: 'intro_card_2', answer: 'Life is short' },
        { id: '3', promptKey: 'intro_card_3', answer: 'Let\'s make memories' },
      ],
      activityIds: ['coffee', 'sunset-walk', 'movie', 'restaurant'],
      dateSlots: [
        { id: '1', date: '2026-06-20', time: '19:00' },
        { id: '2', date: '2026-06-21', time: '20:30' },
      ],
      whatsappNumber: '+1234567890',
    };

    const url = createInviteUrl(typicalConfig);
    
    expect(url.length).toBeLessThan(700);
  });

  it('complex Hebrew invitation URL is reasonably short', () => {
    const hebrewConfig: InviteConfig = {
      version: 1,
      language: 'he',
      senderName: 'שרה',
      recipientName: 'דוד',
      theme: 'nature',
      introTone: 'flirty',
      introCards: [
        { id: '1', promptKey: 'intro_card_1', answer: 'קפה טוב' },
        { id: '2', promptKey: 'intro_card_2', answer: 'הרים יפים' },
      ],
      activityIds: ['coffee', 'sunset-walk'],
      dateSlots: [
        { id: '1', date: '2026-06-20', time: '19:00' },
      ],
      whatsappNumber: '+972501234567',
    };

    const url = createInviteUrl(hebrewConfig);
    
    expect(url.length).toBeLessThan(700);
  });

  it('minimal invitation URL is very short', () => {
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

    const url = createInviteUrl(minimalConfig);
    
    expect(url.length).toBeLessThan(300);
  });
});
