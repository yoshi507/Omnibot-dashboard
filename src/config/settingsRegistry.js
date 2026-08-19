export const CATEGORIES = [
  { id: 'overview', label: 'Overview', icon: '🏠', path: '/' },
  { id: 'ai', label: 'AI', icon: '🧠', path: '/features/ai' },
  { id: 'security', label: 'Security', icon: '🛡️', path: '/features/security' },
  { id: 'moderation', label: 'Moderation', icon: '⚖️', path: '/features/moderation' },
  { id: 'leveling', label: 'Leveling', icon: '📈', path: '/features/leveling' },
  { id: 'welcome', label: 'Welcome & Goodbye', icon: '👋', path: '/features/welcome' },
  { id: 'logging', label: 'Logging', icon: '📋', path: '/features/logging' },
  { id: 'tickets', label: 'Tickets', icon: '🎫', path: '/features/tickets' },
  { id: 'music', label: 'Music', icon: '🎵', path: '/features/music' },
  { id: 'deadchat', label: 'Dead Chat', icon: '💬', path: '/features/deadchat' },
  { id: 'translation', label: 'Translation', icon: '🌍', path: '/features/translation' },
  { id: 'commands', label: 'Commands', icon: '⌨️', path: '/features/commands' },
  { id: 'server', label: 'Server Settings', icon: '⚙️', path: '/features/server' },
]

