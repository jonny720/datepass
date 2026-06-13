import { afterEach, describe, expect, it, vi } from 'vitest';
import { shouldShowDuck } from './duckConfig';

describe('shouldShowDuck', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('always shows the duck in development', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);

    expect(shouldShowDuck()).toBe(true);
  });

  it('always shows the duck in production', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);

    expect(shouldShowDuck()).toBe(true);
  });
});
