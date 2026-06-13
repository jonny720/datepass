import type { ReactNode } from 'react';

interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
}

export function ScreenContainer({ children, className = '' }: ScreenContainerProps) {
  return (
    <div className={`min-h-screen px-4 py-6 sm:px-6 sm:py-8 ${className}`}>
      <div className="mx-auto max-w-2xl">
        {children}
      </div>
    </div>
  );
}
