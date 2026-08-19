import { getDefaults } from '../config/settingsRegistry'

const MOCK_USER = { id: '100000000000000001', username: 'DemoOwner', discriminator: '0', global_name: 'Demo Owner', avatar: null }
const MOCK_GUILDS = [
  { id: '200000000000000001', name: 'OmniBot Demo Server', icon: null, owner: true, permissions: '8', approximate_member_count: 128 },
  { id: '200000000000000002', name: 'Community Hub', icon: null, owner: false, permissions: '8', approximate_member_count: 540 },
]
const guildSettings = new Map()
const changeLog = new Map()
function ensureGuild(guildId) {
  if (!guildSettings.has(guildId)) {
    guildSettings.set(guildId, { ...getDefaults() })
    changeLog.set(guildId, [])
  }
}
function delay(ms) { return new Promise((r) => setTimeout(r, ms)) }
export const mockStore = {
  getUser: async () => ({ ...MOCK_USER }),
  getGuilds: async () => MOCK_GUILDS.map((g) => ({ ...g })),
  getSettings: async (guildId) => { ensureGuild(guildId); return { ...guildSettings.get(guildId) } },
  saveSettings: async (guildId, patch, user) => {
    ensureGuild(guildId)
    const next = { ...guildSettings.get(guildId), ...patch }
    guildSettings.set(guildId, next)
    const log = changeLog.get(guildId)
    log.unshift({ id: String(Date.now()), at: new Date().toISOString(), user: user?.username || 'dashboard', keys: Object.keys(patch) })
    changeLog.set(guildId, log.slice(0, 50))
    await delay(350)
    return { ...next }
  },
  getChangeLog: async (guildId) => { ensureGuild(guildId); return [...(changeLog.get(guildId) || [])] },
  getBotStatus: async (guildId) => ({ online: true, guildId, latencyMs: 42, uptimeSeconds: 86400, version: '1.0.0' }),
  getStats: async (guildId) => ({ guildId, members: MOCK_GUILDS.find((g) => g.id === guildId)?.approximate_member_count || 0, commandsToday: 18, aiUsedToday: 4, aiLimit: 20, warnings: 2 }),
  getChannels: async () => [
    { id: '3001', name: 'general', type: 0 }, { id: '3002', name: 'mod-logs', type: 0 }, { id: '3003', name: 'welcome', type: 0 }, { id: '3004', name: 'tickets', type: 0 }, { id: '3005', name: 'music', type: 2 },
  ],
  getRoles: async () => [
    { id: '4001', name: 'Admin', color: 0xe74c3c }, { id: '4002', name: 'Moderator', color: 0x3498db }, { id: '4003', name: 'Member', color: 0x95a5a6 }, { id: '4004', name: 'Muted', color: 0x7f8c8d },
  ],
}
