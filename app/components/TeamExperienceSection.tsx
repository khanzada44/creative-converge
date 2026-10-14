"use client";

import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Settings (video se naape hue, tweak kar sakte ho)                  */
/* ------------------------------------------------------------------ */
const SKATER_SRC = "/team-skater.png"; // image ko apne project ke /public folder ma rakho
const SKATER_X = 0.18; // scroll ke saath skater kitna right/left khisakta hai
const SKATER_Y = 0.09; // scroll ke saath skater kitna upar/neeche khisakta hai
const CIRCLE_SLIDE = 160; // px: circle side se kitni door se slide hokar aata hai

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

// Element screen ma aaye to true, bahar jaye to false (video ma animation dobara chalti hai)
function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

type RevealProps = {
  children: React.ReactNode;
  from?: number; // shuru ka scale (0.3 = bohot chhota, 0.85 = halka)
  delay?: number; // ms
  className?: string;
};

// Fade + zoom-in reveal. Wrapper observe hota hai, andar wala scale hota hai.
function Reveal({
  children,
  from = 0.85,
  delay = 0,
  className = "",
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
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

// Counter: circle screen ma aaye to 0 se count hota hai, bahar jaye to 0 par reset
function CountUp({
  to,
  active,
  duration = 1600,
}: {
  to: number;
  active: boolean;
  duration?: number;
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
    const tick = (now: number) => {
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

// from="left"  => circle left side se slide hokar aata hai (video ma "9 Years" circle aisa hai)
// from="right" => right side se, from="none" => sirf fade-in
function StatCircle({
  to,
  label,
  from = "none",
}: {
  to: number;
  label: string;
  from?: "left" | "right" | "none";
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
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
        <span className="text-sm lg:text-base text-white">{label}</span>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-3 mb-3">
      <span className="w-12 h-[1px] bg-white/80 inline-block"></span>
      <span className="text-xs tracking-wide text-white">{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                            */
/* ------------------------------------------------------------------ */
export default function TeamExperienceSection() {
  const row2Ref = useRef<HTMLDivElement>(null);
  const skaterRef = useRef<HTMLImageElement>(null);

  // Skater parallax: scroll ke saath thoda right/upar jata hai (video se naapa hua)
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
      // s > 0: row screen ke beech se upar nikal gayi (neeche scroll kiya)
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

return (
  <section className="relative w-full bg-[linear-gradient(135deg,#0B1F2A_0%,#00A8A8_50%,#18D0C8_75%,#00F2FE_100%)] text-white py-18 px-4 lg:px-18 overflow-hidden">
    <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-24">
      {/* ROW 1: text left, 15 Awards circle right */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Background Large Watermark Text */}
        <span className="pointer-events-none absolute -top-8 left-0 z-0 select-none text-7xl font-extrabold uppercase tracking-widest text-white/[0.05] sm:text-8xl md:-top-12 lg:text-[130px]">
          ABOUT US
        </span>

        {/* Text Content (Foreground) */}
        <div className="relative z-10 flex flex-col items-start max-w-[560px]">
          <Reveal from={0.9}>
            <Label>About us</Label>

            <h2 className="text-4xl lg:text-6xl font-[Poppins,sans-serif] tracking-tight mb-6 leading-tight">
              We are creative &amp; strong team
            </h2>
          </Reveal>

          <Reveal from={0.4} delay={150}>
            <p className="text-white text-sm lg:text-base leading-relaxed mb-4">
              Our creative and professional agency has been developing
              products for 15 years. We are special.
            </p>
          </Reveal>

          <Reveal from={0.4} delay={300}>
            <p className="text-white/80 text-sm lg:text-base leading-relaxed">
              We’ve got a lot of awards for our work and develop applications
              that became popular in the world. We try not to miss important
              details in each area.
            </p>
          </Reveal>
        </div>

        {/* Stat Circle Right */}
        <div className="relative z-10 flex justify-center">
          <StatCircle to={15} label="Awards Winning" />
        </div>
      </div>

      {/* ROW 2: 9 Years circle + skater left, working day text right */}
      <div
        ref={row2Ref}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
          <StatCircle to={9} label="Years Experience" from="left" />
          <img
            ref={skaterRef}
            src={SKATER_SRC}
            alt=""
            aria-hidden="true"
            className="w-40 sm:w-56 lg:w-[290px] h-auto pointer-events-none select-none will-change-transform"
          />
        </div>

        <div className="flex flex-col items-start max-w-[560px]">
          <Reveal from={0.9}>
            <h3 className="text-2xl lg:text-4xl   tracking-tight mb-6">
              How our working day starts
            </h3>
          </Reveal>

          <Reveal from={0.4} delay={150}>
            <p className="text-white text-sm lg:text-base leading-relaxed mb-4">
              A typical day at a web design company begins with a team huddle
              to align on priorities and check emails or messages. The team
              then focuses on client communication, planning, and
              brainstorming for current projects.
            </p>
          </Reveal>

          <Reveal from={0.4} delay={300}>
            <p className="text-white/80 text-sm lg:text-base leading-relaxed">
              Designers work on wireframes and visual designs, while
              developers focus on coding and website functionality. Throughout
              the day, there are client calls, feedback sessions, and internal
              reviews to ensure the project is on track. The day wraps up with
              a brief debrief meeting, preparing deliverables, and setting up
              tasks for the next day.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ROW 3: Individual approach text left, 354 Projects circle right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start max-w-[560px]">
          <Reveal from={0.9}>
            <h3 className="text-2xl lg:text-4xl   tracking-tight mb-6">
              Individual approach
            </h3>
          </Reveal>

          <Reveal from={0.4} delay={150}>
            <p className="text-white text-sm lg:text-base leading-relaxed mb-4">
              As a web design company, our individual approach is centered
              around creativity, collaboration, and client satisfaction. We
              take the time to understand each client’s unique needs, goals,
              and brand identity, ensuring that our designs are tailored
              specifically for them.
            </p>
          </Reveal>

          <Reveal from={0.4} delay={300}>
            <p className="text-white/80 text-sm lg:text-base leading-relaxed">
              Our process is highly collaborative, involving regular
              communication with clients to gather feedback and refine our
              work. We prioritize user experience (UX) and responsive design
              to ensure that websites are not only visually appealing but also
              intuitive and accessible across all devices.
            </p>
          </Reveal>
        </div>

        <div className="flex justify-center">
          <StatCircle to={354} label="Successful Projects" />
        </div>
      </div>
    </div>
  </section>
);
}
