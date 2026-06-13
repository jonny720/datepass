/**
 * Safe parsing utilities for localStorage and URL data.
 * Prevents crashes from corrupted or malicious data.
 */

/**
 * Safely parse JSON with error handling and validation.
 * Returns null if parsing fails or validation rejects the data.
 */
export function safeJsonParse<T>(
  json: string,
  validator?: (data: unknown) => data is T
): T | null {
  try {
    const parsed = JSON.parse(json);
    if (validator && !validator(parsed)) {
      console.warn('Parsed JSON failed validation');
      return null;
    }
    return parsed as T;
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
    return null;
  }
}

/**
 * Safely read from localStorage with error handling.
 * Returns null if key doesn't exist or parsing fails.
 */
export function safeLocalStorageGet<T>(
  key: string,
  validator?: (data: unknown) => data is T
): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return safeJsonParse<T>(item, validator);
  } catch (error) {
    console.warn(`Failed to read localStorage key "${key}":`, error);
    return null;
  }
}

/**
 * Safely write to localStorage with error handling.
 * Returns false if write fails (quota exceeded, etc.).
 */
export function safeLocalStorageSet(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed to write localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Safely remove from localStorage with error handling.
 */
export function safeLocalStorageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove localStorage key "${key}":`, error);
  }
}

/**
 * Safely decode base64 URL parameter.
 * Returns null if decoding or parsing fails.
 */
export function safeBase64Decode<T>(
  encoded: string,
  validator?: (data: unknown) => data is T
): T | null {
  try {
    const decoded = atob(encoded);
    return safeJsonParse<T>(decoded, validator);
  } catch (error) {
    console.warn('Failed to decode base64:', error);
    return null;
  }
}

/**
 * Safely encode data to base64 URL parameter.
 * Returns null if encoding fails.
 */
export function safeBase64Encode(data: unknown): string | null {
  try {
    return btoa(JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to encode to base64:', error);
    return null;
  }
}
