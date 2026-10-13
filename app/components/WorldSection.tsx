"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BRAND_GREEN = "#349758";

const accordionData = [
  {
    id: 1,
    title: "Analyzing Research",
    content:
      "Analyzing research refers to the process of carefully examining and interpreting the data or information gathered through research to draw meaningful conclusions, identify patterns, and generate insights.",
  },
  {
    id: 2,
    title: "Integrated Learning",
    content:
      "Integrated learning refers to an educational approach that connects different subjects, disciplines, or areas of knowledge to provide a more holistic and interconnected learning experience.",
  },
  {
    id: 3,
    title: "Considering Innovation",
    content:
      "Considering innovation refers to the process of evaluating, thinking about, or exploring new ideas, methods, technologies, or approaches that can lead to improvements or advancements in a particular area or field.",
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

// Plus / minus icon (patla, bina circle ke)
function Icon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M2 8h12" />
      <path
        d="M8 2v12"
        style={{
          transformOrigin: "center",
          transform: open ? "scaleY(0)" : "scaleY(1)",
          transition: "transform 0.3s ease",
        }}
      />
    </svg>
  );
}

export default function WorldSection() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(2);

  const toggleAccordion = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      className="relative isolate flex min-h-[550px] w-full items-center justify-center overflow-hidden bg-black px-4 py-10 text-white sm:px-10 lg:px-[90px] lg:py-8"
      style={{ fontFamily: '"Poppins", sans-serif' }}
    >
      {/* Background Image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            "url('https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/07/tabs-bg.png')",
        }}
      />

      {/* Dark Overlays */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/70" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0d1117]/65" />

      {/* Main Content */}
      <div className="mx-auto grid w-full max-w-[1720px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        
        {/* Left Side Content with Reveal Animations */}
        <div className="flex flex-col items-start">
          <Reveal from={0.8} delay={100}>
            <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[68px]">
              Create your own
              <br />
              <span style={{ color: BRAND_GREEN }}>world</span> right now
              <span style={{ color: BRAND_GREEN }}>.</span>
            </h2>
          </Reveal>

          <Reveal from={0.9} delay={250}>
            <p className="max-w-[820px] text-base leading-relaxed text-gray-300 lg:text-[17px]">
              In our perspective, we prepare for responsible growth with something
              that we must always pursue and create a structured developed world
              to be better.
            </p>
          </Reveal>
        </div>

        {/* Right Side Accordion with Reveal Animation */}
        <div className="w-full">
          <Reveal from={0.9} delay={200}>
            <div>
              {accordionData.map((item, index) => {
                const isOpen = activeIndex === index;
                const panelId = `world-accordion-panel-${item.id}`;
                const buttonId = `world-accordion-button-${item.id}`;

                return (
                  <div key={item.id} className="py-3.5 border-b border-white/10 last:border-none">
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleAccordion(index)}
                        className="group flex w-full items-center justify-between gap-5 text-left text-lg font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:text-[22px]"
                      >
                        <span className="transition-colors duration-200 group-hover:text-[#4fc07f]">
                          {item.title}
                        </span>
                        <Icon open={isOpen} />
                      </button>
                    </h3>

                    {/* Smooth open/close */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-[grid-template-rows,opacity,padding] duration-[400ms] ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] pt-3 opacity-100"
                          : "grid-rows-[0fr] pt-0 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[720px] pr-2 text-sm leading-relaxed text-gray-400 lg:text-base">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}