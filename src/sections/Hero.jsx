import { useState } from "react";

export const Hero = () => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [cutoutLoaded, setCutoutLoaded] = useState(false);

  return (
    <section className="relative min-h-screen bg-background px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto h-[calc(100vh-6rem)] max-w-7xl overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          {/* soft placeholder */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              bgLoaded ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="h-full w-full bg-muted" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
          </div>

          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/hero/hero-bg2-mobile.avif"
              type="image/avif"
            />
            <source
              media="(max-width: 767px)"
              srcSet="/hero/hero-bg2-mobile.webp"
              type="image/webp"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/hero/hero-bg2-desktop.avif"
              type="image/avif"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/hero/hero-bg2-desktop.webp"
              type="image/webp"
            />
            <img
              src="/hero/hero-bg2-desktop.webp"
              alt="Hero background"
              onLoad={() => setBgLoaded(true)}
              className={`h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                bgLoaded
                  ? "scale-100 opacity-100 blur-0"
                  : "scale-[1.035] opacity-0 blur-[8px]"
              }`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>

          <div className="absolute inset-0 bg-background/3" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-transparent to-background/0" />
        </div>

        {/* Portraits word - BELOW cutout */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="hero-bg-word animate-fade-in mt-[12rem]">
            Portraits
          </div>
        </div>

        {/* Subject cutout - ABOVE Portraits word */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <img
            src="/hero-bg2-cut.png"
            alt="Subject cutout"
            onLoad={() => setCutoutLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              cutoutLoaded
                ? "scale-100 opacity-100 blur-0"
                : "scale-[1.015] opacity-0 blur-[6px]"
            }`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-25 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full opacity-60"
              style={{
                backgroundColor: "var(--color-muted-foreground)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Hero content - ABOVE cutout */}
        <div className="absolute inset-0 z-30 flex -translate-y-[5px] flex-col items-center justify-center px-6 text-center sm:-translate-y-[70px] lg:-translate-y-[60px]">
          <div className="pointer-events-none relative flex w-full max-w-5xl flex-col items-center">
            <p
              className="
mb-5 inline-flex items-center rounded-full border border-white/15 bg-black/10
px-3 py-1.5 sm:px-4 sm:py-2
text-[8px] uppercase tracking-[0.28em] text-white/88
shadow-[0_8px_30px_rgba(0,0,0,0.28)] backdrop-blur-md
animate-fade-in sm:mb-10 sm:text-[10px] sm:tracking-[0.34em]
lg:mb-10 lg:text-[10px]
"
            >
              Stories, light, and people
            </p>

            <h1 className="font-hero hero-title-shadow hero-title-glow hero-main-title animate-soft-fade-up text-center text-white">
              Frames by Shaize
            </h1>
          </div>

          <a
            href="#about"
            className="absolute bottom-8 left-1/2 z-40 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.35)] animate-float-down"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Inner border */}
        <div className="pointer-events-none absolute inset-0 z-40 rounded-[20px] ring-1 ring-white/20" />
      </div>
    </section>
  );
};