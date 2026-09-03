// Section components for Bob's photography site.
// Awwwards-quality interactive components with Lightbox, HUD Viewfinder, and Multi-Step Booking Studio.

const C = window.SITE_COPY;

/* ---------------- Nav ---------------- */

function SiteNav({ t }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(function () {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return function () { window.removeEventListener("scroll", handleScroll); };
  }, []);

  return (
    <header className={"nav" + (scrolled ? " is-scrolled" : "")} data-screen-label="Navigation">
      <div className="wrap nav-inner">
        <a href="#top" className="nav-brand" aria-label="Bob Photography Home">
          <span className="brand-mark">{t.brandName || C.brand.name}</span>
          <span className="brand-dot"></span>
          <span className="brand-tag">{t.brandTag || C.brand.tagline}</span>
        </a>

        <div className="nav-badge">
          <span className="live-pulse"></span>
          <span className="badge-text">{C.brand.statusBadge}</span>
        </div>

        <nav className={"nav-links" + (mobileOpen ? " is-open" : "")}>
          {C.nav.links.map(function (l) {
            return (
              <a
                key={l.href}
                href={l.href}
                className="nav-link"
                onClick={function () { setMobileOpen(false); }}
              >
                {l.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className="btn btn-accent nav-cta-mobile"
            onClick={function () { setMobileOpen(false); }}
          >
            {C.nav.cta}
          </a>
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="btn btn-accent nav-cta">{C.nav.cta}</a>
          <button
            type="button"
            className={"mobile-toggle" + (mobileOpen ? " is-active" : "")}
            aria-label="Toggle Menu"
            aria-expanded={mobileOpen}
            onClick={function () { setMobileOpen(!mobileOpen); }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

const HERO_SLIDES = [
  {
    id: "hero-portraits",
    label: "Portraits",
    subtitle: "Character & Soul",
    triptych: true,
    slots: [
      { id: "hero-portrait-1", src: "images/hero-portrait-1.jpeg", alt: "Natural outdoor portrait", position: "center 12%" },
      { id: "hero-portrait-2", src: "images/hero-portrait-2.jpeg", alt: "Expressive studio portrait", position: "center 12%" },
      { id: "hero-portrait-3", src: "images/hero-portrait-3.jpeg", alt: "Candid environmental portrait", position: "center 12%" },
    ],
  },
  {
    id: "hero-family",
    label: "Families",
    subtitle: "Real Warmth & Chaos",
    src: "images/hero-family.jpg",
    alt: "Joyful family session in natural outdoor light",
    position: "center 4%", // Keeps heads in back row completely in view
  },
  {
    id: "hero-sports",
    label: "Sports",
    subtitle: "Peak Action Frozen",
    src: "images/hero-sports.jpg",
    alt: "High-speed sports action frozen at peak motion",
    position: "center 15%",
  },
  {
    id: "hero-events",
    label: "Live Events",
    subtitle: "The Complete Atmosphere",
    src: "images/hero-events.webp",
    alt: "Live event documentary photography",
    position: "center 22%",
  },
];

function Hero({ t }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(
    function () {
      if (paused) return undefined;
      const ms = Math.max(3, t.heroRotate || 6) * 1000;
      const timer = setInterval(function () {
        setActive(function (a) { return (a + 1) % HERO_SLIDES.length; });
      }, ms);
      return function () { clearInterval(timer); };
    },
    [paused, t.heroRotate]
  );

  const currentSlide = HERO_SLIDES[active];

  return (
    <section
      id="top"
      className="hero"
      data-screen-label="Hero"
      onMouseEnter={function () { setPaused(true); }}
      onMouseLeave={function () { setPaused(false); }}
    >
      {/* Visual Showcase Viewport (Houses Photos + Viewfinder HUD) */}
      <div className="hero-viewport">
        {/* Background Slides */}
        {HERO_SLIDES.map(function (s, i) {
          const isActive = i === active;
          return (
            <div
              key={s.id}
              className={"hero-slide" + (isActive ? " is-active" : "")}
              aria-hidden={!isActive}
            >
              {s.triptych ? (
                <div className="hero-triptych">
                  {s.slots.map(function (slot, idx) {
                    return (
                      <div key={slot.id} className="hero-triptych-item">
                        <img
                          src={slot.src}
                          alt={slot.alt}
                          className="hero-img"
                          style={{ objectPosition: slot.position || "center 12%" }}
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                        <div className="hero-item-overlay"></div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="hero-single-wrap">
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="hero-img"
                    style={{ objectPosition: s.position || "center top" }}
                    loading="lazy"
                  />
                  <div className="hero-item-overlay"></div>
                </div>
              )}
            </div>
          );
        })}

        {/* Viewfinder Camera HUD Overlay */}
        <div className="hero-viewfinder" aria-hidden="true">
          <div className="vf-crosshair vf-top-left"></div>
          <div className="vf-crosshair vf-top-right"></div>
          <div className="vf-crosshair vf-bottom-left"></div>
          <div className="vf-crosshair vf-bottom-right"></div>
          <div className="vf-center-bracket"></div>

          <div className="vf-meta-bar vf-meta-top">
            <span className="vf-badge"><span className="vf-rec-dot"></span> REC · 24FPS</span>
            <span className="vf-meta-item">ISO 400 · 1/1000s · f/1.8</span>
            <span className="vf-meta-item vf-coord">{C.brand.coordinates}</span>
          </div>

          <div className="vf-meta-bar vf-meta-bottom">
            <span className="vf-meta-item">FRAME {active + 1} / {HERO_SLIDES.length}</span>
            <span className="vf-meta-item vf-slide-label">{currentSlide.label} — {currentSlide.subtitle}</span>
            <span className="vf-meta-item">RAW · 3:2</span>
          </div>
        </div>

        <div className="hero-scrim" style={{ opacity: (t.heroOverlay || 32) / 100 }}></div>

        {/* Mobile Slide Switcher Indicator Pills right on the camera viewport */}
        <div className="hero-mobile-scrubber" role="tablist" aria-label="Hero Slide Switcher">
          {HERO_SLIDES.map(function (s, i) {
            const isCurrent = i === active;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isCurrent}
                aria-label={"Slide " + (i + 1) + ": " + s.label}
                className={"mobile-scrubber-pill" + (isCurrent ? " is-active" : "")}
                onClick={function () { setActive(i); }}
              >
                <span className="pill-index">0{i + 1}</span>
                <span className="pill-name">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Hero Content (Docked on Desktop, Dedicated Below-Image Flow on Mobile) */}
      <div className="wrap hero-wrap">
        <div className={"hero-dock-card" + (t.heroAlign === "center" ? " is-center" : "")}>
          <div className="hero-eyebrow-pill">
            <span className="pill-dot"></span>
            <span className="pill-text">{C.hero.tag}</span>
          </div>

          <h1 className="hero-headline">
            <span className="headline-main">{C.hero.headlineMain}</span>
            <span className="headline-accent">{C.hero.headlineAccent}</span>
          </h1>

          <p className="hero-sub">
            {t.heroSub || C.hero.sub}
          </p>

          <div className="hero-ctas">
            <a href="#contact" className="btn btn-accent btn-md hero-cta-main">
              <span>{t.ctaLabel || C.hero.primaryCta}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#work" className="btn btn-ghost btn-md hero-cta-sec">
              <span>{t.secondaryCta || C.hero.secondaryCta}</span>
            </a>
          </div>

          {/* Quick Reassurance Stats */}
          <div className="hero-stats">
            {C.hero.stats.map(function (stat, i) {
              return (
                <div key={i} className="hero-stat-item">
                  <span className="stat-num">{stat.num}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Interactive Frame Switcher Scrubber */}
        <div className="hero-scrubber" role="tablist" aria-label="Hero Slide Switcher">
          {HERO_SLIDES.map(function (s, i) {
            const isCurrent = i === active;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isCurrent}
                className={"scrubber-btn" + (isCurrent ? " is-active" : "")}
                onClick={function () { setActive(i); }}
              >
                <span className="scrubber-idx">0{i + 1}</span>
                <span className="scrubber-label">{s.label}</span>
                <div className="scrubber-bar">
                  <div
                    className="scrubber-progress"
                    style={{ width: isCurrent ? "100%" : "0%" }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Full-Screen Lightbox Modal ---------------- */

function Lightbox({ item, onClose, onPrev, onNext, onSelectForBooking }) {
  if (!item) return null;

  React.useEffect(function () {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return function () {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="lightbox-scrim" onClick={onClose}></div>

      <div className="lightbox-frame">
        <button
          type="button"
          className="lightbox-close"
          aria-label="Close Lightbox"
          onClick={onClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <button
          type="button"
          className="lightbox-nav lightbox-prev"
          aria-label="Previous photograph"
          onClick={onPrev}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <button
          type="button"
          className="lightbox-nav lightbox-next"
          aria-label="Next photograph"
          onClick={onNext}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div className="lightbox-media">
          <img
            src={item.src}
            alt={item.title + " — " + item.location}
            className="lightbox-img"
          />
        </div>

        <div className="lightbox-info">
          <div className="lightbox-info-top">
            <span className="lightbox-cat-badge">{item.category}</span>
            <span className="lightbox-meta">{item.meta}</span>
          </div>

          <h3 className="lightbox-title">{item.title}</h3>
          <p className="lightbox-location">📍 {item.location}</p>
          <p className="lightbox-caption">{item.caption}</p>

          <div className="lightbox-actions">
            <button
              type="button"
              className="btn btn-accent btn-sm lightbox-book-btn"
              onClick={function () {
                onSelectForBooking(item.category);
                onClose();
              }}
            >
              <span>Book a {item.category} Shoot</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <span className="lightbox-hint">Use ← → arrow keys to browse</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Portfolio Gallery ---------------- */

function Portfolio({ t, onSelectCategoryForBooking }) {
  const [activeTab, setActiveTab] = React.useState("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = React.useState(null);

  const allItems = C.portfolio.items;
  const filteredItems = activeTab === "All"
    ? allItems
    : allItems.filter(function (it) { return it.category === activeTab; });

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  function handlePrev() {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  }

  function handleNext() {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
  }

  return (
    <section id="work" className="section portfolio-section" data-screen-label="Portfolio">
      <div className="wrap">
        <div className="section-head-flex">
          <div className="section-head-left">
            <div className="section-eyebrow-wrap">
              <span className="eyebrow-accent-line"></span>
              <p className="eyebrow accent">{C.portfolio.eyebrow}</p>
            </div>
            <h2 className="section-heading">{t.portfolioHeading || C.portfolio.heading}</h2>
            <p className="section-sub">{t.portfolioSub || C.portfolio.sub}</p>
          </div>

          {/* Filter Pills */}
          <div className="portfolio-tabs" role="tablist" aria-label="Portfolio categories">
            {C.portfolio.tabs.map(function (tab) {
              const isSelected = activeTab === tab;
              const count = tab === "All" ? allItems.length : allItems.filter(function (it) { return it.category === tab; }).length;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isSelected}
                  className={"portfolio-tab" + (isSelected ? " is-active" : "")}
                  onClick={function () { setActiveTab(tab); setActiveLightboxIndex(null); }}
                >
                  <span className="tab-label">{tab}</span>
                  <span className="tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="portfolio-grid">
          {filteredItems.map(function (item, idx) {
            const isVertical = item.aspect === "vertical";
            return (
              <article
                key={item.id}
                className={"photo-card" + (isVertical ? " is-vertical" : " is-horizontal")}
                onClick={function () { setActiveLightboxIndex(idx); }}
              >
                <div className="photo-card-media">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="photo-card-img"
                    loading="lazy"
                  />
                  <div className="photo-card-scrim"></div>

                  <div className="photo-card-meta-badge">
                    <span>{item.meta}</span>
                  </div>

                  <div className="photo-card-info">
                    <span className="photo-card-cat">{item.category}</span>
                    <h3 className="photo-card-title">{item.title}</h3>
                    <p className="photo-card-location">{item.location}</p>
                  </div>

                  <div className="photo-card-expand-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox Component */}
      {activeItem && (
        <Lightbox
          item={activeItem}
          onClose={function () { setActiveLightboxIndex(null); }}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectForBooking={onSelectCategoryForBooking}
        />
      )}
    </section>
  );
}

/* ---------------- Services ---------------- */

function Services({ t, onSelectCategoryForBooking }) {
  return (
    <section id="services" className="section services-section section-ruled" data-screen-label="Services">
      <div className="wrap">
        <div className="section-head-center">
          <div className="section-eyebrow-wrap center">
            <span className="eyebrow-accent-line"></span>
            <p className="eyebrow accent">{C.services.eyebrow}</p>
          </div>
          <h2 className="section-heading">{t.servicesHeading || C.services.heading}</h2>
          <p className="section-sub center">{C.services.sub}</p>
        </div>

        <div className="services-deck">
          {C.services.items.map(function (s) {
            return (
              <article key={s.id} className="service-card">
                <div className="service-card-top">
                  <span className="service-card-num">{s.num}</span>
                  <span className="service-card-cat">{s.title}</span>
                </div>

                <h3 className="service-card-tagline">{s.tagline}</h3>
                <p className="service-card-body">{s.body}</p>

                <div className="service-features">
                  <p className="features-label">Session Includes:</p>
                  <ul className="features-list">
                    {s.features.map(function (feat, i) {
                      return (
                        <li key={i} className="feature-item">
                          <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>{feat}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="service-highlight">
                  <span className="highlight-icon">✨</span>
                  <span>{s.highlight}</span>
                </div>

                <div className="service-cta-wrap">
                  <button
                    type="button"
                    className="btn btn-ghost service-inquire-btn"
                    onClick={function () { onSelectCategoryForBooking(s.title); }}
                  >
                    <span>Inquire for {s.title}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About Bob ---------------- */

function About({ t }) {
  return (
    <section id="about" className="section about-section" data-screen-label="About">
      <div className="wrap about-editorial-grid">
        <div className="about-media-col">
          <div className="about-frame">
            <div className="about-img-container">
              <img
                src="images/about-portrait.jpg"
                alt="Bob, Minneapolis Photographer"
                className="about-portrait-img"
                loading="lazy"
              />
              <div className="about-badge-floating">
                <span className="badge-pin">📍</span>
                <span className="badge-text">Minneapolis, MN</span>
              </div>
            </div>

            <div className="about-viewfinder-overlay">
              <span className="vf-crosshair vf-top-left"></span>
              <span className="vf-crosshair vf-bottom-right"></span>
              <span className="about-meta-tag">35MM · NATURAL LIGHT SPECIALIST</span>
            </div>
          </div>

          <div className="about-badges-grid">
            {C.about.badges.map(function (b, i) {
              return (
                <div key={i} className="about-badge-card">
                  <span className="badge-label">{b.label}</span>
                  <span className="badge-val">{b.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="about-text-col">
          <div className="section-eyebrow-wrap">
            <span className="eyebrow-accent-line"></span>
            <p className="eyebrow accent">{C.about.eyebrow}</p>
          </div>

          <h2 className="section-heading">{t.aboutHeading || C.about.heading}</h2>

          <div className="about-quote-box">
            <p className="about-quote-text">{C.about.quotes}</p>
          </div>

          <div className="about-paragraphs">
            {C.about.body.map(function (para, idx) {
              return <p key={idx} className="about-para">{para}</p>;
            })}
          </div>

          <div className="about-signatures">
            <a href="#contact" className="btn btn-accent btn-lg">
              <span>Let's Connect</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <div className="signature-tag">
              <span className="sig-name">Bob Burmaster</span>
              <span className="sig-title">Twin Cities Photographer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

function Process({ t }) {
  return (
    <section id="process" className="section process-section section-ruled" data-screen-label="Process">
      <div className="wrap">
        <div className="section-head-center">
          <div className="section-eyebrow-wrap center">
            <span className="eyebrow-accent-line"></span>
            <p className="eyebrow accent">{C.process.eyebrow}</p>
          </div>
          <h2 className="section-heading">{t.processHeading || C.process.heading}</h2>
        </div>

        <div className="process-timeline">
          {C.process.steps.map(function (st, idx) {
            return (
              <div key={st.step} className="process-card">
                <div className="process-card-step">
                  <span className="step-number">{st.step}</span>
                  <div className="step-glow"></div>
                </div>
                <h3 className="process-card-title">{st.title}</h3>
                <p className="process-card-desc">{st.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <section id="faq" className="section faq-section" data-screen-label="FAQ">
      <div className="wrap faq-layout">
        <div className="faq-intro">
          <div className="section-eyebrow-wrap">
            <span className="eyebrow-accent-line"></span>
            <p className="eyebrow accent">{C.faq.eyebrow}</p>
          </div>
          <h2 className="section-heading">{C.faq.heading}</h2>
          <p className="faq-sub">Have a specific question not covered here? Feel free to reach out anytime via the contact studio below or direct email.</p>
          <a href="#contact" className="btn btn-ghost btn-sm">Ask a Question</a>
        </div>

        <div className="faq-accordion">
          {C.faq.items.map(function (item, i) {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={"faq-item" + (isOpen ? " is-open" : "")}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={function () { setOpenIndex(isOpen ? null : i); }}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Interactive Contact & Booking Studio ---------------- */

var SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/rburmaster@hotmail.com";

function Contact({ t, preselectedCategory }) {
  const blank = {
    name: "",
    email: "",
    phone: "",
    shootType: preselectedCategory || "Portraits",
    date: "",
    location: "",
    message: "",
  };

  const [form, setForm] = React.useState(blank);
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sendError, setSendError] = React.useState(false);

  React.useEffect(function () {
    if (preselectedCategory) {
      setForm(function (f) {
        return Object.assign({}, f, { shootType: preselectedCategory });
      });
    }
  }, [preselectedCategory]);

  function set(field) {
    return function (e) {
      const v = typeof e === "string" ? e : e.target.value;
      setForm(function (f) {
        const next = Object.assign({}, f);
        next[field] = v;
        return next;
      });
      setErrors(function (er) {
        if (!er[field]) return er;
        const next = Object.assign({}, er);
        delete next[field];
        return next;
      });
    };
  }

  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Please enter a valid email address.";
    if (!form.message.trim()) er.message = "Please share a few details about what you'd like to shoot.";
    setErrors(er);
    if (Object.keys(er).length > 0) return;

    setSending(true);
    setSendError(false);

    fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign({}, form, {
        _subject: "✨ New Booking Request from " + form.name + " (" + form.shootType + ")",
        _captcha: "false",
        _template: "table",
      })),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        setSending(false);
        if (data && (data.success === "true" || data.success === true)) {
          setSent(true);
        } else {
          setSendError(true);
        }
      })
      .catch(function () {
        setSending(false);
        setSendError(true);
      });
  }

  return (
    <section id="contact" className="section contact-section" data-screen-label="Contact">
      <div className="wrap contact-studio-grid">
        <div className="contact-info-panel">
          <div className="section-eyebrow-wrap">
            <span className="eyebrow-accent-line"></span>
            <p className="eyebrow accent">{C.contact.eyebrow}</p>
          </div>

          <h2 className="section-heading contact-heading">{t.contactHeading || C.contact.heading}</h2>
          <p className="contact-sub-text">{t.contactSub || C.contact.sub}</p>

          <div className="contact-perks-list">
            <div className="contact-perk">
              <span className="perk-icon">⚡</span>
              <div>
                <strong>Fast Response</strong>
                <p>Personal replies within 24 hours with exact availability.</p>
              </div>
            </div>
            <div className="contact-perk">
              <span className="perk-icon">🤝</span>
              <div>
                <strong>No Pressure Guarantee</strong>
                <p>Transparent upfront quotes without any aggressive sales push.</p>
              </div>
            </div>
            <div className="contact-perk">
              <span className="perk-icon">📍</span>
              <div>
                <strong>Local & Mobile</strong>
                <p>Available throughout Minneapolis, St. Paul, and surrounding regions.</p>
              </div>
            </div>
          </div>

          <div className="direct-email-box">
            <span className="direct-label">Prefer direct email?</span>
            <a href={"mailto:" + C.contact.directEmail} className="direct-email-link">
              ✉️ {C.contact.directEmail}
            </a>
          </div>
        </div>

        <div className="contact-form-card">
          {sent ? (
            <div className="booking-success-state">
              <div className="success-icon-badge">✓</div>
              <h3 className="success-heading">{C.contact.successHeading}</h3>
              <p className="success-message">{C.contact.successMessage}</p>
              <div className="success-reassurance">
                <span>Next step: Bob will review your request and reply shortly to <strong>{form.email}</strong>.</span>
              </div>
              <button
                type="button"
                className="btn btn-ghost success-reset-btn"
                onClick={function () { setSent(false); setForm(blank); }}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={submit} noValidate>
              <div className="form-step-header">
                <span className="step-badge">Booking Inquiry</span>
                <span className="required-note">* Required fields</span>
              </div>

              {/* Shoot Type Picker */}
              <div className="field-group">
                <label className="field-label">1. What kind of shoot do you have in mind?</label>
                <div className="shoot-type-chips">
                  {C.contact.shootTypes.map(function (st) {
                    const isSelected = form.shootType === st.id || form.shootType === st.label;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        className={"shoot-chip" + (isSelected ? " is-selected" : "")}
                        onClick={function () { set("shootType")(st.id); }}
                      >
                        <span className="chip-dot"></span>
                        <span className="chip-name">{st.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date and Location */}
              <div className="form-row-2">
                <div className="field">
                  <label htmlFor="f-date" className="field-label">Target Date / Timeframe</label>
                  <input
                    id="f-date"
                    type="text"
                    value={form.date}
                    onChange={set("date")}
                    placeholder="e.g. Next month, Aug 15th, or Fall 2026"
                    className="input-control"
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-location" className="field-label">Preferred Location / City</label>
                  <input
                    id="f-location"
                    type="text"
                    value={form.location}
                    onChange={set("location")}
                    placeholder="e.g. Minneapolis, Lake Harriet, Studio"
                    className="input-control"
                  />
                </div>
              </div>

              {/* Client Info */}
              <div className="form-row-2">
                <div className={"field" + (errors.name ? " has-error" : "")}>
                  <label htmlFor="f-name" className="field-label">Your Name *</label>
                  <input
                    id="f-name"
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Jane Smith"
                    className="input-control"
                    required
                  />
                  {errors.name && <p className="field-error-msg">{errors.name}</p>}
                </div>
                <div className={"field" + (errors.email ? " has-error" : "")}>
                  <label htmlFor="f-email" className="field-label">Your Email *</label>
                  <input
                    id="f-email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="jane@example.com"
                    className="input-control"
                    required
                  />
                  {errors.email && <p className="field-error-msg">{errors.email}</p>}
                </div>
              </div>

              {/* Phone Optional */}
              <div className="field">
                <label htmlFor="f-phone" className="field-label">Phone Number (Optional)</label>
                <input
                  id="f-phone"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="(612) 000-0000"
                  className="input-control"
                />
              </div>

              {/* Message */}
              <div className={"field" + (errors.message ? " has-error" : "")}>
                <label htmlFor="f-msg" className="field-label">Tell Me About Your Vision *</label>
                <textarea
                  id="f-msg"
                  rows="4"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Share what you're hoping to achieve, who will be in the shoot, the vibe, or any questions you have."
                  className="input-control textarea-control"
                  required
                ></textarea>
                {errors.message && <p className="field-error-msg">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="btn btn-accent btn-lg btn-block btn-submit"
                disabled={sending}
              >
                {sending ? C.contact.submitting : (
                  <>
                    <span>{C.contact.submitButton}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </>
                )}
              </button>

              {sendError && (
                <div className="form-error-alert">
                  <span>There was an issue sending your message. Please email directly at <a href={"mailto:" + C.contact.directEmail}>{C.contact.directEmail}</a>.</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function SiteFooter({ t }) {
  function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="wrap footer-content">
        <div className="footer-top-row">
          <div className="footer-brand-block">
            <a href="#top" className="footer-logo">
              <span className="brand-mark">{t.brandName || C.brand.name}</span>
              <span className="brand-dot"></span>
              <span className="brand-tag">{t.brandTag || C.brand.tagline}</span>
            </a>
            <p className="footer-coords">📍 {C.footer.locationBadge} ({C.brand.coordinates})</p>
            <p className="footer-motto">{C.footer.note}</p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-links">
              {C.nav.links.map(function (l) {
                return <li key={l.href}><a href={l.href}>{l.label}</a></li>;
              })}
              <li><a href="#contact">Book Session</a></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Disciplines</span>
            <ul className="footer-links">
              <li><a href="#work">Portraits</a></li>
              <li><a href="#work">Family Sessions</a></li>
              <li><a href="#work">Sports & Action</a></li>
              <li><a href="#work">Live Events</a></li>
            </ul>
          </div>

          <div className="footer-action-col">
            <button type="button" className="btn btn-ghost btn-sm back-to-top" onClick={scrollToTop}>
              <span>Back to top ↑</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copy">{C.footer.copyright}</p>
          <div className="footer-badges">
            <span className="footer-badge-pill">Minneapolis, MN</span>
            <span className="footer-badge-pill">Canon RF Glass</span>
            <span className="footer-badge-pill">48hr Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteNav, Hero, Portfolio, Lightbox, Services, About, Process, FAQ, Contact, SiteFooter });

