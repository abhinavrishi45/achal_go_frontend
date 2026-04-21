'use client';
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Phone, Mail, MapPin, Clock, Send, CheckCircle2,
  AlertCircle, Loader, MessageCircle, Linkedin, Twitter, Facebook,
  Instagram, ChevronDown
} from "lucide-react";
import { useRouter } from 'next/navigation';

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 (612) 796-5983", "+91 (123) 456-7890"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@achalprojects.com", "support@achalprojects.com"],
  },
  {
    icon: MapPin,
    title: "Headquarters",
    details: [
      "Ward No. 11, S.K. Vihar Colony,",
      "Near SBI Beur, P.O. – Beur,",
      "Patna, Bihar – 800002",
    ],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon – Fri: 9:00 AM – 6:00 PM", "Saturday: 10:00 AM – 4:00 PM"],
  },
];


const departments = [
  "General Inquiry", "Civil Engineering", "Parking Service",
  "Restaurant Service", "Cargo Service", "EV Charging", "Careers", "Partnership",
];

const socialLinks = [
  { icon: Linkedin, name: "LinkedIn", url: "#" },
  { icon: Twitter, name: "Twitter", url: "#" },
  { icon: Facebook, name: "Facebook", url: "#" },
  { icon: Instagram, name: "Instagram", url: "#" },
];
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://achal-backend-trial.tannis.in';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', department: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const mapRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCQsaeZLvlG7xsEXOLYaj3gNGXaRbJcYy4';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (mapRef.current && window.google) {
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 16,
          center: { lat: 25.5941, lng: 85.1376 }, // Patna, Bihar - ACHAL Office
          styles: [
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          ],
        });

        // Add marker for office location
        new window.google.maps.Marker({
          position: { lat: 25.5941, lng: 85.1376 },
          map: map,
          title: 'ACHAL International HQ',
          icon: 'http://maps.google.com/mapfiles/ms/icons/FFAA00-marker.png',
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="font-family: 'DM Sans', sans-serif; padding: 12px;">
              <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #0a1628;">ACHAL International HQ</h3>
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #6b7280;">
                Ward No. 11, S.K. Vihar Colony<br/>
                Near SBI Beur, Beur<br/>
                Patna, Bihar – 800002
              </p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #6b7280;">Phone: +91 612-796-5983</p>
            </div>
          `,
        });

        const marker = new window.google.maps.Marker({
          position: { lat: 25.5941, lng: 85.1376 },
          map: map,
          title: 'ACHAL International HQ',
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) { setError('Name is required'); return false; }
    if (!formData.email.trim() || !formData.email.includes('@')) { setError('Valid email is required'); return false; }
    if (!formData.subject.trim()) { setError('Subject is required'); return false; }
    if (!formData.message.trim()) { setError('Message is required'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;
    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        department: formData.department || null,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      const res = await fetch(`${API_BASE}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Failed to send message (${res.status})`);
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', department: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 border border-stone-300 bg-white text-slate-900 placeholder-stone-400 focus:outline-none focus:border-yellow-700 focus:ring-1 focus:ring-yellow-700/30 transition-all text-sm font-[DM_Sans,sans-serif]";
  const labelClass = "block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .playfair { font-family: 'Playfair Display', serif; }
        body { font-family: 'DM Sans', sans-serif; }

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

        .contact-card {
          border: 1px solid #e7e0d4;
          background: white;
          padding: 36px 32px;
          transition: border-color .3s, transform .3s;
          position: relative;
        }
        .contact-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: #c8a96e;
          transform: scaleX(0);
          transition: transform .3s;
        }
        .contact-card:hover { border-color: #c8a96e; transform: translateY(-4px); }
        .contact-card:hover::after { transform: scaleX(1); }

        .faq-item {
          border: 1px solid #e7e0d4;
          background: white;
          margin-bottom: 2px;
          transition: border-color .3s;
        }
        .faq-item:hover { border-color: #c8a96e; }
        .faq-item.open { border-color: #c8a96e; }

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
        .btn-gold:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .btn-navy-outline {
          padding: 14px 40px;
          background: transparent;
          color: #0a1628;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: .08em;
          text-transform: uppercase;
          border: 1px solid rgba(10,22,40,.3);
          cursor: pointer;
          transition: border-color .3s, color .3s;
          font-family: 'DM Sans', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-navy-outline:hover { border-color: #c8a96e; color: #92681f; }

        .social-link {
          width: 52px; height: 52px;
          border: 1px solid #e7e0d4;
          background: white;
          display: flex; align-items: center; justify-content: center;
          color: #6b7280;
          transition: border-color .3s, color .3s, transform .3s;
          cursor: pointer;
        }
        .social-link:hover { border-color: #c8a96e; color: #92681f; transform: translateY(-3px); }

        .hero-bg {
          background: linear-gradient(135deg, #0a1628 0%, #1a3a6b 60%, #0a1628 100%);
        }

        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main className="w-full bg-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HERO ── */}
        <section className="hero-bg relative px-6 md:px-16 py-28 md:py-36 overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(200,169,110,.6) 48px, rgba(200,169,110,.6) 49px), repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(200,169,110,.6) 48px, rgba(200,169,110,.6) 49px)"
          }} />
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10" style={{ background: "radial-gradient(circle, #c8a96e 0%, transparent 70%)" }} />

          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="section-label" style={{ color: "#c8a96e" }}>
                <span style={{ background: "#c8a96e", display: "block", width: 24, height: 1 }} />
                Contact Us
              </div>

              <h1 className="playfair text-5xl md:text-7xl font-black text-white leading-tight mt-6 mb-6">
                Let&apos;s Build<br />
                <span style={{ color: "#c8a96e" }}>Something Great.</span>
              </h1>

              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-12 font-light max-w-xl">
                Have a project in mind? Our specialists across civil engineering, smart mobility, hospitality, logistics, and EV infrastructure are ready to assist.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-gold" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  <MessageCircle size={16} /> Send a Message
                </button>
                <button className="btn-navy-outline" style={{ color: "white", borderColor: "rgba(255,255,255,.3)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8a96e"; e.currentTarget.style.color = "#c8a96e"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; e.currentTarget.style.color = "white"; }}>
                  <Phone size={16} /> Call Us Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT INFO CARDS ── */}
        <section className="px-6 md:px-16 py-24 bg-amber-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-label">Reach Us</div>
            <h2 className="playfair text-4xl md:text-5xl font-bold text-slate-900 mb-16 leading-tight">
              Contact Information
            </h2>

            <div className="contact-grid grid grid-cols-2 lg:grid-cols-4 gap-0.5">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <div key={i} className="contact-card">
                    <div className="w-12 h-12 flex items-center justify-center mb-6 border border-stone-200 bg-white" style={{ color: "#0a1628" }}>
                      <Icon size={22} />
                    </div>
                    <h3 className="font-semibold text-xs uppercase tracking-widest text-slate-500 mb-3">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((d, j) => (
                        <p key={j} className="text-sm text-slate-700 leading-relaxed">{d}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section id="contact-form" className="px-6 md:px-16 py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

              {/* Left: Heading + info */}
              <div className="lg:col-span-2">
                <div className="section-label">Write to Us</div>
                <h2 className="playfair text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">
                  Send Us a<br />Message
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-10">
                  Fill out the form and one of our specialists will get back to you within 24 business hours.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: Phone, label: "Phone", val: "+91 612-796-5983" },
                    { icon: Phone, label: "Phone", val: "0120-6851294" },
                    { icon: Mail, label: "Email", val: "info@achalprojects.com" },
                    { icon: MapPin, label: "Location", val: "Patna, Bihar – 800002" },
                  ].map(({ icon: Icon, label, val }, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 border border-stone-200 flex items-center justify-center flex-shrink-0" style={{ color: "#92681f" }}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">{label}</div>
                        <div className="text-sm text-slate-700 mt-0.5">{val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="mt-12 pt-10 border-t border-stone-200">
                  <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-5">Follow Us</div>
                  <div className="flex gap-3">
                    {socialLinks.map(({ icon: Icon, name, url }, i) => (
                      <a key={i} href={url} title={name} className="social-link">
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-3">
                <div className="border border-stone-200 bg-white p-8 md:p-12">

                  {submitted && (
                    <div className="mb-8 p-4 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800">
                      <CheckCircle2 size={18} className="flex-shrink-0" />
                      <span className="text-sm">Your message has been sent. We&apos;ll be in touch shortly.</span>
                    </div>
                  )}

                  {error && (
                    <div className="mb-8 p-4 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Email Address *</label>
                        <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className={inputClass} />
                      </div>
                    </div>

                    <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input type="tel" name="phone" placeholder="+91 00000 00000" value={formData.phone} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Department</label>
                        <select name="department" value={formData.department} onChange={handleChange} className={inputClass} style={{ cursor: 'pointer' }}>
                          <option value="">Select a department</option>
                          {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Subject *</label>
                      <input type="text" name="subject" placeholder="How can we help you?" value={formData.subject} onChange={handleChange} className={inputClass} />
                    </div>

                    <div>
                      <label className={labelClass}>Message *</label>
                      <textarea name="message" rows={6} placeholder="Tell us about your project or inquiry..." value={formData.message} onChange={handleChange} className={inputClass + " resize-none"} />
                    </div>

                    <button type="submit" disabled={loading} className="btn-gold w-full justify-center py-4">
                      {loading
                        ? <><Loader size={16} className="animate-spin" /> Sending…</>
                        : <><Send size={16} /> Send Message</>}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GOOGLE MAP ── */}
        <section className="px-3 md:px-16 pb-0 md:mb-10 mb-5 bg-white">
          <div className="max-w-7xl mx-auto">
            <div
              ref={mapRef}
              className="relative overflow-hidden h-72 md:h-96 bg-stone-100 border border-stone-200 rounded-sm"
              style={{ width: '100%' }}
            />
          </div>
        </section>

        {/* ── FAQ ── */}


        {/* ── CTA STRIP ── */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 overflow-hidden" style={{ background: "#0a1628" }}>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "repeating-linear-gradient(45deg, #c8a96e 0, #c8a96e 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px"
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5" style={{ background: "radial-gradient(circle, #c8a96e 0%, transparent 70%)" }} />

          <div className="relative max-w-7xl mx-auto text-center">
            <div className="section-label justify-center" style={{ color: "#c8a96e" }}>
              Get Started
            </div>
            <h2 className="playfair text-4xl md:text-6xl font-black text-white leading-tight mt-4 mb-6">
              Ready to Partner<br />
              <span style={{ color: "#c8a96e" }}>With ACHAL?</span>
            </h2>
            <p className="text-base text-white/60 max-w-xl mx-auto mb-12 leading-relaxed">
              Join thousands of clients who trust ACHAL INTERNATIONAL for precision, reliability, and excellence across every service vertical.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <button
                className="btn-navy-outline px-12 py-4"
                style={{ color: "white", borderColor: "rgba(255,255,255,.3)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8a96e"; e.currentTarget.style.color = "#c8a96e"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; e.currentTarget.style.color = "white"; }}
              >
                <Phone size={16} /> Call Now
              </button>
              <button onClick={() => router.push('/faq')} className="btn-gold px-12 py-3 text-sm cursor-pointer">FAQs  <ArrowRight size={16} /></button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}