"use client";

import { useEffect, useRef } from "react";

const ServicesPackagesSection = () => {
    const sectionRef = useRef(null);
    const rocketWrapRef = useRef(null);
    const rocketRef = useRef(null);
    const rafRef = useRef(0);

    const update = () => {
        rafRef.current = 0;
        const section = sectionRef.current;
        const wrap = rocketWrapRef.current;
        const rocket = rocketRef.current;
        if (!section || !wrap || !rocket) return;

        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;

        const raw = (vh * 0.7 - rect.top) / (vh * 0.6);
        const p = Math.min(1, Math.max(0, raw));

        const sW = section.clientWidth;
        const sH = section.clientHeight;
        const rW = wrap.offsetWidth;
        const rH = wrap.offsetHeight;

        const startX = -rW * 0.35;
        const startY = sH - rH * 0.7;
        const endX = Math.min(sW * 0.6, sW - rW * 0.95);
        const endY = 8;

        const x = startX + (endX - startX) * p;
        const y = startY + (endY - startY) * p;

        const rotate = -30 + p * 30;

        rocket.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
    };

    const schedule = () => {
        if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };

    useEffect(() => {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        update();
        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-white text-black pt-8 pb-20 px-6 sm:px-10 overflow-hidden"
        >
            {/* Diagonal dark lines */}
            <div className="absolute right-[12%] top-0 bottom-0 pointer-events-none hidden lg:flex items-center">
                <img
                    src="https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/08/package-bg-object-1.png"
                    alt=""
                    className="w-[480px] max-w-none"
                />
            </div>

            {/* Watermark "packages." */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none">
                <span
                    className="whitespace-nowrap font-black uppercase leading-none tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-slate-900/[0.06] to-slate-900/0"
                    style={{ fontSize: "clamp(64px, 14vw, 190px)" }}
                >
                    packages.
                </span>
            </div>

            {/* Rocket */}
            <div
                ref={rocketWrapRef}
                className="pointer-events-none absolute left-0 top-0 z-20 w-48 sm:w-72 md:w-80"
            >
                <div ref={rocketRef} style={{ willChange: "transform" }}>
                    <img
                        src="/images/rocket-no-bg.png"
                        alt="3D Rocket"
                        onLoad={schedule}
                        className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                </div>
            </div>

            {/* Main Container Wrapper */}
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="relative">
                    <p
                        className="ml-24 sm:ml-[120px] mb-1 text-lg sm:text-[22px] font-normal !text-black"
                        style={{
                            color: "#000000",
                            WebkitTextFillColor: "#000000",
                            background: "none",
                            backgroundClip: "unset",
                        }}
                    >
                        how much does it cost
                    </p>

                    <h2
                        className="mb-5 text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold tracking-tight leading-[1.1] !text-black"
                        style={{
                            color: "#000000",
                            WebkitTextFillColor: "#000000",
                            background: "none",
                            backgroundImage: "none",
                            backgroundClip: "unset",
                        }}
                    >
                        Services packages.
                    </h2>

                    <p
                        className="max-w-[860px] text-base sm:text-[22px] leading-relaxed !text-black"
                        style={{
                            color: "#000000",
                            WebkitTextFillColor: "#000000",
                            background: "none",
                        }}
                    >
                        We've got a lot of awards for our products and services that became
                        popular in the world.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ServicesPackagesSection;
