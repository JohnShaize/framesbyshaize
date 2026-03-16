import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { portfolioImages } from "../data/portfolioImages";

export const Portfolio = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [preloadedFullImages, setPreloadedFullImages] = useState({});
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const selectedPhoto =
    selectedIndex !== null ? portfolioImages[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "ArrowLeft") {
        goToPrev();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    setLightboxLoaded(false);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  const preloadFullImage = (photo) => {
    if (!photo || preloadedFullImages[photo.id]) return;

    const img = new Image();
    img.src = photo.full;

    img.onload = () => {
      setPreloadedFullImages((prev) => ({ ...prev, [photo.id]: true }));
    };
  };

  const handleThumbLoad = (photo) => {
    setLoadedImages((prev) => ({ ...prev, [photo.id]: true }));
    preloadFullImage(photo);
  };

  const openPhoto = (index) => {
    setSelectedIndex(index);
  };

  const closePhoto = () => {
    setSelectedIndex(null);
  };

  const goToNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % portfolioImages.length,
    );
    setLightboxLoaded(false);
  };

  const goToPrev = () => {
    setSelectedIndex((prev) =>
      prev === null
        ? portfolioImages.length - 1
        : (prev - 1 + portfolioImages.length) % portfolioImages.length,
    );
    setLightboxLoaded(false);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX.current = event.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) < 50) return;

    if (deltaX > 0) {
      goToNext();
    } else {
      goToPrev();
    }
  };

  return (
    <>
      <section
        id="portfolio"
        className="relative bg-background px-4 pb-20 pt-5 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl lg:mb-10">
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Portfolio
            </p>

            <h2 className="text-4xl font-semibold leading-[0.95] text-foreground sm:text-5xl lg:text-5xl">
              Portrait Sessions
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              A curated gallery of portraits, atmosphere, and visual stillness.
              Click any frame to view it larger.
            </p>
          </div>

          <div className="columns-2 gap-3 space-y-3 md:columns-3 lg:columns-5 lg:gap-3 lg:space-y-4">
            {portfolioImages.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => openPhoto(index)}
                style={{ animationDelay: `${index * 35}ms` }}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[14px] border border-border/70 bg-card text-left animate-portfolio-reveal lg:mb-4"
              >
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    loadedImages[photo.id] ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="h-full w-full animate-pulse bg-muted" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
                </div>

                <img
                  src={photo.thumb}
                  alt={photo.alt}
                  onLoad={() => handleThumbLoad(photo)}
                  className={`block h-auto w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    loadedImages[photo.id]
                      ? "scale-100 opacity-100 blur-0"
                      : "scale-[1.015] opacity-0 blur-[6px]"
                  } group-hover:scale-[1.03]`}
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-white/8" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/0 p-4 backdrop-blur-0 animate-lightbox-backdrop sm:p-6"
          onClick={closePhoto}
        >
          {/* Desktop close button - detached from image panel */}
          <button
            type="button"
            onClick={closePhoto}
            className="absolute right-4 top-4 z-50 hidden h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-white/16 sm:inline-flex"
            aria-label="Close preview"
          >
            <X size={20} />
          </button>

          <div
            className="relative w-full max-w-6xl animate-lightbox-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Desktop arrows */}
            <button
              type="button"
              onClick={goToPrev}
              className="absolute left-3 top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-white/16 sm:inline-flex"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="absolute right-3 top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-white/16 sm:inline-flex"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>

            <div
              className="relative mx-auto w-fit max-w-full overflow-hidden rounded-[20px] border border-white/10 bg-black/20 shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  lightboxLoaded ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="h-full w-full animate-pulse bg-white/[0.04]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
              </div>

              <img
                key={selectedPhoto.id}
                src={selectedPhoto.full}
                alt={selectedPhoto.alt}
                onLoad={() => setLightboxLoaded(true)}
                className={`block max-h-[85vh] w-auto max-w-full object-contain transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  lightboxLoaded
                    ? "scale-100 opacity-100 blur-0"
                    : "scale-[1.01] opacity-0 blur-[5px]"
                }`}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Mobile bottom control bar */}
          <div
            className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={goToPrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/16"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={closePhoto}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/16"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/16"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
