"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from 'next/navigation';


const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80",
    label: "Civil Engineering",
  },
  {
    img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1400&q=80",
    label: "EV Infrastructure",
  },
  {
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80",
    label: "Cargo & Logistics",
  },
  {
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80",
    label: "Restaurant Services",
  },
  {
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80",
    label: "Parking Solutions",
  }
];

const SERVICES = [
  {
    name: "Civil Engineering",
    desc: "Precision structural development & large-scale infrastructure with BIM modeling.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12">
        <rect x="6" y="20" width="36" height="22" rx="1" />
        <path d="M2 20L24 4l22 16" />
        <rect x="18" y="30" width="12" height="12" />
        <line x1="16" y1="20" x2="16" y2="42" />
        <line x1="32" y1="20" x2="32" y2="42" />
      </svg>
    ),
  },
  {
    name: "Parking Solutions",
    desc: "Smart automated parking with real-time monitoring & EV charging integration.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12">
        <circle cx="24" cy="24" r="20" />
        <circle cx="24" cy="24" r="8" />
        <path d="M24 4v8M24 36v8M4 24h8M36 24h8" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Restaurant Services",
    desc: "Premium culinary operations & corporate catering with world-class hospitality.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12">
        <path d="M8 38V14a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v24" />
        <path d="M4 38h40" />
        <path d="M16 12v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
        <line x1="24" y1="12" x2="24" y2="38" />
        <line x1="8" y1="24" x2="40" y2="24" />
      </svg>
    ),
  },
  {
    name: "Cargo & Logistics",
    desc: "End-to-end supply chain mastery with GPS tracking & customs clearance support.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12">
        <rect x="2" y="16" width="32" height="20" rx="2" />
        <path d="M34 22h6l6 8v6h-12V22z" />
        <circle cx="12" cy="38" r="4" />
        <circle cx="36" cy="38" r="4" />
        <line x1="2" y1="26" x2="34" y2="26" />
      </svg>
    ),
  },
  {
    name: "EV Infrastructure",
    desc: "Next-gen charging networks with Level 3 DC fast charge & solar-powered hubs.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12">
        <path d="M24 4l-8 20h16L24 44" />
        <circle cx="24" cy="24" r="18" strokeDasharray="4 3" />
      </svg>
    ),
  },
];

const STATS = [
  { num: 500, suffix: "+", label: "Projects Delivered" },
  { num: 4000, suffix: "+", label: "Global Clients" },
  { num: 200, suffix: "+", label: "Specialists On Board" },
  { num: 12, suffix: "+", label: "Years of Excellence" },
];

const WHY = [
  { n: "01", title: "Innovation First", desc: "Cutting-edge technology and engineering solutions for the challenges of tomorrow, implemented today across all our service verticals." },
  { n: "02", title: "Proven Track Record", desc: "12+ years of consistently delivering exceptional results with 500+ successful projects completed across India." },
  { n: "03", title: "Professional Team", desc: "200+ highly skilled specialists across engineering, logistics, and hospitality — all committed to service excellence." },
  { n: "04", title: "24/7 Support", desc: "Round-the-clock client assistance and project monitoring ensuring zero downtime and complete peace of mind." },
  { n: "05", title: "Eco-Conscious", desc: "Sustainable practices embedded across all operations — from green EV infrastructure to responsible construction materials." },
  { n: "06", title: "One-Point Contact", desc: "Simplified project management through a single point of accountability — our hallmark approach to service delivery." },
];

const TESTIMONIALS = [
  { quote: "Exceptional civil engineering expertise. ACHAL delivered our infrastructure project on time and within budget — their structural precision is unmatched in the industry.", name: "Rajesh Kumar", role: "Construction Manager", rating: 5 },
  { quote: "Outstanding catering and restaurant service for our corporate events. Highly professional and the food quality consistently exceeds expectations.", name: "Priya Sharma", role: "Restaurant Owner", rating: 5 },
  { quote: "Best cargo and logistics service in the region. Reliable, fast, and completely transparent tracking — ACHAL has transformed our supply chain.", name: "Amit Patel", role: "Fleet Manager", rating: 5 },
];

