// Static copy for Bob's photography site.
// Headline, subhead, CTA, brand name etc. live in TWEAK_DEFAULTS (site-app.jsx)
// so they can be edited from the Tweaks panel. Everything here can also be
// direct-edited on the page.

window.SITE_COPY = {
  nav: {
    links: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "How", href: "#process" },
    ],
    cta: "Let's talk",
  },

  hero: {
    eyebrow: "Portraits · Action Sports · Live Events — Minneapolis, MN",
    secondaryCta: "See the work",
  },

  portfolio: {
    eyebrow: "My work",
    heading: "Four kinds of shoots. One standard.",
    sub: "A curated look at what I do. Pick a tab and poke around — every frame here was a real moment first.",
    tabs: ["Portraits", "Families", "Sports", "Events"],
    slots: {
      Portraits: [
        "Drop a portrait — your strongest single face",
        "Drop a portrait — environmental / on location",
        "Drop a portrait — candid laugh or in-between moment",
        "Drop a portrait — studio or dramatic light",
        "Drop a portrait — family or group",
        "Drop a portrait — detail or close crop",
      ],
      Families: [
        "Drop a family photo — your hero shot, wide & full of life",
        "Drop a family photo — candid moment, kids in motion",
        "Drop a family photo — close-up connection between two people",
        "Drop a family photo — golden hour or beautiful outdoor light",
        "Drop a family photo — the full group together",
        "Drop a family photo — a quiet, in-between moment",
      ],
      Sports: [
        "Drop a sports shot — peak action, your best frame",
        "Drop a sports shot — airborne / top of the jump",
        "Drop a sports shot — the contact moment",
        "Drop a sports shot — celebration or aftermath",
        "Drop a sports shot — wide scene-setter",
        "Drop a sports shot — gritty detail (hands, gear, turf)",
      ],
      Events: [
        "Drop an event shot — full-room energy at its peak",
        "Drop an event shot — speaker or performer",
        "Drop an event shot — crowd reaction",
        "Drop an event shot — quiet detail before doors open",
        "Drop an event shot — candid connection between guests",
        "Drop an event shot — the closing moment",
      ],
    },
    srcs: {
      Portraits: [
        "images/gallery/port-1.webp",
        "images/gallery/port-2.webp",
        "images/gallery/port-3.webp",
        "images/gallery/port-4b.webp",
        "images/gallery/port-5.webp",
        "images/gallery/port-6.webp",
      ],
      Families: [
        "images/gallery/pfam-1.webp",
        "images/gallery/pfam-2.jpg",
        "images/gallery/pfam-3.jpg",
        "images/gallery/pfam-4.jpg",
        "images/gallery/pfam-5.jpg",
        "images/gallery/pfam-6.webp",
      ],
      Sports: [
        "images/gallery/sport-1.webp",
        "images/gallery/sport-2.webp",
        "images/gallery/sport-3.webp",
        "images/gallery/sport-4.jpg",
        "images/gallery/sport-5.jpg",
        "images/gallery/sport-6.webp",
      ],
      Events: [
        "images/gallery/event-1.webp",
        "images/gallery/event-2.webp",
        "images/gallery/event-3.jpg",
        "images/gallery/event-4.jpg",
        "images/gallery/event-5.jpg",
        "images/gallery/event-6.webp",
      ],
    },
  },

  services: {
    eyebrow: "My services",
    heading: "Four ways to shoot. One standard.",
    items: [
      {
        num: "01",
        title: "Portraits",
        kicker: "Authentic personality, on record",
        body:
          "The best portrait happens about four seconds after you forget I'm holding a camera. I keep sessions easy and conversational — more chatting, less posing — and stay ready for the expression that's actually you. That's the frame we're after.",
      },
      {
        num: "02",
        title: "Families",
        kicker: "Real families, real moments",
        body:
          "Family sessions are my favorite kind of organized chaos. I don't need everyone looking at the camera at the same time — I need the dog to bolt, the toddler to tip over, the dad to crack a terrible joke. That's the real stuff, and that's what I'm here to catch.",
      },
      {
        num: "03",
        title: "Sports",
        kicker: "Peak action, frozen sharp",
        body:
          "The shot lives in a fraction of a second — the takeoff, the contact, the release. I learn the rhythm of your sport so the lens is aimed where the moment lands before it gets there. High energy in, tack-sharp frames out.",
      },
      {
        num: "04",
        title: "Live Events",
        kicker: "The whole story, seamlessly",
        body:
          "Every event has an arc: the quiet setup, the build, the full-room peak. I work unobtrusively and move constantly, so you get complete coverage without anyone feeling photographed. Looking through the gallery should feel like being there twice.",
      },
    ],
  },

  about: {
    eyebrow: "About Bob",
    heading: "Nosy about people, in the best possible way.",
    body: [
      "I'm a photographer because I can't stop watching what people do. What a face does in the half-second before a laugh. What a body looks like at the very top of a jump. Where the energy in a crowded room actually lives. Those split seconds are the whole job — everything else is preparation.",
      "The preparation part I take seriously. Years of reps have turned light, timing, and lens choice into reflexes, so when the real moment shows up, the technical stuff is already handled and I'm just paying attention. Fast hands, calm presence, no fuss.",
      "I'm based in Minneapolis and shoot across the Twin Cities metro. If your thing is a bit further out — ask anyway. I like a road trip.",
    ],
    portraitPlaceholder: "Drop a photo of Bob — friendly, candid, camera optional",
    facts: [
      { label: "Based in", value: "Minneapolis, MN" },
      { label: "Serving", value: "Twin Cities metro" },
      { label: "Specialties", value: "Portraits · Families · Sports · Events" },
    ],
  },

  process: {
    eyebrow: "How it works",
    heading: "Three steps. No surprises.",
    steps: [
      {
        num: "1",
        title: "Consultation & planning",
        body:
          "We hop on a call or grab a coffee. I learn what you need, we sort the where and when, and you walk away with a clear plan and a clear price.",
      },
      {
        num: "2",
        title: "The shoot",
        body:
          "I show up early, work friendly, and stay out of the way. You focus on being you — I'll handle the light, the timing, and the thousand tiny decisions.",
      },
      {
        num: "3",
        title: "Fast cull & delivery",
        body:
          "Sneak peeks within 48 hours. Your full edited gallery inside a week — not months. Print-ready, share-ready, and yours to keep.",
      },
    ],
  },

  families: {
    eyebrow: "Family sessions",
    slots: [
      "Drop a family photo — your hero shot, wide & full of life",
      "Drop a family photo — candid moment, kids in motion",
      "Drop a family photo — close-up connection between two people",
      "Drop a family photo — golden hour or beautiful outdoor light",
      "Drop a family photo — the full group together",
      "Drop a family photo — a quiet, in-between moment",
    ],
  },

  contact: {
    eyebrow: "Contact & booking",
    sub:
      "No pressure and no hard sell. Tell me what you've got in mind and I'll come back with availability, ideas, and straight answers on rates — usually within one business day.",
    helpTitle: "What helps me quote fast",
    helpItems: [
      "The date (or rough timeframe)",
      "Where it's happening",
      "What kind of shoot it is",
      "Roughly how long you'll need me",
    ],
    emailNote: "Prefer plain email?",
    email: "rburmaster@hotmail.com",
    submit: "Send it my way",
    successTitle: "Got it — thanks!",
    successBody:
      "Your note is on its way to Bob. Expect a reply within one business day, usually sooner.",
    successReset: "Send another note",
  },

  footer: {
    line: "Based in Minneapolis · Serving the Twin Cities metro",
    fine: "© 2026 — All photographs are placeholder slots until you drop your own in.",
  },
};
