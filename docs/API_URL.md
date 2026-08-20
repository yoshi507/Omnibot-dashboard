# Where production `VITE_API_BASE_URL` comes from

## Injected at GitHub Actions build time

File: `.github/workflows/deploy-pages.yml`

```yaml
- name: Build
  run: npm run build
  env:
    VITE_API_BASE_URL: http://78.154.103.20:13893
```

Vite inlines `import.meta.env.VITE_API_BASE_URL` into the JS bundle during `npm run build`.
Changing `.env.example` alone does **not** change the live GitHub Pages site.

Fallback defaults (if the env var is missing at build time):

- `src/config/site.js` → `PRODUCTION_API_URL`
- `src/config/env.js` → `apiBaseUrl`

## HTTPS status (verified)

- `http://78.154.103.20:13893/health` → works
- `https://78.154.103.20:13893/health` → **does not work** (not TLS)

GitHub Pages (HTTPS) therefore cannot call this API until TLS is terminated properly.
See OmniBot repo `docs/HTTPS_API.md` for enabling real HTTPS.
