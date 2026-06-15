// Section components for Bob's photography site.
// Receives `t` (tweak values) and `c` (window.SITE_COPY) as props.

const C = window.SITE_COPY;

/* ---------------- Nav ---------------- */

function SiteNav({ t }) {
  return (
    <header className="nav" data-screen-label="Navigation">
      <div className="wrap nav-inner">
        <a href="#top" className="nav-brand">
          <span className="brand-mark">{t.brandName}</span>
          <span className="brand-tag">{t.brandTag}</span>
        </a>
        <nav className="nav-links">
          {C.nav.links.map(function (l) {
            return (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            );
          })}
        </nav>
        <a href="#contact" className="btn btn-accent nav-cta">{C.nav.cta}</a>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

const HERO_SLIDES = [
  {
    id: "hero-portraits",
    label: "Portraits",
    triptych: true,
    slots: [
      { id: "hero-portrait-1", placeholder: "Drop portrait 1", src: "images/hero-portrait-1.webp" },
      { id: "hero-portrait-2", placeholder: "Drop portrait 2", src: "images/hero-portrait-2.webp" },
      { id: "hero-portrait-3", placeholder: "Drop portrait 3", src: "images/hero-portrait-3.webp" },
    ],
  },
  { id: "hero-family", label: "Family", placeholder: "Drop your Family hero — candid warmth, wide crop", src: "images/hero-family.jpg" },
  { id: "hero-sports", label: "Sports", placeholder: "Drop your Sports hero — peak action, wide crop", src: "images/hero-sports.jpg" },
  { id: "hero-events", label: "Events", placeholder: "Drop your Events hero — full-room energy, wide crop", src: "images/hero-events.webp" },
];

function Hero({ t }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(
    function () {
      if (paused) return undefined;
      const ms = Math.max(2, t.heroRotate) * 1000;
      const timer = setInterval(function () {
        setActive(function (a) { return (a + 1) % HERO_SLIDES.length; });
      }, ms);
      return function () { clearInterval(timer); };
    },
    [paused, t.heroRotate]
  );

  return (
    <section
      id="top"
      className="hero"
      data-screen-label="Hero"
      style={{ minHeight: t.heroHeight + "vh" }}
      onMouseEnter={function () { setPaused(true); }}
      onMouseLeave={function () { setPaused(false); }}
    >
      {HERO_SLIDES.map(function (s, i) {
        return (
          <div key={s.id} className={"hero-slide" + (i === active ? " is-active" : "")}>
            {s.triptych ? (
              <div className="hero-triptych">
                {s.slots.map(function (slot) {
                  return (
                    <image-slot
                      key={slot.id}
                      id={slot.id}
                      class="hero-triptych-slot"
                      shape="rect"
                      placeholder={slot.placeholder}
                      src={slot.src}
                    ></image-slot>
                  );
                })}
              </div>
            ) : (
              <image-slot
                id={s.id}
                class="hero-slot"
                shape="rect"
                placeholder={s.placeholder}
                src={s.src}
              ></image-slot>
            )}
          </div>
        );
      })}
      <div className="hero-scrim" style={{ opacity: t.heroOverlay / 100 }}></div>
      <div className={"hero-content" + (t.heroAlign === "center" ? " is-center" : "")}>
        <h1 className="hero-headline" style={{ fontSize: t.heroHeadlineSize + "px" }}>{t.heroHeadline}</h1>
        <p className="hero-sub" style={{ fontSize: t.heroSubSize + "px" }}>{t.heroSub}</p>
        <div className="hero-ctas">
          <a href="#contact" className="btn btn-accent">{t.ctaLabel}</a>
          <a href="#work" className="btn btn-ghost">{t.secondaryCta}</a>
        </div>
      </div>
      <div className="hero-dots" role="tablist" aria-label="Hero images">
        {HERO_SLIDES.map(function (s, i) {
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === active}
              className={"hero-dot" + (i === active ? " is-active" : "")}
              onClick={function () { setActive(i); }}
            >{s.label}</button>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Portfolio ---------------- */

function Portfolio({ t }) {
  const [tab, setTab] = React.useState(C.portfolio.tabs[0]);
  const prefix = { Portraits: "port", Families: "pfam", Sports: "sport", Events: "event" }[tab];
  const featured = t.galleryCols === 3;

  return (
    <section id="work" className="section" data-screen-label="Portfolio">
      <div className="wrap">
        <p className="eyebrow accent">{C.portfolio.eyebrow}</p>
        <h2 className="section-heading">{t.portfolioHeading}</h2>
        <p className="section-sub">{t.portfolioSub}</p>

        <div className="tabs" role="tablist" style={{ flexWrap: "wrap" }}>
          {C.portfolio.tabs.map(function (name) {
            return (
              <button
                key={name}
                role="tab"
                aria-selected={tab === name}
                className={"tab" + (tab === name ? " is-active" : "")}
                onClick={function () { setTab(name); }}
              >{name}</button>
            );
          })}
        </div>

        <div
          key={tab}
          className="gallery"
          style={{
            gridTemplateColumns: "repeat(" + t.galleryCols + ", 1fr)",
            gridAutoRows: "auto",
            gap: t.galleryGap + "px",
          }}
        >
          {C.portfolio.slots[tab].map(function (caption, i) {
            const isPortrait = tab === "Portraits";
            const src = C.portfolio.srcs && C.portfolio.srcs[tab] && C.portfolio.srcs[tab][i];
            if (isPortrait) {
              return (
                <div key={prefix + "-" + (i + 1)} className="tile-portrait-wrap">
                  <image-slot
                    id={prefix + "-" + (i + 1)}
                    class="tile-portrait-inner"
                    shape="rect"
                    placeholder={caption}
                    src={src || undefined}
                  ></image-slot>
                </div>
              );
            }
            return (
              <div key={prefix + "-" + (i + 1)} className="tile-landscape-wrap">
                <image-slot
                  id={prefix + "-" + (i + 1)}
                  class="tile-landscape-inner"
                  shape="rect"
                  placeholder={caption}
                  src={src || undefined}
                ></image-slot>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */

function Services({ t }) {
  return (
    <section id="services" className="section section-ruled" data-screen-label="Services">
      <div className="wrap">
        <p className="eyebrow accent">{C.services.eyebrow}</p>
        <h2 className="section-heading narrow">{t.servicesHeading}</h2>
        <div className="services-grid">
          {[
            { num: "01", title: t.s1Title, kicker: t.s1Kicker, body: t.s1Body },
            { num: "02", title: t.s2Title, kicker: t.s2Kicker, body: t.s2Body },
            { num: "03", title: t.s3Title, kicker: t.s3Kicker, body: t.s3Body },
            { num: "04", title: t.s4Title, kicker: t.s4Kicker, body: t.s4Body },
          ].map(function (s) {
            return (
              <article key={s.num} className="service">
                <div className="service-num">{s.num}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-kicker">{s.kicker}</p>
                <p className="service-body">{s.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */

function About({ t }) {
  return (
    <section id="about" className="section section-soft" data-screen-label="About">
      <div className="wrap about-grid">
        <div className="about-media">
          <image-slot
            id="about-portrait"
            class="about-slot"
            shape="rect"
            placeholder={C.about.portraitPlaceholder}
            src="images/about-portrait.jpg"
          ></image-slot>
          <dl className="about-facts">
            {C.about.facts.map(function (f) {
              return (
                <div key={f.label} className="fact">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
        <div className="about-text">
          <p className="eyebrow accent">{C.about.eyebrow}</p>
          <h2 className="section-heading">{t.aboutHeading}</h2>
          {[t.aboutPara1, t.aboutPara2, t.aboutPara3].map(function (p, i) {
            return <p key={i} className="about-para">{p}</p>;
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

function Process({ t }) {
  return (
    <section id="process" className="section" data-screen-label="Process">
      <div className="wrap">
        <p className="eyebrow accent">{C.process.eyebrow}</p>
        <h2 className="section-heading">{t.processHeading}</h2>
        <div className="process-grid">
          {[
            { num: "1", title: t.step1Title, body: t.step1Body },
            { num: "2", title: t.step2Title, body: t.step2Body },
            { num: "3", title: t.step3Title, body: t.step3Body },
          ].map(function (s) {
            return (
              <div key={s.num} className="step">
                <div className="step-num">{s.num}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-body">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Families ---------------- */

function Families({ t }) {
  return (
    <section id="families" className="section section-soft" data-screen-label="Families">
      <div className="wrap">
        <p className="eyebrow accent">{C.families.eyebrow}</p>
        <h2 className="section-heading">{t.familiesHeading}</h2>
        <p className="section-sub">{t.familiesSub}</p>

        <div
          className="gallery"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "260px",
            gap: t.galleryGap + "px",
          }}
        >
          {C.families.slots.map(function (caption, i) {
            return (
              <image-slot
                key={"family-" + (i + 1)}
                id={"family-" + (i + 1)}
                class={"tile" + (i === 0 ? " tile-featured" : "")}
                shape="rect"
                placeholder={caption}
              ></image-slot>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

var SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/rburmaster@hotmail.com";

function Contact({ t }) {
  const blank = { name: "", email: "", type: "", date: "", location: "", message: "" };
  const [form, setForm] = React.useState(blank);
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sendError, setSendError] = React.useState(false);

  function set(field) {
    return function (e) {
      const v = e.target.value;
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
    if (!form.name.trim()) er.name = "I'd love a name to reply to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "That email doesn't look quite right.";
    if (!form.message.trim()) er.message = "Even one sentence helps — what are we shooting?";
    setErrors(er);
    if (Object.keys(er).length > 0) return;
    setSending(true);
    setSendError(false);
    fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign({}, form, {
        _subject: "New inquiry from " + form.name,
        _captcha: "false",
        _template: "table"
      }))
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      setSending(false);
      if (data && data.success === "true") {
        setSent(true);
      } else {
        setSendError(true);
      }
    }).catch(function () {
      setSending(false);
      setSendError(true);
    });
  }

  return (
    <section id="contact" className="section contact" data-screen-label="Contact">
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <p className="eyebrow contact-eyebrow">{C.contact.eyebrow}</p>
          <h2 className="section-heading contact-heading">{t.contactHeading}</h2>
          <p className="contact-sub">{t.contactSub}</p>
          <div className="contact-help">
            <p className="help-title">{C.contact.helpTitle}</p>
            <ul className="help-list">
              {C.contact.helpItems.map(function (item, i) {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
          <p className="contact-email">
            {C.contact.emailNote}{" "}
            <a href={"mailto:" + C.contact.email}>{C.contact.email}</a>
          </p>
        </div>

        {sent ? (
          <div className="contact-success">
            <h3 className="success-title">{C.contact.successTitle}</h3>
            <p className="success-body">{C.contact.successBody}</p>
            <button
              className="btn btn-ghost-dark"
              onClick={function () { setSent(false); setForm(blank); }}
            >{C.contact.successReset}</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={submit} noValidate={true}>
            <div className={"field" + (errors.name ? " has-error" : "")}>
              <label htmlFor="f-name">Name</label>
              <input id="f-name" type="text" value={form.name} onChange={set("name")} placeholder="Your name" />
              {errors.name ? <p className="field-error">{errors.name}</p> : null}
            </div>
            <div className={"field" + (errors.email ? " has-error" : "")}>
              <label htmlFor="f-email">Email</label>
              <input id="f-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
              {errors.email ? <p className="field-error">{errors.email}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="f-type">What kind of shoot?</label>
              <select id="f-type" value={form.type} onChange={set("type")}>
                <option value="">Pick one (or don't)</option>
                <option>Portraits</option>
                <option>Family session</option>
                <option>Sports</option>
                <option>Live event</option>
                <option>Not sure yet</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-date">Date, if you know it</label>
              <input id="f-date" type="text" value={form.date} onChange={set("date")} placeholder="e.g. Sat, Aug 22 — or 'sometime this fall'" />
            </div>
            <div className="field field-full">
              <label htmlFor="f-loc">Location</label>
              <input id="f-loc" type="text" value={form.location} onChange={set("location")} placeholder="Where's it happening?" />
            </div>
            <div className={"field field-full" + (errors.message ? " has-error" : "")}>
              <label htmlFor="f-msg">Tell me about it</label>
              <textarea id="f-msg" rows="4" value={form.message} onChange={set("message")} placeholder="The occasion, the vibe, how long you'll need me — whatever you've got."></textarea>
              {errors.message ? <p className="field-error">{errors.message}</p> : null}
            </div>
            <div className="field field-full">
              <button type="submit" className="btn btn-accent btn-lg btn-submit" disabled={sending}>
                {sending ? "Sending…" : C.contact.submit}
              </button>
              {sendError && (
                <p className="field-error" style={{marginTop: "12px"}}>
                  Something went wrong — please try again or email <a href={"mailto:" + C.contact.email}>{C.contact.email}</a> directly.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function SiteFooter({ t }) {
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="wrap footer-inner">
        <div>
          <span className="brand-mark footer-brand">{t.brandName}</span>
          <span className="brand-tag">{t.brandTag}</span>
        </div>
        <p className="footer-line">{t.footerLine}</p>
        <p className="footer-fine">{C.footer.fine}</p>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteNav, Hero, Portfolio, Services, Families, About, Process, Contact, SiteFooter });
