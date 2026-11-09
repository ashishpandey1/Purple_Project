import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date | string | number;
  className?: string;
  showLabels?: boolean;
  compact?: boolean;
  onComplete?: () => void;
  warningThreshold?: number; // hours
  dangerThreshold?: number; // hours
}

export function CountdownTimer({ 
  targetDate, 
  className = '', 
  showLabels = true,
  compact = false,
  onComplete,
  warningThreshold = 24,
  dangerThreshold = 1
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    
    const update = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsComplete(true);
        onComplete?.();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      // Check thresholds
      const totalHours = days * 24 + hours;
      if (totalHours <= dangerThreshold) {
        // danger
      } else if (totalHours <= warningThreshold) {
        // warning
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onComplete, warningThreshold, dangerThreshold]);

  const getStatus = () => {
    const totalHours = timeLeft.days * 24 + timeLeft.hours;
    if (totalHours <= dangerThreshold) return 'danger';
    if (totalHours <= warningThreshold) return 'warning';
    return 'normal';
  };

  const status = getStatus();

  if (isComplete) {
    return (
      <div className={`countdown-container danger ${className}`} role="timer" aria-live="polite">
        <span className="font-orbitron text-xl font-black animate-pulse-rgb">LIVE NOW</span>
      </div>
    );
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div 
      className={`countdown-container ${status === 'warning' ? 'warning' : status === 'danger' ? 'danger' : ''} ${className}`}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
    >
      {!compact && (
        <>
          <span className="countdown-digit" aria-label={`${timeLeft.days} days`}>{formatNumber(timeLeft.days)}</span>
          {showLabels && <span className="countdown-separator" aria-hidden="true">:</span>}
        </>
      )}
      <span className="countdown-digit" aria-label={`${timeLeft.hours} hours`}>{formatNumber(timeLeft.hours)}</span>
      {showLabels && <span className="countdown-separator" aria-hidden="true">:</span>}
      <span className="countdown-digit" aria-label={`${timeLeft.minutes} minutes`}>{formatNumber(timeLeft.minutes)}</span>
      {showLabels && <span className="countdown-separator" aria-hidden="true">:</span>}
      <span className="countdown-digit" aria-label={`${timeLeft.seconds} seconds`}>{formatNumber(timeLeft.seconds)}</span>
      {showLabels && !compact && (
        <div className="flex gap-4 mt-2 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          <span>DAYS</span>
          <span>HOURS</span>
          <span>MINS</span>
          <span>SECS</span>
        </div>
      )}
    </div>
  );
}

interface CountdownDigitProps {
  value: number;
  label?: string;
  className?: string;
}

export function CountdownDigit({ value, label, className = '' }: CountdownDigitProps) {
  return (
    <div className={`countdown-digit ${className}`} aria-label={`${value} ${label || ''}`}>
      {value.toString().padStart(2, '0')}
      {label && <span className="block text-[8px] font-mono text-muted-foreground uppercase mt-1">{label}</span>}
    </div>
  );
}

interface CountdownSeparatorProps {
  className?: string;
}

export function CountdownSeparator({ className = '' }: CountdownSeparatorProps) {
  return (
    <span className={`countdown-separator ${className}`} aria-hidden="true">:</span>
  );
}