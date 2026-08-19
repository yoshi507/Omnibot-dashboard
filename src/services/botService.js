import { apiRequest } from './http'

export const botService = {
  async status(session, guildId) {
    return apiRequest(`/guilds/${guildId}/bot`, { session })
  },
  async stats(session, guildId) {
    return apiRequest(`/guilds/${guildId}/stats`, { session })
  },
}
