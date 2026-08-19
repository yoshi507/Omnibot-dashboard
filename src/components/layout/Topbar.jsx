import { useAuth } from '../../contexts/AuthContext'
import { useServer } from '../../contexts/ServerContext'
import { useTheme } from '../../contexts/ThemeContext'

export function Topbar({ onMenu }) {
  const { user, logout, isMock } = useAuth()
  const { guilds, selectedId, setSelectedId, selected, clearSelection } = useServer()
  const { theme, toggle } = useTheme()
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button type="button" className="btn btn-ghost mobile-menu-btn" onClick={onMenu} aria-label="Open menu">
          ☰
        </button>
        <select
          className="select"
          style={{ minWidth: 160 }}
          value={selectedId || ''}
          onChange={(e) => setSelectedId(e.target.value)}
          aria-label="Select server"
        >
          {guilds.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        {selected ? <span className="badge badge-success">Manage access</span> : null}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {isMock ? <span className="badge badge-warning">Mock mode</span> : null}
        <button type="button" className="btn btn-ghost" onClick={toggle} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        {guilds.length > 1 ? (
          <button type="button" className="btn btn-ghost" onClick={() => clearSelection()}>
            Switch server
          </button>
        ) : null}
        <span className="muted" style={{ fontSize: '0.9rem' }}>
          {user?.global_name || user?.username || 'User'}
        </span>
        <button type="button" className="btn btn-secondary" onClick={logout}>
          Log out
        </button>
      </div>
    </header>
  )
}
