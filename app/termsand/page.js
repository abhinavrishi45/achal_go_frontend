"use client"
import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { FileText, Search, X, ChevronDown, Shield, Calendar, Tag, ChevronRight, AlertCircle, Layers } from "lucide-react"

// ─── Inject global styles ────────────────────────────────────────────────────
const STYLES = `
  :root {
    --ink:        #0f0f10;
    --ink-2:      #3a3a40;
    --ink-3:      #72727a;
    --rule:       #e4e4e8;
    --bg:         #f8f8f6;
    --surface:    #ffffff;
    --accent:     #1a56db;
    --accent-dim: #dce8ff;
    --warn:       #b45309;
    --warn-dim:   #fef3c7;
    --radius-card: 14px;
    --font-display: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-body:    -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --shadow-card: 0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06);
    --shadow-hover: 0 2px 8px rgba(0,0,0,.07), 0 8px 28px rgba(0,0,0,.10);
    --transition: 220ms cubic-bezier(.4,0,.2,1);
  }
  .dark-terms {
    --ink:        #f0f0f2;
    --ink-2:      #b4b4bc;
    --ink-3:      #6a6a74;
    --rule:       #2e2e36;
    --bg:         #111114;
    --surface:    #1a1a20;
    --accent:     #4f83f7;
    --accent-dim: #1a2640;
    --warn:       #d97706;
    --warn-dim:   #2d1f06;
    --shadow-card: 0 1px 3px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.3);
    --shadow-hover: 0 2px 8px rgba(0,0,0,.4), 0 8px 28px rgba(0,0,0,.4);
  }

  .tnr-root {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--ink);
    min-height: 100vh;
    padding-top: 96px;
    padding-bottom: 80px;
    transition: background var(--transition), color var(--transition);
  }
  .tnr-inner { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

  /* ── Header ── */
  .tnr-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    padding-bottom: 28px;
    border-bottom: 1.5px solid var(--rule);
    margin-bottom: 32px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .tnr-title-group {}
  .tnr-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 600; letter-spacing: .08em;
    text-transform: uppercase; color: var(--accent);
    background: var(--accent-dim);
    padding: 4px 10px; border-radius: 20px;
    margin-bottom: 12px;
  }
  .tnr-h1 {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 46px);
    font-weight: 400;
    letter-spacing: -.02em;
    line-height: 1.1;
    color: var(--ink);
    margin: 0;
  }
  .tnr-h1 em { font-style: normal; color: var(--ink-2); }
  .tnr-count {
    font-size: 13px; color: var(--ink-3);
    background: var(--rule);
    padding: 4px 12px; border-radius: 20px;
    font-variant-numeric: tabular-nums;
    align-self: flex-end;
  }

  /* ── Controls ── */
  .tnr-controls {
    display: flex; gap: 12px; flex-wrap: wrap;
    margin-bottom: 32px;
    align-items: center;
  }
  .tnr-search-wrap {
    flex: 1; min-width: 220px;
    position: relative;
    display: flex; align-items: center;
  }
  .tnr-search-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: var(--ink-3); pointer-events: none;
    display: flex;
  }
  .tnr-search-input {
    width: 100%; padding: 10px 40px 10px 40px;
    border: 1.5px solid var(--rule);
    border-radius: 10px;
    font-family: var(--font-body); font-size: 15px;
    background: var(--surface); color: var(--ink);
    outline: none;
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .tnr-search-input::placeholder { color: var(--ink-3); }
  .tnr-search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
  .tnr-search-clear {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; padding: 2px;
    color: var(--ink-3); display: flex; border-radius: 4px;
    transition: color var(--transition);
  }
  .tnr-search-clear:hover { color: var(--ink); }

  .tnr-select-wrap { position: relative; display: flex; align-items: center; }
  .tnr-select-icon {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    color: var(--ink-3); pointer-events: none; display: flex;
  }
  .tnr-select-chevron {
    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    color: var(--ink-3); pointer-events: none; display: flex;
  }
  .tnr-select {
    padding: 10px 36px 10px 36px;
    border: 1.5px solid var(--rule); border-radius: 10px;
    font-family: var(--font-body); font-size: 15px;
    background: var(--surface); color: var(--ink);
    appearance: none; cursor: pointer; outline: none;
    min-width: 180px;
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .tnr-select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }

  .tnr-reset-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 10px 16px;
    border: 1.5px solid var(--rule); border-radius: 10px;
    font-family: var(--font-body); font-size: 15px; font-weight: 500;
    background: var(--surface); color: var(--ink-2);
    cursor: pointer; white-space: nowrap;
    transition: border-color var(--transition), color var(--transition), background var(--transition);
  }
  .tnr-reset-btn:hover { border-color: var(--ink-3); color: var(--ink); }

  /* ── Alert ── */
  .tnr-alert {
    display: flex; align-items: flex-start; gap: 10px;
    background: var(--warn-dim); border: 1px solid var(--warn);
    border-radius: 10px; padding: 12px 16px;
    color: var(--warn); font-size: 14px; font-weight: 500;
    margin-bottom: 24px;
  }

  /* ── Loading ── */
  .tnr-loading {
    display: flex; flex-direction: column; align-items: center;
    gap: 16px; padding: 80px 0; color: var(--ink-3);
  }
  .tnr-spinner {
    width: 32px; height: 32px;
    border: 2px solid var(--rule);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: tnr-spin .7s linear infinite;
  }
  @keyframes tnr-spin { to { transform: rotate(360deg); } }

  /* ── Empty ── */
  .tnr-empty {
    display: flex; flex-direction: column; align-items: center;
    gap: 14px; padding: 80px 0; color: var(--ink-3); text-align: center;
  }
  .tnr-empty-icon {
    width: 56px; height: 56px;
    background: var(--rule); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .tnr-empty h3 { font-size: 16px; font-weight: 600; color: var(--ink-2); margin: 0; }
  .tnr-empty p { font-size: 14px; margin: 0; max-width: 280px; }

  /* ── Grid ── */
  .tnr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
    gap: 20px;
  }
  @media (max-width: 600px) { .tnr-grid { grid-template-columns: 1fr; } }

  /* ── Card ── */
  .tnr-card {
    background: var(--surface);
    border: 1.5px solid var(--rule);
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
    transition: box-shadow var(--transition), border-color var(--transition), transform var(--transition);
    overflow: hidden;
    cursor: pointer;
  }
  .tnr-card:hover {
    box-shadow: var(--shadow-hover);
    border-color: color-mix(in srgb, var(--accent) 30%, var(--rule));
    transform: translateY(-1px);
  }
  .tnr-card-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    padding: 20px 20px 16px; gap: 12px;
  }
  .tnr-card-meta { flex: 1; min-width: 0; }
  .tnr-card-service {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 600; letter-spacing: .06em;
    text-transform: uppercase; color: var(--accent);
    margin-bottom: 6px;
  }
  .tnr-card-title {
    font-family: var(--font-display);
    font-size: 20px; font-weight: 500;
    line-height: 1.3; letter-spacing: -.01em;
    color: var(--ink); margin: 0;
  }
  .tnr-card-date {
    display: flex; align-items: center; gap: 5px;
    font-size: 13px; color: var(--ink-3);
    white-space: nowrap; flex-shrink: 0;
    margin-top: 2px;
  }

  .tnr-card-divider { height: 1px; background: var(--rule); margin: 0 20px; }

  .tnr-card-body {
    padding: 16px 20px;
    font-size: 15px; line-height: 1.75;
    color: var(--ink-2);
    overflow: hidden;
    transition: max-height .35s cubic-bezier(.4,0,.2,1);
  }
  .tnr-card-body.collapsed { max-height: 90px; -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%); mask-image: linear-gradient(to bottom, black 40%, transparent 100%); }
  .tnr-card-body.expanded  { max-height: 9999px; -webkit-mask-image: none; mask-image: none; }

  .tnr-card-body p { margin: 0 0 10px; }
  .tnr-card-body p:last-child { margin-bottom: 0; }
  .tnr-card-body ul, .tnr-card-body ol { margin: 0 0 10px 18px; }
  .tnr-card-body li { margin-bottom: 4px; }
  .tnr-card-body h2, .tnr-card-body h3 {
    font-family: var(--font-display);
    font-size: 16px; font-weight: 600;
    color: var(--ink); margin: 14px 0 6px;
  }
  .tnr-card-body strong { font-weight: 600; color: var(--ink); }
  .tnr-card-body a { color: var(--accent); text-decoration: none; }
  .tnr-card-body a:hover { text-decoration: underline; }

  .tnr-card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 20px 16px; gap: 12px;
  }
  .tnr-read-more-btn {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 13.5px; font-weight: 600; letter-spacing: .02em;
    color: var(--accent);
    background: none; border: none; cursor: pointer;
    padding: 0; transition: gap var(--transition);
  }
  .tnr-read-more-btn:hover { gap: 8px; }
  .tnr-read-more-btn svg { transition: transform var(--transition); }
  .tnr-read-more-btn.open svg { transform: rotate(180deg); }

  .tnr-card-id {
    font-size: 12px; color: var(--ink-3);
    font-variant-numeric: tabular-nums;
  }
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
      <span style={{ fontSize: 13 }}>Loading terms…</span>
    </div>
  )
}

function Empty({ query, service }) {
  return (
    <div className="tnr-empty">
      <div className="tnr-empty-icon">
        <FileText size={22} />
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
    <article className="tnr-card" onClick={hasContent ? onToggle : undefined} role={hasContent ? "button" : undefined} aria-expanded={expanded}>
      <div className="tnr-card-header">
        <div className="tnr-card-meta">
          <div className="tnr-card-service">
            <Tag size={10} />
            {serviceName}
          </div>
          <h3 className="tnr-card-title">
            {item.title || `Terms #${item.id}`}
          </h3>
        </div>
        {dateStr && (
          <div className="tnr-card-date">
            <Calendar size={11} />
            {dateStr}
          </div>
        )}
      </div>

      {hasContent && (
        <>
          <div className="tnr-card-divider" />
          <div
            className={`tnr-card-body ${expanded ? "expanded" : "collapsed"}`}
            dangerouslySetInnerHTML={{ __html: item.termsText || item.content || "" }}
          />
          <div className="tnr-card-footer">
            <button
              className={`tnr-read-more-btn ${expanded ? "open" : ""}`}
              onClick={e => { e.stopPropagation(); onToggle(); }}
              aria-label={expanded ? "Show less" : "Read more"}
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDown size={13} />
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
  const { theme } = useTheme()
  const [terms, setTerms] = useState([])
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expandedId, setExpandedId] = useState(null)
  const apiBase = process.env.NEXT_PUBLIC_BACKEND_URL || "https://achal-backend-trial.tannis.in"

  injectStyles()

  // initial load
  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const [tRes, sRes] = await Promise.all([
          fetch(`${apiBase}/api/terms`),
          fetch(`${apiBase}/api/services`),
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
  }, [apiBase])

  // filter by service
  useEffect(() => {
    if (!selectedService) return
    let mounted = true;
    (async () => {
      setLoading(true)
      try {
        const res = await fetch(`${apiBase}/api/terms/service/${encodeURIComponent(selectedService)}`)
        if (mounted && res.ok) setTerms(await res.json())
      } catch (err) {
        console.error("fetch by service failed", err)
        setError("Failed to load terms for this service.")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [selectedService, apiBase])

  const filtered = terms.filter(t => {
    if (!t) return false
    const text = (t.title || "") + " " + (t.termsText || t.content || "")
    return text.toLowerCase().includes(query.toLowerCase())
  })

  const isDark = theme === "dark"

  return (
    <div className={`tnr-root${isDark ? " dark-terms" : ""}`}>
      <div className="tnr-inner">

        {/* ── Header ── */}
        <header className="tnr-header">
          <div className="tnr-title-group">
            <div className="tnr-eyebrow">
              <Shield size={10} />
              Legal
            </div>
            <h1 className="tnr-h1">
              Terms <em>&amp; Conditions</em>
            </h1>
          </div>
          {!loading && (
            <div className="tnr-count">
              {filtered.length} {filtered.length === 1 ? "document" : "documents"}
            </div>
          )}
        </header>

        {/* ── Controls ── */}
        <div className="tnr-controls">
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
              <X size={13} />
              Reset
            </button>
          )}
        </div>

        {/* ── Error banner ── */}
        {error && (
          <div className="tnr-alert">
            <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            {error}
          </div>
        )}

        {/* ── Body ── */}
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
    </div>
  )
}