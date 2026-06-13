import type { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface OptionCardProps {
  children?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  compact?: boolean;
}

export function OptionCard({
  children,
  selected = false,
  onClick,
  className = '',
  icon,
  title,
  description,
  compact = false,
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-full rounded-xl ${compact ? 'p-3' : 'p-4'}
        border-2 transition-all duration-200
        text-left
        ${
          selected
            ? 'border-pink-500 bg-pink-50 shadow-md'
            : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm'
        }
        ${className}
      `}
    >
      {selected && (
        <div className={`absolute ${compact ? 'right-2 top-2 h-5 w-5' : 'right-3 top-3 h-6 w-6'} flex items-center justify-center rounded-full bg-pink-500`}>
          <Check className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} text-white`} />
        </div>
      )}
      
      {icon || title || description ? (
        <div className="flex items-start gap-3">
          {icon && (
            <div className={`${compact ? 'mt-0.5' : 'mt-1'} flex-shrink-0 text-pink-600`}>
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <div className={`${compact ? 'text-card-answer' : 'text-card-prompt'} font-semibold text-stone-800 ${selected ? 'pr-6' : ''}`}>
                {title}
              </div>
            )}
            {description && (
              <div className={`${compact ? 'text-helper' : 'text-body-sm'} text-stone-600 ${title ? 'mt-0.5' : ''}`}>
                {description}
              </div>
            )}
          </div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
