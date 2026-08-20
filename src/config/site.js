export const DISCORD_INVITE_URL =
  import.meta.env.VITE_DISCORD_INVITE_URL ||
  'https://discord.com/oauth2/authorize?client_id=1538542627882799155'

/** Backup GitHub Pages URL (not required for production same-origin use). */
export const GITHUB_PAGES_DASHBOARD_URL =
  'https://yoshi507.github.io/Omnibot-dashboard/#/login'

/** Empty = same-origin relative API paths when served by OmniBot. */
export const PRODUCTION_API_URL = ''

export const PRODUCTION_DASHBOARD_URL =
  typeof window !== 'undefined'
    ? `${window.location.origin}/#/login`
    : GITHUB_PAGES_DASHBOARD_URL
