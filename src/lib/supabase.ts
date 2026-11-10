import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import { getMockClient } from './mockSupabase'

declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_ANON_KEY: string
    readonly VITE_USE_MOCK?: string
    readonly VITE_SITE_URL?: string
    readonly SUPABASE_SERVICE_ROLE_KEY?: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

let supabaseClient: any
let supabaseUrl: string
let supabaseAnonKey: string

if (useMock) {
  console.log('[Supabase] Using MOCK client for local testing')
  supabaseClient = getMockClient()
  supabaseUrl = 'https://mock.supabase.co'
  supabaseAnonKey = 'mock-anon-key'
} else {
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Set VITE_USE_MOCK=true for local testing without Supabase.')
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  })
}

export const supabase = supabaseClient

// Helper for server-side/admin operations (use service role key)
export const createAdminClient = () => {
  if (useMock) {
    throw new Error('Admin client not available in mock mode')
  }
  const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// Export mock helpers for testing
export const mockHelpers = useMock ? getMockClient() : null