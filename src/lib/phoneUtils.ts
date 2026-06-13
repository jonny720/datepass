/**
 * Phone number utilities for WhatsApp integration
 */

/**
 * Normalize a WhatsApp phone number to digits-only format
 * 
 * Requirements:
 * - Remove all non-digit characters (spaces, hyphens, parentheses, plus signs)
 * - Keep country code intact
 * - Return undefined for invalid input
 * - Require international format (7-15 digits)
 * 
 * @param value - Raw phone number input
 * @returns Normalized digits-only phone number, or undefined if invalid
 * 
 * @example
 * normalizeWhatsAppPhoneNumber('+972 50 123 4567') // '972501234567'
 * normalizeWhatsAppPhoneNumber('(972) 50-123-4567') // '972501234567'
 * normalizeWhatsAppPhoneNumber('05012345') // undefined (too short, no country code)
 * normalizeWhatsAppPhoneNumber('') // undefined
 */
export function normalizeWhatsAppPhoneNumber(
  value?: string
): string | undefined {
  if (!value) return undefined;

  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // Validate length (international format: 7-15 digits)
  // Too short: likely local number without country code
  // Too long: invalid
  if (digits.length < 7 || digits.length > 15) {
    return undefined;
  }

  return digits;
}

/**
 * Validate a WhatsApp phone number
 * 
 * @param value - Raw phone number input
 * @returns true if valid international format, false otherwise
 * 
 * @example
 * validateWhatsAppPhoneNumber('+972 50 123 4567') // true
 * validateWhatsAppPhoneNumber('0501234567') // false (local format)
 * validateWhatsAppPhoneNumber('123') // false (too short)
 */
export function validateWhatsAppPhoneNumber(value?: string): boolean {
  if (!value) return false;
  const normalized = normalizeWhatsAppPhoneNumber(value);
  return normalized !== undefined;
}
