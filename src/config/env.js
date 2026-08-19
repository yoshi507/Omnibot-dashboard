import { PRODUCTION_API_URL, PRODUCTION_DASHBOARD_URL } from './site.js'

const DEFAULT_API = PRODUCTION_API_URL
const DEFAULT_CLIENT_ID = '1538542627882799155'

export const env = {
  appName: 'OmniBot Dashboard',
  discordClientId: import.meta.env.VITE_DISCORD_CLIENT_ID || DEFAULT_CLIENT_ID,
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL || DEFAULT_API).replace(/\/$/, ''),
  useMock: false,
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
  productionDashboardUrl: PRODUCTION_DASHBOARD_URL,
}
