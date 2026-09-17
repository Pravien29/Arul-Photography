import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import "./style/Portfolio.css";
import "./style/Portfolio.css"
const categories = [
  {
    id: "weddings",
    title: "Weddings",
    img: "/images/mrg.jpg",
    link: "/weddings",
  },
  {
    id: "portraits",
    title: "Portraits",
    img: "/images/img18.jpeg",
    link: "/portraits",
  },
  {
    id: "pre-weddings",
    title: "Pre Weddings",
    img: "/images/img1.jpeg",
    link: "/pre-weddings",
  },
  {
    id: "birthday",
    title: "Birthday",
    img: "/images/birthday.jpg",
    link: "/birthday",
  },
];

function Portfolio() {
  const [visibleIds, setVisibleIds] = useState(new Set());
  const cardRefs = useRef({});

  useEffect(() => {
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
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    Object.values(cardRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="pf-intro">
        <p className="pf-eyebrow">Where every frame tells a story</p>
        <h1>Our Portfolio</h1>
        <p className="pf-desc">
          Discover the artistry of Zero Watts Photography through our curated
          portfolio. From Tamil, Telugu, Christian, Muslim, and Brahmin
          weddings to pre-wedding shoots and cinematic wedding films, our work
          reflects creativity and attention to detail. Explore our stunning
          visuals that capture love, joy, and traditions in every frame. Let
          our portfolio inspire your dream wedding photography experience.
        </p>
      </section>

      <section className="pf-grid">
        {categories.map((cat, i) => (
          <Link
            to={cat.link}
            key={cat.id}
            ref={(el) => (cardRefs.current[cat.id] = el)}
            data-card-id={cat.id}
            className={`pf-card ${visibleIds.has(cat.id) ? "pf-in-view" : ""}`}
            style={{ transitionDelay: `${(i % 4) * 100}ms` }}
          >
            <img src={cat.img} alt={cat.title} loading="lazy" />
            <div className="pf-card-overlay">
              <span className="pf-card-title">{cat.title}</span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

export default Portfolio;