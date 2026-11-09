import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { Payment } from './pages/Payment'
import { Profile } from './pages/Profile'
import { Events } from './pages/Events'
import { EventDetail } from './pages/EventDetail'
import { BookingConfirm } from './pages/BookingConfirm'
import { RGBDemo } from './pages/RGBDemo'
import { ProtectedRoute } from './components/ProtectedRoute'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>Loading…</div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:eventId" element={<EventDetail />} />
        <Route path="booking/:bookingId" element={<BookingConfirm />} />
        <Route path="rgb-demo" element={<RGBDemo />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="payment/:transactionId" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}