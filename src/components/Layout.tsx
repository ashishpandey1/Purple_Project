import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function Layout() {
  const { user, signOut } = useAuth()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/events', label: 'EVENTS' },
    { path: '/rgb-demo', label: 'DEMO' },
    { path: '/dashboard', label: 'DASHBOARD', auth: true },
    { path: '/profile', label: 'PROFILE', auth: true },
  ]

  return (
    <div className="min-h-screen bg-p5-black flex flex-col font-oswald">
      {/* ===========================================
           NAVBAR - Persona 5 Style
           =========================================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-6 py-4 pointer-events-auto">
          <div className="flex items-center justify-between">
            {/* Logo: Double-layered jagged blocks */}
            <Link to="/" className="relative flex items-center gap-2 group" aria-label="BnB Home">
              {/* Bottom layer - Red */}
              <div className="clip-jagged bg-p5-red px-5 py-2.5 box-shadow-hard logo-p5-block">
                <span className="font-anton text-2xl text-white">B</span>
              </div>
              {/* Top layer - Black offset */}
              <div className="clip-jagged bg-p5-black px-5 py-2.5 -ml-2 -mt-1 box-shadow-hard logo-p5-block">
                <span className="font-anton text-2xl text-p5-red">n</span>
              </div>
              {/* Third element - Gray */}
              <div className="clip-jagged bg-gray-400 px-5 py-2.5 -ml-2 -mt-1 logo-p5-block">
                <span className="font-anton text-2xl text-p5-black">b</span>
              </div>
            </Link>

            {/* Nav Links: Skewed containers */}
            <div className="hidden md:flex items-center gap-6 pointer-events-auto">
              {navLinks.map((link) => {
                if (link.auth && !user) return null
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link-p5 ${isActive ? 'bg-p5-red' : 'bg-transparent'} transition-all duration-200 hover:bg-p5-red hover:text-white group relative -skew-x-12 px-4 py-2 font-oswald font-medium uppercase tracking-wider`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="skew-x-12 inline-block">{link.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* CTA Button & Auth */}
            <div className="flex items-center gap-4 pointer-events-auto">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hud-panel flex items-center gap-3 px-4 py-2" style={{ minWidth: '200px' }}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-p5-red/20 text-p5-red font-anton font-bold text-xs">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm text-white truncate max-w-[150px] hidden sm:block">{user.email}</span>
                  </div>
                  <button onClick={signOut} className="btn-ghost-arena text-sm px-4 py-2 hover-lift">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1.5">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    SIGN OUT
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="btn-ghost-arena text-sm px-4 py-2 hover-lift">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1.5">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" x2="3" y1="12" y2="12" />
                    </svg>
                    SIGN IN
                  </Link>
                  <Link to="/register" className="btn-p5-primary text-sm px-5 py-2.5 hover-lift">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1.5">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" x2="19" y1="8" y2="14" />
                      <line x1="22" x2="16" y1="11" y2="11" />
                    </svg>
                    GET STARTED
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* ===========================================
           FOOTER - Persona 5 Style
           =========================================== */}
      <footer className="relative bg-p5-black pt-32 pb-16" role="contentinfo">
        {/* Top Border: -20px top offset bg-p5-red jagged overlay */}
        <div className="absolute top-[-20px] left-0 right-0 h-20 bg-p5-red clip-triangle-bottom" aria-hidden="true"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Brand */}
            <div className="animate-enter-left">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-6">
                <div className="clip-jagged bg-p5-red px-5 py-2.5 box-shadow-hard logo-p5-block">
                  <span className="font-anton text-2xl text-white">B</span>
                </div>
                <div className="clip-jagged bg-p5-black px-5 py-2.5 -ml-2 -mt-1 box-shadow-hard logo-p5-block">
                  <span className="font-anton text-2xl text-p5-red">n</span>
                </div>
                <div className="clip-jagged bg-gray-400 px-5 py-2.5 -ml-2 -mt-1 logo-p5-block">
                  <span className="font-anton text-2xl text-p5-black">b</span>
                </div>
              </div>

              <p className="font-oswald text-gray-400 leading-relaxed mb-8 max-w-xs">
                The ultimate fighting tournament platform.
                Built for competitors, by competitors.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="#" className="group w-12 h-12 bg-p5-dark rounded-xl clip-jagged flex items-center justify-center transition-all duration-200 hover:bg-p5-red hover:rotate-3 btn-p5-icon" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white group-hover:text-p5-black transition-colors">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-8.5 8.8-8 3.8 3.9 8 2.9 11-1 0 1 0 2 0 2H2s1.1-2.5 2.9-3.8C14.2 1.6 16.9.3 19 0l.1.1z"></path>
                  </svg>
                </a>
                <a href="#" className="group w-12 h-12 bg-p5-dark rounded-xl clip-jagged flex items-center justify-center transition-all duration-200 hover:bg-p5-red hover:-rotate-3 btn-p5-icon" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white group-hover:text-p5-black transition-colors">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="group w-12 h-12 bg-p5-dark rounded-xl clip-jagged flex items-center justify-center transition-all duration-200 hover:bg-p5-red hover:rotate-3 btn-p5-icon" aria-label="Discord">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white group-hover:text-p5-black transition-colors">
                    <path d="M21 15.552A13.47 13.47 0 0 1 12 22a13.51 13.51 0 0 1-4.36-2.92A3.53 3.53 0 0 0 6 17.13a4.97 4.97 0 0 1-1.6-1.5c-.46-.4-.7-.98-.82-1.6C2.14 14.26 1.38 12.15 2 9.77c.64-2.4 2.29-4.46 4.67-5.27a3.03 3.03 0 0 1 1.9-.72c1.33 0 2.6.45 3.5 1.28.05-.88.17-1.74.35-2.57-.77-.24-1.6-.33-2.4-.19a12.91 12.91 0 0 1-1.28 2.47c-4.2 2.4-5.87 7.42-3.75 10.66.75 1.14 2.05 1.5 3.08.86a1.72 1.72 0 0 0 2.36 0A18 18 0 0 1 22 4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Newsletter - Ransom Note Style */}
            <div className="animate-enter-left" style={{ animationDelay: '200ms' }}>
              <div className="card-p5-jagged p-8">
                <h3 className="font-anton text-3xl text-white mb-6 text-center">JOIN THE CALLING CARD</h3>

                {/* Ransom-note style header with randomized rotation */}
                <div className="font-marker text-2xl md:text-3xl text-center mb-8 tracking-wider">
                  <span className="word-1 inline-block text-p5-red">Join</span>
                  <span className="word-2 inline-block text-white">The</span>
                  <span className="word-3 inline-block text-p5-red">Calling</span>
                  <span className="word-4 inline-block text-white">Card</span>
                </div>

                <p className="font-oswald text-gray-400 text-center mb-6">
                  Get tournament updates, meta shifts, and exclusive drops.
                </p>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thanks for joining the Calling Card!'); }}>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      required
                      className="input-p5"
                      aria-label="Email address for newsletter"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-p5-red/10 to-transparent opacity-0 pointer-events-none" aria-hidden="true"></div>
                  </div>
                  <button
                    type="submit"
                    className="btn-p5-primary w-full"
                  >
                    SUBSCRIBE
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </form>

                <p className="font-oswald text-xs text-gray-500 text-center mt-4">
                  No spam. Unsubscribe anytime. Your data stays in the Metaverse.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 font-oswald">
                <a href="#" className="hover:text-p5-red transition-colors">PRIVACY</a>
                <a href="#" className="hover:text-p5-red transition-colors">TERMS</a>
                <a href="#" className="hover:text-p5-red transition-colors">SUPPORT</a>
                <a href="#" className="hover:text-p5-red transition-colors">API DOCS</a>
              </div>

              <div className="font-marker text-sm text-gray-500">
                © 2024 BnB TOURNAMENT. MADE WITH <span className="text-p5-red">♥</span> BY PHANTOM THIEVES.
              </div>
            </div>
          </div>
        </div>

        {/* Decorative footer elements */}
        <div className="absolute bottom-0 left-10 w-16 h-16 border-2 border-p5-red/30 clip-starburst rotate-6" aria-hidden="true"></div>
        <div className="absolute bottom-0 right-10 w-12 h-12 bg-p5-red/20 clip-jagged -rotate-12" aria-hidden="true"></div>
      </footer>
    </div>
  )
}