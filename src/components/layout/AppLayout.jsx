import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { SettingsProvider } from '../../contexts/SettingsContext'

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <SettingsProvider>
      <div className="app-shell">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="main">
          <Topbar onMenu={() => setMenuOpen(true)} />
          <main className="content"><Outlet /></main>
        </div>
      </div>
    </SettingsProvider>
  )
}
