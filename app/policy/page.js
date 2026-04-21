"use client"
import { useEffect, useState } from "react"
import {
  FileText, Search, X, ChevronDown, Shield,
  Calendar, Tag, AlertCircle, Layers, Phone,
} from "lucide-react"

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://achal-backend-trial.tannis.in';

// Reuse styles from terms page
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

  .tnr-root { font-family: 'DM Sans', sans-serif; background: #faf9f6; color: #0a1628; min-height: 100vh; }
  .tnr-hero { background: linear-gradient(135deg, #0a1628 0%, #1a3a6b 55%, #0d1f40 100%); position: relative; overflow: hidden; padding: 112px 64px 64px; }
  .tnr-eyebrow-row { display:flex; gap:12px; margin-bottom:24px; }
  .tnr-eyebrow-line { width:24px; height:1px; background:#c8a96e; display:block; }
  .tnr-eyebrow-label { font-size:11px; font-weight:600; letter-spacing:.3em; color:#c8a96e; text-transform:uppercase; }
  .tnr-h1 { font-family:'Playfair Display', serif; font-size:clamp(40px,5vw,64px); font-weight:900; color:white; margin:0 0 16px; }
  .tnr-h1 em { color:#c8a96e; font-style:normal }
  .tnr-hero-sub { font-size:14px; color: rgba(255,255,255,.55); max-width:440px; font-weight:300 }
  .tnr-count-badge { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600; color:#c8a96e; border:1px solid rgba(200,169,110,.3); padding:6px 14px; margin-top:28px; }

  .tnr-body { max-width:1120px; margin:0 auto; padding:48px 64px 80px; }
  .tnr-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(480px,1fr)); gap:20px }
  .tnr-card { background:white; border:1px solid #e7e0d4; transition: border-color .25s, box-shadow .25s, transform .25s; overflow:hidden; cursor:pointer; position:relative }
  .tnr-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:#c8a96e; transform:scaleX(0); transition:transform .25s }
  .tnr-card:hover{ border-color:#c8a96e; box-shadow:0 4px 24px rgba(10,22,40,.08); transform:translateY(-1px)}
  .tnr-card-header{ display:flex; align-items:flex-start; justify-content:space-between; padding:24px 24px 20px }
  .tnr-card-title{ font-family:'Playfair Display', serif; font-size:20px; font-weight:700; color:#0a1628 }
  .tnr-card-body{ padding:20px 24px; font-size:14px; color:#4b5563; }
  .tnr-card-body.collapsed{ max-height:96px; -webkit-mask-image:linear-gradient(to bottom, black 40%, transparent 100%); mask-image:linear-gradient(to bottom, black 40%, transparent 100%); }
  .tnr-card-body.expanded{ max-height:9999px }
  .tnr-card-footer{ display:flex; align-items:center; justify-content:space-between; padding:14px 24px 20px }
  .tnr-read-more-btn{ display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:600; color:#0a1628; background:none; border:1px solid rgba(10,22,40,.2); padding:8px 16px; cursor:pointer }
  .tnr-empty{ display:flex; flex-direction:column; align-items:center; gap:16px; padding:80px 0; color:#9ca3af }
  .tnr-loading{ display:flex; flex-direction:column; align-items:center; gap:16px; padding:80px 0; color:#9ca3af }
  .tnr-spinner{ width:32px; height:32px; border:2px solid #e7e0d4; border-top-color:#c8a96e; border-radius:50%; animation:spin .7s linear infinite }
  @keyframes spin{ to{ transform:rotate(360deg) } }
`

function injectStyles() {
  if (typeof document === "undefined") return
  const id = "policy-styles"
  if (document.getElementById(id)) return
  const el = document.createElement("style")
  el.id = id
  el.textContent = STYLES
  document.head.appendChild(el)
}

function Spinner() {
  return (
    <div className="tnr-loading">
      <div className="tnr-spinner" />
      <span className="tnr-loading-label">Loading policies…</span>
    </div>
  )
}

function Empty() {
  return (
    <div className="tnr-empty">
      <div className="tnr-empty-icon"><FileText size={24} /></div>
      <h3>No policies found</h3>
      <p>There are no policy documents matching the selected filters.</p>
    </div>
  )
}

function PolicyCard({ item, serviceName, expanded, onToggle }) {
  const hasContent = !!(item.termsText || item.content)
  const dateStr = item.effectiveDate ? new Date(item.effectiveDate).toLocaleDateString() : null
  return (
    <article className="tnr-card" onClick={hasContent ? onToggle : undefined} role={hasContent ? "button" : undefined} aria-expanded={expanded}>
      <div className="tnr-card-header">
        <div>
          <div className="tnr-card-service" style={{ color: '#c8a96e', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.2em' }}>{serviceName}</div>
          <h3 className="tnr-card-title">{item.title || `Policy #${item.id}`}</h3>
        </div>
        {dateStr && (
          <div className="tnr-card-date"><Calendar size={12} /> {dateStr}</div>
        )}
      </div>

      {hasContent && (
        <>
          <div style={{ height: '0.5px', background: '#e7e0d4', margin: '0 24px' }} />
          <div className={`tnr-card-body ${expanded ? 'expanded' : 'collapsed'}`} dangerouslySetInnerHTML={{ __html: item.termsText || item.content || '' }} />
          <div style={{ height: '0.5px', background: '#e7e0d4', margin: '0 24px' }} />
          <div className="tnr-card-footer">
            <button className={`tnr-read-more-btn ${expanded ? 'open' : ''}`} onClick={e => { e.stopPropagation(); onToggle(); }}>{expanded ? 'Show less' : 'Read more'} <ChevronDown size={12} /></button>
            <span className="tnr-card-id">ID #{item.id}</span>
          </div>
        </>
      )}

      {!hasContent && (
        <div className="tnr-card-footer"><span className="tnr-card-id">ID #{item.id}</span></div>
      )}
    </article>
  )
}

export default function PolicyPage() {
  const [policies, setPolicies] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expandedId, setExpandedId] = useState(null)

  injectStyles()

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        // Fetch terms and services, then filter terms to those that are policies (serviceId === 0) or explicitly marked
        const [pRes, sRes] = await Promise.all([
          fetch(`${API_BASE}/api/terms`),
          fetch(`${API_BASE}/api/services`),
        ])
        if (!mounted) return
        const allTerms = pRes.ok ? await pRes.json() : []
        const sList = sRes.ok ? await sRes.json() : []

        // Filter policies: serviceId === 0 or category === 'policy'
        const policiesOnly = Array.isArray(allTerms)
          ? allTerms.filter(t => t && (t.serviceId === 0 || String(t.serviceId) === '0' || t.category === 'policy'))
          : []

        // Ensure a static policy service exists client-side when backend doesn't provide it
        const finalServices = Array.isArray(sList)
          ? (sList.some(s => Number(s.id) === 0) ? sList : [{ id: 0, name: 'policy' }, ...sList])
          : [{ id: 0, name: 'policy' }]

        setPolicies(policiesOnly)
        setServices(finalServices)
      } catch (err) {
        console.error('policy load error', err)
        setError('Backend unreachable — cannot load policies.')
        setPolicies([])
        setServices([])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div className="tnr-root">
      <section className="tnr-hero">
        <div className="tnr-hero-inner">
          <div className="tnr-eyebrow-row"><span className="tnr-eyebrow-line" /><span className="tnr-eyebrow-label">Legal</span></div>
          <h1 className="tnr-h1">Policies</h1>
          <p className="tnr-hero-sub">Official policy documents for ACHAL services and website usage.</p>
          {!loading && <div className="tnr-count-badge"><Shield size={10} /> {policies.length} {policies.length === 1 ? 'document' : 'documents'}</div>}
        </div>
      </section>

      <div className="tnr-body">
        {error && (<div className="tnr-alert"><AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />{error}</div>)}

        {loading ? (
          <Spinner />
        ) : policies.length === 0 ? (
          <Empty />
        ) : (
          <div className="tnr-grid">
            {policies.map(item => (
              <PolicyCard
                key={item.id}
                item={item}
                serviceName={services.find(s => String(s.id) === String(item.serviceId))?.name || 'General'}
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
