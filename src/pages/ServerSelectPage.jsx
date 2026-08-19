import { useServer } from '../contexts/ServerContext'
import { useAuth } from '../contexts/AuthContext'
import { Alert } from '../components/ui/Alert'

function guildIconUrl(guild) {
  if (!guild?.icon) return null
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`
}

function Initial({ name }) {
  const letter = (name || '?').trim().charAt(0).toUpperCase() || '?'
  return (
    <div className="server-icon server-icon-fallback" aria-hidden>
      {letter}
    </div>
  )
}

export function ServerSelectPage() {
  const { guilds, loading, error, setSelectedId, refresh } = useServer()
  const { user, logout } = useAuth()

  return (
    <div className="server-select-page">
      <div className="server-select-inner">
        <header className="server-select-header">
          <div className="server-select-brand">
            <span className="server-select-logo" aria-hidden>
              🤖
            </span>
            <div>
              <h1>Choose a server</h1>
              <p className="muted">
                Signed in as <strong>{user?.global_name || user?.username || 'Discord user'}</strong>. Select a
                server you can manage with OmniBot.
              </p>
            </div>
          </div>
          <div className="server-select-actions">
            <button type="button" className="btn btn-ghost" onClick={() => refresh()} disabled={loading}>
              Refresh
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => logout()}>
              Log out
            </button>
          </div>
        </header>

        {error ? <Alert type="error">{error}</Alert> : null}

        {loading ? (
          <div className="server-grid" aria-busy="true">
            {[1, 2, 3].map((i) => (
              <div key={i} className="server-card skeleton" style={{ height: 88 }} />
            ))}
          </div>
        ) : null}

        {!loading && guilds.length === 0 ? (
          <div className="card server-empty">
            <h2>No manageable servers</h2>
            <p className="muted">
              OmniBot only lists servers where you have <strong>Administrator</strong> or{' '}
              <strong>Manage Server</strong>, and where OmniBot is already present.
            </p>
            <ul className="muted server-empty-list">
              <li>Invite OmniBot to your server if it is not there yet.</li>
              <li>Make sure your Discord account has the right permissions.</li>
              <li>Then click Refresh or log in again.</li>
            </ul>
            <button type="button" className="btn" onClick={() => refresh()}>
              Try again
            </button>
          </div>
        ) : null}

        {!loading && guilds.length > 0 ? (
          <div className="server-grid" role="list">
            {guilds.map((g) => {
              const icon = guildIconUrl(g)
              return (
                <button
                  key={g.id}
                  type="button"
                  className="server-card"
                  role="listitem"
                  onClick={() => setSelectedId(g.id)}
                >
                  {icon ? (
                    <img className="server-icon" src={icon} alt="" width={48} height={48} />
                  ) : (
                    <Initial name={g.name} />
                  )}
                  <div className="server-card-meta">
                    <span className="server-card-name">{g.name}</span>
                    {g.owner ? <span className="badge badge-success">Owner</span> : null}
                  </div>
                </button>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}
