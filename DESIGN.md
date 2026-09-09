---
name: Bob Photography
description: Unscripted photodocumentary and portrait portfolio for the Twin Cities
colors:
  primary: "#619AC6"
  primary-dark: "#3D759F"
  primary-light: "#A8D1F0"
  primary-contrast: "#FFFFFF"
  bg-dark: "#0B0D0E"
  bg-light: "#F7F6F2"
  surface-dark: "#13171A"
  surface-light: "#FFFFFF"
  card-dark: "#181D21"
  card-light: "#F0EFEB"
  text-dark: "#F3F2EE"
  text-light: "#171A1C"
  text-secondary-dark: "#B4B8BC"
  text-secondary-light: "#484E55"
  muted-dark: "#7A828A"
  muted-light: "#6A727A"
  line-dark: "rgba(255, 255, 255, 0.09)"
  line-light: "rgba(0, 0, 0, 0.08)"
  line-highlight: "rgba(97, 154, 198, 0.45)"
typography:
  display:
    fontFamily: "Syne, Newsreader, Georgia, serif"
    fontSize: "clamp(30px, 3.6vw, 50px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(24px, 2.5vw, 36px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  full: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "64px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-contrast}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  chip-shoot:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.full}"
    padding: "10px 18px"
  card-service:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.lg}"
    padding: "40px"
  input-field:
    backgroundColor: "rgba(0, 0, 0, 0.25)"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.md}"
    padding: "14px 18px"
---

# Design System: Bob Photography

## Overview

**Creative North Star: "The Atmospheric Film Darkroom & Editorial Chronicle"**

Bob Photography’s design system bridges the tactile gravitas of fine-art darkroom craft with modern digital fluidity. Grounded in unposed, unscripted storytelling across the Minneapolis–St. Paul metro area, the interface exists to serve the photograph first: deep tonal foundations, controlled ambient lighting, generous spatial breathing room, and intentional editorial typography.

The interface rejects synthetic AI tropes, decorative neon glows, and arbitrary SaaS metrics in favor of genuine photographic texture, crisp optical alignment, and warm human reassurance.

**Key Characteristics:**
- **Photocentric Primacy:** Backgrounds and framing recede to let unscripted photography command emotional resonance.
- **Dual-Tonal Depth:** Built around a darkroom foundation (`#0B0D0E`) with an architectural companion light tone (`#F7F6F2`).
- **Editorial Micro-Pacing:** Smooth scroll transitions (Lenis), balanced headline wrapping, and clear typographic hierarchy.
- **Direct Affordances:** Pill-shaped tactile interactive elements with immediate interactive feedback.

## Colors

The palette draws inspiration from Minnesota natural light, northern lakes, and classic photo emulsion chemistry.

### Primary
- **Minnesota Sky Blue** (`#619AC6`): The primary brand signature. Evocative of crisp winter skies and northern waters. Used for primary CTAs, active states, and focal badges.
- **Deep Water Blue** (`#3D759F`): Used for hover states and pressed interactions on primary controls.
- **Sky Tint** (`#A8D1F0`): Subtle highlight tone for contrast on dark surfaces.

### Neutral
- **Darkroom Obsidian** (`#0B0D0E`): Deep, warm charcoal black that serves as the default canvas.
- **Film Slate Surface** (`#13171A`): Elevated structural surface for navigation and floating panels.
- **Negative Carrier Card** (`#181D21`): Container background providing soft separation without harsh borders.
- **Silver Bromide Ink** (`#F3F2EE`): High-legibility off-white primary text.
- **Neutral Grey Ink** (`#B4B8BC`): Secondary text for captions, descriptions, and supporting copy.
- **Tonal Muted Grey** (`#7A828A`): Metadata, timestamps, and subtle boundaries.
- **Darkroom Partition Line** (`rgba(255, 255, 255, 0.09)`): 1px structural dividing lines.

### Named Rules
**The Photo-First Contrast Rule.** UI chrome must never compete with image saturation or brightness. Accent color is restricted to ≤8% of total viewport area.  
**The No-Colored-Glow Rule.** Shadows must remain neutral black/grey ambient occlusion (`rgba(0, 0, 0, 0.4)`). Zero-offset colored glow halos on buttons or cards are strictly prohibited.

## Typography

**Display Font:** `Syne` / `Newsreader` (serif fallback)  
**Serif Editorial Font:** `Newsreader` (Google Fonts)  
**Primary UI & Body Font:** `Plus Jakarta Sans`  
**Monospace / Metadata Font:** `JetBrains Mono`

**Character:** A deliberate tension between modern editorial serif gravitas and clean geometric clarity. Headlines evoke photo-essay monographs, while body copy prioritizes effortless legibility.

