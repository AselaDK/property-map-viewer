import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 11)}`;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-stone-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400',
            'focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500',
            error && 'border-red-400 focus:ring-red-500/25 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
