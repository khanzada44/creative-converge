"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  popupImage: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Web site design for curious company",
    category: "Mobile App / Fintech",
    image: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/08/AR_FF.jpg",
    popupImage: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/08/AR_FF.jpg",
  },
  {
    id: 2,
    title: "Modern Kitchen & Furniture Showcase",
    category: "E-Commerce / Interior",
    image: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/08/appscreens.jpg",
    popupImage: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/08/appscreens.jpg",
  },
  {
    id: 3,
    title: "Fruit N Boba Tea Storefront",
    category: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
    popupImage: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Browse Nature's Remedy & CBD",
    category: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop",
    popupImage: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop",
  },
];

/* Custom Reveal Component for Smooth Scroll Animations */
function Reveal({
  children,
  from = 0.85,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "scale(1)" : `scale(${from})`,
          transition: inView
            ? `opacity 0.9s ease-out ${delay}ms, transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms`
            : "none",
          transformOrigin: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function OurLatestCases() {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!activeItem) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveItem(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeItem]);

  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 font-['Poppins',sans-serif] text-white sm:px-10 lg:px-[100px] lg:py-[130px]">
      
      {/* Header Area */}
      <div className="relative mb-14 flex flex-col md:flex-row md:items-end md:justify-between">
        
        {/* Background Large Watermark Text */}
        <span className="pointer-events-none absolute -top-10 left-0 z-0 select-none text-7xl font-bold uppercase tracking-wider text-white/[0.04] sm:text-8xl md:-top-16 lg:text-[140px]">
          portfolio
        </span>

        {/* Main Heading & Content (Foreground) with Reveal Animation */}
        <div className="relative z-10">
          <Reveal from={0.8} delay={100}>
            <div className="flex items-center gap-3">
              <span className="inline-block h-[2px] w-12 bg-white" />
              <span className="text-sm font-normal tracking-wide text-white/80">
                portfolio
              </span>
            </div>
          </Reveal>

          <Reveal from={0.85} delay={200}>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Our latest cases<span className="text-[#2e8b57]">.</span>
            </h2>
          </Reveal>

          <Reveal from={0.9} delay={300}>
            <p className="mt-3 max-w-[600px] text-sm font-normal leading-relaxed text-white/70 sm:text-base">
              We always try to implement our creative ideas at the highest level. You can see it by looking at our portfolio.
            </p>
          </Reveal>
        </div>
        {/* Button Link */}
        <div className="relative z-10 mt-6 md:mt-0">
          <Reveal from={0.9} delay={400}>
            <a
              href="#all-cases"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wider text-white transition-colors hover:text-[#2e8b57]"
            >
              VIEW ALL CASES
              
            </a>
          </Reveal>
        </div>
      </div>

      {/* Portfolio Grid with Individual Staggered Reveal Animations */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {portfolioItems.map((item, index) => (
          <Reveal key={item.id} from={0.85} delay={150 + index * 100}>
            <div
              onClick={() => {
                setActiveItem(item);
                setIsZoomed(false);
              }}
              className="group relative h-[380px] w-full cursor-pointer overflow-hidden bg-neutral-900 sm:h-[450px]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-medium text-[#2e8b57] mb-1">{item.category}</span>
                <h3 className="text-lg font-semibold leading-snug sm:text-xl">
                  {item.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white/80 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                  <span>Explore Project</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[9999] flex flex-col select-none font-['Poppins',sans-serif]"
              >
                {/* Blurred backdrop */}
                <div
                  className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                  onClick={() => setActiveItem(null)}
                />

                {/* Toolbar */}
                <div className="relative z-20 flex items-center justify-end gap-6 px-6 py-4 text-white">
                  <button
                    onClick={() =>
                      document.fullscreenElement
                        ? document.exitFullscreen()
                        : document.documentElement.requestFullscreen()
                    }
                    className="text-white/70 transition-colors hover:text-white"
                    title="Fullscreen"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsZoomed((z) => !z)}
                    className="text-white/70 transition-colors hover:text-white"
                    title="Zoom"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="text-white/70 transition-colors hover:text-white"
                    title="Share"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3.316 3.316 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3.316 3.316 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="p-1 text-xl font-bold text-white/70 transition-colors hover:text-white"
                    title="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* Image Area */}
                <div
                  className="relative z-10 flex flex-1 items-center justify-center overflow-hidden px-4 pb-4"
                  onClick={(e) => e.target === e.currentTarget && setActiveItem(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-center overflow-hidden rounded-lg bg-white shadow-2xl"
                    style={{
                      maxHeight: "85vh",
                      maxWidth: isZoomed ? "96vw" : "90vw",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeItem.popupImage}
                      alt={activeItem.title}
                      draggable={false}
                      style={{
                        display: "block",
                        maxHeight: "85vh",
                        maxWidth: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="relative z-20 py-3 text-center">
                  <span className="text-sm font-semibold tracking-wider text-white/80">
                    {activeItem.title}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}