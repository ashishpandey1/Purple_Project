import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Booking = Database['public']['Tables']['bookings']['Row']
type Event = Database['public']['Tables']['events']['Row']

const paymentModes = [
  { 
    id: 'upi' as const, 
    label: 'UPI', 
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="M21 12H3" />
        <path d="M12 20v4" />
        <path d="M3 12h18" />
      </svg>
    ) 
  },
  { 
    id: 'card' as const, 
    label: 'Card', 
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ) 
  },
  { 
    id: 'wallet' as const, 
    label: 'Wallet', 
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      </svg>
    ) 
  },
  { 
    id: 'netbanking' as const, 
    label: 'Net Banking', 
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14v4" />
        <path d="M16 14h-4" />
        <path d="M12 10v4" />
        <path d="M8 14h4" />
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path d="M6 9h14" />
      </svg>
    ) 
  },
] as const

export function BookingConfirm() {
  const { bookingId } = useParams<{ bookingId: string }>()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(120)
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'wallet' | 'netbanking'>('upi')

  useEffect(() => {
    if (!bookingId) return
    fetchBooking()
  }, [bookingId])

  const fetchBooking = async () => {
    if (!bookingId) return
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        event:events(*)
      `)
      .eq('id', bookingId)
      .single()

    if (!error && data) {
      setBooking(data as Booking & { event: Event })
      setEvent(data.event as Event)
    }
    setLoading(false)
  }

  // 2-minute timer
  useEffect(() => {
    if (!booking?.qr_expires_at) return

    const checkExpiry = () => {
      const expiresAt = new Date(booking.qr_expires_at!).getTime()
      const now = Date.now()
      const left = Math.max(0, Math.floor((expiresAt - now) / 1000))
      setTimeLeft(left)
      if (left <= 0) {
        clearInterval(timerInterval)
      }
    }

    checkExpiry()
    const timerInterval = setInterval(checkExpiry, 1000)
    return () => clearInterval(timerInterval)
  }, [booking])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const formatTime = `${mins}:${secs.toString().padStart(2, '0')}`

  const isExpired = timeLeft <= 0

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-breathe flex items-center gap-3">
            <svg className="h-8 w-8 text-neon animate-breathe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="font-display text-lg font-bold text-foreground">Loading booking…</span>
          </div>
        </div>
      </div>
    )
  }

  if (!booking || !event) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div className="arena-card max-w-md mx-auto p-8">
          <h1 className="font-display text-xl font-black text-foreground mb-4">Booking Not Found</h1>
          <Link to="/events" className="btn-arena">Back to Events</Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
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

  // Generate QR code from booking data
  const qrCodeData = booking.qr_code_data || JSON.stringify({
    booking_id: booking.id,
    event_id: booking.event_id,
    amount: booking.total_amount,
    expires_at: booking.qr_expires_at
  })

  // Use static QR code image for display
  const qrCodeImage = '/qr-code.jpeg'

  const isExpired = timeLeft <= 0

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto 4rem' }}>
      <Link to="/events" className="btn-ghost-arena mb-6 inline-flex">
        ← Back to Events
      </Link>

      <div className="arena-card overflow-hidden">
        <div className="p-6 sm:p-8 text-center">
          <h1 className="font-display text-xl font-black text-foreground mb-2">
            {isExpired ? 'QR Code Expired' : 'Booking Confirmed'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {isExpired 
              ? 'This QR code has expired. Please create a new booking.'
              : 'Scan this QR code at the venue entrance'}
          </p>
        </div>

        <div className="p-0 sm:p-6 pb-8">
          <div className="qr-container mx-auto max-w-[320px]">
            <div className="font-display text-3xl font-black text-neon mb-4">
              ₹{booking.total_amount.toLocaleString()} {booking.currency}
            </div>

            {!isExpired && (
              <>
                <div className="qr-code mx-auto mb-4">
                  <img
                    src={qrCodeImage}
                    alt="Booking QR Code"
                    className="max-w-full h-auto max-w-[280px] mx-auto block rounded-xl border border-glass-border bg-surface p-3"
                  />
                </div>
                <div className="timer mb-6 flex items-center justify-center gap-2 text-lg font-display font-bold" style={{ color: timeLeft < 60 ? 'var(--neon-red)' : 'var(--neon)' }}>
                  <svg className="h-6 w-6 animate-breathe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="10" x2="14" y1="2" y2="2" />
                    <line x1="12" x2="15" y1="14" y2="11" />
                    <circle cx="12" cy="14" r="8" />
                  </svg>
                  <span className="tabular-nums">Expires in: {formatTime}</span>
                </div>
                <p className="text-sm text-muted-foreground text-center max-w-xs mx-auto">
                  Show this QR code at the venue entrance. Expires in 2 minutes.
                </p>
              </>
            )}

            {isExpired && (
              <div className="text-center p-4">
                <div className="text-6xl mb-3 animate-breathe">⏰</div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">QR Code Expired</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  This QR code has expired. Please create a new booking from the event page.
                </p>
                <Link to={`/events/${event.id}`} className="btn-arena">Book Again</Link>
              </div>
            )}

            <div className="mt-6 border-t border-glass-border pt-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Select Payment Mode</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {paymentModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setPaymentMode(mode.id)}
                    className={`btn-ghost-arena flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                      paymentMode === mode.id
                        ? 'border-neon bg-neon/10'
                        : ''
                    }`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-glass border border-glass-border text-neon">
                      {mode.icon}
                    </span>
                    <span className="label-caps text-xs font-semibold">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-glass-border pt-6">
              <Link to={`/events/${event.id}`} className="btn-ghost-arena w-full">
                ← Back to Event
              </Link>
              <Link to="/dashboard" className="btn-arena w-full mt-3">
                View My Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type Event = {
  id: string
  title: string
  event_date: string
  price: number
  currency: string
}