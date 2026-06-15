# Bob Photography Site — Project Documentation

**For AI agents and humans.** Read this before editing any file.

---

## What this is

A single-page photography portfolio site for Bob, a Minneapolis-based photographer
specializing in portraits, families, sports, and live events across the Twin Cities
metro area. The site is statically hosted on GitHub Pages with no build step.

**Live URL:** `https://bigbadapps.github.io/BigBadPhotography/`
**Repo:** `https://github.com/BigBadApps/BigBadPhotography`
**Contact email:** `rburmaster@hotmail.com`

---

## File map

```
/
├── index.html              # HTML shell + all CSS + script loader
├── site-copy.js            # All static text content (nav labels, section copy, contact info)
├── site-app.jsx            # React app root: theme vars, Tweaks panel wiring, section assembly
├── site-components.jsx     # One React component per section (Hero, Portfolio, Services, etc.)
├── tweaks-panel.jsx        # Floating Tweaks UI + useTweaks hook (design-tool carry-over)
├── image-slot.js           # <image-slot> custom element — drag-and-drop image placeholders
├── images/
│   ├── hero-portrait-1.webp   # Hero triptych — left panel (garden portrait)
│   ├── hero-portrait-2.webp   # Hero triptych — center panel (suited portrait)
│   ├── hero-portrait-3.webp   # Hero triptych — right panel (steps portrait)
│   ├── hero-sports.webp       # Sports hero slide background
│   └── hero-events.webp       # Events hero slide background
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions: push to main → deploy to Pages
```

---

## Architecture

The site uses **React 18 + Babel Standalone loaded from CDN** — no build step, no
bundler, no Node required. JSX is compiled in the browser at load time.

```
index.html
  ↳ loads React 18 (CDN, pinned SRI hash)
  ↳ loads Babel Standalone (CDN, pinned SRI hash)
  ↳ loads image-slot.js       (vanilla JS custom element)
  ↳ loads site-copy.js        (sets window.SITE_COPY)
  ↳ loads tweaks-panel.jsx    (sets window.useTweaks, window.TweaksPanel, etc.)
  ↳ loads site-components.jsx (sets window.SiteNav, window.Hero, etc.)
  ↳ loads site-app.jsx        (calls ReactDOM.createRoot → renders <App />)
```

**All JSX files are loaded as `type="text/babel"`** so Babel processes them
client-side. This means no build step but adds ~8 MB of Babel JS on first load
(cached after that).

**Theme and accent color** are CSS custom properties set by `site-app.jsx` on the
`.site` wrapper div. They cascade into every section. Two themes exist (Light/Dark);
accent can be blue, gold, or forest-green.

---

## Sections (in page order)

| Section | Component | Anchor |
|---------|-----------|--------|
| Navigation | `SiteNav` | (sticky header) |
| Hero | `Hero` | `#top` |
| Portfolio / Gallery | `Portfolio` | `#work` |
| Services | `Services` | `#services` |
| About | `About` | `#about` |
| How it Works | `Process` | `#process` |
| Contact | `Contact` | `#contact` |
| Footer | `SiteFooter` | — |

A `Families` component exists in `site-components.jsx` but is **not rendered** —
it was removed from the page during design iteration. Delete it when cleaning up.

---

## How to update content

### Text / copy

All static text lives in **`site-copy.js`** as `window.SITE_COPY`. Edit that
file for: nav labels, section eyebrows, portfolio slot placeholders, services
copy, about facts, process steps, contact help items, footer fine print.

Dynamic copy (hero headline, subheadline, CTAs, service body text, about
paragraphs, process step bodies, contact heading, footer location line) lives in
`TWEAK_DEFAULTS` at the top of **`site-app.jsx`**. These are the values the
Tweaks panel writes back to.

**To permanently update dynamic copy:** edit `TWEAK_DEFAULTS` in `site-app.jsx`.

### Hero images

The hero has three rotating slides: Portraits (triptych), Sports, Events.

Image paths are declared in **`site-components.jsx`** in `HERO_SLIDES`:

```js
const HERO_SLIDES = [
  {
    id: "hero-portraits",
    triptych: true,
    slots: [
      { id: "hero-portrait-1", src: "images/hero-portrait-1.webp" },
      { id: "hero-portrait-2", src: "images/hero-portrait-2.webp" },
      { id: "hero-portrait-3", src: "images/hero-portrait-3.webp" },
    ],
  },
  { id: "hero-sports",  src: "images/hero-sports.webp"  },
  { id: "hero-events",  src: "images/hero-events.webp"  },
];
```

To replace a hero image: drop a new file in `images/`, update the `src` string
here, commit and push.

**Recommended hero image dimensions:** minimum 1920×960 px, ideally 2400×1200 px,
JPEG or WebP. The hero renders at roughly 2:1 aspect ratio at 92 vh height.

### About portrait

The About section has an `<image-slot id="about-portrait">` with no `src` set —
it shows a drag-and-drop placeholder. To add a permanent photo:

1. Add the photo to `images/about-portrait.jpg` (or `.webp`)
2. In `site-components.jsx`, find the `about-portrait` image-slot and add
   `src="images/about-portrait.jpg"`

### Gallery / portfolio photos

The portfolio section has four tabs: Portraits, Families, Sports, Events.
Each tab has 6 photo slots. Currently all are empty placeholders.

