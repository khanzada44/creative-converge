"use client";

import { useEffect, useState } from "react";

const ServicesPackagesSection = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section className="relative w-full bg-white text-black py-10 px-6 sm:px-12 lg:px-10 overflow-hidden">

            {/* Background Decorative Diagonal Lines */}
            <div className="absolute right-12 top-0 bottom-0 pointer-events-none opacity-30 hidden lg:flex space-x-16 items-center">
                <img src="https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/08/package-bg-object-1.png" alt=""
                    className="w-106"
                />
            </div>
            <span className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-0 select-none text-7xl sm:text-8xl md:text-9xl lg:text-[150px] font-black uppercase tracking-widest text-slate-900/[0.04] whitespace-nowrap">
                packages.
            </span>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Content Container */}
                <div className="relative max-w-2xl pt-8">


                    <div
                        className="absolute -top-16 -left-12 sm:-left-20 pointer-events-none z-20"
                        style={{
                            transform: `translate3d(0, ${Math.min(scrollY * 0.08, 120)}px, 0)`,
                            willChange: "transform",
                        }}
                    >
                        <img
                            src="https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/08/rocket-contact.png"
                            alt="3D Rocket"
                            className="w-36 sm:w-48 md:w-56 h-auto object-contain -rotate-12 drop-shadow-2xl"
                        />
                    </div>


                    {/* Small Subtitle */}
                    <p className="text-xs sm:text-sm font-semibold tracking-wider portfolio-heading uppercase mb-3">
                        how much does it cost
                    </p>

                    {/* Main Title */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight portfolio-heading mb-6 leading-tight">
                        Services packages.
                    </h2>

                    {/* Description */}
                    <p className="portfolio-heading text-sm sm:text-base leading-relaxed max-w-lg">
                        We've got a lot of awards for our products and services that became popular in the world.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default ServicesPackagesSection;