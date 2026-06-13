import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { LanguageProvider } from '@/hooks/useLanguage';
import { createInviteUrl } from '@/hooks/useNavigation';
import type { InviteConfig } from '@/types';
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

  it('renders Hebrew recipient invites in Hebrew and RTL', () => {
    const hebrewInvite: InviteConfig = {
      version: 1,
      language: 'he',
      senderName: 'אלכס',
      recipientName: 'ירדן',
      theme: 'party',
      introTone: 'light',
      introCards: [],
      activityIds: ['coffee'],
      dateSlots: [],
    };
    const inviteUrl = createInviteUrl(hebrewInvite);
    window.history.pushState(null, '', `/${new URL(inviteUrl).search}`);

    const { container } = render(
      <LanguageProvider>
        <App />
      </LanguageProvider>
    );

    expect(screen.getByText('פתיחת ההזמנה')).toBeInTheDocument();
    expect(container.querySelector('[dir="rtl"]')).toBeInTheDocument();
  });

  it('allows header language switching on recipient invites', () => {
    const englishInvite: InviteConfig = {
      version: 1,
      language: 'en',
      senderName: 'Alex',
      recipientName: 'Jordan',
      theme: 'party',
      introTone: 'light',
      introCards: [],
      activityIds: ['coffee'],
      dateSlots: [],
    };
    const inviteUrl = createInviteUrl(englishInvite);
    window.history.pushState(null, '', `/${new URL(inviteUrl).search}`);

    const { container } = render(
      <LanguageProvider>
        <App />
      </LanguageProvider>
    );

    expect(screen.getByText('Open Invitation')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Hebrew'));

    expect(screen.getByText('פתיחת ההזמנה')).toBeInTheDocument();
    expect(container.querySelector('[dir="rtl"]')).toBeInTheDocument();
  });
});
