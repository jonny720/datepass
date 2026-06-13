import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { ConfirmDialog } from './ConfirmDialog';
import type { Language } from '@/types';

interface AppHeaderProps {
  onStartOver?: () => void;
  showStartOver?: boolean;
}

export function AppHeader({ onStartOver, showStartOver = true }: AppHeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleStartOverClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    if (onStartOver) {
      onStartOver();
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[10000] border-b border-stone-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-4xl items-center justify-between px-4">
        {/* Language Switcher */}
        <div className="flex gap-1">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`
              flex h-8 w-8 items-center justify-center rounded-md text-lg transition-all flex-shrink-0
              ${
                language === 'en'
                  ? 'bg-stone-900 shadow-sm ring-2 ring-stone-900 ring-offset-1'
                  : 'hover:bg-stone-100'
              }
            `}
            aria-label="English"
            title="English"
          >
            🇺🇸
          </button>
          <button
            onClick={() => handleLanguageChange('he')}
            className={`
              flex h-8 w-8 items-center justify-center rounded-md text-lg transition-all flex-shrink-0
              ${
                language === 'he'
                  ? 'bg-stone-900 shadow-sm ring-2 ring-stone-900 ring-offset-1'
                  : 'hover:bg-stone-100'
              }
            `}
            aria-label="Hebrew"
            title="עברית"
          >
            🇮🇱
          </button>
        </div>

        {/* Start Over */}
        {showStartOver && onStartOver && (
          <button
            type="button"
            onClick={handleStartOverClick}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-button-label font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
            aria-label={t('app_start_over')}
          >
            <RotateCcw size={14} className="flex-shrink-0" />
            <span className="hidden sm:inline">{t('app_start_over')}</span>
          </button>
        )}
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title={t('app_start_over_title')}
        description={t('app_start_over_description')}
        confirmLabel={t('app_start_over_confirm')}
        cancelLabel={t('app_start_over_cancel')}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </header>
  );
}
