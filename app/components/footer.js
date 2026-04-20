'use client';
import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';

export function Footer() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/services`);
        if (!mounted) return;
        if (!res.ok) {
          setErr(new Error('Failed to load services'));
          setServices([]);
        } else {
          const data = await (async () => {
            try {
              return await res.json();
            } catch (e) {
              return null;
            }
          })();
          if (!data) {
            setServices([]);
          } else if (Array.isArray(data)) {
            setServices(data);
          } else if (typeof data === 'object') {
            setServices([data]);
          } else {
            setServices([]);
          }
        }
      } catch (e) {
        if (!mounted) return;
        setErr(e);
        setServices([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const defaultLinks = [
    { name: 'Civil Engineering', href: '/services/civil-engineering' },
    { name: 'Parking Service', href: '/services/parking' },
    { name: 'Restaurant Service', href: '/services/restaurant' },
    { name: 'Cargo Service', href: '/services/cargo' },
    { name: 'EV Charging', href: '/services/ev-charging' },
  ];

  const renderedServices = services.length > 0 ? services.slice(0, 5).map((s) => ({
    name: s.name || s.title || s.slug,
    href: `/services/${s.slug}`,
  })) : defaultLinks;

  return (
    <footer className="w-full bg-white">
      {/* Main Footer */}
      <div className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Section - Company Info */}
          <div className="mb-10 md:mb-12 pb-8 md:pb-10 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 md:gap-8">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">ACHAL INTERNATIONAL PVT. LTD.</h3>
                <p className="text-sm md:text-base text-gray-600 mb-5 leading-relaxed">Your trusted partner in comprehensive service solutions delivering excellence across industries.</p>
                <div className="flex gap-3">
                  <a href="#" className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-110">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2.5 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-110">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2.5 bg-gradient-to-br from-blue-700 to-blue-800 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-110">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="w-full md:w-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 md:p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Quick Contact</h4>
                <div className="space-y-3">
                  <a href="tel:0612-41-37355" className="flex gap-3 items-start group cursor-pointer">
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">0612-41-37355</span>


                  </a>
                  <a href="tel:0120-6851294" className="flex gap-3 items-start group cursor-pointer">
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">0120-6851294</span>


                  </a>

                  <a href="mailto:info@achalprojects.com" className="flex gap-3 items-start group cursor-pointer">
                    <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">info@achalprojects.com</span>
                  </a>
                  <div className="flex gap-3 items-start">
                    <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Bihar, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-12">
            {/* Services */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-1">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Services
              </h4>
              <ul className="space-y-2.5">
                {renderedServices.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 group">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-1" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-1">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Company
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/aboutUs" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-1" />
                  <span>About Us</span>
                </Link></li>
                <li><Link href="/careers" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-1" />
                  <span>Careers</span>
                </Link></li>
                <li><Link href="/blog" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-1" />
                  <span>Blog</span>
                </Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-1">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/termsand" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-1" />
                  <span>Privacy Policy</span>
                </Link></li>
                <li><Link href="/termsand" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-1" />
                  <span>Terms of Service</span>
                </Link></li>
              </ul>
            </div>

            {/* Additional */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-1">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                More
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="#sitemap" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-1" />
                  <span>Sitemap</span>
                </Link></li>
                <li><Link href="/faq" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-1" />
                  <span>FAQs</span>
                </Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs md:text-sm text-gray-600">
                © 2024 ACHAL INTERNATIONAL PVT LTD. All rights reserved.
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                Designed by <span className="text-red-500">Ficuslot Innovation Pvt. Ltd.</span> for excellence
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
