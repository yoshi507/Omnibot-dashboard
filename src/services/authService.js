import { env } from '../config/env'
import { apiRequest } from './http'
import { mockStore } from './mockStore'

export const authService = {
  getLoginUrl() {
    if (env.useMock) return `${env.oauthRedirectUri}?mock=1`
    if (!env.discordClientId) throw new Error('VITE_DISCORD_CLIENT_ID is not set')
    const params = new URLSearchParams({
      client_id: env.discordClientId,
      response_type: 'code',
      scope: env.scopes.join(' '),
      redirect_uri: env.oauthRedirectUri,
      prompt: 'none',
    })
    return `https://discord.com/api/oauth2/authorize?${params}`
  },
  async exchangeCode(code) {
    if (env.useMock || code === 'mock') {
      const user = await mockStore.getUser()
      return { accessToken: 'mock-session-token', expiresAt: Date.now() + 7 * 24 * 3600 * 1000, user }
    }
    return apiRequest('/auth/callback', { method: 'POST', body: { code, redirectUri: env.oauthRedirectUri } })
  },
  async me(session) {
    if (env.useMock) return mockStore.getUser()
    return apiRequest('/auth/me', { session })
  },
  async logout(session) {
    if (env.useMock) return
    try { await apiRequest('/auth/logout', { method: 'POST', session }) } catch {}
  },
}
