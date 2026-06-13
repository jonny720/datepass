import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  function SecondaryButton(
    {
      children,
      size = 'md',
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) {
    const sizeClasses = {
      sm: 'min-h-[36px] px-4 py-2 text-button-label gap-1.5',
      md: 'min-h-[44px] px-5 py-2.5 text-button-label gap-2',
      lg: 'min-h-[48px] px-6 py-3 text-button-label-lg gap-2',
    };

    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center whitespace-nowrap
          rounded-xl font-semibold
          bg-white text-stone-700
          border-2 border-stone-300
          hover:border-stone-400 hover:bg-stone-50
          active:bg-stone-100
          disabled:border-stone-200 disabled:bg-white
          disabled:cursor-not-allowed disabled:text-stone-400
          transition-all duration-200
          shadow-sm hover:shadow
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);
