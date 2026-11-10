import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Transaction = Database['public']['Tables']['transactions']['Row']

const PAYMENT_MODES = [
  { id: 'upi' as const, label: 'UPI', icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="M21 12H3" /><path d="M12 20v4" /><path d="M3 12h18" /></svg> },
  { id: 'card' as const, label: 'Card', icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg> },
  { id: 'wallet' as const, label: 'Wallet', icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" /><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" /></svg> },
  { id: 'netbanking' as const, label: 'Net Banking', icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14v4" /><path d="M16 14h-4" /><path d="M12 10v4" /><path d="M8 14h4" /><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M6 9h14" /></svg> },
] as const

// Generate UPI QR code string
function generateUpiString(transaction: Transaction): string {
  const upiId = 'merchant@upi' // Replace with actual merchant UPI ID
  const amount = transaction.amount.toFixed(2)
  const note = `Payment for ${transaction.id.slice(0, 8)}`
  const merchantName = 'BnB Tournament'
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`
}

export function Payment() {
  const { transactionId } = useParams<{ transactionId: string }>()
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(300)
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'wallet' | 'netbanking'>('upi')
  const [processing, setProcessing] = useState(false)

  const handlePayment = async (mode: 'upi' | 'card' | 'wallet' | 'netbanking') => {
    if (!transaction) return
    setProcessing(true)
    setPaymentMode(mode)

    await new Promise(resolve => setTimeout(resolve, 2000))

    const { error } = await supabase
      .from('transactions')
      .update({
        status: 'completed',
        provider: mode,
        completed_at: new Date().toISOString(),
      })
      .eq('id', transaction.id)

    if (!error) {
      setTransaction(prev => prev ? { ...prev, status: 'completed', provider: mode, completed_at: new Date().toISOString() } : null)
    }
    setProcessing(false)
  }

  useEffect(() => {
    if (!transactionId) return

    const fetchTransaction = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', transactionId)
        .single()
      if (!error && data) {
        const tx = data as Transaction
        setTransaction(tx)
        if (tx.status === 'pending') {
          const elapsed = (Date.now() - new Date(tx.created_at).getTime()) / 1000
          setTimeLeft(Math.max(0, 300 - Math.floor(elapsed)))
        }
      }
      setLoading(false)
    }

    fetchTransaction()

    const channel = supabase
      .channel(`transaction_${transactionId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'transactions', filter: `id=eq.${transactionId}` },
        (payload: any) => {
          setTransaction(payload.new as Transaction)
          if (payload.new.status !== 'pending') {
            clearInterval(timerInterval)
          }
        }
      )
      .subscribe()

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      channel.unsubscribe()
      clearInterval(timerInterval)
    }
  }, [transactionId])

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-breathe flex items-center gap-3">
            <svg className="h-8 w-8 text-p5-red animate-breathe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="font-display text-lg font-bold text-foreground">Loading payment…</span>
          </div>
        </div>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div className="card-p5-jagged max-w-md mx-auto p-8">
          <h1 className="font-display text-xl font-black text-foreground mb-4">Payment Not Found</h1>
          <Link to="/dashboard" className="btn-p5-primary">Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  const isPending = transaction.status === 'pending'
  const isExpired = isPending && timeLeft <= 0
  const formatTime = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`
  const upiString = generateUpiString(transaction)

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '2rem auto 4rem' }}>
      <div className="card-p5-jagged overflow-hidden">
        <div className="p-6 sm:p-8 text-center">
          <h1 className="font-display text-xl font-black text-foreground mb-2">PAYMENT</h1>
          <p className="text-gray-400">
            {isPending ? (isExpired ? 'QR CODE EXPIRED' : 'SCAN TO PAY') : `STATUS: ${transaction.status.toUpperCase()}`}
          </p>
        </div>
        <div className="p-0 sm:p-6 pb-8">
          <div className="qr-container mx-auto max-w-[320px]">
            <div className="font-display text-3xl font-black text-p5-red mb-4">
              ₹{transaction.amount.toFixed(2)} {transaction.currency}
            </div>

            {isPending && !isExpired && (
              <>
                <div className="qr-code mx-auto mb-4">
                  {/* Dynamic QR Code using a reliable QR code service */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`}
                    alt="UPI Payment QR Code"
                    className="max-w-full h-auto max-w-[250px] mx-auto block rounded-xl border border-white/10 bg-p5-black p-2"
                    onError={(e) => {
                      // Fallback to another QR service if first fails
                      e.currentTarget.src = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(upiString)}&chs=250x250`
                    }}
                  />
                </div>
                <div className="timer mb-6 flex items-center justify-center gap-2 text-lg font-display font-bold text-p5-red" style={{ color: timeLeft < 60 ? 'var(--p5-red)' : 'var(--p5-red)' }}>
                  <svg className="h-6 w-6 animate-breathe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="10" x2="14" y1="2" y2="2" />
                    <line x1="12" x2="15" y1="14" y2="11" />
                    <circle cx="12" cy="14" r="8" />
                  </svg>
                  <span className="tabular-nums">EXPIRES IN: {formatTime}</span>
                </div>
                <p className="text-sm text-gray-400 text-center max-w-xs mx-auto">
                  Scan this QR code with your UPI app (GPay, PhonePe, Paytm, etc.) to complete the transaction.
                </p>
              </>
            )}

            {isExpired && (
              <div className="text-center p-4">
                <div className="text-6xl mb-3 animate-breathe">⏰</div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">QR CODE EXPIRED</h3>
                <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                  This payment link has expired. Please create a new payment from the dashboard.
                </p>
                <Link to="/dashboard" className="btn-p5-primary">CREATE NEW PAYMENT</Link>
              </div>
            )}

            {transaction.status === 'completed' && (
              <div className="text-center p-4">
                <div className="text-6xl mb-3 animate-breathe">✅</div>
                <h3 className="font-display text-xl font-bold text-p5-red mb-2">PAYMENT COMPLETED!</h3>
                <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                  Your payment of ₹{transaction.amount.toFixed(2)} was successfully processed via {transaction.provider}.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/dashboard" className="btn-p5-primary">BACK TO DASHBOARD</Link>
                  <Link to="/profile" className="btn-ghost-arena">VIEW HISTORY</Link>
                </div>
              </div>
            )}

            {transaction.status === 'failed' && (
              <div className="text-center p-4">
                <div className="text-6xl mb-3 animate-breathe">❌</div>
                <h3 className="font-display text-xl font-bold text-p5-red mb-2">PAYMENT FAILED</h3>
                <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                  The payment could not be processed. Please try again.
                </p>
                <Link to="/dashboard" className="btn-p5-primary">TRY AGAIN</Link>
              </div>
            )}

            {/* Payment Mode Selection */}
            {isPending && !isExpired && !processing && (
              <div className="mt-6 border-t border-white/10 pt-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">SELECT PAYMENT MODE</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PAYMENT_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => handlePayment(mode.id)}
                      className={`btn-ghost-arena flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                        paymentMode === mode.id
                          ? 'border-p5-red bg-p5-red/10'
                          : ''
                      }`}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-p5-dark border border-white/10 text-p5-red">
                        {mode.icon}
                      </span>
                      <span className="label-caps text-xs font-semibold">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {processing && (
              <div className="mt-6 text-center">
                <div className="animate-breathe flex items-center justify-center gap-3 text-p5-red mb-4">
                  <svg className="h-8 w-8 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span className="font-display text-lg font-bold">PROCESSING {paymentMode.toUpperCase()} PAYMENT…</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-white/10 pt-6 px-6 sm:px-8">
            <h3 className="label-caps text-xs font-semibold text-gray-400 mb-4">TRANSACTION DETAILS</h3>
            <dl className="grid grid-cols-[auto_1fr] gap-y-3 gap-x-4 text-sm">
              <dt className="text-gray-400">Transaction ID</dt>
              <dd className="font-mono text-xs font-medium">{transaction.id.slice(0, 8)}…</dd>
              <dt className="text-gray-400">Provider</dt>
              <dd className="text-gray-400 capitalize">{transaction.provider || paymentMode}</dd>
              <dt className="text-gray-400">Created</dt>
              <dd className="text-gray-400">{new Date(transaction.created_at).toLocaleString()}</dd>
              {transaction.completed_at && (
                <>
                  <dt className="text-gray-400">Completed</dt>
                  <dd className="text-gray-400">{new Date(transaction.completed_at).toLocaleString()}</dd>
                </>
              )}
            </dl>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/dashboard" className="btn-ghost-arena">← BACK TO DASHBOARD</Link>
        </div>
      </div>
    </div>
  )
}