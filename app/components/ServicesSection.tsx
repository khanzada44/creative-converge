"use client";

import React, { useEffect, useRef, useState } from "react";

const icon = (d: string) => (
  <svg
    className="w-12 h-12 stroke-[1.5] text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const servicesData = [
  {
    id: 1,
    title: "LOGO DESIGN SOLUTIONS",
    icon: icon(
      "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    ),
    link: "#logo-design",
  },
  {
    id: 2,
    title: "WEB DESIGN SOLUTIONS",
    icon: icon(
      "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    ),
    link: "#web-design",
  },
  {
    id: 3,
    title: "ILLUSTRATION DESIGN",
    icon: icon(
      "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    ),
    link: "#illustration",
  },
  {
    id: 4,
    title: "BRANDING",
    icon: icon(
      "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
    ),
    link: "#branding",
  },
  {
    id: 5,
    title: "ADVANCE COMBO PACKAGES",
    icon: icon("M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"),
    link: "#combo",
  },
  {
    id: 6,
    title: "DIGITAL MARKETING",
    icon: icon("M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"),
    link: "#digital-marketing",
  },
  {
    id: 7,
    title: "MOBILE APPS",
    icon: icon(
      "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    ),
    link: "#mobile-apps",
  },
  {
    id: 8,
    title: "VIDEO ANIMATIONS",
    icon: icon(
      "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    ),
    link: "#video-animations",
  },
];

const BG_OBJECT =
  "https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/bg-object.png";

// Parallax settings (tweak these)
const PARALLAX_SPEED = 0.25; // bigger = zyada move karega
const PARALLAX_MAX = 120; // max px upar/neeche

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Reveal on first view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Parallax: scroll down => boxes neeche, scroll up => boxes upar
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let ticking = false;

    const update = () => {
      const section = sectionRef.current;
      const target = parallaxRef.current;
      if (!section || !target) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Sirf tab calculate karo jab section screen ke aas paas ho
      if (rect.bottom > -200 && rect.top < vh + 200) {
        // section ki center position screen ke center se kitni door hai
        const sectionCenter = rect.top + rect.height / 2;
        const distance = sectionCenter - vh / 2; // scroll down => ghatta hai
        let offset = -distance * PARALLAX_SPEED;
        offset = Math.max(-PARALLAX_MAX, Math.min(PARALLAX_MAX, offset));
        target.style.transform = `translate3d(0, ${offset}px, 0)`;

        // Video jesa effect:
        // upar jate waqt (offset < 0) cards gehre/kaale hote hain,
        // neeche aate waqt (offset > 0) halke aur faded hote hain.
        const t = offset / PARALLAX_MAX; // -1 .. 1
        const up = Math.max(-t, 0);
        const down = Math.max(t, 0);
        target.style.setProperty("--card-a", String(0.45 + 0.5 * up - 0.15 * down));
        target.style.setProperty("--card-o", String(1 - 0.45 * down));
      }
      ticking = false;
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

  // Sirf horizontal gesture (shift + wheel / trackpad) se slider chale.
  // Normal vertical scroll page ko hi scroll karega (taake parallax chale).
  const handleWheelScroll = (e: React.WheelEvent) => {
    if (sliderRef.current && e.shiftKey && e.deltaY !== 0) {
      sliderRef.current.scrollLeft += e.deltaY * 2;
    }
  };

  const scrollLeftBtn = () =>
    sliderRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRightBtn = () =>
    sliderRef.current?.scrollBy({ left: 350, behavior: "smooth" });

return (
  <section
    ref={sectionRef}
    className="relative w-full bg-[#227a4d] text-white py-24 px-6 lg:px-16 overflow-hidden"
  >
    {/* Background object image (top right, natural size) */}
    <img
      src={BG_OBJECT}
      alt=""
      aria-hidden="true"
      className="absolute top-0 right-0 w-[320px] md:w-[460px] lg:w-[580px] max-w-[60%] h-auto pointer-events-none select-none z-0"
    />

    <div className="max-w-7xl mx-auto w-full relative z-10">
      
      {/* Header Area */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between mb-16">
        
        {/* Background Large Watermark Text */}
        <span className="pointer-events-none absolute -top-10 left-0 z-0 select-none text-7xl font-extrabold uppercase tracking-widest text-white/[0.05] sm:text-8xl md:-top-16 lg:text-[140px]">
          SERVICES
        </span>

        {/* Foreground Content */}
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-12 h-[2px] bg-white inline-block"></span>
            <span className="text-xs uppercase tracking-widest text-white/90 font-semibold">
              our services
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-4">
            We do everything
          </h2>

          <p className="text-white/90 text-base lg:text-lg max-w-xl leading-relaxed">
            You may be interested in what we can offer you. More services you
            can find below. We do everything at a high level.
          </p>
        </div>

        {/* Slider Navigation Buttons */}
        <div className="relative z-10 flex items-center gap-6 mt-6 md:mt-0 md:mr-2">
          <button
            type="button"
            onClick={scrollLeftBtn}
            aria-label="Previous slide"
            className="flex h-12 w-12 items-center justify-center bg-transparent text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5 fill-current"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={scrollRightBtn}
            aria-label="Next slide"
            className="flex h-12 w-12 items-center justify-center bg-transparent text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5 fill-current"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Parallax wrapper: scroll ke hisaab se upar/neeche move hota hai */}
      <div
        ref={parallaxRef}
        className="will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {/* Slider with reveal animation */}
        <div
          ref={sliderRef}
          onWheel={handleWheelScroll}
          className={`flex gap-[13px] mb-20 lg:-mx-8 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none transform ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-24"
          }`}
          style={{ transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="group relative rounded-none p-8 flex flex-col items-center justify-center text-center min-w-[260px] sm:min-w-[300px] lg:min-w-0 lg:basis-[calc((100%-39px)/4)] min-h-[340px] snap-start shrink-0 grow-0"
              style={{
                backgroundColor: "rgba(0,0,0,var(--card-a,0.45))",
                opacity: "var(--card-o,1)",
              }}
            >
              <div className="mb-6 p-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h3 className="text-lg font-semibold tracking-wide mb-6 text-white/85 min-h-[56px] flex items-center justify-center">
                {service.title}
              </h3>
              <a
                href={service.link}
                className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-[#2f9a62] hover:text-white transition-colors"
              >
                READ MORE
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Marquee at bottom */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none z-0 opacity-25">
      <div className="flex w-max animate-marquee">
        <img
          src="https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/WEBS-DESIGN-USA.png"
          alt="Webs Design USA Banner"
          className="h-20 lg:h-32 object-contain mx-4"
        />
        <img
          src="https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/WEBS-DESIGN-USA.png"
          alt="Webs Design USA Banner"
          className="h-20 lg:h-32 object-contain mx-4"
        />
      </div>
    </div>

    <style jsx>{`
      @keyframes marquee {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      .animate-marquee {
        display: flex;
        width: max-content;
        animation: marquee 20s linear infinite;
      }
      .scrollbar-none::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
  </section>
);
}