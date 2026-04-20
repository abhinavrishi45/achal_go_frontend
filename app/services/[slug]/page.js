import React from "react";
export const dynamic = "force-dynamic";
import Link from 'next/link';
import { API_BASE } from '@/lib/api';

function safeParseJSON(v) {
  if (!v) return null;
  if (Array.isArray(v)) return v;
  if (typeof v === "object") return v;

  // Handle string input
  if (typeof v === "string") {
    try {
      // Remove outer quotes if present
      let cleaned = v;
      if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.slice(1, -1);
      }
      // Parse JSON
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (_) {
      // If it's a newline-separated string, split and trim
      if (v.includes("\\n")) {
        return v.split("\\n").map(item => item.trim()).filter(Boolean);
      }
      if (v.includes("\n")) {
        return v.split("\n").map(item => item.trim()).filter(Boolean);
      }
      return v;
    }
  }
  return v;
}

// ── Inline styles & keyframes injected once ──────────────────
const PAGE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --navy:   #0a1628;
    --blue:   #1a3a6b;
    --gold:   #c8a96e;
    --gold2:  #b8954a;
    --light:  #f5f3ef;
    --white:  #ffffff;
    --gray:   #6b7280;
    --border: #e5e0d8;
    --slate:  #0f172a;
  }
  .svc-page { font-family: 'DM Sans', sans-serif; color: var(--navy); background: var(--white); overflow-x: hidden; }
  .playfair { font-family: 'Playfair Display', serif; }

  /* ── Section label (gold pill) ── */
  .svc-label {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 11px; font-weight: 600; letter-spacing: .3em;
    color: var(--gold); text-transform: uppercase; margin-bottom: 16px;
  }
  .svc-label::before { content: ''; display: block; width: 24px; height: 1px; background: var(--gold); }

  /* ── Hero ── */
  .svc-hero {
    position: relative; width: 100%; min-height: 540px;
    display: flex; align-items: flex-end;
    background: var(--navy); overflow: hidden;
  }
  .svc-hero img.hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(.35); opacity: .5; }
  .svc-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(10,22,40,.95) 0%, rgba(10,22,40,.65) 60%, rgba(10,22,40,.2) 100%);
  }
  .svc-hero-content { position: relative; z-index: 2; padding: 100px 44px 80px; max-width: 860px; right: -128px; }
  .svc-hero-breadcrumb { display: flex; align-items: center; gap: 10px; font-size: 12px; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,255,255,.4); margin-bottom: 28px; }
  .svc-hero-breadcrumb a { color: var(--gold); text-decoration: none; }
  .svc-hero-breadcrumb span { color: rgba(255,255,255,.25); }
  .svc-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 4.2rem); font-weight: 900; color: #fff; line-height: 1.1; margin: 0 0 20px; }
  .svc-hero p { font-size: 1.05rem; color: rgba(255,255,255,.72); line-height: 1.7; max-width: 560px; margin: 0 0 36px; font-weight: 300; }
  .svc-hero-badge {
    position: absolute; right: 64px; bottom: -8px; z-index: 3;
    background: var(--gold); color: var(--navy);
    padding: 20px 32px; font-family: 'Playfair Display', serif;
    font-weight: 900; font-size: 2rem; line-height: 1;
    display: flex; flex-direction: column; align-items: center;
  }
  .svc-hero-badge span { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; opacity: .7; margin-top: 4px; }
  .svc-hero-divider { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--gold) 0%, transparent 70%); }

  /* ── Summary Band ── */
  .svc-summary { background: var(--light); padding: 80px 64px; }
  .svc-summary-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
  .svc-summary-main-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 900; color: var(--navy); line-height: 1.2; margin: 0 0 16px; }
  .svc-summary-single-title { font-size: 13px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--gray); margin: 0 0 12px; }
  .svc-summary-desc { font-size: 1rem; line-height: 1.8; color: #4b5563; font-weight: 300; }
  .svc-summary-bullets { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .svc-summary-bullets li { display: flex; align-items: flex-start; gap: 14px; font-size: .9rem; color: #374151; line-height: 1.5; }
  .svc-summary-bullets li::before { content: ''; flex-shrink: 0; margin-top: 8px; width: 20px; height: 1px; background: var(--gold); }
  .svc-summary-right { border-left: 1px solid var(--border); padding-left: 64px; padding-top: 4px; }

  /* ── Portfolio ── */
  .svc-portfolio { padding: 80px 64px; background: var(--white); }
  .svc-portfolio-inner { max-width: 1200px; margin: 0 auto; }
  .svc-portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 48px; }
  .svc-port-item { position: relative; overflow: hidden; cursor: pointer; height: 320px; }
  .svc-port-item img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.35); transition: transform .7s, filter .7s; }
  .svc-port-item:hover img { transform: scale(1.06); filter: saturate(.7); }
  .svc-port-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,22,40,.92) 0%, rgba(10,22,40,.1) 60%); }
  .svc-port-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 28px 32px; }
  .svc-port-tag { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 6px; }
  .svc-port-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: #fff; line-height: 1.3; }
  .svc-port-location { font-size: 11px; color: rgba(255,255,255,.45); margin-top: 5px; letter-spacing: .06em; }
  .svc-port-item:first-child { grid-column: span 2; height: 380px; }

  /* ── Pricing ── */
  .svc-pricing { padding: 80px 64px; background: var(--navy); }
  .svc-pricing-inner { max-width: 1200px; margin: 0 auto; }
  .svc-pricing-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 900; color: #fff; line-height: 1.2; margin: 0 0 48px; }
  .svc-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  .svc-plan {
    background: rgba(255,255,255,.04); border-top: 3px solid transparent;
    padding: 44px 36px; position: relative; transition: background .3s, border-color .3s;
  }
  .svc-plan:hover { background: rgba(255,255,255,.07); border-top-color: var(--gold); }
  .svc-plan-featured { background: rgba(200,169,110,.08) !important; border-top-color: var(--gold) !important; }
  .svc-plan-featured-badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--gold); color: var(--navy); font-size: 10px; font-weight: 700;
    letter-spacing: .15em; text-transform: uppercase; padding: 4px 16px; white-space: nowrap;
  }
  .svc-plan-name { font-size: 11px; font-weight: 600; letter-spacing: .25em; text-transform: uppercase; color: rgba(255,255,255,.45); margin-bottom: 12px; }
  .svc-plan-price { font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 900; color: var(--gold); line-height: 1; margin-bottom: 24px; }
  .svc-plan-divider { height: 1px; background: rgba(255,255,255,.08); margin-bottom: 24px; }
  .svc-plan-benefits { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
  .svc-plan-benefits li { display: flex; align-items: flex-start; gap: 12px; font-size: .88rem; color: rgba(255,255,255,.65); line-height: 1.5; }
  .svc-plan-benefits li::before { content: ''; flex-shrink: 0; margin-top: 7px; width: 14px; height: 1px; background: var(--gold); }
  .svc-plan-btn { margin-top: 32px; width: 100%; padding: 14px; background: transparent; border: 1px solid rgba(255,255,255,.2); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; cursor: pointer; transition: border-color .3s, color .3s; }
  .svc-plan-btn:hover { border-color: var(--gold); color: var(--gold); }
  .svc-plan-featured .svc-plan-btn { background: var(--gold); border-color: var(--gold); color: var(--navy); }

  /* ── Gallery ── */
  .svc-gallery { padding: 80px 64px; background: var(--light); }
  .svc-gallery-inner { max-width: 1200px; margin: 0 auto; }
  .svc-gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; margin-top: 48px; }
  .svc-gallery-item { overflow: hidden; position: relative; cursor: zoom-in; }
  .svc-gallery-item img { width: 100%; height: 220px; object-fit: cover; filter: saturate(.4); transition: transform .5s, filter .5s; display: block; }
  .svc-gallery-item:hover img { transform: scale(1.07); filter: saturate(.85); }
  .svc-gallery-item:first-child,
  .svc-gallery-item:nth-child(5) { grid-column: span 2; }
  .svc-gallery-item:first-child img,
  .svc-gallery-item:nth-child(5) img { height: 340px; }

  /* ── Coverage + Full Details ── */
  .svc-details { padding: 80px 64px; background: var(--white); }
  .svc-details-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
  .svc-coverage { background: var(--navy); padding: 52px 48px; }
  .svc-coverage-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: #fff; margin: 0 0 28px; }
  .svc-coverage-row { display: flex; align-items: flex-start; gap: 20px; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,.06); }
  .svc-coverage-row:last-child { border-bottom: none; }
  .svc-coverage-icon { flex-shrink: 0; width: 36px; height: 36px; border: 1px solid rgba(200,169,110,.4); display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: 15px; }
  .svc-coverage-label { font-size: 10px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.35); margin-bottom: 4px; }
  .svc-coverage-value { font-size: .9rem; color: rgba(255,255,255,.78); line-height: 1.5; }
  .svc-full-details { background: var(--light); padding: 52px 48px; position: relative; overflow: hidden; }
  .svc-full-details-img { width: 100%; height: 220px; object-fit: cover; margin-bottom: 32px; filter: saturate(.4); display: block; }
  .svc-full-details-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: var(--navy); margin: 0 0 16px; }
  .svc-full-details-desc { font-size: .95rem; color: #4b5563; line-height: 1.8; font-weight: 300; }
  .svc-full-details-accent { position: absolute; bottom: 0; right: 0; width: 140px; height: 140px; background: var(--gold); opacity: .05; pointer-events: none; }

  /* ── CTA ── */
  .svc-cta { position: relative; background: var(--slate); padding: 88px 64px; text-align: center; overflow: hidden; }
  .svc-cta::before { content: ''; position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(200,169,110,.07) 0%, transparent 70%); pointer-events: none; }
  .svc-cta-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 900; color: #fff; margin: 0 0 12px; position: relative; z-index: 1; }
  .svc-cta-title em { color: var(--gold); font-style: normal; }
  .svc-cta-sub { font-size: 1rem; color: rgba(255,255,255,.5); margin: 0 auto 44px; max-width: 520px; line-height: 1.7; font-weight: 300; position: relative; z-index: 1; }
  .svc-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }

  /* ── Buttons ── */
  .btn-gold { padding: 15px 44px; background: var(--gold); color: var(--navy); font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; border: none; cursor: pointer; transition: background .3s, transform .2s; }
  .btn-gold:hover { background: var(--gold2); transform: translateY(-1px); }
  .btn-ghost { padding: 15px 44px; background: transparent; color: #fff; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; border: 1px solid rgba(255,255,255,.25); cursor: pointer; transition: border-color .3s, color .3s; }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .svc-hero-content { padding: 100px 24px 72px; right: 0; }
    .svc-hero-badge { right: 24px; bottom: -24px; font-size: 1.4rem; padding: 14px 20px; }
    .svc-summary { padding: 64px 24px; }
    .svc-summary-inner { grid-template-columns: 1fr; gap: 40px; }
    .svc-summary-right { border-left: none; border-top: 1px solid var(--border); padding-left: 0; padding-top: 40px; }
    .svc-portfolio { padding: 60px 24px; }
    .svc-portfolio-grid { grid-template-columns: 1fr; }
    .svc-port-item:first-child { grid-column: span 1; height: 320px; }
    .svc-pricing { padding: 60px 24px; }
    .svc-pricing-grid { grid-template-columns: 1fr; }
    .svc-gallery { padding: 60px 24px; }
    .svc-gallery-grid { grid-template-columns: 1fr 1fr; }
    .svc-gallery-item:first-child,
    .svc-gallery-item:nth-child(5) { grid-column: span 1; }
    .svc-gallery-item:first-child img,
    .svc-gallery-item:nth-child(5) img { height: 220px; }
    .svc-details { padding: 60px 24px; }
    .svc-details-inner { grid-template-columns: 1fr; }
    .svc-cta { padding: 64px 24px; }
  }
