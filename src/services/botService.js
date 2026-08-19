import { env } from '../config/env'
import { apiRequest } from './http'
import { mockStore } from './mockStore'

export const botService = {
  async status(session, guildId) {
    if (env.useMock) return mockStore.getBotStatus(guildId)
    return apiRequest(`/guilds/${guildId}/bot`, { session })
  },
  async stats(session, guildId) {
    if (env.useMock) return mockStore.getStats(guildId)
    return apiRequest(`/guilds/${guildId}/stats`, { session })
  },
}