**To add photos permanently (recommended for production):**
1. Add image files to `images/gallery/portraits/port-1.webp`, `port-2.webp`, etc.
   (or whatever naming convention you prefer)
2. In `site-components.jsx`, find the `Portfolio` component and add `src` attributes
   to the `<image-slot>` elements inside the gallery map.

**To add photos temporarily (session-only):**
Drag and drop photos onto the empty tiles in the browser. They are saved to
IndexedDB in that browser only and persist across refreshes for that browser.
Other visitors see empty slots.

---

## Image slot system

`<image-slot>` is a custom HTML element defined in `image-slot.js`. It provides:

- **`src` attribute** — permanent fallback image URL; all visitors see this
- **Drag-and-drop** — user can drop a new image; saved to browser IndexedDB
- **Click-to-browse** — file picker (only shown when `window.omelette` exists,
  i.e., inside the Claude Design tool; not shown on the live site)
- **Double-click to reframe** — pan/zoom the crop within the slot (cover mode)
- **IndexedDB priority** — a dropped image overrides `src` in that browser session

The IDB store is named `bob-photo-slots`, object store `slots`. Keys match slot
`id` attributes. Values are `{ u: "data:image/webp;base64,...", s, x, y }` where
`s` is zoom scale and `x/y` are pan offsets.

**On the live site:** the `window.omelette` object does not exist, so the
"browse files" UI is hidden and the "Replace / Remove" controls do not appear on
hover. Drag-and-drop still works (useful for Bob filling his own gallery slots
in his own browser).

---

## Tweaks panel

A floating settings panel that controls theme, accent color, layout dimensions,
and all dynamic copy. **Hidden by default** on the live site.

**To open:** press **Ctrl + Shift + E** in the browser.

Alternatively, run in the browser console:
```js
window.postMessage({ type: '__activate_edit_mode' }, '*')
```

The panel is built on `tweaks-panel.jsx` which is a carry-over from the Claude
Design tool. It posts `__edit_mode_set_keys` to `window.parent` — on the live
site this is a no-op since there is no parent frame. Tweak changes are
in-memory only; to persist them, edit `TWEAK_DEFAULTS` in `site-app.jsx`.

---

## Contact form

The form validates three required fields (name, email, message) client-side,
then fires a `POST` to Formspree in the background.

**To wire the form to actually send emails:**
1. Sign up at https://formspree.io (free tier: 50 submissions/month)
2. Create a new form pointing to `rburmaster@hotmail.com`
3. Copy the form ID (looks like `xpwlpepr`)
4. In `site-components.jsx`, replace `FORMSPREE_FORM_ID` on line ~331:
   ```js
   var FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_ACTUAL_ID";
   ```
5. Commit and push

Until the real ID is set, the form shows a success message but no email is sent.
Direct email (`rburmaster@hotmail.com`) is shown as a fallback in the Contact section.

---

## GitHub Pages deployment

Deployment is automatic: every push to `main` triggers the GitHub Actions workflow
at `.github/workflows/deploy.yml`, which uploads the repo root as a Pages artifact.

**To enable (one-time setup):**
1. Go to `https://github.com/BigBadApps/BigBadPhotography/settings/pages`
2. Under **Source**, select **GitHub Actions**
3. The next push will deploy automatically

**To trigger manually:**
Actions tab → Deploy to GitHub Pages → Run workflow

**Deployment takes ~1 minute.** The workflow has no build step — it uploads the
repo root as-is.

---

## Common tasks for an AI agent

### Add a photo to the gallery
1. Receive the image file; save to `images/gallery/` (create dir if needed)
2. In `site-components.jsx`, find the `Portfolio` component
3. In the gallery map for the relevant tab, add `src="images/gallery/filename.webp"`
   to the matching `<image-slot>` element
4. Commit and push

### Update site copy
1. For nav, eyebrows, facts, contact help → edit `site-copy.js`
2. For headline, subheadline, service descriptions, about paragraphs → edit
   `TWEAK_DEFAULTS` in `site-app.jsx`
3. Commit and push

### Change accent color or theme default
Edit `TWEAK_DEFAULTS` in `site-app.jsx`:
- `"tone"`: `"Light"` or `"Dark"`
- `"accent"`: `"#5A8FBA"` (blue), `"#D6A83E"` (gold), or `"#1F382B"` (forest)

### Wire the contact form
See "Contact form" section above.

### Add a new section
1. Add section copy to `window.SITE_COPY` in `site-copy.js`
2. Write a React component in `site-components.jsx`, export via `Object.assign(window, ...)`
3. Import in `site-app.jsx` by adding `<NewSection t={tweaks} />` inside `<main>`
4. Add CSS to the `<style>` block in `index.html`

---

## Design provenance

The site was designed iteratively in the Claude Design tool (claude.ai/design)
and exported as an HTML prototype bundle. The production implementation preserves
the visual design pixel-for-pixel while adapting the prototype's drag-and-drop
image slots to use real `src` attributes backed by files in `images/`.

Key design decisions from the design session:
- Hero: rotating triptych (Portraits) + full-bleed (Sports, Events); crossfade 6s
- Portraits gallery: `aspect-ratio: 2/3` tiles for vertical photos
- Services: 2×2 grid (Portraits, Families, Sports, Events)
- Contact section: deep forest-green background (`#1F382B`), gold eyebrow
- Tone: Light by default; accent blue (`#5A8FBA`)
- Typography: Newsreader (headings), Work Sans (body)
