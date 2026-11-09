import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Event = Database['public']['Tables']['events']['Row']

export function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [_booking, setBooking] = useState(false)

  useEffect(() => {
    if (!eventId) return
    fetchEvent()
  }, [eventId])

  const fetchEvent = async () => {
    if (!eventId) return
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()
    if (!error && data) {
      setEvent(data as Event)
    }
    setLoading(false)
  }

  const handleBook = async () => {
    if (!user || !event) return
    setBooking(true)

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        event_id: event.id,
        quantity,
        total_amount: event.price * quantity,
        currency: event.currency,
        status: 'pending',
        qr_expires_at: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
      })
      .select()
      .single()

    setBooking(false)
    if (!error && data) {
      navigate(`/booking/${data.id}`)
    }
    console.log('Booking result:', { data, error })
  }

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
            <span className="font-display text-lg font-bold text-foreground">Loading event…</span>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div className="arena-card max-w-md mx-auto p-8">
          <h1 className="font-display text-xl font-black text-foreground mb-4">Event Not Found</h1>
          <Link to="/events" className="btn-arena">Back to Events</Link>
        </div>
      </div>
    )
  }

  const isUpcoming = event.status === 'upcoming'

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <Link to="/events" className="btn-ghost-arena mb-6 inline-flex">
        ← Back to Events
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Event Details */}
        <div className="space-y-6">
          {event.image_url && (
            <div className="relative h-72 w-full rounded-3xl overflow-hidden">
              <img
                src={event.image_url}
                alt={event.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 right-4">
                <span className={`label-caps text-[0.55rem] px-3 py-1 rounded-full ${event.status === 'upcoming' ? 'bg-neon/20 text-neon border-neon/30' : event.status === 'ongoing' ? 'bg-violet/20 text-violet border-violet/30' : 'bg-neon-soft/20 text-neon-soft border-neon-soft/30'}`}>
                  {event.status}
                </span>
              </div>
            </div>
          )}

          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-foreground">{event.title}</h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">{event.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-glass-border bg-surface/50">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-glass border border-glass-border text-neon">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                  </svg>
                </span>
                <div>
                  <p className="label-caps text-xs text-muted-foreground">Date & Time</p>
                  <p className="font-medium text-foreground">{formatEventDate(event.event_date)}</p>
                </div>
              </div>

              {event.venue && (
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-glass-border bg-surface/50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-glass border border-glass-border text-neon">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div>
                    <p className="label-caps text-xs text-muted-foreground">Venue</p>
                    <p className="font-medium text-foreground">{event.venue}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 rounded-2xl border border-glass-border bg-surface/50">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-glass border border-glass-border text-neon">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <p className="label-caps text-xs text-muted-foreground">Available Seats</p>
                  <p className="font-medium text-foreground">{event.max_capacity} seats</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div>
          <div className="arena-card sticky top-24 p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Book Tickets</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-glass-border bg-surface/50">
                <div>
                  <p className="label-caps text-xs text-muted-foreground">{event.title}</p>
                  <p className="font-display text-xl font-black text-foreground">₹{event.price.toLocaleString()}</p>
                </div>
                <span className={`label-caps text-[0.55rem] px-2 py-1 rounded-full ${event.status === 'upcoming' ? 'bg-neon/20 text-neon border-neon/30' : 'bg-neon-red/20 text-neon-red border-neon-red/30'}`}>
                  {event.status}
                </span>
              </div>

              <div>
                <label className="label-caps text-xs font-semibold text-foreground mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn-ghost-arena h-10 w-10"
                  >
                    −
                  </button>
                  <span className="font-display text-2xl font-black text-foreground min-w-[3ch] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="btn-ghost-arena h-10 w-10"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-glass-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per ticket</span>
                  <span className="text-foreground">₹{event.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="text-foreground">× {quantity}</span>
                </div>
                <div className="flex justify-between font-display font-black text-lg mt-2 border-t border-glass-border pt-2">
                  <span className="text-foreground">Total</span>
                  <span className="text-neon">₹{(event.price * quantity).toLocaleString()}</span>
                </div>
              </div>

              {user ? (
                <button
                  onClick={handleBook}
                  disabled={!isUpcoming || event.max_capacity === 0}
                  className="btn-arena w-full py-3"
                >
                  {isUpcoming ? 'Proceed to Payment' : 'Event Not Available'}
                </button>
              ) : (
                <Link to="/login" className="btn-arena w-full py-3 text-center">
                  Login to Book
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}