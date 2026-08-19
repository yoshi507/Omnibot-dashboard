# OmniBot Dashboard

Official configuration dashboard for [OmniBot](https://github.com/yoshi507/fuzzy-octo-broccoli).

Static React (Vite) app designed for **GitHub Pages**. No Discord bot tokens, API keys, or OAuth client secrets are stored in the frontend.

## Features

- Discord OAuth-ready login flow (mock mode when no API is configured)
- Server selection (Manage Guild / Administrator)
- Config-driven settings registry (`src/config/settingsRegistry.js`)
- Feature sections: AI, security, moderation, leveling, welcome, logging, tickets, music, dead chat, translation, commands, server
- Dark / light theme, responsive layout
- Unsaved-change detection, validation, save/discard
- Service layer ready for a real backend

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints. Click **Continue with demo account** (mock mode).

## GitHub Pages deploy

1. Push this repo to `yoshi507/omnibot-dashboard`.
2. Build:

```bash
npm install
npm run build
```

3. Enable **Settings → Pages** to deploy the `dist/` folder (or use GitHub Actions).
4. Site URL: `https://yoshi507.github.io/omnibot-dashboard/`

`vite.config.js` sets `base: '/omnibot-dashboard/'`. For a user site at `https://yoshi507.github.io/` use:

```bash
VITE_BASE=/ npm run build
```

and publish `dist` to the `yoshi507.github.io` repository.

HashRouter is used so routing works without server-side rewrites.

## Environment (public)

See `.env.example`.

## Backend API

See [API.md](./API.md).

## Security

- Bot token and Groq keys stay on the bot/backend only
- OAuth client secret stays on the backend only
- Frontend never decides authorization alone

## Adding a setting

1. Append an entry to `SETTINGS` in `src/config/settingsRegistry.js`.
2. It appears automatically on the matching category page.
