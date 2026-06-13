import type { ReactNode } from 'react';
import { Info, AlertCircle, CheckCircle } from 'lucide-react';

interface InlineNoticeProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning';
  className?: string;
}

export function InlineNotice({
  children,
  variant = 'info',
  className = '',
}: InlineNoticeProps) {
  const variants = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info,
    },
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: CheckCircle,
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: AlertCircle,
    },
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      className={`
        flex gap-3 rounded-xl border-2 p-4
        ${config.bg} ${config.border}
        ${className}
      `}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${config.text}`} />
      <p className={`text-sm ${config.text}`}>
        {children}
      </p>
    </div>
  );
}
