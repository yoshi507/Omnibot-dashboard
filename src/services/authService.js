import { env } from '../config/env'
import { apiRequest } from './http'

export const authService = {
  getLoginUrl() {
    if (!env.discordClientId) {
      throw new Error(
        'Discord OAuth is not configured (missing VITE_DISCORD_CLIENT_ID).'
      )
    }
    if (!env.apiBaseUrl) {
      throw new Error('API base URL is not configured.')
    }
    const params = new URLSearchParams({
      client_id: env.discordClientId,
      response_type: 'code',
      scope: env.scopes.join(' '),
      redirect_uri: env.oauthRedirectUri,
    })
    return `https://discord.com/api/oauth2/authorize?${params}`
  },

  async exchangeCode(code) {
    if (!code || code === 'mock') {
      throw new Error('Invalid authorization code')
    }
    return apiRequest('/auth/callback', {
      method: 'POST',
      body: { code, redirectUri: env.oauthRedirectUri },
    })
  },

  async me(session) {
    return apiRequest('/auth/me', { session })
  },

  async logout(session) {
    try {
      await apiRequest('/auth/logout', { method: 'POST', session })
    } catch {}
  },
}
