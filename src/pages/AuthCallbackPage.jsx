import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Alert } from '../components/ui/Alert'

export function AuthCallbackPage() {
  const [params] = useSearchParams()
  const { completeOAuth } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  useEffect(() => {
    const code = params.get('code')
    if (!code) {
      setError('Missing authorization code')
      return
    }
    completeOAuth(code)
      .then(() => navigate('/', { replace: true }))
      .catch((e) => setError(e.message || 'Authentication failed'))
  }, [params, completeOAuth, navigate])
  return (
    <div className="login-page">
      <div className="card login-card">
        <h1>Signing you in…</h1>
        {error ? (
          <>
            <Alert type="error">{error}</Alert>
            <button type="button" className="btn" onClick={() => navigate('/login')}>
              Back to login
            </button>
          </>
        ) : (
          <p className="muted">Please wait while we complete Discord authentication.</p>
        )}
      </div>
    </div>
  )
}
