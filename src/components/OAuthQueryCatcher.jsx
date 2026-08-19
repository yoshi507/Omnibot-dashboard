import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function OAuthQueryCatcher() {
  const navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (!code) return
    const path = window.location.pathname
    window.history.replaceState({}, '', path)
    navigate(`/auth/callback?code=${encodeURIComponent(code)}`, { replace: true })
  }, [navigate])
  return null
}
