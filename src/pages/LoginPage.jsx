import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Alert } from '../components/ui/Alert'
import { env } from '../config/env'

export function LoginPage() {
  const { login, loading, error, isMock } = useAuth()
  const [params] = useSearchParams()
  const sessionExpired = useMemo(() => params.get('reason') === 'session_expired', [params])

  return (
    <div className="login-page">
      <div className="card login-card">
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} aria-hidden>
          🤖
        </div>
        <h1>{env.appName}</h1>
        <p className="muted">Manage OmniBot for servers you own or can administer.</p>
        {sessionExpired ? (
          <Alert type="warning">
            Your session expired or is no longer valid. Please log in again to continue.
          </Alert>
        ) : null}
        {isMock ? (
          <Alert type="warning">
            Running in <strong>mock mode</strong> (no backend). Demo login does not contact Discord.
          </Alert>
        ) : null}
        {error ? <Alert type="error">{error}</Alert> : null}
        <button
          type="button"
          className="btn"
          style={{ width: '100%', marginTop: '0.5rem' }}
          onClick={login}
          disabled={loading}
        >
          {loading ? 'Signing in…' : isMock ? 'Continue with demo account' : 'Login with Discord'}
        </button>
        <p className="muted" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
          No bot tokens or API secrets are stored in this website.
        </p>
      </div>
    </div>
  )
}
