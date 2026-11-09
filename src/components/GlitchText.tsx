import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'subtle' | 'normal' | 'intense';
  triggerOnHover?: boolean;
  colors?: [string, string, string]; // [primary, secondary, tertiary]
}

export function GlitchText({ 
  text, 
  className = '', 
  intensity = 'normal',
  triggerOnHover = true,
  colors = ['#00ffff', '#ff00ff', '#ffff00']
}: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchKey, setGlitchKey] = useState(0);

  useEffect(() => {
    if (intensity === 'intense') {
      const interval = setInterval(() => {
        setGlitchKey(k => k + 1);
      }, 3000 + Math.random() * 2000);
      return () => clearInterval(interval);
    }
  }, [intensity]);

  const [primary, secondary, tertiary] = colors;

  const style = {
    '--glitch-primary': primary,
    '--glitch-secondary': secondary,
    '--glitch-tertiary': tertiary,
    '--glitch-duration': intensity === 'subtle' ? '3s' : intensity === 'intense' ? '0.1s' : '2.5s',
  } as React.CSSProperties;

  return (
    <span
      className={`relative inline-block font-display ${className}`}
      style={style}
      onMouseEnter={() => triggerOnHover && setIsHovered(true)}
      onMouseLeave={() => triggerOnHover && setIsHovered(false)}
      data-text={text}
      data-glitch-key={glitchKey}
    >
      <span 
        className="relative z-10"
        style={{
          color: primary,
          textShadow: `0 0 10px ${primary}, 0 0 20px ${primary}`,
        }}
      >
        {text}
      </span>
      <span
        className="absolute inset-0 -z-10 animate-glitch"
        style={{
          color: secondary,
          clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)',
          animationDuration: isHovered ? '0.1s' : 'var(--glitch-duration, 2.5s)',
        }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute inset-0 -z-20 animate-glitch"
        style={{
          color: tertiary,
          clipPath: 'polygon(0 66%, 100% 66%, 100% 100%, 0 100%)',
          animationDuration: isHovered ? '0.1s' : 'var(--glitch-duration, 2.5s)',
        }}
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}

interface GlitchTextSimpleProps {
  text: string;
  className?: string;
  colors?: [string, string, string];
}

export function GlitchTextSimple({ 
  text, 
  className = '', 
  colors = ['#00ffff', '#ff00ff', '#ffff00'] 
}: GlitchTextSimpleProps) {
  return (
    <span
      className={`relative inline-block font-display ${className}`}
      style={{
        '--glitch-primary': colors[0],
        '--glitch-secondary': colors[1],
        '--glitch-tertiary': colors[2],
      } as React.CSSProperties}
      data-text={text}
    >
      <span className="relative z-10" style={{ color: colors[0] }}>
        {text}
      </span>
      <span
        className="absolute inset-0 -z-10 animate-glitch"
        style={{ color: colors[1], clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)' }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute inset-0 -z-20 animate-glitch"
        style={{ color: colors[2], clipPath: 'polygon(0 66%, 100% 66%, 100% 100%, 0 100%)' }}
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}