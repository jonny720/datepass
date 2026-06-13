import type { InviteConfig } from './invite';

export type Route =
  | { type: 'landing' }
  | { type: 'create' }
  | { type: 'dev' }
  | { type: 'invite'; config: InviteConfig }
  | { type: 'invalid' };

export interface NavigationState {
  route: Route;
  navigate: (route: Route) => void;
}
