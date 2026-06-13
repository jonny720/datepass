import type { ReactNode } from 'react';

interface IconBadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function IconBadge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: IconBadgeProps) {
  const variants = {
    primary: 'bg-pink-100 text-pink-600',
    secondary: 'bg-purple-100 text-purple-600',
    success: 'bg-emerald-100 text-emerald-600',
    warning: 'bg-amber-100 text-amber-600',
    error: 'bg-red-100 text-red-600',
  };

  const sizes = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };

  return (
    <div
      className={`
        inline-flex items-center justify-center rounded-2xl
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
