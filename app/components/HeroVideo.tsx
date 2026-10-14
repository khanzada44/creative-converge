"use client";

import React, { useState } from "react";

const slidesData = [
  {
    id: 0,
    welcome: "Welcome to",
    title: "WebsDesignUSA",
    subtitle:
      "Custom Web Design | E-Commerce Solutions | SEO That Drives Results",
    description:
      "We create new technologies for your business thanks to our wonderful team of professionals.",
  },
  {
    id: 1,
    welcome: "Innovative Ideas",
    title: "Digital Growth",
    subtitle: "Brand Identity | Web Apps | Digital Marketing",
    description:
      "Empowering modern brands with cutting-edge digital experiences and robust tech stack.",
  },
  {
    id: 2,
    welcome: "Results Driven",
    title: "Creative Solutions",
    subtitle: "UI/UX Design | Scalable Code | Performance Optimization",
    description:
      "Transforming complex workflows into seamless, conversion-oriented web interfaces.",
  },
];

export default function HeroVideo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const videoUrl =
    "https://creativeconverge.com/mockups/creativemock/assets/videos/creative-converge-new-video.mp4";

  const handleSlideChange = (index: number) => {
    if (index === currentSlide) return;

    setCurrentSlide(index);
    setAnimationKey((prev) => prev + 1);
  };

  const activeContent = slidesData[currentSlide];

  return (
    <section className="relative isolate flex h-screen min-h-[600px] w-full items-center overflow-hidden bg-black text-white">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">

        {/* Animated Text Content */}
        <div
          key={animationKey}
          className="hero-content max-w-5xl"
        >
          {/* Welcome Text */}
          <h3 className="hero-item hero-welcome mb-2 text-xl   tracking-wide text-white sm:text-2xl md:text-3xl">
            {activeContent.welcome}
          </h3>

          {/* Main Title */}
          <h1 className="hero-item hero-title mb-5 text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {activeContent.title}
          </h1>

          {/* Subtitle */}
          <div className="hero-item hero-subtitle mb-5 flex items-start gap-3 text-base   leading-relaxed text-white sm:text-lg md:text-xl">
            <span className="mt-3 inline-block h-[2px] w-10 shrink-0 bg-white sm:w-14" />

            <p className="max-w-4xl">
              {activeContent.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="hero-item hero-description mb-8 max-w-3xl text-base leading-7 text-gray-100 sm:text-lg sm:leading-8 md:text-xl">
            {activeContent.description}
          </p>

          {/* Glowing Play Button (Placed right below description inside content flow with reveal animation) */}
          <div className="hero-item hero-button">
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0B1F2A_0%,#00A8A8_50%,#18D0C8_75%,#00F2FE_100%)] text-white shadow-[0_0_20px_8px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-110 hover:bg-emerald-500 hover:shadow-[linear-gradient(135deg,#0B1F2A_0%,#00A8A8_50%,#18D0C8_75%,#00F2FE_100%)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 sm:h-[72px] sm:w-[72px]"
              aria-label="Play video"
            >
              {/* Glowing Pulse Ring */}
              <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#0B1F2A_0%,#00A8A8_50%,#18D0C8_75%,#00F2FE_100%)] animate-ping" />

              {/* Play Icon */}
              <svg
                className="relative z-10 ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-4 sm:right-8 md:right-12">
        {slidesData.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? "true" : undefined}
            className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              currentSlide === index
                ? "h-2.5 w-10 bg-emerald-400"
                : "h-2.5 w-5 bg-white/50 hover:w-8 hover:bg-white"
            }`}
          />
        ))}
      </div>
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsVideoOpen(false)}
            className="absolute right-5 top-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            aria-label="Close video"
          >
            &times;
          </button>

          {/* Video Player */}
          <div
            className="relative w-full max-w-5xl overflow-hidden   border border-white/10 bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              controls
              autoPlay
              playsInline
              className="aspect-video h-auto w-full"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Text Animation */}
      <style jsx global>{`
        @keyframes heroReveal {
          0% {
            opacity: 0;
            transform: translateX(100px);
            filter: blur(5px);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
            filter: blur(0);
          }
        }

        .hero-content .hero-item {
          opacity: 0;
          animation: heroReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hero-content .hero-welcome {
          animation-delay: 0.1s;
        }

        .hero-content .hero-title {
          animation-delay: 0.25s;
        }

        .hero-content .hero-subtitle {
          animation-delay: 0.4s;
        }

        .hero-content .hero-description {
          animation-delay: 0.55s;
        }

        .hero-content .hero-button {
          animation-delay: 0.7s;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-content .hero-item {
            opacity: 1;
            animation: none;
            transform: none;
            filter: none;
          }

          .animate-ping {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}