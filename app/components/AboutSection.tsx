"use client";

import React, { useEffect, useRef, useState } from "react";

// ---- Rocket settings (video se naape hue, tweak kar sakte ho) ----
// Section ka end screen ke bottom se jitna door ho, rocket utna hi
// (right + thoda upar) khisakta hai, aur ek limit par ruk jata hai.
const ROCKET_MAX_X = 150; // px: max kitna right ki taraf
const ROCKET_MAX_Y = 105; // px: max kitna upar
const ROCKET_RANGE = 0.36; // screen height ka kitna scroll lagta hai max tak pohanchne ma

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);

  // Text zoom-in: jab text screen ma aaye tab ek dafa chalta hai
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShowText(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowText(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Rocket: scroll ke saath move
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    const update = () => {
      ticking = false;
      const section = sectionRef.current;
      const rocket = rocketRef.current;
      if (!section || !rocket) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // d = section ka end screen ke bottom se kitna neeche hai (0 ya kam => rocket apni jagah)
      const d = Math.max(0, rect.bottom - vh);
      const p = reduce ? 0 : Math.min(1, d / (vh * ROCKET_RANGE));

      const x = ROCKET_MAX_X * p; // right ki taraf
      const y = -ROCKET_MAX_Y * (1 - (1 - p) * (1 - p)); // upar (ease-out)

      rocket.style.transform = `translate3d(${x}px, ${y}px, 0)`;
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

return (
  <>
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#12161f]"
    >
      {/* Left Side: Background Image / Dashboard Graphic */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto min-h-[400px]">
        <img
          src="https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/Group-691314592-1.jpg"
          alt="Digital Solution Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Right Side: Dark Area with Text & Animated Rocket */}
      <div className="relative w-full lg:w-1/2 bg-[#161b22] text-white flex items-center px-8 lg:px-16 py-16 overflow-hidden">
        
        {/* Background Watermark Text */}
        <span className="pointer-events-none absolute -top-6 left-4 lg:left-10 z-0 select-none text-7xl font-extrabold uppercase tracking-widest text-white/[0.03] sm:text-8xl md:-top-10 lg:text-[130px]">
          ABOUT
        </span>

        {/* Text Content (Foreground) */}
        <div ref={textRef} className="relative z-10 max-w-xl">
          {/* Label: hamesha dikhta hai */}
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-10 h-[2px] bg-white inline-block"></span>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              about us
            </span>
          </div>

          {/* Heading: fade + halka zoom */}
          <h2
            className={`text-3xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight ${
              showText ? "zoom-heading" : "opacity-0"
            }`}
          >
            We are Experts in{" "}
            <span className="text-white">Digital Solution</span>
          </h2>

          {/* Paragraph 1: zoom in */}
          <p
            className={`text-gray-300 text-sm lg:text-base leading-relaxed mb-4 ${
              showText ? "zoom-in zoom-delay-1" : "opacity-0"
            }`}
          >
            At <strong className="text-white">WEBS DESIGN USA</strong>, we are
            passionate about crafting visually stunning and high-performing
            websites through innovative designers, skilled developers, and
            strategic marketers, we transform ideas into digital realities.
          </p>

          {/* Paragraph 2: zoom in, thori der baad */}
          <p
            className={`text-gray-400 text-sm lg:text-base leading-relaxed mb-8 ${
              showText ? "zoom-in zoom-delay-2" : "opacity-0"
            }`}
          >
            Our expertise spans across responsive web design, e-commerce
            development, and user experience, we pride ourselves on creating
            websites that not only look great but also rank higher on search
            engines, driving organic traffic.
          </p>

          {/* Read more */}
          <div>
            <a
              href="#read-more"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-semibold text-sm tracking-wider uppercase transition-colors"
            >
              READ MORE &gt;
            </a>
          </div>
        </div>

        {/* Rocket */}
        <div
          ref={rocketRef}
          className="absolute bottom-14 -right-12 w-64 lg:w-[420px] pointer-events-none z-30 will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <img
            src="https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/08/rocket-contact.png"
            alt="Rocket Graphic"
            className="block w-full h-auto object-contain"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }
        @keyframes zoomHeading {
          0% {
            opacity: 0;
            transform: scale3d(0.85, 0.85, 0.85);
          }
          100% {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }
        .zoom-in {
          opacity: 0;
          transform-origin: center;
          animation: zoomIn 1s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .zoom-heading {
          opacity: 0;
          transform-origin: left center;
          animation: zoomHeading 0.9s ease-out forwards;
        }
        .zoom-delay-1 {
          animation-delay: 0.25s;
        }
        .zoom-delay-2 {
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  </>
);
}