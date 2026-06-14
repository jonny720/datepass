/**
 * Compact payload schema for URL compression
 * 
 * This module creates a minimal transport schema to reduce URL length
 * for reliable sharing through messaging apps like WhatsApp.
 */

import type { InviteConfig, IntroCard, DateSlot, AdvancedSettings } from '@/types';

// Compact payload version 2
export type CompactInvitePayloadV2 = {
  v: 2; // version
  y?: 'd' | 'b' | 'f' | 'c'; // invite type
  g?: 'm' | 'f' | 'p'; // recipient gender: m=male, f=female, p=private
  l: 'h' | 'e'; // language: h=Hebrew, e=English
  s: string; // sender name
  r: string; // recipient name
  t: string; // theme code
  i: string; // intro tone code
  n?: string; // optional WhatsApp number
  c?: Array<[string, string]>; // intro cards as [promptKey, answer] tuples
  a?: string[]; // activity codes
  d?: Array<[string, string]>; // date slots as [date, time] tuples
  q?: string; // custom main question
  o?: string[]; // custom options
  x?: {
    r?: 1;
    s?: 1;
    n?: 'p' | 'g' | 'n';
    h?: 's' | 'n' | 'c';
  };
};

// Theme code mappings
const THEME_TO_CODE = {
  cruise: 'c',
  secret_mission: 'm',
  nature: 'n',
  party: 'p',
  after_dark: 'd',
  temptation: 't',
  'black-tie': 'k',
  'power-play': 'w',
  generic: 'g',
  stadium: 's',
  concert: 'o',
  theater: 'e',
  hotel: 'h',
  flight: 'l',
} as const;

const CODE_TO_THEME = {
  c: 'cruise',
  m: 'secret_mission',
  n: 'nature',
  p: 'party',
  d: 'after_dark',
  t: 'temptation',
  k: 'black-tie',
  w: 'power-play',
  g: 'generic',
  s: 'stadium',
  o: 'concert',
  e: 'theater',
  h: 'hotel',
  l: 'flight',
} as const;

const INVITE_TYPE_TO_CODE = {
  date: 'd',
  birthday: 'b',
  'friends-night': 'f',
  custom: 'c',
} as const;

const CODE_TO_INVITE_TYPE = {
  d: 'date',
  b: 'birthday',
  f: 'friends-night',
  c: 'custom',
} as const;

const NO_BUTTON_TO_CODE = {
  playful: 'p',
  gentle: 'g',
  normal: 'n',
} as const;

const CODE_TO_NO_BUTTON = {
  p: 'playful',
  g: 'gentle',
  n: 'normal',
} as const;

const HUMOR_TO_CODE = {
  soft: 's',
  normal: 'n',
  chaos: 'c',
} as const;

const CODE_TO_HUMOR = {
  s: 'soft',
  n: 'normal',
  c: 'chaos',
} as const;

const RECIPIENT_GENDER_TO_CODE = {
  male: 'm',
  female: 'f',
  private: 'p',
} as const;

const CODE_TO_RECIPIENT_GENDER = {
  m: 'male',
  f: 'female',
  p: 'private',
} as const;

// Intro tone code mappings
const TONE_TO_CODE = {
  light: 'l',
  flirty: 'f',
  absurd: 'a',
  romantic: 'r',
  bold: 'b',
  dry: 'd',
} as const;

const CODE_TO_TONE = {
  l: 'light',
  f: 'flirty',
  a: 'absurd',
  r: 'romantic',
  b: 'bold',
  d: 'dry',
  // Backwards compatibility: map old 'p' (playful) to 'light'
  p: 'light',
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
  cake: 'ck',
  food: 'fo',
  music: 'mu',
  games: 'ga',
  playstation: 'ps',
  'board-games': 'bg',
  pizza: 'pz',
  bbq: 'bb',
  karaoke: 'kr',
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
  ck: 'cake',
  fo: 'food',
  mu: 'music',
  ga: 'games',
  ps: 'playstation',
  bg: 'board-games',
  pz: 'pizza',
  bb: 'bbq',
  kr: 'karaoke',
  x: 'surprise-me',
} as const;

