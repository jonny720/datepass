import { afterEach, describe, expect, it, vi } from 'vitest';
import { shouldShowDuck } from './duckConfig';

describe('shouldShowDuck', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('always shows the duck in development', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);

    expect(shouldShowDuck(true)).toBe(true);
  });

  it('keeps the duck rare in production', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.19);
    expect(shouldShowDuck(false)).toBe(true);

    vi.spyOn(Math, 'random').mockReturnValue(0.2);
    expect(shouldShowDuck(false)).toBe(false);
  });
});
