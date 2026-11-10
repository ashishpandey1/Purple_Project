import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

type FeatureItem = {
  icon: React.ReactNode
  title: string
  description: string
  accentColor: 'red' | 'white'
}

export function Home() {
  const { user: _user } = useAuth()

  const features: FeatureItem[] = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      title: 'LIVE BRACKETS',
      description: 'Real-time double elimination brackets with frame-perfect sync. Watch matches unfold live with zero latency.',
      accentColor: 'red'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'TEAM MANAGEMENT',
      description: 'Build your crew. Manage rosters, track player stats, and coordinate schedules with integrated comms.',
      accentColor: 'white'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ),
      title: 'RANKED LADDERS',
      description: 'Climb the ranks. ELO-based matchmaking, seasonal rewards, and leaderboard immortality.',
      accentColor: 'red'
    }
  ] as const

  return (
    <div className="font-oswald">
      {/* ===========================================
           HERO SECTION
           =========================================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden" aria-labelledby="hero-heading">
        {/* 1. Halftone Right Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-halftone" aria-hidden="true"></div>

        {/* 2. Dark Bottom-Left Polygon */}
        <div className="absolute bottom-0 left-0 w-full h-3/4 bg-p5-black clip-triangle-bottom" aria-hidden="true"></div>

        {/* 3. White/Black Decorative Lines */}
        <div className="absolute top-1/4 left-10 w-2 h-32 bg-white rotate-6" aria-hidden="true"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-48 bg-p5-red -rotate-3" aria-hidden="true"></div>
        <div className="absolute bottom-20 left-20 w-64 h-0.5 bg-white/20" aria-hidden="true"></div>
        <div className="absolute bottom-20 left-20 w-0.5 h-64 bg-white/20" aria-hidden="true"></div>
        <div className="absolute bottom-20 right-20 w-64 h-0.5 bg-white/20" aria-hidden="true"></div>
        <div className="absolute bottom-20 right-20 w-0.5 h-64 bg-white/20" aria-hidden="true"></div>

        {/* Hero Graphic SVG */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
            <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="1" fill="none"/>
            <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="1" fill="none"/>
          </svg>
        </div>

        {/* 4. Text and Interactive Card */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="animate-enter-left" style={{ animationDelay: '100ms' }}>
              <p className="font-marker text-2xl md:text-3xl text-p5-red mb-4 tracking-wider">WAKE UP</p>
              <h1 id="hero-heading" className="font-anton text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-white text-shadow-hard mb-6">
                GET UP
                <br />
                <span className="text-p5-red">FIGHT OUT</span>
              </h1>
              <p className="font-oswald text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                The ultimate tournament platform for phantom thieves.
                Create brackets, track stats, and dominate the meta.
              </p>

              {/* Main CTA: Red button with black absolute shadow offset */}
              <div className="relative">
                {/* Black shadow offset */}
                <div className="absolute bottom-0 right-0 w-full h-full bg-p5-black clip-slant-right translate-x-3 translate-y-3 -z-10" aria-hidden="true"></div>
                {/* Red button */}
                <Link
                  to="#download"
                  className="clip-slant-right bg-p5-red text-white font-anton text-lg py-4 px-10 box-shadow-hard inline-block transition-all duration-200 hover:bg-white hover:text-p5-red hover:scale-[1.02] relative z-10"
                >
                  DOWNLOAD NOW
                </Link>
              </div>

              {/* Stats bar */}
              <div className="mt-12 flex flex-wrap gap-8 text-white">
                <div>
                  <div className="font-anton text-3xl md:text-4xl text-p5-red">50K+</div>
                  <div className="font-oswald text-sm uppercase tracking-wider text-gray-400 pt-2">TOURNAMENTS</div>
                </div>
                <div>
                  <div className="font-anton text-3xl md:text-4xl text-p5-red">120K</div>
                  <div className="font-oswald text-sm uppercase tracking-wider text-gray-400 pt-2">FIGHTERS</div>
                </div>
                <div>
                  <div className="font-anton text-3xl md:text-4xl text-p5-red">99.9%</div>
                  <div className="font-oswald text-sm uppercase tracking-wider text-gray-400 pt-2">UPTIME</div>
                </div>
              </div>
            </div>

            {/* Right: White card with rotate-3, containing grayscale game icon area */}
            <div className="relative animate-enter-left" style={{ animationDelay: '300ms' }}>
              <div className="bg-white rotate-3 p-1 box-shadow-hard">
                <div className="bg-p5-black p-8 relative overflow-hidden">
                  {/* Grayscale game icon area */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden grayscale-img">
                    <div className="absolute inset-0 bg-gradient-to-br from-p5-red/20 via-transparent to-p5-black" aria-hidden="true"></div>
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white text-9xl opacity-80" aria-hidden="true">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8" />
                        <path d="M12 17v4" />
                        <path d="M6 7h4" />
                        <path d="M14 7h4" />
                        <path d="M10 11h4" />
                      </svg>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="mt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="clip-starburst bg-p5-red w-14 h-14 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white h-7 w-7" aria-hidden="true">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-marker text-lg text-p5-red">PHANTOM THIEF EDITION</p>
                        <p className="font-anton text-2xl text-white">BnB TOURNAMENT</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-p5-dark p-4 rounded-lg clip-jagged">
                        <p className="font-anton text-3xl text-p5-red">BRACKETS</p>
                        <p className="font-oswald text-sm text-gray-400">Double Elimination</p>
                      </div>
                      <div className="bg-p5-dark p-4 rounded-lg clip-jagged">
                        <p className="font-anton text-3xl text-p5-red">MATCHES</p>
                        <p className="font-oswald text-sm text-gray-400">Real-time Sync</p>
                      </div>
                      <div className="bg-p5-dark p-4 rounded-lg clip-jagged">
                        <p className="font-anton text-3xl text-p5-red">STATS</p>
                        <p className="font-oswald text-sm text-gray-400">Frame Data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-p5-red clip-starburst rotate-6 animate-pulse-p5" aria-hidden="true"></div>
              <div className="absolute bottom-8 -left-8 w-16 h-16 bg-p5-red clip-jagged -rotate-12" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================
           FEATURES STRIP
           =========================================== */}
      <section id="features" className="relative py-24 -skew-y-2 bg-p5-black" aria-labelledby="features-heading">
        <div className="skew-y-2 container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 animate-enter-left">
            <div className="inline-block clip-slant-right bg-p5-red px-8 py-3 mb-6">
              <p className="font-anton text-2xl text-white">FEATURES</p>
            </div>
            <h2 id="features-heading" className="font-anton text-4xl md:text-5xl text-white text-shadow-hard max-w-2xl mx-auto">
              BUILT FOR THE <span className="text-p5-red">META</span>
            </h2>
          </div>

          {/* 3 Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className={`group card-p5-jagged p-8 transition-all duration-300 hover:-translate-y-2 hover:-rotate-1 hover:box-shadow-hard hover:shadow-p5-red relative overflow-hidden animate-enter-left`}
                style={{ animationDelay: `${100 + index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-p5-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>

                <div className="relative z-10 mb-6">
                  <div className={`clip-starburst ${feature.accentColor === 'red' ? 'bg-p5-red' : 'bg-white'} w-16 h-16 flex items-center justify-center box-shadow-hard`}>
                    {feature.icon}
                  </div>
                </div>

                <h3 className="font-anton text-2xl text-white mb-3 relative z-10">{feature.title}</h3>
                <p className="font-oswald text-gray-400 leading-relaxed relative z-10">
                  {feature.description}
                </p>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-p5-red group-hover:w-full transition-all duration-300" aria-hidden="true"></div>
              </article>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-32 h-32 border-4 border-p5-red/20 clip-starburst rotate-12" aria-hidden="true"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-p5-red clip-jagged -rotate-6" aria-hidden="true"></div>
      </section>

      {/* ===========================================
           APP PREVIEW
           =========================================== */}
      <section id="preview" className="relative py-24 bg-p5-black overflow-hidden" aria-labelledby="preview-heading">
        {/* Large background text "PHANTOM THIEF" */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 rotate-12 pointer-events-none" aria-hidden="true">
          <p className="font-anton text-9xl md:text-12xl text-white whitespace-nowrap tracking-wider">PHANTOM THIEF</p>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Left: Side Controls */}
            <div className="space-y-6 order-last lg:order-first animate-enter-left" style={{ animationDelay: '100ms' }}>
              {/* Control Panel 1 */}
              <div className="group relative card-p5-slant-left p-6 transition-all duration-300 hover:translate-x-2 hover:border-white border-l-4 border-p5-red">
                <div className="flex items-center gap-4">
                  <div className="clip-starburst bg-p5-red w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white h-6 w-6">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </div>
                  <div>
                    <p className="font-marker text-sm text-p5-red">CONTROL</p>
                    <p className="font-anton text-xl text-white">TOURNAMENT BRACKET</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="font-oswald text-sm text-gray-400">Double elimination with live seeding</p>
                </div>
              </div>

              {/* Control Panel 2 */}
              <div className="group relative card-p5-slant-right p-6 transition-all duration-300 hover:-translate-x-2 hover:border-white border-r-4 border-p5-red">
                <div className="flex items-center gap-4">
                  <div className="clip-starburst bg-white w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-p5-black h-6 w-6">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-marker text-sm text-p5-red">CONTROL</p>
                    <p className="font-anton text-xl text-white">MATCH CONFIG</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="font-oswald text-sm text-gray-400">Best of 3/5, stage selection, rulesets</p>
                </div>
              </div>

              {/* Control Panel 3 */}
              <div className="group relative card-p5-slant-left p-6 transition-all duration-300 hover:translate-x-2 hover:border-white border-l-4 border-p5-red">
                <div className="flex items-center gap-4">
                  <div className="clip-starburst bg-p5-red w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white h-6 w-6">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  <div>
                    <p className="font-marker text-sm text-p5-red">CONTROL</p>
                    <p className="font-anton text-xl text-white">ADD FIGHTER</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="font-oswald text-sm text-gray-400">Custom characters, cosmetics, stats</p>
                </div>
              </div>
            </div>

            {/* Center: Mobile Mockup */}
            <div className="relative flex justify-center animate-enter-left" style={{ animationDelay: '200ms' }}>
              <div className="relative w-64 h-[500px] rounded-3xl rotate-3 box-shadow-hard overflow-hidden">
                {/* Mockup Frame */}
                <div className="absolute inset-0 bg-p5-black rounded-3xl">
                  {/* Red Header with clip-slant-left */}
                  <div className="absolute top-0 left-0 right-0 h-24 bg-p5-red clip-slant-left flex items-center justify-between px-6">
                    <p className="font-anton text-xl text-white z-10">BnB TOURNAMENT</p>
                    <div className="clip-starburst bg-white w-10 h-10 flex items-center justify-center z-10">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-p5-red h-5 w-5" aria-hidden="true">
                        <path d="M22 2L2 22"></path>
                        <path d="M22 2L2 22"></path>
                        <path d="M12 2L2 12"></path>
                        <path d="M22 12L12 22"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Mockup Content */}
                  <div className="absolute top-28 bottom-24 left-4 right-4 overflow-y-auto pr-2">
                    {/* Skewed list items */}
                    <div className="space-y-4">
                      {[
                        { name: 'JOKER', role: 'PHANTOM THIEF', result: 'WIN', score: '3 - 1', color: 'p5-red', iconColor: 'white' },
                        { name: 'SKULL', role: 'PT MEMBER', result: 'LOSE', score: '1 - 3', color: 'gray-400', iconColor: 'white' },
                        { name: 'FOX', role: 'PT MEMBER', result: 'WIN', score: '3 - 0', color: 'p5-red', iconColor: 'white' },
                        { name: 'NOIR', role: 'PT MEMBER', result: 'LOSE', score: '0 - 3', color: 'gray-400', iconColor: 'white' }
                      ].map((item, i) => (
                        <div key={i} className="group mockup-list-item bg-p5-dark p-4 rounded-lg transition-all duration-200 hover:-translate-x-1 hover:bg-p5-red/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full bg-${item.color === 'p5-red' ? 'p5-red' : 'white/10'} flex items-center justify-center`}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-${item.iconColor} h-5 w-5`} aria-hidden="true">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                </svg>
                              </div>
                              <div>
                                <p className="font-anton text-white">{item.name}</p>
                                <p className="font-oswald text-xs text-gray-400">{item.role}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-anton text-xl text-${item.color}`}>{item.result}</p>
                              <p className="font-oswald text-xs text-gray-400">{item.score}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-p5-dark/80 backdrop-blur-sm border-t border-white/10 flex items-center justify-around">
                    <button className="flex flex-col items-center gap-1 text-white/60 hover:text-p5-red transition-colors" aria-label="Bracket">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                      <span className="font-oswald text-xs">BRACKET</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-p5-red" aria-label="Matches">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                      <span className="font-oswald text-xs">MATCHES</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-white/60 hover:text-p5-red transition-colors" aria-label="Profile">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                      <span className="font-oswald text-xs">PROFILE</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements around mockup */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-p5-red clip-jagged rotate-6" aria-hidden="true"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-p5-red clip-starburst -rotate-12" aria-hidden="true"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-white rounded-full animate-breathe" aria-hidden="true"></div>
            </div>

            {/* Right: Additional Info */}
            <div className="space-y-8 animate-enter-left" style={{ animationDelay: '400ms' }}>
              <div className="text-center lg:text-left">
                <div className="inline-block clip-slant-right bg-p5-red px-6 py-2 mb-4">
                  <p className="font-anton text-lg text-white">APP PREVIEW</p>
                </div>
                <h2 id="preview-heading" className="font-anton text-4xl md:text-5xl text-white text-shadow-hard mb-4">
                  TOURNAMENT IN<br />YOUR POCKET
                </h2>
                <p className="font-oswald text-lg text-gray-400 leading-relaxed mb-8 max-w-xs mx-auto lg:mx-0">
                  Native performance. Real-time updates.
                  The full BnB experience optimized for mobile.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="space-y-4">
                <div className="group flex items-start gap-4 p-4 card-p5-jagged transition-all duration-300 hover:translate-x-2 hover:bg-p5-red/10">
                  <div className="clip-starburst bg-p5-red w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white h-6 w-6">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="font-anton text-lg text-white group-hover:text-p5-red transition-colors">INSTANT NOTIFICATIONS</p>
                    <p className="font-oswald text-sm text-gray-400">Match callouts, bracket updates, results</p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 card-p5-jagged transition-all duration-300 hover:translate-x-2 hover:bg-p5-red/10">
                  <div className="clip-starburst bg-white w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-p5-black h-6 w-6">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8" />
                      <path d="M12 17v4" />
                      <path d="M6 7h4" />
                      <path d="M14 7h4" />
                      <path d="M10 11h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-anton text-lg text-white group-hover:text-p5-red transition-colors">OFFLINE MODE</p>
                    <p className="font-oswald text-sm text-gray-400">Manage local tournaments without connection</p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 card-p5-jagged transition-all duration-300 hover:translate-x-2 hover:bg-p5-red/10">
                  <div className="clip-starburst bg-p5-red w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white h-6 w-6">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-anton text-lg text-white group-hover:text-p5-red transition-colors">STREAM INTEGRATION</p>
                    <p className="font-oswald text-sm text-gray-400">OBS overlay, Twitch alerts, auto-clips</p>
                  </div>
                </div>
              </div>

              {/* Download CTA */}
              <Link
                to="#download"
                className="clip-slant-right bg-p5-red text-white font-anton text-lg py-4 px-8 box-shadow-hard inline-block transition-all duration-200 hover:bg-white hover:text-p5-red hover:scale-[1.02] w-full text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                  GET THE APP
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================
           CTA / DOWNLOAD SECTION
           =========================================== */}
      <section id="download" className="relative py-24 bg-p5-black overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-2xl mx-auto animate-enter-left">
            <div className="inline-block clip-slant-right bg-p5-red px-8 py-3 mb-6">
              <p className="font-anton text-2xl text-white">DOWNLOAD</p>
            </div>
            <h2 className="font-anton text-4xl md:text-5xl text-white text-shadow-hard mb-6">
              READY TO <span className="text-p5-red">FIGHT</span>?
            </h2>
            <p className="font-oswald text-lg text-gray-400 leading-relaxed mb-10">
              Join thousands of competitors in the ultimate tournament experience.
              Free to start. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-p5-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
                START FREE TOURNAMENT
              </Link>
              <Link to="/events" className="btn-p5-ghost">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
                BROWSE EVENTS
              </Link>
            </div>
          </div>

          {/* Platform badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-4 animate-enter-left" style={{ animationDelay: '200ms' }}>
            <div className="font-marker text-sm text-gray-500">AVAILABLE ON</div>
            <div className="flex gap-3">
              <a href="#" className="group card-p5-jagged px-6 py-3 transition-all hover:bg-p5-red/10 hover:rotate-3" aria-label="iOS App Store">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white group-hover:text-p5-black transition-colors" aria-hidden="true">
                  <path d="M18.71 14.38c-.27-.45-.54-.93-.78-1.47-.32-.74-.73-1.46-1.09-2.1-.18-.34-.27-.71-.27-1.13 0-.43.09-.8.27-1.13.46-.8 1.01-1.45 1.64-2.02.56-.52 1.17-.78 1.84-.78.8 0 1.52.36 2.14 1.06.6.71.91 1.7.91 2.96 0 .97-.23 1.83-.69 2.58a3.15 3.15 0 0 1-1.87.97c-.59.17-1.13.31-1.61.42-.49.12-1.23.36-2.23 1.13-.65.49-.97 1.14-.97 1.96 0 .45.09.87.27 1.26.18.39.48.68.89.89 1.09.57 2.42.9 4 1.11.64.08 1.2.08 1.69 0 1.79-.18 3.35-.35 4.64-1.02.96-.5 1.53-1.33 1.7-2.49.18-1.3-.86-2.63-2.4-3.55-.8-.5-1.68-.76-2.63-.76-1.43 0-2.61.54-3.54 1.62zM12 16.68c-2.85 0-5.15-1.24-6.54-3.36-.41-.63-.62-1.37-.62-2.22 0-1.53.82-2.8 2.27-3.63.54-.3 1.2-.45 2.06-.45.67 0 1.3.09 1.92.26.62.18 1.19.45 1.67.8.56.42 1.02.96 1.38 1.62.33.6.5 1.28.5 2.06 0 .9-.2 1.73-.6 2.48-.39.74-.97 1.34-1.74 1.79-.87.5-1.96.76-3.22.76zm0 0" />
                </svg>
              </a>
              <a href="#" className="group card-p5-jagged px-6 py-3 transition-all hover:bg-p5-red/10 hover:-rotate-3" aria-label="Google Play Store">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white group-hover:text-p5-black transition-colors" aria-hidden="true">
                  <path d="M12.54 14.34v3.48h8.35c-1.12 1.93-3.36 3.16-6.2 3.16-5.33 0-9.64-4.31-9.64-9.64s4.31-9.64 9.64-9.64c2.97 0 5.51 1.32 7.11 3.32l-2.73 2.71c-1.2-1.64-3.02-2.61-5.11-2.61-3.79 0-6.88 3.09-6.88 6.88s3.09 6.88 6.88 6.88c2.17 0 4.02-.98 5.32-2.54l2.72 2.72C19.14 22.18 15.82 24 12 24c-6.63 0-12-5.37-12-12S5.37 0 12 0s12 5.37 12 12c0 1.96-.43 3.81-1.22 5.47l2.37 2.37c.94-1.9 1.47-4 1.47-6.13h-8.35z" />
                </svg>
              </a>
              <a href="#" className="group card-p5-jagged px-6 py-3 transition-all hover:bg-p5-red/10 hover:rotate-3" aria-label="Steam">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white group-hover:text-p5-black transition-colors" aria-hidden="true">
                  <path d="M4.011 10.577c0 3.269 1.708 6.224 4.422 7.754 2.714 1.53 5.784 1.53 8.488 0 2.624-1.524 4.332-4.46 4.332-7.72 0-3.256-1.628-6.248-4.311-7.728-2.714-1.53-5.825-1.53-8.51 0zm7.595 7.33c-1.758.99-3.712.99-5.46 0-2.088-1.17-3.372-3.267-3.372-5.66 0-2.392 1.41-4.584 3.72-5.706 2.178-1.05 4.56-1.05 6.882 0 2.046 1.122 3.33 3.186 3.33 5.418 0 2.274-1.41 4.362-3.69 5.628-.708.402-1.5.6-2.334.6-.852 0-1.62-.198-2.298-.57zm-3.234-4.26c0-1.008.576-1.884 1.71-2.31 1.17-.426 2.616-.426 3.78 0 1.134.426 1.71 1.296 1.71 2.256 0 .966-.576 1.788-1.71 2.214-1.164.426-2.616.426-3.78 0-1.134-.426-1.71-1.296-1.71-2.16zm8.172 4.26c-.852 0-1.62.198-2.298.57-2.28 1.266-3.69 3.354-3.69 5.628 0 2.232 1.284 4.296 3.33 5.418 2.322 1.05 4.704 1.05 6.882 0 2.31-1.122 3.72-3.312 3.72-5.706 0-2.392-1.284-4.488-3.372-5.66-1.746-.99-3.7-.99-5.46 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-32 h-32 border-4 border-p5-red/20 clip-starburst rotate-12" aria-hidden="true"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-p5-red clip-jagged -rotate-6" aria-hidden="true"></div>
      </section>
    </div>
  )
}