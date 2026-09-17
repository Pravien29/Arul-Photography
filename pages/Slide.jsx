import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import "./style/Slide.css";

const perks = [
  { icon: "📷", title: "Professional Team", text: "Experienced & creative photographers" },
  { icon: "🏅", title: "Premium Quality", text: "High-end equipment for perfect shots" },
  { icon: "❤️", title: "Client Satisfaction", text: "Your happiness is our priority" },
  { icon: "⏱", title: "On-Time Delivery", text: "We deliver memories on time" },
  { icon: "🛡", title: "Trusted Service", text: "1000+ happy clients worldwide" },
];

function Slide() {
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

  // auto-advance when there's more than one slide
  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const goPrev = () =>
    setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goNext = () =>
    setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const current = slides[active];

  return (
    <section className="slide-section">
      <Reveal direction="scale" className="slide-image-wrap">
        {loading && <div className="slide-placeholder">Loading…</div>}
        {error && <div className="slide-placeholder">Couldn’t load image</div>}
        {current && (
          <img
            key={current.id}
            src={current.img}
            alt="Photographer capturing a moment"
            className="slide-image"
          />
        )}

        {slides.length > 1 && (
          <div className="slide-controls">
            <button onClick={goPrev} aria-label="Previous slide">←</button>
            <button onClick={goNext} aria-label="Next slide">→</button>
          </div>
        )}

        <ol className="slide-timeline">
          <li><span>01</span> Beautiful Moments</li>
          <li><span>02</span> Timeless Stories</li>
          <li><span>03</span> Real Emotions</li>
        </ol>
      </Reveal>

      <Reveal direction="left" className="slide-copy">
        <p className="eyebrow">We Capture</p>
        <h1>
          Your Best <em>Moments</em>
        </h1>
        <p className="desc">
          Professional photography services for weddings, portraits, events
          and commercial shoots.
        </p>
        <div className="slide-cta">
          <button className="btn-dark">📷 Book a Shoot</button>
          <button className="btn-ghost">▶ View Showreel</button>
        </div>
      </Reveal>

      <Reveal direction="up" delay={150} className="perks-bar">
        {perks.map((perk, i) => (
          <div className="perk" key={perk.title} style={{ transitionDelay: `${i * 60}ms` }}>
            <span className="perk-icon">{perk.icon}</span>
            <div>
              <h4>{perk.title}</h4>
              <p>{perk.text}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

export default Slide;