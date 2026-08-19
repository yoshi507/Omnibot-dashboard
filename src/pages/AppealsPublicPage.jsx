import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { appealsService } from '../services/appealsService'
import { Alert } from '../components/ui/Alert'

export function AppealsPublicPage() {
  const { session, isAuthenticated, login, loading: authLoading } = useAuth()
  const [guilds, setGuilds] = useState([])
  const [guildId, setGuildId] = useState('')
  const [form, setForm] = useState(null)
  const [answers, setAnswers] = useState({})
  const [mine, setMine] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (!session) return
    setLoading(true)
    Promise.all([appealsService.listGuilds(session), appealsService.mine(session)])
      .then(([g, m]) => {
        setGuilds(g || [])
        setMine(m || [])
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [session])

  useEffect(() => {
    if (!session || !guildId) {
      setForm(null)
      return
    }
    setLoading(true)
    setError(null)
    appealsService
      .getForm(session, guildId)
      .then((f) => {
        setForm(f)
        setAnswers({})
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [session, guildId])

  if (authLoading) {
    return (
      <div className="login-page">
        <div className="card">Loading…</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="card login-card">
          <h1>Ban appeals</h1>
          <p className="muted">Log in with Discord to submit or check an appeal.</p>
          <button type="button" className="btn" style={{ width: '100%' }} onClick={() => login()}>
            Login with Discord
          </button>
          <p className="muted" style={{ marginTop: '1rem' }}>
            <Link to="/login">Staff dashboard login</Link>
          </p>
        </div>
      </div>
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!guildId || !form) return
    setSubmitting(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await appealsService.submit(session, guildId, answers)
      setSuccess(`${res.message || 'Submitted.'} Reference: ${res.id}`)
      setMine(await appealsService.mine(session))
      setAnswers({})
    } catch (err) {
      setError(err.message || 'Submit failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page" style={{ alignItems: 'start', paddingTop: '2rem' }}>
      <div className="card" style={{ width: 'min(640px, 100%)', textAlign: 'left' }}>
        <h1>Submit an appeal</h1>
        <p className="muted">Only servers with appeals enabled are listed.</p>
        {error ? <Alert type="error">{error}</Alert> : null}
        {success ? <Alert type="success">{success}</Alert> : null}
        {loading ? <p className="muted">Loading…</p> : null}

        <label className="field-label">Server</label>
        <select
          className="select"
          value={guildId}
          onChange={(e) => setGuildId(e.target.value)}
          style={{ marginBottom: '1rem' }}
        >
          <option value="">Select a server…</option>
          {guilds.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        {!loading && guilds.length === 0 ? (
          <Alert type="warning">No servers available for appeals.</Alert>
        ) : null}

        {form ? (
          <form onSubmit={onSubmit}>
            {(form.questions || []).map((q) => (
              <div className="field" key={q.id}>
                <label className="field-label">
                  {q.label}
                  {q.required ? ' *' : ''}
                </label>
                <textarea
                  className="textarea"
                  required={q.required}
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                  maxLength={1000}
                />
              </div>
            ))}
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit appeal'}
            </button>
          </form>
        ) : null}

        <h2 style={{ marginTop: '2rem' }}>Your appeals</h2>
        {mine.length === 0 ? (
          <p className="muted">No appeals yet.</p>
        ) : (
          <ul>
            {mine.map((a) => (
              <li key={`${a.guildId}-${a.id}`}>
                <strong>{a.id}</strong> · {a.guildName} · {a.status}
              </li>
            ))}
          </ul>
        )}
        <p className="muted">
          <Link to="/">Staff dashboard</Link>
        </p>
      </div>
    </div>
  )
}