export function getDefaultNoButtonMode(inviteType?: InviteConfig['inviteType']) {
  return (inviteType || 'date') === 'date' ? 'playful' : 'gentle';
}

function compactAdvancedSettings(
  settings: AdvancedSettings | undefined,
  inviteType: InviteConfig['inviteType']
): CompactInvitePayloadV2['x'] | undefined {
  if (!settings) return undefined;

  const compact: NonNullable<CompactInvitePayloadV2['x']> = {};
  if (settings.askForRide) compact.r = 1;
  if (settings.askSpontaneityLevel) compact.s = 1;
  if (
    settings.noButtonMode &&
    settings.noButtonMode !== getDefaultNoButtonMode(inviteType)
  ) {
    compact.n = NO_BUTTON_TO_CODE[settings.noButtonMode];
  }
  if (settings.humorLevel && settings.humorLevel !== 'normal') {
    compact.h = HUMOR_TO_CODE[settings.humorLevel];
  }

  return Object.keys(compact).length > 0 ? compact : undefined;
}

/**
 * Convert full InviteConfig to compact payload
 */
export function toCompactPayload(config: InviteConfig): CompactInvitePayloadV2 {
  const payload: CompactInvitePayloadV2 = {
    v: 2,
    y: INVITE_TYPE_TO_CODE[config.inviteType || 'date'],
    g: RECIPIENT_GENDER_TO_CODE[config.recipientGender || 'female'],
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

  if (config.inviteType === 'custom') {
    if (config.customMainQuestion?.trim()) {
      payload.q = config.customMainQuestion.trim();
    }
    if (config.customOptions && config.customOptions.length > 0) {
      payload.o = config.customOptions.map((option) => option.trim()).filter(Boolean);
    }
  }

  const advancedSettings = compactAdvancedSettings(config.advancedSettings, config.inviteType);
  if (advancedSettings) {
    payload.x = advancedSettings;
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
    inviteType: CODE_TO_INVITE_TYPE[payload.y as keyof typeof CODE_TO_INVITE_TYPE] || 'date',
    recipientGender: CODE_TO_RECIPIENT_GENDER[payload.g as keyof typeof CODE_TO_RECIPIENT_GENDER] || 'female',
    language: payload.l === 'h' ? 'he' : 'en',
    senderName: payload.s,
    recipientName: payload.r,
    theme: CODE_TO_THEME[payload.t as keyof typeof CODE_TO_THEME] || 'cruise',
    introTone: CODE_TO_TONE[payload.i as keyof typeof CODE_TO_TONE] || 'light',
    introCards: [],
    activityIds: [],
    dateSlots: [],
    whatsappNumber: '',
  };

  if (payload.q) {
    config.customMainQuestion = payload.q;
  }

  if (payload.o && payload.o.length > 0) {
    config.customOptions = payload.o.filter((option) => typeof option === 'string' && option.trim());
  }

  const advancedSettings: AdvancedSettings = {
    noButtonMode: getDefaultNoButtonMode(config.inviteType),
    humorLevel: 'normal',
  };
  if (payload.x) {
    if (payload.x.r === 1) advancedSettings.askForRide = true;
    if (payload.x.s === 1) advancedSettings.askSpontaneityLevel = true;
    if (payload.x.n) {
      advancedSettings.noButtonMode = CODE_TO_NO_BUTTON[payload.x.n] || advancedSettings.noButtonMode;
    }
    if (payload.x.h) {
      advancedSettings.humorLevel = CODE_TO_HUMOR[payload.x.h] || 'normal';
    }
  }
  config.advancedSettings = advancedSettings;

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

  if (p.y !== undefined && typeof p.y !== 'string') {
    return false;
  }

  if (p.g !== undefined && typeof p.g !== 'string') {
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

  if (p.q !== undefined && typeof p.q !== 'string') {
    return false;
  }

  if (p.o !== undefined && !Array.isArray(p.o)) {
    return false;
  }

  if (p.x !== undefined && (typeof p.x !== 'object' || p.x === null)) {
    return false;
  }

  return true;
}
