import { ReactNode } from 'react';

interface DeviceFrameProps {
  children: ReactNode;
}

export function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div className="glass-strong rounded-3xl p-3 shadow-2xl">
      <div
        className="relative overflow-hidden"
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
