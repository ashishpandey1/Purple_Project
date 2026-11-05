import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Transaction = Database['public']['Tables']['transactions']['Row']

export function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchTransactions()
    const channel = supabase
      .channel('transactions_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user?.id}` },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            setTransactions((prev) => [payload.new as Transaction, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setTransactions((prev) =>
              prev.map((t) => (t.id === payload.new.id ? (payload.new as Transaction) : t))
            )
          } else if (payload.eventType === 'DELETE') {
            setTransactions((prev) => prev.filter((t) => t.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [user?.id])

  const fetchTransactions = async () => {
    if (!user) {
      console.log('[Dashboard] No user, skipping fetch')
      setLoading(false)
      return
    }
    console.log('[Dashboard] Fetching transactions for user:', user.id)
    try {
      const query = supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      console.log('[Dashboard] Query built, awaiting...')
      const { data, error } = await query
      console.log('[Dashboard] Query resolved:', { data: data?.length, error })
      
      if (!error && data) {
        setTransactions(data as Transaction[])
        console.log('[Dashboard] Transactions set:', data.length)
      } else {
        console.error('Fetch transactions error:', error)
      }
    } catch (err) {
      console.error('Fetch transactions exception:', err)
    } finally {
      console.log('[Dashboard] Finally block - clearing loading')
      setLoading(false)
    }
  }

  const handleCreatePayment = async (amount: number) => {
    if (!user) return
    setCreating(true)
    // Mock QR code generation - replace with real payment provider integration
    const mockQrData = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=payment:${user.id}:${amount}:${Date.now()}`
    const { data, error } = await (supabase
      .from('transactions') as any)
      .insert({
        user_id: user.id,
        amount,
        currency: 'INR',
        status: 'pending' as const,
        provider: 'mock',
        qr_code_data: mockQrData,
      })
      .select()
      .single()
    setCreating(false)
    if (!error && data) {
      navigate(`/payment/${(data as Transaction).id}`)
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading dashboard…</div>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Dashboard</h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" onClick={() => handleCreatePayment(100)} disabled={creating}>
            ₹100 Payment
          </button>
          <button className="btn btn-primary" onClick={() => handleCreatePayment(250)} disabled={creating}>
            ₹250 Payment
          </button>
          <button className="btn btn-primary" onClick={() => handleCreatePayment(500)} disabled={creating}>
            ₹500 Payment
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Transactions</h2>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {transactions.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <p style={{ marginBottom: '1rem' }}>No transactions yet</p>
              <Link to="/dashboard" className="btn btn-primary" onClick={() => handleCreatePayment(100)}>
                Create Your First Payment
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>Date</th>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>Amount</th>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>Status</th>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>Provider</th>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                        {new Date(tx.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                        ₹{tx.amount.toFixed(2)} {tx.currency}
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span className={`badge badge-${tx.status}`}>{tx.status}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{tx.provider}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        {tx.status === 'pending' && (
                          <Link to={`/payment/${tx.id}`} className="btn btn-primary" style={{ padding: '0.375rem 0.875rem', fontSize: '0.8125rem' }}>
                            Pay Now
                          </Link>
                        )}
                        {tx.status !== 'pending' && (
                          <button className="btn btn-secondary" style={{ padding: '0.375rem 0.875rem', fontSize: '0.8125rem' }} disabled>
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}