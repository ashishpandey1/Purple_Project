import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function Layout() {
  const { user, signOut } = useAuth()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/dashboard', label: 'Dashboard', auth: true },
    { path: '/profile', label: 'Profile', auth: true },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-abyss/75 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link to="/" aria-label="Project Purple home" className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 shrink-0" fill="none">
              <defs>
                <linearGradient id="brand-mark-grad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--neon)"></stop>
                  <stop offset="0.55" stopColor="var(--violet)"></stop>
                  <stop offset="1" stopColor="var(--neon-red)"></stop>
                </linearGradient>
              </defs>
              <path d="M16 3.6 27.4 10v12L16 28.4 4.6 22V10z" stroke="url(#brand-mark-grad)" strokeWidth="1.8"></path>
              <path d="M16 9.4 21.6 22.6h-3.1l-1.1-2.8h-2.8l-1.1 2.8H10.4z" fill="url(#brand-mark-grad)"></path>
              <path d="M14.9 17h2.2l-1.1-2.8z" fill="var(--abyss)"></path>
            </svg>
            <span className="font-display text-[0.95rem] font-black tracking-[0.26em] text-foreground">Project<span className="neon-text"> Purple</span></span>
          </Link>
          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`label-caps text-[0.65rem] transition-colors ${
                  location.pathname === link.path
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {user.email}
                </span>
                <button onClick={signOut} className="btn-ghost-arena text-sm px-4 py-2">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn-ghost-arena text-sm px-4 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="btn-arena text-sm px-5 py-2.5">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-abyss">
        <div className="container py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-8">
            <span className="flex items-center gap-2.5 opacity-90">
              <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 shrink-0" fill="none">
                <defs>
                  <linearGradient id="brand-mark-grad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--neon)"></stop>
                    <stop offset="0.55" stopColor="var(--violet)"></stop>
                    <stop offset="1" stopColor="var(--neon-red)"></stop>
                  </linearGradient>
                </defs>
                <path d="M16 3.6 27.4 10v12L16 28.4 4.6 22V10z" stroke="url(#brand-mark-grad)" strokeWidth="1.8"></path>
                <path d="M16 9.4 21.6 22.6h-3.1l-1.1-2.8h-2.8l-1.1 2.8H10.4z" fill="url(#brand-mark-grad)"></path>
                <path d="M14.9 17h2.2l-1.1-2.8z" fill="var(--abyss)"></path>
              </svg>
              <span className="font-display text-[0.95rem] font-black tracking-[0.26em] text-foreground">Project<span className="neon-text"> Purple</span></span>
            </span>
            <div className="flex gap-3">
              <a href="#" className="btn-ghost-arena flex h-10 w-10 items-center justify-center rounded-xl" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter h-4 w-4" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-8.5 8.8-8 3.8 3.9 8 2.9 11-1 0 1 0 2 0 2H2s1.1-2.5 2.9-3.8C14.2 1.6 16.9.3 19 0l.1.1z"></path></svg>
              </a>
              <a href="#" className="btn-ghost-arena flex h-10 w-10 items-center justify-center rounded-xl" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-4 w-4" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 4-1 4-6 0-1.3-.2-2.5-.7-4 2.8.6 5 3.7 5 6-3 4-6.3 3.5-6.3 5.17A4.8 4.8 0 0 0 6 21v.25a5.15 5.15 0 0 0 9 0v-.25A4.8 4.8 0 0 0 15 22z"></path></svg>
              </a>
              <a href="#" className="btn-ghost-arena flex h-10 w-10 items-center justify-center rounded-xl" aria-label="Discord">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-discord h-4 w-4" aria-hidden="true"><path d="M21 15.552A13.47 13.47 0 0 1 12 22a13.51 13.51 0 0 1-4.36-2.92A3.53 3.53 0 0 0 6 17.13a4.97 4.97 0 0 1-1.6-1.5c-.46-.4-.7-.98-.82-1.6C2.14 14.26 1.38 12.15 2 9.77c.64-2.4 2.29-4.46 4.67-5.27a3.03 3.03 0 0 1 1.9-.72c1.33 0 2.6.45 3.5 1.28.05-.88.17-1.74.35-2.57-.77-.24-1.6-.33-2.4-.19a12.91 12.91 0 0 1-1.28 2.47c-4.2 2.4-5.87 7.42-3.75 10.66.75 1.14 2.05 1.5 3.08.86a1.72 1.72 0 0 0 2.36 0A18 18 0 0 1 22 4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
              </a>
            </div>
          </div>
          <div className="mt-7 h-px w-full bg-[linear-gradient(90deg,transparent,var(--color-border),transparent)]"></div>
          <div className="mt-6 flex flex-col items-center gap-2.5 text-center">
            <p className="whitespace-nowrap font-display text-[0.58rem] font-semibold tracking-[0.22em] text-muted-foreground/80 sm:text-[0.66rem]">
              2026 Project Purple
            </p>
            <p className="whitespace-nowrap font-display text-[clamp(0.95rem,4.3vw,1.4rem)] font-bold tracking-[0.04em] text-foreground">
              Built with React + Supabase
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}