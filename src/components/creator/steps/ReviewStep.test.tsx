import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '@/hooks/useLanguage';
import { INITIAL_DRAFT } from '@/types';
import { SHARE_MESSAGE_PRESETS } from '@/config/shareMessagePresets';
import { ReviewStep } from './ReviewStep';

describe('ReviewStep', () => {
  it('renders opening message options with readable contrast', () => {
    render(
      <LanguageProvider>
        <ReviewStep
          draft={{
            ...INITIAL_DRAFT,
            senderName: 'Alex',
            recipientName: 'Jordan',
            theme: 'party',
            activityIds: ['coffee'],
          }}
          onBack={() => {}}
          onReset={() => {}}
        />
      </LanguageProvider>
    );

    expect(screen.getByText('Choose your opening message')).toHaveClass('text-stone-800');

    const firstPreset = screen.getByText(SHARE_MESSAGE_PRESETS[0].message.en);
    const secondPreset = screen.getByText(SHARE_MESSAGE_PRESETS[1].message.en);

    expect(firstPreset).toHaveClass('text-stone-950');
    expect(secondPreset).toHaveClass('text-stone-800');
    expect(secondPreset).not.toHaveClass('text-white');
  });

  it('positions preview mode below the main top bar', () => {
    const { container } = render(
      <LanguageProvider>
        <ReviewStep
          draft={{
            ...INITIAL_DRAFT,
            senderName: 'Alex',
            recipientName: 'Jordan',
            theme: 'party',
            activityIds: ['coffee'],
          }}
          onBack={() => {}}
          onReset={() => {}}
        />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText('Preview full experience'));

    expect(screen.getByText('Preview mode')).toBeInTheDocument();
    expect(container.querySelector('.top-12')).toBeInTheDocument();
  });
});
