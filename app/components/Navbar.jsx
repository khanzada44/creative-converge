"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="w-full bg-black text-white px-4 md:px-8 py-4 flex items-center justify-between border-b border-zinc-800 relative z-50">
      
      {/* Left Section: Menu Toggle / Icon + Logo */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none hover:text-orange-500 transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo (Aap yahan apni image bhi laga sakte hain <Image /> component use karke) */}
        <Link href="/" className="flex items-center gap-2">
          <div className="font-extrabold text-2xl tracking-wider flex items-center">
            {/* Visual placeholder for the logo graphic */}
            <span className="text-orange-500 font-black text-3xl">c</span>
            <span className="text-orange-400">reative</span>
            <span className="text-cyan-400 ml-1 font-semibold text-xl">converge</span>
          </div>
        </Link>
      </div>

      {/* Center/Middle Nav Links (Desktop) */}
      <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
        {/* Services Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            className="flex items-center gap-1 hover:text-orange-400 transition-colors focus:outline-none"
          >
            Services <ChevronDown className="w-4 h-4" />
          </button>
          
          {isServicesOpen && (
            <div className="absolute top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-md shadow-xl py-2 z-50">
              <Link href="/services/web-dev" className="block px-4 py-2 hover:bg-zinc-800 text-sm">Web Development</Link>
              <Link href="/services/ui-ux" className="block px-4 py-2 hover:bg-zinc-800 text-sm">UI/UX Design</Link>
              <Link href="/services/branding" className="block px-4 py-2 hover:bg-zinc-800 text-sm">Branding</Link>
            </div>
          )}
        </div>

        <Link href="/pricing" className="hover:text-orange-400 transition-colors">Pricing</Link>
        <Link href="/cases" className="hover:text-orange-400 transition-colors">Cases</Link>
        <Link href="/contact" className="hover:text-orange-400 transition-colors">Contact us</Link>
      </nav>

      {/* Right Section: Email & Get a Quote Button */}
      <div className="hidden xl:flex items-center gap-8">
        <a 
          href="mailto:info@websdesignusa.com" 
          className="text-sm text-zinc-300 hover:text-white transition-colors"
        >
          info@websdesignusa.com
        </a>

        <Link 
          href="/quote"
          className="border border-emerald-500 hover:bg-emerald-500/10 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        >
          Get a quote
        </Link>
      </div>

      {/* Mobile / Tablet Hamburger Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-zinc-800 p-6 flex flex-col gap-4 lg:hidden shadow-2xl">
          <div className="flex flex-col gap-3">
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Menu</span>
            <Link href="/services" onClick={() => setIsOpen(false)} className="text-lg hover:text-orange-400">Services</Link>
            <Link href="/pricing" onClick={() => setIsOpen(false)} className="text-lg hover:text-orange-400">Pricing</Link>
            <Link href="/cases" onClick={() => setIsOpen(false)} className="text-lg hover:text-orange-400">Cases</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg hover:text-orange-400">Contact us</Link>
          </div>
          <div className="border-t border-zinc-800 pt-4 flex flex-col gap-3">
            <a href="mailto:info@websdesignusa.com" className="text-sm text-zinc-400">info@websdesignusa.com</a>
            <Link 
              href="/quote"
              onClick={() => setIsOpen(false)}
              className="border border-emerald-500 text-center text-white py-2 rounded-full text-sm font-medium hover:bg-emerald-500/10"
            >
              Get a quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}