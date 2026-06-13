/**
 * Cross-browser DateTimeField component
 * 
 * Provides consistent date/time input experience across all browsers and devices.
 * Uses native HTML5 date/time pickers with custom visual wrapper.
 */

import { CalendarDays, Clock3 } from 'lucide-react';

export interface DateTimeFieldProps {
  type: 'date' | 'time';
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function DateTimeField({
  type,
  label,
  value,
  onChange,
  required = false,
}: DateTimeFieldProps) {
  const Icon = type === 'date' ? CalendarDays : Clock3;

  return (
    <div className="datepass-datetime-wrapper w-full min-w-0">
      <label className="mb-1.5 block text-xs font-medium text-stone-600">
        {label}
      </label>

      <div className="datepass-datetime-field-wrapper relative w-full min-w-0 max-w-full">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="datepass-date-time-input block h-12 w-full min-w-0 max-w-full box-border bg-transparent px-3 pe-11 text-base outline-none"
        />

        {/* Custom icon - always visible */}
        <div className="absolute end-3 inset-y-0 flex items-center pointer-events-none text-stone-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
