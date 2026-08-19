/**
 * Public frontend configuration only.
 * NEVER put bot tokens, client secrets, SESSION_SECRET, or API keys here.
 */
const DEFAULT_API = 'http://78.154.103.20:13893'

export const env = {
  appName: 'OmniBot Dashboard',
  discordClientId: import.meta.env.VITE_DISCORD_CLIENT_ID || '',
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL || DEFAULT_API).replace(/\/$/, ''),
  useMock: import.meta.env.VITE_USE_MOCK === 'true',
  oauthRedirectUri:
    import.meta.env.VITE_OAUTH_REDIRECT_URI ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}${import.meta.env.BASE_URL || '/'}`
      : 'https://yoshi507.github.io/Omnibot-dashboard/'),
  scopes: ['identify', 'guilds'],
  storageKeys: {
    theme: 'omnibot.theme',
    session: 'omnibot.session',
    selectedGuild: 'omnibot.selectedGuild',
    settingsDraft: 'omnibot.settingsDraft',
  },
  productionDashboardUrl: 'https://yoshi507.github.io/Omnibot-dashboard/#/login',
}
