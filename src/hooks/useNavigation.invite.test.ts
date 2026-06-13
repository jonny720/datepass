import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createInviteUrl } from './useNavigation';
import type { InviteConfig } from '@/types';

const mockConfig: InviteConfig = {
  version: 1,
  senderName: 'Test Sender',
  recipientName: 'Test Recipient',
  language: 'en',
  theme: 'cruise',
  introTone: 'playful',
  introCards: [],
  activityIds: ['coffee'],
  dateSlots: [],
  whatsappNumber: '',
};

describe('createInviteUrl', () => {
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

  it('generates URL with query parameter for localhost', () => {
    const url = createInviteUrl(mockConfig);
    
    expect(url).toContain('?invite=');
    expect(url).toMatch(/^http:\/\/localhost:5173\/\?invite=/);
  });

  it('includes complete encoded payload in query parameter', () => {
    const url = createInviteUrl(mockConfig);
    const urlObj = new URL(url);
    const inviteParam = urlObj.searchParams.get('invite');
    
    expect(inviteParam).toBeTruthy();
    expect(inviteParam!.length).toBeGreaterThan(50); // Encoded payload should be substantial
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
    expect(url).toContain('?invite=');
    expect(url).toMatch(/^https:\/\/username\.github\.io\/datepass\/\?invite=/);
  });

  it('does not double-encode payload', () => {
    const url = createInviteUrl(mockConfig);
    
    // Should not contain double-encoded characters like %25 (encoded %)
    expect(url).not.toContain('%25');
    
    // Should contain single-encoded characters
    expect(url).toContain('?invite=');
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
    const inviteParam = urlObj.searchParams.get('invite');
    
    expect(inviteParam).toBeTruthy();
    expect(url).toContain('?invite=');
  });

  it('generates different URLs for different configs', () => {
    const config1 = { ...mockConfig, senderName: 'Alice' };
    const config2 = { ...mockConfig, senderName: 'Bob' };

    const url1 = createInviteUrl(config1);
    const url2 = createInviteUrl(config2);

    expect(url1).not.toBe(url2);
  });

  it('uses query parameter format instead of hash', () => {
    const url = createInviteUrl(mockConfig);
    
    // New format: ?invite=
    expect(url).toContain('?invite=');
    
    // Old format: #/invite/ should NOT be used for new URLs
    expect(url).not.toContain('#/invite/');
  });

  it('creates valid URL object', () => {
    const url = createInviteUrl(mockConfig);
    
    expect(() => new URL(url)).not.toThrow();
    
    const urlObj = new URL(url);
    expect(urlObj.protocol).toMatch(/^https?:$/);
    expect(urlObj.searchParams.has('invite')).toBe(true);
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
    expect(url).toMatch(/^https:\/\/example\.com\/app\/\?invite=/);
  });
});
