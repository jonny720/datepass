import { useCallback, useEffect, useState } from 'react';
import type { InviteConfig, Route } from '@/types';
import { decodeInvite, encodeInvite } from '@/lib/serialization';
import {
  encodeInviteConfigV2,
  decodeInviteConfigV2,
  validateGeneratedInviteUrl,
} from '@/lib/compression';

/**
 * Parse the current URL into a Route.
 * Priority: ?i= (compressed) > ?invite= (verbose) > #/invite/ (legacy) > regular routes
 */
function parseRoute(): Route {
  const searchParams = new URLSearchParams(window.location.search);
  
  // 1. Check for compressed invite parameter (new format)
  const compactParam = searchParams.get('i');
  if (compactParam) {
    try {
      const config = decodeInviteConfigV2(compactParam);
      return { type: 'invite', config };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to decode compressed invite:', error);
      }
      return { type: 'invalid' };
    }
  }
  
  // 2. Check for verbose query parameter invite (backward compatibility)
  const inviteParam = searchParams.get('invite');
  if (inviteParam) {
    try {
      const config = decodeInvite(inviteParam);
      return { type: 'invite', config };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to decode verbose invite:', error);
      }
      return { type: 'invalid' };
    }
  }

  // 3. Fall back to hash-based routing (backward compatibility)
  const hash = window.location.hash.slice(1); // Remove the '#'

  if (!hash || hash === '/') {
    return { type: 'landing' };
  }

  if (hash === '/create') {
    return { type: 'create' };
  }

  if (hash === '/dev') {
    return { type: 'dev' };
  }

  // 4. Legacy hash-based invite URLs (backward compatibility)
  if (hash.startsWith('/invite/')) {
    const encoded = hash.slice(8); // Remove '/invite/'
    try {
      const config = decodeInvite(encoded);
      return { type: 'invite', config };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to decode legacy hash invite:', error);
      }
      return { type: 'invalid' };
    }
  }

  return { type: 'landing' };
}

/**
 * Convert a Route to a URL hash
 */
function routeToHash(route: Route): string {
  switch (route.type) {
    case 'landing':
      return '#/';
    case 'create':
      return '#/create';
    case 'dev':
      return '#/dev';
    case 'invite':
      return `#/invite/${encodeInvite(route.config)}`;
    case 'invalid':
      return '#/invalid';
  }
}

/**
 * Hook for URL-based navigation.
 * Uses hash routing for internal navigation and query parameters for invite sharing.
 */
export function useNavigation() {
  const [route, setRoute] = useState<Route>(parseRoute);

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(parseRoute());
    };

    // Listen for both hash changes and popstate (for query param changes)
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const navigate = useCallback((newRoute: Route) => {
    const hash = routeToHash(newRoute);
    window.location.hash = hash;
  }, []);

  return { route, navigate };
}

/**
 * Build a complete URL with the correct base path for GitHub Pages.
 * Works in both local development and production deployment.
 */
function buildBaseUrl(): URL {
  const base = import.meta.env.BASE_URL || '/';
  return new URL(base, window.location.origin);
}

/**
 * Generate a shareable invite URL using compressed payload and short query parameter.
 * This format is optimized for sharing through WhatsApp and messaging apps.
 * 
 * Format: https://jonny720.github.io/datepass/?i=<compressed-payload>
 */
export function createInviteUrl(config: InviteConfig): string {
  const encodedPayload = encodeInviteConfigV2(config);
  
  const url = buildBaseUrl();
  url.hash = '';
  url.search = '';
  url.searchParams.set('i', encodedPayload);
  
  const result = url.toString();
  
  // Validate the generated URL
  try {
    validateGeneratedInviteUrl(result);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Generated URL validation failed:', error);
    }
  }
  
  // Debug logging in development
  if (import.meta.env.DEV) {
    // Compare with old format for metrics
    const oldEncoded = encodeInvite(config);
    const oldUrl = buildBaseUrl();
    oldUrl.searchParams.set('invite', oldEncoded);
    const oldLength = oldUrl.toString().length;
    const newLength = result.length;
    const reduction = Math.round((1 - newLength / oldLength) * 100);
    
    console.debug('DatePass compact invite URL:', {
      raw: JSON.stringify(result),
      urlLength: result.length,
      payloadLength: encodedPayload.length,
      containsWhitespace: /\s/.test(result),
      containsContinuousCompactParam: result.includes('?i='),
      payloadIsUrlSafe: !/\s/.test(encodedPayload),
    });
    
    console.debug('DatePass compression result:', {
      oldLength,
      newLength,
      reductionPercent: reduction + '%',
    });
    
    // Warn if URL is unexpectedly long
    if (newLength > 1000) {
      console.warn('DatePass: Generated URL is over 1000 characters:', newLength);
    }
  }
  
  return result;
}

/**
 * Legacy function for backward compatibility.
 * New code should use createInviteUrl which generates compressed URLs.
 * 
 * @deprecated Use createInviteUrl instead
 */
export function createVerboseInviteUrl(config: InviteConfig): string {
  const encoded = encodeInvite(config);
  const url = buildBaseUrl();
  url.searchParams.set('invite', encoded);
  return url.toString();
}
