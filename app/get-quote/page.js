"use client";

import { useState, useEffect } from "react";
import { Send, RotateCcw, CheckCircle2, AlertCircle, Loader, ArrowRight, Phone, Sparkles } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://achal-backend-trial.tannis.in";

const steps = ["Contact Details", "Project Info", "Review"];

export default function GetQuotePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    subject: "",
    service: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState({});
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/services`);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setServices([]);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleServiceSelect = (label) => {
    setForm((prev) => ({ ...prev, service: label }));
    setError("");
  };

  const resetForm = () => {
    setForm({ name: "", email: "", contactNumber: "", subject: "", service: "", description: "" });
    setStep(0);
    setTouched({});
    setError("");
  };

  const validateStep = (s) => {
    if (s === 0) {
      if (!form.name.trim()) return "Please enter your full name.";
      if (!form.email.trim() || !form.email.includes("@")) return "Please enter a valid email.";
    }
    if (s === 1) {
      if (!form.service) return "Please select a service.";
      if (!form.description.trim()) return "Please describe your project.";
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep(step);
    if (err) { setError(err); return; }
    setError("");
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const err = validateStep(0) || validateStep(1);
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Failed to submit");
      }
      setSuccess(true);
      resetForm();
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3.5 border bg-white text-slate-900 placeholder-stone-400 text-sm outline-none transition-all duration-200 font-[DM_Sans,sans-serif]";
  const inputIdle = "border-stone-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600/20";
  const labelBase = "block text-[11px] font-semibold uppercase tracking-[.2em] text-slate-400 mb-2";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        .playfair { font-family: 'Playfair Display', serif; }

        .quote-hero {
          background: linear-gradient(135deg, #0a1628 0%, #1a3a6b 55%, #0d1f40 100%);
          position: relative;
          overflow: hidden;
        }
        .quote-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: .04;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(200,169,110,.8) 60px, rgba(200,169,110,.8) 61px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(200,169,110,.8) 60px, rgba(200,169,110,.8) 61px);
        }
        .quote-hero::after {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,169,110,.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .step-indicator {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .step-dot {
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          transition: all .3s;
          position: relative;
          z-index: 1;
        }
        .step-dot.active { background: #c8a96e; color: #0a1628; }
        .step-dot.done { background: #0a1628; color: #c8a96e; border: 1.5px solid #c8a96e; }
        .step-dot.inactive { background: rgba(255,255,255,.1); color: rgba(255,255,255,.4); border: 1.5px solid rgba(255,255,255,.15); }
        .step-line { height: 1px; width: 48px; background: rgba(200,169,110,.25); }
        .step-line.done { background: #c8a96e; }

        .service-chip {
          border: 1px solid #e7e0d4;
          padding: 16px 20px;
          cursor: pointer;
          transition: all .25s;
          position: relative;
          background: white;
        }
        .service-chip:hover { border-color: #c8a96e; }
        .service-chip.selected {
          border-color: #0a1628;
          background: #0a1628;
        }
        .service-chip::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: #c8a96e;
          transform: scaleX(0);
          transition: transform .25s;
        }
        .service-chip:hover::after { transform: scaleX(1); }
        .service-chip.selected::after { transform: scaleX(1); }

        .btn-gold {
          background: #c8a96e;
          color: #0a1628;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: .1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background .25s, transform .15s;
          font-family: 'DM Sans', sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px 36px;
        }
        .btn-gold:hover:not(:disabled) { background: #b8954a; transform: translateY(-1px); }
        .btn-gold:disabled { opacity: .55; cursor: not-allowed; }

        .btn-outline-navy {
          background: transparent;
          color: #0a1628;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: .1em;
          text-transform: uppercase;
          border: 1px solid rgba(10,22,40,.25);
          cursor: pointer;
          transition: all .25s;
          font-family: 'DM Sans', sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px 36px;
        }
        .btn-outline-navy:hover { border-color: #0a1628; }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 14px 0;
          border-bottom: 0.5px solid #e7e0d4;
          gap: 16px;
        }
        .summary-row:last-child { border-bottom: none; }

        .accent-bar {
          width: 32px; height: 2px;
          background: #c8a96e;
          margin-bottom: 20px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp .35s ease forwards; }

        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .check-pop { animation: checkPop .5s cubic-bezier(.34,1.56,.64,1) forwards; }
      `}</style>

      <div className="min-h-screen bg-amber-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HERO ── */}
        <section className="quote-hero pt-28 pb-16 px-6 md:px-16">
          <div className="relative max-w-7xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <span style={{ display: "block", width: 24, height: 1, background: "#c8a96e" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".3em", color: "#c8a96e", textTransform: "uppercase" }}>
                Get a Quote
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <h1 className="playfair text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                  Let&apos;s Discuss<br />
                  <span style={{ color: "#c8a96e" }}>Your Project.</span>
                </h1>
                <p className="text-white/60 text-sm leading-relaxed max-w-md font-light">
                  Share your requirements and our team will respond with a tailored proposal within 24–48 hours.
                </p>
              </div>

              {/* Step indicator */}
              <div className="flex flex-col gap-3">
                <div className="step-indicator">
                  {steps.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center" }}>
                      <div className={`step-dot ${i < step ? "done" : i === step ? "active" : "inactive"}`}>
                        {i < step ? "✓" : i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`step-line ${i < step ? "done" : ""}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  {steps.map((s, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: i === step ? "#c8a96e" : "rgba(255,255,255,.3)",
                        width: 32,
                        textAlign: "center",
                        marginRight: i < steps.length - 1 ? 48 : 0,
                        transition: "color .3s",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FORM AREA ── */}
        <section className="px-6 md:px-16 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

              {/* Left: Info sidebar */}
              <div className="lg:col-span-1">
                <div style={{ background: "#0a1628", padding: "40px 36px" }}>
                  <div className="accent-bar" />
                  <h3 className="playfair text-2xl font-bold text-white mb-3">Why Choose ACHAL?</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-10">
                    Trusted by hundreds of clients across Bihar and beyond for precision, reliability, and innovation.
                  </p>

                  <div className="space-y-6">
                    {[
                      { num: "500+", label: "Projects Delivered" },
                      { num: "24h", label: "Response Time" },
                      { num: "15+", label: "Years of Experience" },
                      { num: "98%", label: "Client Satisfaction" },
                    ].map(({ num, label }) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 16, borderBottom: "0.5px solid rgba(255,255,255,.08)" }}>
                        <div style={{ minWidth: 64 }}>
                          <span className="playfair" style={{ fontSize: 26, fontWeight: 900, color: "#c8a96e" }}>{num}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase" }}>{label}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 40, paddingTop: 32, borderTop: "0.5px solid rgba(255,255,255,.1)" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".25em", color: "rgba(255,255,255,.3)", textTransform: "uppercase", marginBottom: 12 }}>
                      Prefer to call?
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#c8a96e" }}>
                      <Phone size={14} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: "white" }}>+91 (612) 796-5983</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Form card */}
              <div className="lg:col-span-2">
                {success ? (
                  <div className="fade-up" style={{ background: "white", border: "1px solid #e7e0d4", padding: "80px 60px", textAlign: "center" }}>
                    <div className="check-pop" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: "50%", marginBottom: 24 }}>
                      <CheckCircle2 size={28} style={{ color: "#16a34a" }} />
                    </div>
                    <h3 className="playfair text-3xl font-bold text-slate-900 mb-3">Quote Submitted!</h3>
                    <p style={{ fontSize: 14, color: "#6b7280", maxWidth: 340, margin: "0 auto 32px", lineHeight: 1.7 }}>
                      Thanks for reaching out. Our team will review your request and contact you within 24–48 hours.
                    </p>
                    <button className="btn-gold" onClick={() => setSuccess(false)}>
                      <Sparkles size={14} /> Submit Another
                    </button>
                  </div>
                ) : (
                  <div style={{ background: "white", border: "1px solid #e7e0d4", padding: "48px 48px" }}>

                    {error && (
                      <div className="fade-up" style={{ marginBottom: 24, padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: 10, color: "#b91c1c" }}>
                        <AlertCircle size={16} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 13 }}>{error}</span>
                      </div>
                    )}

                    {/* ── STEP 0: Contact Details ── */}
                    {step === 0 && (
                      <div className="fade-up">
                        <div className="accent-bar" />
                        <h2 className="playfair text-3xl font-bold text-slate-900 mb-2">Contact Details</h2>
                        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 36 }}>Tell us who you are so we can get back to you.</p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                          <div>
                            <label className={labelBase}>Full Name *</label>
                            <input
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Your full name"
                              className={`${inputBase} ${inputIdle}`}
                            />
                          </div>
                          <div>
                            <label className={labelBase}>Email Address *</label>
                            <input
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="you@example.com"
                              className={`${inputBase} ${inputIdle}`}
                            />
                          </div>
                        </div>

                        <div style={{ marginBottom: 36 }}>
                          <label className={labelBase}>Contact Number</label>
                          <input
                            name="contactNumber"
                            value={form.contactNumber}
                            onChange={handleChange}
                            placeholder="+91 00000 00000"
                            className={`${inputBase} ${inputIdle}`}
                          />
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                          <button className="btn-gold" onClick={handleNext}>
                            Continue <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 1: Project Info ── */}
                    {step === 1 && (
                      <div className="fade-up">
                        <div className="accent-bar" />
                        <h2 className="playfair text-3xl font-bold text-slate-900 mb-2">Project Details</h2>
                        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 36 }}>Help us understand what you need.</p>

                        {/* Service selector */}
                        <div style={{ marginBottom: 28 }}>
                          <label className={labelBase}>Select a Service *</label>
                          {servicesLoading ? (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "32px", color: "#9ca3af" }}>
                              <Loader size={16} className="animate-spin mr-2" /> Loading services...
                            </div>
                          ) : services.length > 0 ? (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                              {services.map(({ id, name, description }) => (
                                <div
                                  key={id}
                                  className={`service-chip ${form.service === name ? "selected" : ""}`}
                                  onClick={() => handleServiceSelect(name)}
                                >
                                  <div style={{ fontSize: 12, fontWeight: 600, color: form.service === name ? "#c8a96e" : "#0a1628", marginBottom: 2 }}>{name}</div>
                                  <div style={{ fontSize: 11, color: form.service === name ? "rgba(200,169,110,.6)" : "#9ca3af" }}>{description}</div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div style={{ padding: "16px", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: 13 }}>
                              Unable to load services. Please try again later.
                            </div>
                          )}
                        </div>

                        <div style={{ marginBottom: 20 }}>
                          <label className={labelBase}>Subject</label>
                          <input
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Brief title for your inquiry"
                            className={`${inputBase} ${inputIdle}`}
                          />
                        </div>

                        <div style={{ marginBottom: 36 }}>
                          <label className={labelBase}>Project Description *</label>
                          <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={5}
                            placeholder="Describe your project, requirements, timeline, and any other relevant details…"
                            className={`${inputBase} ${inputIdle}`}
                            style={{ resize: "none" }}
                          />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <button className="btn-outline-navy" onClick={handleBack}>
                            ← Back
                          </button>
                          <button className="btn-gold" onClick={handleNext}>
                            Review <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 2: Review ── */}
                    {step === 2 && (
                      <div className="fade-up">
                        <div className="accent-bar" />
                        <h2 className="playfair text-3xl font-bold text-slate-900 mb-2">Review & Submit</h2>
                        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 36 }}>Please confirm your details before submitting.</p>

                        <div style={{ background: "#fafaf8", border: "1px solid #e7e0d4", padding: "24px 28px", marginBottom: 32 }}>
                          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".2em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 16 }}>Contact Info</div>
                          {[
                            { label: "Name", val: form.name },
                            { label: "Email", val: form.email },
                            { label: "Phone", val: form.contactNumber || "—" },
                          ].map(({ label, val }) => (
                            <div key={label} className="summary-row">
                              <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".1em", flexShrink: 0 }}>{label}</span>
                              <span style={{ fontSize: 14, color: "#0a1628", fontWeight: 500, textAlign: "right" }}>{val}</span>
                            </div>
                          ))}
                        </div>

                        <div style={{ background: "#fafaf8", border: "1px solid #e7e0d4", padding: "24px 28px", marginBottom: 36 }}>
                          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".2em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 16 }}>Project Info</div>
                          {[
                            { label: "Service", val: form.service || "—" },
                            { label: "Subject", val: form.subject || "—" },
                            { label: "Description", val: form.description },
                          ].map(({ label, val }) => (
                            <div key={label} className="summary-row">
                              <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".1em", flexShrink: 0 }}>{label}</span>
                              <span style={{ fontSize: 13, color: "#0a1628", textAlign: "right", lineHeight: 1.6 }}>{val}</span>
                            </div>
                          ))}
                        </div>

                        <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 24 }}>
                          We respect your privacy. Your information will only be used to respond to this request.
                        </p>

                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                          <button className="btn-outline-navy" onClick={handleBack} disabled={loading}>
                            ← Back
                          </button>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button className="btn-outline-navy" onClick={resetForm} disabled={loading}>
                              <RotateCcw size={13} /> Reset
                            </button>
                            <button className="btn-gold" onClick={handleSubmit} disabled={loading}>
                              {loading ? (
                                <><Loader size={14} className="animate-spin" /> Submitting…</>
                              ) : (
                                <><Send size={14} /> Submit Quote</>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA BAR ── */}
        <section style={{ background: "#0a1628", padding: "32px 64px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".25em", color: "rgba(200,169,110,.7)", textTransform: "uppercase", marginBottom: 4 }}>
              Need something faster?
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", margin: 0 }}>
              Reach us directly — our team is available Mon–Fri, 9 AM–6 PM IST.
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