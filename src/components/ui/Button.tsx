import { cloneElement, isValidElement } from 'react';
import type { ButtonHTMLAttributes, ReactElement } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  loading?: boolean;
  asChild?: boolean;
}

export const Button = ({
  variant = 'primary',
  loading,
  className,
  children,
  asChild,
  ...props
}: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary-light shadow-glow',
    ghost: 'bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/40 border border-white/40',
    outline: 'border border-primary text-primary hover:bg-primary/10 focus-visible:ring-primary',
  };

  const classes = clsx(base, variants[variant], className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<any>, {
      className: clsx(classes, (children as ReactElement<any>).props.className),
    } as any);
  }

  return (
    <button className={classes} disabled={loading} {...props}>
      {loading ? 'Please wait…' : children}
    </button>
  );
};

