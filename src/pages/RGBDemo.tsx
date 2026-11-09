import { 
  ParticleSystem, 
  GlitchText, 
  GlitchTextSimple,
  CountdownTimer, 
  RGBButton, 
  PrimaryCTA, 
  SecondaryCTA, 
  DangerCTA, 
  SuccessCTA, 
  WarningCTA,
  ArenaCardRGB, 
  ArenaCardHeader, 
  ArenaCardContent, 
  ArenaCardFooter, 
  FullArenaCard,
  CRTMonitor,
  RGBBorder,
  ParticleField,
  FloatingShape,
  ScanlinesOverlay,
  VignetteOverlay,
} from '@/components/rgb';

export function RGBDemo() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  targetDate.setHours(18, 0, 0, 0);

  return (
    <div className="min-h-screen bg-abyss">
      {/* Background Effects */}
      <ParticleSystem particleCount={60} />
      <ScanlinesOverlay intensity={0.1} speed={6} />
      <VignetteOverlay strength={0.5} />

      <div className="container py-12 relative z-10">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <GlitchText 
            text="APEX PROTOCOL" 
            className="text-5xl md:text-7xl font-black mb-6"
            colors={['#00ffff', '#ff00ff', '#ffff00']}
            intensity="normal"
          />
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Next-generation esports tournament platform with RGB cyberpunk aesthetics. 
            Real-time brackets, live stats, and immersive viewing experience.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.553.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Live
            </PrimaryCTA>
            <SecondaryCTA>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Register Team
            </SecondaryCTA>
            <SuccessCTA>Join Discord</SuccessCTA>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <p className="label-caps text-rgb-cyan mb-2">TOURNAMENT STARTS IN</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">APEX PROTOCOL CHAMPIONSHIP</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <CountdownTimer 
              targetDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              className="text-4xl md:text-6xl"
              showLabels={true}
            />
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 rounded-full bg-rgb-cyan/10 border border-rgb-cyan/30 text-rgb-cyan font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-rgb-green mr-2 animate-ping inline-block"></span>
              LIVE STREAMING
            </span>
            <span className="px-4 py-2 rounded-full bg-rgb-magenta/10 border border-rgb-magenta/30 text-rgb-magenta font-mono text-sm">
              16 TEAMS QUALIFIED
            </span>
            <span className="px-4 py-2 rounded-full bg-rgb-yellow/10 border border-rgb-yellow/30 text-rgb-yellow font-mono text-sm">
              $1,000,000 PRIZE POOL
            </span>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <p className="label-caps text-rgb-magenta mb-2">FEATURES</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">BUILT FOR THE META</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏆', title: 'LIVE BRACKETS', desc: 'Real-time double elimination with frame-perfect sync', accent: 'cyan' as const },
              { icon: '👥', title: 'TEAM MANAGEMENT', desc: 'Rosters, stats, scheduling with integrated comms', accent: 'magenta' as const },
              { icon: '📊', title: 'ADVANCED STATS', desc: 'ACS, K/D, HS%, clutch metrics in real-time', accent: 'yellow' as const },
              { icon: '🏅', title: 'RANKED LADDERS', desc: 'ELO matchmaking, seasonal rewards, leaderboards', accent: 'green' as const },
            ].map((feature, i) => (
              <ArenaCardRGB key={i} accent={feature.accent} variant="animated" className="h-full">
                <ArenaCardHeader 
                  title={feature.title} 
                  subtitle={feature.desc}
                  accent={feature.accent}
                >
                  <span style={{ fontSize: '2rem' }}>{feature.icon}</span>
                </ArenaCardHeader>
                <ArenaCardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Experience tournament management like never before. 
                    Built with cutting-edge technology for competitive integrity.
                  </p>
                </ArenaCardContent>
                <ArenaCardFooter>
                  <RGBButton variant="ghost-cyan" size="sm" fullWidth>
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </RGBButton>
                </ArenaCardFooter>
              </ArenaCardRGB>
            ))}
          </div>
        </section>

        {/* Full Arena Card with Stats */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <p className="label-caps text-rgb-yellow mb-2">TOURNAMENT STATS</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">LIVE LEADERBOARD</h2>
          </div>

          <FullArenaCard
            header={{
              title: 'APEX PROTOCOL CHAMPIONSHIP',
              subtitle: 'Grand Finals - Best of 5 Series',
              accent: 'cyan',
            }}
            stats={[
              { label: 'VIEWERS', value: '2.4M', accent: 'cyan', trend: 'up' },
              { label: 'PEAK', value: '3.1M', accent: 'magenta', trend: 'up' },
              { label: 'HOURS', value: '14.5', accent: 'yellow', trend: 'neutral' },
              { label: 'REGIONS', value: '12', accent: 'green', trend: 'up' },
            ]}
            content={
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-abyss-card rounded-xl border border-glass-border">
                    <p className="label-caps text-rgb-cyan mb-1">TEAM LIQUID</p>
                    <p className="font-display text-2xl font-black text-white">MATCH WINNER</p>
                    <p className="text-sm text-muted-foreground">3 - 1 vs FaZe Clan</p>
                  </div>
                  <div className="p-4 bg-abyss-card rounded-xl border border-glass-border">
                    <p className="label-caps text-rgb-magenta mb-1">MVP</p>
                    <p className="font-display text-2xl font-black text-white">TENZ</p>
                    <p className="text-sm text-muted-foreground">1.42 K/D • 247 ACS</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-rgb-cyan/10 border border-rgb-cyan/30 text-rgb-cyan text-xs font-mono">MAP 1: ASCENT</span>
                  <span className="px-3 py-1 rounded-full bg-rgb-green/10 border border-rgb-green/30 text-rgb-green text-xs font-mono">MAP 2: BIND</span>
                  <span className="px-3 py-1 rounded-full bg-rgb-yellow/10 border border-rgb-yellow/30 text-rgb-yellow text-xs font-mono">MAP 3: HAVEN</span>
                  <span className="px-3 py-1 rounded-full bg-rgb-magenta/10 border border-rgb-magenta/30 text-rgb-magenta text-xs font-mono">MAP 4: SPLIT</span>
                </div>
              </div>
            }
            footer={
              <div className="flex gap-3">
                <PrimaryCTA fullWidth>Watch Replay</PrimaryCTA>
                <SecondaryCTA fullWidth>View Stats</SecondaryCTA>
              </div>
            }
          />
        </section>

        {/* Interactive Elements Showcase */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <p className="label-caps text-rgb-green mb-2">INTERACTIVE ELEMENTS</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">COMPONENT SHOWCASE</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* CRT Monitor Demo */}
            <ArenaCardRGB accent="cyan">
              <ArenaCardHeader title="CRT MONITOR EFFECT" subtitle="Scanlines + Vignette + Particles" accent="cyan" />
              <ArenaCardContent>
                <CRTMonitor 
                  scanlines={{ intensity: 0.15, speed: 4 }} 
                  vignette={{ strength: 0.5 }}
                >
                  <div className="aspect-video bg-abyss-card rounded-xl flex items-center justify-center relative overflow-hidden">
                    <ParticleField particleCount={30} />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <GlitchText text="CRT MODE" className="text-2xl font-black" colors={['#00ffff', '#ff00ff', '#ffff00']} />
                    </div>
                  </div>
                </CRTMonitor>
              </ArenaCardContent>
            </ArenaCardRGB>

            {/* RGB Border Demo */}
            <ArenaCardRGB accent="magenta">
              <ArenaCardHeader title="RGB ANIMATED BORDER" subtitle="Hue-rotating gradient outline" accent="magenta" />
              <ArenaCardContent>
                <RGBBorder speed={3} borderWidth={3} padding="2rem" className="h-48 flex items-center justify-center">
                  <div className="text-center">
                    <GlitchText text="RGB BORDER" className="text-2xl font-black" colors={['#ff00ff', '#ffff00', '#00ffff']} />
                    <p className="text-sm text-muted-foreground mt-2">Hue-rotating gradient</p>
                  </div>
                </RGBBorder>
              </ArenaCardContent>
            </ArenaCardRGB>

            {/* Floating Shapes */}
            <ArenaCardRGB accent="yellow">
              <ArenaCardHeader title="FLOATING SHAPES" subtitle="Animated geometric elements" accent="yellow" />
              <ArenaCardContent>
                <div className="aspect-square relative flex items-center justify-center">
                  <ParticleField particleCount={20} colors={['#ffff00', '#ff6600', '#ff00ff']} />
                  <FloatingShape shape="hexagon" size="80px" borderColor="#ffff00" animationDelay={0} animationDuration={8} />
                  <FloatingShape shape="triangle" size="50px" borderColor="#ff6600" animationDelay={1} animationDuration={6} style={{ position: 'absolute', top: '20%', right: '20%' }} />
                  <FloatingShape shape="circle" size="30px" color="#ffff0044" animationDelay={2} animationDuration={4} style={{ position: 'absolute', bottom: '20%', left: '20%' }} />
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <GlitchTextSimple text="SHAPES" className="text-xl font-black" colors={['#ffff00', '#ff6600', '#ff00ff']} />
                  </div>
                </div>
              </ArenaCardContent>
            </ArenaCardRGB>
          </div>
        </section>

        {/* Button Variants */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <p className="label-caps text-rgb-red mb-2">BUTTON VARIANTS</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">RGB BUTTON SYSTEM</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="label-caps text-rgb-cyan mb-4">Primary Actions</h3>
              <div className="flex flex-wrap items-center gap-3">
                <PrimaryCTA>Primary CTA</PrimaryCTA>
                <SecondaryCTA>Secondary</SecondaryCTA>
                <WarningCTA>Warning</WarningCTA>
                <DangerCTA>Danger</DangerCTA>
                <SuccessCTA>Success</SuccessCTA>
              </div>
            </div>

            <div>
              <h3 className="label-caps text-rgb-magenta mb-4">Ghost Variants</h3>
              <div className="flex flex-wrap items-center gap-3">
                <RGBButton variant="ghost-cyan">Ghost Cyan</RGBButton>
                <RGBButton variant="ghost-magenta">Ghost Magenta</RGBButton>
              </div>
            </div>

            <div>
              <h3 className="label-caps text-rgb-yellow mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <RGBButton variant="cyan" size="sm">Small</RGBButton>
                <RGBButton variant="magenta" size="md">Medium</RGBButton>
                <RGBButton variant="yellow" size="lg">Large</RGBButton>
              </div>
            </div>

            <div>
              <h3 className="label-caps text-rgb-green mb-4">States</h3>
              <div className="flex flex-wrap items-center gap-3">
                <RGBButton variant="cyan">Normal</RGBButton>
                <RGBButton variant="cyan" loading>Loading</RGBButton>
                <RGBButton variant="cyan" disabled>Disabled</RGBButton>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <RGBBorder speed={4} borderWidth={2} padding="3rem" className="max-w-3xl mx-auto">
            <GlitchText text="READY TO COMPETE?" className="text-3xl md:text-4xl font-black mb-6" colors={['#00ffff', '#ff00ff', '#ffff00']} />
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of competitors in the ultimate esports tournament platform. 
              Register your team today and claim your spot in the APEX PROTOCOL.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <PrimaryCTA size="lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Register Your Team
              </PrimaryCTA>
              <SecondaryCTA size="lg">View Tournament Rules</SecondaryCTA>
            </div>
          </RGBBorder>
        </section>
      </div>
    </div>
  );
}