import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'
import { serverService } from '../services/serverService'
import { env } from '../config/env'

const ServerContext = createContext(null)

export function ServerProvider({ children }) {
  const { session, isAuthenticated } = useAuth()
  const [guilds, setGuilds] = useState([])
  const [selectedId, setSelectedId] = useState(() => {
    try {
      return localStorage.getItem(env.storageKeys.selectedGuild) || null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [channels, setChannels] = useState([])
  const [roles, setRoles] = useState([])
  const [loadedOnce, setLoadedOnce] = useState(false)

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setGuilds([])
      setLoadedOnce(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const list = await serverService.listManagedGuilds(session)
      setGuilds(list || [])

      setSelectedId((prev) => {
        const stillValid = prev && (list || []).some((g) => g.id === prev)
        if (stillValid) return prev
        if ((list || []).length === 1) return list[0].id
        return null
      })
    } catch (e) {
      setError(e.message || 'Failed to load servers')
      setGuilds([])
    } finally {
      setLoading(false)
      setLoadedOnce(true)
    }
  }, [isAuthenticated, session])

  useEffect(() => {
    refresh()
  }, [isAuthenticated])

  useEffect(() => {
    try {
      if (selectedId) localStorage.setItem(env.storageKeys.selectedGuild, selectedId)
      else localStorage.removeItem(env.storageKeys.selectedGuild)
    } catch {}
  }, [selectedId])

  useEffect(() => {
    if (!selectedId || !session) {
      setChannels([])
      setRoles([])
      return
    }
    Promise.all([serverService.getChannels(session, selectedId), serverService.getRoles(session, selectedId)])
      .then(([c, r]) => {
        setChannels(c || [])
        setRoles(r || [])
      })
      .catch(() => {
        setChannels([])
        setRoles([])
      })
  }, [selectedId, session])

  const selected = useMemo(() => guilds.find((g) => g.id === selectedId) || null, [guilds, selectedId])

  const needsServerSelection = useMemo(() => {
    if (!isAuthenticated) return false
    if (!loadedOnce && loading) return false
    if (selectedId && selected) return false
    return true
  }, [isAuthenticated, loadedOnce, loading, selectedId, selected])

  const value = useMemo(
    () => ({
      guilds,
      selected,
      selectedId,
      setSelectedId,
      loading,
      error,
      refresh,
      channels,
      roles,
      needsServerSelection,
      loadedOnce,
      clearSelection: () => setSelectedId(null),
    }),
    [guilds, selected, selectedId, loading, error, refresh, channels, roles, needsServerSelection, loadedOnce]
  )

  return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>
}

export function useServer() {
  const ctx = useContext(ServerContext)
  if (!ctx) throw new Error('useServer outside provider')
  return ctx
}
