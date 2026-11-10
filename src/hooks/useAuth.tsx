import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signInWithOAuth: (provider: 'google' | 'github') => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
  updateProfile: (data: { full_name?: string; avatar_url?: string }) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | null>(null)

// Get the correct redirect URL for OAuth
function getOAuthRedirectUrl(): string {
  // Use environment variable if set, otherwise default to /dashboard
  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin
  return `${baseUrl}/dashboard`
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, sess: Session | null) => {
      setSession(sess)
      setUser(sess?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: getOAuthRedirectUrl(),
      },
    })
    return { error }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    const redirectTo = getOAuthRedirectUrl()
    
    console.log(`[OAuth] Starting ${provider} login`, { redirectTo })
    
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
      options: { 
        redirectTo,
        // These scopes are optional but can help with user info
        scopes: provider === 'google' 
          ? 'openid email profile' 
          : 'read:user user:email',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    
    if (error) {
      console.error(`[OAuth] ${provider} error:`, error)
      // Provide helpful error messages
      if (error.message.includes('provider is not enabled')) {
        return { error: new AuthError(`Google/GitHub login not configured. Please enable ${provider} provider in Supabase Dashboard → Authentication → Providers.`) }
      }
      if (error.message.includes('redirect')) {
        return { error: new AuthError(`Redirect URL mismatch. Ensure "${redirectTo}" is added to Supabase Dashboard → Authentication → URL Configuration.`) }
      }
    }
    
    if (data?.url) {
      console.log(`[OAuth] Redirecting to:`, data.url)
    }
    
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getOAuthRedirectUrl().replace('/dashboard', '/reset-password'),
    })
    return { error }
  }

  const updateProfile = async (data: { full_name?: string; avatar_url?: string }) => {
    const { error } = await supabase.auth.updateUser({ data })
    return { error }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithOAuth, signOut, resetPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

// Helper to check OAuth configuration status
export async function checkOAuthConfig(): Promise<{ google: boolean; github: boolean; errors: string[] }> {
  const errors: string[] = []
  
  try {
    const { error } = await supabase.auth.getSession()
    if (error) errors.push(`Session check failed: ${error.message}`)
  } catch (e) {
    errors.push(`Supabase connection failed: ${e}`)
  }
  
  // Note: Can't programmatically check if providers are enabled from client
  // This must be verified in Supabase Dashboard
  return { google: true, github: true, errors }
}