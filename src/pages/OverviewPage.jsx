import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useServer } from '../contexts/ServerContext'
import { useSettings } from '../contexts/SettingsContext'
import { botService } from '../services/botService'
import { SETTINGS } from '../config/settingsRegistry'
import { Alert } from '../components/ui/Alert'

export function OverviewPage() {
  const { session } = useAuth()
  const { selected, selectedId } = useServer()
  const { values, history, loading } = useSettings()
  const [status, setStatus] = useState(null)
  const [stats, setStats] = useState(null)
  useEffect(() => {
    if (!session || !selectedId) return
    botService.status(session, selectedId).then(setStatus).catch(() => setStatus(null))
    botService.stats(session, selectedId).then(setStats).catch(() => setStats(null))
  }, [session, selectedId])
  const enabledCount = SETTINGS.filter((s) => s.type === 'boolean' && values[s.id] === true).length
  if (!selected) return <Alert type="warning">Select a server you can manage.</Alert>
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>{selected.name}</h1>
      <p className="muted">OmniBot configuration overview for this server.</p>
      {loading ? <div className="skeleton" style={{ height: 80, marginBottom: 16 }} /> : null}
      <div className="grid grid-3" style={{ marginBottom: '1rem' }}>
        <div className="stat"><div className="stat-label">Bot status</div><div className="stat-value">{status?.online ? <span className="badge badge-success">Online</span> : <span className="badge badge-danger">Unknown</span>}</div></div>
        <div className="stat"><div className="stat-label">Enabled toggles</div><div className="stat-value">{enabledCount}/{SETTINGS.filter((s) => s.type === 'boolean').length}</div></div>
        <div className="stat"><div className="stat-label">AI usage today</div><div className="stat-value">{stats ? `${stats.aiUsedToday}/${stats.aiLimit}` : '—'}</div></div>
      </div>
      <div className="card">
        <h2 className="card-title">Quick facts</h2>
        <div className="grid grid-2">
          <div><div className="muted">Members (approx.)</div><strong>{stats?.members ?? selected.approximate_member_count ?? '—'}</strong></div>
          <div><div className="muted">Commands today</div><strong>{stats?.commandsToday ?? '—'}</strong></div>
          <div><div className="muted">Latency</div><strong>{status?.latencyMs != null ? `${status.latencyMs} ms` : '—'}</strong></div>
          <div><div className="muted">Bot version</div><strong>{status?.version ?? '—'}</strong></div>
        </div>
      </div>
      <div className="card">
        <h2 className="card-title">Recent configuration changes</h2>
        {history.length === 0 ? <p className="muted">No dashboard saves yet for this server.</p> : (
          <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
            {history.slice(0, 8).map((h) => (
              <li key={h.id} style={{ marginBottom: '0.35rem' }}>
                <strong>{h.user}</strong> updated {h.keys?.length || 0} setting(s){' '}
                <span className="muted">{new Date(h.at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Alert type="info">Until a backend is connected, changes stay in <strong>mock mode</strong> only.</Alert>
    </div>
  )
}
