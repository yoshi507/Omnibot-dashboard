import { PRODUCTION_API_URL, GITHUB_PAGES_DASHBOARD_URL } from './site.js'

const DEFAULT_CLIENT_ID = '1538542627882799155'

function resolveApiBase() {
  if (import.meta.env.VITE_API_BASE_URL === '') return ''
  if (import.meta.env.VITE_API_BASE_URL != null && import.meta.env.VITE_API_BASE_URL !== undefined) {
    const v = String(import.meta.env.VITE_API_BASE_URL).trim()
    if (v === '' || v === '/') return ''
    return v.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    if (host && host !== 'yoshi507.github.io' && !host.endsWith('.github.io')) {
      return ''
    }
  }
  return String(PRODUCTION_API_URL || '').replace(/\/$/, '')
}

export const env = {
  appName: 'OmniBot Dashboard',
  discordClientId: import.meta.env.VITE_DISCORD_CLIENT_ID || DEFAULT_CLIENT_ID,
  apiBaseUrl: resolveApiBase(),
  useMock: false,
  oauthRedirectUri:
    import.meta.env.VITE_OAUTH_REDIRECT_URI ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}/`
      : 'http://78.154.103.20:13893/'),
  scopes: ['identify', 'guilds'],
  storageKeys: {
    theme: 'omnibot.theme',
    session: 'omnibot.session',
    selectedGuild: 'omnibot.selectedGuild',
    settingsDraft: 'omnibot.settingsDraft',
  },
  productionDashboardUrl:
    typeof window !== 'undefined'
      ? `${window.location.origin}/#/login`
      : GITHUB_PAGES_DASHBOARD_URL,
}
