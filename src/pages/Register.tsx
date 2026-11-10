import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function Register() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    const { error } = await signUp(email, password, fullName)
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/login?message=Check your email to confirm your account', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-p5-black flex items-center justify-center px-4 py-12 font-oswald relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-halftone opacity-30" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-p5-black clip-triangle-bottom" aria-hidden="true"></div>
      <div className="absolute top-20 left-10 w-2 h-24 bg-p5-red rotate-6" aria-hidden="true"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-32 bg-p5-red -rotate-3" aria-hidden="true"></div>
      <div className="absolute bottom-20 left-20 w-48 h-0.5 bg-white/10" aria-hidden="true"></div>
      <div className="absolute bottom-20 left-20 w-0.5 h-48 bg-white/10" aria-hidden="true"></div>
      <div className="absolute bottom-20 right-20 w-48 h-0.5 bg-white/10" aria-hidden="true"></div>
      <div className="absolute bottom-20 right-20 w-0.5 h-48 bg-white/10" aria-hidden="true"></div>

      <div className="container relative z-10 w-full max-w-md animate-enter-left" style={{ animationDelay: '100ms' }}>
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="clip-jagged bg-p5-red px-5 py-2.5 box-shadow-hard logo-p5-block">
            <span className="font-anton text-2xl text-white">B</span>
          </div>
          <div className="clip-jagged bg-p5-black px-5 py-2.5 -ml-2 -mt-1 box-shadow-hard logo-p5-block">
            <span className="font-anton text-2xl text-p5-red">n</span>
          </div>
          <div className="clip-jagged bg-gray-400 px-5 py-2.5 -ml-2 -mt-1 logo-p5-block">
            <span className="font-anton text-2xl text-p5-black">b</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-marker text-xl text-p5-red mb-2 tracking-wider">JOIN THE FIGHT</p>
          <h1 className="font-anton text-4xl text-white text-shadow-hard mb-3">CREATE ACCOUNT</h1>
          <p className="font-oswald text-gray-400">Start your tournament journey today</p>
        </div>

        {/* Card */}
        <div className="card-p5-jagged p-8 relative">
          {error && (
            <div className="mb-6 p-4 bg-p5-red/20 border border-p5-red/50 clip-jagged text-center animate-shake">
              <p className="font-oswald text-sm text-p5-red">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="label-caps text-gray-400 block mb-2">FULL NAME (OPTIONAL)</label>
              <input
                id="fullName"
                type="text"
                className="input-p5"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                autoComplete="name"
                disabled={loading}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="label-caps text-gray-400 block mb-2">EMAIL</label>
              <input
                id="email"
                type="email"
                className="input-p5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="label-caps text-gray-400 block mb-2">PASSWORD</label>
              <input
                id="password"
                type="password"
                className="input-p5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                autoComplete="new-password"
                disabled={loading}
                minLength={8}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="label-caps text-gray-400 block mb-2">CONFIRM PASSWORD</label>
              <input
                id="confirmPassword"
                type="password"
                className="input-p5"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-p5-primary w-full py-4"
              disabled={loading}
            >
              {loading ? 'CREATING ACCOUNT…' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center font-oswald text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-p5-red hover-text-white transition-colors font-anton">SIGN IN</Link>
          </p>
        </div>

        {/* Decorative accent */}
        <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-p5-red/30 clip-starburst rotate-6 animate-pulse-p5" aria-hidden="true"></div>
        <div className="absolute bottom-4 -left-4 w-12 h-12 bg-p5-red clip-jagged -rotate-12" aria-hidden="true"></div>
      </div>
    </div>
  )
}