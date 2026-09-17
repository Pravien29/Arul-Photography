import Reveal from "./Reveal";
import "./style/Reviews.css";

const reviews = [
  {
    name: "Theebica & Purushoth",
    quote:
      "Thank you for capturing the best moments of our wedding and reception. We loved the pre-wedding shoot and the traditional pictures — the team was wonderfully flexible to work with.",
  },
  {
    name: "Jeevitha & Pawan",
    quote:
      "We worked with Arul Photography for our engagement, reception and wedding, and couldn't be happier with the results. Professional and creative from start to finish.",
  },
  {
    name: "Pratibha & Ashwanth",
    quote:
      "They covered our engagement, pre-wedding shoot, reception and wedding, and made us feel completely at ease the whole time. Would book them again in a heartbeat.",
  },
];

function Reviews() {
  return (
    <section className="reviews-section">
      <Reveal direction="up" className="reviews-heading">
        <p className="eyebrow-label">Kind Words</p>
        <h2>Loved by the couples we've worked with</h2>
      </Reveal>

      <div className="reviews-grid">
        {reviews.map((review, i) => (
          <Reveal key={review.name} direction="up" delay={i * 100} className="review-card">
            <span className="review-mark">“</span>
            <p>{review.quote}</p>
            <h4>{review.name}</h4>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Reviews;