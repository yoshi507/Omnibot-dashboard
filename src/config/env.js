/**
 * Public frontend configuration only.
 * NEVER put bot tokens, client secrets, or API keys here.
 */
export const env = {
  appName: 'OmniBot Dashboard',
  discordClientId: import.meta.env.VITE_DISCORD_CLIENT_ID || '',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  useMock: !import.meta.env.VITE_API_BASE_URL,
  /**
   * Discord OAuth redirect URI (must match Developer Portal).
   * For GitHub Pages + HashRouter, use the site root (no hash path).
   * Example: https://yoshi507.github.io/Omnibot-dashboard/
   */
  oauthRedirectUri:
    import.meta.env.VITE_OAUTH_REDIRECT_URI ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}${import.meta.env.BASE_URL || '/'}`
      : ''),
  scopes: ['identify', 'guilds'],
  storageKeys: {
    theme: 'omnibot.theme',
    session: 'omnibot.session',
    selectedGuild: 'omnibot.selectedGuild',
    settingsDraft: 'omnibot.settingsDraft',
  },
}
