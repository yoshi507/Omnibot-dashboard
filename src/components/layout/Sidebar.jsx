import { NavLink } from 'react-router-dom'
import { CATEGORIES } from '../../config/settingsRegistry'
import { AddToDiscordButton } from '../AddToDiscordButton'

export function Sidebar({ open, onClose }) {
  return (
    <>
      {open ? <div className="backdrop" onClick={onClose} aria-hidden /> : null}
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
        <div className="sidebar-brand">
          <span aria-hidden style={{ fontSize: '1.4rem' }}>
            🤖
          </span>
          <div>
            <div>OmniBot</div>
            <div className="muted" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
              Dashboard
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {CATEGORIES.map((c) => (
            <NavLink
              key={c.id}
              to={c.path}
              end={c.path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span aria-hidden>{c.icon}</span>
              <span>{c.label}</span>
            </NavLink>
          ))}
          <a className="nav-item" href="#/appeals" onClick={onClose}>
            <span aria-hidden>📨</span>
            <span>Appeals (public)</span>
          </a>
        </nav>
        <div style={{ padding: '0.75rem 1rem 1.25rem' }}>
          <AddToDiscordButton className="btn" style={{ width: '100%' }} />
        </div>
      </aside>
    </>
  )
}
