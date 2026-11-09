interface ScanlinesOverlayProps {
  intensity?: number; // 0-1
  speed?: number; // animation duration in seconds
  className?: string;
  enabled?: boolean;
}

export function ScanlinesOverlay({ 
  intensity = 0.15, 
  speed = 4, 
  className = '', 
  enabled = true 
}: ScanlinesOverlayProps) {
  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[var(--z-scanlines,99)] ${className}`}
      style={{
        background: `repeating-linear-gradient(0deg, rgba(0,0,0,${intensity}) 0px, rgba(0,0,0,${intensity}) 1px, transparent 1px, transparent 3px)`,
        animation: `scanline ${speed}s linear infinite`,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}

interface VignetteOverlayProps {
  strength?: number; // 0-1
  className?: string;
  enabled?: boolean;
}

export function VignetteOverlay({ 
  strength = 0.6, 
  className = '', 
  enabled = true 
}: VignetteOverlayProps) {
  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[var(--z-vignette,98)] ${className}`}
      style={{
        background: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,${strength}) 100%)`,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}

interface CRTMonitorProps {
  children: React.ReactNode;
  scanlines?: ScanlinesOverlayProps;
  vignette?: VignetteOverlayProps;
  className?: string;
  enabled?: boolean;
}

export function CRTMonitor({ 
  children, 
  scanlines = {}, 
  vignette = {}, 
  className = '',
  enabled = true 
}: CRTMonitorProps) {
  if (!enabled) return <>{children}</>;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <ScanlinesOverlay {...scanlines} />
      <VignetteOverlay {...vignette} />
    </div>
  );
}

interface RGBBorderProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  borderWidth?: number;
  borderRadius?: string;
  padding?: string;
}

export function RGBBorder({ 
  children, 
  className = '', 
  speed = 4, 
  borderWidth = 2, 
  borderRadius = 'var(--radius-xl)',
  padding = '0'
}: RGBBorderProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        borderRadius,
        padding,
        background: `linear-gradient(90deg, var(--rgb-cyan), var(--rgb-magenta), var(--rgb-yellow), var(--rgb-green), var(--rgb-cyan))`,
        backgroundSize: '300% 100%',
        animation: `rgb-shift ${speed}s linear infinite`,
      } as React.CSSProperties}
    >
      <div
        style={{
          position: 'absolute',
          inset: borderWidth,
          background: 'var(--abyss-card)',
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  enabled?: boolean;
}

export function ParticleField({ 
  className = '', 
  particleCount = 50, 
  colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff41'],
  enabled = true 
}: ParticleFieldProps) {
  if (!enabled) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-[var(--z-particles,10)] ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: particleCount }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }}
        />
      ))}
    </div>
  );
}

interface FloatingShapeProps {
  className?: string;
  shape?: 'hexagon' | 'triangle' | 'circle' | 'square';
  size?: string;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  animationDelay?: number;
  animationDuration?: number;
  style?: React.CSSProperties;
}

export function FloatingShape({ 
  className = '', 
  shape = 'hexagon', 
  size = '16px', 
  color = 'transparent',
  borderColor = 'var(--rgb-cyan)',
  borderWidth = 2,
  animationDelay = 0,
  animationDuration = 6,
  style
}: FloatingShapeProps) {
  const clipPaths: Record<string, string> = {
    hexagon: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    triangle: 'polygon(50% 0%, 100% 100%, 0% 100%)',
    circle: 'circle(50% at 50% 50%)',
    square: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  };

  return (
    <div
      className={`${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        border: `${borderWidth}px solid ${borderColor}`,
        clipPath: clipPaths[shape] || clipPaths.hexagon,
        animation: `float ${animationDuration}s ease-in-out infinite`,
        animationDelay: `${animationDelay}s`,
        opacity: 0.5,
        ...style,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}