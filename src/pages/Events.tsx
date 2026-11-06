import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Event = Database['public']['Tables']['events']['Row']

export function Events() {
  const { user } = useAuth()
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
      upcoming: 'bg-neon/20 text-neon border-neon/30',
      ongoing: 'bg-violet/20 text-violet border-violet/30',
      completed: 'bg-neon-soft/20 text-neon-soft border-neon-soft/30',
      cancelled: 'bg-neon-red/20 text-neon-red border-neon-red/30'
    }
    return styles[status] || 'bg-muted-foreground/20 text-muted-foreground'
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-breathe flex items-center gap-3">
            <svg className="h-8 w-8 text-neon animate-breathe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <span className="font-display text-lg font-bold text-foreground">Loading events…</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-black tracking-tight text-foreground">Events</h1>
        <p className="text-muted-foreground mt-1">Discover and book upcoming events</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'upcoming', 'ongoing'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`label-caps text-xs px-4 py-2 rounded-xl transition-all ${
              filter === f
                ? 'bg-neon text-abyss font-bold'
                : 'bg-surface border border-glass-border text-muted-foreground hover:border-neon/40 hover:text-foreground'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {events.length === 0 ? (
        <div className="arena-card p-12 text-center">
          <svg className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M16 2v4"></path>
            <path d="M8 2v4"></path>
            <path d="M3 10h18"></path>
          </svg>
          <p className="text-muted-foreground mb-4">No events found</p>
          <p className="text-xs text-muted-foreground/70 mb-6">Check back later for upcoming events!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="group">
              <article className="arena-card flex h-full flex-col rounded-3xl p-5 transition-all">
                {event.image_url && (
                  <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className={`label-caps text-[0.55rem] px-2 py-1 rounded-full ${getStatusBadge(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-foreground">{event.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
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
                    <span className="font-display text-xl font-black text-neon">₹{event.price.toLocaleString()}</span>
                    <span className="btn-arena text-xs px-4 py-2">Book Now</span>
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
    upcoming: 'bg-neon/20 text-neon border-neon/30',
    ongoing: 'bg-violet/20 text-violet border-violet/30',
    completed: 'bg-neon-soft/20 text-neon-soft border-neon-soft/30',
    cancelled: 'bg-neon-red/20 text-neon-red border-neon-red/30'
  }
  return styles[status] || 'bg-muted-foreground/20 text-muted-foreground'
}