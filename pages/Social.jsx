import { useEffect, useState } from "react";
import "./style/Social.css";

function Social() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://arulnode.onrender.com/api/arul/social")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load social feed");
        return res.json();
      })
      .then((data) => setPhotos(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="social-section">
      <div className="social-strip">
        {photos.map((photo) => (
          <div className="social-tile" key={photo.id}>
            <img src={photo.img} alt="Instagram post" />
            <span className="social-tile-icon">📷</span>
          </div>
        ))}
      </div>

      <div className="social-info">
        <p className="eyebrow">Follow Our Journey</p>
        <h3>@shuttermaze</h3>
        {error && <p className="social-error">{error}</p>}
        <a href="https://instagram.com/shuttermaze" className="social-link">
          📷 Follow us on Instagram for daily inspiration →
        </a>
      </div>
    </section>
  );
}

export default Social;