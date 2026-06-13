import { useLayoutEffect } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import { createInviteUrl } from '@/hooks/useNavigation';
import type { InviteConfig, Language } from '@/types';
import App from './App';

function InitialLanguage({ language }: { language: Language }) {
  const { setLanguage } = useLanguage();

  useLayoutEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  return null;
}

describe('App', () => {
  beforeEach(() => {
    window.history.pushState(null, '', '/');
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
    expect(
      screen.getByText('Static app for fun only. No data is saved or stored.')
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

  it('uses each invite language as the recipient starting language', async () => {
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
        <InitialLanguage language="he" />
        <App />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Open Invitation')).toBeInTheDocument();
    });
    expect(container.querySelector('[dir="ltr"]')).toBeInTheDocument();
  });
});
