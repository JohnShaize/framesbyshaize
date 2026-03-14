export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto h-[calc(100vh-6rem)] max-w-7xl overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg2.jpg"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/3" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-transparent to-background/0" />
        </div>

        {/* Portraits word - BELOW cutout */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <div className="hero-bg-word animate-fade-in mt-[12rem]">
            Portraits
          </div>
        </div>

        {/* Subject cutout - ABOVE Portraits word */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <img
            src="/hero-bg2-cut.png"
            alt="Subject cutout"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full opacity-60"
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
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-30 -translate-y-[5px] sm:-translate-y-[70px] lg:-translate-y-[60px]">
          <div className="pointer-events-none relative w-full max-w-5xl flex flex-col items-center">
            <p
              className="
mb-5 inline-flex items-center rounded-full border border-white/15 bg-black/10
px-3 py-1.5 sm:px-4 sm:py-2
text-[8px] sm:text-[10px] lg:text-[10px] lg:mb-10
uppercase tracking-[0.28em] sm:tracking-[0.34em]
text-white/88 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.28)]
animate-fade-in sm:mb-10
"
            >
              Stories, light, and people
            </p>

            <h1 className="font-hero hero-title-shadow hero-title-glow animate-soft-fade-up hero-main-title text-white text-center">
              Frames by Shaize
            </h1>
          </div>

          <a
            href="#about"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.35)] animate-float-down z-40"
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
        <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-white/20 z-40" />
      </div>
    </section>
  );
};
