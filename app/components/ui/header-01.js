"use client"
import { Equal, X } from "@aliimam/icons"
import * as React from "react"
import { cn } from "@/lib/utils"
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
    const API = process.env.NEXT_PUBLIC_BACKEND_URL || "https://achal-backend-trial.tannis.in"
    async function load() {
      try {
        const res = await fetch(`${API}/api/services`)
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
              <a href="/#about">About Us</a>
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
                      href="https://achalprojects.com/billing/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 rounded-xl border border-transparent hover:bg-[#f5f3ef] hover:border-[#ede9e2] hover:translate-x-0.5 transition-all duration-150 no-underline"
                    >
                      <div className="flex items-center gap-2 text-base font-semibold text-[#0a1628] font-[DM_Sans,sans-serif]">
                        <span>👤</span> Employee Login
                      </div>
                      <div className="text-[13px] text-gray-500 mt-0.5 font-light font-[DM_Sans,sans-serif]">
                        Access your employee portal
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

/* ── Header ───────────────────────────────────────────────── */
const Header = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
            <div
              data-state={menuState ? "active" : undefined}
              className="data-[state=active]:block border backdrop-blur-2xl lg:data-[state=active]:flex hidden w-full flex-wrap items-center justify-end space-y-8 rounded-sm p-3 shadow-sm bg-white/95 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none"
            >
              <div className="lg:hidden block p-3">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="text-gray-800 hover:text-blue-600 text-sm block duration-150"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-2 sm:space-y-0" />
            </div>

          </div>
        </div>
      </nav>
    </header>
  )
}

export { Header }