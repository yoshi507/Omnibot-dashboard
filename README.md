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

**Important:** Pages must use **GitHub Actions**, not “Deploy from a branch”.
The source `index.html` is a Vite entry point and is not a finished static site until `npm run build` runs.

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Push to `main` (or run workflow **Deploy to GitHub Pages** manually)
3. Site: `https://yoshi507.github.io/Omnibot-dashboard/`

The workflow builds with `VITE_BASE=/Omnibot-dashboard/` and publishes the `dist/` folder.

Do **not** re-enable the old “Deploy static content to Pages” workflow — it uploaded the unbuilt repository and broke the site.

## Environment (public)

See `.env.example`. Never commit a real `.env` with secrets.

## Backend API

See [API.md](./API.md).

## Security

- Bot token and Groq keys stay on the bot/backend only
- OAuth client secret stays on the backend only
- Frontend never decides authorization alone

## Adding a setting

1. Append an entry to `SETTINGS` in `src/config/settingsRegistry.js`.
2. It appears automatically on the matching category page.
