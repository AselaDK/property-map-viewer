import React from 'react';
import clsx from 'clsx';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantClasses = {
  info: 'bg-amber-50 border-amber-200 text-amber-900',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  error: 'bg-red-50 border-red-200 text-red-800',
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  className,
}) => {
  return (
    <div
      className={clsx('rounded-2xl border px-4 py-3', variantClasses[variant], className)}
      role="alert"
    >
      {title && <p className="font-semibold mb-1">{title}</p>}
      <p className="text-sm opacity-90">{children}</p>
    </div>
  );
};
