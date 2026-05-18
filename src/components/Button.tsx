import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Base styles with enhanced interaction states
  const baseStyles = 'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95';

  // Size variants with consistent spacing
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs font-bold uppercase tracking-widest gap-1.5 min-h-[32px]',
    md: 'px-6 py-3 text-sm font-bold uppercase tracking-widest min-h-[44px]',
    lg: 'px-8 py-4 text-base font-bold uppercase tracking-widest min-h-[48px]',
  };

  // Color variants with enhanced hover and focus states
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 focus:ring-indigo-300 shadow-md hover:shadow-lg border border-transparent disabled:hover:bg-indigo-600 disabled:hover:shadow-md',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 hover:-translate-y-0.5 focus:ring-slate-300 border border-slate-200 disabled:hover:bg-slate-100',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 hover:-translate-y-0.5 focus:ring-red-300 border border-red-200 disabled:hover:bg-red-50',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:-translate-y-0.5 focus:ring-indigo-300 disabled:hover:bg-transparent',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:-translate-y-0.5 focus:ring-slate-300 disabled:hover:bg-transparent',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span className="flex items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