### Hierarchy
- **Display** (700 weight, `clamp(30px, 3.6vw, 50px)`, `line-height: 1.12`): Hero headlines and major section titles. Text-wrap: balance.
- **Headline** (600 weight, `clamp(24px, 2.5vw, 36px)`, `line-height: 1.2`): Category sub-headers and modal titles.
- **Title** (600 weight, `18px`, `line-height: 1.35`): Service card headers and feature callouts.
- **Body** (400 weight, `16px`, `line-height: 1.6`): Narrative storytelling, about copy, FAQ responses. Text-wrap: pretty; max-width 65ch.
- **Label / Meta** (600 weight, `12px`, `letter-spacing: 0.08em`, uppercase): Category tags, EXIF details, status badges.

### Named Rules
**The Editorial Accent Rule.** When headlines contain italicized emphasis, render them in genuine serif italics (`Newsreader`), never skewed sans-serif.

## Layout

A 12-column responsive fluid grid anchored by a maximum content container of `1240px` (`.wrap`) with `32px` horizontal gutters on desktop and `20px` on mobile.

- **Vertical Rhythm:** Major sections separated by consistent `120px` section padding (`--section-pad`).
- **Gallery Grid:** Responsive dynamic columns (3 columns on desktop >1024px, 2 columns on tablet 640–1023px, 1 column on mobile <640px) with `20px` gap.
- **Viewport Bounds:** Viewfinder and hero containers utilize full viewport height (`min-height: 94vh`) with sticky header navigation (`top: 0`, `z-index: 100`).

## Elevation & Depth

Surfaces rely on tonal layering and subtle 1px translucent borders rather than dramatic drop shadows.

### Shadow Vocabulary
- **Subtle Lift** (`box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25)`): Applied to sticky navigation on scroll and hovering pills.
- **Deep Card Elevation** (`box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4)`): Applied to elevated hover states on service cards and interactive modals.
- **Focus Ring** (`box-shadow: 0 0 0 3px rgba(97, 154, 198, 0.25)`): Accessible, zero-blur keyboard focus indicator on interactive fields.

### Named Rules
**The Flat-at-Rest Rule.** All cards and containers sit flat at rest with 1px border separation (`var(--line)`). Elevation and lift occur exclusively on interactive hover, focus, or active states.

## Shapes

- **Interactive Pills:** Buttons, category chips, and badges utilize fully rounded pill silhouettes (`border-radius: 999px`).
- **Content Cards:** Service containers, process steps, and form blocks utilize modern `16px` rounded corners.
- **Inputs & Controls:** Text fields and selection chips use `8px` rounded corners.
- **Micro-Badges:** Metadata tags and numbers use subtle `4px` corner radii.

## Components

### Buttons
- **Shape:** Full pill (`999px`).
- **Primary (`.btn-accent`):** Background `#619AC6`, text `#FFFFFF`, padding `13px 26px` (or `16px 32px` for `.btn-lg`). 160ms cubic-bezier transition.
- **Ghost (`.btn-ghost`):** Translucent background `rgba(255, 255, 255, 0.06)`, border `1px solid var(--line)`, text `var(--ink)`.
- **States:** `:hover` lifts `transform: translateY(-2px)`; `:active` compresses `transform: scale(0.97)`.

### Shoot Category Chips (`.shoot-chip`)
- **Style:** Pill badge with `6px` indicator dot, background `rgba(255, 255, 255, 0.04)`, border `1px solid var(--line)`.
- **Selected State:** Background `var(--accent)`, text `#FFFFFF`, border-color `var(--accent)`.

### Service Cards (`.service-card`)
- **Corner Style:** `16px` radius.
- **Background:** `var(--card-bg)` (`#181D21` dark / `#F0EFEB` light).
- **Border:** `1px solid var(--line)`.
- **Internal Padding:** `40px` all sides.
- **Hover:** `transform: translateY(-4px)`, `border-color: var(--line-highlight)`, elevation shadow.

### Form Fields (`.input-control`)
- **Style:** Dark translucent fill `rgba(0, 0, 0, 0.25)`, border `1px solid var(--line)`, radius `8px`, padding `14px 18px`.
- **Focus:** Border color shifts to `var(--accent)` with `0 0 0 3px rgba(97, 154, 198, 0.25)` focus ring.
- **Error State:** Border shifts to `#EF4444` with red error message below.

### Navigation Bar (`.nav`)
- **Style:** Sticky header with backdrop blur (`blur(16px)`), dynamic border transition on scroll (`.is-scrolled`).
- **Brand Mark:** Bold wordmark with accent separator dot and sub-tagline.

## Do's and Don'ts

### Do:
- **Do** prioritize photograph viewing area and clarity above decorative UI chrome.
- **Do** preserve 100% natural, unforced copywriting tone ("The friendly neighborhood photographer").
- **Do** maintain full personal print rights and 48-hour sneak peek guarantees prominently.
- **Do** ensure all form inputs carry accessible `<label>` associations and WCAG AA contrast.

### Don't:
- **Don't** use synthetic gradient text fills on headings.
- **Don't** apply colored neon glow shadows to dark backgrounds.
- **Don't** simulate liveness with arbitrary pulsing radar dots on static dates or availability.
- **Don't** hide base pricing or session investment tiers from prospective clients.
