import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function TextButton({
  children,
  size = 'md',
  className = '',
  ...props
}: TextButtonProps) {
  const sizeClasses = {
    sm: 'text-button-label gap-1.5',
    md: 'text-button-label gap-2',
    lg: 'text-button-label-lg gap-2',
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center
        font-medium text-pink-600
        hover:text-pink-700 hover:underline
        active:text-pink-800
        disabled:text-stone-400 disabled:no-underline
        disabled:cursor-not-allowed
        transition-colors duration-200
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
