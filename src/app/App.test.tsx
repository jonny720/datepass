import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { LanguageProvider } from '@/hooks/useLanguage';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    // Reset URL hash before each test
    window.location.hash = '';
  });

  it('renders the landing screen by default', () => {
    render(
      <LanguageProvider>
        <App />
      </LanguageProvider>
    );
    expect(screen.getByText('DatePass')).toBeInTheDocument();
    expect(
      screen.getByText('Create playful date invitations')
    ).toBeInTheDocument();
  });

  it('renders the landing screen for root hash', () => {
    window.location.hash = '#/';
    render(
      <LanguageProvider>
        <App />
      </LanguageProvider>
    );
    expect(screen.getByText('DatePass')).toBeInTheDocument();
  });
});
