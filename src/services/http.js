import { env } from '../config/env'

export async function apiRequest(path, options = {}) {
  if (!env.apiBaseUrl) {
    const err = new Error('API base URL not configured')
    err.code = 'NO_API'
    throw err
  }

  const base = env.apiBaseUrl.replace(/\/$/, '')
  const url = `${base}${path}`

  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    base.startsWith('http://')
  ) {
    const err = new Error(
      'Cannot reach the OmniBot API from this HTTPS page over plain HTTP (browser mixed-content block). ' +
        'Use the same-origin dashboard on the API host (http://78.154.103.20:13893/) or put the API behind HTTPS.'
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
        ? 'Failed to fetch the OmniBot API. If you are on GitHub Pages (HTTPS), the browser may block HTTP API calls. Open the dashboard via the API host or enable HTTPS on the API.'
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
