import { env } from '../config/env'
import { apiRequest } from './http'
import { mockStore } from './mockStore'
import { getDefaults, getSettingById, validateSetting } from '../config/settingsRegistry'

export const settingsService = {
  async load(session, guildId) {
    if (env.useMock) return mockStore.getSettings(guildId)
    return apiRequest(`/guilds/${guildId}/settings`, { session })
  },
  async save(session, guildId, patch, user) {
    const errors = {}
    for (const [id, value] of Object.entries(patch)) {
      const result = validateSetting(getSettingById(id), value)
      if (!result.ok) errors[id] = result.error
    }
    if (Object.keys(errors).length) {
      const err = new Error('Validation failed')
      err.code = 'VALIDATION'
      err.errors = errors
      throw err
    }
    if (env.useMock) return mockStore.saveSettings(guildId, patch, user)
    return apiRequest(`/guilds/${guildId}/settings`, { method: 'PUT', session, body: { patch } })
  },
  async history(session, guildId) {
    if (env.useMock) return mockStore.getChangeLog(guildId)
    return apiRequest(`/guilds/${guildId}/settings/history`, { session })
  },
  defaults: getDefaults,
}
