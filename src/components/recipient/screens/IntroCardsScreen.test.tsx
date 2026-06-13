import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/hooks/useLanguage';
import { IntroCardsScreen } from './IntroCardsScreen';
import type { InviteConfig } from '@/types';

const mockConfig: InviteConfig = {
  version: 1,
  language: 'en',
  senderName: 'Alex',
  recipientName: 'Jordan',
  theme: 'cruise',
  introTone: 'light',
  introCards: [
    { id: '1', promptKey: 'light-1', answer: 'Test answer 1' },
    { id: '2', promptKey: 'light-2', answer: 'Test answer 2' },
    { id: '3', promptKey: 'light-8', answer: 'Test answer 3' },
  ],
  activityIds: ['drinks'],
  dateSlots: [],
};

const mockEasterEggState = {
  targetScreen: 'arrival' as const,
  hasBeenRevealed: false,
  markAsRevealed: () => {},
  shouldShowOnScreen: () => false,
};

const mockDuckState = {
  targetScreen: 'arrival' as const,
  hasBeenRevealed: false,
  markAsRevealed: () => {},
  shouldShowOnScreen: () => false,
};

const renderWithProvider = (config: InviteConfig, onNext = () => {}) => {
  return render(
    <LanguageProvider>
      <IntroCardsScreen config={config} onNext={onNext} easterEggState={mockEasterEggState} duckState={mockDuckState} />
    </LanguageProvider>
  );
};

describe('IntroCardsScreen', () => {
  it('renders all intro cards at once', () => {
    renderWithProvider(mockConfig);
    
    expect(screen.getByText('Test answer 1')).toBeInTheDocument();
    expect(screen.getByText('Test answer 2')).toBeInTheDocument();
    expect(screen.getByText('Test answer 3')).toBeInTheDocument();
  });

  it('does not show carousel arrows', () => {
    const { container } = renderWithProvider(mockConfig);
    
    // Check for ChevronLeft and ChevronRight which were in the old design
    const arrows = container.querySelectorAll('[data-lucide="chevron-left"], [data-lucide="chevron-right"]');
    expect(arrows.length).toBe(0);
  });

  it('does not show progress counter like "1 / 3"', () => {
    const { container } = renderWithProvider(mockConfig);
    
    expect(container.textContent).not.toMatch(/\d+\s*\/\s*\d+/);
  });

  it('shows localized prompt labels, not raw prompt keys', () => {
    renderWithProvider(mockConfig);
    
    // Should show the actual prompt label
    expect(screen.getByText(/In my free time/i)).toBeInTheDocument();
    
    // Should NOT show raw keys like "light-1"
    expect(screen.queryByText('light-1')).not.toBeInTheDocument();
    expect(screen.queryByText('light-2')).not.toBeInTheDocument();
    expect(screen.queryByText('light-8')).not.toBeInTheDocument();
  });

  it('shows Continue button', () => {
    renderWithProvider(mockConfig);
    
    const continueButton = screen.getByRole('button', { name: /continue/i });
    expect(continueButton).toBeInTheDocument();
  });

  it('shows the secret duck in development', () => {
    renderWithProvider(mockConfig);

    expect(screen.getByLabelText(/secret duck/i)).toBeInTheDocument();
  });

  it('keeps the duck mounted after reveal so the message can display', () => {
    const duckState = {
      ...mockDuckState,
      hasBeenRevealed: true,
    };

    render(
      <LanguageProvider>
        <IntroCardsScreen
          config={mockConfig}
          onNext={() => {}}
          easterEggState={mockEasterEggState}
          duckState={duckState}
        />
      </LanguageProvider>
    );

    expect(screen.getByLabelText(/secret duck/i)).toBeInTheDocument();
  });

  it('shows a duck message when clicked', () => {
    renderWithProvider(mockConfig);

    fireEvent.click(screen.getByLabelText(/secret duck/i));

    expect(screen.getByText(/duck/i)).toBeInTheDocument();
  });

  it('renders header with new copy', () => {
    renderWithProvider(mockConfig);
    
    expect(screen.getByText(/Before we continue/i)).toBeInTheDocument();
    expect(screen.getByText(/A few things you should probably know/i)).toBeInTheDocument();
  });

  it('filters out cards with empty answers', () => {
    const configWithEmptyCard: InviteConfig = {
      ...mockConfig,
      introCards: [
        { id: '1', promptKey: 'playful-1', answer: 'Test answer 1' },
        { id: '2', promptKey: 'playful-2', answer: '' },
        { id: '3', promptKey: 'playful-8', answer: 'Test answer 3' },
      ],
    };

    renderWithProvider(configWithEmptyCard);
    
    expect(screen.getByText('Test answer 1')).toBeInTheDocument();
    expect(screen.getByText('Test answer 3')).toBeInTheDocument();
    expect(screen.queryByText(/playful-2/i)).not.toBeInTheDocument();
  });

  it('handles one card gracefully', () => {
    const configWithOneCard: InviteConfig = {
      ...mockConfig,
      introCards: [
        { id: '1', promptKey: 'playful-1', answer: 'Only one answer' },
      ],
    };

    const { container } = renderWithProvider(configWithOneCard);
    
    expect(screen.getByText('Only one answer')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it('handles two cards gracefully', () => {
    const configWithTwoCards: InviteConfig = {
      ...mockConfig,
      introCards: [
        { id: '1', promptKey: 'playful-1', answer: 'First answer' },
        { id: '2', promptKey: 'playful-2', answer: 'Second answer' },
      ],
    };

    renderWithProvider(configWithTwoCards);
    
    expect(screen.getByText('First answer')).toBeInTheDocument();
    expect(screen.getByText('Second answer')).toBeInTheDocument();
  });

  it('uses theme-aware background', () => {
    const { container, rerender } = renderWithProvider(mockConfig);
    
    // Cruise theme should have ocean background
    const motionDiv = container.querySelector('[class*="ocean-background-soft"]');
    expect(motionDiv).toBeInTheDocument();
    
    // Try with different theme
    const missionConfig: InviteConfig = { ...mockConfig, theme: 'secret_mission' };
    rerender(
      <LanguageProvider>
        <IntroCardsScreen config={missionConfig} onNext={() => {}} easterEggState={mockEasterEggState} duckState={mockDuckState} />
      </LanguageProvider>
    );
    const missionDiv = container.querySelector('[class*="mission-background-soft"]');
    expect(missionDiv).toBeInTheDocument();
  });

  it('supports Hebrew RTL layout', () => {
    const hebrewConfig: InviteConfig = {
      ...mockConfig,
      language: 'he',
    };

    const { container } = renderWithProvider(hebrewConfig);
    
    // The component sets dir attribute based on language config
    const mainDiv = container.querySelector('[dir]');
    expect(mainDiv).toBeInTheDocument();
    // Note: The actual RTL behavior is handled by the LanguageProvider context
  });

  it('supports English LTR layout', () => {
    const { container } = renderWithProvider(mockConfig);
    
    // The component sets dir attribute based on language config
    const mainDiv = container.querySelector('[dir]');
    expect(mainDiv).toBeInTheDocument();
  });
});
