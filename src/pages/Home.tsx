import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function Home() {
  const { user } = useAuth()

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <section style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          PROJECT PURPLE
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          A modern payment application built with React, TypeScript, and Supabase.
          Secure authentication, real-time QR code payments, and seamless deployment.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {user ? (
            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <FeatureCard
          title="Secure Authentication"
          description="Email/password, magic links, and OAuth (Google, GitHub) with Supabase Auth. Row-level security built-in."
        />
        <FeatureCard
          title="QR Code Payments"
          description="Generate and scan QR codes for payments. Real-time status updates via Supabase Realtime."
        />
        <FeatureCard
          title="Real-time Updates"
          description="Live transaction status, notifications, and presence powered by Supabase Realtime subscriptions."
        />
        <FeatureCard
          title="Edge Deployment"
          description="Deployed on GitHub Pages with Supabase backend. CI/CD via GitHub Actions. Zero server management."
        />
        <FeatureCard
          title="TypeScript First"
          description="Full type safety from database to UI. Auto-generated types from Supabase schema."
        />
        <FeatureCard
          title="Open Source Ready"
          description="Clean architecture, documented decisions (ADRs), and contribution guidelines included."
        />
      </section>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="card" style={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s' }}>
      <div className="card-body">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{description}</p>
      </div>
    </div>
  )
}