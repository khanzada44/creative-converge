"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Settings & Helpers                                                 */
/* ------------------------------------------------------------------ */
const SKATER_SRC = "/team-skater.png";
const SKATER_X = 0.18;
const SKATER_Y = 0.09;
const CIRCLE_SLIDE = 160;

// Fast & Smooth Scroll Reveal Component with Directional Support
function Reveal({
    children,
    from = 0.85,
    delay = 0,
    className = "",
    slideDirection = "none",
}) {
    const ref = useRef(null);
    const inView = useInView(ref, {
        once: true,
        margin: "-50px",
    });

    let initialTransform = `scale(${from})`;
    if (slideDirection === "left") {
        initialTransform = "translateX(-60px)";
    } else if (slideDirection === "right") {
        initialTransform = "translateX(60px)";
    }

    return (
        <div ref={ref} className={className}>
            <div
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView
                        ? "translateX(0) scale(1)"
                        : initialTransform,
                    transition: inView
                        ? `opacity 0.5s ease-out ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
                        : "none",
                    transformOrigin: "center",
                }}
            >
                {children}
            </div>
        </div>
    );
}

// Counter: circle screen ma aaye to 0 se count hota hai
function CountUp({
    to,
    active,
    duration = 1600,
}) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!active) {
            setValue(0);
            return;
        }
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduce) {
            setValue(to);
            return;
        }
        let raf = 0;
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(to * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, to, duration]);

    return <>{value}</>;
}

function StatCircle({
    to,
    label,
    from = "none",
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const hiddenX =
        from === "left" ? -CIRCLE_SLIDE : from === "right" ? CIRCLE_SLIDE : 0;

    return (
        <div ref={ref} className="shrink-0">
            <div
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-white/70 flex flex-col items-center justify-center text-center p-6"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView
                        ? "translate3d(0, 0, 0)"
                        : `translate3d(${hiddenX}px, 0, 0)`,
                    transition: inView
                        ? "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)"
                        : "none",
                }}
            >
                <span className="text-6xl lg:text-7xl font-light tracking-tight mb-2">
                    <CountUp to={to} active={inView} />
                </span>
                <span className="text-sm lg:text-base text-white/90">{label}</span>
            </div>
        </div>
    );
}

function Label({ children }) {
    return (
        <div className="flex items-center space-x-3 mb-3">
            <span className="w-12 h-[1px] bg-white/80 inline-block"></span>
            <span className="text-xs tracking-wide text-white/90">{children}</span>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Main Component Combined                                            */
/* ------------------------------------------------------------------ */
export default function TeamExperienceSection() {
    const row2Ref = useRef(null);
    const skaterRef = useRef(null);

    // Skater parallax effect
    useEffect(() => {
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduce) return;
        let ticking = false;

        const update = () => {
            ticking = false;
            const row = row2Ref.current;
            const skater = skaterRef.current;
            if (!row || !skater) return;

            const rect = row.getBoundingClientRect();
            const vh = window.innerHeight;
            let s = vh / 2 - (rect.top + rect.height / 2);
            s = Math.max(-vh, Math.min(vh, s));

            skater.style.transform = `translate3d(${s * SKATER_X}px, ${-s * SKATER_Y}px, 0)`;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    const features = [
        {
            id: 1,
            title: "Reliability",
            description: "We built on consistent delivery of high-quality work, meeting deadlines, and providing excellent customer support.",
            icon: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/play.png",
        },
        {
            id: 2,
            title: "Expertise",
            description: "Our team is skilled in UI/UX design, frontend and backend development, and responsive design, ensuring that every project is visually appealing, functional, and user-friendly.",
            icon: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/play.png",
        },
        {
            id: 3,
            title: "Reliability",
            description: "We built on consistent delivery of high-quality work, meeting deadlines, and providing excellent customer support.",
            icon: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/Icon3.png",
        },
        {
            id: 4,
            title: "Expertise",
            description: "Our team is skilled in UI/UX design, frontend and backend development, and responsive design, ensuring that every project is visually appealing, functional, and user-friendly.",
            icon: "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/Icon4.png",
        },
    ];

    return (
        <section className="relative w-full bg-[#349758] text-white py-10 px-2 lg:px-10 overflow-hidden">
            <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-14">
                <Reveal delay={50}>
                    <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-emerald-200">
                        Innovate
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2 max-w-2xl leading-tight">
                        Unlock Your Business's Full Potential with Us
                    </h2>
                </Reveal>
                {/* ROW 3: Individual approach & Features Section with Directional Animations */}


                {/* Features Grid with 1st Left & 4th Right Slide Animation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        let slideDir = "none";
                        if (index === 0) slideDir = "left";
                        if (index === 3) slideDir = "right";

                        return (
                            <Reveal
                                key={feature.id}
                                slideDirection={slideDir}
                                delay={index * 60}
                                className="h-full"
                            >
                                <div className="flex flex-col justify-between h-full  p-6  transition-all">
                                    <div>
                                        <div className="mb-4">
                                            <img
                                                src={feature.icon}
                                                alt={feature.title}
                                                className="w-12 h-12 object-contain"
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                                            {feature.description}
                                        </p>
                                    </div>

                                    <div>
                                        <a
                                            href="#learn-more"
                                            className="inline-flex items-center space-x-2 text-sm font-semibold text-white hover:text-emerald-200 transition-colors group"
                                        >
                                            <span className="w-6 h-6 rounded-full bg-white text-[#349758] flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                            <span>Learn More</span>
                                        </a>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>


        </section>
    );
}