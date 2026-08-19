import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useServer } from '../../contexts/ServerContext'
import { ServerSelectPage } from '../../pages/ServerSelectPage'

export function AppLayout() {
  const [open, setOpen] = useState(false)
  const { needsServerSelection, loading, loadedOnce } = useServer()

  if (!loadedOnce && loading) {
    return (
      <div className="login-page">
        <div className="card">Loading your servers…</div>
      </div>
    )
  }

  if (needsServerSelection) {
    return <ServerSelectPage />
  }

  return (
    <div className="app-shell">
      {open ? <div className="backdrop" onClick={() => setOpen(false)} aria-hidden /> : null}
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="main">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
