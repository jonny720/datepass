import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppHeader } from './AppHeader';
import { LanguageProvider } from '@/hooks/useLanguage';

describe('AppHeader', () => {
  const mockOnStartOver = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHeader = (props = {}) => {
    return render(
      <LanguageProvider>
        <AppHeader onStartOver={mockOnStartOver} showStartOver={true} {...props} />
      </LanguageProvider>
    );
  };

  it('renders language switcher buttons', () => {
    renderHeader();
    
    const englishButton = screen.getByLabelText('English');
    const hebrewButton = screen.getByLabelText('Hebrew');
    
    expect(englishButton).toBeInTheDocument();
    expect(hebrewButton).toBeInTheDocument();
  });

  it('renders Start over button when showStartOver is true', () => {
    renderHeader();
    
    const startOverButton = screen.getByRole('button', { name: /start over/i });
    expect(startOverButton).toBeInTheDocument();
  });

  it('does not render Start over button when showStartOver is false', () => {
    renderHeader({ showStartOver: false });
    
    const startOverButton = screen.queryByRole('button', { name: /start over/i });
    expect(startOverButton).not.toBeInTheDocument();
  });

  it('opens confirmation dialog when Start over is clicked', async () => {
    renderHeader();
    
    const startOverButton = screen.getByRole('button', { name: /start over/i });
    fireEvent.click(startOverButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Start over\?/i)).toBeInTheDocument();
      expect(screen.getByText(/This will clear the invitation you are currently creating/i)).toBeInTheDocument();
    });
  });

  it('calls onStartOver when confirmed', async () => {
    renderHeader();
    
    // Click Start over button
    const startOverButton = screen.getByRole('button', { name: /start over/i });
    fireEvent.click(startOverButton);
    
    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText(/Start over\?/i)).toBeInTheDocument();
    });
    
    // Click confirm button in dialog (it's the second "Start over" button)
    const buttons = screen.getAllByRole('button');
    const confirmButton = buttons.find(btn => 
      btn.textContent?.includes('Start over') && 
      btn.closest('[class*="relative z-10"]') // Inside the dialog
    );
    
    if (confirmButton) {
      fireEvent.click(confirmButton);
    }
    
    await waitFor(() => {
      expect(mockOnStartOver).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call onStartOver when cancelled', async () => {
    renderHeader();
    
    // Click Start over button
    const startOverButton = screen.getByRole('button', { name: /start over/i });
    fireEvent.click(startOverButton);
    
    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText(/Start over\?/i)).toBeInTheDocument();
    });
    
    // Click cancel button (find the one inside the dialog)
    const buttons = screen.getAllByRole('button');
    const cancelButton = buttons.find(btn => 
      btn.textContent === 'Cancel' && 
      btn.closest('[class*="relative z-10"]') // Inside the dialog
    );
    
    if (cancelButton) {
      fireEvent.click(cancelButton);
    }
    
    await waitFor(() => {
      expect(mockOnStartOver).not.toHaveBeenCalled();
    });
  });

  it('switches language when language button is clicked', () => {
    renderHeader();
    
    const hebrewButton = screen.getByLabelText('Hebrew');
    fireEvent.click(hebrewButton);
    
    // Check that Hebrew is now active (has specific styling classes)
    expect(hebrewButton).toHaveClass('bg-stone-900');
  });
});
