import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Alert } from '../components/ui/Alert'
import { env } from '../config/env'
import { AddToDiscordButton } from '../components/AddToDiscordButton'

export function LoginPage() {
  const { login, loading, error } = useAuth()
  const [params] = useSearchParams()
  const [localError, setLocalError] = useState(null)
  const sessionExpired = useMemo(() => params.get('reason') === 'session_expired', [params])
  const configError = !env.discordClientId
    ? 'Discord client ID is not configured.'
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
        <p className="muted">Manage OmniBot for servers you administer — or submit a ban appeal.</p>
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
        <AddToDiscordButton
          className="btn btn-secondary"
          style={{ width: '100%', marginTop: '0.75rem', display: 'inline-flex' }}
        />
        <p className="muted" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
          Bot tokens and OAuth secrets never ship in this website.
        </p>
        <p className="muted" style={{ fontSize: '0.75rem' }}>
          <Link to="/appeals">Submit an appeal</Link>
          {' · '}
          <Link to="/terms">Terms</Link>
          {' · '}
          <Link to="/privacy">Privacy</Link>
        </p>
      </div>
    </div>
  )
}
