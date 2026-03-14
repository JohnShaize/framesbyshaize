import { useEffect, useState } from "react";
import { X } from "lucide-react";

const highlightPhotos = [
  {
    src: "/photo1.jpg",
    alt: "Highlight photo 1",
    title: "Golden Hour",
  },
  {
    src: "/photo2.jpg",
    alt: "Highlight photo 2",
    title: "Candid Flow",
  },
  {
    src: "/photo3.jpg",
    alt: "Highlight photo 3",
    title: "Shadow Play",
  },
  {
    src: "/photo4.jpg",
    alt: "Highlight photo 4",
    title: "Urban Bloom",
  },
  {
    src: "/photo5.jpg",
    alt: "Highlight photo 5",
    title: "Clean Space",
  },
  {
    src: "/photo6.jpg",
    alt: "Highlight photo 6",
    title: "Wild Spirit",
  },
];

export const Highlight = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

  return (
    <>
      <section
        id="highlights"
        className="relative bg-background px-4 pb-20 pt-5 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section heading */}
          <div className="mb-6 max-w-2xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Highlights
            </p>

            <h2 className="text-4xl font-semibold leading-[0.95] text-foreground sm:text-5xl lg:text-5xl">
              Selected Frames
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              visual storytelling through portraits, atmosphere, and cinematic
              stillness.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {highlightPhotos.map((photo, index) => (
              <article
                key={index}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-[2px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  {/* soft overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                  {/* bottom title */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3 className="text-sm font-medium text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:text-base">
                      {photo.title}
                    </h3>
                  </div>
                </div>

                {/* subtle inner ring */}
                <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-white/10" />
              </article>
            ))}
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
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55 sm:right-4 sm:top-4"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>

            {/* Image box */}
            <div className="relative mx-auto w-fit max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-transparent shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="block max-h-[85vh] w-auto max-w-full object-contain"
              />

              {/* optional bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/18 to-transparent" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
