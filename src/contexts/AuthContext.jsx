import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/authService'
import { env } from '../config/env'

const AuthContext = createContext(null)

function loadSession() {
  try {
    const raw = localStorage.getItem(env.storageKeys.session)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.expiresAt && data.expiresAt < Date.now()) return null
    return data
  } catch { return null }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      if (session) localStorage.setItem(env.storageKeys.session, JSON.stringify(session))
      else localStorage.removeItem(env.storageKeys.session)
    } catch {}
  }, [session])

  const login = useCallback(() => {
    setError(null)
    if (env.useMock) {
      setLoading(true)
      authService.exchangeCode('mock').then(setSession).catch((e) => setError(e.message)).finally(() => setLoading(false))
      return
    }
    window.location.href = authService.getLoginUrl()
  }, [])

  const completeOAuth = useCallback(async (code) => {
    setLoading(true)
    setError(null)
    try {
      const s = await authService.exchangeCode(code)
      setSession(s)
      return s
    } catch (e) {
      setError(e.message || 'Login failed')
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    await authService.logout(session)
    setSession(null)
  }, [session])

  const value = useMemo(() => ({
    session,
    user: session?.user || null,
    isAuthenticated: Boolean(session?.accessToken),
    loading,
    error,
    login,
    logout,
    completeOAuth,
    isMock: env.useMock,
  }), [session, loading, error, login, logout, completeOAuth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth outside provider')
  return ctx
}
