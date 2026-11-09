import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Event = Database['public']['Tables']['events']['Row']

export function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing'>('all')

  useEffect(() => {
    fetchEvents()
  }, [filter])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query
      if (!error && data) {
        setEvents(data as Event[])
      }
    } catch (err) {
      console.error('Fetch events error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      upcoming: 'badge-neon',
      ongoing: 'badge-violet',
      completed: 'badge-cyan',
      cancelled: 'badge-red'
    }
    return styles[status] || 'badge-muted'
  }

  const getStatusGlow = (status: string) => {
    const glows: Record<string, string> = {
      upcoming: 'glow-neon',
      ongoing: 'glow-violet',
      completed: 'glow-cyan',
      cancelled: 'glow-red'
    }
    return glows[status] || ''
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div className="flex-center min-h-[60vh]">
          <div className="hud-panel flex-col-center flex-gap-3 animate-scale-bounce">
            <div className="flex-center flex-gap-3">
              <svg className="h-8 w-8 text-neon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className="font-display text-lg font-bold text-foreground">Loading events…</span>
            </div>
            <div className="stat-bar w-64 mt-4">
              <div className="stat-bar-fill animate-shimmer" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="mb-8 animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-gradient">Events</h1>
            <p className="text-muted-foreground mt-1">Discover and book upcoming events</p>
          </div>
          <div className="flex flex-wrap gap-2 animate-slide-up delay-1">
            {(['all', 'upcoming', 'ongoing'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`label-caps text-xs px-4 py-2 rounded-xl transition-all hover-lift hover-glow ${
                  filter === f
                    ? 'btn-arena'
                    : 'btn-ghost-arena'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="arena-card glass-neon p-12 text-center animate-fade-in">
          <div className="mx-auto h-16 w-16 rounded-2xl flex-center mb-4" style={{ background: 'linear-gradient(135deg, var(--neon) 0%, var(--violet) 100%)', boxShadow: 'var(--glow-neon)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-abyss">
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M16 2v4" />
              <path d="M8 2v4" />
              <path d="M3 10h18" />
            </svg>
          </div>
          <p className="font-display text-xl text-foreground mb-4">No events found</p>
          <p className="text-sm text-muted-foreground mb-6">Check back later for upcoming events!</p>
          <Link to="/events" className="btn-ghost-arena">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Refresh
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <Link key={event.id} to={`/events/${event.id}`} className="group">
              <article className={`arena-card-animated flex h-full flex-col rounded-2xl p-5 hover-lift hover-glow ${getStatusGlow(event.status)} animate-slide-up`} style={{ animationDelay: `${Math.min(index * 80, 400)}ms` }}>
                {event.image_url && (
                  <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className={`label-caps text-[0.55rem] px-2.5 py-1 rounded-full badge-animated ${getStatusBadge(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-neon transition-colors">{event.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2" style={{ lineHeight: 1.6 }}>{event.description}</p>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <svg className="h-4 w-4 text-neon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M16 2v4" />
                      <path d="M8 2v4" />
                      <path d="M3 10h18" />
                    </svg>
                    <span>{formatDate(event.event_date)}</span>
                  </div>
                  {event.venue && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{event.venue}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-glass-border">
                    <span className="font-display text-xl font-black text-neon tabular-nums">₹{event.price.toLocaleString()}</span>
                    <span className="btn-arena text-xs px-4 py-2 hover-scale-sm">
                      Book Now
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 ml-1.5">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}