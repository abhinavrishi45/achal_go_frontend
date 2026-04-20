"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
  FileText, Search, X, ChevronDown, Shield,
  Calendar, Tag, AlertCircle, Layers, Phone,
} from "lucide-react"

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://achal-backend-trial.tannis.in';

// ─── Styles ──────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

  .tnr-root {
    font-family: 'DM Sans', sans-serif;
    background: #faf9f6;
    color: #0a1628;
    min-height: 100vh;
  }

  /* ── HERO ── */
  .tnr-hero {
    background: linear-gradient(135deg, #0a1628 0%, #1a3a6b 55%, #0d1f40 100%);
    position: relative;
    overflow: hidden;
    padding: 112px 64px 64px;
  }
  .tnr-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: .04;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(200,169,110,.8) 60px, rgba(200,169,110,.8) 61px),
      repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(200,169,110,.8) 60px, rgba(200,169,110,.8) 61px);
  }
  .tnr-hero::after {
    content: '';
    position: absolute;
    bottom: -80px; right: -80px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,169,110,.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .tnr-hero-inner {
    position: relative;
    max-width: 1120px;
    margin: 0 auto;
  }
  .tnr-eyebrow-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .tnr-eyebrow-line {
    display: block;
    width: 24px; height: 1px;
    background: #c8a96e;
  }
  .tnr-eyebrow-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .3em;
    color: #c8a96e;
    text-transform: uppercase;
  }
  .tnr-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 5vw, 64px);
    font-weight: 900;
    color: white;
    line-height: 1.1;
    letter-spacing: -.01em;
    margin: 0 0 16px;
  }
  .tnr-h1 em { font-style: normal; color: #c8a96e; }
  .tnr-hero-sub {
    font-size: 14px;
    color: rgba(255,255,255,.55);
    line-height: 1.7;
    font-weight: 300;
    max-width: 440px;
    margin: 0;
  }
  .tnr-count-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .06em;
    color: #c8a96e;
    border: 1px solid rgba(200,169,110,.3);
    padding: 6px 14px;
    margin-top: 28px;
  }

  /* ── Controls bar ── */
  .tnr-controls-bar {
    background: white;
    border-bottom: 1px solid #e7e0d4;
    padding: 20px 64px;
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 2px 16px rgba(10,22,40,.06);
  }
  .tnr-controls-inner {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  }

  /* search */
  .tnr-search-wrap {
    flex: 1;
    min-width: 220px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .tnr-search-icon {
    position: absolute; left: 14px;
    color: #9ca3af;
    pointer-events: none;
    display: flex;
  }
  .tnr-search-input {
    width: 100%;
    padding: 11px 40px 11px 42px;
    border: 1px solid #e7e0d4;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    background: #fafaf8;
    color: #0a1628;
    outline: none;
    transition: border-color .2s;
  }
  .tnr-search-input::placeholder { color: #9ca3af; }
  .tnr-search-input:focus { border-color: #c8a96e; }
  .tnr-search-clear {
    position: absolute; right: 12px;
    background: none; border: none; cursor: pointer; padding: 2px;
    color: #9ca3af; display: flex;
    transition: color .2s;
  }
  .tnr-search-clear:hover { color: #0a1628; }

  /* select */
  .tnr-select-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .tnr-select-icon {
    position: absolute; left: 12px;
    color: #9ca3af; pointer-events: none; display: flex;
  }
  .tnr-select-chevron {
    position: absolute; right: 10px;
    color: #9ca3af; pointer-events: none; display: flex;
  }
  .tnr-select {
    padding: 11px 36px 11px 36px;
    border: 1px solid #e7e0d4;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    background: #fafaf8;
    color: #0a1628;
    appearance: none;
    cursor: pointer;
    outline: none;
    min-width: 180px;
    transition: border-color .2s;
  }
  .tnr-select:focus { border-color: #c8a96e; }

  /* reset btn */
  .tnr-reset-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 11px 20px;
    border: 1px solid rgba(10,22,40,.2);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    background: transparent;
    color: #0a1628;
    cursor: pointer;
    transition: border-color .2s, background .2s;
    white-space: nowrap;
  }
  .tnr-reset-btn:hover { border-color: #0a1628; background: #f5f3ef; }

  /* ── Body ── */
  .tnr-body {
    max-width: 1120px;
    margin: 0 auto;
    padding: 48px 64px 80px;
  }
  @media (max-width: 768px) {
    .tnr-hero { padding: 100px 24px 48px; }
    .tnr-controls-bar { padding: 16px 24px; }
    .tnr-body { padding: 32px 24px 64px; }
  }

  /* ── Alert ── */
  .tnr-alert {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    padding: 12px 16px;
    color: #b91c1c;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 28px;
  }

  /* ── Loading ── */
  .tnr-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 80px 0;
    color: #9ca3af;
  }
  .tnr-spinner {
    width: 32px; height: 32px;
    border: 2px solid #e7e0d4;
    border-top-color: #c8a96e;
    border-radius: 50%;
    animation: tnr-spin .7s linear infinite;
  }
  @keyframes tnr-spin { to { transform: rotate(360deg); } }
  .tnr-loading-label { font-size: 13px; letter-spacing: .05em; }

  /* ── Empty ── */
  .tnr-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 80px 0;
    color: #9ca3af;
    text-align: center;
  }
  .tnr-empty-icon {
    width: 64px; height: 64px;
    background: #f5f3ef;
    border: 1px solid #e7e0d4;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c8a96e;
  }
  .tnr-empty h3 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #0a1628;
    margin: 0;
  }
  .tnr-empty p { font-size: 13px; margin: 0; max-width: 300px; line-height: 1.7; }

  /* ── Grid ── */
  .tnr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
    gap: 20px;
  }
  @media (max-width: 600px) { .tnr-grid { grid-template-columns: 1fr; } }

  /* ── Card ── */
  .tnr-card {
    background: white;
    border: 1px solid #e7e0d4;
    transition: border-color .25s, box-shadow .25s, transform .25s;
    overflow: hidden;
    cursor: pointer;
    position: relative;
  }
  .tnr-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: #c8a96e;
    transform: scaleX(0);
    transition: transform .25s;
  }
  .tnr-card:hover { border-color: #c8a96e; box-shadow: 0 4px 24px rgba(10,22,40,.08); transform: translateY(-1px); }
  .tnr-card:hover::after { transform: scaleX(1); }

  .tnr-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 24px 24px 20px;
    gap: 12px;
  }
  .tnr-card-meta { flex: 1; min-width: 0; }

  .tnr-card-service {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 8px;
  }

  .tnr-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
    color: #0a1628;
    margin: 0;
  }

  .tnr-card-date {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .08em;
    color: #9ca3af;
    white-space: nowrap;
    flex-shrink: 0;
    text-transform: uppercase;
  }

  .tnr-accent-bar {
    width: 100%; height: 0.5px;
    background: #e7e0d4;
    margin: 0 24px;
    width: calc(100% - 48px);
  }

  .tnr-card-body {
    padding: 20px 24px;
    font-size: 14px;
    line-height: 1.8;
    color: #4b5563;
    overflow: hidden;
    transition: max-height .35s cubic-bezier(.4,0,.2,1);
  }
  .tnr-card-body.collapsed {
    max-height: 96px;
    -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
  }
  .tnr-card-body.expanded {
    max-height: 9999px;
    -webkit-mask-image: none;
    mask-image: none;
  }

  .tnr-card-body p { margin: 0 0 10px; }
  .tnr-card-body p:last-child { margin-bottom: 0; }
  .tnr-card-body ul, .tnr-card-body ol { margin: 0 0 10px 18px; }
  .tnr-card-body li { margin-bottom: 4px; }
  .tnr-card-body h2, .tnr-card-body h3 {
    font-family: 'Playfair Display', serif;
    font-size: 16px; font-weight: 700;
    color: #0a1628; margin: 14px 0 6px;
  }
  .tnr-card-body strong { font-weight: 600; color: #0a1628; }
  .tnr-card-body a { color: #c8a96e; text-decoration: none; }
  .tnr-card-body a:hover { text-decoration: underline; }

  .tnr-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px 20px;
    gap: 12px;
  }

  .tnr-read-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #0a1628;
    background: none;
    border: 1px solid rgba(10,22,40,.2);
    cursor: pointer;
    padding: 8px 16px;
    transition: border-color .2s, background .2s, color .2s;
    font-family: 'DM Sans', sans-serif;
  }
  .tnr-read-more-btn:hover { border-color: #c8a96e; color: #c8a96e; }
  .tnr-read-more-btn.open { background: #0a1628; color: #c8a96e; border-color: #0a1628; }
  .tnr-read-more-btn svg { transition: transform .25s; }
  .tnr-read-more-btn.open svg { transform: rotate(180deg); }

  .tnr-card-id {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .08em;
    color: #9ca3af;
    text-transform: uppercase;
  }

  /* ── CTA bar ── */
  .tnr-cta-bar {
    background: #0a1628;
    padding: 32px 64px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  @media (max-width: 768px) { .tnr-cta-bar { padding: 28px 24px; } }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .tnr-fade-up { animation: fadeUp .35s ease forwards; }
`

function injectStyles() {
  if (typeof document === "undefined") return
  const id = "tnr-styles"
  if (document.getElementById(id)) return
  const el = document.createElement("style")
  el.id = id
  el.textContent = STYLES
  document.head.appendChild(el)
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="tnr-loading">
      <div className="tnr-spinner" />
      <span className="tnr-loading-label">Loading terms…</span>
    </div>
  )
}

function Empty({ query, service }) {
  return (
    <div className="tnr-empty tnr-fade-up">
      <div className="tnr-empty-icon">
        <FileText size={24} />
      </div>
      <h3>No terms found</h3>
      <p>
        {query || service
          ? "Try adjusting your search or filter to find what you're looking for."
          : "No terms have been published yet."}
      </p>
    </div>
  )
}

function TermCard({ item, serviceName, expanded, onToggle }) {
  const hasContent = !!(item.termsText || item.content)

  function formatDate(d) {
    if (!d) return null
    try {
      return new Date(d).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      })
    } catch { return String(d) }
  }

  const dateStr = formatDate(item.effectiveDate)

  return (
    <article
      className="tnr-card tnr-fade-up"
      onClick={hasContent ? onToggle : undefined}
      role={hasContent ? "button" : undefined}
      aria-expanded={expanded}
    >
      <div className="tnr-card-header">
        <div className="tnr-card-meta">
          <div className="tnr-card-service">
            <Tag size={9} />
            {serviceName}
          </div>
          <h3 className="tnr-card-title">
            {item.title || `Terms #${item.id}`}
          </h3>
        </div>
        {dateStr && (
          <div className="tnr-card-date">
            <Calendar size={10} />
            {dateStr}
          </div>
        )}
      </div>

      {hasContent && (
        <>
          <div style={{ height: "0.5px", background: "#e7e0d4", margin: "0 24px" }} />
          <div
            className={`tnr-card-body ${expanded ? "expanded" : "collapsed"}`}
            dangerouslySetInnerHTML={{ __html: item.termsText || item.content || "" }}
          />
          <div style={{ height: "0.5px", background: "#e7e0d4", margin: "0 24px" }} />
          <div className="tnr-card-footer">
            <button
              className={`tnr-read-more-btn ${expanded ? "open" : ""}`}
              onClick={e => { e.stopPropagation(); onToggle() }}
              aria-label={expanded ? "Show less" : "Read more"}
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDown size={12} />
            </button>
            <span className="tnr-card-id">ID #{item.id}</span>
          </div>
        </>
      )}

      {!hasContent && (
        <div className="tnr-card-footer">
          <span className="tnr-card-id">ID #{item.id}</span>
        </div>
      )}
    </article>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TermsAndRules() {
  const [terms, setTerms] = useState([])
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expandedId, setExpandedId] = useState(null)

  injectStyles()

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const [tRes, sRes] = await Promise.all([
          fetch(`${API_BASE}/api/terms`),
          fetch(`${API_BASE}/api/services`),
        ])
        if (!mounted) return
        setTerms(tRes.ok ? await tRes.json() : [])
        setServices(sRes.ok ? await sRes.json() : [])
      } catch (err) {
        console.error("terms load error", err)
        setError("Backend unreachable — no remote terms available.")
        setTerms([])
        setServices([])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [API_BASE])

  useEffect(() => {
    if (!selectedService) return
    let mounted = true;
    (async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/terms/service/${encodeURIComponent(selectedService)}`)
        if (mounted && res.ok) setTerms(await res.json())
      } catch (err) {
        console.error("fetch by service failed", err)
        setError("Failed to load terms for this service.")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [selectedService])

  const filtered = terms.filter(t => {
    if (!t) return false
    const text = (t.title || "") + " " + (t.termsText || t.content || "")
    return text.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div className="tnr-root">

      {/* ── HERO ── */}
      <section className="tnr-hero">
        <div className="tnr-hero-inner">
          <div className="tnr-eyebrow-row">
            <span className="tnr-eyebrow-line" />
            <span className="tnr-eyebrow-label">Legal</span>
          </div>
          <h1 className="tnr-h1">
            Terms <em>&amp; Conditions</em>
          </h1>
          <p className="tnr-hero-sub">
            Our policies, rules, and agreements — clearly laid out for every service we provide.
          </p>
          {!loading && (
            <div className="tnr-count-badge">
              <Shield size={10} />
              {filtered.length} {filtered.length === 1 ? "document" : "documents"}
            </div>
          )}
        </div>
      </section>

      {/* ── Controls bar ── */}
      <div className="tnr-controls-bar">
        <div className="tnr-controls-inner">

          {/* Service filter */}
          <div className="tnr-select-wrap">
            <span className="tnr-select-icon"><Layers size={14} /></span>
            <select
              value={selectedService || ""}
              onChange={e => setSelectedService(e.target.value || null)}
              className="tnr-select"
            >
              <option value="">All services</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name || s.slug || `Service ${s.id}`}
                </option>
              ))}
            </select>
            <span className="tnr-select-chevron"><ChevronDown size={14} /></span>
          </div>

          {/* Search */}
          <div className="tnr-search-wrap">
            <span className="tnr-search-icon"><Search size={15} /></span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search terms and conditions…"
              className="tnr-search-input"
              aria-label="Search terms"
            />
            {query && (
              <button className="tnr-search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Reset */}
          {(selectedService || query) && (
            <button
              className="tnr-reset-btn"
              onClick={() => { setSelectedService(null); setQuery("") }}
            >
              <X size={12} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="tnr-body">

        {error && (
          <div className="tnr-alert">
            <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            {error}
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <Empty query={query} service={selectedService} />
        ) : (
          <div className="tnr-grid">
            {filtered.map(item => (
              <TermCard
                key={item.id}
                item={item}
                serviceName={services.find(s => s.id === item.serviceId)?.name || "General"}
                expanded={expandedId === item.id}
                onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── CTA bar ── */}
      <div className="tnr-cta-bar">
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".25em", color: "rgba(200,169,110,.7)", textTransform: "uppercase", marginBottom: 4 }}>
            Have questions?
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", margin: 0, fontWeight: 300 }}>
            Our team is available Mon–Fri, 9 AM–6 PM IST to assist with any legal queries.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Phone size={15} style={{ color: "#c8a96e" }} />
            <span style={{ fontSize: 14, fontWeight: 500, color: "white" }}>+91 (612) 796-5983</span>
          </div>
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,.1)" }} />
          <a
            href="mailto:info@achalprojects.com"
            style={{ fontSize: 13, color: "#c8a96e", textDecoration: "none", fontWeight: 500 }}
          >
            info@achalprojects.com
          </a>
        </div>
      </div>

    </div>
  )
}