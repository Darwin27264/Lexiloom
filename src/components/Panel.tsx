import { ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export function Panel({ children, className = '' }: PanelProps) {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 ${className}`}>
      {children}
    </div>
  );
}

