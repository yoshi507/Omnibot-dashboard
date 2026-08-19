import { env } from '../config/env'
import { apiRequest } from './http'
import { mockStore } from './mockStore'

function canManage(permissions) {
  try {
    const p = BigInt(permissions)
    return (p & 8n) === 8n || (p & 32n) === 32n
  } catch { return false }
}

export const serverService = {
  async listManagedGuilds(session) {
    const guilds = env.useMock ? await mockStore.getGuilds() : await apiRequest('/guilds', { session })
    return (guilds || []).filter((g) => g.owner || canManage(g.permissions))
  },
  async getGuild(session, guildId) {
    if (env.useMock) {
      const all = await mockStore.getGuilds()
      return all.find((g) => g.id === guildId) || null
    }
    return apiRequest(`/guilds/${guildId}`, { session })
  },
  async getChannels(session, guildId) {
    if (env.useMock) return mockStore.getChannels()
    return apiRequest(`/guilds/${guildId}/channels`, { session })
  },
  async getRoles(session, guildId) {
    if (env.useMock) return mockStore.getRoles()
    return apiRequest(`/guilds/${guildId}/roles`, { session })
  },
}
