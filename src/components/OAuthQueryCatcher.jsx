import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Discord OAuth returns ?code= on the static site root (no hash).
 * Forward that into the HashRouter callback route.
 */
export function OAuthQueryCatcher() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const mock = params.get('mock')
    if (!code && !mock) return

    const next = code
      ? `/auth/callback?code=${encodeURIComponent(code)}`
      : '/auth/callback?mock=1'

    const cleanPath = window.location.pathname + (window.location.hash || '')
    window.history.replaceState({}, document.title, cleanPath)
    navigate(next, { replace: true })
  }, [navigate])

  return null
}
