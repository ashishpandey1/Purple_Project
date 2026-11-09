import { forwardRef, HTMLAttributes } from 'react';

interface ArenaCardRGBProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'animated' | 'hex';
  accent?: 'cyan' | 'magenta' | 'yellow' | 'green';
  hoverLift?: boolean;
  children: React.ReactNode;
}

export const ArenaCardRGB = forwardRef<HTMLDivElement, ArenaCardRGBProps>(
  ({ 
    variant = 'default', 
    accent = 'cyan',
    hoverLift = true,
    children,
    className = '',
    style,
    ...props
  }, ref) => {
    const baseClasses = variant === 'animated' 
      ? 'arena-card-rgb-animated' 
      : variant === 'hex'
      ? 'arena-card-rgb hex-card'
      : 'arena-card-rgb';
    
    const hoverClass = hoverLift ? 'hover-lift' : '';
    const accentClass = `accent-${accent}`;

    const accentColors: Record<string, { primary: string; dim: string }> = {
      cyan: { primary: 'var(--rgb-cyan)', dim: 'var(--rgb-cyan-dim)' },
      magenta: { primary: 'var(--rgb-magenta)', dim: 'var(--rgb-magenta-dim)' },
      yellow: { primary: 'var(--rgb-yellow)', dim: 'var(--rgb-yellow-dim)' },
      green: { primary: 'var(--rgb-green)', dim: 'var(--rgb-green-dim)' },
    };

    const color = accentColors[accent] || accentColors.cyan;

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${hoverClass} ${accentClass} ${className}`}
        style={{
          ...style,
          '--accent-primary': color.primary,
          '--accent-dim': color.dim,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ArenaCardRGB.displayName = 'ArenaCardRGB';

interface ArenaCardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  accent?: 'cyan' | 'magenta' | 'yellow' | 'green';
  children?: React.ReactNode;
  className?: string;
}

export function ArenaCardHeader({ title, subtitle, icon, accent = 'cyan', children, className = '' }: ArenaCardHeaderProps) {
  const accentColors: Record<string, { primary: string; dim: string }> = {
    cyan: { primary: 'var(--rgb-cyan)', dim: 'var(--rgb-cyan-dim)' },
    magenta: { primary: 'var(--rgb-magenta)', dim: 'var(--rgb-magenta-dim)' },
    yellow: { primary: 'var(--rgb-yellow)', dim: 'var(--rgb-yellow-dim)' },
    green: { primary: 'var(--rgb-green)', dim: 'var(--rgb-green-dim)' },
  };

  const color = accentColors[accent] || accentColors.cyan;

  return (
    <div className={`p-5 ${className}`} style={{ '--accent-primary': color.primary, '--accent-dim': color.dim } as React.CSSProperties}>
      {(icon || children) && (
        <div 
          className="flex h-12 w-12 items-center justify-center rounded-xl mb-4"
          style={{
            background: `linear-gradient(135deg, ${color.primary} 0%, ${color.dim} 100%)`,
            boxShadow: `0 0 24px ${color.primary}66`,
          }}
        >
          {icon || children}
        </div>
      )}
      <h3 className="font-display text-lg font-bold text-foreground mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

interface ArenaCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ArenaCardContent({ children, className = '' }: ArenaCardContentProps) {
  return (
    <div className={`p-0 sm:p-5 pb-5 ${className}`}>
      {children}
    </div>
  );
}

interface ArenaCardFooterProps {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export function ArenaCardFooter({ children, className = '', divider = true }: ArenaCardFooterProps) {
  return (
    <div className={`mt-4 ${divider ? 'border-t border-glass-border pt-4' : ''} ${className}`}>
      {children}
    </div>
  );
}

interface ArenaCardStatProps {
  label: string;
  value: string | number;
  accent?: 'cyan' | 'magenta' | 'yellow' | 'green';
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function ArenaCardStat({ label, value, accent = 'cyan', trend = 'neutral', className = '' }: ArenaCardStatProps) {
  const accentColors: Record<string, string> = {
    cyan: 'var(--rgb-cyan)',
    magenta: 'var(--rgb-magenta)',
    yellow: 'var(--rgb-yellow)',
    green: 'var(--rgb-green)',
  };

  const color = accentColors[accent] || accentColors.cyan;

  return (
    <div className={`p-3 rounded-xl bg-abyss-card border border-glass-border ${className}`} style={{ '--stat-color': color } as React.CSSProperties}>
      <p className="label-caps text-muted-foreground mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <span className="font-display text-xl font-black tabular-nums" style={{ color }}>{value}</span>
        {trend !== 'neutral' && (
          <span className={`font-mono text-xs ${trend === 'up' ? 'text-rgb-green' : 'text-rgb-red'}`}>
            {trend === 'up' ? '▲' : '▼'}
          </span>
        )}
      </div>
    </div>
  );
}

// Complete arena card with all sections
interface FullArenaCardProps {
  variant?: 'default' | 'animated' | 'hex';
  accent?: 'cyan' | 'magenta' | 'yellow' | 'green';
  hoverLift?: boolean;
  header?: {
    title: string;
    subtitle?: string;
    accent?: 'cyan' | 'magenta' | 'yellow' | 'green';
    icon?: React.ReactNode;
  };
  content: React.ReactNode;
  footer?: React.ReactNode;
  stats?: Array<{
    label: string;
    value: string | number;
    accent?: 'cyan' | 'magenta' | 'yellow' | 'green';
    trend?: 'up' | 'down' | 'neutral';
  }>;
  className?: string;
  style?: React.CSSProperties;
}

export function FullArenaCard({ 
  variant = 'default',
  accent = 'cyan',
  hoverLift = true,
  header, 
  content, 
  footer, 
  stats, 
  className = '',
  style,
}: FullArenaCardProps) {
  return (
    <ArenaCardRGB variant={variant} accent={accent} hoverLift={hoverLift} className={className} style={style}>
      {header && <ArenaCardHeader {...header} />}
      {stats && stats.length > 0 && (
        <div className="px-5 pb-4 grid grid-cols-3 gap-3 border-b border-glass-border">
          {stats.map((stat, i) => <ArenaCardStat key={i} {...stat} />)}
        </div>
      )}
      <ArenaCardContent>{content}</ArenaCardContent>
      {footer && <ArenaCardFooter>{footer}</ArenaCardFooter>}
    </ArenaCardRGB>
  );
}