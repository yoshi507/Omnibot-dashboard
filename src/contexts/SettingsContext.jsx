import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'
import { useServer } from './ServerContext'
import { settingsService } from '../services/settingsService'
import { getDefaults } from '../config/settingsRegistry'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const { session, user } = useAuth()
  const { selectedId } = useServer()
  const [saved, setSaved] = useState(getDefaults())
  const [draft, setDraft] = useState(getDefaults())
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [history, setHistory] = useState([])

  const load = useCallback(async () => {
    if (!selectedId || !session) return
    setLoading(true)
    setError(null)
    try {
      const data = await settingsService.load(session, selectedId)
      setSaved(data)
      setDraft(data)
      setHistory(await settingsService.history(session, selectedId))
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }, [selectedId, session])

  useEffect(() => { load() }, [load])

  const dirtyKeys = useMemo(() => Object.keys(draft).filter((k) => JSON.stringify(draft[k]) !== JSON.stringify(saved[k])), [draft, saved])
  const isDirty = dirtyKeys.length > 0
  const setValue = useCallback((id, value) => { setDraft((d) => ({ ...d, [id]: value })); setSuccess(null) }, [])
  const resetAll = useCallback(() => { setDraft(saved); setSuccess(null) }, [saved])

  const save = useCallback(async () => {
    if (!selectedId || !session || !isDirty) return
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const patch = {}
      for (const k of dirtyKeys) patch[k] = draft[k]
      const next = await settingsService.save(session, selectedId, patch, user)
      setSaved(next)
      setDraft(next)
      setSuccess(`Saved ${dirtyKeys.length} setting${dirtyKeys.length === 1 ? '' : 's'}`)
      setHistory(await settingsService.history(session, selectedId))
    } catch (e) { setError(e.message || 'Save failed') }
    finally { setSaving(false) }
  }, [selectedId, session, isDirty, dirtyKeys, draft, user])

  const value = useMemo(() => ({
    values: draft, saved, setValue, resetAll, save, load, loading, saving, error, success, isDirty, dirtyKeys, history,
  }), [draft, saved, setValue, resetAll, save, load, loading, saving, error, success, isDirty, dirtyKeys, history])

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings outside provider')
  return ctx
}
