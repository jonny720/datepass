import type { Language } from '@/types';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: Language;
  onChange: (language: Language) => void;
  className?: string;
}

export function LanguageToggle({
  language,
  onChange,
  className = '',
}: LanguageToggleProps) {
  const toggleLanguage = () => {
    onChange(language === 'en' ? 'he' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`
        flex items-center gap-2 rounded-lg px-3 py-2
        text-sm font-medium text-stone-700
        transition-colors duration-200
        hover:bg-stone-100
        ${className}
      `}
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'עברית' : 'English'}</span>
    </button>
  );
}
