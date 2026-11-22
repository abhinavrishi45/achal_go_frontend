"use client";

import { useState, useEffect } from "react";
import { Target, Eye, ArrowRight, Phone, Mail, Loader, CheckCircle2 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://achal-backend-trial.tannis.in';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/about/public`);
        if (!res.ok) throw new Error("Failed to load corporate profile");
        const data = await res.json();

        const safeJSONParse = (value, fallback = []) => {
          if (!value) return fallback;
          if (Array.isArray(value) || typeof value === 'object') return value;
          if (typeof value === 'string') {
            try {
              return JSON.parse(value);
            } catch (e) {
              console.warn("Failed to parse JSON field:", value.substring(0, 100), e);
              return fallback;
            }
          }
          return fallback;
        };

        if (data.team) data.team = safeJSONParse(data.team, []);
        if (data.work) data.work = safeJSONParse(data.work, []);
        if (data.partners) data.partners = safeJSONParse(data.partners, []);
        if (data.stats) data.stats = safeJSONParse(data.stats, []);

        setAboutData(data);
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <main className="w-full bg-white text-slate-900 font-sans">

      {/* ── 1. CORPORATE DOSSIER HERO (BALANCED 2-COLUMN FULL LAYOUT) ── */}
      <section className="bg-[#0a192f] text-white py-20 md:py-28 px-6 md:px-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column (7 cols): Typography & Editorial Copy */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-0.5 bg-[#0284c7]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                  Corporate Profile &bull; Est. 2014
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
                {loading ? (
                  <>About Us</>
                ) : aboutData?.title ? (
                  <span dangerouslySetInnerHTML={{ __html: aboutData.title.replace(/\n/g, '<br />') }} />
                ) : (
                  <>About Us</>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-2xl">
                {loading
                  ? "Connecting core civil infrastructure, multimodal logistics corridors, clean energy networks, and municipal mobility systems across India."
                  : aboutData?.intro || "At Achal International, we are driven by a vision to deliver excellence across diverse sectors, including infrastructure development, logistics, and EV services. With a strong commitment to quality, innovation, and customer satisfaction, we aim to create impactful solutions that meet modern demands while maintaining global standards."}
              </p>

              {/* Corporate Identifiers Footer Bar */}
              <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400 border-t border-slate-800 pt-6">
                <div>CIN: <span className="text-white font-semibold">U74999BR2014PTC022718</span></div>
                <div className="hidden sm:inline text-slate-600">&bull;</div>
                <div>Headquarters: <span className="text-white font-semibold">Patna, Bihar</span></div>
                <div className="hidden sm:inline text-slate-600">&bull;</div>
                <div>Operations: <span className="text-white font-semibold">Pan-India</span></div>
              </div>
            </div>

            {/* Right Column (5 cols): Visual Asset & Operational Metrics */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Architectural Image Card */}
              <div className="relative border border-slate-700/80 overflow-hidden bg-slate-900 shadow-2xl">
                <img
                  src="/banner-1.png"
                  alt="ACHAL Infrastructure Operations"
                  className="w-full h-64 sm:h-72 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="uppercase tracking-wider">Turnkey EPC &bull; Multimodal</span>
                  <span className="text-[#38bdf8] font-bold">Standard 01</span>
                </div>
              </div>

              {/* 2-Box Metric Strip */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/90 border border-slate-800 p-5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight">
                    10+ <span className="text-[#0284c7] text-lg font-bold">Years</span>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    Industry Experience
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight">
                    5 <span className="text-[#0284c7] text-lg font-bold">Verticals</span>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    Core Sectors Served
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {loading ? (
        <section className="py-24 px-6 md:px-16 text-center">
          <Loader size={32} className="animate-spin text-[#0284c7] mx-auto mb-4" />
          <p className="text-sm font-medium text-slate-500">Retrieving corporate profile...</p>
        </section>
      ) : error ? (
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-3xl mx-auto p-6 bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            Unable to load profile data: {error}. Displaying institutional overview.
          </div>
        </section>
      ) : (
        <>
          {/* ── 2. MISSION & VISION (ARCHITECTURAL DUAL SLABS) ── */}
          {(aboutData?.mission || aboutData?.vision) && (
            <section className="py-16 md:py-24 px-6 md:px-16 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                  {/* Mission */}
                  {aboutData?.mission && (
                    <div className="bg-[#0a192f] text-white p-8 md:p-12 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <Target size={18} className="text-[#38bdf8]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                            Our Mission
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
                          Operational Discipline &amp; Industrial Execution
                        </h3>
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                          {aboutData.mission}
                        </p>
                      </div>

                      <div className="pt-8 mt-8 border-t border-slate-800/80 text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Standard // Turnkey Delivery
                      </div>
                    </div>
                  )}

                  {/* Vision */}
                  {aboutData?.vision && (
                    <div className="bg-[#f8fafc] text-slate-900 p-8 md:p-12 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <Eye size={18} className="text-[#0284c7]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                            Our Vision
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
                          Long-Horizon Infrastructure Leadership
                        </h3>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                          {aboutData.vision}
                        </p>
                      </div>

                      <div className="pt-8 mt-8 border-t border-slate-200 text-xs font-mono text-slate-500 uppercase tracking-wider">
                        Horizon // Pan-India Impact
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </section>
          )}

          {/* ── 3. PERFORMANCE METRICS ── */}
          {aboutData?.stats && Array.isArray(aboutData.stats) && aboutData.stats.length > 0 && (
            <section className="py-16 md:py-20 px-6 md:px-16 bg-[#f8fafc] border-b border-slate-200">
              <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-2">
                    Verified Metric Standards
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    Industrial Scale in Numbers
                  </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {aboutData.stats.map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-8 text-left hover:border-[#0284c7] transition-colors">
                      <div className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] mb-2 tracking-tight">
                        {stat.value || stat.num}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── 4. KEY LEADERSHIP & SPECIALISTS ── */}
          {aboutData?.team && Array.isArray(aboutData.team) && aboutData.team.length > 0 && (
            <section className="py-20 md:py-24 px-6 md:px-16 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto">
                <div className="max-w-2xl mb-14">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-2">
                    Executive Governance
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                    Core Technical Leadership
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {aboutData.team.map((member, i) => (
                    <div key={i} className="border border-slate-200 bg-white p-7 flex flex-col justify-between hover:border-slate-400 transition-colors">
                      <div>
                        {member.photo && (
                          <div className="mb-6 h-64 overflow-hidden bg-slate-100 border border-slate-200">
                            <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                          </div>
                        )}
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h4>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-4">
                          {member.role}
                        </div>
                        {member.bio && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {member.bio}
                          </p>
                        )}
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono uppercase text-slate-400">
                        <span>Corporate Directorate</span>
                        <CheckCircle2 size={14} className="text-[#0284c7]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── 5. PROVEN TRACK RECORD / PORTFOLIO ── */}
          {aboutData?.work && Array.isArray(aboutData.work) && aboutData.work.length > 0 && (
            <section className="py-20 md:py-24 px-6 md:px-16 bg-[#f8fafc] border-b border-slate-200">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-2">
                      Executed Contracts
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                      Signature Deployments
                    </h2>
                  </div>
                  <p className="text-sm text-slate-500 max-w-md font-normal leading-relaxed">
                    Representative multi-vertical works spanning transportation infrastructure, airport cargo handling, and green mobility.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {aboutData.work.map((project, i) => (
                    <div key={i} className="border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:border-[#0284c7] transition-colors">
                      <div>
                        {project.image && (
                          <div className="h-56 overflow-hidden bg-slate-100 border-b border-slate-200">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="p-7">
                          <h4 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{project.title}</h4>
                          {project.description && (
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                              {project.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {project.link && (
                        <div className="px-7 pb-7">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0284c7] hover:text-[#0369a1] transition-colors"
                          >
                            Technical Brief <ArrowRight size={14} />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── 6. INSTITUTIONAL ALLIANCES / PARTNERS ── */}
          {aboutData?.partners && Array.isArray(aboutData.partners) && aboutData.partners.length > 0 && (
            <section className="py-16 md:py-20 px-6 md:px-16 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-2">
                    Client &amp; Vendor Matrix
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                    Trusted Collaborations &amp; Alliances
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {aboutData.partners.map((partner, i) => (
                    <div
                      key={i}
                      className="border border-slate-200 bg-slate-50/50 p-6 flex items-center justify-center min-h-[90px] text-center"
                    >
                      {partner.logo ? (
                        <img src={partner.logo} alt={partner.name} className="max-h-10 w-auto opacity-75 hover:opacity-100 transition-opacity" />
                      ) : (
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">{partner.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── 7. CORPORATE CONTACT STRIP ── */}
      <section className="bg-[#0a192f] text-white py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-1">
              Commercial Desk &amp; Tenders
            </div>
            <p className="text-sm text-slate-300">
              Reviewing an EPC contract or freight proposal? Our project coordinators are available Mon–Fri, 9 AM–6 PM IST.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="tel:01206851294" className="flex items-center gap-2 text-sm font-semibold text-white hover:text-[#38bdf8] transition-colors">
              <Phone size={16} className="text-[#0284c7]" /> 0120-6851294
            </a>
            <div className="hidden sm:block w-px h-5 bg-slate-700" />
            <a href="mailto:info@goachal.com" className="flex items-center gap-2 text-sm font-semibold text-[#38bdf8] hover:underline">
              <Mail size={16} /> info@goachal.com
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}