`;

// ── Sub-components ────────────────────────────────────────────

function HeroSection({ heroSection, pageName, pageDescription }) {
  const heading = heroSection?.heading || pageName;
  const sub = heroSection?.shortDescription || pageDescription;
  const bg = heroSection?.backgroundImage;

  return (
    <section className="svc-hero">
      {bg && <img className="hero-bg" src={bg} alt={heading} />}
      <div className="svc-hero-overlay" />
      <div className="svc-hero-content">
        <nav className="svc-hero-breadcrumb">
          <a href="/">Home</a>
          <span>›</span>
          <a href="/#services-sec">Services</a>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,.6)" }}>{heading}</span>
        </nav>
        <div className="svc-label">Our Expertise</div>
        <h1>{heading}</h1>
        {sub && <p>{sub}</p>}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/get-quote" className="btn-gold px-12 py-3 text-sm" style={{ display: "inline-block", textDecoration: "none" }}>
            Request a Quote
          </Link>
          <button className="btn-ghost">Learn More</button>
        </div>
      </div>
      <div className="svc-hero-badge ">
        ACHAL
        <span>International</span>
      </div>
      <div className="svc-hero-divider" />
    </section>
  );
}

function SummarySection({ secondHeroSection }) {
  if (!secondHeroSection) return null;
  const { mainTitle, singleTitle, descriptions, bullets } = secondHeroSection;
  const bulletList = safeParseJSON(bullets) || [];
  const hasBullets = Array.isArray(bulletList) && bulletList.length > 0;
  const hasRight = hasBullets;
  if (!mainTitle && !singleTitle && !descriptions && !hasBullets) return null;

  return (
    <section className="svc-summary">
      <div
        className="svc-summary-inner"
        style={!hasRight ? { gridTemplateColumns: "1fr" } : undefined}
      >
        <div>
          {mainTitle && <h2 className="svc-summary-main-title">{mainTitle}</h2>}
          {singleTitle && <div className="svc-summary-single-title">{singleTitle}</div>}
          {descriptions && <p className="svc-summary-desc">{descriptions}</p>}
        </div>
        {hasBullets && (
          <div className="svc-summary-right">
            <div className="svc-label">Key Highlights</div>
            <ul className="svc-summary-bullets">
              {bulletList.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function PortfolioSection({ portfolioSections }) {
  if (!portfolioSections?.length) return null;
  return (
    <section className="svc-portfolio">
      <div className="svc-portfolio-inner">
        <div className="svc-label">Our Work</div>
        <h2
          className="playfair"
          style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 900, margin: "0", lineHeight: 1.15 }}
        >
          Signature Projects &amp;<br />Capabilities
        </h2>
        <div className="svc-portfolio-grid">
          {portfolioSections.map((p, i) => (
            <div key={p.projectId || i} className="svc-port-item">
              {p.image && (
                <img src={p.image} alt={p.projectName || p.title || `Project ${i + 1}`} />
              )}
              <div className="svc-port-overlay" />
              <div className="svc-port-content">
                <div className="svc-port-tag">{p.tag || "Project"}</div>
                <div className="svc-port-name">{p.projectName || p.title}</div>
                {p.location && <div className="svc-port-location">📍 {p.location}</div>}
                {p.projectDescription && (
                  <p
                    style={{
                      fontSize: ".8rem",
                      color: "rgba(255,255,255,.55)",
                      margin: "8px 0 0",
                      lineHeight: 1.5,
                      fontWeight: 300,
                    }}
                  >
                    {p.projectDescription}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ pricingPlans }) {
  if (!pricingPlans?.length) return null;
  return (
    <section className="svc-pricing">
      <div className="svc-pricing-inner">
        <div className="svc-label" style={{ color: "var(--gold)" }}>
          Investment
        </div>
        <h2 className="svc-pricing-title">
          Transparent<br />Pricing Plans
        </h2>
        <div className="svc-pricing-grid">
          {pricingPlans.map((plan, i) => {
            const benefits = safeParseJSON(plan.benefits) || [];
            const isFeatured = plan.featured || (pricingPlans.length === 3 && i === 1);
            return (
              <div key={i} className={`svc-plan${isFeatured ? " svc-plan-featured" : ""}`}>
                {isFeatured && <div className="svc-plan-featured-badge">Most Popular</div>}
                <div className="svc-plan-name">{plan.title}</div>
                <div className="svc-plan-price">{plan.price}</div>
                <div className="svc-plan-divider" />
                {Array.isArray(benefits) && benefits.length > 0 && (
                  <ul className="svc-plan-benefits">
                    {benefits.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
                <Link href="/get-quote" style={{ display: "block", textDecoration: "none" }}>
                  <button className="svc-plan-btn">Get Started</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ galleryItems }) {
  if (!galleryItems?.length) return null;
  return (
    <section className="svc-gallery">
      <div className="svc-gallery-inner">
        <div className="svc-label">Visual Showcase</div>
        <h2
          className="playfair"
          style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 900, margin: "0", lineHeight: 1.2 }}
        >
          Project Gallery
        </h2>
        <div className="svc-gallery-grid">
          {galleryItems.map((g, i) => (
            <div key={i} className="svc-gallery-item">
              <img src={g.image} alt={g.title || `Gallery ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailsSection({ coverageSection, fullDetailsSection }) {
  if (!coverageSection && !fullDetailsSection) return null;
  const both = coverageSection && fullDetailsSection;
  return (
    <section className="svc-details">
      <div
        className="svc-details-inner"
        style={!both ? { gridTemplateColumns: "1fr" } : undefined}
      >
        {coverageSection && (
          <div className="svc-coverage">
            <div className="svc-label">Service Reach</div>
            {coverageSection.title && (
              <h3 className="svc-coverage-title">{coverageSection.title}</h3>
            )}
            {coverageSection.countriesCovered && (
              <div className="svc-coverage-row">
                <div className="svc-coverage-icon">🌍</div>
                <div>
                  <div className="svc-coverage-label">Countries Covered</div>
                  <div className="svc-coverage-value">{coverageSection.countriesCovered}</div>
                </div>
              </div>
            )}
            {coverageSection.availableServices && (
              <div className="svc-coverage-row">
                <div className="svc-coverage-icon">⚙</div>
                <div>
                  <div className="svc-coverage-label">Available Services</div>
                  <div className="svc-coverage-value">{coverageSection.availableServices}</div>
                </div>
              </div>
            )}
            {coverageSection.turnaround && (
              <div className="svc-coverage-row">
                <div className="svc-coverage-icon">⏱</div>
                <div>
                  <div className="svc-coverage-label">Turnaround</div>
                  <div className="svc-coverage-value">{coverageSection.turnaround}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {fullDetailsSection && (
          <div className="svc-full-details">
            <div className="svc-full-details-accent" />
            {fullDetailsSection.image && (
              <img
                src={fullDetailsSection.image}
                alt={fullDetailsSection.title || "Detail"}
                className="svc-full-details-img"
              />
            )}
            <div className="svc-label">In Depth</div>
            {fullDetailsSection.title && (
              <h3 className="svc-full-details-title">{fullDetailsSection.title}</h3>
            )}
            {fullDetailsSection.description && (
              <p className="svc-full-details-desc">{fullDetailsSection.description}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function CTASection({ pageName }) {
  return (
    <section className="svc-cta">
      <h2 className="svc-cta-title">
        Ready to Work with<br />
        <em>ACHAL International?</em>
      </h2>
      <p className="svc-cta-sub">
        Experience world-class {pageName ? pageName.toLowerCase() : "service"} delivered with the
        reliability and precision that defines ACHAL.
      </p>
      <div className="svc-cta-btns">
        <Link href="/get-quote" className="btn-gold" style={{ display: "inline-block", textDecoration: "none" }}>
          Get In Touch
        </Link>
        <Link href="/services" className="btn-ghost" style={{ display: "inline-block", textDecoration: "none" }}>
          View All Services
        </Link>
      </div>
    </section>
  );
}

// ── SSR Page (Next.js 13+ App Router) ────────────────────────
// Replace this default export with the async SSR version below
// when deploying to your Next.js project:
//
//   export default async function Page({ params }) {
//     const { slug } = await params;
//     let page = null, service = null;
//     try {
//       const r = await fetch(`${API_BASE}/api/service-pages/slug/${encodeURIComponent(slug)}`, { cache: 'no-store' });
//       if (r.ok) { page = await r.json(); service = page?.service ?? null; }
//       else if (r.status === 404) {
//         const sr = await fetch(`${API_BASE}/api/services/slug/${encodeURIComponent(slug)}`, { cache: 'no-store' });
//         if (sr.ok) { service = await sr.json(); const pr = await fetch(`${API_BASE}/api/service-pages/service/${service.id}`, { cache: 'no-store' }); if (pr.ok) page = await pr.json(); }
//         else return <NotFound slug={slug} />;
//       } else throw new Error('fetch failed');
//     } catch (e) { return <div className="min-h-screen flex items-center justify-center text-red-600">Error loading page</div>; }
//     const { heroSection, secondHeroSection, portfolioSections, pricingPlans, galleryItems, coverageSection, fullDetailsSection } = page || {};
//     const pageName = service?.name || page?.name || '';
//     return <ServicePageUI ... />;
//   }



// This page is dynamic; static param generation removed so it's handled at runtime.

// Server page: fetch service page data from API using service slug
export default async function ServicePage({ params }) {
  const { slug } = await params;
  let page = null;
  let service = null;



  try {
    // Fetch complete service page data by slug
    const pageRes = await fetch(`${API_BASE}/api/service-pages/slug/${slug}`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });

    if (pageRes.ok) {
      const contentType = String(pageRes.headers.get("content-type") || "").toLowerCase();
      if (contentType.includes("application/json")) {
        try {
          page = await pageRes.json();
          // Extract service info if available in the page data
          service = page?.service || { name: page?.name };
          console.log("Fetched service page data:", { slug, page, service });
        } catch (err) {
          console.error("Error parsing service page data:", err);
          page = null;
        }
      } else {
        console.warn("Service page endpoint returned non-JSON:", contentType);
        page = null;
      }
    } else if (pageRes.status === 404) {
      console.warn(`Service page not found for slug: ${slug}`);
      page = null;
    } else {
      console.warn(`Error fetching service page: ${pageRes.status}`);
      page = null;
    }
  } catch (e) {
    console.error("Error fetching service page from API:", e);
    page = null;
  }

  // Extract sections from API data
  const heroSection = page?.heroSection;
  const secondHeroSection = page?.secondHeroSection;
  const portfolioSections = page?.portfolioSections;
  const pricingPlans = page?.pricingPlans;
  const galleryItems = page?.galleryItems;
  const coverageSection = page?.coverageSection;
  const fullDetailsSection = page?.fullDetailsSection;

  const pageName = service?.name || page?.name || "Service";

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-white">
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
            Service Page Not Found
          </h1>
          <p style={{ fontSize: "16px", marginBottom: "24px" }}>
            The service page for "{slug}" could not be loaded.
          </p>
          <a href="/services" style={{ color: "#c8a96e", textDecoration: "underline" }}>
            ← Back to Services
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{PAGE_STYLES}</style>
      <main className="svc-page">
        <HeroSection heroSection={heroSection} pageName={pageName} pageDescription={page?.description} />
        <SummarySection secondHeroSection={secondHeroSection} />
        <PortfolioSection portfolioSections={portfolioSections} />
        <PricingSection pricingPlans={pricingPlans} />
        <GallerySection galleryItems={galleryItems} />
        <DetailsSection coverageSection={coverageSection} fullDetailsSection={fullDetailsSection} />
        <CTASection pageName={pageName} />
      </main>
    </>
  );
}