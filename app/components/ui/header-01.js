"use client"
import { Equal, X } from "@aliimam/icons"
import * as React from "react"
import { cn } from "@/lib/utils"
import { API_BASE } from '@/lib/api'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu"

const menuItems = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#" },
  { name: "Contact", href: "#" },
]



const SVC_ICONS = ["⚙", "🏗", "🚢", "🛣", "🏭", "🌐", "⚡", "🔧", "🏛", "🚛"]

/* ── ServiceDropdownItem ──────────────────────────────────── */
function ServiceDropdownItem({ title, href, description, index }) {
  const icon = SVC_ICONS[index % SVC_ICONS.length]
  return (
    <li className="list-none">
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl border border-transparent hover:bg-[#f5f3ef] hover:border-[#ede9e2] hover:translate-x-0.5 transition-all duration-150 cursor-pointer no-underline"
        >
          {/* Icon */}
          <div className="w-8 h-8 rounded-lg shrink-0 bg-gradient-to-br from-[#0a1628] to-[#1a3a6b] flex items-center justify-center text-sm text-[#c8a96e] mt-0.5">
            {icon}
          </div>

          {/* Body */}
          <div className="min-w-0 flex-1">
            <div className="text-base font-semibold text-[#0a1628] leading-snug mb-0.5 truncate font-[DM_Sans,sans-serif]">
              {title}
            </div>
            {description && (
              <p className="text-[13px] text-gray-500 leading-[1.45] line-clamp-2 font-light font-[DM_Sans,sans-serif]">
                {description}
              </p>
            )}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

/* ── Menus ────────────────────────────────────────────────── */
export function Menus({ isScrolled }) {
  const [svcList, setSvcList] = React.useState([])

  React.useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/services`)
        if (!mounted || !res.ok) return
        const data = await res.json().catch(() => null)
        if (!mounted || !data) return
        if (Array.isArray(data)) setSvcList(data)
        else if (typeof data === "object") setSvcList([data])
      } catch (e) {
        console.error("Failed to load services for menu", e)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const linkClass = cn(
    navigationMenuTriggerStyle(),
    "bg-transparent text-base font-semibold transition-colors duration-300",
    isScrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-white/80"
  )

  const triggerClass = cn(
    "bg-transparent text-base font-semibold transition-colors duration-300",
    isScrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-white/80"
  )

  const serviceList = svcList.length ? svcList : []
  return (
    <div className="flex items-center gap-0">

      {/* ── Left group: About, Services, Careers, Contact, Track ── */}
      <NavigationMenu>
        <NavigationMenuList>

          {/* About Us */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={linkClass}>
              <a href="/aboutUs">About Us</a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Services dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className={triggerClass}>
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className=" bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* 2-col service grid */}
              <ul className=" w-xl p-5">
                {serviceList.map((svcList, i) => (
                  <ServiceDropdownItem
                    key={svcList.slug || svcList.title || i}
                    title={svcList.name || svcList.title}
                    href={svcList.slug ? `/services/${svcList.slug}` : svcList.href}
                    description={svcList.shortDescription || svcList.description}
                    index={i}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Careers */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={linkClass}>
              <a href="/careers">Careers</a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Contact */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={linkClass}>
              <a href="/contact">Contact</a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Track Your Parcel */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={linkClass}>
              <a href="https://cargo.achalprojects.com/" target="_blank" rel="noopener noreferrer">
                Track Your Parcel
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      {/* ── Right group: Login ── */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={triggerClass}>
              Login
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="p-3 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden w-60"
            >
              <ul className="w-sm gap-0.5 m-0 p-0">

                {/* Employee Login */}
                <li className="list-none">
                  <NavigationMenuLink asChild>
                    <a
                      href="https://billing.achalprojects.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 rounded-xl border border-transparent hover:bg-[#f5f3ef] hover:border-[#ede9e2] hover:translate-x-0.5 transition-all duration-150 no-underline"
                    >
                      <div className="flex items-center gap-2 text-base font-semibold text-[#0a1628] font-[DM_Sans,sans-serif]">
                        <span>👤</span> Billing Software Login
                      </div>
                      <div className="text-[13px] text-gray-500 mt-0.5 font-light font-[DM_Sans,sans-serif]">
                        Access your Billing portal
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>

                {/* Parking Login */}
                <li className="list-none">
                  <NavigationMenuLink asChild>
                    <a
                      href="https://parking.achalprojects.com/Admin/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 rounded-xl border border-transparent hover:bg-[#f5f3ef] hover:border-[#ede9e2] hover:translate-x-0.5 transition-all duration-150 no-underline"
                    >
                      <div className="flex items-center gap-2 text-base font-semibold text-[#0a1628] font-[DM_Sans,sans-serif]">
                        <span>🅿</span> Parking Login
                      </div>
                      <div className="text-[13px] text-gray-500 mt-0.5 font-light font-[DM_Sans,sans-serif]">
                        Manage parking operations
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>

              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

    </div>
  )
}

/* ── Mobile Menu Component ────────────────────────────────── */
function MobileMenu({ isScrolled, menuState, setMenuState, svcList }) {
  const [expandedMenu, setExpandedMenu] = React.useState(null)

  return (
    <div
      data-state={menuState ? "active" : undefined}
      className="data-[state=active]:block border backdrop-blur-2xl lg:data-[state=active]:flex hidden w-full flex-col rounded-sm p-4 shadow-sm bg-white/95 lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none max-h-[calc(100vh-100px)] overflow-y-auto lg:overflow-visible"
    >
      <div className="lg:hidden block">
        <ul className="space-y-4 text-base">
          {/* About Us */}
          <li>
            <a
              href="/aboutUs"
              onClick={() => setMenuState(false)}
              className="text-gray-800 hover:text-blue-600 text-sm block duration-150 font-semibold"
            >
              About Us
            </a>
          </li>

          {/* Services with submenu */}
          <li>
            <button
              onClick={() => setExpandedMenu(expandedMenu === "services" ? null : "services")}
              className="text-gray-800 hover:text-blue-600 text-sm block duration-150 font-semibold w-full text-left flex items-center justify-between"
            >
              Services
              <span className={`transition-transform ${expandedMenu === "services" ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {expandedMenu === "services" && (
              <ul className="mt-3 ml-4 space-y-2 border-l border-gray-200 pl-3">
                {svcList.length > 0 ? (
                  svcList.map((service, i) => (
                    <li key={service.slug || service.title || i}>
                      <a
                        href={service.slug ? `/services/${service.slug}` : service.href}
                        onClick={() => setMenuState(false)}
                        className="text-gray-600 hover:text-blue-600 text-xs block duration-150"
                      >
                        {service.name || service.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-xs">Loading services...</li>
                )}
              </ul>
            )}
          </li>

          {/* Careers */}
          <li>
            <a
              href="/careers"
              onClick={() => setMenuState(false)}
              className="text-gray-800 hover:text-blue-600 text-sm block duration-150 font-semibold"
            >
              Careers
            </a>
          </li>

          {/* Contact */}
          <li>
            <a
              href="/contact"
              onClick={() => setMenuState(false)}
              className="text-gray-800 hover:text-blue-600 text-sm block duration-150 font-semibold"
            >
              Contact
            </a>
          </li>

          {/* Track Your Parcel */}
          <li>
            <a
              href="https://cargo.achalprojects.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-600 text-sm block duration-150 font-semibold"
            >
              Track Your Parcel
            </a>
          </li>

          {/* Login with submenu */}
          <li className="border-t border-gray-200 pt-4 mt-4">
            <button
              onClick={() => setExpandedMenu(expandedMenu === "login" ? null : "login")}
              className="text-gray-800 hover:text-blue-600 text-sm block duration-150 font-semibold w-full text-left flex items-center justify-between"
            >
              Login
              <span className={`transition-transform ${expandedMenu === "login" ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {expandedMenu === "login" && (
              <ul className="mt-3 ml-4 space-y-2 border-l border-gray-200 pl-3">
                <li>
                  <a
                    href="https://achalprojects.com/billing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuState(false)}
                    className="text-gray-600 hover:text-blue-600 text-xs block duration-150"
                  >
                    👤 Employee Login
                  </a>
                </li>
                <li>
                  <a
                    href="https://parking.achalprojects.com/Admin/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuState(false)}
                    className="text-gray-600 hover:text-blue-600 text-xs block duration-150"
                  >
                    🅿 Parking Login
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

/* ── Header ───────────────────────────────────────────────── */
const Header = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [svcList, setSvcList] = React.useState([])

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/services`)
        if (!mounted || !res.ok) return
        const data = await res.json().catch(() => null)
        if (!mounted || !data) return
        if (Array.isArray(data)) setSvcList(data)
        else if (typeof data === "object") setSvcList([data])
      } catch (e) {
        console.error("Failed to load services for menu", e)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-50 w-full px-3 md:px-4 transition-colors duration-300"
      >
        <div
          className={cn(
            "mx-auto mt-2 transition-all duration-300",
            isScrolled && "bg-white max-w-7xl rounded-2xl border border-gray-200 px-3 shadow-sm"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-3 py-3">

            {/* Logo */}
            <div className="flex w-full justify-between lg:w-auto">
              <a href="/" aria-label="home" className="flex gap-2 items-center">
                <img
                  src="/final-logo.png"
                  alt="Logo"
                  height={50}
                  width={50}
                  className="h-12 ml-10 z-10 w-full object-contain drop-shadow-[0_0_2px_white]"
                />
              </a>

              {/* Mobile hamburger */}
              <div className="flex gap-2">
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-20 pr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Equal
                    data-state={menuState ? "active" : undefined}
                    className={cn(
                      "data-[state=active]:rotate-180 scale-[1.2] data-[state=active]:scale-0 data-[state=active]:opacity-0 m-auto duration-200",
                      isScrolled ? "text-gray-800" : "text-white"
                    )}
                  />
                  <X
                    data-state={menuState ? "active" : undefined}
                    className={cn(
                      "data-[state=active]:rotate-0 data-[state=active]:scale-[1.2] data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200",
                      isScrolled ? "text-gray-800" : "text-white"
                    )}
                  />
                </button>
              </div>
            </div>

            {/* Desktop navigation — centered */}
            <div className="absolute inset-0 m-auto hidden lg:block size-fit">
              <Menus isScrolled={isScrolled} />
            </div>

            {/* Mobile menu drawer */}
            <MobileMenu isScrolled={isScrolled} menuState={menuState} setMenuState={setMenuState} svcList={svcList} />

          </div>
        </div>
      </nav>
    </header>
  )
}

export function ModeToggle() {
  return null
}

export { Header }