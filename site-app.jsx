// App shell: themes, tweaks wiring, smooth scrolling, and page assembly.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tone": "Dark",
  "accent": "#619AC6",
  "headingScale": 1,

  "heroAlign": "left",
  "heroHeight": 94,
  "heroOverlay": 32,
  "heroRotate": 6,
  "heroHeadlineSize": 48,
  "heroSubSize": 17,
  "heroHeadline": "Unscripted Moments. Frozen Sharp.",
  "heroSub": "Natural light, genuine laughter, and split-second athletic action across the Minneapolis & St. Paul metro. No stiff poses. No hidden fees. Just real life captured honestly.",
  "ctaLabel": "Book a Session",
  "secondaryCta": "Explore Portfolio ↓",

  "galleryCols": 3,
  "galleryGap": 20,
  "sectionPad": 120,

  "portfolioHeading": "Four Disciplines. One Uncompromising Eye.",
  "portfolioSub": "Every frame captures an unrepeatable second — authentic smiles, dynamic athletic motion, and the electricity of live gatherings.",

  "servicesHeading": "Tailored for Real Moments, Not Stiff Poses.",
  "aboutHeading": "Nosy about people, obsessed with split-second timing.",
  "processHeading": "Effortless from First Message to Final Gallery.",
  "contactHeading": "Let's Create Something Memorable.",
  "contactSub": "Tell me about your idea, target date, and what you're hoping to capture. I'll get back to you within 24 hours with availability and simple pricing.",

  "brandName": "Bob",
  "brandTag": "The Friendly Neighborhood Photographer",
  "footerLine": "Based in Minneapolis · Serving the Twin Cities metro"
}/*EDITMODE-END*/;

const THEMES = {
  Dark: {
    bg: "#0B0D0E",
    surface: "#13171A",
    cardBg: "#181D21",
    ink: "#F3F2EE",
    inkSecondary: "#B4B8BC",
    muted: "#7A828A",
    line: "rgba(255, 255, 255, 0.09)",
    lineHighlight: "rgba(97, 154, 198, 0.45)",
    soft: "#101417",
  },
  Light: {
    bg: "#F7F6F2",
    surface: "#FFFFFF",
    cardBg: "#F0EFEB",
    ink: "#171A1C",
    inkSecondary: "#484E55",
    muted: "#6A727A",
    line: "rgba(0, 0, 0, 0.08)",
    lineHighlight: "rgba(97, 154, 198, 0.45)",
    soft: "#ECEAE4",
  },
};

const ACCENT_INK = {
  "#619AC6": "#FFFFFF",
  "#5A8FBA": "#FFFFFF",
  "#3B82F6": "#FFFFFF",
  "#1F382B": "#FFFFFF",
  "#D6A83E": "#0F0E0A",
  "#E5B842": "#0F0E0A",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [selectedBookingCategory, setSelectedBookingCategory] = React.useState("Portraits");
  const theme = THEMES[t.tone] || THEMES.Dark;
  const accentInk = ACCENT_INK[t.accent] || "#FFFFFF";
  const galleryCols = parseInt(t.galleryCols, 10) || 3;
  const tweaks = Object.assign({}, t, { galleryCols: galleryCols });

  // Initialize Lenis Smooth Scroll and GSAP ScrollTrigger Integration
  React.useEffect(function () {
    let lenis = null;
    let rafId = null;

    if (window.Lenis && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        lenis = new window.Lenis({
          duration: 1.15,
          easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
          orientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 2.0,
        });

        if (window.ScrollTrigger) {
          lenis.on("scroll", window.ScrollTrigger.update);
          window.gsap.ticker.add(function (time) {
            lenis.raf(time * 1000);
          });
          window.gsap.ticker.lagSmoothing(0);
        } else {
          function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
          }
          rafId = requestAnimationFrame(raf);
        }
      } catch (e) {
        console.warn("Smooth scroll initialization notice:", e);
      }
    }

    return function () {
      if (lenis) {
        lenis.destroy();
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  function handleSelectCategoryForBooking(category) {
    setSelectedBookingCategory(category);
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  }

  const vars = {
    "--bg": theme.bg,
    "--surface": theme.surface,
    "--card-bg": theme.cardBg,
    "--ink": theme.ink,
    "--ink-sec": theme.inkSecondary,
    "--muted": theme.muted,
    "--line": theme.line,
    "--line-highlight": theme.lineHighlight,
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
        <Portfolio t={tweaks} onSelectCategoryForBooking={handleSelectCategoryForBooking} />
        <Services t={tweaks} onSelectCategoryForBooking={handleSelectCategoryForBooking} />
        <About t={tweaks} />
        <Process t={tweaks} />
        <FAQ />
        <Contact t={tweaks} preselectedCategory={selectedBookingCategory} />
      </main>
      <SiteFooter t={tweaks} />

      <TweaksPanel>
        <TweakSection label="Theme & Tone" />
        <TweakRadio
          label="Page Tone"
          value={t.tone}
          options={["Dark", "Light"]}
          onChange={function (v) { setTweak("tone", v); }}
        />
        <TweakColor
          label="Accent Color"
          value={t.accent}
          options={["#619AC6", "#5A8FBA", "#3B82F6", "#1F382B"]}
          onChange={function (v) { setTweak("accent", v); }}
        />
        <TweakSlider
          label="Heading Scale"
          value={t.headingScale}
          min={0.85}
          max={1.3}
          step={0.05}
          onChange={function (v) { setTweak("headingScale", v); }}
        />

        <TweakSection label="Hero Controls" />
        <TweakRadio
          label="Text Alignment"
          value={t.heroAlign}
          options={["left", "center"]}
          onChange={function (v) { setTweak("heroAlign", v); }}
        />
        <TweakSlider
          label="Hero Height"
          value={t.heroHeight}
          min={75}
          max={100}
          unit="vh"
          onChange={function (v) { setTweak("heroHeight", v); }}
        />
        <TweakSlider
          label="Dark Scrim"
          value={t.heroOverlay}
          min={10}
          max={85}
          unit="%"
          onChange={function (v) { setTweak("heroOverlay", v); }}
        />
        <TweakSlider
          label="Slide Interval"
          value={t.heroRotate}
          min={3}
          max={15}
          step={1}
          unit="s"
          onChange={function (v) { setTweak("heroRotate", v); }}
        />

        <TweakSection label="Copy & CTAs" />
        <TweakText
          label="Hero Headline"
          value={t.heroHeadline}
          onChange={function (v) { setTweak("heroHeadline", v); }}
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
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);


