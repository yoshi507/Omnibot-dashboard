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
  { id: 'appeals', label: 'Appeals', icon: '📝', path: '/features/appeals' },
  { id: 'quiz', label: 'Quizzes', icon: '🎯', path: '/features/quiz' },
]

export const SETTINGS = [
  { id: 'ai.enabled', label: 'Enable AI features', description: 'Allow AI commands for this server.', category: 'ai', type: 'boolean', default: true, dashboardSafe: true, path: 'ai.enabled' },
  { id: 'ai.dailyLimit', label: 'Daily AI request limit', description: 'Shared AI requests per server per day.', category: 'ai', type: 'number', default: 20, min: 1, max: 500, dashboardSafe: true, path: 'ai.dailyLimit' },
  { id: 'ai.memoryEnabled', label: 'Conversation memory', description: 'Remember recent /chat context.', category: 'ai', type: 'boolean', default: true, dashboardSafe: true, path: 'ai.memoryEnabled' },
  { id: 'ai.memoryMaxMessages', label: 'Memory message cap', description: 'Prior messages kept in chat memory.', category: 'ai', type: 'number', default: 12, min: 2, max: 40, dashboardSafe: true, path: 'ai.memoryMaxMessages' },
  { id: 'ai.naturalInvocation', label: 'Natural name invocation', description: 'Respond when users mention omni/omnibot.', category: 'ai', type: 'boolean', default: true, dashboardSafe: true, path: 'ai.naturalInvocation' },
  { id: 'ai.commandPrefix', label: 'Text command prefix', description: 'Prefix for text commands (e.g. !ping).', category: 'commands', type: 'string', default: '!', dashboardSafe: true, path: 'commands.prefix' },
  { id: 'security.enabled', label: 'AI security monitoring', description: 'Raid analysis and anti-nuke monitoring.', category: 'security', type: 'boolean', default: false, dashboardSafe: true, path: 'security.enabled' },
  { id: 'security.mode', label: 'Security mode', description: 'monitor, alert, or lockdown.', category: 'security', type: 'select', default: 'monitor', options: [{ value: 'monitor', label: 'Monitor' }, { value: 'alert', label: 'Alert' }, { value: 'lockdown', label: 'Lockdown' }], dashboardSafe: true, path: 'security.mode' },
  { id: 'moderation.automodEnabled', label: 'Auto-moderation', description: 'Enable basic automod filters.', category: 'moderation', type: 'boolean', default: false, dashboardSafe: true, path: 'automod.enabled' },
  { id: 'moderation.modLogChannel', label: 'Mod log channel', description: 'Where moderation actions are logged.', category: 'moderation', type: 'channel', default: null, dashboardSafe: true, path: 'settings.modLogChannel' },
  { id: 'leveling.enabled', label: 'Enable leveling', description: 'XP and ranks.', category: 'leveling', type: 'boolean', default: true, dashboardSafe: true, path: 'levelSettings.enabled' },
  { id: 'welcome.enabled', label: 'Welcome messages', description: 'Greet new members.', category: 'welcome', type: 'boolean', default: false, dashboardSafe: true, path: 'welcomeSettings.enabled' },
  { id: 'welcome.channel', label: 'Welcome channel', description: 'Channel for welcomes.', category: 'welcome', type: 'channel', default: null, dashboardSafe: true, path: 'welcomeSettings.channelId' },
  { id: 'welcome.message', label: 'Welcome message', description: 'Supports {user} {server} {membercount}.', category: 'welcome', type: 'string', default: 'Welcome {user} to {server}!', dashboardSafe: true, path: 'welcomeSettings.message' },
  { id: 'goodbye.enabled', label: 'Goodbye messages', description: 'Message when members leave.', category: 'welcome', type: 'boolean', default: false, dashboardSafe: true, path: 'goodbyeSettings.enabled' },
  { id: 'goodbye.channel', label: 'Goodbye channel', description: 'Channel for goodbyes.', category: 'welcome', type: 'channel', default: null, dashboardSafe: true, path: 'goodbyeSettings.channelId' },
  { id: 'logging.enabled', label: 'Server logging', description: 'Log joins, leaves, deletes.', category: 'logging', type: 'boolean', default: false, dashboardSafe: true, path: 'logging.enabled' },
  { id: 'logging.channel', label: 'Log channel', description: 'Where logs are sent.', category: 'logging', type: 'channel', default: null, dashboardSafe: true, path: 'logging.channelId' },
  { id: 'tickets.enabled', label: 'Tickets', description: 'Support ticket system.', category: 'tickets', type: 'boolean', default: false, dashboardSafe: true, path: 'ticketSettings.enabled' },
  { id: 'tickets.panelChannel', label: 'Ticket panel channel', description: 'Channel with ticket button.', category: 'tickets', type: 'channel', default: null, dashboardSafe: true, path: 'ticketSettings.panelChannelId' },
  { id: 'music.enabled', label: 'Music commands', description: 'Voice playback features.', category: 'music', type: 'boolean', default: true, dashboardSafe: true, path: 'music.enabled' },
  { id: 'deadchat.enabled', label: 'Dead chat revival', description: 'Prompt after inactivity.', category: 'deadchat', type: 'boolean', default: false, dashboardSafe: true, path: 'deadChat.enabled' },
  { id: 'deadchat.minutes', label: 'Inactivity minutes', description: 'Quiet time before revival.', category: 'deadchat', type: 'number', default: 30, min: 5, max: 1440, dashboardSafe: true, path: 'deadChat.minutes' },
  { id: 'server.suggestionsChannel', label: 'Suggestions channel', description: 'Where /suggest posts go.', category: 'server', type: 'channel', default: null, dashboardSafe: true, path: 'settings.suggestionsChannel' },
  { id: 'server.announcementRole', label: 'Announcement ping role', description: 'Optional announce mention role.', category: 'server', type: 'role', default: null, dashboardSafe: true, path: 'settings.announcementRole' },
  { id: 'appeals.enabled', label: 'Enable appeals', description: 'Allow users to submit ban/timeout appeals with the default form.', category: 'appeals', type: 'boolean', default: false, dashboardSafe: true, path: 'appeals.enabled' },
  { id: 'appeals.channel', label: 'Appeal notification channel', description: 'Where new appeals are posted for staff.', category: 'appeals', type: 'channel', default: null, dashboardSafe: true, path: 'appeals.channelId' },
  { id: 'appeals.staffRoles', label: 'Staff reviewer roles', description: 'Roles that can review appeals.', category: 'appeals', type: 'multiselect', optionsSource: 'roles', default: [], dashboardSafe: true, path: 'appeals.staffRoleIds' },
  { id: 'appeals.cooldownHours', label: 'Appeal cooldown (hours)', description: 'Minimum time between closed appeals for the same user.', category: 'appeals', type: 'number', default: 72, min: 1, max: 720, dashboardSafe: true, path: 'appeals.cooldownHours' },
  { id: 'appeals.acceptMessage', label: 'Acceptance message', description: 'DM text when an appeal is accepted.', category: 'appeals', type: 'string', default: 'Your appeal has been accepted.', dashboardSafe: true, path: 'appeals.acceptMessage' },
  { id: 'appeals.rejectMessage', label: 'Rejection message', description: 'DM text when an appeal is rejected.', category: 'appeals', type: 'string', default: 'Your appeal has been rejected.', dashboardSafe: true, path: 'appeals.rejectMessage' },
  { id: 'appeals.pendingMessage', label: 'Submission confirmation', description: 'Shown after a user submits an appeal.', category: 'appeals', type: 'string', default: 'Your appeal was submitted and is awaiting review.', dashboardSafe: true, path: 'appeals.pendingMessage' },
  { id: 'appeals.logEnabled', label: 'Appeal logging', description: 'Keep permanent appeal records.', category: 'appeals', type: 'boolean', default: true, dashboardSafe: true, path: 'appeals.logEnabled' },
  { id: 'quiz.enabled', label: 'Enable quizzes', description: 'Allow /quiz start and related commands.', category: 'quiz', type: 'boolean', default: true, dashboardSafe: true, path: 'quiz.enabled' },
  { id: 'quiz.channel', label: 'Quiz channel', description: 'Optional channel restriction for quizzes.', category: 'quiz', type: 'channel', default: null, dashboardSafe: true, path: 'quiz.channelId' },
  { id: 'quiz.questionCount', label: 'Default question count', description: 'Questions per quiz when not specified.', category: 'quiz', type: 'number', default: 5, min: 1, max: 20, dashboardSafe: true, path: 'quiz.questionCount' },
  { id: 'quiz.timeLimitSeconds', label: 'Seconds per question', description: 'Answer window for each question.', category: 'quiz', type: 'number', default: 20, min: 5, max: 120, dashboardSafe: true, path: 'quiz.timeLimitSeconds' },
  { id: 'quiz.pointsCorrect', label: 'Points per correct answer', description: 'Base score for a correct answer.', category: 'quiz', type: 'number', default: 10, min: 1, max: 100, dashboardSafe: true, path: 'quiz.pointsCorrect' },
  { id: 'quiz.streakBonus', label: 'Streak bonus points', description: 'Extra points for consecutive correct answers.', category: 'quiz', type: 'number', default: 2, min: 0, max: 50, dashboardSafe: true, path: 'quiz.streakBonus' },
  { id: 'quiz.cooldownSeconds', label: 'Start cooldown (seconds)', description: 'Cooldown before the same user starts another quiz.', category: 'quiz', type: 'number', default: 30, min: 0, max: 600, dashboardSafe: true, path: 'quiz.cooldownSeconds' },
  { id: 'quiz.rewardsEnabled', label: 'Coin rewards', description: 'Award OmniCoins based on quiz points.', category: 'quiz', type: 'boolean', default: true, dashboardSafe: true, path: 'quiz.rewardsEnabled' },
  { id: 'quiz.leaderboardEnabled', label: 'Leaderboards', description: 'Show /quiz leaderboard.', category: 'quiz', type: 'boolean', default: true, dashboardSafe: true, path: 'quiz.leaderboardEnabled' },
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
