import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style/Connect.css";

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

function Connect() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetch("https://arulnode.onrender.com/api/arul/touch")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load image");
        return res.json();
      })
      .then((data) => setPhoto(data[0]))
      .catch(() => setPhoto(null));
  }, []);

  return (
    <section className="connect" style={photo ? { backgroundImage: `url(${photo.img})` } : undefined}>
      <div className="connect-scrim" />
      <div className="connect-content">
        <p className="eyebrow-label">Get In Touch</p>
        <h2>Let's connect</h2>
        <p className="connect-text">
          I'd love to hear about your day and help you create memories that last a lifetime.
        </p>
        <Link to="/contact" className="connect-btn">
          Get in touch
        </Link>

        <div className="connect-socials">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Connect;