"use client";

import * as React from "react";
import { Equal, X } from "@aliimam/icons";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "https://achal-backend-trial.tannis.in";

const DEFAULT_SERVICES = [
  { name: "Civil Engineering", slug: "civil", desc: "Turnkey structural engineering, infrastructure & highway works." },
  { name: "EV Infrastructure", slug: "ev", desc: "Level 3 DC high-capacity highway charging grids." },
  { name: "Cargo & Logistics", slug: "cargo", desc: "Interstate bonded freight forwarding & real-time telemetry." },
  { name: "Parking Solutions", slug: "parking", desc: "IoT automated multi-bay parking and revenue management." },
  { name: "Restaurant Services", slug: "hospitality", desc: "Turnkey enterprise dining & institutional banquet operations." },
];

export function Menus() {
  const [svcList, setSvcList] = React.useState(DEFAULT_SERVICES);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/services`);
        if (!mounted || !res.ok) return;
        const data = await res.json().catch(() => null);
        if (!mounted || !data) return;
        if (Array.isArray(data) && data.length) setSvcList(data);
      } catch (e) {
        // Fallback default services are used
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const navLinkStyle = cn(
    navigationMenuTriggerStyle(),
    "bg-transparent text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#0284c7] hover:bg-slate-100 focus:bg-slate-100 focus:text-[#0284c7] data-[state=open]:text-[#0284c7] transition-colors px-3 py-2 rounded-md cursor-pointer"
  );

  return (
    <div className="flex items-center gap-1">
      {/* ── Standard Navigation Menu for Informational Links ── */}
      <NavigationMenu>
        <NavigationMenuList className="gap-1 flex items-center m-0 p-0">
          {/* 1. About Us */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navLinkStyle}>
              <a href="/aboutUs">About Us</a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* 2. Services Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navLinkStyle}>
              Services
            </NavigationMenuTrigger>

            <NavigationMenuContent className="!w-auto !max-w-none bg-transparent border-0 p-0 shadow-none">
              <div className="w-[620px] bg-white border border-slate-200/90 rounded-2xl shadow-[0_20px_50px_rgba(10,25,47,0.18)] p-6">
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                    <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#0284c7]">
                      Core Industrial Verticals
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Turnkey EPC &bull; Pan-India
                  </span>
                </div>

                {/* Structured 2-Column Grid */}
                <ul className="grid grid-cols-2 gap-3 m-0 p-0 list-none">
                  {svcList.map((svc, i) => {
                    const rawName = svc.name || svc.title || "";
                    const formattedName = rawName
                      .toLowerCase()
                      .split(" ")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ");

                    const description = svc.shortDescription || svc.desc || svc.description || "Turnkey project execution & management.";

                    return (
                      <li key={svc.slug || i} className="list-none">
                        <NavigationMenuLink asChild>
                          <a
                            href={svc.slug ? `/services/${svc.slug}` : (svc.href || "/")}
                            className="group flex items-start gap-3.5 p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-[#f8fafc] transition-all duration-150"
                          >
                            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:text-[#0284c7] group-hover:border-[#0284c7]/40 group-hover:bg-white transition-colors shrink-0 mt-0.5">
                              <span className="text-xs font-mono font-bold">
                                0{i + 1}
                              </span>
                            </div>

                            <div className="min-w-0">
                              <div className="text-[13px] font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug flex items-center gap-1">
                                <span className="truncate">{formattedName}</span>
                                <span className="text-slate-300 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all text-xs">
                                  &rarr;
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed font-normal">
                                {description}
                              </p>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>

                {/* Footnote */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    Need custom turnkey contract specifications?
                  </span>
                  <a
                    href="/#services-sec"
                    className="font-bold text-[#0284c7] hover:text-[#0369a1] flex items-center gap-1 transition-colors"
                  >
                    View All Capabilities &rarr;
                  </a>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* 3. Careers */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navLinkStyle}>
              <a href="/careers">Careers</a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* 4. Contact */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navLinkStyle}>
              <a href="/contact">Contact</a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* 5. Track Your Parcel */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navLinkStyle}>
              <a href="https://cargo.achalprojects.com/" target="_blank" rel="noopener noreferrer">
                Track Your Parcel
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* ── LOGIN DROPDOWN (Direct sibling, cleanly anchored to button) ── */}
      <div className="relative group ml-1">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#0284c7] hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
        >
          <span>LOGIN</span>
          <svg
            className="w-3.5 h-3.5 text-slate-500 transition-transform duration-200 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Anchored Card */}
        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute top-full right-0 pt-2 z-50">
          <div className="w-[320px] bg-white border border-slate-200/90 rounded-2xl shadow-[0_20px_50px_rgba(10,25,47,0.18)] p-4">
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#0284c7]">
                Internal Portals
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Secure SSO
              </span>
            </div>

            <div className="space-y-1.5">
              {/* Billing */}
              <a
                href="https://billing.goachal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/item flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-slate-200/80 hover:bg-[#f8fafc] transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover/item:text-[#0284c7] group-hover/item:border-[#0284c7]/40 group-hover/item:bg-white transition-colors shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1.867 1.867 0 01.707.293l5.414 5.414a1.442 1.442 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 group-hover/item:text-[#0284c7] transition-colors leading-snug flex items-center justify-between">
                    <span>Billing Software Login</span>
                    <span className="text-slate-300 group-hover/item:text-[#0284c7] group-hover/item:translate-x-0.5 transition-all text-xs">&rarr;</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-normal">
                    Access invoices &amp; accounts
                  </div>
                </div>
              </a>

              {/* Parking */}
              <a
                href="https://parking.goachal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/item flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-slate-200/80 hover:bg-[#f8fafc] transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover/item:text-[#0284c7] group-hover/item:border-[#0284c7]/40 group-hover/item:bg-white transition-colors shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <rect x="5" y="4" width="14" height="16" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 16V8h4a3 3 0 010 6H9" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 group-hover/item:text-[#0284c7] transition-colors leading-snug flex items-center justify-between">
                    <span>Parking Login</span>
                    <span className="text-slate-300 group-hover/item:text-[#0284c7] group-hover/item:translate-x-0.5 transition-all text-xs">&rarr;</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-normal">
                    Manage parking telemetry
                  </div>
                </div>
              </a>

              {/* Admin */}
              <a
                href="https://admin.goachal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/item flex items-start gap-3 p-2.5 rounded-xl border border-transparent hover:border-slate-200/80 hover:bg-[#f8fafc] transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover/item:text-[#0284c7] group-hover/item:border-[#0284c7]/40 group-hover/item:bg-white transition-colors shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 group-hover/item:text-[#0284c7] transition-colors leading-snug flex items-center justify-between">
                    <span>Admin Login</span>
                    <span className="text-slate-300 group-hover/item:text-[#0284c7] group-hover/item:translate-x-0.5 transition-all text-xs">&rarr;</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-normal">
                    Central corporate admin portal
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-4 sm:px-8">
      {/* ── Solid White Navbar Container ── */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.18)] border border-slate-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/final-logo.png"
            alt="ACHAL"
            className="h-10 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-wider text-[#0a1628] leading-tight">
              ACHAL
            </span>
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold -mt-0.5">
              International
            </span>
          </div>
        </a>

        {/* Desktop Navbar Links */}
        <div className="hidden lg:block">
          <Menus />
        </div>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center shrink-0">
          <a
            href="/contact"
            className="px-5 py-2.5 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMenuState(!menuState)}
          className="lg:hidden p-2 text-slate-800"
          aria-label="Toggle menu"
        >
          {menuState ? <X className="size-6" /> : <Equal className="size-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuState && (
        <div className="lg:hidden mt-2 bg-white rounded-xl border border-slate-200 shadow-xl p-5 space-y-3">
          <a
            href="/aboutUs"
            onClick={() => setMenuState(false)}
            className="block text-slate-800 font-bold text-xs uppercase"
          >
            About Us
          </a>
          <a
            href="/careers"
            onClick={() => setMenuState(false)}
            className="block text-slate-800 font-bold text-xs uppercase"
          >
            Careers
          </a>
          <a
            href="/contact"
            onClick={() => setMenuState(false)}
            className="block text-slate-800 font-bold text-xs uppercase"
          >
            Contact
          </a>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://cargo.achalprojects.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2.5 rounded-md bg-slate-100 text-slate-800 text-xs font-bold uppercase"
            >
              Track Your Parcel
            </a>
            <a
              href="https://billing.goachal.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2 rounded-md border border-slate-200 text-slate-800 text-xs font-bold uppercase"
            >
              Billing Login
            </a>
            <a
              href="https://parking.goachal.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2 rounded-md border border-slate-200 text-slate-800 text-xs font-bold uppercase"
            >
              Parking Login
            </a>
            <a
              href="https://admin.goachal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2 rounded-md border border-slate-200 text-slate-800 text-xs font-bold uppercase"
            >
              Admin Login
            </a>
            <a
              href="/contact"
              className="text-center py-2.5 rounded-md bg-[#0284c7] text-white text-xs font-bold uppercase"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function ModeToggle() {
  return null;
}

export default Header;