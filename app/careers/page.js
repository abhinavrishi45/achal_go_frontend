'use client';

import {
  ArrowRight, Briefcase, Users, Award, Globe, TrendingUp, Heart,
  CheckCircle2, Code2, Target, ChevronRight,
  MapPin, Clock, Tag, Search, X, Loader2, AlertCircle,
  Building2, Sparkles, BookOpen, Zap, Send
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://achal-backend-trial.tannis.in';

const TYPE_LABELS = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'internship': 'Internship',
  'contract': 'Contract',
};

const TYPE_COLORS = {
  'full-time': 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
  'part-time': 'bg-sky-50 text-[#0284c7] border border-sky-200/80',
  'internship': 'bg-amber-50 text-amber-700 border border-amber-200/80',
  'contract': 'bg-violet-50 text-violet-700 border border-violet-200/80',
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
    return () => {
      window.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
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
      setSubmitError('Please complete all mandatory parameters (Legal Name, Email, Phone Number).');
      return;
    }
    if (!formData.resume) {
      setSubmitError('Please upload your verified resume/CV (PDF or DOCX).');
      return;
    }
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Transmission failed. Please check payload.');
      }
      setSubmitSuccess(true);
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      setSubmitError(err.message || 'Error transmitting dossier. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-slate-200 bg-[#f8fafc] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white text-xs sm:text-sm transition-all";
  const labelClass = "block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-2";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-[#0a192f]/70"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 shadow-2xl">
        {/* Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-[#0284c7] to-[#38bdf8]" />

        <div className="p-7 sm:p-10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#0284c7] hover:text-[#0284c7] transition-all cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#0284c7]">
              Application Dossier
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-1 pr-10">
            {job.role}
          </h2>
          <p className="text-xs font-mono text-slate-400 mb-6">
            Fields marked with an asterisk (*) are mandatory.
          </p>

          {submitSuccess && (
            <div className="mb-6 p-4 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
              <span>Application received successfully. Our technical recruitment desk will contact you.</span>
            </div>
          )}
          {submitError && (
            <div className="mb-6 p-4 flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-800 text-sm">
              <AlertCircle size={18} className="shrink-0 text-rose-600" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Legal Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Sharma" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Corporate / Primary Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@domain.com" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone Number *</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Relevant Experience</label>
                <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className={inputClass}>
                  <option value="">Select duration</option>
                  {['0-1', '1-3', '3-5', '5-10', '10+'].map(v => <option key={v} value={v}>{v} Years</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Current Designation</label>
                <input type="text" name="currentPosition" value={formData.currentPosition} onChange={handleChange} placeholder="e.g. Senior Project Engineer" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Current Enterprise / Org</label>
                <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleChange} placeholder="e.g. Infrastructure Corp Ltd" className={inputClass} />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className={labelClass}>Curriculum Vitae / Resume (PDF / DOCX) *</label>
              <div className="border border-dashed border-slate-300 p-6 text-center hover:border-[#0284c7] bg-[#f8fafc] hover:bg-white transition-all cursor-pointer">
                <input type="file" name="resume" onChange={handleChange} accept=".pdf,.doc,.docx" className="hidden" id="resume-input" />
                <label htmlFor="resume-input" className="cursor-pointer block">
                  {formData.resume ? (
                    <>
                      <CheckCircle2 size={24} className="mx-auto mb-2 text-[#0284c7]" />
                      <p className="text-xs font-bold text-slate-800">{formData.resume.name}</p>
                      <p className="text-[11px] font-mono text-slate-400 mt-1">Click to replace file</p>
                    </>
                  ) : (
                    <>
                      <Code2 size={24} className="mx-auto mb-2 text-slate-400" />
                      <p className="text-xs font-bold text-slate-700">Upload PDF, DOC, or DOCX</p>
                      <p className="text-[11px] font-mono text-slate-400 mt-1">Maximum allocation: 5 MB</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className={labelClass}>Executive Cover Note</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={4}
                placeholder="Highlight specific civil infrastructure, multimodal logistics, EV network, or smart telemetry deployments managed..."
                className={inputClass + " resize-none"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Portfolio / Project URL</label>
                <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://..." className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>LinkedIn Profile</label>
                <input type="url" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} placeholder="https://linkedin.com/in/..." className={inputClass} />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onBack}
                disabled={submitting}
                className="flex-1 py-3 border border-slate-200 text-slate-700 hover:border-slate-400 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                &larr; Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Transmitting...</>
                ) : (
                  <><Send size={16} /> Submit Dossier</>
                )}
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
    return () => {
      window.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (showForm) return <ApplicationModal job={job} onClose={onClose} onBack={() => setShowForm(false)} />;

  const typeColor = TYPE_COLORS[job.employmentType] || 'bg-slate-100 text-slate-700 border border-slate-200';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-[#0a192f]/70"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 shadow-2xl">
        <div className="h-1 bg-gradient-to-r from-[#0284c7] to-[#38bdf8]" />

        <div className="p-7 sm:p-10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#0284c7] hover:text-[#0284c7] transition-all cursor-pointer"
          >
            <X size={16} />
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-3 pr-10">
            {job.role}
          </h2>

          <div className="flex flex-wrap gap-2.5 mb-6">
            <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 ${typeColor}`}>
              {TYPE_LABELS[job.employmentType] || job.employmentType}
            </span>
            {job.location && (
              <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1">
                <MapPin size={12} className="text-[#0284c7]" /> {job.location}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1">
              <Clock size={12} className="text-slate-400" /> {timeAgo(job.postedAt)}
            </span>
            {job.jobRef && (
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 border border-slate-200 px-2 py-1">
                <Tag size={11} /> {job.jobRef}
              </span>
            )}
          </div>

          {job.shortDescription && (
            <div className="mb-6">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284c7] mb-2">
                Mandate Overview
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {job.shortDescription}
              </p>
            </div>
          )}

          {job.details && (
            <div className="mb-8">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284c7] mb-2">
                Scope &amp; Prerequisites
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-normal bg-slate-50 border border-slate-200 p-4">
                {job.details}
              </div>
            </div>
          )}

          <div className="border-t border-slate-100 pt-6">
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              Submit Application For Position <ArrowRight size={15} />
            </button>
            <p className="text-center text-xs mt-3 text-slate-400 font-mono">
              Direct Personnel Desk: <a href="mailto:careers@goachal.com" className="text-[#0284c7] hover:underline">careers@goachal.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Job Card ──────────────────────────────────────────────────────────────
function JobCard({ job, onClick }) {
  const typeColor = TYPE_COLORS[job.employmentType] || 'bg-slate-50 text-slate-700 border border-slate-200';

  return (
    <div
      onClick={() => onClick(job)}
      className="group cursor-pointer bg-white border border-slate-200 p-7 transition-all duration-200 hover:border-[#0284c7] hover:-translate-y-0.5 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug">
            {job.role}
          </h3>
          <ChevronRight size={18} className="shrink-0 mt-0.5 text-slate-300 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 ${typeColor}`}>
            {TYPE_LABELS[job.employmentType] || job.employmentType}
          </span>
          {job.location && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
              <MapPin size={11} className="text-[#0284c7]" /> {job.location}
            </span>
          )}
        </div>

        {job.shortDescription && (
          <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-2 font-normal">
            {job.shortDescription}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-400">
        <span>{job.jobRef || 'REF-STD'}</span>
        <span>{timeAgo(job.postedAt)}</span>
      </div>
    </div>
  );
}

// ─── Main Careers Page ─────────────────────────────────────────────────────
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
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/jobs/open`);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to retrieve open requisitions.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

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
    { icon: Heart, title: 'Health & Medical', desc: 'Comprehensive medical coverage, workplace health programs, and safety allowances across active project sites.' },
    { icon: TrendingUp, title: 'Advancement Tracks', desc: 'Accelerated technical career ladders across engineering, terminal logistics, and business verticals.' },
    { icon: Globe, title: 'Pan-India Footprint', desc: 'Inter-regional mobility opportunities spanning high-growth metropolitan corridors and logistics hubs.' },
    { icon: Award, title: 'Merit Governance', desc: 'Transparent milestone bonuses, safety commendations, and project execution incentives.' },
    { icon: BookOpen, title: 'Skill Augmentation', desc: 'Corporate sponsorship for advanced structural, heavy machinery, EV, and management certifications.' },
    { icon: Zap, title: 'Industrial Scale', desc: 'Deploy engineering solutions that directly impact national supply chains and urban transit networks.' },
  ];

  const values = [
    { icon: Target, title: 'Operational Discipline', desc: 'Uncompromising execution tolerances across complex engineering and supply chain contracts.' },
    { icon: CheckCircle2, title: 'Statutory Rigor', desc: 'Zero deviations from national safety parameters, legal compliance, and ethical standards.' },
    { icon: Users, title: 'Cross-Functional Unity', desc: 'Integrated coordination between site engineers, telematics teams, and corporate governance.' },
    { icon: Sparkles, title: 'Continuous Modernization', desc: 'Adopting telemetry, green mobility, and automated systems across traditional industries.' },
  ];

  const selectClass = "px-4 py-2.5 border border-slate-200 bg-white text-slate-700 text-xs font-semibold focus:outline-none focus:border-[#0284c7] cursor-pointer";

  return (
    <main className="w-full bg-white text-slate-900 font-sans">

      {/* ── 1. CORPORATE HERO (BALANCED 2-COLUMN DOSSIER) ── */}
      <section className="bg-[#0a192f] text-white py-20 md:py-28 px-6 md:px-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column (7 cols): Typography & Editorial */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-0.5 bg-[#0284c7]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
                  Human Capital &bull; Career Requisitions
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
                Build National Scale. <br />
                <span className="text-[#38bdf8]">Lead Industrial Growth.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-2xl">
                Join ACHAL INTERNATIONAL across heavy civil infrastructure, multimodal freight corridors, clean energy networks, and municipal mobility systems.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => positionsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  Explore Current Openings &rarr;
                </button>
                <button
                  onClick={() => positionsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3.5 bg-transparent border border-slate-600 hover:border-slate-300 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Selection Standards
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400 border-t border-slate-800 pt-8 mt-10">
                <div>CIN: <span className="text-white font-semibold">U74999BR2014PTC022718</span></div>
                <div className="hidden sm:inline text-slate-600">&bull;</div>
                <div>Headquarters: <span className="text-white font-semibold">Patna, Bihar</span></div>
                <div className="hidden sm:inline text-slate-600">&bull;</div>
                <div>Inquiries: <span className="text-white font-semibold">careers@goachal.com</span></div>
              </div>
            </div>

            {/* Right Column (5 cols): Visual Asset & Corporate Metric Block */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="relative border border-slate-700/80 overflow-hidden bg-slate-900 shadow-2xl">
                <img
                  src="/banner-1.png"
                  alt="ACHAL Operations and Infrastructure"
                  className="w-full h-64 sm:h-72 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="uppercase tracking-wider">Turnkey EPC &bull; Logistics</span>
                  <span className="text-[#38bdf8] font-bold">Standard 01</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/90 border border-slate-800 p-5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight">
                    {loading ? '—' : `${jobs.length}`}+
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    Active Openings
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight">
                    Pan-India
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    Operational Matrix
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. METRIC STANDARD STRIP ── */}
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200">
          {[
            { value: loading ? '—' : `${jobs.length}`, label: 'Active Requisitions' },
            { value: '5', label: 'Core Industrial Sectors' },
            { value: 'Pan-India', label: 'Project Operations' },
            { value: '10+ Yrs', label: 'Institutional Track Record' },
          ].map(({ value, label }) => (
            <div key={label} className="p-6 sm:p-8 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight mb-1">
                {value}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. CURRENT OPENINGS SECTION ── */}
      <section ref={positionsRef} className="py-20 md:py-24 px-6 md:px-16 bg-[#fafbfc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-0.5 bg-[#0284c7]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284c7]">
                  Talent Acquisition Matrix
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Verified Career Positions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md font-normal leading-relaxed">
              Applications are reviewed continuously by departmental project directors. Shortlisted applicants receive technical interview schedules within 10 business days.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white border border-slate-200 p-4 mb-6 flex flex-col md:flex-row gap-3 shadow-xs">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by role, keyword, or division..."
                className="w-full pl-9 pr-8 py-2.5 border border-slate-200 bg-[#f8fafc] text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {allTypes.length > 0 && (
              <select value={filterType} onChange={e => setFilterType(e.target.value)} className={selectClass}>
                <option value="all">All Employment Types</option>
                {allTypes.map(t => <option key={t} value={t}>{TYPE_LABELS[t] || t}</option>)}
              </select>
            )}

            {allLocations.length > 0 && (
              <select value={filterLocation} onChange={e => setFilterLocation(e.target.value)} className={selectClass}>
                <option value="all">All Operational Bases</option>
                {allLocations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            )}

            {(filterType !== 'all' || filterLocation !== 'all' || searchQuery) && (
              <button
                onClick={() => { setFilterType('all'); setFilterLocation('all'); setSearchQuery(''); }}
                className="px-4 py-2.5 border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <X size={12} /> Reset
              </button>
            )}
          </div>

          {!loading && !error && (
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-6 px-1">
              <span>Displaying {filtered.length} of {jobs.length} open position{jobs.length !== 1 ? 's' : ''}</span>
              <span>Enterprise Recruitment</span>
            </div>
          )}

          {/* Load / Error / Empty States */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white border border-slate-200">
              <Loader2 size={32} className="animate-spin text-[#0284c7]" />
              <p className="text-xs font-mono uppercase tracking-wider text-slate-500">Retrieving open requisitions...</p>
            </div>
          )}

          {!loading && error && (
            <div className="border border-rose-200 bg-rose-50 p-8 text-center">
              <AlertCircle size={28} className="mx-auto mb-3 text-rose-600" />
              <p className="font-bold text-rose-900 text-sm mb-1">Requisition Query Unsuccessful</p>
              <p className="text-xs text-rose-700 mb-5">{error}</p>
              <button onClick={fetchJobs} className="px-5 py-2 bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider cursor-pointer">
                Retry Query
              </button>
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="border border-slate-200 bg-white p-14 text-center">
              <Building2 size={32} className="mx-auto mb-3 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Active Openings Published</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed mb-4">
                We are currently reviewing existing contracts. Send your credentials directly to our HR desk for upcoming technical positions.
              </p>
              <a href="mailto:careers@goachal.com" className="text-xs font-bold uppercase tracking-wider text-[#0284c7] hover:underline">
                Email CV to careers@goachal.com &rarr;
              </a>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && filtered.length === 0 && (
            <div className="border border-slate-200 bg-white p-12 text-center">
              <Search size={30} className="mx-auto mb-3 text-slate-400" />
              <h3 className="text-base font-bold text-slate-800 mb-1">No Matching Positions Found</h3>
              <p className="text-xs text-slate-500 mb-4">Refine search criteria or reset existing filters.</p>
              <button
                onClick={() => { setFilterType('all'); setFilterLocation('all'); setSearchQuery(''); }}
                className="px-4 py-2 border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 hover:border-slate-400 cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Job Cards Grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(job => (
                <JobCard key={job.id} job={job} onClick={setSelectedJob} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. BENEFITS (INSTITUTIONAL ADVANTAGE) ── */}
      <section className="py-20 md:py-24 px-6 md:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-0.5 bg-[#0284c7]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284c7]">
                Human Capital Standards
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              The Achal Enterprise Advantage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-7 bg-[#f8fafc] border border-slate-200/90 hover:border-[#0284c7]/50 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0284c7] mb-5 shadow-2xs">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CORE EXECUTION VALUES ── */}
      <section className="py-20 md:py-24 px-6 md:px-16 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-0.5 bg-[#0284c7]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284c7]">
                Governance &amp; Culture
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Our Core Execution Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-7 bg-white border border-slate-200 hover:border-slate-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0284c7] mb-5">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. DIRECT TALENT CTA STRIP ── */}
      <section className="py-16 md:py-20 px-6 md:px-16 bg-[#0a192f] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
                Direct Talent Desk
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Don’t see an exact alignment?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
              We continually source licensed civil engineers, terminal logistics managers, EV hardware technicians, and software architects. Submit an open dossier directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="mailto:careers@goachal.com"
              className="px-6 py-3.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              Email Executive CV <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Modal Dialog Controller */}
      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </main>
  );
}