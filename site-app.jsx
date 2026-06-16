// App shell: themes, tweaks wiring, page assembly.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tone": "Light",
  "accent": "#5A8FBA",
  "headingScale": 1,

  "heroAlign": "left",
  "heroHeight": 92,
  "heroOverlay": 48,
  "heroRotate": 6,
  "heroHeadlineSize": 32,
  "heroSubSize": 16,
  "heroHeadline": "Hi, I'm Bob, your friendly neighborhood photographer",
  "heroSub": "I capture individual and family portraits in addition to sports and other lives events. I'm easy to work with, flexible on budget, and I'll make sure you love the photos.",
  "ctaLabel": "Let's talk",
  "secondaryCta": "See my work",

  "galleryCols": 3,
  "galleryGap": 14,
  "sectionPad": 110,

  "portfolioHeading": "I enjoy capturing photos of humans (and pets) being real.",
  "portfolioSub": "Here's a look at some of my work.",

  "servicesHeading": "Here's my approach.",
  "s1Title": "Portraits",
  "s1Kicker": "The real you, on camera",
  "s1Body": "Every portrait starts with the same goal. Catch the real you, not the version that's trying to look good for a camera. Sessions are loose and conversational. I bring a list of dad jokes. And somewhere in there, we'll capture some really great photos.",
  "s2Title": "Families",
  "s2Kicker": "Real families, real moments",
  "s2Body": "Family sessions are my favorite kind of organized chaos. I don't need everyone looking at the camera at the same time. I need the dog to bolt, the toddler to tip over, the dad to crack a terrible joke. That's the real stuff, and I'm here for it.",
  "s3Title": "Sports",
  "s3Kicker": "Peak action, frozen sharp",
  "s3Body": "I got into sports photography documenting my own three kids and their teammates. Park and rec, club teams, school sports. Every game is a story, and I document it as it unfolds. I always aim to get at least one great action shot of every team member.",
  "s4Title": "Live Events",
  "s4Kicker": "Start to finish, nothing missed",
  "s4Body": "I try to be the fly on the wall with a camera. Documenting the event as it happens, from the quiet setup all the way to the full-room peak.",

  "aboutHeading": "I enjoy wielding my camera to photodocument real life.",
  "aboutPara1": "I got into photography documenting the daily adventures of me and my family including my three kids in all their daily chaos, home, school, sports, music, all of it. When they got tired of me pointing a camera at them, I started branching out. Friends, neighbors, extended family started asking me to help photodocument their lives. And it's grown from there.",
  "aboutPara2": "I'm easy to work with and I'll fit within your budget. And I promise I'll do everything I can to ensure you're thrilled with the photos I deliver.",
  "aboutPara3": "I'm based in Minneapolis and shoot across the Twin Cities metro. If you're outside of my regular area, ask anyway.",

  "processHeading": "Keep it simple and flexible",
  "step1Title": "We plan",
  "step1Body": "You reach out. We text, hop on a call, or grab a coffee. I learn what you need, we sort the where and when, and you walk away with a clear plan and a clear price.",
  "step2Title": "I capture",
  "step2Body": "I show up early, work friendly, and stay out of the way. You focus on being you. I'll handle the light, the timing, and the thousand tiny decisions.",
  "step3Title": "I deliver",
  "step3Body": "Sneak peeks within a few days. Your full edited gallery soon after. Print-ready, share-ready, and yours to keep.",

  "familiesHeading": "Real families, real moments.",
  "familiesSub": "Every family is its own world. I just show up, pay attention, and let the good stuff happen.",

  "contactSub": "No pressure and no hard sell. Tell me what you've got in mind and I'll come back with availability, ideas, and straight answers on rates. Usually within one business day.",
  "contactHeading": "Let's talk.",

  "brandName": "Bob",
  "brandTag": "the friendly neighborhood photographer",
  "footerLine": "Based in Minneapolis · Serving the Twin Cities metro"
}/*EDITMODE-END*/;

const THEMES = {
  Light: {
    bg: "#F4F3F0",
    surface: "#FCFBF9",
    ink: "#1E2226",
    muted: "#6E7174",
    line: "#E2E0DA",
    soft: "#ECEAE4",
  },
  Dark: {
    bg: "#101520",
    surface: "#181D2C",
    ink: "#E8EAF0",
    muted: "#9BA39C",
    line: "#232840",
    soft: "#151A28",
  },
};

