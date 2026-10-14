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
    icon: 'https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/icon-branding.png',
    link: "#logo-design",
  },
  {
    id: 2,
    title: "WEB DESIGN SOLUTIONS",
    icon: 'https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/icon-app.png',
    link: "#web-design",
  },
  {
    id: 3,
    title: "ILLUSTRATION DESIGN",
    icon: 'https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/icon-branding.png',
    link: "#illustration",
  },
  {
    id: 4,
    title: "BRANDING",
    icon: `https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/icon-branding.png`,
    link: "#branding",
  },
  {
    id: 5,
    title: "ADVANCE COMBO PACKAGES",
    icon: `https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/icon-branding.png`,
    link: "#combo",
  },
  {
    id: 6,
    title: "DIGITAL MARKETING",
    icon: `https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/icon-branding.png`,
    link: "#digital-marketing",
  },
  {
    id: 7,
    title: "MOBILE APPS",
    icon: `https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/icon-branding.png`,
    link: "#mobile-apps",
  },
  {
    id: 8,
    title: "VIDEO ANIMATIONS",
    icon: `https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/icon-branding.png`,
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
      className="relative w-full bg-[linear-gradient(135deg,#0B1F2A_0%,#00A8A8_50%,#18D0C8_75%,#00F2FE_100%)] text-white py-24 px-6 lg:px-16 overflow-hidden"
    >
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
              <span className="text-xs uppercase tracking-widest text-white  ">
                our services
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-4">
              We do everything
            </h2>

            <p className="text-white text-base lg:text-lg max-w-xl leading-relaxed">
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
            className={`flex gap-[13px] mb-20 lg:-mx-8 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none transform ${isVisible
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
                <div className="mb-6 p-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <img
                    src={`${service.icon}`}
                    alt={service.title}
                    className="transition-all duration-300"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(52%) sepia(87%) saturate(600%) hue-rotate(135deg) brightness(95%) contrast(95%)",
                    }}
                  />
                </div>
                <h3 className="text-lg   tracking-wide mb-6 text-white min-h-[56px] flex items-center justify-center">
                  {service.title}
                </h3>
                <a
                  href={service.link}
                  className="inline-flex items-center text-xs   tracking-widest uppercase text-[#fcfcfc] hover:text-white transition-colors"
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