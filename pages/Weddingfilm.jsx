import "./style/Weddingfilm.css";
import heroImage from "../public/images/img9.jpeg";

const films = [
  {
    id: "1NaL7EJSBM8",
    title: "SAM + JENI",
    desc: "Join us on a beautiful journey through Sam and Jeni's special day, filled with love, joyful celebrations, emotional moments, and unforgettable memories.",
  },
  {
    id: "bjcwBdnDoD8",
    title: "SRINIDHI + AKHILAN",
    desc: "A collection of beautiful moments from their wedding celebration, capturing their love, happiness, family, emotions, and all the memories that made their day special.",
  },
  {
    id: "eQ5kc54bjmw",
    title: "PRIYA + KARTHIK",
    desc: "A cinematic look back at Priya and Karthik's wedding day — tender glances, warm laughter, and the quiet moments in between the celebration.",
  },
  {
    id: "P4w4NNtVEYY",
    title: "DIVYA + ARUN",
    desc: "From the first look to the final dance, relive Divya and Arun's wedding through the emotions, colors, and people that made it unforgettable.",
  },
];

function Weddingfilm() {
  return (
    <div className="wedding-films">

      {/* ================= HERO ================= */}
      <section
        className="wedding-films-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="wedding-films-hero-overlay" />
        <div className="wedding-films-hero-content">
          <span className="wedding-films-kicker">Cinematic Stories</span>
          <h1 className="wedding-films-hero-title">Wedding Films</h1>
          <p className="wedding-films-hero-tagline">
            Full-day wedding stories, told candidly — from the first look to
            the last dance.
          </p>
        </div>
      </section>

      {/* ================= FILM LIST ================= */}
      {films.map((film, i) => (
        <section
          key={film.id}
          className={`wedding-video-section ${i % 2 === 1 ? "reverse" : ""}`}
        >
          <div className="wedding-video">
            <iframe
              src={`https://www.youtube.com/embed/${film.id}`}
              title={film.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="wedding-video-content">
            <span className="wedding-video-index">
              {String(i + 1).padStart(2, "0")}
              <span className="wedding-video-index-total">
                /{String(films.length).padStart(2, "0")}
              </span>
            </span>

            <h3>{film.title}</h3>
            <span className="wedding-video-line" aria-hidden="true" />
            <p>{film.desc}</p>
          </div>
        </section>
      ))}
    </div>
  );
}

export default Weddingfilm;