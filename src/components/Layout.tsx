import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function Layout() {
  const { user, signOut } = useAuth()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard', auth: true },
    { path: '/profile', label: 'Profile', auth: true },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            PROJECT PURPLE
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text)',
                  fontWeight: location.pathname === link.path ? 600 : 400,
                  fontSize: '0.875rem',
                }}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  {user.email}
                </span>
                <button onClick={signOut} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link to="/login" className="btn btn-secondary">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: '2rem 0', marginTop: 'auto' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          © 2026 PROJECT PURPLE • Built with React + Supabase
        </div>
      </footer>
    </div>
  )
}