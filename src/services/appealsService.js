import { apiRequest } from './http'

export const appealsService = {
  listGuilds(session) {
    return apiRequest('/appeals/guilds', { session })
  },
  getForm(session, guildId) {
    return apiRequest(`/appeals/guilds/${guildId}/form`, { session })
  },
  submit(session, guildId, answers) {
    return apiRequest(`/appeals/guilds/${guildId}/submit`, {
      method: 'POST',
      session,
      body: { answers },
    })
  },
  mine(session) {
    return apiRequest('/appeals/mine', { session })
  },
}
