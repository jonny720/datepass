import { useCallback, useEffect, useState } from 'react';
import type { InviteConfig, Route } from '@/types';
import { decodeInvite, encodeInvite } from '@/lib/serialization';

/**
 * Parse the current URL hash into a Route
 */
function parseRoute(): Route {
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
 * Hook for URL-based navigation using hash routing
 */
export function useNavigation() {
  const [route, setRoute] = useState<Route>(parseRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseRoute());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((newRoute: Route) => {
    const hash = routeToHash(newRoute);
    window.location.hash = hash;
  }, []);

  return { route, navigate };
}

/**
 * Helper function to generate a shareable invite URL
 */
export function createInviteUrl(config: InviteConfig): string {
  const encoded = encodeInvite(config);
  return `${window.location.origin}${window.location.pathname}#/invite/${encoded}`;
}
