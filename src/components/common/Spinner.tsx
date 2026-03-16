import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'slate';
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const colorClasses = {
    primary: 'border-primary-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    slate: 'border-slate-300 border-t-transparent',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      />
    </div>
  );
};
