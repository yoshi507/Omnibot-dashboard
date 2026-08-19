import { env } from '../config/env'

export async function apiRequest(path, options = {}) {
  if (!env.apiBaseUrl) {
    const err = new Error('API base URL not configured')
    err.code = 'NO_API'
    throw err
  }
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  }
  const session = options.session
  if (session?.accessToken) headers.Authorization = `Bearer ${session.accessToken}`
  const res = await fetch(`${env.apiBaseUrl.replace(/\/$/, '')}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  if (res.status === 401) {
    try {
      localStorage.removeItem(env.storageKeys.session)
      localStorage.removeItem(env.storageKeys.selectedGuild)
    } catch {}
    const err = new Error('Your session expired. Please log in again.')
    err.code = 'UNAUTHORIZED'
    if (typeof window !== 'undefined' && !window.location.hash.includes('/login')) {
      window.location.hash = '#/login?reason=session_expired'
    }
    throw err
  }
  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.message) message = data.message
    } catch {}
    const err = new Error(message)
    err.code = 'HTTP_ERROR'
    err.status = res.status
    throw err
  }
  if (res.status === 204) return null
  return res.json()
}
