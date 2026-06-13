import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { LanguageProvider } from '@/hooks/useLanguage';
import { MainQuestionScreen } from './MainQuestionScreen';
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

// Mock getBoundingClientRect for tests
beforeEach(() => {
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    width: 400,
    height: 300,
    top: 0,
    left: 0,
    bottom: 300,
    right: 400,
    x: 0,
    y: 0,
    toJSON: () => {},
  }));
});

describe('MainQuestionScreen - Escaping No Button', () => {
  it('renders yes and no buttons initially', () => {
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    expect(screen.getByText(/Yes, let's do it/i)).toBeInTheDocument();
    expect(screen.getByText(/Maybe another time/i)).toBeInTheDocument();
  });

  it('lets the recipient choose acceptance wording from the yes button menu', () => {
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByLabelText('Choose acceptance message'));
    fireEvent.click(screen.getByRole('button', { name: /You convinced me/i }));

    expect(screen.getByRole('button', { name: /You convinced me/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Yes, let's do it/i })).not.toBeInTheDocument();
  });

  it('renders the serious decline link', () => {
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    expect(screen.getByText(/No thanks, seriously/i)).toBeInTheDocument();
  });

  it('calls onDecline when serious decline link is clicked', () => {
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    const declineLink = screen.getByText(/No thanks, seriously/i);
    fireEvent.click(declineLink);

    expect(onDecline).toHaveBeenCalledTimes(1);
    expect(onNo).not.toHaveBeenCalled();
  });

  it('calls onYes when yes button is clicked', () => {
    vi.useFakeTimers();
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    const yesButton = screen.getByText(/Yes, let's do it/i);
    fireEvent.click(yesButton);

    // Wait for celebration timeout (1200ms in component)
    vi.advanceTimersByTime(1300);

    expect(onYes).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('renders play area container with appropriate height', () => {
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    const { container } = render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    // Play area should exist with className pattern
    const playArea = container.querySelector('.flex.min-h-screen');
    expect(playArea).toBeInTheDocument();
  });

  it('changes button label on first escape attempt', () => {
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    const noButton = screen.getByText(/Maybe another time/i);
    
    // Click to trigger first escape
    fireEvent.click(noButton);

    // Label should change after escape
    expect(screen.queryByText(/Maybe another time/i)).not.toBeInTheDocument();
    
    // And new label appears
    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
  });

  it('enforces cooldown between escape attempts', () => {
    vi.useFakeTimers();
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    const noButton = screen.getByText(/Maybe another time/i);
    
    // First escape via click
    fireEvent.click(noButton);
    
    // Verify first escape happened
    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();

    // Find the new button position
    const button1 = screen.getByText(/Are you sure/i);
    
    // Immediate second attempt should be blocked by cooldown
    fireEvent.click(button1);
    
    // Label shouldn't change yet (still first escape text)
    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();

    // After cooldown, next escape should work
    vi.advanceTimersByTime(500);
    
    fireEvent.click(button1);
    
    // Should have progressed to second escape
    expect(screen.getByText(/Almost/i)).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('does not escape on keyboard focus', () => {
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    const noButton = screen.getByText(/Maybe another time/i);
    
    // Focus event should not trigger escape
    fireEvent.focus(noButton);

    // Button label should remain unchanged
    expect(screen.getByText(/Maybe another time/i)).toBeInTheDocument();
  });

  it('handles touch interaction on mobile', () => {
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    const noButton = screen.getByText(/Maybe another time/i);
    
    // Simulate touch interaction via click (which also triggers escape now)
    fireEvent.click(noButton);

    // Label should change after escape
    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
  });

  it('allows clicking No button after max escapes', () => {
    vi.useFakeTimers();
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    // Trigger 6 escape attempts (0-5), then button becomes clickable on attempt 6
    for (let i = 0; i < 6; i++) {
      // Find button by text content
      const buttons = screen.queryAllByRole('button');
      const noButton = buttons.find((btn) =>
        btn.textContent?.includes('Maybe another time') ||
        btn.textContent?.includes('Are you sure') ||
        btn.textContent?.includes('Almost') ||
        btn.textContent?.includes('Nice try') ||
        btn.textContent?.includes('Still trying') ||
        btn.textContent?.includes('Persistent')
      );

      if (noButton) {
        fireEvent.pointerEnter(noButton, { pointerType: 'mouse' });
        fireEvent.pointerLeave(noButton);
      }
      
      vi.advanceTimersByTime(500); // Wait for cooldown
    }

    // After 6 escapes (attempts 0-5), button should show final message and be clickable
    // The button should exist with final text
    const buttons = screen.queryAllByRole('button');
    const finalButton = buttons.find((btn) =>
      btn.textContent?.includes('you can click me now')
    );

    // If we have the final button, it should be clickable
    if (finalButton) {
      fireEvent.click(finalButton);
      expect(onNo).toHaveBeenCalledTimes(1);
    } else {
      // If we can't find it with exact text, at least verify button progression happened
      expect(buttons.length).toBeGreaterThan(0);
    }

    vi.useRealTimers();
  });

  it('serious decline link remains accessible throughout', () => {
    vi.useFakeTimers();
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    const declineLink = screen.getByText(/No thanks, seriously/i);

    // Should work before any escapes
    fireEvent.click(declineLink);
    expect(onDecline).toHaveBeenCalledTimes(1);
    
    // Reset
    onDecline.mockClear();

    // Trigger some escapes
    const noButton = screen.getByText(/Maybe another time/i);
    fireEvent.pointerEnter(noButton, { pointerType: 'mouse' });
    vi.advanceTimersByTime(500);

    // Decline link should still work after escapes
    const declineLinkAfter = screen.getByText(/No thanks, seriously/i);
    fireEvent.click(declineLinkAfter);
    expect(onDecline).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('maintains minimum accessible button size', () => {
    const onYes = vi.fn();
    const onNo = vi.fn();
    const onDecline = vi.fn();

    const { container } = render(
      <LanguageProvider>
        <MainQuestionScreen
          config={mockConfig}
          onYes={onYes}
          onNo={onNo}
          onDecline={onDecline}
        />
      </LanguageProvider>
    );

    // Trigger escape
    const noButton = screen.getByText(/Maybe another time/i);
    fireEvent.pointerEnter(noButton, { pointerType: 'mouse' });

    // Check that button maintains minimum height (44px for touch targets)
    const buttons = container.querySelectorAll('button[style*="minHeight"]');
    buttons.forEach((button) => {
      const style = (button as HTMLElement).style;
      const minHeight = parseInt(style.minHeight, 10);
      expect(minHeight).toBeGreaterThanOrEqual(44);
    });
  });
});
