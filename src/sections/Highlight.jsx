import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { highlightImages } from "../data/highlightImages";

export const Highlight = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [preloadedFullImages, setPreloadedFullImages] = useState({});
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const selectedPhoto =
    selectedIndex !== null ? highlightImages[selectedIndex] : null;

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
      prev === null ? 0 : (prev + 1) % highlightImages.length,
    );
    setLightboxLoaded(false);
  };

  const goToPrev = () => {
    setSelectedIndex((prev) =>
      prev === null
        ? highlightImages.length - 1
        : (prev - 1 + highlightImages.length) % highlightImages.length,
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
        id="highlights"
        className="relative bg-background px-4 pb-20 pt-5 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-2xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Highlights
            </p>

            <h2 className="text-4xl font-semibold leading-[0.95] text-foreground sm:text-5xl lg:text-5xl">
              Selected Frames
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Visual storytelling through portraits, atmosphere, and cinematic
              stillness.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {highlightImages.map((photo, index) => (
              <article
                key={photo.id}
                onClick={() => openPhoto(index)}
                className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-[2px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* thumb loading placeholder */}
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
                    className={`h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      loadedImages[photo.id]
                        ? "scale-100 opacity-100 blur-0"
                        : "scale-[1.015] opacity-0 blur-[6px]"
                    } group-hover:scale-[1.04]`}
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3 className="text-sm font-medium text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:text-base">
                      {photo.title}
                    </h3>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-white/10" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/0 p-4 backdrop-blur-0 animate-lightbox-backdrop sm:p-6"
          onClick={closePhoto}
        >
          {/* Desktop close button */}
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
              className="relative mx-auto w-fit max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* full image loading placeholder */}
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

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/18 to-transparent" />
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
