'use client';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border/50">
      {/* Main Footer */}
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">ACHAL PROJECTS</h3>
              <p className="text-sm text-muted-foreground mb-4">Your trusted partner in comprehensive service solutions.</p>
              <div className="flex gap-4">
                <Facebook className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services/civil-engineering" className="hover:text-primary transition-colors">Civil Engineering</Link></li>
                <li><Link href="/services/parking" className="hover:text-primary transition-colors">Parking Service</Link></li>
                <li><Link href="/services/restaurant" className="hover:text-primary transition-colors">Restaurant Service</Link></li>
                <li><Link href="/services/cargo" className="hover:text-primary transition-colors">Cargo Service</Link></li>
                <li><Link href="/services/ev-charging" className="hover:text-primary transition-colors">EV Charging</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                {/* <li><Link href="#press" className="hover:text-primary transition-colors">Press</Link></li> */}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/termsand" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-2">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <p>0612-41-37355</p>
                </div>
                <div className="flex gap-2">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>info@achalprojects.com</span>
                </div>
                <div className="flex gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Headquarters, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 ACHAL PROJECTS PVT LTD. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <Link href="#sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
                <Link href="#accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
