"use client"
import { Equal, X } from "@aliimam/icons"
import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
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
  { name: "Components", href: "#" },
  { name: "Contact", href: "#" },
]

const Header = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn(
          "fixed z-50 w-full px-3 md:px-4 transition-colors duration-300"
        )}
      >
        <div
          className={cn(
            "mx-auto mt-2 transition-all duration-300",
            isScrolled &&
            "bg-white max-w-7xl rounded-2xl border border-gray-200 px-3 shadow-sm"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-3 py-3">
            {/* Logo */}
            <div className="flex w-full justify-between lg:w-auto">
              <a
                href="/"
                aria-label="home"
                className="flex gap-2 items-center"
              >
                <img
                  src="/final-logo.png"
                  alt="Logo"
                  height={50}
                  width={50}
                  className="h-12 ml-10 z-10 w-full object-contain"
                  style={{
                    filter: "drop-shadow(0 0 2px white)"
                  }}
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
                      "data-[state=active]:rotate-180 scale-120 data-[state=active]:scale-0 data-[state=active]:opacity-0 m-auto duration-200",
                      isScrolled ? "text-gray-800" : "text-white"
                    )}
                  />
                  <X
                    data-state={menuState ? "active" : undefined}
                    className={cn(
                      "data-[state=active]:rotate-0 data-[state=active]:scale-120 data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200",
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

            {/* Mobile menu drawer + desktop right slot */}
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
                        <span>{item.name}</span>
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

const components = [
  {
    title: "Civil Engineering",
    href: "/services/civil-engineering",
    description:
      "Expert infrastructure design, building construction, and project management solutions.",
  },
  {
    title: "Parking Service",
    href: "/services/parking-service",
    description:
      "Smart parking solutions with real-time tracking and secure facilities.",
  },
  {
    title: "Restaurant Service",
    href: "/services/restaurant-service",
    description:
      "Premium dining and comprehensive catering services for all occasions.",
  },
  {
    title: "Cargo Service",
    href: "/services/cargo-service",
    description:
      "Reliable cargo transportation with nationwide coverage and real-time tracking.",
  },
  {
    title: "EV Charging Station",
    href: "/services/ev-charging-station",
    description:
      "Advanced electric vehicle charging infrastructure with fast-charging technology.",
  },
]

export function Menus({ isScrolled }) {
  // When not scrolled: white text (for hero/dark backgrounds)
  // When scrolled: dark text (for the white pill navbar)
  const linkClass = cn(
    navigationMenuTriggerStyle(),
    "bg-transparent text-md font-semibold transition-colors duration-300",
    isScrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-white/80"
  )

  const triggerClass = cn(
    "bg-transparent text-md font-semibold transition-colors duration-300",
    isScrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-white/80"
  )

  return (
    <NavigationMenu viewport>
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

          <NavigationMenuContent className="px-5 py-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="z-50 grid gap-2 max-w-lg lg:w-xl">
              {components.map((component) => (
                <ListItem key={component.title} href={component.href}>
                  <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <p className="text-lg font-bold text-gray-900">
                      {component.title}
                    </p>
                    <p className="text-gray-600">{component.description}</p>
                  </div>
                </ListItem>
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
            <a href="https://cargo.achalprojects.com/">Track Your Parcel</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Login dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            Login
          </NavigationMenuTrigger>

          <NavigationMenuContent className="p-4 bg-white border border-gray-200 rounded-xl shadow-lg">
            <ul className="z-50 grid gap-3 md:grid-cols-1 max-w-xl lg:w-3xl">
              <li className="p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <a
                  href="https://achalprojects.com/billing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full text-gray-800 hover:text-blue-600"
                >
                  Employee Login
                </a>
              </li>
              <li className="p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <a
                  href="https://parking.achalprojects.com/Admin/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full text-gray-800 hover:text-blue-600"
                >
                  Parking Login
                </a>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

export function ModeToggle() {
  return null
}

export { Header }