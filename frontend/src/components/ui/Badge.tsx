import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-bold uppercase tracking-widest rounded-lg',
        {
          'bg-slate-100 text-slate-500': variant === 'default',
          'bg-primary-50 text-primary-600': variant === 'primary',
          'bg-emerald-50 text-emerald-600': variant === 'success',
          'bg-amber-50 text-amber-600': variant === 'warning',
          'px-2 py-0.5 text-[9px]': size === 'sm',
          'px-2.5 py-1 text-[10px]': size === 'md',
          'px-3 py-1.5 text-[11px]': size === 'lg',
        },
        className
      )}
    >
      {children}
    </span>
  );
};
