export const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background px-4 pb-20 pt-5 sm:px-6 lg:px-8"
    >
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6rem] top-20 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute right-[-4rem] bottom-10 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-[3.75rem] lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Left image card */}
          <div className="relative">
            <div className="group relative overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_25px_70px_rgba(0,0,0,0.10)]">
              <picture>
                <source srcSet="/about/about-portrait.avif" type="image/avif" />
                <source srcSet="/about/about-portrait.webp" type="image/webp" />
                <img
                  src="/about/about-portrait.webp"
                  alt="Portrait of John Shaize"
                  className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[520px] lg:h-[640px]"
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>

            {/* subtle inner ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-white/10" />
          </div>

          {/* Right content */}
          <div className="relative max-w-2xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              About Me
            </div>

            <h2 className="mb-4 text-4xl font-semibold leading-[0.95] text-foreground sm:text-5xl lg:text-5xl">
              Hello!
              <br />
              I&apos;m <span className="text-primary">JOHN SHAIZE</span>
            </h2>

            <div className="mb-3 h-px w-24 bg-border" />

            <p className="mb-3 max-w-xl px-0.5 text-base leading-7 text-muted-foreground sm:text-lg">
              I’m a Toronto based portrait photographer creating images that
              feel honest, calm, and personal. My work is shaped by light, mood,
              and the small details that make a moment feel real.
            </p>

            <p className="mb-8 max-w-xl px-0.5 text-base leading-7 text-muted-foreground sm:text-lg">
              Alongside portraits, I also photograph landscapes and quiet
              natural scenes. Frames by Shaize is a space for visual
              storytelling through portraits, atmosphere, and cinematic
              stillness.
            </p>

            {/* mini info row */}
            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] border border-border bg-card/70 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-[2px]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Style
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  Natural & cinematic
                </p>
              </div>

              <div className="rounded-[20px] border border-border bg-card/70 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-[2px]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Based
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  Toronto, Canada
                </p>
              </div>

              <div className="rounded-[20px] border border-border bg-card/70 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-[2px]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Focus
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  Portrait sessions
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#portfolio" className="btn-primary">
                View Portfolio
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-[0_14px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-surface"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