const TICKER_ITEMS = [
  { label: "Years of Excellence", value: "12+" },
  { label: "Projects Delivered", value: "500+" },
  { label: "Clients Served", value: "4,000+" },
  { label: "Industry Verticals", value: "5" },
  { label: "Civil · Parking · Hospitality · Cargo · EV", value: "" },
  { label: "Registered in Bihar, India", value: "" },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [statNums, setStatNums] = useState([]);
  const statsRef = useRef(null);
  const statsAnimated = useRef(false);
  const router = useRouter();

  // API state
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Parse JSON safely
  const safeParse = (data, fallback = []) => {
    if (!data) return fallback;
    if (Array.isArray(data)) return data;
    if (typeof data === 'object') return data;
    try {
      return JSON.parse(data);
    } catch {
      return fallback;
    }
  };

  // Fetch frontpage data from API
  useEffect(() => {
    const fetchFrontpage = async () => {
      try {
        const res = await fetch('https://achal-backend-trial.tannis.in/api/frontpage');
        if (res.ok) {
          const data = await res.json();
          setApiData(data);
        }
      } catch (err) {
        console.error('Error fetching frontpage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFrontpage();
  }, []);

  const heroSlides = useMemo(() => apiData?.heroSlides ? safeParse(apiData.heroSlides, SLIDES) : SLIDES, [apiData?.heroSlides]);
  const tickerItems = useMemo(() => apiData?.tickerItems ? safeParse(apiData.tickerItems, TICKER_ITEMS) : TICKER_ITEMS, [apiData?.tickerItems]);
  const services = useMemo(() => apiData?.services ? safeParse(apiData.services, SERVICES.map(s => ({ name: s.name, description: s.desc }))) : SERVICES, [apiData?.services]);

  const stats = useMemo(() => {
    if (apiData && (apiData.numberOfProjects || apiData.numberOfClients || apiData.teamMembers || apiData.yoe)) {
      return [
        { num: parseInt(apiData.numberOfProjects) || 500, suffix: "+", label: "Projects Delivered" },
        { num: parseInt(apiData.numberOfClients) || 4000, suffix: "+", label: "Global Clients" },
        { num: parseInt(apiData.teamMembers) || 200, suffix: "+", label: "Specialists On Board" },
        { num: parseInt(apiData.yoe) || 12, suffix: "+", label: "Years of Excellence" },
      ];
    }
    return STATS;
  }, [apiData?.numberOfProjects, apiData?.numberOfClients, apiData?.teamMembers, apiData?.yoe]);

  const whyUs = useMemo(() => apiData?.whyPartner ? safeParse(apiData.whyPartner, WHY) : WHY, [apiData?.whyPartner]);
  const testimonials = useMemo(() => apiData?.testimonials ? safeParse(apiData.testimonials, TESTIMONIALS) : TESTIMONIALS, [apiData?.testimonials]);

  const defaultAboutValues = useMemo(() => [
    { title: "Excellence", desc: "Setting the gold standard in every project." },
    { title: "Integrity", desc: "Radical transparency in all partnerships." },
    { title: "Innovation", desc: "Pioneering industrial technology." },
    { title: "Sustainability", desc: "Eco-conscious across all operations." },
  ], []);
  const aboutValues = useMemo(() => apiData?.aboutValues ? safeParse(apiData.aboutValues, defaultAboutValues) : defaultAboutValues, [apiData?.aboutValues, defaultAboutValues]);

  const defaultPortfolioItems = useMemo(() => [
    { img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80", tag: "Civil Engineering", name: "Large-Scale Infrastructure Development", wide: true },
    { img: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=800&q=80", tag: "EV Infrastructure", name: "Rapid Charging Network" },
    { img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", tag: "Cargo & Logistics", name: "Supply Chain Operations" },
  ], []);
  const portfolioItems = useMemo(() => apiData?.portfolioItems ? safeParse(apiData.portfolioItems, defaultPortfolioItems) : defaultPortfolioItems, [apiData?.portfolioItems, defaultPortfolioItems]);

  // Initialize stat numbers
  useEffect(() => {
    setStatNums(stats.map(() => 0));
    statsAnimated.current = false;
  }, [stats]);

  // Auto-slide
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 4000);
    return () => clearInterval(t);
  }, [heroSlides]);

  // Stats counter on scroll
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true;
          stats.forEach((s, i) => {
            const duration = 1800;
            const start = performance.now();
            const tick = (t) => {
              const p = Math.min((t - start) / duration, 1);
              setStatNums((prev) => {
                const next = [...prev];
                next[i] = Math.round(p * s.num);
                return next;
              });
              if (p < 1) requestAnimationFrame(tick);
              else
                setStatNums((prev) => {
                  const next = [...prev];
                  next[i] = s.num;
                  return next;
                });
            };
            requestAnimationFrame(tick);
          });
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stats]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --navy: #0a1628;
          --blue: #1a3a6b;
          --gold: #c8a96e;
          --light: #f5f3ef;
          --white: #ffffff;
          --gray: #6b7280;
          --border: #e5e0d8;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--white);
          color: var(--navy);
          overflow-x: hidden;
          margin: 0;
        }

        .playfair { font-family: 'Playfair Display', serif; }

        /* TICKER */
        .ticker-wrap { background: var(--navy); padding: 14px 0; overflow: hidden; border-top: 1px solid rgba(200,169,110,.3); }
        .ticker-inner { display: flex; animation: ticker 28s linear infinite; white-space: nowrap; }
        .ticker-item { padding: 0 48px; font-size: 12px; letter-spacing: .15em; color: rgba(255,255,255,.6); text-transform: uppercase; border-right: 1px solid rgba(255,255,255,.15); flex-shrink: 0; }
        .ticker-item strong { color: var(--gold); font-weight: 600; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* HERO SLIDE */
        .slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1.2s ease; }
        .slide.active { opacity: 1; }

        /* SERVICE CARD ARROW */
        .service-card { transition: background .3s, border-color .3s; position: relative; }
        .service-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--gold); transform: scaleX(0); transition: transform .3s; }
        .service-card:hover::after { transform: scaleX(1); }
        .service-card:hover { background: var(--light) !important; }
        .service-arrow { transition: transform .3s; display: inline-block; }
        .service-card:hover .service-arrow { transform: translateX(6px); }

        /* PORTFOLIO */
        .portfolio-item img { transition: transform .7s, filter .7s; filter: saturate(.3); }
        .portfolio-item:hover img { transform: scale(1.05); filter: saturate(.7); }

        /* WHY CARD */
        .why-card { border-bottom: 3px solid transparent; transition: border-color .3s; }
        .why-card:hover { border-color: var(--gold); }

        /* STAT CARD */
        .stat-card { transition: transform .3s; }
        .stat-card:hover { transform: translateY(-4px); }

        /* BUTTONS */
        .btn-primary { padding: 14px 36px; background: var(--gold); color: var(--navy); font-weight: 600; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; border: none; cursor: pointer; transition: background .3s, transform .2s; font-family: 'DM Sans', sans-serif; }
        .btn-primary:hover { background: #b8954a; transform: translateY(-1px); }
        .btn-outline { padding: 14px 36px; background: transparent; color: white; font-weight: 600; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; border: 1px solid rgba(255,255,255,.4); cursor: pointer; transition: border-color .3s, color .3s; font-family: 'DM Sans', sans-serif; }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
        .btn-dark-outline { padding: 16px 48px; background: transparent; color: var(--navy); font-weight: 600; font-size: 14px; letter-spacing: .08em; text-transform: uppercase; border: 1px solid rgba(10,22,40,.35); cursor: pointer; transition: border-color .3s, color .3s; font-family: 'DM Sans', sans-serif; }
        .btn-dark-outline:hover { border-color: var(--gold); color: var(--gold); }

        /* VALUE ITEM */
        .value-item { padding: 20px; border: 1px solid var(--border); background: white; }

        /* TCARD */
        .tcard { background: rgba(255,255,255,.04); padding: 44px 36px; border-top: 1px solid rgba(255,255,255,.08); transition: background .3s; }
        .tcard:hover { background: rgba(255,255,255,.07); }

        /* TESTIMONIAL CAROUSEL */
        .testimonial-carousel-container { animation: fadeIn 0.4s ease-in-out; }
        .carousel-nav-btn { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); color: white; width: 44px; height: 44px; border-radius: 8px; cursor: pointer; font-size: 18px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; }
        .carousel-nav-btn:hover { background: rgba(200,169,110,.3); border-color: rgba(200,169,110,.5); }
        .carousel-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,.2); border: none; cursor: pointer; transition: all 0.3s; }
        .carousel-dot.active { background: rgba(200,169,110,.8); width: 28px; border-radius: 5px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* SECTION LABEL */
        .section-label { font-size: 11px; font-weight: 600; letter-spacing: .3em; color: var(--gold); text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .section-label::before { content: ''; display: block; width: 24px; height: 1px; background: var(--gold); }

        /* ABOUT BADGE */
        .about-badge { position: absolute; bottom: -20px; right: -20px; background: var(--navy); color: white; padding: 32px 36px; text-align: center; }

        @media (max-width: 900px) {
          .services-responsive { grid-template-columns: 1fr 1fr !important; }
          .about-responsive { grid-template-columns: 1fr !important; gap: 60px !important; }
          .stats-responsive { grid-template-columns: 1fr 1fr !important; }
          .portfolio-responsive { grid-template-columns: 1fr !important; }
          .why-responsive { grid-template-columns: 1fr !important; }
          .testimonials-responsive { grid-template-columns: 1fr !important; }
          .hero-content-responsive { padding: 40px 24px !important; }
          .section-responsive { padding: 64px 24px !important; }
          .footer-responsive { flex-direction: column !important; gap: 20px !important; text-align: center !important; }
          .portfolio-wide { grid-column: span 1 !important; height: 300px !important; }
          .hide-mobile { display: none !important; }

        /* SLIDE LABEL POP OUT */
        @keyframes slidePopOut { 
          from { opacity: 0; transform: scale(0.5) translateY(20px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        .slide-label { animation: slidePopOut 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        }
      `}</style>

      <main className="w-full bg-white overflow-x-hidden">

        {/* ── HERO ── */}
        <section className="relative w-full min-h-screen md:h-screen overflow-hidden bg-blue-950">
          {/* Slides */}
          <div className="absolute inset-0">
            {heroSlides.map((s, i) => (
              <div key={i} className={`slide${i === slide ? " active" : ""}`}>
                <img src={s.img} alt={s.label} className="w-full h-full object-cover opacity-45" style={{ filter: "saturate(0.3)" }} />
              </div>
            ))}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(10,22,40,.92) 0%,rgba(10,22,40,.6) 60%,rgba(10,22,40,.2) 100%)" }} />

          {/* Content */}
          <div className="hero-content-responsive absolute inset-0 flex flex-col justify-center px-6 md:px-16 py-20 max-w-3xl">
            {/* <div className="section-label text-yellow-700">
              Established 2014 · Bihar, India
            </div> */}

            <h1 className="playfair text-5xl md:text-7xl font-black leading-tight text-white mt-6 mb-7">
              Building Tomorrow.<br />
              <span className="text-yellow-700">Steadfast.</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-white/75 max-w-xl mb-12 font-light">
              ACHAL INTERNATIONAL PRIVATE LIMITED delivers excellence across civil engineering, smart mobility, hospitality, logistics, and green energy infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary" onClick={() => scrollTo("services-sec")}>Explore Services</button>
              <button className="btn-outline" onClick={() => scrollTo("about-sec")}>Our Story</button>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-8 left-6 md:left-16 flex gap-2.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className="transition-all border-none cursor-pointer p-0"
                style={{ width: i === slide ? 48 : 24, height: 2, background: i === slide ? "var(--gold)" : "rgba(255,255,255,.3)" }}
              />
            ))}
          </div>

          {/* Label */}
          <div key={slide} className="hide-mobile slide-label absolute bottom-8 right-6 md:right-16 text-xs tracking-widest text-white/50 uppercase">
            {heroSlides[slide]?.label}
          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div key={i} className="ticker-item">
                {item.value && <strong>{item.value} </strong>}
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="section-responsive px-6 md:px-16 py-14 md:py-15 bg-white" id="services-sec">
          <div className="max-w-7xl mx-auto">
            <div className="section-label">Our Expertise</div>
            <h2 className="playfair text-4xl md:text-5xl font-bold leading-tight text-slate-900 mb-16">
              Five Pillars of<br />Industrial Excellence
            </h2>

            <div className="services-responsive grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border border-gray-200">
              {services.map((svc, i) => {
                const originalService = SERVICES.find(s => s.name === svc.name || s.desc === svc.description);
                return (
                  <div
                    key={i}
                    className="service-card p-8 md:p-8 border-r border-gray-200 last:border-r-0 bg-white hover:bg-amber-50 cursor-pointer"
                  >
                    <div className="text-blue-950 mb-6">{originalService?.icon}</div>
                    <div className="playfair text-lg font-bold text-slate-900 mb-2 leading-snug">{svc.name}</div>
                    <div className="text-sm text-gray-600 leading-relaxed mb-4">{svc.description}</div>
                    {/* <div className="service-arrow inline-block text-lg text-yellow-800">→</div> */}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="section-responsive px-6 md:px-16 py-24 md:py-18 bg-amber-50" id="about-sec">
          <div className="max-w-7xl mx-auto">
            <div className="section-label">Corporate Profile</div>
            <h2 className="playfair text-4xl md:text-5xl font-bold leading-tight text-slate-900 mb-16">
              {apiData?.aboutHeading || "The Name ACHAL\nMeans Unwavering"}
            </h2>

            <div className="about-responsive grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Image */}
              <div className="relative">
                <img
                  src={

                    apiData?.aboutImage || "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"}
                  alt="About Achal"
                  className="w-full h-96 object-cover"
                  style={{ filter: "saturate(.4)" }}
                />
                <div className="about-badge">
                  <div className="playfair text-5xl font-black text-yellow-700 leading-tight">{apiData?.yoe || 12}+</div>
                  <div className="text-xs tracking-widest uppercase text-white/60 mt-1.5">Years of Trust</div>
                </div>
              </div>

              {/* Text */}
              <div>
                <p className="text-base leading-relaxed text-gray-600 mb-6">
                  {apiData?.aboutBody || "ACHAL INTERNATIONAL PRIVATE LIMITED was incorporated in 2014 with a singular vision — to provide professional, dedicated, one-point service excellence across India's core industrial sectors."}
                </p>

                <blockquote className="playfair text-2xl italic text-slate-900 border-l-4 border-yellow-800 pl-6 my-8 leading-relaxed">
                  &quot;{apiData?.aboutQuote || "Unyielding quality in a world that demands constant change."}&quot;
                </blockquote>

                <p className="text-base leading-relaxed text-gray-600 mb-8">
                  {apiData?.aboutBody2 || "Registered in Bihar, we have grown into a multi-disciplinary powerhouse operating in civil construction, urban mobility, hospitality, freight logistics, and sustainable energy infrastructure."}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {aboutValues.map((v, i) => (
                    <div key={i} className="value-item">
                      <div className="font-semibold text-xs tracking-wide uppercase text-slate-900 mb-1.5">{v.title}</div>
                      <div className="text-sm text-gray-600 leading-relaxed">{v.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section ref={statsRef} className="px-2 md:px-16 py-24 bg-slate-900">
          <div className="stats-responsive max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
            {stats.map((s, i) => (
              <div key={i} className="stat-card p-12 border-r border-white/10 last:border-r-0 text-center hover:scale-105 transition-transform">
                <div className="playfair text-5xl md:text-6xl font-black text-yellow-800 leading-tight mb-2.5">
                  {i === 1
                    ? statNums[i] >= 1000
                      ? `${(statNums[i] / 1000).toFixed(0)}K+`
                      : `${statNums[i]}+`
                    : `${statNums[i]}${s.suffix}`}
                </div>
                <div className="text-xs tracking-widest uppercase text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="section-responsive px-6 md:px-16 py-24 md:py-15 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-label">Our Work</div>
            <h2 className="playfair text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              Signature Projects &amp;<br />Capabilities
            </h2>
          </div>

          <div className="portfolio-responsive grid grid-cols-1 lg:grid-cols-2 gap-0.5 mt-16">
            {portfolioItems.map((p, i) => (
              <div key={i} className={`portfolio-item ${p.wide ? 'portfolio-wide lg:col-span-2' : ''} relative overflow-hidden cursor-pointer h-96 ${p.wide ? 'lg:h-80' : 'lg:h-80'}`}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(10,22,40,.9) 0%,rgba(10,22,40,.2) 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="text-xs tracking-widest uppercase text-yellow-800 mb-2 font-semibold">{p.tag}</div>
                  <div className="playfair text-2xl md:text-3xl font-bold text-white leading-tight">{p.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="section-responsive px-6 md:px-16 py-24 md:py-15 bg-amber-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-label">Why Partner With Us</div>
            <h2 className="playfair text-4xl md:text-5xl font-bold leading-tight text-slate-900 mb-16">
              The ACHAL Advantage
            </h2>

            <div className="why-responsive grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
              {whyUs.map((w, i) => (
                <div key={i} className="why-card bg-white p-12 border-b border-gray-200">
                  <div className="playfair text-6xl font-black text-gray-300 leading-tight mb-5">{w.n}</div>
                  <div className="font-semibold text-base uppercase tracking-wide text-slate-900 mb-3">{w.title}</div>

                  <div className="text-sm text-gray-600 leading-relaxed">{w.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="section-responsive px-6 md:px-16 py-24 md:py-15 bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="section-label text-yellow-800">Client Voices</div>
            <h2 className="playfair text-4xl md:text-5xl font-bold leading-tight text-white mb-16">
              What Our Partners Say
            </h2>

            {/* Desktop Grid */}
            <div className="hidden md:grid testimonials-responsive grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
              {testimonials.map((t, i) => (
                <div key={i} className="tcard">
                  <div className="playfair text-4xl text-yellow-700 leading-tight mb-5">&ldquo;</div>
                  <p className="text-sm text-white/75 leading-relaxed italic mb-8">{t.quote}</p>
                  <div className="text-yellow-800 text-sm tracking-wider mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < t.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <div className="font-semibold text-xs tracking-widest uppercase text-white">{t.name}</div>
                  <div className="text-xs text-white/40 mt-1">{t.role}</div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="testimonial-carousel-container">
                <div className="tcard">
                  <div className="playfair text-4xl text-yellow-700 leading-tight mb-5">&ldquo;</div>
                  <p className="text-sm text-white/75 leading-relaxed italic mb-8">{testimonials[testimonialIndex]?.quote}</p>
                  <div className="text-yellow-800 text-sm tracking-wider mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < (testimonials[testimonialIndex]?.rating || 5) ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <div className="font-semibold text-xs tracking-widest uppercase text-white">{testimonials[testimonialIndex]?.name}</div>
                  <div className="text-xs text-white/40 mt-1">{testimonials[testimonialIndex]?.role}</div>
                </div>
              </div>

              {/* Carousel Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="carousel-nav-btn"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`carousel-dot ${i === testimonialIndex ? 'active' : ''}`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="carousel-nav-btn"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>

              {/* Indicator Text */}
              <p className="text-center text-white/50 text-xs mt-4">
                {testimonialIndex + 1} / {testimonials.length}
              </p>
            </div>
          </div>
        </section>
        {/* <PremiumCarousel/> */}

        {/* ── CTA ── */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 bg-slate-900 text-center overflow-hidden">
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle,rgba(200,169,110,.08) 0%,transparent 70%)" }} />
          <div className="relative max-w-4xl mx-auto">
            <h2 className="playfair text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              Ready to Build<br />
              <span className="text-yellow-700">Something Great?</span>
            </h2>
            <p className="text-base md:text-lg text-white/60 mb-12 leading-relaxed">
              Experience the standard of ACHAL INTERNATIONAL. Professionalism that stands the test of time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => router.push('/contact')} className="btn-primary px-12 py-3 text-sm cursor-pointer">Get In Touch</button>
              <button onClick={() => router.push('/get-quote')} className="btn-primary px-12 py-3 text-sm cursor-pointer">Get Quote</button>
              {/* <button className="btn-outline px-12 py-3 text-sm">View Capabilities</button> */}
            </div>
          </div>
        </section>



      </main>
    </>
  );
}