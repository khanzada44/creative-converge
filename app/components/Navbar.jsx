"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, X, Search } from "lucide-react";

const services = [
  { label: "Logo Design Solutions", href: "/services/logo-design" },
  { label: "Illustration Design", href: "/services/illustration-design" },
  { label: "Web Design Solutions", href: "/services/web-design" },
  { label: "Branding", href: "/services/branding" },
  { label: "Ecommerce Website Solutions", href: "/services/ecommerce" },
  { label: "Stunning Video Animation Services", href: "/services/video-animation" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // side panel
  const [isSideServicesOpen, setIsSideServicesOpen] = useState(false); // panel ke andar Services accordion
  const [isServicesOpen, setIsServicesOpen] = useState(false); // top navbar hover dropdown
  const closeTimer = useRef(null);

  // Hover par open, mouse hatne par thori der baad close
  const openServices = () => {
    clearTimeout(closeTimer.current);
    setIsServicesOpen(true);
  };
  const closeServices = () => {
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 120);
  };

  const closePanel = () => {
    setIsOpen(false);
    setIsSideServicesOpen(false);
  };

  // Escape dabane par panel band
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closePanel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="absolute top-0 left-0 z-50 w-full bg-transparent px-4 py-3 text-white md:px-8 font-[Mulish,sans-serif]">
        <div className="flex items-center justify-between">
          {/* LEFT: icon + logo + nav links */}
          <div className="flex items-center gap-8 xl:gap-12">
            <button
              onClick={() => setIsOpen(true)}
              className="transition-opacity hover:opacity-70 focus:outline-none"
              aria-label="Open Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path d="M0.711397 17.6359C-0.0696518 18.417 -0.0696518 19.6833 0.711397 20.4644C1.49245 21.2454 2.75878 21.2454 3.53982 20.4644L20.5104 3.4938C21.2914 2.71276 21.2914 1.44642 20.5104 0.665376C19.7293 -0.115673 18.463 -0.115672 17.682 0.665376L0.711397 17.6359Z" fill="white" />
                <path d="M2.12558 31.7781C1.34453 30.997 1.34453 29.7307 2.12558 28.9496L19.0961 11.9791C19.8772 11.198 21.1435 11.198 21.9246 11.9791C22.7056 12.7601 22.7056 14.0264 21.9246 14.8075L4.95401 31.7781C4.17296 32.5591 2.90663 32.5591 2.12558 31.7781Z" fill="white" />
                <path d="M13.4393 33.1923C12.6583 32.4112 12.6583 31.1449 13.4393 30.3638L30.4099 13.3933C31.1909 12.6122 32.4572 12.6122 33.2383 13.3933C34.0193 14.1743 34.0193 15.4407 33.2383 16.2217L16.2677 33.1923C15.4867 33.9733 14.2204 33.9733 13.4393 33.1923Z" fill="white" />
              </svg>
            </button>

            <Link href="/" className="flex items-center">
              <img
                src="https://creativeconverge.com/assets/images/logo-dark.png"
                alt="Creative Converge"
                className="h-14 w-auto"
              />
            </Link>

            <nav className="hidden items-center gap-8 text-[15px] font-semibold md:flex">
              {/* Services dropdown (hover) */}
              <div className="relative" onMouseEnter={openServices} onMouseLeave={closeServices}>
                <button
                  className={`flex items-center gap-1.5 transition-colors focus:outline-none ${
                    isServicesOpen ? "text-emerald-500" : "text-white"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isServicesOpen}
                >
                  Services
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute left-0 top-full pt-4 transition-all duration-200 ${
                    isServicesOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <ul className="w-[360px] overflow-hidden bg-[#10101a] shadow-2xl">
                    {services.slice(0, 6).map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block px-7 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-emerald-700/80"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="/pricing" className="transition-colors hover:text-emerald-400">Pricing</Link>
              <Link href="/cases" className="transition-colors hover:text-emerald-400">Cases</Link>
              <Link href="/contact" className="transition-colors hover:text-emerald-400">Contact us</Link>
            </nav>
          </div>

          {/* RIGHT: email + Get a quote */}
          <div className="hidden items-center gap-8 xl:flex">
            <a
              href="mailto:info@websdesignusa.com"
              className="text-[15px] font-semibold text-white transition-colors hover:text-emerald-400"
            >
              info@websdesignusa.com
            </a>
            <Link
              href="/quote"
              className="rounded-full border-2 border-emerald-600 px-9 py-3 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-emerald-600"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Dark overlay (poora page dim, click par band) ===== */}
      <div
        onClick={closePanel}
        className={`fixed inset-0 z-[60] bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* ===== Left slide-in panel ===== */}
      <aside
        className={`fixed left-0 top-[74px] z-[70] h-[512px] w-[300px] overflow-y-auto bg-[#0a0a18] font-[Mulish,sans-serif] text-white shadow-2xl transition-transform duration-500 ease-out
          [scrollbar-width:thin] [scrollbar-color:#22a455_transparent]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!isOpen}
      >
        {/* Close button */}
        <div className="flex justify-end px-5 pt-4">
          <button onClick={closePanel} aria-label="Close Menu" className="transition-opacity hover:opacity-70">
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="mt-4 px-8 text-[14px] font-semibold">
          <li>
            <Link href="/about" onClick={closePanel} className="block py-[11px] transition-colors hover:text-emerald-400">
              About us
            </Link>
          </li>

          {/* Services accordion */}
          <li>
            <button
              onClick={() => setIsSideServicesOpen(!isSideServicesOpen)}
              className="flex items-center gap-1.5 py-[11px] transition-colors hover:text-emerald-400 focus:outline-none"
            >
              Services
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${isSideServicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <ul
              className={`-mx-3 overflow-hidden transition-all duration-300 ${
                isSideServicesOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closePanel}
                    className="block px-3 py-[10px] text-[12px] font-semibold leading-tight transition-colors hover:bg-emerald-950"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <Link href="/pricing" onClick={closePanel} className="block py-[11px] transition-colors hover:text-emerald-400">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/cases" onClick={closePanel} className="block py-[11px] transition-colors hover:text-emerald-400">
              Cases
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={closePanel} className="block py-[11px] transition-colors hover:text-emerald-400">
              Contact us
            </Link>
          </li>
        </ul>

        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-4 mt-6 flex items-center border-b border-zinc-700 pb-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent px-2 text-[13px] text-white placeholder-zinc-600 outline-none"
          />
          <button type="submit" aria-label="Search" className="text-emerald-500">
            <Search className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Social links */}
        <div className="mt-8 flex items-center justify-center gap-8 pb-6 text-[12px] font-semibold uppercase">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-emerald-400">
            LinkedIn
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-emerald-400">
            Facebook
          </a>
        </div>
      </aside>
    </>
  );
}