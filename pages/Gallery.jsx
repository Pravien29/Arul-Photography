import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import "./style/Gallery.css";

function Gallery() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [visibleIds, setVisibleIds] = useState(new Set());
  const [activeCard, setActiveCard] = useState(null);
  const itemRefs = useRef({});

  useEffect(() => {
    fetch("https://arulnode.onrender.com/api/arul/cards")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load gallery");
        return res.json();
      })
      .then((data) => setCards(data))
      .catch((err) => setError(err.message));
  }, []);

  // Scroll-triggered stagger reveal
  useEffect(() => {
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.cardId;
            setVisibleIds((prev) => new Set(prev).add(id));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    Object.values(itemRefs.current).forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [cards]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!activeCard) return;
    const onKey = (e) => e.key === "Escape" && setActiveCard(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCard]);

  return (
    <section className="wg-section">
      <Reveal direction="up" className="wg-heading">
        <p className="wg-eyebrow">Selected Works</p>
        <h2>A closer look at real weddings</h2>
      </Reveal>

      {error && <p className="wg-error">{error}</p>}

      <div className="wg-grid">
        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (itemRefs.current[card.id] = el)}
            data-card-id={card.id}
            className={`wg-item ${visibleIds.has(String(card.id)) ? "wg-in-view" : ""}`}
            style={{ transitionDelay: `${(i % 6) * 80}ms` }}
            onClick={() => setActiveCard(card)}
          >
            <img src={card.img} alt={card.caption || ""} loading="lazy" />
            {card.caption && (
              <span className="wg-item-caption">{card.caption}</span>
            )}
          </div>
        ))}
      </div>

      <Reveal direction="up" className="wg-cta">
        <Link to="/portfolio">View full portfolio</Link>
      </Reveal>

      {activeCard && (
        <div className="wg-lightbox" onClick={() => setActiveCard(null)}>
          <button
            className="wg-lightbox-close"
            aria-label="Close"
            onClick={() => setActiveCard(null)}
          >
            &times;
          </button>
          <img
            src={activeCard.img}
            alt={activeCard.caption || ""}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default Gallery;