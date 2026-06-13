/**
 * Compact payload schema for URL compression
 * 
 * This module creates a minimal transport schema to reduce URL length
 * for reliable sharing through messaging apps like WhatsApp.
 */

import type { InviteConfig, IntroCard, DateSlot } from '@/types';

// Compact payload version 2
export type CompactInvitePayloadV2 = {
  v: 2; // version
  l: 'h' | 'e'; // language: h=Hebrew, e=English
  s: string; // sender name
  r: string; // recipient name
  t: string; // theme code
  i: string; // intro tone code
  n?: string; // optional WhatsApp number
  c?: Array<[string, string]>; // intro cards as [promptKey, answer] tuples
  a?: string[]; // activity codes
  d?: Array<[string, string]>; // date slots as [date, time] tuples
};

// Theme code mappings
const THEME_TO_CODE = {
  cruise: 'c',
  secret_mission: 'm',
  nature: 'n',
  party: 'p',
  after_dark: 'd',
} as const;

const CODE_TO_THEME = {
  c: 'cruise',
  m: 'secret_mission',
  n: 'nature',
  p: 'party',
  d: 'after_dark',
} as const;

// Intro tone code mappings
const TONE_TO_CODE = {
  playful: 'p',
  flirty: 'f',
  absurd: 'a',
} as const;

const CODE_TO_TONE = {
  p: 'playful',
  f: 'flirty',
  a: 'absurd',
} as const;

// Activity code mappings
const ACTIVITY_TO_CODE = {
  drinks: 'd',
  restaurant: 'r',
  coffee: 'c',
  'sunset-walk': 's',
  movie: 'm',
  competitive: 'g',
  creative: 'a',
  'surprise-me': 'x',
} as const;

const CODE_TO_ACTIVITY = {
  d: 'drinks',
  r: 'restaurant',
  c: 'coffee',
  s: 'sunset-walk',
  m: 'movie',
  g: 'competitive',
  a: 'creative',
  x: 'surprise-me',
} as const;

/**
 * Convert full InviteConfig to compact payload
 */
export function toCompactPayload(config: InviteConfig): CompactInvitePayloadV2 {
  const payload: CompactInvitePayloadV2 = {
    v: 2,
    l: config.language === 'he' ? 'h' : 'e',
    s: config.senderName,
    r: config.recipientName,
    t: THEME_TO_CODE[config.theme as keyof typeof THEME_TO_CODE] || 'c',
    i: TONE_TO_CODE[config.introTone as keyof typeof TONE_TO_CODE] || 'p',
  };

  // Only include optional fields if they have values
  if (config.whatsappNumber && config.whatsappNumber.trim()) {
    payload.n = config.whatsappNumber;
  }

  if (config.introCards && config.introCards.length > 0) {
    payload.c = config.introCards.map((card: IntroCard) => [
      card.promptKey,
      card.answer,
    ]);
  }

  if (config.activityIds && config.activityIds.length > 0) {
    payload.a = config.activityIds.map(
      (id) => ACTIVITY_TO_CODE[id as keyof typeof ACTIVITY_TO_CODE] || id
    );
  }

  if (config.dateSlots && config.dateSlots.length > 0) {
    payload.d = config.dateSlots.map((slot: DateSlot) => [slot.date, slot.time]);
  }

  return payload;
}

/**
 * Convert compact payload back to full InviteConfig
 */
export function fromCompactPayload(
  payload: CompactInvitePayloadV2
): InviteConfig {
  // Validate version
  if (payload.v !== 2) {
    throw new Error(`Unsupported payload version: ${payload.v}`);
  }

  const config: InviteConfig = {
    version: 1,
    language: payload.l === 'h' ? 'he' : 'en',
    senderName: payload.s,
    recipientName: payload.r,
    theme: CODE_TO_THEME[payload.t as keyof typeof CODE_TO_THEME] || 'cruise',
    introTone: CODE_TO_TONE[payload.i as keyof typeof CODE_TO_TONE] || 'playful',
    introCards: [],
    activityIds: [],
    dateSlots: [],
    whatsappNumber: '',
  };

  // Restore optional fields
  if (payload.n) {
    config.whatsappNumber = payload.n;
  }

  if (payload.c && payload.c.length > 0) {
    config.introCards = payload.c.map(([promptKey, answer], index) => ({
      id: String(index + 1),
      promptKey,
      answer,
    }));
  }

  if (payload.a && payload.a.length > 0) {
    config.activityIds = payload.a.map(
      (code) => CODE_TO_ACTIVITY[code as keyof typeof CODE_TO_ACTIVITY] || code
    );
  }

  if (payload.d && payload.d.length > 0) {
    config.dateSlots = payload.d.map(([date, time], index) => ({
      id: String(index + 1),
      date,
      time,
    }));
  }

  return config;
}

/**
 * Validate that a compact payload has the correct structure
 */
export function validateCompactPayload(
  payload: unknown
): payload is CompactInvitePayloadV2 {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const p = payload as Partial<CompactInvitePayloadV2>;

  // Required fields
  if (
    p.v !== 2 ||
    typeof p.l !== 'string' ||
    typeof p.s !== 'string' ||
    typeof p.r !== 'string' ||
    typeof p.t !== 'string' ||
    typeof p.i !== 'string'
  ) {
    return false;
  }

  // Optional fields must have correct types if present
  if (p.n !== undefined && typeof p.n !== 'string') {
    return false;
  }

  if (p.c !== undefined && !Array.isArray(p.c)) {
    return false;
  }

  if (p.a !== undefined && !Array.isArray(p.a)) {
    return false;
  }

  if (p.d !== undefined && !Array.isArray(p.d)) {
    return false;
  }

  return true;
}
