import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function PrimaryButton({
  children,
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: 'min-h-[36px] px-4 py-2 text-button-label gap-1.5',
    md: 'min-h-[44px] px-5 py-2.5 text-button-label gap-2',
    lg: 'min-h-[48px] px-6 py-3 text-button-label-lg gap-2',
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center whitespace-nowrap
        rounded-xl font-semibold text-white
        bg-gradient-to-r from-pink-500 to-pink-600
        hover:from-pink-600 hover:to-pink-700
        active:from-pink-700 active:to-pink-800
        disabled:from-stone-300 disabled:to-stone-300
        disabled:cursor-not-allowed disabled:text-stone-500
        transition-all duration-200
        shadow-md hover:shadow-lg
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
