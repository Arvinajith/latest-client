import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <label className="flex flex-col gap-1 text-sm font-medium text-charcoal/70">
      {label && <span>{label}</span>}
      <input
        ref={ref}
        className={clsx(
          'rounded-2xl border border-charcoal/10 bg-white/80 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
          error && 'border-red-400 focus:ring-red-200',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
);

Input.displayName = 'Input';

