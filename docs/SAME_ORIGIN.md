# Same-origin dashboard (primary production)

OmniBot serves the dashboard from `public/dashboard` on the API host:

`http://78.154.103.20:13893/`

Build:

```bash
npm run build:same-origin
cp -a dist/. ../fuzzy-octo-broccoli/public/dashboard/
```

Discord OAuth redirect must include:

`http://78.154.103.20:13893/`
