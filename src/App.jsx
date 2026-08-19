import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ServerProvider } from './contexts/ServerContext'
import { AppLayout } from './components/layout/AppLayout'
import { LoginPage } from './pages/LoginPage'
import { AuthCallbackPage } from './pages/AuthCallbackPage'
import { OverviewPage } from './pages/OverviewPage'
import { FeatureSettingsPage } from './pages/FeatureSettingsPage'

function Protected({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <div className="login-page"><div className="card">Loading…</div></div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/" element={<Protected><ServerProvider><AppLayout /></ServerProvider></Protected>}>
              <Route index element={<OverviewPage />} />
              <Route path="features/:categoryId" element={<FeatureSettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
