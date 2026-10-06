'use client';
import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ChevronRight, Truck, Plane, Flame } from 'lucide-react';
import Link from 'next/link';
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://achal-backend-trial.tannis.in';

function GooglePlayIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <polygon fill="#00C3FF" points="3.5,1.5 13.2,12 3.5,22.5" />
      <polygon fill="#00E676" points="3.5,1.5 15.4,8.64 13.2,12" />
      <polygon fill="#FFC400" points="15.4,8.64 21,12 15.4,15.36 13.2,12" />
      <polygon fill="#FF3D47" points="3.5,22.5 13.2,12 15.4,15.36" />
    </svg>
  );
}

function WindowsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect fill="#00A4EF" x="2" y="2" width="9.5" height="9.5" />
      <rect fill="#00A4EF" x="12.5" y="2" width="9.5" height="9.5" />
      <rect fill="#00A4EF" x="2" y="12.5" width="9.5" height="9.5" />
      <rect fill="#00A4EF" x="12.5" y="12.5" width="9.5" height="9.5" />
    </svg>
  );
}

const STORES = {
  playstore: { caption: 'Get it on', label: 'Google Play', Icon: GooglePlayIcon },
  windows: { caption: 'Download for', label: 'Windows', Icon: WindowsIcon },
};

const appLinks = [
  {
    name: 'Achal Delivery Partner',
    Icon: Truck,
    stores: [
      { type: 'playstore', href: 'https://play.google.com/store/apps/details?id=com.achalinternational.deliverypartner' },
    ],
  },
  {
    name: 'Achal Airline Partner',
    Icon: Plane,
    stores: [
      { type: 'playstore', href: 'https://play.google.com/store/apps/details?id=com.achal.airlinepartner' },
      // TODO: replace with the real Windows app link
      { type: 'windows', href: 'https://cargo.achalprojects.com/uploads/windows.zip' },
    ],
  },
  
];

function StoreBadge({ type, href }) {
  const { caption, label, Icon } = STORES[type];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${caption} ${label}`}
      className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white rounded-lg pl-2.5 pr-3.5 py-1.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[9px] uppercase tracking-wide text-gray-300">{caption}</span>
        <span className="text-sm font-semibold">{label}</span>
      </span>
    </a>
  );
}

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
    { name: 'Civil Engineering', href: 'https://goachal.com/services/civil-engineering' },
    { name: 'Parking Service', href: 'https://goachal.com/services/parking' },
    { name: 'Restaurant Service', href: 'https://goachal.com/services/restaurant' },
    { name: 'Cargo Service', href: 'https://goachal.com/services/cargo' },
    { name: 'EV Charging', href: 'https://goachal.com/services/ev-charging' },
  ];

  const renderedServices = (Array.isArray(services) && services.length > 0)
    ? services.slice(0, 5).map((s) => {
      const name = s.name || s.title || s.slug || 'Service';
      const slug = s.slug || (name ? String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'service');
      return {
        name,
        href: `https://goachal.com/services/${slug}`,
      };
    })
    : defaultLinks;

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
              <div className="w-full md:w-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl md: border border-gray-200">
                
                <img src="/qr.jpeg" alt="ACHAL QR Code" className="w-55 h-50 object-contain rounded-md mx-auto" />
                
              </div>

              {/* Contact Info Card */}
              <div className="w-full md:w-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 md:p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Quick Contact</h4>
                <div className="space-y-3">
                  {/* <a href="tel:0612-41-37355" className="flex gap-3 items-start group cursor-pointer">
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">0612-41-37355</span>


                  </a> */}
                  <a href="tel:0120-6851294" className="flex gap-3 items-start group cursor-pointer">
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">0120-6851294</span>


                  </a>

                  <a href="mailto:info@goachal.com" className="flex gap-3 items-start group cursor-pointer">
                    <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">info@goachal.com</span>
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
                <li><Link href="/policy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1 group">
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

          {/* Apps */}
          <div className="mb-10 md:mb-12">
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-1">
              <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
              Our Apps
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {appLinks.map(({ name, Icon, stores }) => (
                <div key={name} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-semibold text-gray-900 text-sm">{name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stores.map((store) => (
                      <StoreBadge key={store.type} {...store} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs md:text-sm text-gray-600">
                © 2024 ACHAL INTERNATIONAL PVT LTD. All rights reserved.
              </p>
              <p className="text-xs md:text-sm text-gray-500 hidden">
                Designed by <a className="text-red-500" href='https://dacitos.com'>Dacitos Technologies Pvt. Ltd.</a> for excellence
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
