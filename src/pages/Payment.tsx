import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Transaction = Database['public']['Tables']['transactions']['Row']

export function Payment() {
  const { transactionId } = useParams<{ transactionId: string }>()
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div style={{ color: 'var(--color-text-muted)' }}>Loading payment…</div>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem' }}>Payment Not Found</h1>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    )
  }

  const isPending = transaction.status === 'pending'
  const isExpired = isPending && timeLeft <= 0

  return (
    <div className="container" style={{ maxWidth: '500px', margin: '2rem auto 4rem' }}>
      <div className="card">
        <div className="card-header" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Payment</h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
            {isPending ? (isExpired ? 'QR Code Expired' : 'Scan to Pay') : `Status: ${transaction.status}`}
          </p>
        </div>
        <div className="card-body">
          <div className="qr-container">
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              ₹{transaction.amount.toFixed(2)} {transaction.currency}
            </div>

            {isPending && !isExpired && transaction.qr_code_data && (
              <>
                <div className="qr-code">
                  <img
                    src={transaction.qr_code_data}
                    alt="Payment QR Code"
                    style={{ width: '250px', height: '250px', display: 'block' }}
                  />
                </div>
                <div className="timer" style={{ color: timeLeft < 60 ? 'var(--color-error)' : 'var(--color-primary)' }}>
                  Expires in: {formatTime(timeLeft)}
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textAlign: 'center', maxWidth: '300px' }}>
                  Scan this QR code with your payment app to complete the transaction.
                  This code expires in 5 minutes.
                </p>
              </>
            )}

            {isExpired && (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏰</div>
                <h3 style={{ marginBottom: '0.5rem' }}>QR Code Expired</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  This payment link has expired. Please create a new payment from the dashboard.
                </p>
                <Link to="/dashboard" className="btn btn-primary">
                  Create New Payment
                </Link>
              </div>
            )}

            {transaction.status === 'completed' && (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-success)' }}>Payment Completed!</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  Your payment of ₹{transaction.amount.toFixed(2)} was successfully processed.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
                  <Link to="/profile" className="btn btn-secondary">View History</Link>
                </div>
              </div>
            )}

            {transaction.status === 'failed' && (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-error)' }}>Payment Failed</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  The payment could not be processed. Please try again.
                </p>
                <Link to="/dashboard" className="btn btn-primary">Try Again</Link>
              </div>
            )}
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Transaction Details
            </h3>
            <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
              <dt style={{ color: 'var(--color-text-muted)' }}>Transaction ID</dt>
              <dd style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{transaction.id.slice(0, 8)}…</dd>
              <dt style={{ color: 'var(--color-text-muted)' }}>Provider</dt>
              <dd>{transaction.provider}</dd>
              <dt style={{ color: 'var(--color-text-muted)' }}>Created</dt>
              <dd>{new Date(transaction.created_at).toLocaleString()}</dd>
              {transaction.completed_at && (
                <>
                  <dt style={{ color: 'var(--color-text-muted)' }}>Completed</dt>
                  <dd>{new Date(transaction.completed_at).toLocaleString()}</dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}