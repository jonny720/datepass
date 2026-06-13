import '@testing-library/jest-dom';

// Mock window.matchMedia for tests (must be before any component imports)
const matchMediaMock = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {}, // deprecated
  removeListener: () => {}, // deprecated
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: matchMediaMock,
});

Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: matchMediaMock,
});
