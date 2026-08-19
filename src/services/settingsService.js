import { apiRequest } from './http'
import { getDefaults, getSettingById, validateSetting } from '../config/settingsRegistry'

export const settingsService = {
  async load(session, guildId) {
    return apiRequest(`/guilds/${guildId}/settings`, { session })
  },
  async save(session, guildId, patch) {
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
    return apiRequest(`/guilds/${guildId}/settings`, {
      method: 'PUT',
      session,
      body: { patch },
    })
  },
  async history(session, guildId) {
    return apiRequest(`/guilds/${guildId}/settings/history`, { session })
  },
  defaults: getDefaults,
}
