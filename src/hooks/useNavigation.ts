import { useCallback, useEffect, useState } from 'react';
import type { InviteConfig, Route } from '@/types';
import { decodeInvite, encodeInvite } from '@/lib/serialization';

/**
 * Parse the current URL into a Route.
 * Priority: query parameter (?invite=) > hash (#/invite/) > regular routes
 */
function parseRoute(): Route {
  // Check for query parameter invite first (new format)
  const searchParams = new URLSearchParams(window.location.search);
  const inviteParam = searchParams.get('invite');
  
  if (inviteParam) {
    try {
      const config = decodeInvite(inviteParam);
      return { type: 'invite', config };
    } catch {
      return { type: 'invalid' };
    }
  }

  // Fall back to hash-based routing (backward compatibility)
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

  // Legacy hash-based invite URLs (backward compatibility)
  if (hash.startsWith('/invite/')) {
    const encoded = hash.slice(8); // Remove '/invite/'
    try {
      const config = decodeInvite(encoded);
      return { type: 'invite', config };
    } catch {
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
 * Generate a shareable invite URL using query parameters.
 * This format is more reliable for sharing through WhatsApp and messaging apps.
 */
export function createInviteUrl(config: InviteConfig): string {
  const encoded = encodeInvite(config);
  const url = buildBaseUrl();
  url.searchParams.set('invite', encoded);
  
  // Debug logging in development
  if (import.meta.env.DEV) {
    console.debug('DatePass invite URL generated:', {
      origin: window.location.origin,
      pathname: window.location.pathname,
      baseUrl: import.meta.env.BASE_URL,
      finalUrl: url.toString(),
      payloadLength: encoded.length,
      hasQueryParam: url.searchParams.has('invite'),
    });
  }
  
  return url.toString();
}
