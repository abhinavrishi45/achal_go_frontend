"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { Plane, Truck } from "lucide-react";
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://achal-backend-trial.tannis.in';;


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
        const res = await fetch(`${API_BASE}/api/frontpage`);
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

  // Google Maps integration (uses NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  const mapRef = useRef(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [publicLocations, setPublicLocations] = useState(null);

  const mapLocations = useMemo(() => {
    // Allow backend to provide `serviceLocations` as JSON; fallback to defaults
    const defaults = [
      { name: "Mumbai, India", lat: 19.0760, lng: 72.8777 },
      { name: "Singapore", lat: 1.3521, lng: 103.8198 },
      { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708 },
      { name: "Rotterdam, NL", lat: 51.9225, lng: 4.4791 },
      { name: "London, UK", lat: 51.5074, lng: -0.1278 },
      { name: "Shanghai, CN", lat: 31.2304, lng: 121.4737 },
      { name: "New York, USA", lat: 40.7128, lng: -74.0060 },
      { name: "Santos, BR", lat: -23.9540, lng: -46.3336 },
      { name: "Los Angeles, USA", lat: 34.0522, lng: -118.2437 },
    ];
    if (apiData?.serviceLocations) return safeParse(apiData.serviceLocations, defaults);
    if (publicLocations && Array.isArray(publicLocations)) return safeParse(publicLocations, defaults);
    return defaults;
  }, [apiData?.serviceLocations, publicLocations]);

  // fetch public locations if not provided in frontpage data
  useEffect(() => {
    if (apiData?.serviceLocations) return;
    const fetchPublic = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/locations/public`);
        if (res.ok) {
          const data = await res.json();
          setPublicLocations(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        // ignore silently
        console.error('Failed to fetch public locations', err);
      }
    };
    fetchPublic();
  }, [apiData?.serviceLocations]);

  useEffect(() => {
    // Load Maps JS via backend proxy so API key is not exposed in client network tab
    const proxyUrl = `${API_BASE}/api/google/maps-js`;

    let mapInstance = null;
    const markers = [];

    const loadScript = () => new Promise((resolve, reject) => {
      if (typeof window === 'undefined') return reject(new Error('no window'));
      if (window.google && window.google.maps) return resolve(window.google);
      const s = document.createElement('script');
      s.src = proxyUrl;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve(window.google);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });

    let mounted = true;
    loadScript()
      .then(() => {
        if (!mounted) return;
        const g = window.google;
        mapInstance = new g.maps.Map(mapRef.current, {
          center: { lat: 20.5937, lng: 78.9629 },
          zoom: 4.5,
          disableDefaultUI: true,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#f5f7fb' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#8391a1' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
            { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#e6e9ef' }] },
            { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f8fafc' }] },
            { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#e9eef6' }] },
            { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
            { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#eaf2fb' }] },
          ],
        });

        const info = new g.maps.InfoWindow();

        const icon = {
          path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
          fillColor: '#c8a96e',
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 1.6,
          anchor: new g.maps.Point(12, 24),
        };

        mapLocations.forEach((loc) => {
          // Normalize coordinates (DB/JSON may return strings for DECIMAL fields)
          const lat = loc && loc.lat != null ? parseFloat(loc.lat) : NaN;
          const lng = loc && loc.lng != null ? parseFloat(loc.lng) : NaN;
          if (!isFinite(lat) || !isFinite(lng)) {
            console.warn('Skipping location with invalid coordinates:', loc);
            return;
          }

          const m = new g.maps.Marker({
            position: { lat, lng },
            map: mapInstance,
            title: loc.name,
            icon,
          });

          m.addListener('click', () => {
            const content = `<div style="font-weight:600">${loc.name}</div>${loc.address ? `<div style="font-size:12px;color:#666">${loc.address}</div>` : ''}`;
            info.setContent(content);
            info.open(mapInstance, m);
          });
          markers.push(m);
        });

        setMapsLoaded(true);
      })
      .catch((err) => console.error('Google Maps load failed', err));

    return () => {
      mounted = false;
      markers.forEach((mm) => mm.setMap(null));
      if (mapInstance) mapInstance = null;
    };
  }, [mapLocations]);

  // const appLinks = [
  //   {
  //     name: 'Achal Airline Partner',
  //     Icon: Plane,
  //     stores: [
  //       { type: 'playstore', href: 'https://play.google.com/store/apps/details?id=com.achal.airlinepartner' },
  //       { type: 'appstore', href: 'https://apps.apple.com/in/app/achal-airline-partner/id6817169392' },
  //       // TODO: replace with the real Windows app link
  //       { type: 'windows', href: 'https://cargo.achalprojects.com/uploads/windows.zip' },
  //     ],
  //   },

  //   {
  //     name: 'Achal Delivery Partner',
  //     Icon: Truck,
  //     stores: [
  //       { type: 'playstore', href: 'https://play.google.com/store/apps/details?id=com.achalinternational.deliverypartner' },
  //     ],
  //   },

  // ];


  const appLinks = [
    {
      name: 'Achal Airline Partner',
      Icon: Plane,
      stores: [
        { type: 'playstore', href: 'https://play.google.com/store/apps/details?id=com.achal.airlinepartner' },
        { type: 'appstore', href: 'https://apps.apple.com/in/app/achal-airline-partner/id6817169392' },
        { type: 'windows', href: 'https://cargo.achalprojects.com/uploads/windows.zip' },
      ],
    },
    {
      name: 'Achal Delivery Partner',
      Icon: Truck,
      stores: [
        { type: 'playstore', href: 'https://play.google.com/store/apps/details?id=com.achalinternational.deliverypartner' },
        { type: 'appstore', href: 'https://apps.apple.com/in/app/achal-delivery-partner/id6834347463' },
      ],
    },
  ];
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

        {/* ── HIGH-ELEGANCE ARCHITECTURAL HERO (CLEAN IMAGE VISIBILITY) ── */}
        <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-950">

          {/* 1. Full Natural Image (Crisp, zero desaturation) */}
          <div className="absolute inset-0 z-0">
            {heroSlides.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === slide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  } transition-transform duration-[8000ms]`}
              >
                <img
                  src={s.img}
                  alt={s.label}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}

            {/* 2. Lightened Feathered Shadow (Removes heavy blue wash; sparks & machinery stay bright) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 via-35% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>

          {/* 3. Typography Stage */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 w-full pt-32 pb-24">
            <div className="max-w-2xl">

              {/* Monospace Index Badge with Cyan Pulse */}
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#38bdf8]" />
                <span className="text-xs font-mono tracking-[0.25em] text-cyan-300 uppercase drop-shadow-md">
                  0{slide + 1} &bull; {heroSlides[slide]?.label || "INFRASTRUCTURE"}
                </span>
              </div>

              {/* Modern High-Impact Headline with Cyan-to-Indigo Logo Gradient */}
              <h1
                className="text-5xl sm:text-7xl font-light text-white tracking-tight leading-[1.06] mb-8"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}
              >
                Empowering Everyday <br />
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-500 drop-shadow-[0_2px_20px_rgba(56,189,248,0.35)]">
                  Industrial Scale.
                </span>
              </h1>

              {/* Editorial Lead Copy with Electric Cyan Accent Rule */}
              <p
                className="text-slate-200 text-base sm:text-lg font-light leading-relaxed max-w-xl mb-12 border-l-2 border-cyan-400/80 pl-5"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                ACHAL INTERNATIONAL PRIVATE LIMITED operates high-capacity freight logistics, airport cargo terminals, civil engineering works, and clean mobility infrastructure.
              </p>

              {/* Primary & Secondary Action CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollTo("services-sec")}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Explore Services →
                </button>
                <button
                  onClick={() => scrollTo("about-sec")}
                  className="px-8 py-4 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 hover:border-cyan-400/60 text-white hover:text-cyan-300 font-semibold text-xs uppercase tracking-widest transition-all duration-200 backdrop-blur-md cursor-pointer shadow-lg"
                >
                  Corporate Dossier
                </button>
              </div>

            </div>
          </div>

          {/* 4. Minimalist Stepper with Cyan Glowing Active State */}
          <div className="absolute bottom-8 left-6 sm:left-12 md:left-16 right-6 sm:right-12 md:right-16 z-20 flex items-center justify-between border-t border-white/15 pt-4">
            <div className="flex items-center gap-3">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className="group py-2 focus:outline-none cursor-pointer"
                  aria-label={`Slide ${i + 1}`}
                >
                  <div
                    className={`h-0.5 rounded-full transition-all duration-500 ${i === slide
                      ? "w-12 bg-cyan-400 shadow-[0_0_12px_#38bdf8]"
                      : "w-5 bg-white/40 group-hover:bg-white/70"
                      }`}
                  />
                </button>
              ))}
            </div>

            <div
              className="text-[11px] font-mono tracking-wider text-slate-300 uppercase"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
            >
              PAN-INDIA OPERATIONS // EST. 2014
            </div>
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

        {/* ── SEPARATE SECTION FOR MOBILE APP START ── */}
        <section className="py-16 md:py-20 px-6 md:px-16 bg-white border-t border-slate-200" id="apps-sec">
          <div className="max-w-7xl mx-auto">

            {/* Section Meta Tag */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-4 bg-slate-900 rounded-full" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-slate-900">
                Download App
              </span>
            </div>

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                  Achal Operational <span>Partner Apps</span>
                </h2>
                <p className="text-sm md:text-base text-slate-600 mt-2 font-normal leading-relaxed max-w-2xl">
                  Get real-time telemetry, automated dispatch, air cargo manifests, and fleet coordination directly on your devices.
                </p>
              </div>

              <div className="text-xs font-mono text-slate-500 uppercase tracking-wider shrink-0 hidden sm:block">
                Android &bull; iOS &bull; Windows
              </div>
            </div>

            {/* 2-Column Responsive Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {appLinks.map((app, idx) => {
                const IconComponent = app.Icon;
                const isAirline = app.name.toLowerCase().includes('airline');

                return (
                  <div
                    key={idx}
                    className="group relative bg-[#f8fafc] border border-slate-200/90 hover:border-slate-400 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Top Row: App Icon, Info & Badge */}
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          {/* Clean Monochrome Dark Tile */}
                          <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-300 shrink-0">
                            {IconComponent && <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />}
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug transition-colors">
                              {app.name}
                            </h3>
                            <span className="text-xs font-mono text-slate-500">
                              {isAirline ? "Aviation Baggage & Freight Console" : "On-Ground Delivery & Routing"}
                            </span>
                          </div>
                        </div>

                        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-semibold text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live
                        </span>
                      </div>

                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal mb-8">
                        {isAirline
                          ? "Real-time airline cargo manifests, ramp baggage handover telemetry, flight sync, and customs airway billing."
                          : "Last-mile courier order dispatch, automated navigation telemetry, digital proof-of-delivery (e-POD), and settlements."}
                      </p>
                    </div>

                    {/* Bottom Row: Official Store Badges on Clean Light Background */}
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3 font-semibold">
                        Download App
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {app.stores.map((store, sIdx) => {
                          /* Google Play Badge */
                          if (store.type === 'playstore') {
                            return (
                              <a
                                key={sIdx}
                                href={store.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-4 py-2.5 bg-black hover:bg-neutral-800 text-white border border-transparent rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
                              >
                                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                                  <path fill="#4285F4" d="M3.609 1.814L13.792 12 3.61 22.186a1.867 1.867 0 01-.61-.914V2.728c.15-.36.368-.679.61-.914z" />
                                  <path fill="#34A853" d="M14.849 13.054l2.457 2.457-11.41 6.49 8.953-8.947z" />
                                  <path fill="#FBBC04" d="M17.306 8.489l-2.457 2.457-8.953-8.947 11.41 6.49z" />
                                  <path fill="#EA4335" d="M18.361 9.544l3.228 1.838a1.442 1.442 0 010 2.322l-3.228 1.838-2.138-2.138 2.138-2.138z" />
                                </svg>
                                <div className="flex flex-col text-left">
                                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold leading-none">
                                    GET IT ON
                                  </span>
                                  <span className="text-sm font-bold text-white tracking-tight leading-tight mt-0.5">
                                    Google Play
                                  </span>
                                </div>
                              </a>
                            );
                          }

                          /* Apple App Store Badge */
                          if (store.type === 'appstore') {
                            return (
                              <a
                                key={sIdx}
                                href={store.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-4 py-2.5 bg-black hover:bg-neutral-800 text-white border border-transparent rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
                              >
                                <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 24 24">
                                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.06.66-2.71 1.42-.55.63-.99 1.68-.93 2.7.99.08 2.02-.5 2.63-1.25z" />
                                </svg>
                                <div className="flex flex-col text-left">
                                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold leading-none">
                                    Download on the
                                  </span>
                                  <span className="text-sm font-bold text-white tracking-tight leading-tight mt-0.5">
                                    App Store
                                  </span>
                                </div>
                              </a>
                            );
                          }

                          /* Windows Badge */
                          if (store.type === 'windows') {
                            return (
                              <a
                                key={sIdx}
                                href={store.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-4 py-2.5 bg-black hover:bg-neutral-800 text-white border border-transparent rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
                              >
                                <svg className="w-5 h-5 fill-[#00a4ef] shrink-0" viewBox="0 0 24 24">
                                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.8" />
                                </svg>
                                <div className="flex flex-col text-left">
                                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold leading-none">
                                    DOWNLOAD FOR
                                  </span>
                                  <span className="text-sm font-bold text-white tracking-tight leading-tight mt-0.5">
                                    Windows
                                  </span>
                                </div>
                              </a>
                            );
                          }

                          return null;
                        })}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>
        {/* ── SEPARATE SECTION FOR MOBILE APP END ── */}

        {/* ── SERVICES (FIVE PILLARS - SKY BLUE ARCHITECTURAL CARDS) ── */}
        <section className="py-20 md:py-28 px-6 md:px-16 bg-[#fafbfc] border-t border-slate-200/80" id="services-sec">
          <div className="max-w-7xl mx-auto">

            {/* Section Tag with Sky Blue Accent Line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[3px] bg-[#0284c7] rounded-full" />
              <span className="text-xs md:text-sm font-bold tracking-wider uppercase text-[#0284c7]">
                Our Expertise
              </span>
            </div>

            {/* Section Header with Subtitle */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.12]">
                Five Pillars of <br />
                <span className="text-[#0284c7]">Industrial Excellence</span>
              </h2>
              <p className="text-sm md:text-base text-slate-500 max-w-md font-normal leading-relaxed">
                Turnkey execution across nationwide civil projects, multimodal freight transport, high-capacity EV grids, and urban parking networks.
              </p>
            </div>

            {/* 5-Column Responsive Card Matrix with Sky-Blue Glow Hover */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              {services.map((svc, i) => {
                const originalService = SERVICES.find(
                  (s) => s.name === svc.name || s.desc === svc.description
                );
                const serviceSlug = svc.slug || originalService?.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "civil";

                return (
                  <div
                    key={i}
                    onClick={() => router.push(`/services/${serviceSlug}`)}
                    className="group relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#0284c7]/60 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(2,132,199,0.12)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Top Indicator Accent Line on Hover */}
                    <div className="absolute top-0 left-6 right-6 h-[2.5px] bg-gradient-to-r from-transparent via-[#0284c7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Header: Micro Index Badge & Icon */}
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-[11px] font-mono font-bold tracking-widest text-[#0284c7] px-2.5 py-1 rounded-md bg-sky-50 border border-sky-100/80">
                          0{i + 1}
                        </span>
                        <span className="text-slate-300 group-hover:text-[#0284c7] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-sm">
                          ↗
                        </span>
                      </div>

                      {/* Icon Container with subtle gradient border */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-50 to-sky-50/60 border border-slate-200/80 flex items-center justify-center text-[#0284c7] mb-6 group-hover:scale-105 group-hover:border-[#0284c7]/40 group-hover:shadow-[0_6px_20px_rgba(2,132,199,0.18)] transition-all duration-300">
                        <div className="w-8 h-8 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.6]">
                          {originalService?.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug mb-3 group-hover:text-[#0284c7] transition-colors duration-300">
                        {svc.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                        {svc.description}
                      </p>
                    </div>

                    {/* Bottom Learn More link */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#0284c7] transition-colors">
                      <span>Explore Capability</span>
                      <span className="text-sm font-bold transition-transform group-hover:translate-x-1 duration-200">&rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── ABOUT (CLEAN CORPORATE WITH SKY-BLUE ACCENTS & HOVER) ── */}
        <section className="py-20 md:py-28 px-6 md:px-16 bg-white border-t border-slate-100" id="about-sec">
          <div className="max-w-7xl mx-auto">

            {/* Section Tag with Sky Blue Accent Line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[3px] bg-[#0284c7] rounded-full" />
              <span className="text-xs md:text-sm font-bold tracking-wider uppercase text-[#0284c7]">
                Corporate Profile
              </span>
            </div>

            {/* Section Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-16 max-w-3xl whitespace-pre-line">
              {apiData?.aboutHeading || "The Name ACHAL Means Unwavering"}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left Column: Visual Showcase with Floating Trust Card */}
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-slate-100">
                  <img
                    src={apiData?.aboutImage || "/banner-1.png"}
                    alt="About ACHAL INTERNATIONAL"
                    className="w-full h-[440px] md:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle bottom gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Stat Badge */}
                <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:right-6 bg-slate-900/95 backdrop-blur-md text-white p-6 sm:p-7 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-5 hover:border-[#0284c7]/50 hover:shadow-[0_12px_32px_rgba(2,132,199,0.2)] transition-all duration-300">
                  <div className="text-4xl sm:text-5xl font-black text-[#0284c7] tracking-tight leading-none">
                    {apiData?.yoe || 12}+
                  </div>
                  <div className="border-l border-slate-800 pl-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-white">
                      Years of Trust
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      Est. 2014 &bull; Pan-India
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Overview & Values */}
              <div className="flex flex-col justify-center">
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
                  {apiData?.aboutBody || "ACHAL INTERNATIONAL PRIVATE LIMITED was incorporated in 2014 with a singular vision — to provide professional, dedicated, one-point service excellence across India's core industrial sectors."}
                </p>

                {/* Executive Quote Callout with Brand Sky Blue Border */}
                <blockquote className="relative my-6 pl-6 py-2 border-l-4 border-[#0284c7] bg-slate-50 rounded-r-xl">
                  <p className="text-lg sm:text-xl font-medium text-slate-900 italic leading-snug">
                    &ldquo;{apiData?.aboutQuote || "Unyielding quality in a world that demands constant change."}&rdquo;
                  </p>
                </blockquote>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-8">
                  {apiData?.aboutBody2 || "Registered in Bihar, we have grown into a multi-disciplinary powerhouse operating in civil construction, urban mobility, hospitality, freight logistics, and sustainable energy infrastructure."}
                </p>

                {/* Core Value Micro-Cards with Hover Effect */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aboutValues.map((v, i) => (
                    <div
                      key={i}
                      className="group bg-white p-5 rounded-xl border border-slate-200/90 hover:border-[#0284c7]/50 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(2,132,199,0.08)] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] group-hover:scale-125 transition-transform" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-950 group-hover:text-[#0284c7] transition-colors">
                          {v.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {v.desc}
                      </p>
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

        {/* ── PORTFOLIO (SIGNATURE PROJECTS & CAPABILITIES) ── */}
        <section className="py-20 md:py-28 px-6 md:px-16 bg-white border-t border-slate-200/80" id="portfolio-sec">
          <div className="max-w-7xl mx-auto">

            {/* Section Tag with Sky Blue Accent Line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[3px] bg-[#0284c7] rounded-full" />
              <span className="text-xs md:text-sm font-bold tracking-wider uppercase text-[#0284c7]">
                Our Work
              </span>
            </div>

            {/* Header with Editorial Balance */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.12]">
                Signature Projects &amp; <br />
                <span className="text-[#0284c7]">Capabilities</span>
              </h2>
              <p className="text-sm md:text-base text-slate-500 max-w-md font-normal leading-relaxed">
                High-capacity infrastructure deliveries, high-speed freight transport corridors, and modern multi-level engineering solutions across India.
              </p>
            </div>

            {/* Modern Asymmetric Architectural Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {portfolioItems.map((p, i) => {
                // First item or wide items span full width (12 cols), secondary items span 6 cols
                const isWide = p.wide || i === 0;

                return (
                  <div
                    key={i}
                    className={`group relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(2,132,199,0.16)] hover:border-[#0284c7]/50 transition-all duration-500 cursor-pointer ${isWide ? "lg:col-span-12 h-[380px] sm:h-[440px]" : "lg:col-span-6 h-[340px] sm:h-[400px]"
                      }`}
                  >
                    {/* Crisp, Full-Color Background Image with Smooth Hover Zoom */}
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Seamless Cinematic Gradient (No heavy dark wash; preserves detail) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 via-50% to-transparent pointer-events-none" />

                    {/* Top Right Action Beacon */}
                    <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-[#0284c7] group-hover:border-[#0284c7] transition-all duration-300">
                      <span className="text-base font-bold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&nearr;</span>
                    </div>

                    {/* Content Stage (Anchored Cleanly at Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 z-10 flex flex-col justify-end">

                      {/* Monospace Sector Tag */}
                      <div className="inline-flex items-center gap-2.5 mb-3">
                        <span className="w-2 h-2 rounded-full bg-[#0284c7] shadow-[0_0_8px_#38bdf8]" />
                        <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-cyan-300">
                          {p.tag}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug group-hover:text-cyan-200 transition-colors duration-300 max-w-2xl">
                        {p.name}
                      </h3>

                      {/* Interactive Reveal Line on Hover */}
                      <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>View Project Case Study</span>
                        <span className="text-[#38bdf8] font-bold">&rarr;</span>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── WHY US (SKY BLUE BRAND-MATCHED WITH HOVER) ── */}
        <section className="py-20 md:py-28 px-6 md:px-16 bg-white" id="why-us-sec">
          <div className="max-w-7xl mx-auto">

            {/* Section Tag with Sky Blue Accent Line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[3px] bg-[#0284c7] rounded-full" />
              <span className="text-xs md:text-sm font-bold tracking-wider uppercase text-[#0284c7]">
                WHY US ?
              </span>
            </div>

            {/* Section Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-14">
              Why Choose Achal International ?
            </h2>

            {/* 4-Card Responsive Grid with Hover States */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Card 1: Scale & Execution */}
              <div className="group bg-white rounded-xl p-8 border border-slate-200/90 hover:border-[#0284c7]/50 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(2,132,199,0.12)] transition-all duration-300 flex flex-col justify-start cursor-pointer">
                {/* Outline Icon */}
                <div className="mb-6 text-[#0284c7] group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="14" y="14" width="20" height="20" rx="3" />
                    <circle cx="24" cy="24" r="4" />
                    <path d="M24 6v8M24 34v8M6 24h8M34 24h8" />
                    <path d="M10 10l5 5M33 33l5 5M10 38l5-5M33 15l5-5" />
                    <circle cx="24" cy="4" r="1.5" />
                    <circle cx="24" cy="44" r="1.5" />
                    <circle cx="4" cy="24" r="1.5" />
                    <circle cx="44" cy="24" r="1.5" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight group-hover:text-[#0284c7] transition-colors duration-300">
                  Scale &amp; Execution
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Leverage <strong className="text-[#0284c7] font-semibold">ACHAL&apos;s</strong> diversified engineering and heavy infrastructure mastery across nationwide turnkey project deployments.
                </p>
              </div>

              {/* Card 2: Pan-India Coverage */}
              <div className="group bg-white rounded-xl p-8 border border-slate-200/90 hover:border-[#0284c7]/50 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(2,132,199,0.12)] transition-all duration-300 flex flex-col justify-start cursor-pointer">
                {/* Outline Icon */}
                <div className="mb-6 text-[#0284c7] group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M24 8l10 4v10c0 8-5 14-10 16-5-2-10-8-10-16V12l10-4z" />
                    <path d="M20 22l3 3 6-6" />
                    <path d="M10 32l-4 4a6 6 0 008 8l8-4" />
                    <path d="M38 32l4 4a6 6 0 01-8 8l-8-4" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight group-hover:text-[#0284c7] transition-colors duration-300">
                  Pan-India Coverage
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  <strong className="text-[#0284c7] font-semibold">24x7x365</strong> dedicated logistics control and continuous telemetry ensure critical routes remain operational.
                </p>
              </div>

              {/* Card 3: High Capacity */}
              <div className="group bg-white rounded-xl p-8 border border-slate-200/90 hover:border-[#0284c7]/50 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(2,132,199,0.12)] transition-all duration-300 flex flex-col justify-start cursor-pointer">
                {/* Outline Icon */}
                <div className="mb-6 text-[#0284c7] group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 40V18h6v22M18 40V12h6v28M28 40V22h6v18M38 40V8h6v32" />
                    <path d="M6 40h40" />
                    <path d="M38 18l5-8M43 14v-4h-4" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight group-hover:text-[#0284c7] transition-colors duration-300">
                  High Capacity
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Scalable multi-modal cargo transit, airport terminal logistics, and EV charging corridors tailored to high-volume enterprise demands.
                </p>
              </div>

              {/* Card 4: Optimized Cost */}
              <div className="group bg-white rounded-xl p-8 border border-slate-200/90 hover:border-[#0284c7]/50 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(2,132,199,0.12)] transition-all duration-300 flex flex-col justify-start cursor-pointer">
                {/* Outline Icon */}
                <div className="mb-6 text-[#0284c7] group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="28" cy="14" rx="8" ry="4" />
                    <path d="M20 14v6c0 2.2 3.6 4 8 4s8-1.8 8-4v-6" />
                    <path d="M20 20v6c0 2.2 3.6 4 8 4s8-1.8 8-4v-6" />
                    <path d="M14 26l-6 3a4 4 0 000 7l12 6 12-4" />
                    <path d="M12 16l4-8 4 8M16 8v16" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight group-hover:text-[#0284c7] transition-colors duration-300">
                  Optimized Cost
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Leverage <strong className="text-[#0284c7] font-semibold">ACHAL&apos;s</strong> integrated supply chains and turnkey project models to lower operating friction and overall project costs.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── SERVICE LOCATION ── */}
        <section className="section-responsive px-6 md:px-16 py-24 md:py-15 bg-white" id="service-location-sec">
          <div className="max-w-7xl mx-auto">
            <div className="section-label">Our Service Location</div>
            <h2 className="playfair text-4xl md:text-5xl font-bold leading-tight text-slate-900 mb-8">
              Where We Ship
            </h2>

            <div className="map-wrapper relative rounded-lg p-6 bg-slate-50">
              <style>{`
                .gm-map { width: 100%; height: 650px; border-radius: 8px; overflow: hidden; box-shadow: 0 6px 20px rgba(10,22,40,.06); }
                .locations-list { display:flex; flex-wrap:wrap; gap:8px; margin-top:18px; font-size:13px; color:var(--gray); }
                .locations-list .loc { display:inline-flex; gap:8px; align-items:center; padding:8px 12px; background:#fff; border:1px solid var(--border); border-radius:9999px; }
                @media (max-width:900px){ .gm-map{height:300px} }
              `}</style>

              <div ref={mapRef} id="gm-map" className="gm-map" />


            </div>

          </div>
        </section>

        {/* ── TESTIMONIALS (EXECUTIVE TESTIMONIAL SUITE) ── */}
        <section className="py-20 md:py-28 px-6 md:px-16 bg-[#070e1b] border-t border-slate-800 relative overflow-hidden" id="testimonials-sec">

          {/* Subtle Ambient Brand Glow */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, #0284c7 0%, transparent 70%)" }}
          />

          <div className="max-w-7xl mx-auto relative z-10">

            {/* Section Tag with Sky Blue Accent Line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[3px] bg-[#0284c7] rounded-full" />
              <span className="text-xs md:text-sm font-bold tracking-wider uppercase text-cyan-400 font-mono">
                Client Voices
              </span>
            </div>

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
                What Our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400">
                  Partners Say
                </span>
              </h2>
              <p className="text-sm md:text-base text-slate-400 max-w-md font-normal leading-relaxed">
                Trusted across nationwide EPC deliveries, supply chain operations, and continuous enterprise engagements.
              </p>
            </div>

            {/* Desktop Grid with Interactive Hover Cards */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-slate-800 hover:border-[#0284c7]/50 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(2,132,199,0.15)] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Subtle Top Accent Line */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#0284c7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Top Indicator: Quote Icon & Star Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl text-cyan-400 font-serif leading-none select-none opacity-80 group-hover:scale-110 transition-transform">
                        &ldquo;
                      </span>
                      <div className="flex items-center gap-1 text-cyan-400 text-xs tracking-wider">
                        {[...Array(5)].map((_, idx) => (
                          <span key={idx} className={idx < (t.rating || 5) ? "text-cyan-400" : "text-slate-700"}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-light mb-8 italic">
                      &quot;{t.quote}&quot;
                    </p>
                  </div>

                  {/* Author Footnote */}
                  <div className="pt-6 border-t border-slate-800/80 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-xs font-bold font-mono shrink-0">
                      {t.name ? t.name.charAt(0) : "A"}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-white tracking-wide truncate group-hover:text-cyan-300 transition-colors">
                        {t.name}
                      </div>
                      <div className="text-xs text-slate-400 tracking-wider uppercase font-mono mt-0.5 truncate">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-7 border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl text-cyan-400 font-serif leading-none opacity-80">
                    &ldquo;
                  </span>
                  <div className="flex items-center gap-1 text-cyan-400 text-xs">
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx} className={idx < (testimonials[testimonialIndex]?.rating || 5) ? "text-cyan-400" : "text-slate-700"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  &quot;{testimonials[testimonialIndex]?.quote}&quot;
                </p>

                <div className="pt-5 border-t border-slate-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-xs font-bold font-mono">
                    {testimonials[testimonialIndex]?.name ? testimonials[testimonialIndex]?.name.charAt(0) : "A"}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">
                      {testimonials[testimonialIndex]?.name}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {testimonials[testimonialIndex]?.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center justify-between mt-6 px-2">
                <div className="text-xs font-mono text-slate-400 tracking-wider">
                  0{testimonialIndex + 1} / 0{testimonials.length}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className="w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className="w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>
        {/* <PremiumCarousel/> */}

        {/* ── CTA (ENTERPRISE INDUSTRIAL ENGAGEMENT) ── */}
        <section className="py-20 md:py-24 px-6 md:px-16 bg-[#0a192f] text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

              {/* Left Column: Heading and Context */}
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-0.5 bg-[#0284c7]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                    Project Desk &amp; Commercial Tenders
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
                  Ready to Deliver on Scale?
                </h2>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                  Partner with <strong className="text-white font-semibold">ACHAL INTERNATIONAL PRIVATE LIMITED</strong> for heavy civil infrastructure, multimodal logistics, EV corridor charging networks, and municipal parking facilities across India.
                </p>

                {/* Corporate Registration & Pan-India Footprint */}
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 font-medium">
                  <span>CIN: U74999BR2014PTC022718</span>
                  <span className="hidden sm:inline text-slate-600">&bull;</span>
                  <span>Founded 2014</span>
                  <span className="hidden sm:inline text-slate-600">&bull;</span>
                  <span>Pan-India Turnkey Operations</span>
                </div>
              </div>

              {/* Right Column: Direct Commercial Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => router.push('/contact')}
                  className="px-8 py-4 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-colors duration-150 text-center cursor-pointer shadow-sm"
                >
                  Contact Project Office &rarr;
                </button>

                <button
                  onClick={() => router.push('/get-quote')}
                  className="px-8 py-4 bg-transparent hover:bg-white/5 border border-slate-600 hover:border-slate-300 text-white text-xs font-bold uppercase tracking-wider transition-colors duration-150 text-center cursor-pointer"
                >
                  Request Tender Quote
                </button>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}