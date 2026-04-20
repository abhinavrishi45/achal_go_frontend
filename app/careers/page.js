'use client';

import {
  ArrowRight, Briefcase, Users, Award, Globe, TrendingUp, Heart,
  CheckCircle2, Code2, Lightbulb, Target, ChevronRight, ExternalLink,
  MapPin, Clock, Tag, Search, X, Loader2, AlertCircle,
  Building2, Sparkles, BookOpen, Zap, Send
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { API_BASE } from '@/lib/api';

const TYPE_LABELS = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'internship': 'Internship',
  'contract': 'Contract',
};

const TYPE_COLORS = {
  'full-time': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'part-time': 'bg-sky-50 text-sky-700 border border-sky-200',
  'internship': 'bg-amber-50 text-amber-700 border border-amber-200',
  'contract': 'bg-violet-50 text-violet-700 border border-violet-200',
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

// ─── Application Form Modal ────────────────────────────────────────────────
function ApplicationModal({ job, onClose, onBack }) {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phoneNumber: '', currentPosition: '',
    currentCompany: '', yearsOfExperience: '', resume: null,
    coverLetter: '', portfolio: '', linkedinProfile: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') setFormData(p => ({ ...p, resume: files?.[0] || null }));
    else setFormData(p => ({ ...p, [name]: value }));
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phoneNumber.trim()) {
      setSubmitError('Please fill in all required fields (Name, Email, Phone)');
      return;
    }
    if (!formData.resume) { setSubmitError('Please upload your resume'); return; }
    setSubmitting(true);
    try {
      const resumeBase64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(',')[1]);
        r.onerror = rej;
        r.readAsDataURL(formData.resume);
      });
      const payload = { jobId: job.id, ...formData, resumeBase64, resumeFileName: formData.resume.name };
      delete payload.resume;
      const response = await fetch(`${API_BASE}/api/jobs/apply`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (!response.ok) { const err = await response.json().catch(() => ({})); throw new Error(err.message || 'Failed to submit'); }
      setSubmitSuccess(true);
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      setSubmitError(err.message || 'Error submitting. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-stone-300 bg-white text-slate-900 placeholder-stone-400 focus:outline-none focus:border-yellow-700 focus:ring-1 focus:ring-yellow-700/30 transition-all text-sm";
  const labelClass = "block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(8px)', background: 'rgba(10,22,40,0.6)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-stone-200 shadow-2xl"
        style={{ animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}>
        {/* Gold top bar */}
        <div style={{ height: 4, background: 'linear-gradient(90deg, #c8a96e, #b8954a)' }} />
        <div className="p-8 md:p-10">
          <button onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 border border-stone-200 flex items-center justify-center text-slate-400 hover:border-yellow-700 hover:text-yellow-700 transition-all">
            <X size={16} />
          </button>

          <div className="section-label mb-4">Application</div>
          <h2 className="playfair text-3xl font-bold text-slate-900 mb-1 pr-10">{job.role}</h2>
          <p className="text-xs text-slate-400 mb-8">Fields marked * are required</p>

          {submitSuccess && (
            <div className="mb-6 p-4 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700">
              <CheckCircle2 size={18} className="flex-shrink-0" />
              <span className="text-sm">Application submitted! We{"'"}ll be in touch soon.</span>
            </div>
          )}
          {submitError && (
            <div className="mb-6 p-4 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span className="text-sm">{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>Full Name *</label><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className={inputClass} /></div>
              <div><label className={labelClass}>Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>Phone *</label><input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} /></div>
              <div>
                <label className={labelClass}>Years of Experience</label>
                <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className={inputClass} style={{ cursor: 'pointer' }}>
                  <option value="">Select experience</option>
                  {['0-1', '1-3', '3-5', '5-10', '10+'].map(v => <option key={v} value={v}>{v} years</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>Current Position</label><input type="text" name="currentPosition" value={formData.currentPosition} onChange={handleChange} placeholder="e.g., Senior Engineer" className={inputClass} /></div>
              <div><label className={labelClass}>Current Company</label><input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleChange} placeholder="e.g., Infra Corp" className={inputClass} /></div>
            </div>

            {/* Resume upload */}
            <div>
              <label className={labelClass}>Resume / CV *</label>
              <div className="border border-dashed border-stone-300 p-6 text-center hover:border-yellow-700 transition-colors cursor-pointer">
                <input type="file" name="resume" onChange={handleChange} accept=".pdf,.doc,.docx" className="hidden" id="resume-input" />
                <label htmlFor="resume-input" className="cursor-pointer block">
                  {formData.resume ? (
                    <>
                      <CheckCircle2 size={28} className="mx-auto mb-2 text-emerald-600" />
                      <p className="text-sm font-semibold text-emerald-700">{formData.resume.name}</p>
                      <p className="text-xs text-slate-400 mt-1">Click to change</p>
                    </>
                  ) : (
                    <>
                      <Code2 size={28} className="mx-auto mb-2 text-stone-300" />
                      <p className="text-sm font-semibold text-slate-600">Upload your resume</p>
                      <p className="text-xs text-slate-400 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className={labelClass}>Cover Letter</label>
              <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows={5}
                placeholder="Tell us why you're interested in this position…"
                className={inputClass + " resize-none"} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>Portfolio / Website</label><input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://yourportfolio.com" className={inputClass} /></div>
              <div><label className={labelClass}>LinkedIn Profile</label><input type="url" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} placeholder="https://linkedin.com/in/you" className={inputClass} /></div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-stone-100">
              <button type="button" onClick={onBack} disabled={submitting}
                className="btn-navy-outline flex-1 justify-center">
                ← Back
              </button>
              <button type="submit" disabled={submitting}
                className="btn-gold flex-1 justify-center">
                {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : <><Send size={16} /> Submit Application</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Job Detail Modal ──────────────────────────────────────────────────────
function JobModal({ job, onClose }) {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onClose]);

  if (showForm) return <ApplicationModal job={job} onClose={onClose} onBack={() => setShowForm(false)} />;

  const typeColor = TYPE_COLORS[job.employmentType] || 'bg-stone-100 text-stone-600 border border-stone-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(8px)', background: 'rgba(10,22,40,0.6)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-stone-200 shadow-2xl"
        style={{ animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <div style={{ height: 4, background: 'linear-gradient(90deg, #c8a96e, #0a1628)' }} />
        <div className="p-8 md:p-10">
          <button onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 border border-stone-200 flex items-center justify-center text-slate-400 hover:border-yellow-700 hover:text-yellow-700 transition-all">
            <X size={16} />
          </button>

          <h2 className="playfair text-3xl font-bold text-slate-900 mb-4 pr-10">{job.role}</h2>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className={`text-xs font-semibold px-3 py-1 ${typeColor}`}>
              {TYPE_LABELS[job.employmentType] || job.employmentType}
            </span>
            {job.location && (
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin size={14} /> {job.location}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <Clock size={14} /> {timeAgo(job.postedAt)}
            </span>
            {job.jobRef && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Tag size={12} /> {job.jobRef}
              </span>
            )}
          </div>

          {job.shortDescription && (
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-yellow-700 mb-3">Overview</div>
              <p className="text-sm text-slate-600 leading-relaxed">{job.shortDescription}</p>
            </div>
          )}

          {job.details && (
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-yellow-700 mb-3">Details</div>
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{job.details}</div>
            </div>
          )}

          <div className="border-t border-stone-100 pt-6">
            <button onClick={() => setShowForm(true)} className="btn-gold w-full justify-center py-4 text-sm">
              Apply for this Position <ArrowRight size={16} />
            </button>
            <p className="text-center text-xs mt-3 text-slate-400">
              Questions? Email{' '}
              <a href="mailto:careers@achalprojects.com" className="text-yellow-700 hover:underline">
                careers@achalprojects.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Job Card ──────────────────────────────────────────────────────────────
function JobCard({ job, onClick }) {
  const typeColor = TYPE_COLORS[job.employmentType] || 'bg-stone-100 text-stone-600 border border-stone-200';

  return (
    <div onClick={() => onClick(job)} className="job-card group cursor-pointer bg-white border border-stone-200 p-8 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Gold bottom bar on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="playfair text-xl font-bold text-slate-900 leading-snug group-hover:text-yellow-800 transition-colors">{job.role}</h3>
        <ChevronRight size={18} className="flex-shrink-0 mt-1 text-stone-300 group-hover:text-yellow-700 group-hover:translate-x-1 transition-all" />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-semibold px-2.5 py-1 ${typeColor}`}>
          {TYPE_LABELS[job.employmentType] || job.employmentType}
        </span>
        {job.location && (
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={12} /> {job.location}
          </span>
        )}
      </div>

      {job.shortDescription && (
        <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">{job.shortDescription}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-stone-300">{job.jobRef}</span>
        <span className="text-xs text-stone-400">{timeAgo(job.postedAt)}</span>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  const positionsRef = useRef(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/jobs/open`);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const allLocations = [...new Set(jobs.map(j => j.location).filter(Boolean))];
  const allTypes = [...new Set(jobs.map(j => j.employmentType).filter(Boolean))];

  const filtered = jobs.filter(j => {
    const matchSearch = !searchQuery ||
      j.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (j.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (j.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === 'all' || j.employmentType === filterType;
    const matchLoc = filterLocation === 'all' || j.location === filterLocation;
    return matchSearch && matchType && matchLoc;
  });

  const benefits = [
    { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive health insurance, mental health support, and wellness programs for you and your family.' },
    { icon: TrendingUp, title: 'Career Growth', desc: 'Continuous learning, certifications, mentorship, and clear advancement paths at every level.' },
    { icon: Globe, title: 'Flexible Work', desc: 'Hybrid work options, flexible hours, and supportive leave policies that respect your life outside work.' },
    { icon: Award, title: 'Recognition', desc: 'Performance bonuses, spot awards, and a culture that celebrates outstanding contributions.' },
    { icon: BookOpen, title: 'Learning Budget', desc: 'Annual learning budget for courses, conferences, and certifications to keep your skills sharp.' },
    { icon: Zap, title: 'Impact at Scale', desc: 'Work on infrastructure and solutions that shape real communities across India and beyond.' },
  ];

  const values = [
    { icon: Target, title: 'Innovation', desc: 'We embrace creative solutions to complex industrial challenges.' },
    { icon: CheckCircle2, title: 'Integrity', desc: 'Transparency and honesty in every decision we make.' },
    { icon: Users, title: 'Collaboration', desc: 'The best outcomes come from diverse minds working together.' },
    { icon: Sparkles, title: 'Excellence', desc: 'We hold ourselves to the highest professional standards.' },
  ];

  const selectClass = "px-4 py-3 border border-stone-300 bg-white text-slate-700 text-sm focus:outline-none focus:border-yellow-700 transition-all cursor-pointer";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        .playfair { font-family: 'Playfair Display', serif; }
        body { font-family: 'DM Sans', sans-serif; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        @keyframes modalIn { from{opacity:0;transform:scale(0.94) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }

        .section-label {
          font-size: 11px; font-weight: 600; letter-spacing: .3em;
          color: #92681f; text-transform: uppercase;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::before { content:''; display:block; width:24px; height:1px; background:#c8a96e; }

        .btn-gold {
          padding: 14px 36px; background: #c8a96e; color: #0a1628;
          font-weight: 600; font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
          border: none; cursor: pointer; transition: background .3s, transform .2s;
          font-family: 'DM Sans', sans-serif;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-gold:hover { background: #b8954a; transform: translateY(-1px); }
        .btn-gold:disabled { opacity: .6; cursor: not-allowed; transform: none; }

        .btn-navy-outline {
          padding: 14px 36px; background: transparent; color: #0a1628;
          font-weight: 600; font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
          border: 1px solid rgba(10,22,40,.3); cursor: pointer; transition: border-color .3s, color .3s;
          font-family: 'DM Sans', sans-serif;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-navy-outline:hover { border-color: #c8a96e; color: #92681f; }

        .benefit-card { border: 1px solid #e7e0d4; background: white; padding: 36px 32px; transition: border-color .3s, transform .3s; position: relative; }
        .benefit-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:#c8a96e; transform:scaleX(0); transition:transform .3s; }
        .benefit-card:hover { border-color: #c8a96e; transform: translateY(-4px); }
        .benefit-card:hover::after { transform: scaleX(1); }

        .value-card { border: 1px solid #e7e0d4; background: white; padding: 36px 32px; text-align: center; transition: border-color .3s, transform .3s; }
        .value-card:hover { border-color: #c8a96e; transform: translateY(-4px); }

        .stat-card { text-align: center; padding: 32px 24px; border-right: 1px solid #e7e0d4; }
        .stat-card:last-child { border-right: none; }
      `}</style>

      <main className="w-full bg-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HERO ── */}
        <section className="relative px-6 md:px-16 py-28 md:py-36 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 60%, #0a1628 100%)' }}>
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(200,169,110,.6) 48px, rgba(200,169,110,.6) 49px), repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(200,169,110,.6) 48px, rgba(200,169,110,.6) 49px)"
          }} />
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10" style={{ background: "radial-gradient(circle, #c8a96e 0%, transparent 70%)" }} />

          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="section-label mb-6" style={{ color: '#c8a96e' }}>
                <span style={{ background: '#c8a96e', display: 'block', width: 24, height: 1 }} />
                {loading ? 'Open Roles' : `${jobs.length} Open Roles`}
              </div>

              <h1 className="playfair text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                Shape the Future<br />
                <span style={{ color: '#c8a96e' }}>With ACHAL.</span>
              </h1>

              <p className="text-base md:text-lg text-white/70 font-light leading-relaxed mb-12 max-w-xl">
                Join a team transforming India{"'"}s infrastructure — from civil engineering to smart mobility, hospitality to green energy. Build something that lasts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-gold" onClick={() => positionsRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                  <Briefcase size={16} /> Explore Positions
                </button>
                <button
                  className="btn-navy-outline"
                  style={{ color: 'white', borderColor: 'rgba(255,255,255,.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8a96e'; e.currentTarget.style.color = '#c8a96e'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'; e.currentTarget.style.color = 'white'; }}>
                  Our Culture
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <div className="border-b border-stone-200 bg-amber-50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-200">
            {[
              { value: loading ? '—' : `${jobs.length}+`, label: 'Open Positions' },
              { value: '12+', label: 'Departments' },
              { value: '200+', label: 'Specialists' },
              { value: '12+', label: 'Years Building' },
            ].map(({ value, label }) => (
              <div key={label} className="stat-card">
                <div className="playfair text-4xl md:text-5xl font-black leading-tight mb-1.5" style={{ color: '#c8a96e' }}>{value}</div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BENEFITS ── */}
        <section className="px-6 md:px-16 py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-label mb-4">Why Join Us</div>
            <h2 className="playfair text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-16">
              The ACHAL<br />Advantage
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="benefit-card">
                  <div className="w-12 h-12 border border-stone-200 flex items-center justify-center mb-6" style={{ color: '#0a1628' }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-xs uppercase tracking-widest text-slate-500 mb-3">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPEN POSITIONS ── */}
        <section ref={positionsRef} className="px-6 md:px-16 py-24 md:py-32 bg-amber-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-label mb-4">Current Openings</div>
            <h2 className="playfair text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-16">
              Open Positions
            </h2>

            {/* Filter bar */}
            <div className="bg-white border border-stone-200 p-4 mb-6 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text" value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search roles, locations…"
                  className="w-full pl-10 pr-10 py-3 border border-stone-300 bg-white text-slate-900 text-sm placeholder-stone-400 focus:outline-none focus:border-yellow-700 transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                )}
              </div>
              {allTypes.length > 0 && (
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className={selectClass}>
                  <option value="all">All Types</option>
                  {allTypes.map(t => <option key={t} value={t}>{TYPE_LABELS[t] || t}</option>)}
                </select>
              )}
              {allLocations.length > 0 && (
                <select value={filterLocation} onChange={e => setFilterLocation(e.target.value)} className={selectClass}>
                  <option value="all">All Locations</option>
                  {allLocations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              )}
              {(filterType !== 'all' || filterLocation !== 'all' || searchQuery) && (
                <button onClick={() => { setFilterType('all'); setFilterLocation('all'); setSearchQuery(''); }}
                  className="px-4 py-3 border border-red-200 bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wide hover:bg-red-100 transition-colors flex items-center gap-1.5">
                  <X size={12} /> Clear
                </button>
              )}
            </div>

            {!loading && !error && (
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
                Showing <span className="text-slate-700">{filtered.length}</span> of <span className="text-slate-700">{jobs.length}</span> positions
              </p>
            )}

            {/* States */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 size={36} className="animate-spin" style={{ color: '#c8a96e' }} />
                <p className="text-sm text-slate-400 uppercase tracking-widest">Loading positions…</p>
              </div>
            )}

            {!loading && error && (
              <div className="border border-red-200 bg-red-50 p-10 text-center">
                <AlertCircle size={32} className="mx-auto mb-4 text-red-500" />
                <p className="font-semibold text-red-700 mb-2">Couldn{"'"}t load jobs</p>
                <p className="text-sm text-red-500 mb-6">{error}</p>
                <button onClick={fetchJobs} className="btn-gold text-xs py-2 px-6">Try Again</button>
              </div>
            )}

            {!loading && !error && jobs.length === 0 && (
              <div className="border border-stone-200 bg-white p-16 text-center">
                <Building2 size={36} className="mx-auto mb-4 text-stone-300" />
                <p className="playfair text-xl font-bold text-slate-600 mb-2">No open positions right now</p>
                <p className="text-sm text-slate-400">Check back soon or send us a speculative application.</p>
              </div>
            )}

            {!loading && !error && jobs.length > 0 && filtered.length === 0 && (
              <div className="border border-stone-200 bg-white p-14 text-center">
                <Search size={32} className="mx-auto mb-4 text-stone-300" />
                <p className="playfair text-xl font-bold text-slate-600 mb-2">No matching roles</p>
                <p className="text-sm text-slate-400 mb-6">Try a different search or clear the filters.</p>
                <button onClick={() => { setFilterType('all'); setFilterLocation('all'); setSearchQuery(''); }}
                  className="btn-navy-outline text-xs py-2 px-6">Clear Filters</button>
              </div>
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
                {filtered.map(job => <JobCard key={job.id} job={job} onClick={setSelectedJob} />)}
              </div>
            )}
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="px-6 md:px-16 py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-label mb-4">What Drives Us</div>
            <h2 className="playfair text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-16">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="value-card">
                  <div className="w-12 h-12 mx-auto border border-stone-200 flex items-center justify-center mb-6" style={{ color: '#0a1628' }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="playfair text-xl font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative px-6 md:px-16 py-24 md:py-32 overflow-hidden" style={{ background: '#0a1628' }}>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "repeating-linear-gradient(45deg, #c8a96e 0, #c8a96e 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px"
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5" style={{ background: "radial-gradient(circle, #c8a96e 0%, transparent 70%)" }} />

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="section-label justify-center mb-4" style={{ color: '#c8a96e' }}>
              <span style={{ background: '#c8a96e', display: 'block', width: 24, height: 1 }} />
              Ready to Apply
            </div>
            <h2 className="playfair text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Ready to Make<br />
              <span style={{ color: '#c8a96e' }}>an Impact?</span>
            </h2>
            <p className="text-base text-white/60 max-w-xl mx-auto mb-12 leading-relaxed">
              Submit your application today. We review on a rolling basis and respond within 2 weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-gold px-12 py-4"
                onClick={() => positionsRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                View All Open Roles <ArrowRight size={16} />
              </button>
              <button
                className="btn-navy-outline px-12 py-4"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,.3)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8a96e'; e.currentTarget.style.color = '#c8a96e'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'; e.currentTarget.style.color = 'white'; }}>
                Contact Recruiting
              </button>
            </div>
            <p className="text-sm text-white/30 mt-10">
              Questions?{' '}
              <a href="mailto:careers@achalprojects.com" className="text-yellow-700 hover:underline">
                careers@achalprojects.com
              </a>
            </p>
          </div>
        </section>

      </main>

      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </>
  );
}