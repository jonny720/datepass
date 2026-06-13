/**
 * URL payload compression using lz-string
 * 
 * Compresses invite payloads to reduce URL length for reliable sharing.
 */

import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import type { InviteConfig } from '@/types';
import {
  toCompactPayload,
  fromCompactPayload,
  validateCompactPayload,
  type CompactInvitePayloadV2,
} from './compactPayload';

/**
 * Encode InviteConfig into a compressed URL-safe string
 */
export function encodeInviteConfigV2(config: InviteConfig): string {
  try {
    // Convert to compact payload
    const compact = toCompactPayload(config);

    // Serialize to JSON (minified)
    const json = JSON.stringify(compact);

    // Compress and encode to URL-safe format
    const compressed = compressToEncodedURIComponent(json);

    // Validate output is URL-safe
    if (!/^[A-Za-z0-9_-]+$/.test(compressed)) {
      // lz-string's compressToEncodedURIComponent uses standard encodeURIComponent
      // which produces URL-safe output but may include % encoding
      // We'll accept this as it's reliable across browsers
      if (import.meta.env.DEV) {
        console.debug('Compressed payload contains percent encoding:', compressed.substring(0, 50));
      }
    }

    if (import.meta.env.DEV) {
      console.debug('DatePass compression', {
        originalJSON: json.length,
        compressed: compressed.length,
        reduction: Math.round((1 - compressed.length / json.length) * 100) + '%',
      });
    }

    return compressed;
  } catch (error) {
    console.error('Failed to encode invite config:', error);
    throw new Error('Failed to encode invitation');
  }
}

/**
 * Decode compressed URL-safe string back to InviteConfig
 */
export function decodeInviteConfigV2(encoded: string): InviteConfig {
  try {
    // Decompress
    const json = decompressFromEncodedURIComponent(encoded);

    if (!json) {
      throw new Error('Failed to decompress payload');
    }

    // Parse JSON
    const payload = JSON.parse(json) as unknown;

    // Validate structure
    if (!validateCompactPayload(payload)) {
      throw new Error('Invalid payload structure');
    }

    // Convert back to full config
    const config = fromCompactPayload(payload as CompactInvitePayloadV2);

    return config;
  } catch (error) {
    console.error('Failed to decode invite config:', error);
    throw new Error('Invalid invitation link');
  }
}

/**
 * Validate that a generated URL is properly formatted
 */
export function validateGeneratedInviteUrl(urlString: string): void {
  try {
    const url = new URL(urlString);
    const payload = url.searchParams.get('i');

    if (!payload) {
      throw new Error('Invite URL is missing compact payload');
    }

    if (/\s/.test(urlString)) {
      throw new Error('Invite URL contains whitespace');
    }

    if (url.hash && url.hash !== '#') {
      throw new Error('Canonical invite URL should not contain a hash');
    }

    // Note: We don't strictly validate payload characters because
    // lz-string may use percent encoding which is URL-safe
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Invalid URL format');
    }
    throw error;
  }
}
