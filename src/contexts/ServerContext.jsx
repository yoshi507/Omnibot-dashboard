import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'
import { serverService } from '../services/serverService'
import { env } from '../config/env'

const ServerContext = createContext(null)

export function ServerProvider({ children }) {
  const { session, isAuthenticated } = useAuth()
  const [guilds, setGuilds] = useState([])
  const [selectedId, setSelectedId] = useState(() => { try { return localStorage.getItem(env.storageKeys.selectedGuild) || null } catch { return null } })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [channels, setChannels] = useState([])
  const [roles, setRoles] = useState([])

  const refresh = useCallback(async () => {
    if (!isAuthenticated) { setGuilds([]); return }
    setLoading(true)
    setError(null)
    try {
      const list = await serverService.listManagedGuilds(session)
      setGuilds(list)
      if (selectedId && !list.some((g) => g.id === selectedId)) setSelectedId(list[0]?.id || null)
      else if (!selectedId && list[0]) setSelectedId(list[0].id)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }, [isAuthenticated, session, selectedId])

  useEffect(() => { refresh() }, [isAuthenticated])
  useEffect(() => { try { if (selectedId) localStorage.setItem(env.storageKeys.selectedGuild, selectedId) } catch {} }, [selectedId])
  useEffect(() => {
    if (!selectedId || !session) { setChannels([]); setRoles([]); return }
    Promise.all([serverService.getChannels(session, selectedId), serverService.getRoles(session, selectedId)])
      .then(([c, r]) => { setChannels(c || []); setRoles(r || []) })
      .catch(() => { setChannels([]); setRoles([]) })
  }, [selectedId, session])

  const selected = useMemo(() => guilds.find((g) => g.id === selectedId) || null, [guilds, selectedId])
  const value = useMemo(() => ({ guilds, selected, selectedId, setSelectedId, loading, error, refresh, channels, roles }), [guilds, selected, selectedId, loading, error, refresh, channels, roles])
  return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>
}

export function useServer() {
  const ctx = useContext(ServerContext)
  if (!ctx) throw new Error('useServer outside provider')
  return ctx
}
