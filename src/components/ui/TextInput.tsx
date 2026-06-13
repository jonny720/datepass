import type { InputHTMLAttributes } from 'react';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export function TextInput({
  label,
  error,
  className = '',
  onChange,
  ...props
}: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="mb-2 block text-sm font-semibold text-stone-700"
        >
          {label}
        </label>
      )}
      <input
        className={`
          w-full rounded-xl border-2 px-4 py-3
          text-base text-stone-900 placeholder-stone-400
          transition-all duration-200
          ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-stone-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200'
          }
          disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-500
          ${className}
        `}
        onChange={handleChange}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
