import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Alert } from '../components/ui/Alert'
import { env } from '../config/env'

export function LoginPage() {
  const { login, loading, error } = useAuth()
  const [params] = useSearchParams()
  const [localError, setLocalError] = useState(null)
  const sessionExpired = useMemo(() => params.get('reason') === 'session_expired', [params])
  const configError = !env.discordClientId
    ? 'Dashboard build is missing VITE_DISCORD_CLIENT_ID (public Discord application client ID). Add it as a GitHub Actions secret and redeploy.'
    : !env.apiBaseUrl
      ? 'API base URL is not configured.'
      : null

  const onLogin = () => {
    setLocalError(null)
    try {
      login()
    } catch (e) {
      setLocalError(e.message || 'Could not start Discord login')
    }
  }

  return (
    <div className="login-page">
      <div className="card login-card">
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} aria-hidden>
          🤖
        </div>
        <h1>{env.appName}</h1>
        <p className="muted">Manage OmniBot for servers you own or can administer.</p>
        {sessionExpired ? (
          <Alert type="warning">Your session expired. Please log in again.</Alert>
        ) : null}
        {configError ? <Alert type="error">{configError}</Alert> : null}
        {localError || error ? <Alert type="error">{localError || error}</Alert> : null}
        <button
          type="button"
          className="btn"
          style={{ width: '100%', marginTop: '0.5rem' }}
          onClick={onLogin}
          disabled={loading || Boolean(configError)}
        >
          {loading ? 'Redirecting…' : 'Login with Discord'}
        </button>
        <p className="muted" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
          Bot tokens and OAuth client secrets never ship in this website.
        </p>
        <p className="muted" style={{ fontSize: '0.75rem' }}>
          <a href="#/terms">Terms</a>
          {' · '}
          <a href="#/privacy">Privacy</a>
        </p>
      </div>
    </div>
  )
}
