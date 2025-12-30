import { ReactNode } from 'react';

interface DeviceFrameProps {
  children: ReactNode;
}

export function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div className="bg-surface rounded-[32px] p-3 shadow-lg border border-subtle animate-fade-in-scale">
      <div
        className="relative overflow-hidden rounded-[24px]"
        style={{
          width: '400px',
          aspectRatio: '9 / 19.5',
          maxWidth: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
