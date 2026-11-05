// Mock Supabase Client for Local Testing
// Usage: Set VITE_USE_MOCK=true in .env.local to enable

import type { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type Transaction = Database['public']['Tables']['transactions']['Row']

// In-memory storage
const mockUsers = new Map<string, { id: string; email: string; password: string; user_metadata: any }>()
const mockProfiles = new Map<string, Profile>()
const mockTransactions = new Map<string, Transaction>()
let mockSession: { user: any; access_token: string } | null = null

// Auth state change listeners
const authStateListeners = new Set<(event: string, session: any) => void>()

// Emit auth state change to all listeners
const emitAuthStateChange = (event: string, session: any) => {
  authStateListeners.forEach(callback => callback(event, session))
}

// Generate mock ID
const genId = () => crypto.randomUUID()

// Mock delay to simulate network
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock QR code generator
// Mock QR code generator
// const generateMockQrData = (userId: string, amount: number) =>
//   `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=payment:${userId}:${amount}:${Date.now()}`

// Query builder class to handle chaining
class MockQueryBuilder<T> {
  private filters: Array<{ column: string; value: any }> = []
  private orderBy: { column: string; ascending: boolean } | null = null
  private isSingle = false

  constructor(
    private store: Map<string, T>
  ) {}

  eq(column: string, value: any): this {
    this.filters.push({ column, value })
    return this
  }

  order(column: string, { ascending = true }: { ascending?: boolean } = {}): this {
    this.orderBy = { column, ascending }
    return this
  }

  single(): Promise<{ data: T | null; error: any }> {
    this.isSingle = true
    return this.execute() as Promise<{ data: T | null; error: any }>
  }

  then<TResult>(
    onfulfilled?: (value: { data: T | T[] | null; error: any }) => TResult | PromiseLike<TResult>,
    onrejected?: (reason: any) => TResult | PromiseLike<TResult>
  ): Promise<TResult> {
    return this.execute().then(onfulfilled, onrejected) as Promise<TResult>
  }

  catch<TResult>(
    onrejected?: (reason: any) => TResult | PromiseLike<TResult>
  ): Promise<TResult> {
    return this.execute().catch(onrejected) as Promise<TResult>
  }

  private async execute(): Promise<{ data: T | T[] | null; error: any }> {
    await delay(100)

    let results = Array.from(this.store.values())

    // Apply ALL filters (not just user_id/id)
    for (const { column, value } of this.filters) {
      results = results.filter(item => (item as any)[column] === value)
    }

    // Apply ordering
    if (this.orderBy) {
      results.sort((a, b) => {
        const aVal = (a as any)[this.orderBy!.column]
        const bVal = (b as any)[this.orderBy!.column]
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        return this.orderBy!.ascending ? cmp : -cmp
      })
    }

    if (this.isSingle) {
      const result = results[0] || null
      return { data: result, error: result ? null : { message: 'Not found' } }
    }

    return { data: results, error: null }
  }
}

// Mock Supabase client
export const createMockClient = () => {
  // Auth methods
  const auth = {
    getSession: async () => {
      await delay(100)
      return { data: { session: mockSession }, error: null }
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Initial callback with current session
      setTimeout(() => callback('INITIAL_SESSION', mockSession), 0)
      // Add listener
      authStateListeners.add(callback)
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              authStateListeners.delete(callback)
            },
          },
        },
      }
    },

    signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => {
      await delay(500)
      if (mockUsers.has(email)) {
        return { data: { user: null }, error: { message: 'User already registered' } }
      }
      const user = {
        id: genId(),
        email,
        password,
        user_metadata: options?.data || {},
        email_confirmed_at: new Date().toISOString(),
      }
      mockUsers.set(email, user)

      const profile: Profile = {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      mockProfiles.set(user.id, profile)

      // Auto-seed test transactions for new user
      const statuses: Transaction['status'][] = ['completed', 'pending', 'failed', 'completed']
      const amounts = [100, 250, 500, 150]
      for (let i = 0; i < 4; i++) {
        const tx: Transaction = {
          id: genId(),
          user_id: user.id,
          amount: amounts[i],
          currency: 'INR',
          status: statuses[i],
          provider: 'mock',
          provider_transaction_id: `txn_${genId().slice(0, 8)}`,
          qr_code_data: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=payment:${user.id}:${amounts[i]}:${Date.now()}`,
          metadata: null,
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
          updated_at: new Date(Date.now() - i * 86400000).toISOString(),
          completed_at: statuses[i] === 'completed' ? new Date(Date.now() - i * 86400000).toISOString() : null,
        }
        mockTransactions.set(tx.id, tx)
      }

      const session = { user, access_token: 'mock-token-' + genId() }
      mockSession = session
      emitAuthStateChange('SIGNED_IN', session)

      return { data: { user, session }, error: null }
    },

    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      await delay(300)
      const user = mockUsers.get(email)
      if (!user || user.password !== password) {
        return { data: { user: null, session: null }, error: { message: 'Invalid login credentials' } }
      }
      const session = { user, access_token: 'mock-token-' + genId() }
      mockSession = session
      // Auto-seed test data for this user if not already seeded
      if (mockTransactions.size === 0 || !Array.from(mockTransactions.values()).some(t => t.user_id === user.id)) {
        const statuses: Transaction['status'][] = ['completed', 'pending', 'failed', 'completed']
        const amounts = [100, 250, 500, 150]
        for (let i = 0; i < 4; i++) {
          const tx: Transaction = {
            id: genId(),
            user_id: user.id,
            amount: amounts[i],
            currency: 'INR',
            status: statuses[i],
            provider: 'mock',
            provider_transaction_id: `txn_${genId().slice(0, 8)}`,
            qr_code_data: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=payment:${user.id}:${amounts[i]}:${Date.now()}`,
            metadata: null,
            created_at: new Date(Date.now() - i * 86400000).toISOString(),
            updated_at: new Date(Date.now() - i * 86400000).toISOString(),
            completed_at: statuses[i] === 'completed' ? new Date(Date.now() - i * 86400000).toISOString() : null,
          }
          mockTransactions.set(tx.id, tx)
        }
      }
      emitAuthStateChange('SIGNED_IN', session)
      return { data: { user, session }, error: null }
    },

    signInWithOAuth: async ({ provider }: { provider: 'google' | 'github' }) => {
      await delay(200)
      console.log(`[Mock] OAuth redirect to ${provider}`)
      return { data: { provider }, error: null }
    },

    signOut: async () => {
      await delay(100)
      mockSession = null
      emitAuthStateChange('SIGNED_OUT', null)
      return { error: null }
    },

    resetPasswordForEmail: async (email: string) => {
      await delay(200)
      console.log(`[Mock] Password reset email sent to ${email}`)
      return { error: null }
    },

    updateUser: async ({ data }: { data: { full_name?: string; avatar_url?: string } }) => {
      await delay(200)
      if (!mockSession?.user) {
        return { data: { user: null }, error: { message: 'Not authenticated' } }
      }
      const user = mockUsers.get(mockSession.user.email)
      if (user) {
        user.user_metadata = { ...user.user_metadata, ...data }
        mockSession.user = { ...mockSession.user, user_metadata: user.user_metadata }

        const profile = mockProfiles.get(user.id)
        if (profile) {
          mockProfiles.set(user.id, {
            ...profile,
            full_name: data.full_name ?? profile.full_name,
            avatar_url: data.avatar_url ?? profile.avatar_url,
            updated_at: new Date().toISOString(),
          })
        }
        emitAuthStateChange('USER_UPDATED', mockSession)
      }
      return { data: { user: mockSession.user }, error: null }
    },
  }

  // Database methods
  const from = (table: string) => {
    const isProfiles = table === 'profiles'
    const isTransactions = table === 'transactions'

    const store = isProfiles ? mockProfiles : isTransactions ? mockTransactions : new Map()

    return {
      select: () => new MockQueryBuilder<Profile | Transaction>(
        store as Map<string, Profile | Transaction>
      ),

      insert: (data: any) => ({
        select: () => ({
          single: async () => {
            await delay(200)
            if (table === 'transactions') {
              const transaction: Transaction = {
                id: genId(),
                user_id: data.user_id,
                amount: data.amount,
                currency: data.currency || 'INR',
                status: data.status || 'pending',
                provider: data.provider || 'mock',
                provider_transaction_id: data.provider_transaction_id || null,
                qr_code_data: data.qr_code_data || `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=payment:${data.user_id}:${data.amount}:${Date.now()}`,
                metadata: data.metadata || null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                completed_at: null,
              }
              mockTransactions.set(transaction.id, transaction)
              return { data: transaction, error: null }
            }
            return { data: null, error: { message: 'Not implemented' } }
          },
        }),
      }),

      update: (data: any) => ({
        eq: (_column: string, value: any) => ({
          select: () => ({
            single: async () => {
              await delay(200)
              if (table === 'transactions') {
                const tx = mockTransactions.get(value)
                if (tx) {
                  const updated = { ...tx, ...data, updated_at: new Date().toISOString() }
                  if (data.status && data.status !== 'pending') {
                    updated.completed_at = new Date().toISOString()
                  }
                  mockTransactions.set(value, updated)
                  return { data: updated, error: null }
                }
              }
              if (table === 'profiles') {
                const profile = mockProfiles.get(value)
                if (profile) {
                  const updated = { ...profile, ...data, updated_at: new Date().toISOString() }
                  mockProfiles.set(value, updated)
                  return { data: updated, error: null }
                }
              }
              return { data: null, error: { message: 'Not found' } }
            },
          }),
        }),
      }),

      delete: () => ({
        eq: (_column: string, value: any) => ({
          then: async (resolve: any) => {
            await delay(100)
            if (table === 'transactions') {
              mockTransactions.delete(value)
            }
            resolve({ data: null, error: null })
          },
        }),
      }),
    }
  }

  // Realtime (mock)
  const channel = (_name: string) => ({
    on: () => channel(_name),
    subscribe: () => channel(_name),
    unsubscribe: () => {},
  })

  return {
    auth,
    from,
    channel,
    // Helper to seed test data
    __seedTestData: async (userId: string) => {
      const statuses: Transaction['status'][] = ['completed', 'pending', 'failed', 'completed']
      const amounts = [100, 250, 500, 150]
      for (let i = 0; i < 4; i++) {
        const tx: Transaction = {
          id: genId(),
          user_id: userId,
          amount: amounts[i],
          currency: 'INR',
          status: statuses[i],
          provider: 'mock',
          provider_transaction_id: `txn_${genId().slice(0, 8)}`,
          qr_code_data: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=payment:${userId}:${amounts[i]}:${Date.now()}`,
          metadata: null,
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
          updated_at: new Date(Date.now() - i * 86400000).toISOString(),
          completed_at: statuses[i] === 'completed' ? new Date(Date.now() - i * 86400000).toISOString() : null,
        }
        mockTransactions.set(tx.id, tx)
      }
    },
    __clearData: () => {
      mockUsers.clear()
      mockProfiles.clear()
      mockTransactions.clear()
      mockSession = null
    },
  }
}

// Export singleton for app use
let mockClientInstance: ReturnType<typeof createMockClient> | null = null

export const getMockClient = () => {
  if (!mockClientInstance) {
    mockClientInstance = createMockClient()
  }
  return mockClientInstance
}