const ACCENT_INK = {
  "#5A8FBA": "#FFFFFF",
  "#D6A83E": "#231D0E",
  "#1F382B": "#FFFFFF",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const theme = THEMES[t.tone] || THEMES.Light;
  const accentInk = ACCENT_INK[t.accent] || "#FFFFFF";
  const galleryCols = parseInt(t.galleryCols, 10) || 3;
  const tweaks = Object.assign({}, t, { galleryCols: galleryCols });

  const vars = {
    "--bg": theme.bg,
    "--surface": theme.surface,
    "--ink": theme.ink,
    "--muted": theme.muted,
    "--line": theme.line,
    "--soft": theme.soft,
    "--accent": t.accent,
    "--accent-ink": accentInk,
    "--hscale": t.headingScale,
    "--section-pad": t.sectionPad + "px",
  };

  return (
    <div className="site" style={vars}>
      <SiteNav t={tweaks} />
      <main>
        <Hero t={tweaks} />
        <Portfolio t={tweaks} />
        <Services t={tweaks} />
        <About t={tweaks} />
        <Process t={tweaks} />
        <Contact t={tweaks} />
      </main>
      <SiteFooter t={tweaks} />

      <TweaksPanel>

        <TweakSection label="Tone & color" />
        <TweakRadio
          label="Page tone"
          value={t.tone}
          options={["Light", "Dark"]}
          onChange={function (v) { setTweak("tone", v); }}
        />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={["#5A8FBA", "#D6A83E", "#1F382B"]}
          onChange={function (v) { setTweak("accent", v); }}
        />
        <TweakSlider
          label="Heading scale"
          value={t.headingScale}
          min={0.85}
          max={1.3}
          step={0.05}
          onChange={function (v) { setTweak("headingScale", v); }}
        />

        <TweakSection label="Hero layout" />
        <TweakRadio
          label="Text alignment"
          value={t.heroAlign}
          options={["left", "center"]}
          onChange={function (v) { setTweak("heroAlign", v); }}
        />
        <TweakSlider
          label="Hero height"
          value={t.heroHeight}
          min={70}
          max={100}
          unit="vh"
          onChange={function (v) { setTweak("heroHeight", v); }}
        />
        <TweakSlider
          label="Image darkening"
          value={t.heroOverlay}
          min={0}
          max={90}
          unit="%"
          onChange={function (v) { setTweak("heroOverlay", v); }}
        />
        <TweakSlider
          label="Rotation speed"
          value={t.heroRotate}
          min={2}
          max={15}
          step={1}
          unit="s"
          onChange={function (v) { setTweak("heroRotate", v); }}
        />
        <TweakSlider
          label="Headline size"
          value={t.heroHeadlineSize}
          min={22}
          max={72}
          step={1}
          unit="px"
          onChange={function (v) { setTweak("heroHeadlineSize", v); }}
        />
        <TweakSlider
          label="Subheadline size"
          value={t.heroSubSize}
          min={12}
          max={28}
          step={1}
          unit="px"
          onChange={function (v) { setTweak("heroSubSize", v); }}
        />

        <TweakSection label="Gallery & spacing" />
        <TweakRadio
          label="Gallery columns"
          value={String(t.galleryCols)}
          options={["2", "3"]}
          onChange={function (v) { setTweak("galleryCols", parseInt(v, 10)); }}
        />
        <TweakSlider
          label="Gallery gap"
          value={t.galleryGap}
          min={6}
          max={40}
          unit="px"
          onChange={function (v) { setTweak("galleryGap", v); }}
        />
        <TweakSlider
          label="Section spacing"
          value={t.sectionPad}
          min={60}
          max={180}
          unit="px"
          onChange={function (v) { setTweak("sectionPad", v); }}
        />

        <TweakSection label="Brand & hero copy" />
        <TweakText
          label="Brand name"
          value={t.brandName}
          onChange={function (v) { setTweak("brandName", v); }}
        />
        <TweakText
          label="Brand tagline"
          value={t.brandTag}
          onChange={function (v) { setTweak("brandTag", v); }}
        />
        <TweakText
          label="Hero headline"
          value={t.heroHeadline}
          onChange={function (v) { setTweak("heroHeadline", v); }}
        />
        <TweakText
          label="Hero subheadline"
          value={t.heroSub}
          onChange={function (v) { setTweak("heroSub", v); }}
        />
        <TweakText
          label="Primary CTA"
          value={t.ctaLabel}
          onChange={function (v) { setTweak("ctaLabel", v); }}
        />
        <TweakText
          label="Secondary CTA"
          value={t.secondaryCta}
          onChange={function (v) { setTweak("secondaryCta", v); }}
        />

        <TweakSection label="Portfolio copy" />
        <TweakText
          label="Heading"
          value={t.portfolioHeading}
          onChange={function (v) { setTweak("portfolioHeading", v); }}
        />
        <TweakText
          label="Subheading"
          value={t.portfolioSub}
          onChange={function (v) { setTweak("portfolioSub", v); }}
        />

        <TweakSection label="Services copy" />
        <TweakText
          label="Section heading"
          value={t.servicesHeading}
          onChange={function (v) { setTweak("servicesHeading", v); }}
        />
        <TweakText
          label="01 title"
          value={t.s1Title}
          onChange={function (v) { setTweak("s1Title", v); }}
        />
        <TweakText
          label="01 kicker"
          value={t.s1Kicker}
          onChange={function (v) { setTweak("s1Kicker", v); }}
        />
        <TweakText
          label="01 body"
          value={t.s1Body}
          onChange={function (v) { setTweak("s1Body", v); }}
        />
        <TweakText
          label="02 title — Families"
          value={t.s2Title}
          onChange={function (v) { setTweak("s2Title", v); }}
        />
        <TweakText
          label="02 kicker — Families"
          value={t.s2Kicker}
          onChange={function (v) { setTweak("s2Kicker", v); }}
        />
        <TweakText
          label="02 body — Families"
          value={t.s2Body}
          onChange={function (v) { setTweak("s2Body", v); }}
        />
        <TweakText
          label="03 title — Sports"
          value={t.s3Title}
          onChange={function (v) { setTweak("s3Title", v); }}
        />
        <TweakText
          label="03 kicker — Sports"
          value={t.s3Kicker}
          onChange={function (v) { setTweak("s3Kicker", v); }}
        />
        <TweakText
          label="03 body — Sports"
          value={t.s3Body}
          onChange={function (v) { setTweak("s3Body", v); }}
        />
        <TweakText
          label="04 title — Events"
          value={t.s4Title}
          onChange={function (v) { setTweak("s4Title", v); }}
        />
        <TweakText
          label="04 kicker — Events"
          value={t.s4Kicker}
          onChange={function (v) { setTweak("s4Kicker", v); }}
        />
        <TweakText
          label="04 body — Events"
          value={t.s4Body}
          onChange={function (v) { setTweak("s4Body", v); }}
        />

        <TweakSection label="Families copy" />
        <TweakText
          label="Heading"
          value={t.familiesHeading}
          onChange={function (v) { setTweak("familiesHeading", v); }}
        />
        <TweakText
          label="Subheading"
          value={t.familiesSub}
          onChange={function (v) { setTweak("familiesSub", v); }}
        />

        <TweakSection label="About copy" />
        <TweakText
          label="Heading"
          value={t.aboutHeading}
          onChange={function (v) { setTweak("aboutHeading", v); }}
        />
        <TweakText
          label="Paragraph 1"
          value={t.aboutPara1}
          onChange={function (v) { setTweak("aboutPara1", v); }}
        />
        <TweakText
          label="Paragraph 2"
          value={t.aboutPara2}
          onChange={function (v) { setTweak("aboutPara2", v); }}
        />
        <TweakText
          label="Paragraph 3"
          value={t.aboutPara3}
          onChange={function (v) { setTweak("aboutPara3", v); }}
        />

        <TweakSection label="Process copy" />
        <TweakText
          label="Section heading"
          value={t.processHeading}
          onChange={function (v) { setTweak("processHeading", v); }}
        />
        <TweakText
          label="Step 1 title"
          value={t.step1Title}
          onChange={function (v) { setTweak("step1Title", v); }}
        />
        <TweakText
          label="Step 1 body"
          value={t.step1Body}
          onChange={function (v) { setTweak("step1Body", v); }}
        />
        <TweakText
          label="Step 2 title"
          value={t.step2Title}
          onChange={function (v) { setTweak("step2Title", v); }}
        />
        <TweakText
          label="Step 2 body"
          value={t.step2Body}
          onChange={function (v) { setTweak("step2Body", v); }}
        />
        <TweakText
          label="Step 3 title"
          value={t.step3Title}
          onChange={function (v) { setTweak("step3Title", v); }}
        />
        <TweakText
          label="Step 3 body"
          value={t.step3Body}
          onChange={function (v) { setTweak("step3Body", v); }}
        />

        <TweakSection label="Contact & footer copy" />
        <TweakText
          label="Contact heading"
          value={t.contactHeading}
          onChange={function (v) { setTweak("contactHeading", v); }}
        />
        <TweakText
          label="Contact intro"
          value={t.contactSub}
          onChange={function (v) { setTweak("contactSub", v); }}
        />
        <TweakText
          label="Footer location line"
          value={t.footerLine}
          onChange={function (v) { setTweak("footerLine", v); }}
        />

      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
