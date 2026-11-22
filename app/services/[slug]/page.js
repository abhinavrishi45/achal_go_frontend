import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Clock,
  Layers,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Building2,
  FileText,
  Phone,
  Mail,
} from "lucide-react";

export const dynamic = "force-dynamic";

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://achal-backend-trial.tannis.in";

function safeParseJSON(v) {
  if (!v) return null;
  if (Array.isArray(v)) return v;
  if (typeof v === "object") return v;

  if (typeof v === "string") {
    try {
      let cleaned = v.trim();
      if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.slice(1, -1);
      }
      return JSON.parse(cleaned);
    } catch (_) {
      if (v.includes("\\n")) {
        return v
          .split("\\n")
          .map((item) => item.trim())
          .filter(Boolean);
      }
      if (v.includes("\n")) {
        return v
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);
      }
      return [v.trim()];
    }
  }
  return v;
}

// ── 1. HERO SECTION ──────────────────────────────────────────
function HeroSection({ heroSection, pageName, pageDescription }) {
  const heading = heroSection?.heading || pageName;
  const sub =
    heroSection?.shortDescription ||
    pageDescription ||
    "Delivering high-tolerance turnkey execution, technical precision, and complete regulatory compliance across India.";
  const bg = heroSection?.backgroundImage || "/banner-1.png";

  return (
    <section className="relative w-full min-h-[520px] lg:min-h-[580px] bg-[#0a192f] text-white flex items-center overflow-hidden border-b border-slate-800">
      {/* Background Graphic Asset */}
      {bg && (
        <img
          src={bg}
          alt={heading}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 saturate-50 pointer-events-none"
        />
      )}

      {/* Corporate Obsidian Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/90 to-transparent" />

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column (8 cols): Metadata & Title */}
          <div className="lg:col-span-8">
            {/* Breadcrumb Strip */}
            <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-6">
              <Link href="/" className="hover:text-[#38bdf8] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/#services-sec" className="hover:text-[#38bdf8] transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-[#38bdf8] font-bold truncate">{pageName}</span>
            </nav>

            {/* Division Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-0.5 bg-[#0284c7]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
                Core Industrial Sector &bull; Turnkey EPC
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              {heading}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              {sub}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/get-quote"
                className="px-8 py-3.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
              >
                Request Commercial Tender <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-transparent border border-slate-600 hover:border-slate-300 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Project Coordination Desk
              </Link>
            </div>

            {/* Verification Metadata Footnote */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400 border-t border-slate-800 pt-6 mt-10">
              <div>CIN: <span className="text-white font-semibold">U74999BR2014PTC022718</span></div>
              <div className="hidden sm:inline text-slate-600">&bull;</div>
              <div>Headquarters: <span className="text-white font-semibold">Patna, Bihar</span></div>
              <div className="hidden sm:inline text-slate-600">&bull;</div>
              <div>Operations: <span className="text-white font-semibold">Pan-India</span></div>
            </div>
          </div>

          {/* Right Column (4 cols): Architectural Stamp Tile */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-4">
            <div className="bg-slate-900/90 border border-slate-800 p-7 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <span>DIVISION STATUS</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE
                </span>
              </div>
              <div className="text-2xl font-bold text-white tracking-tight mb-1">
                ACHAL
              </div>
              <div className="text-xs font-mono text-[#0284c7] uppercase tracking-wider font-semibold mb-4">
                International Private Limited
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Executing high-capacity infrastructure packages, supply chains, and municipal technologies with single-source contractual responsibility.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Sky Blue Bottom Stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-transparent" />
    </section>
  );
}

// ── 2. SUMMARY & KEY SPECIFICATIONS ──────────────────────────
function SummarySection({ secondHeroSection }) {
  if (!secondHeroSection) return null;
  const { mainTitle, singleTitle, descriptions, bullets } = secondHeroSection;
  const bulletList = safeParseJSON(bullets) || [];
  const hasBullets = Array.isArray(bulletList) && bulletList.length > 0;
  if (!mainTitle && !singleTitle && !descriptions && !hasBullets) return null;

  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 ${hasBullets ? "lg:grid-cols-12" : ""} gap-12 lg:gap-16 items-start`}>

          {/* Main Description */}
          <div className={hasBullets ? "lg:col-span-7" : "max-w-3xl"}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-0.5 bg-[#0284c7]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284c7]">
                Technical Briefing
              </span>
            </div>

            {mainTitle && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
                {mainTitle}
              </h2>
            )}

            {singleTitle && (
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-4">
                {singleTitle}
              </div>
            )}

            {descriptions && (
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {descriptions}
              </p>
            )}
          </div>

          {/* Highlights Box */}
          {hasBullets && (
            <div className="lg:col-span-5 bg-white border border-slate-200/90 p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                    Deliverable Specifications
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Audited
                </span>
              </div>

              <ul className="space-y-3.5 m-0 p-0 list-none">
                {bulletList.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 size={16} className="text-[#0284c7] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

// ── 3. PORTFOLIO & SIGNATURE PROJECTS ─────────────────────────
function PortfolioSection({ portfolioSections }) {
  if (!portfolioSections?.length) return null;

  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-0.5 bg-[#0284c7]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284c7]">
                Proven Delivery
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Signature Projects &amp; Capabilities
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Verified Deployments
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioSections.map((p, i) => (
            <div
              key={p.projectId || i}
              className="group border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:border-[#0284c7] transition-all duration-200"
            >
              <div>
                {p.image && (
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={p.image}
                      alt={p.projectName || p.title || `Project ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/85 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#38bdf8] font-bold">
                        {p.tag || "Turnkey Package"}
                      </span>
                      {p.location && (
                        <span className="text-xs font-mono flex items-center gap-1 text-slate-200">
                          <MapPin size={11} className="text-[#38bdf8]" /> {p.location}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0284c7] transition-colors">
                    {p.projectName || p.title}
                  </h3>
                  {p.projectDescription && (
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {p.projectDescription}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                  <span>Technical Specifications</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 4. COMMERCIAL / PRICING PLANS ────────────────────────────
function PricingSection({ pricingPlans }) {
  if (!pricingPlans?.length) return null;

  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-[#0a192f] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-0.5 bg-[#38bdf8]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
                Commercial Framework
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Standard Commercial Tiers
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md font-normal leading-relaxed">
            All enterprise contracts include audited milestone tracking, dedicated safety officers, and complete compliance documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => {
            const benefits = safeParseJSON(plan.benefits) || [];
            const isFeatured = plan.featured || (pricingPlans.length === 3 && i === 1);

            return (
              <div
                key={i}
                className={`relative p-8 flex flex-col justify-between border transition-all ${isFeatured
                  ? "bg-[#0f2442] border-[#38bdf8] shadow-2xl"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-6 bg-[#0284c7] text-white text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1">
                    Primary Industry Standard
                  </div>
                )}

                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    {plan.title}
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
                    {plan.price}
                  </div>

                  <div className="h-px bg-slate-800 mb-6" />

                  {Array.isArray(benefits) && benefits.length > 0 && (
                    <ul className="space-y-3 m-0 p-0 list-none mb-8">
                      {benefits.map((b, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                          <CheckCircle2 size={14} className="text-[#38bdf8] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link
                  href="/get-quote"
                  className={`w-full py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors ${isFeatured
                    ? "bg-[#0284c7] hover:bg-[#0369a1] text-white"
                    : "bg-transparent border border-slate-700 hover:border-slate-400 text-white"
                    }`}
                >
                  Request Technical Proposal &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 5. GALLERY SECTION ────────────────────────────────────────
function GallerySection({ galleryItems }) {
  if (!galleryItems?.length) return null;

  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-0.5 bg-[#0284c7]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284c7]">
            Field Documentation
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-12">
          Operational Gallery
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryItems.map((g, i) => (
            <div
              key={i}
              className="border border-slate-200 bg-white overflow-hidden group h-52 sm:h-64"
            >
              <img
                src={g.image}
                alt={g.title || `Gallery Item ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 6. COVERAGE & TECHNICAL DETAILS ──────────────────────────
function DetailsSection({ coverageSection, fullDetailsSection }) {
  if (!coverageSection && !fullDetailsSection) return null;
  const both = coverageSection && fullDetailsSection;

  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 ${both ? "lg:grid-cols-2" : ""} gap-8`}>

          {/* Coverage / Reach */}
          {coverageSection && (
            <div className="bg-[#0a192f] text-white p-8 sm:p-12 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Globe2 size={18} className="text-[#38bdf8]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
                    Operational Geography
                  </span>
                </div>

                {coverageSection.title && (
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-6">
                    {coverageSection.title}
                  </h3>
                )}

                <div className="space-y-5">
                  {coverageSection.countriesCovered && (
                    <div className="flex items-start gap-4 pb-4 border-b border-slate-800">
                      <div className="w-9 h-9 bg-slate-900 border border-slate-800 flex items-center justify-center text-[#38bdf8] shrink-0">
                        <Globe2 size={16} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          Footprint / Regions
                        </div>
                        <div className="text-sm font-semibold text-white mt-0.5">
                          {coverageSection.countriesCovered}
                        </div>
                      </div>
                    </div>
                  )}

                  {coverageSection.availableServices && (
                    <div className="flex items-start gap-4 pb-4 border-b border-slate-800">
                      <div className="w-9 h-9 bg-slate-900 border border-slate-800 flex items-center justify-center text-[#38bdf8] shrink-0">
                        <Layers size={16} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          Active Divisions
                        </div>
                        <div className="text-sm font-semibold text-white mt-0.5">
                          {coverageSection.availableServices}
                        </div>
                      </div>
                    </div>
                  )}

                  {coverageSection.turnaround && (
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-slate-900 border border-slate-800 flex items-center justify-center text-[#38bdf8] shrink-0">
                        <Clock size={16} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          Turnaround SLA
                        </div>
                        <div className="text-sm font-semibold text-white mt-0.5">
                          {coverageSection.turnaround}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-slate-800 text-xs font-mono text-slate-400 uppercase tracking-wider">
                Regulatory Rigor // ISO Standard Compliant
              </div>
            </div>
          )}

          {/* Full Technical Details */}
          {fullDetailsSection && (
            <div className="bg-[#f8fafc] border border-slate-200 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <ShieldCheck size={18} className="text-[#0284c7]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284c7]">
                    Execution Parameters
                  </span>
                </div>

                {fullDetailsSection.image && (
                  <div className="mb-6 h-56 overflow-hidden border border-slate-200 bg-white">
                    <img
                      src={fullDetailsSection.image}
                      alt={fullDetailsSection.title || "Detail Image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {fullDetailsSection.title && (
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
                    {fullDetailsSection.title}
                  </h3>
                )}

                {fullDetailsSection.description && (
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {fullDetailsSection.description}
                  </p>
                )}
              </div>

              <div className="pt-6 mt-8 border-t border-slate-200 text-xs font-mono text-slate-500 uppercase tracking-wider">
                Corporate Governance Standard
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

// ── 7. INDUSTRIAL CALL TO ACTION ─────────────────────────────
function CTASection({ pageName }) {
  return (
    <section className="py-20 md:py-24 px-6 md:px-16 bg-[#0a192f] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-0.5 bg-[#0284c7]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
                Commercial Tenders &bull; Turnkey EPC
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              Deploy with ACHAL International
            </h2>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
              Partner with our specialized engineering and logistics directors for your upcoming{" "}
              <strong className="text-white font-semibold">
                {pageName ? pageName.toLowerCase() : "industrial"}
              </strong>{" "}
              requirements across India.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
              <span>CIN: U74999BR2014PTC022718</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>Pan-India Operations</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto shrink-0">
            <Link
              href="/get-quote"
              className="px-8 py-4 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-colors text-center shadow-sm"
            >
              Request Tender Quote &rarr;
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-transparent hover:bg-white/5 border border-slate-600 hover:border-slate-300 text-white text-xs font-bold uppercase tracking-wider transition-colors text-center"
            >
              All Industrial Verticals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 8. MAIN SSR PAGE EXPORT ──────────────────────────────────
export default async function ServicePage({ params }) {
  const { slug } = await params;
  let page = null;
  let service = null;

  try {
    // Primary lookup: direct service page slug
    const pageRes = await fetch(`${API_BASE}/api/service-pages/slug/${encodeURIComponent(slug)}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (pageRes.ok) {
      const contentType = String(pageRes.headers.get("content-type") || "").toLowerCase();
      if (contentType.includes("application/json")) {
        page = await pageRes.json();
        service = page?.service || { name: page?.name };
      }
    } else if (pageRes.status === 404) {
      // Secondary fallback lookup: find service first, then load linked page
      const svcRes = await fetch(`${API_BASE}/api/services/slug/${encodeURIComponent(slug)}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (svcRes.ok) {
        service = await svcRes.json();
        if (service?.id) {
          const linkedPageRes = await fetch(`${API_BASE}/api/service-pages/service/${service.id}`, {
            cache: "no-store",
            headers: { Accept: "application/json" },
          });
          if (linkedPageRes.ok) {
            page = await linkedPageRes.json();
          }
        }
      }
    }
  } catch (e) {
    console.error("Error retrieving service page:", e);
    page = null;
  }

  const heroSection = page?.heroSection;
  const secondHeroSection = page?.secondHeroSection;
  const portfolioSections = page?.portfolioSections;
  const pricingPlans = page?.pricingPlans;
  const galleryItems = page?.galleryItems;
  const coverageSection = page?.coverageSection;
  const fullDetailsSection = page?.fullDetailsSection;

  const pageName = service?.name || page?.name || "Service Specification";

  if (!page) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full border border-slate-200 p-8 sm:p-10 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284c7] mx-auto mb-4 font-mono font-bold text-lg">
            !
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Service Specification Not Found
          </h1>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            The requested industrial capability profile for &ldquo;{slug}&rdquo; is currently offline or undergoing technical revision.
          </p>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/#services-sec"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              &larr; View Core Verticals
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-200 text-slate-700 hover:border-slate-400 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Contact Project Office
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-white text-slate-900 font-sans overflow-x-hidden">
      <HeroSection
        heroSection={heroSection}
        pageName={pageName}
        pageDescription={page?.description}
      />
      <SummarySection secondHeroSection={secondHeroSection} />
      <PortfolioSection portfolioSections={portfolioSections} />
      <PricingSection pricingPlans={pricingPlans} />
      <GallerySection galleryItems={galleryItems} />
      <DetailsSection
        coverageSection={coverageSection}
        fullDetailsSection={fullDetailsSection}
      />
      <CTASection pageName={pageName} />
    </main>
  );
}