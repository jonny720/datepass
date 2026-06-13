import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '@/hooks/useLanguage';
import type { InviteConfig } from '@/types';
import { SlotChoiceScreen } from './SlotChoiceScreen';

const mockEasterEggState = {
  targetScreen: 'arrival' as const,
  hasBeenRevealed: false,
  markAsRevealed: () => {},
  shouldShowOnScreen: () => false,
};

const baseConfig: InviteConfig = {
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

function renderSlotScreen(config: InviteConfig) {
  return render(
    <LanguageProvider>
      <SlotChoiceScreen
        config={config}
        onSelectSlot={() => {}}
        onCoordinateWhatsapp={() => {}}
        easterEggState={mockEasterEggState}
      />
    </LanguageProvider>
  );
}

describe('SlotChoiceScreen', () => {
  it('shows only WhatsApp coordination when no dates were provided', () => {
    renderSlotScreen(baseConfig);

    expect(screen.getByText("We'll coordinate on WhatsApp")).toBeInTheDocument();
    expect(screen.queryByText(/\d{4}-\d{2}-\d{2}/)).not.toBeInTheDocument();
  });

  it('does not render incomplete date slots as empty options', () => {
    renderSlotScreen({
      ...baseConfig,
      dateSlots: [
        { id: 'empty-date', date: '', time: '19:00' },
        { id: 'empty-time', date: '2026-06-20', time: '' },
      ],
    });

    expect(screen.getByText("We'll coordinate on WhatsApp")).toBeInTheDocument();
    expect(screen.queryByText('2026-06-20')).not.toBeInTheDocument();
    expect(screen.queryByText('19:00')).not.toBeInTheDocument();
  });
});
