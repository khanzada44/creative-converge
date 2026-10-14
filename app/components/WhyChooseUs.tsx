"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";

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

/* Number counts up from 0 when the card scrolls into view */
function Counter({ to }: { to: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{n}</span>;
}

/* Stat card with solid #00A8A8 background, shadow, no border, no radius */
function StatCard({
  motionStyle,
  value,
  label,
  index,
}: {
  motionStyle: MotionStyle;
  value: number;
  label: string;
  index: number;
}) {
  return (
    <motion.div style={motionStyle} className="relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.8,
          delay: index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -8, scale: 1.03 }}
        className="group relative flex h-[180px] w-full cursor-default flex-col items-center justify-center overflow-hidden rounded-none border-0 bg-[linear-gradient(135deg,#0B1F2A_0%,#00A8A8_50%,#18D0C8_75%,#00F2FE_100%)] text-center text-white shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-shadow duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.6)] sm:h-[210px] lg:h-[240px]"
      >
        <div className="relative text-5xl   tracking-tight sm:text-[60px]">
          <Counter to={value} />
        </div>

        {/* accent line */}
        <span className="relative mt-3 block h-[2px] w-10 rounded-full bg-white/70 transition-all duration-500 group-hover:w-20" />

        <div className="relative mt-3 text-base font-normal tracking-wide text-white/90 sm:text-lg">
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Spring-smoothed progress => buttery, not jittery
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.5,
  });

  // Only run the parallax on wide screens (single column on mobile)
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const f = () => setWide(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  // Cards start scattered and SETTLE into the final tidy layout
  const R = 45; // final drop of the right column
  const stops = [0, 0.45, 1];
  const card1X = useTransform(smooth, stops, wide ? [120, 0, 0] : [0, 0, 0]); 
  const card2Y = useTransform(smooth, stops, wide ? [-140, R, R] : [0, 0, 0]); 
  const card3X = useTransform(smooth, stops, wide ? [220, 0, 0] : [0, 0, 0]); 
  const card4Y = useTransform(smooth, stops, wide ? [150, R, R] : [0, 0, 0]); 

  return (

<section
  ref={containerRef}
  className="relative overflow-hidden bg-[linear-gradient(135deg,#0B1F2A_0%,#00A8A8_50%,#18D0C8_75%,#00F2FE_100%)] px-6 py-20 font-['Poppins',sans-serif] text-white sm:px-10 lg:px-[100px] lg:py-[130px]"
>
      {/* Outlined "USA" background graphic with blend mode to avoid harsh overlapping shades */}
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

      <span className="pointer-events-none absolute -top-6 left-0 z-0 select-none text-7xl font-extrabold uppercase tracking-widest text-white/[0.04] sm:text-8xl md:-top-10 lg:text-[130px] mt-10">
        CHOOSE
      </span>

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

      <div className="relative z-10 mx-auto grid w-full max-w-[1750px] grid-cols-1 items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-[56px]">
        
        {/* LEFT: stat cards */}
        <div className="relative lg:pr-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-9">
            <StatCard index={0} motionStyle={{ x: card1X }} value={235} label="Satisfied Clients" />
            <StatCard index={1} motionStyle={{ y: card2Y }} value={15} label="Awards Winning" />
            <StatCard index={2} motionStyle={{ x: card3X }} value={235} label="Satisfied Clients" />
            <StatCard index={3} motionStyle={{ y: card4Y }} value={354} label="Successful Projects" />
          </div>

          {/* Diagonal line decoration above cards with blend mode */}
          <div className="pointer-events-none absolute -top-16 left-4 z-20 hidden opacity-40 mix-blend-overlay sm:block">
            <Image
              src="https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/choose.png"
              alt=""
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>

        {/* RIGHT: content with Reveal animations */}
        <div className="relative flex flex-col justify-center overflow-hidden">
          
          {/* Subtitle */}
          <Reveal from={0.8} delay={100}>
            <div className="relative z-10 flex items-center gap-3">
              <span className="inline-block h-[2px] w-12 bg-white" />
              <span className="text-sm font-normal">a few words</span>
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal from={0.185} delay={200}>
            <h2 className="relative z-10 mt-2 text-5xl   leading-tight tracking-tight sm:text-6xl lg:text-[72px]">
              Why choose us
            </h2>
          </Reveal>

          {/* Description */}
          <Reveal from={0.129} delay={300}>
            <p className="relative z-10 mt-3 max-w-[760px] text-base font-normal leading-relaxed sm:text-lg text-white">
              We’ve got a lot of awards for our products and services that became
              popular in the world.
            </p>
          </Reveal>

          {/* Feature 1 */}
          <Reveal from={0.119} delay={400}>
            <div className="relative z-10 mt-10 pl-0 sm:pl-12">
              <h3 className="text-xl font-medium sm:text-2xl">
                Modern Technologies
              </h3>
              <p className="mt-3 text-sm font-light leading-[1.7] sm:text-[15px] text-white">
                As a web design company, we utilize a range of modern technologies
                to create dynamic, responsive websites. We use design tools like
                Figma, Adobe XD, and Sketch for collaborative, high-quality design
                work. For frontend development, we rely on HTML5, CSS3,
                JavaScript, and frameworks like React.js and Vue.js. On the
                backend, we work with technologies such as Node.js, PHP, and
                Python
              </p>
            </div>
          </Reveal>

          {/* Feature 2 */}
          <Reveal from={0.110} delay={800}>
            <div className="relative z-10 mt-8 pl-0 sm:pl-12">
              <h3 className="text-xl font-medium sm:text-2xl">
                Huge Digital Experience
              </h3>
              <p className="mt-3 text-sm font-light leading-[1.7] sm:text-[15px] text-white">
                Our company has been developing digital products for 15 years.
                We’ve got a lot of awards for our work.
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}