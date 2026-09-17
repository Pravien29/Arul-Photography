import { useEffect, useState } from "react";
import "./style/Hero.css";

function Hero() {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://arulnode.onrender.com/api/arul/slide")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load slides");
        return res.json();
      })
      .then((data) => setSlides(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(id);
  }, [slides.length]);

  const goPrev = () => setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goNext = () => setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <section className="hero">
      <div className="hero-slides">
        {loading && <div className="hero-fallback" />}
        {error && <div className="hero-fallback" />}
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-slide ${i === active ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${slide.img})` }}
            aria-hidden={i !== active}
          />
        ))}
        <div className="hero-scrim" />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">Premium Wedding Photographer</p>
        <h1 className="hero-title">
          Stories from
          <br />
          Arul Photography
        </h1>
        <p className="hero-sub">Candid wedding &amp; portrait photography across Tamil Nadu</p>
      </div>

      {slides.length > 1 && (
        <div className="hero-controls">
          <button onClick={goPrev} aria-label="Previous slide">‹</button>
          <div className="hero-dots">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                className={i === active ? "is-active" : ""}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <button onClick={goNext} aria-label="Next slide">›</button>
        </div>
      )}

      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

export default Hero;