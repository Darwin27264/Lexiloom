export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        {/* Primary gradient orb - animated */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)',
            top: '-20%',
            left: '-10%',
          }}
        />
        
        {/* Secondary gradient orb - animated */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-3xl animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(251, 146, 60, 0.3) 50%, transparent 70%)',
            bottom: '-15%',
            right: '-5%',
          }}
        />
        
        {/* Tertiary gradient orb - animated */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-20 blur-3xl animate-float-fast"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
      
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
    </div>
  );
}
