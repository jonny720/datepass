import type { InviteConfig } from '@/types';

const SUPPORTED_VERSION = 1;

/**
 * Encode InviteConfig to a URL-safe base64 string.
 * Handles Unicode characters (including Hebrew) correctly.
 */
export function encodeInvite(config: InviteConfig): string {
  const json = JSON.stringify(config);
  // Convert string to UTF-8 bytes, then to base64
  const utf8Bytes = new TextEncoder().encode(json);
  const base64 = btoa(String.fromCharCode(...utf8Bytes));
  // Make it URL-safe
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Decode a URL-safe base64 string to InviteConfig.
 * Validates the payload and throws errors for invalid data.
 */
export function decodeInvite(encoded: string): InviteConfig {
  try {
    // Convert from URL-safe base64 to standard base64
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }

    // Decode base64 to UTF-8 bytes
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Convert UTF-8 bytes to string
    const json = new TextDecoder().decode(bytes);
    const config = JSON.parse(json) as InviteConfig;

    // Validate the decoded config
    validateInviteConfig(config);

    return config;
  } catch (error) {
    if (error instanceof InviteValidationError) {
      throw error;
    }
    throw new InviteValidationError('Invalid invite format');
  }
}

/**
 * Custom error class for invite validation errors
 */
export class InviteValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InviteValidationError';
  }
}

/**
 * Validate an InviteConfig object
 */
function validateInviteConfig(config: unknown): asserts config is InviteConfig {
  if (!config || typeof config !== 'object') {
    throw new InviteValidationError('Config must be an object');
  }

  const c = config as Partial<InviteConfig>;

  // Check version
  if (c.version !== SUPPORTED_VERSION) {
    throw new InviteValidationError(
      `Unsupported version: ${c.version}. Expected ${SUPPORTED_VERSION}`
    );
  }

  if (c.inviteType === undefined) {
    c.inviteType = 'date';
  } else if (!['date', 'birthday', 'friends-night', 'custom'].includes(c.inviteType)) {
    throw new InviteValidationError('Invalid invite type');
  }

  if (c.recipientGender === undefined) {
    c.recipientGender = 'female';
  } else if (!['male', 'female', 'private'].includes(c.recipientGender)) {
    throw new InviteValidationError('Invalid recipient gender');
  }

  // Check required string fields
  if (
    typeof c.language !== 'string' ||
    !['en', 'he'].includes(c.language)
  ) {
    throw new InviteValidationError('Invalid language');
  }

  if (typeof c.senderName !== 'string' || !c.senderName.trim()) {
    throw new InviteValidationError('Invalid sender name');
  }

  if (typeof c.recipientName !== 'string' || !c.recipientName.trim()) {
    throw new InviteValidationError('Invalid recipient name');
  }

  if (
    typeof c.theme !== 'string' ||
    ![
      'cruise',
      'secret_mission',
      'nature',
      'party',
      'after_dark',
      'temptation',
      'black-tie',
      'power-play',
      'generic',
      'stadium',
      'concert',
      'theater',
      'hotel',
      'flight',
    ].includes(c.theme)
  ) {
    throw new InviteValidationError('Invalid theme');
  }

  if (
    typeof c.introTone !== 'string' ||
    !['light', 'flirty', 'absurd', 'romantic', 'bold', 'dry'].includes(c.introTone)
  ) {
    throw new InviteValidationError('Invalid intro tone');
  }

  // Check arrays
  if (!Array.isArray(c.introCards)) {
    throw new InviteValidationError('Invalid intro cards');
  }

  if (!Array.isArray(c.activityIds)) {
    throw new InviteValidationError('Invalid activity IDs');
  }

  if (!Array.isArray(c.dateSlots)) {
    throw new InviteValidationError('Invalid date slots');
  }

  // Optional whatsapp number
  if (
    c.whatsappNumber !== undefined &&
    typeof c.whatsappNumber !== 'string'
  ) {
    throw new InviteValidationError('Invalid WhatsApp number');
  }

  // Optional opening message
  if (
    c.openingMessage !== undefined &&
    (typeof c.openingMessage !== 'string' || c.openingMessage.length > 100)
  ) {
    throw new InviteValidationError('Invalid opening message');
  }
}

/**
 * Check if a string is a valid encoded invite
 */
export function isValidEncodedInvite(encoded: string): boolean {
  try {
    decodeInvite(encoded);
    return true;
  } catch {
    return false;
  }
}
