import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const portraitSlides = [
  { image: "/photo01.jpg" },
  { image: "/photo02.jpg" },
  { image: "/photo03.jpg" },
  { image: "/photo04.jpg" },
  { image: "/photo05.jpg" },
  { image: "/photo06.jpg" },
  { image: "/photo07.jpg" },
  { image: "/photo08.jpg" },
  { image: "/photo09.jpg" },
  { image: "/photo10.jpg" },
  { image: "/photo11.jpg" },
  { image: "/photo12.jpg" },
  { image: "/photo13.jpg" },
  { image: "/photo14.jpg" },
  { image: "/photo15.jpg" },
  { image: "/photo16.jpg" },
  { image: "/photo17.jpg" },
];

const HIDDEN_SIDE = 2;
const ANIMATION_MS = 520;
const SCRUB_TRIGGER = 42;

const mod = (n, total) => ((n % total) + total) % total;

export const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [viewportCoverage, setViewportCoverage] = useState(80);
  const [translatePercent, setTranslatePercent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [trackTransition, setTrackTransition] = useState("none");
  const [scrubOffset, setScrubOffset] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const dragRef = useRef({
    active: false,
    startX: 0,
    triggered: false,
  });

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
        setViewportCoverage(100);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
        setViewportCoverage(80);
      } else {
        setVisibleCount(3);
        setViewportCoverage(80);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto]);

  const itemWidth = viewportCoverage / visibleCount;
  const baseTranslate = -(HIDDEN_SIDE * itemWidth);

  useEffect(() => {
    setTrackTransition("none");
    setTranslatePercent(baseTranslate);
  }, [baseTranslate]);

  const totalRenderCount = visibleCount + HIDDEN_SIDE * 2;
  const startOffset = -(HIDDEN_SIDE + Math.floor(visibleCount / 2));

  const renderedSlides = useMemo(() => {
    return Array.from({ length: totalRenderCount }, (_, i) => {
      const realIndex = mod(
        activeIndex + startOffset + i,
        portraitSlides.length,
      );
      return {
        ...portraitSlides[realIndex],
        realIndex,
      };
    });
  }, [activeIndex, totalRenderCount, startOffset]);

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTrackTransition(
      `transform ${ANIMATION_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`,
    );
    setTranslatePercent(baseTranslate - itemWidth);

    window.setTimeout(() => {
      setTrackTransition("none");
      setActiveIndex((prev) => mod(prev + 1, portraitSlides.length));
      setTranslatePercent(baseTranslate);
      setIsAnimating(false);
    }, ANIMATION_MS);
  };

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTrackTransition(
      `transform ${ANIMATION_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`,
    );
    setTranslatePercent(baseTranslate + itemWidth);

    window.setTimeout(() => {
      setTrackTransition("none");
      setActiveIndex((prev) => mod(prev - 1, portraitSlides.length));
      setTranslatePercent(baseTranslate);
      setIsAnimating(false);
    }, ANIMATION_MS);
  };

  const getClientX = (event) => {
    if ("touches" in event && event.touches.length > 0) {
      return event.touches[0].clientX;
    }
    if ("changedTouches" in event && event.changedTouches.length > 0) {
      return event.changedTouches[0].clientX;
    }
    return event.clientX;
  };

  const endScrub = () => {
    dragRef.current.active = false;
    dragRef.current.triggered = false;
    setScrubOffset(0);

    window.removeEventListener("mousemove", onScrubMove);
    window.removeEventListener("mouseup", endScrub);
    window.removeEventListener("touchmove", onScrubMove);
    window.removeEventListener("touchend", endScrub);
  };

  const onScrubMove = (event) => {
    if (!dragRef.current.active || dragRef.current.triggered) return;

    const currentX = getClientX(event);
    const deltaX = currentX - dragRef.current.startX;
    const clamped = Math.max(-64, Math.min(64, deltaX));
    setScrubOffset(clamped);

    if (deltaX <= -SCRUB_TRIGGER && !isAnimating) {
      dragRef.current.triggered = true;
      setScrubOffset(0);
      handleNext();
    } else if (deltaX >= SCRUB_TRIGGER && !isAnimating) {
      dragRef.current.triggered = true;
      setScrubOffset(0);
      handlePrev();
    }
  };

  const startScrub = (event) => {
    if (isAnimating) return;

    dragRef.current.active = true;
    dragRef.current.startX = getClientX(event);
    dragRef.current.triggered = false;
    setScrubOffset(0);

    window.addEventListener("mousemove", onScrubMove);
    window.addEventListener("mouseup", endScrub);
    window.addEventListener("touchmove", onScrubMove, { passive: true });
    window.addEventListener("touchend", endScrub);
  };

  const currentSlide = portraitSlides[activeIndex];

  return (
    <>
      <section
        id="portfolio"
        className="relative bg-background px-4 pb-20 pt-5 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Portfolio
            </p>

            <h2 className="text-4xl font-semibold leading-[0.95] text-foreground sm:text-5xl lg:text-5xl">
              Portrait Sessions
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              A curated selection of portrait work presented through movement,
              rhythm, and visual continuity.
            </p>
          </div>

          {/* MOBILE */}
          <div className="sm:hidden">
            <div className="relative overflow-hidden rounded-[20px] ring-1 ring-border/80">
              <div
                className="relative h-[540px] overflow-hidden bg-muted"
                onMouseDown={startScrub}
                onTouchStart={startScrub}
              >
                <img
                  key={currentSlide.image}
                  src={currentSlide.image}
                  alt="Portrait photograph"
                  onClick={() => setSelectedPhoto(currentSlide)}
                  className="relative z-10 h-full w-full cursor-pointer object-cover object-center scale-[1.06]"
                />

                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className="absolute left-4 top-1/2 z-30 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/16 disabled:cursor-not-allowed disabled:opacity-70"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="absolute right-4 top-1/2 z-30 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/16 disabled:cursor-not-allowed disabled:opacity-70"
                  aria-label="Next slide"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* TABLET + DESKTOP */}
          <div className="relative hidden sm:block">
            <div className="overflow-hidden -mx-2 lg:-mr-3.5">
              <div
                className="flex items-stretch"
                style={{
                  width: `${totalRenderCount * itemWidth}%`,
                  transform: `translateX(${translatePercent}%)`,
                  transition: trackTransition,
                }}
              >
                {renderedSlides.map((slide, index) => (
                  <div
                    key={`${slide.realIndex}-${index}-${slide.image}`}
                    style={{ width: `${itemWidth}%` }}
                    className="shrink-0 px-0 sm:px-1 lg:px-2"
                  >
                    <div
                      className="group relative overflow-hidden rounded-[20px] ring-1 ring-border/80 transition-all duration-300"
                      onClick={() => setSelectedPhoto(slide)}
                    >
                      <div className="relative h-[560px] overflow-hidden bg-muted lg:h-[650px]">
                        <img
                          src={slide.image}
                          alt="Portrait photograph"
                          className="h-full w-full cursor-pointer object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrev}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 z-30 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/16 disabled:cursor-not-allowed disabled:opacity-70 sm:left-1 lg:left-2"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 z-30 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/16 disabled:cursor-not-allowed disabled:opacity-70 sm:right-1 lg:right-2"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox / modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/72 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-6xl animate-subtle-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55 sm:right-4 sm:top-4"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>

            <div className="relative mx-auto w-fit max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-transparent shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
              <img
                src={selectedPhoto.image}
                alt="Portrait photograph"
                className="block max-h-[85vh] w-auto max-w-full object-contain"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/18 to-transparent" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
