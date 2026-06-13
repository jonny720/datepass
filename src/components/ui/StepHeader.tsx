interface StepHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function StepHeader({ title, subtitle, className = '' }: StepHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="mb-2 text-3xl font-bold text-stone-900 sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-stone-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}
