import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  life: number;
  decay: number;
}

interface ParticleSystemProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  enabled?: boolean;
}

export function ParticleSystem({ 
  className = '', 
  particleCount = 80, 
  colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff41', '#ff6600'],
  enabled = true 
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const createParticle = (): Particle => {
    const side = Math.random() < 0.5 ? 'left' : 'right';
    const width = dimensions.width || window.innerWidth;
    const height = dimensions.height || window.innerHeight;
    const x = side === 'left' ? -10 : width + 10;
    const y = Math.random() * height;
    const angle = side === 'left' 
      ? (Math.random() - 0.5) * Math.PI * 0.5 
      : (Math.random() - 0.5) * Math.PI * 0.5 + Math.PI;
    const speed = 0.5 + Math.random() * 1.5;
    const size = 1 + Math.random() * 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const decay = 0.002 + Math.random() * 0.003;
    
    return { x, y, angle, speed, size, color, life: 1, decay };
  };

  const initParticles = () => {
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      const p = createParticle();
      if (dimensions.width) {
        p.x = Math.random() * dimensions.width;
      }
      p.life = Math.random();
      particlesRef.current.push(p);
    }
  };

  const updateParticles = () => {
    // Add new particles occasionally
    if (Math.random() < 0.03) {
      particlesRef.current.push(createParticle());
    }

    particlesRef.current = particlesRef.current.filter(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed * 0.3;
      p.life -= p.decay;
      const width = dimensions.width || window.innerWidth;
      const height = dimensions.height || window.innerHeight;
      return p.life > 0 && p.x > -20 && p.x < width + 20 && p.y > -20 && p.y < height + 20;
    });
  };

  const drawParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life * 0.6;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });
  };

  const animate = () => {
    if (!enabled) return;
    updateParticles();
    drawParticles();
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setDimensions({ width: canvas.width, height: canvas.height });
        initParticles();
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setDimensions({ width: canvas.width, height: canvas.height });
    }

    initParticles();
    animate();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, particleCount, colors]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[var(--z-particles,10)] ${className}`}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  );
}