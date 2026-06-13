import type { ReactNode } from 'react';

interface TicketCardProps {
  children: ReactNode;
  className?: string;
}

export function TicketCard({ children, className = '' }: TicketCardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Notches */}
      <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[var(--color-background)]" />
      <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[var(--color-background)]" />
      
      {/* Card */}
      <div
        className="
          rounded-2xl bg-white p-6
          shadow-lg
          border-2 border-dashed border-stone-200
        "
      >
        {children}
      </div>
    </div>
  );
}
