import { env } from '../config/env'

export async function apiRequest(path, options = {}) {
  if (env.apiBaseUrl === undefined || env.apiBaseUrl === null) {
    const err = new Error('API base URL not configured')
    err.code = 'NO_API'
    throw err
  }

  const base = String(env.apiBaseUrl).replace(/\/$/, '')
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`

  if (
    base &&
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    base.startsWith('http://')
  ) {
    const err = new Error(
      'Cannot reach the OmniBot API from this HTTPS page over plain HTTP (mixed content). ' +
        'Open the dashboard on the OmniBot host (same origin), e.g. http://78.154.103.20:13893/'
    )
    err.code = 'MIXED_CONTENT'
    throw err
  }

  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  }
  const session = options.session
  if (session?.accessToken) headers.Authorization = `Bearer ${session.accessToken}`

  let res
  try {
    res = await fetch(url, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    })
  } catch (networkErr) {
    const err = new Error(
      networkErr?.message === 'Failed to fetch'
        ? 'Failed to reach the OmniBot API. Open the dashboard from the bot host URL (same origin) if you were using GitHub Pages.'
        : networkErr?.message || 'Network error'
    )
    err.code = 'NETWORK'
    throw err
  }

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
