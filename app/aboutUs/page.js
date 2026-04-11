"use client";
import { useState, useEffect } from "react";
import { Users, Target, Eye, Award, ArrowRight, Phone, Building2, TrendingUp, Loader } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://achal-backend-trial.tannis.in";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/about/public`);
        if (!res.ok) throw new Error("Failed to fetch about data");
        const data = await res.json();

        // Helper function to safely parse JSON strings
        const safeJSONParse = (value, fallback = null) => {
          if (!value) return fallback;
          if (typeof value === 'object') return value;
          if (typeof value === 'string') {
            try {
              return JSON.parse(value);
            } catch (e) {
              console.warn("Failed to parse JSON field:", value.substring(0, 100), "...", e);
              return fallback;
            }
          }
          return fallback;
        };

        // Parse JSON strings safely
        if (data.team) {
          data.team = safeJSONParse(data.team, []);
        }
        if (data.work) {
          data.work = safeJSONParse(data.work, []);
        }
        if (data.partners) {
          data.partners = safeJSONParse(data.partners, []);
        }
        if (data.stats) {
          data.stats = safeJSONParse(data.stats, []);
        }

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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        .playfair { font-family: 'Playfair Display', serif; }
        .about-hero {
          background: linear-gradient(135deg, #0a1628 0%, #1a3a6b 55%, #0d1f40 100%);
          position: relative;
          overflow: hidden;
        }
        .about-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: .04;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(200,169,110,.8) 60px, rgba(200,169,110,.8) 61px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(200,169,110,.8) 60px, rgba(200,169,110,.8) 61px);
        }
        .about-hero::after {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,169,110,.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .accent-bar {
          width: 32px; height: 2px;
          background: #c8a96e;
          margin-bottom: 20px;
        }
        .team-card {
          background: white;
          border: 1px solid #e7e0d4;
          padding: 32px 28px;
          transition: all .3s;
          position: relative;
          overflow: hidden;
        }
        .team-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: #c8a96e;
          transform: scaleX(0);
          transition: transform .3s;
        }
        .team-card:hover::after { transform: scaleX(1); }
        .team-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(10,22,40,.08); }
        .work-card {
          background: white;
          border: 1px solid #e7e0d4;
          overflow: hidden;
          transition: all .3s;
          position: relative;
        }
        .work-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(10,22,40,.85) 100%);
          opacity: 0;
          transition: opacity .3s;
          pointer-events: none;
        }
        .work-card:hover::before { opacity: 1; }
        .work-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(10,22,40,.12); }
        .stat-box {
          background: white;
          border: 1px solid #e7e0d4;
          padding: 32px 28px;
          text-align: center;
          transition: all .25s;
          position: relative;
        }
        .stat-box::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: #c8a96e;
          transform: scaleX(0);
          transition: transform .25s;
        }
        .stat-box:hover::after { transform: scaleX(1); }
        .stat-box:hover { border-color: #c8a96e; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp .35s ease forwards; }
      `}</style>

      <div className="min-h-screen bg-amber-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* ── HERO ── */}
        <section className="about-hero pt-28 pb-16 px-6 md:px-16">
          <div className="relative max-w-7xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <span style={{ display: "block", width: 24, height: 1, background: "#c8a96e" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".3em", color: "#c8a96e", textTransform: "uppercase" }}>
                About Us
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <h1 className="playfair text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                  {loading ? (
                    <>Building Excellence<br /><span style={{ color: "#c8a96e" }}>Since 2008.</span></>
                  ) : aboutData?.title ? (
                    <span dangerouslySetInnerHTML={{ __html: aboutData.title.replace(/\n/g, '<br />') }} />
                  ) : (
                    <>Building Excellence<br /><span style={{ color: "#c8a96e" }}>Since 2008.</span></>
                  )}
                </h1>
                <p className="text-white/80 text-md leading-relaxed font-light">
                  {loading ? "Loading..." : aboutData?.intro || "Delivering innovative construction and engineering solutions across Bihar and beyond."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <section className="px-6 md:px-16 py-16">
            <div className="max-w-7xl mx-auto text-center">
              <Loader size={32} className="animate-spin mx-auto mb-4" style={{ color: "#c8a96e" }} />
              <p style={{ color: "#6b7280", fontSize: 14 }}>Loading content...</p>
            </div>
          </section>
        ) : error ? (
          <section className="px-6 md:px-16 py-16">
            <div className="max-w-7xl mx-auto text-center">
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "24px", color: "#b91c1c", fontSize: 14 }}>
                Unable to load content: {error}
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* ── MISSION & VISION ── */}
            {(aboutData?.mission || aboutData?.vision) && (
              <section className="px-6 md:px-16 py-16">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Mission */}
                    {aboutData?.mission && (
                      <div className="fade-up" style={{ background: "#0a1628", padding: "48px 40px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                          <Target size={20} style={{ color: "#c8a96e" }} />
                          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".25em", color: "#c8a96e", textTransform: "uppercase" }}>
                            Our Mission
                          </span>
                        </div>
                        <div className="accent-bar" style={{ background: "rgba(200,169,110,.3)" }} />
                        <h3 className="playfair text-2xl font-bold text-white mb-4">
                          What Drives Us
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {aboutData.mission}
                        </p>
                      </div>
                    )}
                    {/* Vision */}
                    {aboutData?.vision && (
                      <div className="fade-up" style={{ background: "white", border: "1px solid #e7e0d4", padding: "48px 40px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                          <Eye size={20} style={{ color: "#c8a96e" }} />
                          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".25em", color: "#c8a96e", textTransform: "uppercase" }}>
                            Our Vision
                          </span>
                        </div>
                        <div className="accent-bar" />
                        <h3 className="playfair text-2xl font-bold text-slate-900 mb-4">
                          Where We're Headed
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {aboutData.vision}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ── STATS ── */}
            {aboutData?.stats && Array.isArray(aboutData.stats) && aboutData.stats.length > 0 && (
              <section className="px-6 md:px-16 py-16" style={{ background: "white" }}>
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12">
                    <div className="accent-bar mx-auto" />
                    <h2 className="playfair text-4xl font-bold text-slate-900 mb-3">By The Numbers</h2>
                    <p style={{ fontSize: 14, color: "#6b7280" }}>Our track record speaks for itself</p>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {aboutData.stats.map((stat, i) => (
                      <div key={i} className="stat-box fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="playfair" style={{ fontSize: 36, fontWeight: 900, color: "#00008B", marginBottom: 8 }}>
                          {stat.value || stat.num}
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", color: "#6b7280", textTransform: "uppercase" }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ── TEAM ── */}
            {aboutData?.team && Array.isArray(aboutData.team) && aboutData.team.length > 0 && (
              <section className="px-6 md:px-16 py-16">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12">
                    <div className="accent-bar mx-auto" />
                    <h2 className="playfair text-4xl font-bold text-slate-900 mb-3">Meet Our Team</h2>
                    <p style={{ fontSize: 14, color: "#6b7280" }}>The people behind our success</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {aboutData.team.map((member, i) => (
                      <div key={i} className="team-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                        {member.photo && (
                          <div style={{  marginBottom: 10, border: "px solid #e7e0d4" }}>
                            <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        )}
                        <h4 className="playfair text-xl font-bold text-slate-900 mb-1">{member.name}</h4>
                        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", color: "#c8a96e", textTransform: "uppercase", marginBottom: 12 }}>
                          {member.role}
                        </div>
                        {member.bio && (
                          <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
                            {member.bio}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ── WORK / PROJECTS ── */}
            {aboutData?.work && Array.isArray(aboutData.work) && aboutData.work.length > 0 && (
              <section className="px-6 md:px-16 py-16" style={{ background: "white" }}>
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12">
                    <div className="accent-bar mx-auto" />
                    <h2 className="playfair text-4xl font-bold text-slate-900 mb-3">Our Work</h2>
                    <p style={{ fontSize: 14, color: "#6b7280" }}>Projects we're proud of</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {aboutData.work.map((project, i) => (
                      <div key={i} className="work-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                        {project.image && (
                          <div style={{ height: 240, overflow: "hidden" }}>
                            <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        )}
                        <div style={{ padding: "24px 28px" }}>
                          <h4 className="playfair text-lg font-bold text-slate-900 mb-2">{project.title}</h4>
                          {project.description && (
                            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 16 }}>
                              {project.description}
                            </p>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: 12, fontWeight: 600, color: "#c8a96e", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, textTransform: "uppercase", letterSpacing: ".1em" }}
                            >
                              View Project <ArrowRight size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ── PARTNERS ── */}
            {aboutData?.partners && Array.isArray(aboutData.partners) && aboutData.partners.length > 0 && (
              <section className="px-6 md:px-16 py-16">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12">
                    <div className="accent-bar mx-auto" />
                    <h2 className="playfair text-4xl font-bold text-slate-900 mb-3">Our Partners</h2>
                    <p style={{ fontSize: 14, color: "#6b7280" }}>Trusted collaborations</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {aboutData.partners.map((partner, i) => (
                      <div
                        key={i}
                        className="fade-up"
                        style={{
                          background: "white",
                          border: "1px solid #e7e0d4",
                          padding: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          animationDelay: `${i * 0.05}s`
                        }}
                      >
                        {partner.logo ? (
                          <img src={partner.logo} alt={partner.name} style={{ maxWidth: "100%", maxHeight: 48, filter: "grayscale(1)", opacity: 0.6, transition: "all .3s" }} />
                        ) : (
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textAlign: "center" }}>{partner.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* ── BOTTOM CTA BAR ── */}
        <section style={{ background: "#0a1628", padding: "32px 64px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".25em", color: "rgba(200,169,110,.7)", textTransform: "uppercase", marginBottom: 4 }}>
              Ready to work together?
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", margin: 0 }}>
              Let&apos;s discuss your next project — our team is available Mon–Fri, 9 AM–6 PM IST.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Phone size={16} style={{ color: "#c8a96e" }} />
              <span style={{ fontSize: 15, fontWeight: 500, color: "white" }}>+91 (612) 796-5983</span>
            </div>
            <div style={{ width: 1, height: 24, background: "rgba(255,255,255,.1)" }} />
            <a href="mailto:info@achalprojects.com" style={{ fontSize: 14, color: "#c8a96e", textDecoration: "none", fontWeight: 500 }}>
              info@achalprojects.com
            </a>
          </div>
        </section>
      </div>
    </>
  );
}