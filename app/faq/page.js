"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await fetch('https://achal-backend-trial.tannis.in/api/faqs/public/active');
        if (res.ok) {
          const data = await res.json();
          setFaqs(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to load FAQs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const categories = ['All', ...new Set(faqs.map(f => f.category).filter(Boolean))];
  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === selectedCategory);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <main className="w-full min-h-screen bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-pulse text-gray-500">Loading FAQs...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative min-h-96 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/70">
            Find answers to common questions about our services and operations.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* FAQ Items */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No FAQs available for this category.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-left flex-1">
                      <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
                        {faq.category}
                      </p>
                      <h3 className="text-base md:text-lg font-semibold text-slate-900">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {expandedId === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Answer */}
                  {expandedId === faq.id && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Didn't find what you're looking for?
          </h2>
          <p className="text-gray-600 mb-6">
            Get in touch with our support team for more information.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
