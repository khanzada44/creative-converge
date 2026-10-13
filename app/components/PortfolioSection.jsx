"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ZoomIn, ExternalLink, X, Filter, ChevronRight } from "lucide-react";

// Categories definition
const CATEGORIES = ['Logo', 'Web', 'Branding', 'Video Animations', 'Mobile Apps'];

// Portfolio items with category tags and component renderers / images
const portfolioItems = [
    {
        id: 1,
        title: "It's Okay Now Logo Design",
        category: "Logo",
        sub: "Minimalist Branding",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 2,
        title: "Shield Badge Identity",
        category: "Logo",
        sub: "Vector Graphic",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 3,
        title: "NatraHealth Corporate Identity",
        category: "Logo",
        sub: "Eco-Friendly Branding",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 4,
        title: "DBPEC Electrical Consulting",
        category: "Logo",
        sub: "Corporate Visuals",
        image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 5,
        title: "DBPEC Electrical Consulting",
        category: "Logo",
        sub: "Corporate Visuals",
        image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 6,
        title: "DBPEC Electrical Consulting",
        category: "Logo",
        sub: "Corporate Visuals",
        image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 7,
        title: "DBPEC Electrical Consulting",
        category: "Logo",
        sub: "Corporate Visuals",
        image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 5,
        title: "Summit Counselling Web Portal",
        category: "Web",
        sub: "UI/UX & Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 6,
        title: "Red Carpet Florals E-Commerce",
        category: "Web",
        sub: "Online Storefront",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 7,
        title: "The Noah Robert Project",
        category: "Branding",
        sub: "Brand Guidelines",
        image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 8,
        title: "Preppd Napa Valley Branding",
        category: "Branding",
        sub: "Visual Identity",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 9,
        title: "The Logic Coach Animation",
        category: "Video Animations",
        sub: "Motion Graphics",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 10,
        title: "Travelling With Me Reel",
        category: "Video Animations",
        sub: "Promo Video",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 11,
        title: "Crabs Recipe Mobile App",
        category: "Mobile Apps",
        sub: "iOS & Android UI",
        image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1200&auto=format&fit=crop&q=80",
    },
    {
        id: 12,
        title: "The Painted Bird App",
        category: "Mobile Apps",
        sub: "Cross Platform App",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
        popupImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80",
    },
];

/* Custom Reveal Component for Smooth Scroll Animations */

function Reveal({
    children,
    delay = 0,
    className = "",
}) {
    const ref = useRef(null);
    const inView = useInView(ref, {
        once: true,
        margin: "-80px",
    });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={
                inView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 60, scale: 0.96 }
            }
            transition={{
                duration: 0.8,
                delay: delay / 1000,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}


export default function OurPortfolioSection() {
    const [activeCategory, setActiveCategory] = useState("Logo");
    const [activeItem, setActiveItem] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Filter items based on active category tab
    const filteredItems = portfolioItems.filter(
        (item) => item.category === activeCategory
    );

    return (
        /* Added 'relative' and 'overflow-hidden' to ensure absolute element positions correctly */
        <div className="relative min-h-screen bg-white text-black font-sans py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* Background Watermark / Large Text */}
            <span className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-0 select-none text-7xl sm:text-8xl md:text-9xl lg:text-[150px] font-black uppercase tracking-widest text-slate-900/[0.04] whitespace-nowrap">
                portfolio
            </span>

            <section className="relative z-10 max-w-7xl mx-auto">

                {/* Header Area with Reveal Animation */}
                <div className="text-center mb-10">
                    <Reveal from={0.8} delay={100}>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight portfolio-heading">
                            Our Portfolio
                        </h2>
                    </Reveal>
                </div>

                {/* Category Filter Navigation */}
                <div className="flex items-center justify-center mb-10 overflow-x-auto pb-3 no-scrollbar">
                    <nav className="flex space-x-6 sm:space-x-10 border-b border-slate-100 px-4 min-w-max">
                        {CATEGORIES.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`relative pb-3 text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive
                                            ? 'text-emerald-600'
                                            : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                >
                                    {category}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full transition-all duration-300" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Portfolio Grid with Staggered Animations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {filteredItems.map((item, index) => (
                        <Reveal key={item.id} from={0.85} delay={100 + index * 80}>
                            <div
                                onClick={() => {
                                    setActiveItem(item);
                                    setIsZoomed(false);
                                }}
                                className="group relative bg-slate-50 rounded-xl overflow-hidden border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer h-52 flex flex-col items-center justify-center p-2"
                            >
                                {/* Item Image Render */}
                                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>

                                {/* Hover Overlay with Zoom Icon */}
                                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 mb-2">
                                        <ZoomIn className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-white font-bold text-sm leading-tight line-clamp-1">{item.title}</h4>
                                    <p className="text-emerald-300 text-xs mt-0.5">{item.sub}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Empty state fallback */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-16">
                        <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-medium">No items found in {activeCategory} category.</p>
                    </div>
                )}

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <button className="inline-flex items-center space-x-1.5 text-emerald-600 hover:text-emerald-700 font-bold tracking-widest text-xs sm:text-sm uppercase transition-all duration-200 group border-b-2 border-emerald-600/30 hover:border-emerald-600 pb-0.5">
                        <span>VIEW ALL</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* Lightbox Modal with Framer Motion Animation */}
            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {activeItem && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="fixed inset-0 z-[9999] flex flex-col select-none font-sans"
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
                                        onClick={() => {
                                            if (navigator.clipboard) {
                                                navigator.clipboard.writeText(window.location.href);
                                                alert("Link copied to clipboard!");
                                            }
                                        }}
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
                                        <X className="w-6 h-6" />
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
                                        className="flex items-center justify-center overflow-hidden rounded-lg bg-white shadow-2xl p-2"
                                        style={{
                                            maxHeight: "80vh",
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
                                                maxHeight: "75vh",
                                                maxWidth: "100%",
                                                width: "auto",
                                                height: "auto",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Footer Info */}
                                <div className="relative z-20 py-3 text-center">
                                    <span className="text-sm font-semibold tracking-wider text-white/90">
                                        {activeItem.title}{" "}
                                        <span className="text-emerald-400">{activeItem.sub}</span>
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </div>
    );
}