import { useEffect, useState, useRef, useCallback } from "react";
import "./style/Functions.css";

const API_BASE = "https://arulnode.onrender.com/api/arul";

// ============================================================================
// BLUR-UP LAZY IMAGE COMPONENT
// ============================================================================
function BlurImage({ src, alt, className = "", style = {}, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`blur-image-wrap ${loaded ? "is-loaded" : "is-loading"} ${
        error ? "has-error" : ""
      }`}
      style={style}
      onClick={onClick}
    >
      {/* Warm shimmer placeholder canvas */}
      <div className="blur-placeholder" aria-hidden="true" />

      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`blur-img-real ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />

      {error && (
        <div className="blur-fallback">
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN GALLERY COMPONENT
// ============================================================================
export default function Functions({ endpoint, heroImage, title, tagline }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lightbox & Shared-Element State
  const [activeIndex, setActiveIndex] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [originRect, setOriginRect] = useState(null);
  const [lightboxReady, setLightboxReady] = useState(false);

  // Drag & Swipe State
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentDragXRef = useRef(0);
  const thumbnailRefs = useRef({});


  // ============================
  // FETCH GALLERY DATA
  // ============================
  useEffect(() => {
    let cancelled = false;

    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/${endpoint}`);
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const data = await response.json();
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Gallery fetch error:", err);
          setError(err.message || "Failed to load collection");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchGallery();
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

 
  // ============================
  // OPEN LIGHTBOX (SHARED ELEMENT)
  // ============================
  const openLightbox = (index, e) => {
    const tileElement = e.currentTarget;
    const rect = tileElement.getBoundingClientRect();
    setOriginRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setActiveIndex(index);
    setIsClosing(false);
    setLightboxReady(false);
    setDragX(0);

    // Trigger shared element morph in next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLightboxReady(true);
      });
    });
  };

  // ============================
  // CLOSE LIGHTBOX
  // ============================
  const closeLightbox = useCallback(() => {
    setIsClosing(true);
    setLightboxReady(false);

    // Re-sync origin rect in case page scrolled
    if (activeIndex !== null && thumbnailRefs.current[activeIndex]) {
      const rect = thumbnailRefs.current[activeIndex].getBoundingClientRect();
      setOriginRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }

    setTimeout(() => {
      setActiveIndex(null);
      setIsClosing(false);
      setOriginRect(null);
      setDragX(0);
    }, 380);
  }, [activeIndex]);

  // ============================
  // NAVIGATION HANDLERS
  // ============================
  const goToNext = useCallback(() => {
    if (activeIndex === null) return;
    if (activeIndex < items.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      setActiveIndex(0); // loop around
    }
    setDragX(0);
  }, [activeIndex, items.length]);

  const goToPrev = useCallback(() => {
    if (activeIndex === null) return;
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else {
      setActiveIndex(items.length - 1); // loop around
    }
    setDragX(0);
  }, [activeIndex, items.length]);

  // ============================
  // KEYBOARD CONTROLS
  // ============================
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, closeLightbox, goToNext, goToPrev]);

  // Body scroll lock
  useEffect(() => {
    if (activeIndex !== null) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [activeIndex]);

  // ============================
  // DRAG / SWIPE GESTURES
  // ============================
  const handleTouchStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
    currentDragXRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startXRef.current;
    currentDragXRef.current = diff;
    setDragX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const delta = currentDragXRef.current;
    const SWIPE_THRESHOLD = 65;

    if (delta < -SWIPE_THRESHOLD) {
      goToNext();
    } else if (delta > SWIPE_THRESHOLD) {
      goToPrev();
    }

    setDragX(0);
    currentDragXRef.current = 0;
  };

  // Helper for shared element initial transformation
  const getSharedElementStyles = () => {
    if (!originRect) return {};

    const targetW = Math.min(window.innerWidth * 0.92, 1180);
    const targetH = Math.min(window.innerHeight * 0.82, 880);
    const targetCenterX = window.innerWidth / 2;
    const targetCenterY = window.innerHeight / 2;

    const originCenterX = originRect.left + originRect.width / 2;
    const originCenterY = originRect.top + originRect.height / 2;

    const deltaX = originCenterX - targetCenterX;
    const deltaY = originCenterY - targetCenterY;
    const scaleX = originRect.width / targetW;
    const scaleY = originRect.height / targetH;
    const initialScale = Math.max(scaleX, scaleY);

    if (!lightboxReady || isClosing) {
      return {
        transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${initialScale})`,
        borderRadius: "8px",
        transition:
          "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.4s ease",
      };
    }

    // Fully expanded (with touch swipe delta applied)
    return {
      transform: `translate3d(${dragX}px, 0, 0) scale(${
        1 - Math.min(Math.abs(dragX) * 0.0004, 0.12)
      })`,
      borderRadius: "12px",
      transition: isDragging
        ? "none"
        : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.3s ease",
    };
  };

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const prevItem =
    activeIndex !== null && items.length > 1
      ? items[(activeIndex - 1 + items.length) % items.length]
      : null;
  const nextItem =
    activeIndex !== null && items.length > 1
      ? items[(activeIndex + 1) % items.length]
      : null;

  return (
    <section className="gallery-page">
      {/* ============================
          HERO SECTION
      ============================ */}
      <header className="gallery-hero">
        <img
          src={heroImage}
          alt={title}
          className="gallery-hero-img"
          loading="eager"
        />
        <div className="gallery-hero-overlay" />

<div className="gallery-hero-copy is-in">
          <div className="gallery-hero-eyebrow">
            <span className="gallery-eyebrow-line" />
            <span className="gallery-eyebrow-text">Arul Fine Art Photography</span>
          </div>

          <h1 className="gallery-title">{title}</h1>

          {tagline && <p className="gallery-hero-tagline">{tagline}</p>}

          <div className="gallery-hero-meta">
            <span className="gallery-meta-pill">
              {items.length > 0 ? `${items.length} Photographs` : "Curated Series"}
            </span>
            <span className="gallery-meta-divider">•</span>
            <span className="gallery-meta-sub">Limited Editions</span>
          </div>
        </div>

        <div className="gallery-hero-scroll" aria-hidden="true">
          <div className="gallery-scroll-wheel" />
        </div>
      </header>

      {/* ============================
          GALLERY BODY
      ============================ */}
      <main className="gallery-body">
        {/* SKELETON LOADING STATE */}
        {loading && (
          <div className="gallery-grid" aria-busy="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`gallery-skeleton-card ${
                  i % 5 === 0 ? "gallery-tile--tall" : i % 7 === 0 ? "gallery-tile--wide" : ""
                }`}
                style={{ "--i": i }}
              >
                <div className="skeleton-shimmer-bar" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="gallery-status gallery-status-error">
            <div className="gallery-status-icon">⚠️</div>
            <h3>Unable to load collection</h3>
            <p className="status-detail">{error}</p>
            <p className="status-tip">
              Ensure the mock server is active at <code>{API_BASE}</code>.
            </p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && items.length === 0 && (
          <div className="gallery-status">
            <div className="gallery-status-icon">📷</div>
            <h3>Archive in curation</h3>
            <p>No photographs have been published in this series yet.</p>
          </div>
        )}

        {/* MAIN PHOTO GRID */}
        {!loading && !error && items.length > 0 && (
          <div className="gallery-grid">
            {items.map((item, i) => {
              const isTall = i % 6 === 0;
              const isWide = i % 8 === 4;

              return (
                <article
                  key={item.id ?? i}
                  ref={(el) => (thumbnailRefs.current[i] = el)}
                  className={`gallery-tile ${isTall ? "gallery-tile--tall" : ""} ${
                    isWide ? "gallery-tile--wide" : ""
                  }`}
                  style={{ "--stagger-i": i % 10 }}
                >
                  <button
                    type="button"
                    className="gallery-tile-button"
                    onClick={(e) => openLightbox(i, e)}
                    aria-label={`Open photograph ${i + 1}`}
                  >
                    {/* Blur-Up Image */}
                    <BlurImage
                      src={item.img}
                      alt={item.title || `${title} photo ${i + 1}`}
                      className="gallery-tile-img"
                    />

                    {/* Editorial hover overlay */}
                    <div className="gallery-tile-veil">
                      <div className="gallery-tile-top">
                        <span className="gallery-tile-number">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                      </div>

                      <div className="gallery-tile-bottom">
                        <span className="gallery-tile-prompt">
                          <svg viewBox="0 0 24 24" width="20" height="20">
                            <path
                              fill="currentColor"
                              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                            />
                          </svg>
                          <span>Inspect Photograph</span>
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* ============================
          ADVANCED LIGHTBOX MODAL
      ============================ */}
      {activeIndex !== null && (
        <div
          className={`gallery-lightbox ${lightboxReady ? "is-open" : "is-opening"} ${
            isClosing ? "is-closing" : ""
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged gallery view"
        >
          {/* Backdrop (closes on click) */}
          <div className="lightbox-backdrop" onClick={closeLightbox} />

          {/* Top Bar Header */}
          <div className="lightbox-header">
            <div className="lightbox-info">
              <span className="lightbox-series-name">{title}</span>
              <span className="lightbox-counter">
                {(activeIndex + 1).toString().padStart(2, "0")} /{" "}
                {items.length.toString().padStart(2, "0")}
              </span>
            </div>

            <div className="lightbox-actions">
              <button
                type="button"
                className="lightbox-action-btn lightbox-close"
                onClick={closeLightbox}
                aria-label="Close Lightbox (Esc)"
              >
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Central Carousel Stage with Parallax & Swipe */}
          <div
            className="lightbox-stage"
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* PREVIOUS SLIDE (Parallax peek left) */}
            {prevItem && items.length > 1 && (
              <div
                className="lightbox-parallax-slide is-prev"
                style={{
                  transform: `translateX(calc(-105% + ${dragX * 0.45}px))`,
                  opacity: Math.max(0.1, dragX > 0 ? dragX / 250 : 0.2),
                }}
              >
                <img
                  src={prevItem.img}
                  alt="Previous photograph preview"
                  className="lightbox-slide-img"
                  draggable={false}
                />
              </div>
            )}

            {/* ACTIVE MAIN SLIDE (Shared Element scale target) */}
            {activeItem && (
              <div
                className="lightbox-active-wrapper"
                style={getSharedElementStyles()}
              >
                <img
                  src={activeItem.img}
                  alt={activeItem.title || `Photograph ${activeIndex + 1}`}
                  className="lightbox-main-img"
                  draggable={false}
                />

                {/* Subtle soft edge gradient vignette */}
                <div className="lightbox-img-sheen" />
              </div>
            )}

            {/* NEXT SLIDE (Parallax peek right) */}
            {nextItem && items.length > 1 && (
              <div
                className="lightbox-parallax-slide is-next"
                style={{
                  transform: `translateX(calc(105% + ${dragX * 0.45}px))`,
                  opacity: Math.max(0.1, dragX < 0 ? Math.abs(dragX) / 250 : 0.2),
                }}
              >
                <img
                  src={nextItem.img}
                  alt="Next photograph preview"
                  className="lightbox-slide-img"
                  draggable={false}
                />
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox-nav-btn is-left"
                onClick={goToPrev}
                aria-label="Previous photograph"
              >
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path
                    fill="currentColor"
                    d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="lightbox-nav-btn is-right"
                onClick={goToNext}
                aria-label="Next photograph"
              >
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path
                    fill="currentColor"
                    d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                  />
                </svg>
              </button>
            </>
          )}

          {/* BOTTOM MINI THUMBNAIL TRACK */}
          {items.length > 1 && (
            <div className="lightbox-thumbs-bar">
              <div className="lightbox-thumbs-scroll">
                {items.map((item, thumbIdx) => (
                  <button
                    key={item.id ?? thumbIdx}
                    type="button"
                    className={`lightbox-thumb-item ${
                      thumbIdx === activeIndex ? "is-selected" : ""
                    }`}
                    onClick={() => {
                      setActiveIndex(thumbIdx);
                      setDragX(0);
                    }}
                    aria-label={`Jump to photograph ${thumbIdx + 1}`}
                  >
                    <img src={item.img} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}