export const SETTINGS = [
  { id: 'ai.enabled', label: 'Enable AI features', description: 'Allow AI commands for this server.', category: 'ai', type: 'boolean', default: true, dashboardSafe: true, path: 'ai.enabled' },
  { id: 'ai.dailyLimit', label: 'Daily AI request limit', description: 'Shared AI requests per server per day.', category: 'ai', type: 'number', default: 20, min: 1, max: 500, dashboardSafe: true, path: 'ai.dailyLimit' },
  { id: 'ai.memoryEnabled', label: 'Conversation memory', description: 'Remember recent /chat context.', category: 'ai', type: 'boolean', default: true, dashboardSafe: true, path: 'ai.memoryEnabled' },
  { id: 'ai.memoryMaxMessages', label: 'Memory message cap', description: 'Prior messages kept in chat memory.', category: 'ai', type: 'number', default: 12, min: 2, max: 40, dashboardSafe: true, path: 'ai.memoryMaxMessages' },
  { id: 'ai.naturalInvocation', label: 'Natural name invocation', description: 'Respond when users mention omni/omnibot.', category: 'ai', type: 'boolean', default: true, dashboardSafe: true, path: 'ai.naturalInvocation' },
  { id: 'ai.commandPrefix', label: 'Text command prefix', description: 'Prefix for text commands (e.g. !ping).', category: 'commands', type: 'string', default: '!', dashboardSafe: true, path: 'commands.prefix' },
  { id: 'security.enabled', label: 'AI security monitoring', description: 'Raid analysis and anti-nuke monitoring.', category: 'security', type: 'boolean', default: false, dashboardSafe: true, path: 'security.enabled' },
  { id: 'security.mode', label: 'Security mode', description: 'monitor / alert / lockdown.', category: 'security', type: 'select', default: 'monitor', options: [{ value: 'monitor', label: 'Monitor' }, { value: 'alert', label: 'Alert' }, { value: 'lockdown', label: 'Lockdown' }], dashboardSafe: true, path: 'security.mode' },
  { id: 'security.autoTimeoutExecutor', label: 'Timeout suspected executor', description: 'Optional anti-nuke timeout (no auto-ban by default).', category: 'security', type: 'boolean', default: false, dashboardSafe: true, path: 'security.antiNuke.autoTimeoutExecutor' },
  { id: 'security.autoTimeoutMinutes', label: 'Timeout duration (minutes)', description: 'Optional executor timeout length.', category: 'security', type: 'number', default: 10, min: 1, max: 60, dashboardSafe: true, path: 'security.antiNuke.autoTimeoutMinutes' },
  { id: 'security.thresholdChannelDelete', label: 'Channel delete threshold', description: 'Mass channel deletes in the window.', category: 'security', type: 'number', default: 3, min: 1, max: 20, dashboardSafe: true, path: 'security.antiNuke.thresholds.channelDelete' },
  { id: 'security.thresholdRoleDelete', label: 'Role delete threshold', description: 'Mass role deletes in the window.', category: 'security', type: 'number', default: 3, min: 1, max: 20, dashboardSafe: true, path: 'security.antiNuke.thresholds.roleDelete' },
  { id: 'security.windowSeconds', label: 'Detection window (seconds)', description: 'Window for counting destructive actions.', category: 'security', type: 'number', default: 30, min: 5, max: 300, dashboardSafe: true, path: 'security.antiNuke.windowMs' },
  { id: 'moderation.automodEnabled', label: 'AutoMod', description: 'Filter blocked words and invites.', category: 'moderation', type: 'boolean', default: false, dashboardSafe: true, path: 'automod.enabled' },
  { id: 'moderation.blockedWords', label: 'Blocked words', description: 'Comma-separated list.', category: 'moderation', type: 'textarea', default: '', dashboardSafe: true, path: 'automod.blockedWords' },
  { id: 'moderation.modLogChannel', label: 'Mod log channel', description: 'Channel for moderation actions.', category: 'moderation', type: 'channel', default: null, dashboardSafe: true, path: 'settings.modLogChannel' },
  { id: 'moderation.antiSpamEnabled', label: 'Anti-spam', description: 'Detect rapid repeated messages.', category: 'moderation', type: 'boolean', default: true, dashboardSafe: true, path: 'spam.enabled' },
  { id: 'leveling.enabled', label: 'Leveling system', description: 'Award XP for chat activity.', category: 'leveling', type: 'boolean', default: true, dashboardSafe: true, path: 'levelSettings.enabled' },
  { id: 'leveling.xpMin', label: 'Minimum XP per message', description: 'Lower XP bound.', category: 'leveling', type: 'number', default: 15, min: 1, max: 100, dashboardSafe: true, path: 'levelSettings.xpMin' },
  { id: 'leveling.xpMax', label: 'Maximum XP per message', description: 'Upper XP bound.', category: 'leveling', type: 'number', default: 25, min: 1, max: 200, dashboardSafe: true, path: 'levelSettings.xpMax' },
  { id: 'leveling.cooldownSeconds', label: 'XP cooldown (seconds)', description: 'Time between XP awards.', category: 'leveling', type: 'number', default: 60, min: 0, max: 600, dashboardSafe: true, path: 'levelSettings.cooldown' },
  { id: 'leveling.announceLevelUp', label: 'Announce level-ups', description: 'Post on level up.', category: 'leveling', type: 'boolean', default: true, dashboardSafe: true, path: 'levelSettings.announce' },
  { id: 'welcome.enabled', label: 'Welcome messages', description: 'Greet new members.', category: 'welcome', type: 'boolean', default: false, dashboardSafe: true, path: 'welcomeSettings.enabled' },
  { id: 'welcome.channel', label: 'Welcome channel', description: 'Where welcome messages go.', category: 'welcome', type: 'channel', default: null, dashboardSafe: true, path: 'welcomeSettings.channelId' },
  { id: 'welcome.message', label: 'Welcome message', description: '{user} {username} {server} {membercount}', category: 'welcome', type: 'textarea', default: 'Welcome {user} to {server}!', dashboardSafe: true, path: 'welcomeSettings.message' },
  { id: 'goodbye.enabled', label: 'Goodbye messages', description: 'Announce leaves.', category: 'welcome', type: 'boolean', default: false, dashboardSafe: true, path: 'goodbyeSettings.enabled' },
  { id: 'goodbye.channel', label: 'Goodbye channel', description: 'Where goodbye messages go.', category: 'welcome', type: 'channel', default: null, dashboardSafe: true, path: 'goodbyeSettings.channelId' },
  { id: 'goodbye.message', label: 'Goodbye message', description: 'Supports the same placeholders.', category: 'welcome', type: 'textarea', default: '{username} left {server}.', dashboardSafe: true, path: 'goodbyeSettings.message' },
  { id: 'autorole.enabled', label: 'Autorole', description: 'Assign a role on join.', category: 'welcome', type: 'boolean', default: false, dashboardSafe: true, path: 'autorole.enabled' },
  { id: 'autorole.role', label: 'Autorole role', description: 'Role granted on join.', category: 'welcome', type: 'role', default: null, dashboardSafe: true, path: 'autorole.roleId' },
  { id: 'logging.enabled', label: 'Event logging', description: 'Log joins, leaves, deletes.', category: 'logging', type: 'boolean', default: false, dashboardSafe: true, path: 'logging.enabled' },
  { id: 'logging.channel', label: 'Log channel', description: 'Event log destination.', category: 'logging', type: 'channel', default: null, dashboardSafe: true, path: 'logging.channelId' },
  { id: 'tickets.enabled', label: 'Ticket system', description: 'Member support tickets.', category: 'tickets', type: 'boolean', default: false, dashboardSafe: true, path: 'ticketSettings.enabled' },
  { id: 'tickets.panelChannel', label: 'Panel channel', description: 'Ticket panel channel.', category: 'tickets', type: 'channel', default: null, dashboardSafe: true, path: 'ticketSettings.panelChannelId' },
  { id: 'tickets.staffRoles', label: 'Staff roles', description: 'Roles that manage tickets.', category: 'tickets', type: 'multiselect', default: [], optionsSource: 'roles', dashboardSafe: true, path: 'ticketSettings.staffRoleIds' },
  { id: 'music.enabled', label: 'Music commands', description: 'Voice playback features.', category: 'music', type: 'boolean', default: true, dashboardSafe: true, path: 'music.enabled' },
  { id: 'music.defaultVolume', label: 'Default volume', description: '0–100.', category: 'music', type: 'number', default: 80, min: 0, max: 100, dashboardSafe: true, path: 'music.defaultVolume' },
  { id: 'deadchat.enabled', label: 'Dead chat revival', description: 'Prompt after inactivity.', category: 'deadchat', type: 'boolean', default: false, dashboardSafe: true, path: 'deadChat.enabled' },
  { id: 'deadchat.minutes', label: 'Inactivity minutes', description: 'Quiet time before revival.', category: 'deadchat', type: 'number', default: 30, min: 5, max: 1440, dashboardSafe: true, path: 'deadChat.minutes' },
  { id: 'translation.note', label: 'Per-channel auto-translate', description: 'Use /autotranslate in Discord; dashboard sync needs backend.', category: 'translation', type: 'boolean', default: false, dashboardSafe: true, path: 'translation.dashboardHint' },
  { id: 'server.suggestionsChannel', label: 'Suggestions channel', description: 'Where /suggest posts go.', category: 'server', type: 'channel', default: null, dashboardSafe: true, path: 'settings.suggestionsChannel' },
  { id: 'server.announcementRole', label: 'Announcement ping role', description: 'Optional announce mention role.', category: 'server', type: 'role', default: null, dashboardSafe: true, path: 'settings.announcementRole' },
]

export function getSettingsByCategory(categoryId) {
  return SETTINGS.filter((s) => s.category === categoryId && s.dashboardSafe !== false)
}
export function getSettingById(id) {
  return SETTINGS.find((s) => s.id === id)
}
export function getDefaults() {
  const out = {}
  for (const s of SETTINGS) out[s.id] = s.default
  return out
}
export function validateSetting(def, value) {
  if (!def) return { ok: false, error: 'Unknown setting' }
  if (def.type === 'number') {
    const n = Number(value)
    if (Number.isNaN(n)) return { ok: false, error: 'Must be a number' }
    if (def.min != null && n < def.min) return { ok: false, error: `Min ${def.min}` }
    if (def.max != null && n > def.max) return { ok: false, error: `Max ${def.max}` }
  }
  if (def.type === 'select' && def.options && !def.options.some((o) => o.value === value)) {
    return { ok: false, error: 'Invalid option' }
  }
  return { ok: true }
}
