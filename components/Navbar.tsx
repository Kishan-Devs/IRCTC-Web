"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Trains",
    href: "/trains",
  },
  {
    label: "Bookings",
    href: "/bookings",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/images/irctc.png" 
            alt="IRCTC Logo"
            width={48}
            height={48}
            priority
            className="rounded-lg object-contain"
          />
          <Image
            src="/images/logo-irctc.png" 
            alt="IRCTC Logo"
            width={48}
            height={48}
            priority
            className="rounded-lg object-contain"
          />

          <div className="leading-tight">
            <h1 className="text-xl font-sans font-bold tracking-tight text-black">
              IRCTC
            </h1>

            <p className="text-xs text-slate-500">
              Train Ticket Booking
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative font-medium transition-colors duration-200",
                pathname === item.href
                  ? "text-blue-600"
                  : "text-slate-700 hover:text-blue-600"
              )}
            >
              {item.label}

              {pathname === item.href && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-blue-600" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={clsx(
          "overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-64" : "max-h-0 border-transparent"
        )}
      >
        <nav className="container flex flex-col py-3">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "rounded-lg px-4 py-3 font-medium transition",
                pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}