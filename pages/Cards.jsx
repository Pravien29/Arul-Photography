import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import "./style/Cards.css";

const labels = [
  { icon: "👰", name: "Weddings" },
  { icon: "🙂", name: "Portraits" },
  { icon: "⛵", name: "Landscapes" },
  { icon: "🎉", name: "Events" },
  { icon: "🎁", name: "Commercial" },
];

function Cards() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://arulnode.onrender.com/api/arul/cards")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load gallery");
        return res.json();
      })
      .then((data) => setCards(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="cards-section">
      <Reveal direction="up" className="cards-heading">
        <div>
          <p className="eyebrow">Our Work</p>
          <h2>
            Stories Through <em>Our Lens</em>
          </h2>
          <p className="desc">
            Every picture we capture is a story that lasts forever.
          </p>
        </div>
        <button className="btn-ghost-dark">View All Gallery →</button>
      </Reveal>

      {error && <p className="cards-error">{error}</p>}

      <div className="cards-grid">
        {cards.map((card, i) => (
          <Reveal
            key={card.id}
            direction="up"
            delay={i * 90}
            className="gallery-card"
          >
            <img src={card.img} alt={labels[i]?.name || "Gallery photo"} />
            <div className="gallery-overlay" />
            <span className="gallery-tag">
              {labels[i]?.icon} {labels[i]?.name || `Photo ${card.id}`}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Cards;