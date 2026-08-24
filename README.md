# Bob Photography

A single-page photography portfolio for Bob, a Minneapolis-based photographer specializing in portraits, families, sports, and live events across the Twin Cities metro area.

**Live site:** [bigbadapps.github.io/BigBadPhotography](https://bigbadapps.github.io/BigBadPhotography/)

## Features

- **Rotating hero** — four slides (portrait triptych, family, sports, events) with crossfade transitions
- **Tabbed portfolio gallery** — Portraits, Families, Sports, Events with 6 photos each
- **Contact form** — client-side validation with Formspree backend
- **Light/Dark themes** — switchable via hidden Tweaks panel (Ctrl+Shift+E)
- **Drag-and-drop image slots** — site owner can drop photos directly in-browser
- **SEO optimized** — Open Graph, Twitter Cards, Schema.org JSON-LD, sitemap, robots.txt
- **AI-friendly** — llms.txt, agents.txt for AI crawlers and agents

## Tech stack

- **React 18** + **Babel Standalone** (CDN, no build step)
- **GitHub Pages** (auto-deploy on push to `main`)
- **Formspree** (contact form backend)
- **Fonts:** Newsreader (headings), Work Sans (body) via Google Fonts

No Node, no bundler, no npm. JSX compiles client-side via Babel.

## Local development

Serve the repo root with any static file server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser.

## Deployment

Every push to `main` auto-deploys via GitHub Actions (`.github/workflows/deploy.yml`). No build step — the repo root is uploaded as-is.

To deploy manually: Actions tab → Deploy to GitHub Pages → Run workflow.

## Project structure

| File | Purpose |
|------|---------|
| `index.html` | HTML shell, all CSS, SEO metadata, script loader |
| `site-copy.js` | Static text content and gallery image paths |
| `site-app.jsx` | React app root, theme config, Tweaks panel wiring |
| `site-components.jsx` | React components for each page section |
| `tweaks-panel.jsx` | Floating design controls (hidden by default) |
| `image-slot.js` | `<image-slot>` custom element for drag-and-drop images |
| `images/` | Hero photos, gallery photos, about portrait, favicons |

See [CLAUDE.md](CLAUDE.md) for detailed architecture docs, file map, and common tasks.

## Contact

Bob Photography — Minneapolis, MN
**Email:** rburmaster@hotmail.com
