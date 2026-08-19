import { apiRequest } from './http'

export const serverService = {
  async listManagedGuilds(session) {
    const guilds = await apiRequest('/guilds', { session })
    return Array.isArray(guilds) ? guilds : []
  },
  async getGuild(session, guildId) {
    return apiRequest(`/guilds/${guildId}`, { session })
  },
  async getChannels(session, guildId) {
    return apiRequest(`/guilds/${guildId}/channels`, { session })
  },
  async getRoles(session, guildId) {
    return apiRequest(`/guilds/${guildId}/roles`, { session })
  },
}
