import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

export function Profile() {
  const { user, updateProfile } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [user?.id])

  const fetchProfile = async () => {
    if (!user) return
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    if (!error && data) {
      const profileData = data as Profile
      setProfile(profileData)
      setFullName(profileData.full_name || '')
      setAvatarUrl(profileData.avatar_url || '')
    }
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setSaving(true)

    const { error } = await updateProfile({ full_name: fullName, avatar_url: avatarUrl || undefined })
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully' })
      fetchProfile()
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <div style={{ color: 'var(--color-text-muted)' }}>Loading profile…</div>
      </div>
    )
  }

  const userEmail = user?.email || ''
  const userInitial = userEmail.charAt(0).toUpperCase()

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto 4rem' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' }}>Profile</h1>

      <div className="card">
        <div className="card-body">
          {message && (
            <div
              className={`error-message`}
              style={{
                background: message.type === 'success' ? '#dcfce7' : '#fee2e2',
                color: message.type === 'success' ? '#166534' : '#991b1b',
                border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSave}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--color-bg)', border: '2px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                    {userInitial}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="avatarUrl" className="label">Avatar URL</label>
                <input
                  id="avatarUrl"
                  type="url"
                  className="input"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  style={{ maxWidth: '400px' }}
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.375rem' }}>
                  Enter a direct image URL (Gravatar, etc.)
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="fullName" className="label">Full Name</label>
              <input
                id="fullName"
                type="text"
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label">Email</label>
              <input type="email" className="input" value={userEmail} readOnly style={{ background: 'var(--color-bg)' }} />
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.375rem' }}>
                Email cannot be changed here. Contact support if needed.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label">Role</label>
              <input type="text" className="input" value={profile?.role || 'user'} readOnly style={{ background: 'var(--color-bg)' }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label">Member Since</label>
              <input type="text" className="input" value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '—'} readOnly style={{ background: 'var(--color-bg)' }} />
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%' }}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Danger Zone</h2>
        </div>
        <div className="card-body">
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            Once you delete your account, there is no going back. All your data will be permanently removed.
          </p>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                // Implement account deletion
                alert('Account deletion not yet implemented')
              }
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}