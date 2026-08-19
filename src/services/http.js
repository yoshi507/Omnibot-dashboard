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
    const err = new Error('Session expired')
    err.code = 'UNAUTHORIZED'
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
