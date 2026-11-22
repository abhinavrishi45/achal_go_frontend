'use client';
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Phone, Mail, MapPin, Clock, Send, CheckCircle2,
  AlertCircle, Loader, MessageCircle, Linkedin, Twitter, Facebook,
  Instagram
} from "lucide-react";
import { useRouter } from 'next/navigation';

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Enquiries",
    details: ["0120-6851294", "+91 612-796-5983"],
  },
  {
    icon: Mail,
    title: "Official Email",
    details: ["info@goachal.com", "tenders@goachal.com"],
  },
  {
    icon: MapPin,
    title: "Corporate Headquarters",
    details: [
      "Ward No. 11, S.K. Vihar Colony,",
      "Near SBI Beur, P.O. – Beur,",
      "Patna, Bihar – 800002",
    ],
  },
  {
    icon: Clock,
    title: "Operating Hours",
    details: ["Monday – Friday: 9:00 AM – 6:00 PM", "Saturday: 10:00 AM – 5:00 PM"],
  },
];

const departments = [
  "General Commercial Inquiry",
  "Civil Infrastructure & EPC",
  "Urban Smart Parking Solutions",
  "Multimodal Freight & Logistics",
  "EV Charging Infrastructure",
  "Institutional Hospitality",
  "Tenders & Procurement",
  "Careers & Human Resources",
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
  const mapRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${API_BASE}/api/google/maps-js`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (mapRef.current && window.google) {
        const coords = { lat: 25.5941, lng: 85.1376 }; // Patna, Bihar - ACHAL Office
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 15,
          center: coords,
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#f8fafc' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
            { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e2e8f0' }] },
          ],
        });

        const marker = new window.google.maps.Marker({
          position: coords,
          map: map,
          title: 'ACHAL International HQ',
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="font-family: sans-serif; padding: 10px; max-width: 240px;">
              <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #0a192f;">ACHAL International HQ</h4>
              <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.4;">
                Ward No. 11, S.K. Vihar Colony, Near SBI Beur, Patna, Bihar – 800002
              </p>
            </div>
          `,
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
    if (!formData.name.trim()) { setError('Full Name is required'); return false; }
    if (!formData.email.trim() || !formData.email.includes('@')) { setError('A valid official email is required'); return false; }
    if (!formData.subject.trim()) { setError('Subject line is required'); return false; }
    if (!formData.message.trim()) { setError('Message content is required'); return false; }
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
        throw new Error(data.message || `Failed to submit inquiry (${res.status})`);
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', department: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-colors text-sm rounded-none";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2";

  return (
    <main className="w-full bg-white text-slate-900 font-sans">

      {/* ── 1. CORPORATE HERO (SOLID INDUSTRIAL NAVY) ── */}
      <section className="bg-[#0a192f] text-white py-20 md:py-28 px-6 md:px-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-0.5 bg-[#0284c7]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                Contact &amp; Commercial Desk
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Connect With Our Project Engineers.
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed font-normal mb-10 max-w-2xl">
              Inquire regarding heavy civil works, pan-India multimodal freight, automated municipal parking concessions, or institutional tenders.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle size={15} /> Submit Inquiry
              </button>
              <a
                href="tel:01206851294"
                className="px-8 py-3.5 bg-transparent border border-slate-600 hover:border-slate-300 text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors flex items-center gap-2"
              >
                <Phone size={15} /> 0120-6851294
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STRUCTURED CONTACT CARDS ── */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="border border-slate-200 bg-white p-7 flex flex-col justify-start">
                  <div className="w-10 h-10 border border-slate-200 bg-slate-50 text-[#0284c7] flex items-center justify-center mb-5">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((d, j) => (
                      <p key={j} className="text-sm font-semibold text-slate-900 leading-relaxed">
                        {d}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. FORM & CORPORATE DIRECTORY ── */}
      <section id="contact-form" className="py-20 md:py-28 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: Communication Details */}
            <div className="lg:col-span-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-2">
                Project Communications
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                Official Correspondence
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                For tender submissions, vendor registration, and general corporate communications, reach our liaison desks directly.
              </p>

              <div className="border-t border-slate-200 pt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0284c7] shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Boardline</div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5">0120-6851294</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0284c7] shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Commercial Desk</div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5">info@achalprojects.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0284c7] shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Office</div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5 leading-relaxed">
                      Ward No. 11, S.K. Vihar Colony, Near SBI Beur, Beur, Patna, Bihar – 800002
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-10 pt-8 border-t border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Corporate Disclosures
                </div>
                <div className="flex items-center gap-2">
                  {socialLinks.map(({ icon: Icon, name, url }, i) => (
                    <a
                      key={i}
                      href={url}
                      title={name}
                      className="w-10 h-10 border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-[#0284c7] hover:text-[#0284c7] transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Submission Form */}
            <div className="lg:col-span-7">
              <div className="border border-slate-200 bg-[#f8fafc] p-8 md:p-10">

                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                  Project Inquiry &amp; Tender Notice
                </h3>
                <p className="text-xs text-slate-500 mb-8">
                  Fields marked with an asterisk (*) are mandatory for processing.
                </p>

                {submitted && (
                  <div className="mb-6 p-4 flex items-center gap-3 bg-emerald-50 border border-emerald-300 text-emerald-900">
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
                    <span className="text-sm font-medium">Your inquiry has been received. Our project office will contact you within 24 business hours.</span>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 flex items-center gap-3 bg-rose-50 border border-rose-300 text-rose-900">
                    <AlertCircle size={18} className="shrink-0 text-rose-600" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Rajesh Sharma"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Official Email *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. name@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Contact Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Operational Vertical</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={inputClass}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="">Select relevant division</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Subject Line *</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="e.g. Civil Construction Tender / Multimodal Logistics RFP"
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Inquiry Scope / Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Outline project specifications, locations, estimated timeline, or query..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {loading ? (
                      <><Loader size={16} className="animate-spin" /> Transmitting...</>
                    ) : (
                      <><Send size={16} /> Submit Formal Inquiry</>
                    )}
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. GEOGRAPHIC MAPPING (PATNA HQ) ── */}
      <section className="px-6 md:px-16 pb-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="border border-slate-200">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Corporate Office Geolocation
              </span>
              <span className="text-xs font-mono text-slate-500">
                25.5941° N, 85.1376° E
              </span>
            </div>
            <div
              ref={mapRef}
              className="w-full h-80 md:h-96 bg-slate-100"
            />
          </div>
        </div>
      </section>

      {/* ── 5. CORPORATE ENGAGEMENT BANNER ── */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-[#0a192f] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              Pan-India Execution
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              Reviewing Tenders or Requiring Technical Feasibility?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore our project portfolio and certified enterprise documentation across core industrial sectors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => router.push('/get-quote')}
              className="px-8 py-3.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer shadow-sm"
            >
              Request Quote
            </button>
            <button
              onClick={() => router.push('/faq')}
              className="px-8 py-3.5 bg-transparent border border-slate-600 hover:border-slate-300 text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors flex items-center gap-2 cursor-pointer"
            >
              Enterprise FAQ <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}