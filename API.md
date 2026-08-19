# OmniBot Dashboard — Backend API contract

All routes require a session from Discord OAuth2. The backend must verify **Administrator** or **Manage Guild** for `guildId`.

## Auth

| Method | Path | Notes |
|--------|------|--------|
| POST | `/auth/callback` | `{ code, redirectUri }` → `{ accessToken, expiresAt, user }` |
| POST | `/auth/logout` | Invalidate session |
| GET | `/auth/me` | Current user |

## Guilds

| Method | Path |
|--------|------|
| GET | `/guilds` |
| GET | `/guilds/:guildId` |
| GET | `/guilds/:guildId/channels` |
| GET | `/guilds/:guildId/roles` |

## Settings

| Method | Path |
|--------|------|
| GET | `/guilds/:guildId/settings` |
| PUT | `/guilds/:guildId/settings` | body `{ patch }` |
| GET | `/guilds/:guildId/settings/history` |

## Bot / stats

| Method | Path |
|--------|------|
| GET | `/guilds/:guildId/bot` |
| GET | `/guilds/:guildId/stats` |

Setting IDs match `src/config/settingsRegistry.js`.
