import { forwardRef, ButtonHTMLAttributes } from 'react';

interface RGBButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'magenta' | 'yellow' | 'green' | 'ghost-cyan' | 'ghost-magenta';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<string, string> = {
  cyan: 'btn-rgb-cyan',
  magenta: 'btn-rgb-magenta',
  yellow: 'btn-rgb-yellow',
  green: 'btn-rgb-green',
  'ghost-cyan': 'btn-ghost-rgb btn-ghost-rgb-cyan',
  'ghost-magenta': 'btn-ghost-rgb btn-ghost-rgb-magenta',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const RGBButton = forwardRef<HTMLButtonElement, RGBButtonProps>(
  ({ 
    variant = 'cyan', 
    size = 'md', 
    loading = false, 
    leftIcon, 
    rightIcon, 
    fullWidth = false,
    className = '',
    disabled,
    children,
    ...props
  }, ref) => {
    const baseClass = variantStyles[variant] || variantStyles.cyan;
    const sizeClass = sizeStyles[size] || sizeStyles.md;
    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClass = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : '';

    const combinedClass = `${baseClass} ${sizeClass} ${widthClass} ${disabledClass} ${className}`.trim();

    return (
      <button
        ref={ref}
        className={combinedClass}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading...</span>
          </span>
        )}
        {!loading && leftIcon && <span className="flex items-center">{leftIcon}</span>}
        <span className={loading ? 'hidden' : ''}>{children}</span>
        {!loading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </button>
    );
  }
);

RGBButton.displayName = 'RGBButton';

export function RGBButtonGroup({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {children}
    </div>
  );
}

// Pre-configured button variants for common use cases
export const PrimaryCTA = forwardRef<HTMLButtonElement, Omit<RGBButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <RGBButton ref={ref} variant="cyan" size="lg" {...props}>{children}</RGBButton>
  )
);

export const SecondaryCTA = forwardRef<HTMLButtonElement, Omit<RGBButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <RGBButton ref={ref} variant="ghost-cyan" size="lg" {...props}>{children}</RGBButton>
  )
);

export const DangerCTA = forwardRef<HTMLButtonElement, Omit<RGBButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <RGBButton ref={ref} variant="magenta" size="lg" {...props}>{children}</RGBButton>
  )
);

export const SuccessCTA = forwardRef<HTMLButtonElement, Omit<RGBButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <RGBButton ref={ref} variant="green" size="lg" {...props}>{children}</RGBButton>
  )
);

export const WarningCTA = forwardRef<HTMLButtonElement, Omit<RGBButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <RGBButton ref={ref} variant="yellow" size="lg" {...props}>{children}</RGBButton>
  )
);

// Icon-only button
interface RGBIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'magenta' | 'yellow' | 'green' | 'ghost';
  icon: React.ReactNode;
  'aria-label': string;
}

export function RGBIconButton({ variant = 'cyan', icon, 'aria-label': ariaLabel, className = '', ...props }: RGBIconButtonProps) {
  const baseClass = variant === 'ghost' 
    ? 'btn-ghost-rgb btn-ghost-rgb-cyan' 
    : `btn-rgb-${variant}`;
  
  return (
    <button
      className={`${baseClass} btn-icon-arena ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </button>
  );
}