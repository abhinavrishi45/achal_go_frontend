"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function PremiumCarousel({ services }) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [animKey, setAnimKey] = useState(0)
  const [direction, setDirection] = useState("next")
  const [items, setItems] = useState(services || [])
  const [progressWidth, setProgressWidth] = useState(0)
  const INTERVAL = 6000

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_BACKEND_URL || "https://aachal.onrender.com/"
    fetch(`${apiBase}/api/carousel`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setItems(
            data.map((it) => ({
              title: it.title,
              description: it.description,
              image: it.image,
              features: it.features || [],
              color: it.color || "",
            }))
          )
        }
      })
      .catch(() => { })
  }, [])

  // Progress bar + auto-advance
  useEffect(() => {
    if (!autoPlay) return
    setProgressWidth(0)
    const startTime = Date.now()

    const tick = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / INTERVAL) * 100, 100)
      setProgressWidth(pct)
    }, 30)

    const advance = setTimeout(() => {
      setDirection("next")
      setAnimKey((k) => k + 1)
      setCurrentIndex((prev) => (prev + 1) % (items.length || 1))
    }, INTERVAL)

    return () => {
      clearInterval(tick)
      clearTimeout(advance)
    }
  }, [autoPlay, currentIndex, items.length])

  const navigate = (dir) => {
    setDirection(dir)
    setAnimKey((k) => k + 1)
    setProgressWidth(0)
    setAutoPlay(false)
    setCurrentIndex((prev) =>
      dir === "next"
        ? (prev + 1) % (items.length || 1)
        : (prev - 1 + (items.length || 1)) % (items.length || 1)
    )
    setTimeout(() => setAutoPlay(true), 8000)
  }

  const goToIndex = (i) => {
    setDirection(i > currentIndex ? "next" : "prev")
    setAnimKey((k) => k + 1)
    setProgressWidth(0)
    setCurrentIndex(i)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 8000)
  }

  const getSlug = (title) => title.toLowerCase().replace(/\s+/g, "-")

  const currentService = items[currentIndex] || {
    title: "",
    description: "",
    image: "",
    features: [],
    color: "",
  }

  const isEven = currentIndex % 2 === 0

  return (
    <section
      className="w-full bg-background border-t border-b border-border overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <style>{`
        @keyframes cFadeLeft {
          from { opacity: 0; transform: translateX(-48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cFadeRight {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cImgIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes cLineGrow {
          from { width: 0; }
          to   { width: 48px; }
        }
        @keyframes cPingAnim {
          0%   { transform: scale(1); opacity: 1; }
          75%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .c-anim-left  { animation: cFadeLeft  0.75s cubic-bezier(.22,1,.36,1) both; }
        .c-anim-right { animation: cFadeRight 0.75s cubic-bezier(.22,1,.36,1) both; }
        .c-anim-up    { animation: cFadeUp    0.65s cubic-bezier(.22,1,.36,1) both; }
        .c-anim-img   { animation: cImgIn     0.85s cubic-bezier(.22,1,.36,1) both; }

        .c-d1 { animation-delay: 0.06s; }
        .c-d2 { animation-delay: 0.12s; }
        .c-d3 { animation-delay: 0.20s; }
        .c-d4 { animation-delay: 0.28s; }
        .c-d5 { animation-delay: 0.36s; }
        .c-d6 { animation-delay: 0.44s; }

        .c-tag-line {
          display: inline-block;
          height: 2px;
          background: #c8a96e;
          animation: cLineGrow 0.5s 0.3s cubic-bezier(.22,1,.36,1) both;
        }

        .c-ping-ring {
          animation: cPingAnim 1.4s cubic-bezier(0,0,.2,1) infinite;
        }

        .c-feature-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 16px;
          background: white;
          border: 1px solid #e5e0d8;
          cursor: default;
          transition: background 0.3s, border-color 0.3s, transform 0.25s;
        }
        .c-feature-item:hover {
          background: #0a1628;
          border-color: #0a1628;
          transform: translateX(4px);
        }
        .c-feature-item:hover .c-feat-dot  { background: #c8a96e; }
        .c-feature-item:hover .c-feat-text { color: #fff; }

        .c-feat-dot  { width: 6px; height: 6px; border-radius: 0; background: #0a1628; flex-shrink: 0; transition: background .3s; }
        .c-feat-text { font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #0a1628; transition: color .3s; line-height: 1.3; }

        .c-nav-btn {
          width: 52px; height: 52px;
          background: #0a1628;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.25s, transform 0.2s;
        }
        .c-nav-btn:hover { background: #c8a96e; transform: scale(1.08); }

        .c-dot-btn {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #e5e0d8;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, width 0.35s, border-radius 0.35s;
        }
        .c-dot-btn.c-dot-active {
          width: 32px;
          border-radius: 4px;
          background: #c8a96e;
        }

        .c-thumb-btn {
          flex-shrink: 0;
          width: 80px; height: 56px;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          transition: opacity 0.3s, border-color 0.3s;
          background: transparent;
        }
        .c-thumb-btn img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.3); display: block; }

        .c-cta-primary {
          padding: 13px 28px;
          background: #0a1628;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background .25s;
          font-family: inherit;
        }
        .c-cta-primary:hover { background: #c8a96e; }

        .c-cta-secondary {
          padding: 13px 24px;
          background: transparent;
          color: #0a1628;
          border: 1px solid #e5e0d8;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          transition: border-color .25s, color .25s;
          font-family: inherit;
        }
        .c-cta-secondary:hover { border-color: #0a1628; color: #c8a96e; }

        .c-img-wrap { overflow: hidden; }
        .c-img-inner { width: 100%; height: 100%; transition: transform 0.7s ease; }
        .c-img-wrap:hover .c-img-inner { transform: scale(1.06); }

        @media (max-width: 768px) {
          .c-split-grid { grid-template-columns: 1fr !important; }
          .c-img-panel { min-height: 260px !important; order: 0 !important; }
          .c-content-panel { order: 1 !important; padding: 36px 28px !important; }
          .c-feat-grid { grid-template-columns: 1fr !important; }
          .c-outer-pad { padding: 48px 20px 0 !important; }
          .c-footer-pad { padding: 24px 20px 48px !important; }
          .c-header-pad { padding: 56px 20px 0 !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="c-header-pad px-8 md:px-16 pt-12 md:pt-20 max-w-5xl mx-auto">
        {/* <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 24, height: 1, background: "var(--c-gold)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--c-gold)" }}>
                Signature Services
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px,4vw,56px)",
              fontWeight: 900,
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-.02em",
              color: "var(--c-navy)"
            }}>
              Elite<br />Capabilities
            </h2>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--c-gray)", maxWidth: 400, margin: 0 }}>
            A comprehensive look at our sectoral leadership and precision-driven service ecosystem.
          </p>
        </div> */}
      </div>

      {/* ── MAIN CAROUSEL ── */}
      <div className="c-outer-pad px-8 md:px-16 pt-14 mx-auto max-w-5xl">
        <div className="flex items-stretch gap-5">

          {/* Prev */}
          <div className="flex items-center">
            <button className="c-nav-btn" onClick={() => navigate("prev")} aria-label="Previous">
              <ChevronLeft size={22} />
            </button>
          </div>

          {/* Card */}
          <div
            className="c-split-grid flex-1 border border-gray-200 min-h-96 overflow-hidden bg-white grid grid-cols-2"
          >
            {/* IMAGE PANEL */}
            <div
              key={`img-${animKey}`}
              className="c-anim-img c-img-wrap c-img-panel relative"
              style={{
                minHeight: 460,
                order: isEven ? 0 : 1,
              }}
            >
              <div className="c-img-inner absolute inset-0">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover block"
                  style={{ filter: "saturate(.45)" }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
                  }}
                />
              </div>

              {/* Gradient */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "linear-gradient(to top, rgba(10,22,40,.75) 0%, rgba(10,22,40,.1) 55%, transparent 100%)",
              }} />

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="inline-block bg-yellow-800 text-slate-900 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 mb-2.5">
                  0{currentIndex + 1}&nbsp;/&nbsp;0{items.length}
                </div>
                <div className="font-serif text-2xl font-bold text-white leading-tight">
                  {currentService.title}
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-5 right-5 w-8 h-8 border-2 pointer-events-none" style={{
                borderColor: "rgba(200,169,110,.55)",
              }} />
            </div>

            {/* CONTENT PANEL */}
            <div
              className="c-content-panel flex flex-col justify-center p-12 md:p-14 bg-amber-50"
              style={{
                order: isEven ? 1 : 0,
              }}
            >
              {/* Badge */}
              <div key={`badge-${animKey}`} className="c-anim-up flex items-center gap-2.5 mb-7">
                <span className="relative inline-flex w-2 h-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-800 block" />
                  <span className="c-ping-ring absolute inset-0 rounded-full bg-yellow-800" />
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
                  Service Portfolio
                </span>
                <div className="c-tag-line" />
              </div>

              {/* Title */}
              <div key={`title-${animKey}`} className="c-anim-up c-d1 mb-4">
                <h3 className="font-serif text-2xl md:text-4xl font-black leading-snug -tracking-widest text-slate-900 uppercase">
                  {currentService.title}
                </h3>
              </div>

              {/* Gold divider */}
              <div key={`div-${animKey}`} className="c-anim-up c-d2 w-10 h-0.5 bg-yellow-800 mb-4.5" />

              {/* Description */}
              <div key={`desc-${animKey}`} className="c-anim-up c-d3 mb-8">
                <p className="text-sm leading-relaxed text-gray-500 m-0">
                  {currentService.description}
                </p>
              </div>

              {/* Features */}
              <div
                key={`feat-${animKey}`}
                className="c-feat-grid grid grid-cols-2 gap-2 mb-8"
              >
                {currentService.features.map((f, idx) => {
                  const delays = ["c-d3", "c-d4", "c-d4", "c-d5", "c-d5", "c-d6"]
                  return (
                    <div key={idx} className={`c-feature-item c-anim-up ${delays[Math.min(idx, delays.length - 1)]}`}>
                      <div className="c-feat-dot" />
                      <span className="c-feat-text">{f}</span>
                    </div>
                  )
                })}
              </div>

              {/* CTAs */}
              <div key={`cta-${animKey}`} className="c-anim-up c-d6 flex gap-3 flex-wrap">
                <button
                  className="c-cta-primary"
                  onClick={() => router.push(`/services/${getSlug(currentService.title)}`)}
                >
                  Inquire Now
                  <ChevronRight size={15} />
                </button>
                <button
                  className="c-cta-secondary"
                  onClick={() => router.push(`/services/${getSlug(currentService.title)}`)}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Next */}
          <div className="flex items-center">
            <button className="c-nav-btn" onClick={() => navigate("next")} aria-label="Next">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER: DOTS + PROGRESS + THUMBNAILS ── */}
      <div className="c-footer-pad px-8 md:px-16 py-6 md:py-12 mx-auto max-w-5xl">

        {/* Controls row */}
        <div className="flex items-center justify-between gap-5 mb-5 flex-wrap">

          {/* Dots */}
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                className={`c-dot-btn${i === currentIndex ? " c-dot-active" : ""}`}
                onClick={() => goToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-xl text-slate-900">
              0{currentIndex + 1}
            </span>
            <span className="text-gray-300 text-sm">/</span>
            <span className="text-sm text-gray-500 font-medium">0{items.length}</span>
          </div>

          {/* Progress bar */}
          <div className="flex-1 max-w-44 h-0.5 bg-gray-200 overflow-hidden">
            <div style={{
              height: "100%",
              background: "#c8a96e",
              width: autoPlay ? `${progressWidth}%` : "0%",
              transition: "none"
            }} />
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {items.map((svc, i) => (
            <button
              key={i}
              className="c-thumb-btn flex-shrink-0 w-20 h-14 p-0 cursor-pointer overflow-hidden relative transition-opacity duration-300"
              onClick={() => goToIndex(i)}
              aria-label={svc.title}
              style={{
                border: i === currentIndex ? "2px solid #c8a96e" : "2px solid transparent",
                opacity: i === currentIndex ? 1 : 0.45,
              }}
            >
              <img
                src={svc.image}
                alt={svc.title}
                className="w-full h-full object-cover block"
                style={{ filter: "saturate(.3)" }}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=60"
                }}
              />
              {i === currentIndex && (
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "rgba(200,169,110,.18)",
                }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}