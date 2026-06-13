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

/**
 * Build an international WhatsApp number from country dial code and local number
 * 
 * Requirements:
 * - Combine dial code and local number into international format
 * - Remove all non-digit characters from both inputs
 * - Remove leading zeros from local number (e.g., 050 -> 50)
 * - Validate final length (7-15 digits total)
 * - Return undefined for invalid input
 * 
 * @param params - Object containing dialCode and localNumber
 * @returns Normalized international phone number, or undefined if invalid
 * 
 * @example
 * buildInternationalWhatsAppNumber({ dialCode: '972', localNumber: '050-123-4567' })
 * // '972501234567'
 * 
 * buildInternationalWhatsAppNumber({ dialCode: '44', localNumber: '07123 456789' })
 * // '447123456789'
 * 
 * buildInternationalWhatsAppNumber({ dialCode: '1', localNumber: '(415) 555-2671' })
 * // '14155552671'
 */
export function buildInternationalWhatsAppNumber(params: {
  dialCode: string;
  localNumber: string;
}): string | undefined {
  // Remove all non-digit characters from dial code
  const cleanDialCode = params.dialCode.replace(/\D/g, '');

  // Remove all non-digit characters from local number
  let cleanLocalNumber = params.localNumber.replace(/\D/g, '');

  // Remove leading zeros from local number
  // (e.g., Israeli mobile numbers often start with 0: 050-123-4567 -> 50-123-4567)
  cleanLocalNumber = cleanLocalNumber.replace(/^0+/, '');

  // Combine dial code and local number
  const result = `${cleanDialCode}${cleanLocalNumber}`;

  // Validate length (international format: 7-15 digits)
  if (result.length < 7 || result.length > 15) {
    return undefined;
  }

  return result;
}

/**
 * Validate a local phone number with a given dial code
 * 
 * @param dialCode - Country dial code (e.g., '972')
 * @param localNumber - Local phone number (e.g., '050-123-4567')
 * @returns true if the combination produces a valid international number
 */
export function validateLocalPhoneNumber(
  dialCode: string,
  localNumber: string
): boolean {
  if (!localNumber) return false;
  const normalized = buildInternationalWhatsAppNumber({ dialCode, localNumber });
  return normalized !== undefined;
}
