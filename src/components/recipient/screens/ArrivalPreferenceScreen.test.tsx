import { fireEvent, render, screen } from '@testing-library/react';
import { useLayoutEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import type { InviteConfig, Language } from '@/types';
import { ArrivalPreferenceScreen } from './ArrivalPreferenceScreen';

const mockEasterEggState = {
  targetScreen: 'arrival' as const,
  hasBeenRevealed: false,
  markAsRevealed: () => {},
  shouldShowOnScreen: () => false,
};

const mockConfig: InviteConfig = {
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

function LanguageSync({ language }: { language: Language }) {
  const { setLanguage } = useLanguage();

  useLayoutEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  return null;
}

function renderWithLanguage(config: InviteConfig, onSelect = () => {}) {
  return render(
    <LanguageProvider>
      <LanguageSync language={config.language} />
      <ArrivalPreferenceScreen
        config={config}
        onSelect={onSelect}
        easterEggState={mockEasterEggState}
      />
    </LanguageProvider>
  );
}

describe('ArrivalPreferenceScreen', () => {
  it('lets the recipient choose pickup', () => {
    const onSelect = vi.fn();

    renderWithLanguage(mockConfig, onSelect);

    fireEvent.click(screen.getByText('I need pickup'));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(onSelect).toHaveBeenCalledWith('pickup');
  });

  it('supports Hebrew copy', () => {
    renderWithLanguage({ ...mockConfig, language: 'he' });

    expect(screen.getByText('איך את מגיעה?')).toBeInTheDocument();
    expect(screen.getByText('אני צריכה איסוף')).toBeInTheDocument();
  });
});
