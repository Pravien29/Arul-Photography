import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import "./style/WhyUs.css";

const stats = [
  { value: "500+", label: "Weddings shot" },
  { value: "10+", label: "Years behind the lens" },
  { value: "5.0", label: "Average client rating" },
];

function WhyUs() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetch("https://arulnode.onrender.com/api/arul/whyarul")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load image");
        return res.json();
      })
      .then((data) => setPhoto(data[0]))
      .catch(() => setPhoto(null));
  }, []);

  return (
    <section className="whyus">
      <Reveal direction="left" className="whyus-media">
        {photo && <img src={photo.img} alt="Candid moment from an Arul Photography wedding" />}
        <div className="whyus-media-frame" />
      </Reveal>

      <Reveal direction="up" delay={100} className="whyus-copy">
        <p className="eyebrow-label">Why Arul Photography</p>
        <h2>Lasting memories, told through soulful imagery</h2>
        <p className="whyus-text">
          We bring creativity, patience and technical precision to every wedding we shoot. From
          candid portraits to cinematic films, each frame is chosen to hold the feeling of the day,
          not just the look of it — delivered on time, and shaped around your family and traditions.
        </p>
        <Link to="/about" className="whyus-link">
          Learn more about us
        </Link>

        <div className="whyus-stats">
          {stats.map((stat) => (
            <div className="whyus-stat" key={stat.label}>
              <span className="whyus-stat-value">{stat.value}</span>
              <span className="whyus-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default WhyUs;