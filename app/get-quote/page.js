"use client";

import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://achal-backend-trial.tannis.in';

export default function GetQuotePage() {
  const [form, setForm] = useState({ name: '', email: '', contactNumber: '', subject: '', service: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const services = [
    'Civil Engineering',
    'Cargo Service',
    'EV Charging Station',
    'Parking Service',
    'Restaurant Service',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const resetForm = () => setForm({ name: '', email: '', contactNumber: '', subject: '', service: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.description.trim()) {
      setError('Please fill name, email and description.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body && body.message ? body.message : 'Failed to submit');
      }
      setSuccess(true);
      resetForm();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-24 relative"
      style={{
        backgroundImage: 'url(/get-quote.png)',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="mb-6">

          <h1 className="text-2xl font-bold text-white">Request a Quote</h1>
          <p className="text-sm text-gray-100">Complete this form and we'll contact you within 24–48 hours.</p>
        </div>

        {success && <div className="mb-4 p-3 bg-green-400/90 text-green-900 rounded font-semibold">Thanks — your quote request was submitted.</div>}
        {error && <div className="mb-4 p-3 bg-red-400/90 text-red-900 rounded font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name *" className="w-full p-3 border-2 border-blue-900 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300" />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" className="w-full p-3 border-2 border-blue-900 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300" />
            <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Contact number" className="w-full p-3 border-2 border-blue-900 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300" />
            <select name="service" value={form.service} onChange={handleChange} className="w-full p-3 border-2 border-blue-900 rounded bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300">
              <option value="">Select a service</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="w-full p-3 border-2 border-blue-900 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300" />

          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe what you want *" rows={5} className="w-full p-3 border-2 border-blue-900 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300"></textarea>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-900 text-white font-semibold rounded hover:bg-blue-800 transition-colors disabled:opacity-50">
              {loading ? 'Sending...' : 'Submit Quote'}
            </button>
            <button type="button" onClick={resetForm} className="px-6 py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded hover:bg-blue-50 transition-colors">Reset</button>
          </div>

          <p className="text-xs text-gray-700">We respect your privacy. We'll only use your details to respond to this request.</p>
        </form>
      </div>
    </div>
  );
}
