import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

type FeatureItem = {
  icon: React.ReactNode
  title: string
  description: string
  accent: 'neon' | 'violet' | 'cyan' | 'gold'
}

export function Home() {
  const { user } = useAuth()

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M12 9v4" />
          <path d="M9 12h6" />
        </svg>
      ),
      title: 'Secure Authentication',
      description: 'Email/password, magic links, and OAuth (Google, GitHub) with Supabase Auth. Row-level security built-in.',
      accent: 'neon'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      title: 'QR Code Payments',
      description: 'Generate and scan QR codes for payments. Real-time status updates via Supabase Realtime.',
      accent: 'violet'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: 'Real-time Updates',
      description: 'Live transaction status, notifications, and presence powered by Supabase Realtime subscriptions.',
      accent: 'cyan'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <polyline points="4 17 10 11 16 17 22 11" />
          <line x1="10" x2="16" y1="11" y2="11" />
        </svg>
      ),
      title: 'Edge Deployment',
      description: 'Deployed on GitHub Pages with Supabase backend. CI/CD via GitHub Actions. Zero server management.',
      accent: 'gold'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title: 'TypeScript First',
      description: 'Full type safety from database to UI. Auto-generated types from Supabase schema.',
      accent: 'neon'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
      ),
      title: 'Open Source Ready',
      description: 'Clean architecture, documented decisions (ADRs), and contribution guidelines included.',
      accent: 'violet'
    }
  ] as const

  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section className="flex-col-center" style={{ maxWidth: '800px', margin: '0 auto 5rem', textAlign: 'center' }}>
        <div className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
          <span className="label-caps text-neon animate-shimmer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', background: 'var(--glass-bg-subtle)', border: '1px solid var(--glass-border)' }}>
            <span className="animate-breathe" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon)', boxShadow: 'var(--glow-neon)' }} />
            Project Purple v2.0
          </span>
        </div>
        <h1 className="font-display animate-slide-up delay-1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          <span className="text-gradient">PROJECT</span>{' '}
          <span className="neon-text">PURPLE</span>
        </h1>
        <p className="animate-slide-up delay-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--foreground-muted)', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          A modern payment application built with React, TypeScript, and Supabase.
          Secure authentication, real-time QR code payments, and seamless deployment.
        </p>
        <div className="animate-slide-up delay-3 flex-center flex-gap-3 flex-wrap" style={{ marginTop: '1rem' }}>
          {user ? (
            <Link to="/dashboard" className="btn-arena" style={{ padding: '1rem 2rem', fontSize: '0.875rem' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-arena" style={{ padding: '1rem 2rem', fontSize: '0.875rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
                Get Started Free
              </Link>
              <Link to="/login" className="btn-ghost-arena" style={{ padding: '1rem 2rem', fontSize: '0.875rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                </svg>
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Stats Bar */}
        <div className="animate-fade-in delay-4 flex-center flex-gap-6 flex-wrap" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', width: '100%' }}>
          <StatItem value="99.9%" label="Uptime" />
          <StatItem value="<50ms" label="Latency" />
          <StatItem value="10k+" label="Users" />
          <StatItem value="Open Source" label="License" />
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="grid-auto-fit" style={{ marginTop: '2rem' }}>
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="animate-slide-up" style={{ marginTop: '5rem' }}>
        <div className="glass-neon text-center p-8 sm:p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,var(--neon),var(--violet),var(--cyan),var(--neon))] opacity-[3%] animate-spin-slow" style={{ animationDuration: '20s' }} />
          <div className="relative">
            <h2 className="font-display text-gradient text-2xl sm:text-3xl font-bold mb-4">
              Ready to build something amazing?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of developers using Project Purple for their payment applications.
            </p>
            <div className="flex-center flex-gap-3 flex-wrap">
              <Link to="/register" className="btn-arena">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
                Start Free
              </Link>
              <Link to="/events" className="btn-ghost-arena">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-col-center" style={{ padding: '0 1.5rem' }}>
      <div className="font-display text-gradient-neon text-2xl sm:text-3xl font-bold tabular-nums">{value}</div>
      <div className="label-caps text-muted-foreground mt-1">{label}</div>
    </div>
  )
}

function FeatureCard({ feature, index }: { feature: FeatureItem; index: number }) {
  const accentClasses = {
    neon: 'glass-neon',
    violet: 'glass-violet',
    cyan: 'glass-cyan',
    gold: 'glass-gold'
  }

  const accentGlow = {
    neon: 'hover-glow',
    violet: 'hover-glow-violet',
    cyan: 'hover-glow',
    gold: 'hover-glow'
  }

  return (
    <article
      className={`arena-card hover-lift ${accentClasses[feature.accent]} ${accentGlow[feature.accent]} animate-slide-up`}
      style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}
    >
      <div className="p-5 h-full flex flex-col">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl mb-4"
          style={{
            background: `linear-gradient(135deg, var(--${feature.accent}) 0%, var(--${feature.accent}-dim) 100%)`,
            boxShadow: `0 0 24px var(--${feature.accent})40`
          }}
        >
          {feature.icon}
        </div>
        <h3 className="font-display text-lg font-bold text-foreground mb-2 flex-1">{feature.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3" style={{ lineHeight: 1.6 }}>{feature.description}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity" style={{ background: `linear-gradient(90deg, var(--${feature.accent}), var(--violet))` }} />
    </article>
  )
}