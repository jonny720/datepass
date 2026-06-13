import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/hooks/useLanguage';
import { DeclineScreen } from './DeclineScreen';
import type { InviteConfig } from '@/types';

const mockConfig: InviteConfig = {
  version: 1,
  senderName: 'Test Sender',
  recipientName: 'Test Recipient',
  language: 'en',
  theme: 'cruise',
  introTone: 'light',
  introCards: [],
  activityIds: ['coffee'],
  dateSlots: [],
  whatsappNumber: '',
};

describe('DeclineScreen', () => {
  it('renders decline message', () => {
    const onCreateOwn = vi.fn();

    render(
      <LanguageProvider>
        <DeclineScreen config={mockConfig} onCreateOwn={onCreateOwn} />
      </LanguageProvider>
    );

    expect(screen.getByText(/All good/i)).toBeInTheDocument();
    expect(screen.getByText(/At least the effects were cool/i)).toBeInTheDocument();
  });

  it('shows updated notification copy', () => {
    const onCreateOwn = vi.fn();

    render(
      <LanguageProvider>
        <DeclineScreen config={mockConfig} onCreateOwn={onCreateOwn} />
      </LanguageProvider>
    );

    expect(
      screen.getByText('Test Sender will not get your answer if you will not tell him')
    ).toBeInTheDocument();
  });

  it('calls onCreateOwn when create own button is clicked', () => {
    const onCreateOwn = vi.fn();

    render(
      <LanguageProvider>
        <DeclineScreen config={mockConfig} onCreateOwn={onCreateOwn} />
      </LanguageProvider>
    );

    const createOwnButton = screen.getByText(/Create your own invitation/i);
    fireEvent.click(createOwnButton);

    expect(onCreateOwn).toHaveBeenCalledTimes(1);
  });

  it('does not show guilt-inducing copy', () => {
    const onCreateOwn = vi.fn();

    render(
      <LanguageProvider>
        <DeclineScreen config={mockConfig} onCreateOwn={onCreateOwn} />
      </LanguageProvider>
    );

    // Check that the message is kind and low-pressure
    const title = screen.getByText(/All good/i);
    const subtitle = screen.getByText(/At least the effects were cool/i);

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();

    // Should not contain words like "sure", "really", "certain"
    expect(screen.queryByText(/are you sure/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/really/i)).not.toBeInTheDocument();
  });
});
