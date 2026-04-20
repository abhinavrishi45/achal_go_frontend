"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ArrowRight, Phone, MessageCircle, Search } from "lucide-react";
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://achal-backend-trial.tannis.in';;
import { useRouter } from "next/navigation";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/faqs/public/active`);
        if (res.ok) {
          const data = await res.json();
          setFaqs(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to load FAQs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const categories = [
    "All",
    ...new Set(faqs.map((f) => f.category).filter(Boolean)),
  ];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory =
      selectedCategory === "All" || f.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .playfair { font-family: 'Playfair Display', serif; }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .3em;
          color: #92681f;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: #92681f;
        }

        /* ── Hero ── */
        .hero-bg {
          background: linear-gradient(135deg, #0a1628 0%, #1a3a6b 60%, #0a1628 100%);
        }

        /* ── Search ── */
        .search-wrap {
          position: relative;
          max-width: 560px;
          margin: 0 auto;
        }
        .search-input {
          width: 100%;
          padding: 18px 24px 18px 56px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(200,169,110,.35);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color .3s, background .3s;
          backdrop-filter: blur(8px);
        }
        .search-input::placeholder { color: rgba(255,255,255,.4); }
        .search-input:focus {
          border-color: #c8a96e;
          background: rgba(255,255,255,.12);
        }
        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #c8a96e;
        }

        /* ── Category pills ── */
        .cat-pill {
          padding: 8px 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          border: 1px solid #e7e0d4;
          background: white;
          color: #6b7280;
          cursor: pointer;
          transition: border-color .25s, color .25s, background .25s;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .cat-pill:hover {
          border-color: #c8a96e;
          color: #92681f;
        }
        .cat-pill.active {
          background: #0a1628;
          border-color: #0a1628;
          color: white;
        }

        /* ── FAQ item ── */
        .faq-item {
          border: 1px solid #e7e0d4;
          background: white;
          transition: border-color .3s, box-shadow .3s;
          position: relative;
          overflow: hidden;
        }
        .faq-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #c8a96e;
          transform: scaleY(0);
          transition: transform .3s;
          transform-origin: bottom;
        }
        .faq-item:hover { border-color: #c8a96e; }
        .faq-item:hover::before { transform: scaleY(1); }
        .faq-item.open {
          border-color: #c8a96e;
          box-shadow: 0 8px 32px rgba(200,169,110,.12);
        }
        .faq-item.open::before { transform: scaleY(1); }

        .faq-trigger {
          width: 100%;
          padding: 24px 28px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background .2s;
        }
        .faq-trigger:hover { background: #fafaf8; }

        .faq-number {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-weight: 700;
          color: #c8a96e;
          flex-shrink: 0;
          margin-top: 2px;
          min-width: 28px;
        }

        .faq-chevron {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border: 1px solid #e7e0d4;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: border-color .3s, background .3s, color .3s, transform .3s;
          margin-top: -2px;
        }
        .faq-item.open .faq-chevron {
          border-color: #c8a96e;
          background: #c8a96e;
          color: white;
          transform: rotate(180deg);
        }

        .faq-answer {
          overflow: hidden;
          max-height: 0;
          transition: max-height .4s cubic-bezier(.4,0,.2,1);
        }
        .faq-answer.open { max-height: 600px; }

        .faq-answer-inner {
          padding: 0 28px 24px 76px;
          border-top: 1px solid #f0ece6;
        }

        /* ── Stat counter ── */
        .stat-item {
          text-align: center;
          padding: 32px 24px;
          border: 1px solid #e7e0d4;
        }

        /* ── Buttons ── */
        .btn-gold {
          padding: 14px 40px;
          background: #c8a96e;
          color: #0a1628;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: .08em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background .3s, transform .2s;
          font-family: 'DM Sans', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-gold:hover { background: #b8954a; transform: translateY(-1px); }

        .btn-outline-white {
          padding: 14px 40px;
          background: transparent;
          color: white;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: .08em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,.3);
          cursor: pointer;
          transition: border-color .3s, color .3s;
          font-family: 'DM Sans', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-outline-white:hover { border-color: #c8a96e; color: #c8a96e; }

        /* ── Skeleton ── */
        .skeleton {
          background: linear-gradient(90deg, #f0ece6 25%, #e8e2d9 50%, #f0ece6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Decorative divider ── */
        .gold-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 auto 40px;
          max-width: 200px;
        }
        .gold-divider::before, .gold-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #c8a96e;
        }
        .gold-dot {
          width: 6px;
          height: 6px;
          background: #c8a96e;
          transform: rotate(45deg);
        }

        @media (max-width: 640px) {
          .faq-answer-inner { padding-left: 28px; }
        }
      `}</style>

      <main
        className="w-full bg-white overflow-x-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── HERO ── */}
        <section className="hero-bg relative px-6 md:px-16 py-28 md:py-36 overflow-hidden">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(200,169,110,.6) 48px, rgba(200,169,110,.6) 49px), repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(200,169,110,.6) 48px, rgba(200,169,110,.6) 49px)",
            }}
          />
          <div
            className="absolute top-0 right-0 w-96 h-96 opacity-10"
            style={{
              background: "radial-gradient(circle, #c8a96e 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto text-center">
            <div
              className="section-label justify-center"
              style={{ color: "#c8a96e" }}
            >
              Knowledge Base
            </div>

            <h1 className="playfair text-5xl md:text-7xl font-black text-white leading-tight mt-6 mb-6">
              Frequently Asked
              <br />
              <span style={{ color: "#c8a96e" }}>Questions.</span>
            </h1>

            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-12 font-light max-w-xl mx-auto">
              Everything you need to know about our services, operations, and
              partnership opportunities — answered clearly.
            </p>

            {/* Search Bar */}
            <div className="search-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search questions…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ── FAQ BODY ── */}
        <section className="px-6 md:px-16 py-24 md:py-32 bg-amber-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">

              {/* ── Sidebar: categories + stats ── */}
              <aside className="lg:col-span-1">
                <div className="section-label">Browse By</div>
                <h2
                  className="playfair text-2xl font-bold mb-8"
                  style={{ color: "#0a1628" }}
                >
                  Categories
                </h2>

                <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`cat-pill text-left${selectedCategory === cat ? " active" : ""}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Quick stats */}
                <div className="hidden lg:block mt-14">
                  <div className="section-label">At a Glance</div>
                  <div className="space-y-0.5">
                    <div className="stat-item">
                      <div
                        className="playfair text-4xl font-black"
                        style={{ color: "#c8a96e" }}
                      >
                        {faqs.length}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mt-1">
                        Total FAQs
                      </div>
                    </div>
                    <div className="stat-item">
                      <div
                        className="playfair text-4xl font-black"
                        style={{ color: "#c8a96e" }}
                      >
                        {categories.length - 1}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mt-1">
                        Categories
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* ── FAQ List ── */}
              <div className="lg:col-span-3">
                {/* Result meta */}
                {!loading && (
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                      {filteredFaqs.length} Result
                      {filteredFaqs.length !== 1 ? "s" : ""}
                      {selectedCategory !== "All"
                        ? ` in ${selectedCategory}`
                        : ""}
                      {searchQuery ? ` for "${searchQuery}"` : ""}
                    </p>
                    {(searchQuery || selectedCategory !== "All") && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("All");
                        }}
                        className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-4 transition-colors"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                )}

                {/* Loading skeleton */}
                {loading && (
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="skeleton h-20 border border-stone-200"
                        style={{ opacity: 1 - i * 0.12 }}
                      />
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {!loading && filteredFaqs.length === 0 && (
                  <div className="text-center py-20 border border-stone-200 bg-white">
                    <div
                      className="playfair text-6xl font-black mb-4"
                      style={{ color: "#e7e0d4" }}
                    >
                      ?
                    </div>
                    <p className="text-slate-500 mb-2">No questions found.</p>
                    <p className="text-sm text-slate-400">
                      Try a different search term or category.
                    </p>
                  </div>
                )}

                {/* FAQ items */}
                {!loading && filteredFaqs.length > 0 && (
                  <div className="space-y-0.5">
                    {filteredFaqs.map((faq, idx) => {
                      const isOpen = expandedId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className={`faq-item${isOpen ? " open" : ""}`}
                        >
                          <button
                            className="faq-trigger"
                            onClick={() => toggleExpand(faq.id)}
                          >
                            <span className="faq-number">
                              {String(idx + 1).padStart(2, "0")}
                            </span>

                            <div className="flex-1 min-w-0">
                              {faq.category && (
                                <span
                                  className="text-xs font-semibold uppercase tracking-widest block mb-1"
                                  style={{ color: "#92681f" }}
                                >
                                  {faq.category}
                                </span>
                              )}
                              <h3
                                className="text-sm md:text-base font-semibold leading-snug text-left"
                                style={{ color: "#0a1628" }}
                              >
                                {faq.question}
                              </h3>
                            </div>

                            <div className="faq-chevron ml-4 flex-shrink-0">
                              <ChevronDown size={16} />
                            </div>
                          </button>

                          <div className={`faq-answer${isOpen ? " open" : ""}`}>
                            <div className="faq-answer-inner">
                              <p
                                className="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap pt-4"
                                style={{ fontWeight: 400 }}
                              >
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <section
          className="relative px-6 md:px-16 py-24 md:py-32 overflow-hidden"
          style={{ background: "#0a1628" }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #c8a96e 0, #c8a96e 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5"
            style={{
              background:
                "radial-gradient(circle, #c8a96e 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto text-center">
            <div
              className="section-label justify-center"
              style={{ color: "#c8a96e" }}
            >
              Still Unsure?
            </div>
            <h2 className="playfair text-4xl md:text-6xl font-black text-white leading-tight mt-4 mb-6">
              Didn&apos;t Find
              <br />
              <span style={{ color: "#c8a96e" }}>Your Answer?</span>
            </h2>
            <p className="text-base text-white/60 max-w-xl mx-auto mb-12 leading-relaxed">
              Our specialists are ready to answer any questions not covered
              here. Reach out and we&apos;ll get back to you within 24 business
              hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn-gold px-12 py-4"
                onClick={() => router.push("/contact")}
              >
                <MessageCircle size={16} /> Contact Us
              </button>
              {/* <button className="btn-outline-white px-12 py-4">
                <Phone size={16} /> Call Now
              </button> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}