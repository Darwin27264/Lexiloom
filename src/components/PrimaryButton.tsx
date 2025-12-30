import { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'ghost';
}

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
}: PrimaryButtonProps) {
  const baseClasses = 'rounded-full px-4 py-2 text-sm font-medium transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in';
  
  const variantClasses = variant === 'primary'
    ? 'bg-accent text-button hover:opacity-90'
    : 'bg-transparent border border-subtle text-accent hover:opacity-80';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
