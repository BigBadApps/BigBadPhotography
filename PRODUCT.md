# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** Families and individuals in the Minneapolis–St. Paul metro area seeking unforced, natural-light portraits (family milestones, children, couples, senior portraits, personal branding, creatives). They want genuine connection without stiff, awkward posing.
- **Secondary:** Local youth sports leagues, athletes, parents, and community event organizers seeking fast-reflex, high-burst documentary action coverage across the Twin Cities.

## Product Purpose

Serve as a high-converting, single-page portfolio showcase and booking inquiry studio for Bob Photography. Success means visitors experience authentic visual storytelling, understand the unscripted approach and transparent pricing, and submit a session booking request.

## Positioning

"Unscripted moments, frozen sharp." A neighborhood photodocumentary approach that rejects awkward studio poses and artificial cheese. 100% candid capture of real life, guaranteed 48-hour sneak peek delivery, transparent all-inclusive pricing with zero hidden fees, and full personal print rights included with every session.

## Operating Context

- **Client Evaluation:** Evaluated on desktop and mobile by prospective clients researching local Twin Cities photographers, viewing recent work, checking turnaround times, and comparing package scopes.
- **Booking Flow:** Inquiry submitted directly via the embedded client-side contact form routed to Formspree (`rburmaster@hotmail.com`), followed by personal email or phone alignment within 24 hours.
- **Delivery Flow:** 48-hour preview sneak peeks delivered digitally for immediate sharing, followed by complete color-graded high-resolution gallery delivery within 7–10 days with digital download rights.

## Capabilities and Constraints

- **Architecture:** Zero-build static architecture hosted on GitHub Pages (`https://bigbadapps.github.io/BigBadPhotography/`).
- **Runtime:** Single-page React 18 application compiled in-browser via Babel Standalone loaded from CDN. No Node/npm build or bundle pipeline.
- **Components & Styling:** Semantic HTML shell with custom CSS in `index.html`, modular React components in `site-components.jsx` assembled in `site-app.jsx`, and dynamic content centralized in `site-copy.js`.
- **Form Handling:** Formspree integration with client-side field validation and real-time state feedback.
- **In-Browser Tooling:** Built-in `<image-slot>` custom element for drag-and-drop placeholder handling and hidden design Tweaks panel (`tweaks-panel.jsx`).
- **SEO & Discovery:** Full Open Graph, Twitter Cards, Minneapolis geo tags, Schema.org JSON-LD (LocalBusiness, WebSite, FAQPage), and crawler-friendly discovery (`robots.txt`, `sitemap.xml`, `llms.txt`, `agents.txt`).

## Brand Commitments

- **Name:** Bob Photography ("The Friendly Neighborhood Photographer").
- **Voice:** Warm, approachable, unpretentious, observant, and deeply respectful of authentic human emotion.
- **Core Promise:** No awkward poses, no forced smiles, no surprises on pricing.
- **Service Territory:** Minneapolis, St. Paul, and the surrounding Twin Cities metro area (travel across Greater Minnesota on request).

## Evidence on Hand

- High-resolution real photography assets in `images/`:
  - Hero portrait triptych (`images/hero-portrait-1.jpeg`, `hero-portrait-2.jpeg`, `hero-portrait-3.jpeg`)
  - Hero genre imagery (`images/hero-family.jpg`, `images/hero-sports.jpg`, `images/hero-events.webp`)
  - About section photographer portrait (`images/about-portrait.jpg`)
  - 24 curated gallery images across four categories (`images/gallery/port-*`, `pfam-*`, `sport-*`, `event-*`)
  - Complete PWA and favicon assets in `images/icons/`
- Real contact endpoint: `rburmaster@hotmail.com` via Formspree.

## Product Principles

1. **Authenticity Over Perfection:** Prioritize genuine emotion, spontaneous laughter, and real dynamics over sterile, staged posing.
2. **Speed & Reassurance:** Eliminate client anxiety with transparent upfront pricing and rapid 48-hour sneak peek delivery.
3. **Respect for the Subject:** Create a relaxed, conversational atmosphere so subjects forget the lens is there.
4. **Lightweight & Dependable:** Keep the technical surface resilient, fast-loading, zero-build, and accessible across devices.
