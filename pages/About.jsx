import { useEffect, useState } from "react";
import "./style/About.css";

function About() {
  const [aboutImages, setAboutImages] = useState([]);

  useEffect(() => {
    fetch("https://arulnode.onrender.com/api/arul/about")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch about images");
        }
        return res.json();
      })
      .then((data) => {
        setAboutImages(data);
      })
      .catch((error) => {
        console.error("About images error:", error);
      });
  }, []);

  return (
    <main className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-label">About us</span>

          <h1>
            Stories captured
            <br />
            <em>with heart.</em>
          </h1>

          <p>
            We believe every photograph has a story to tell.
            Our passion is to preserve your most beautiful
            moments and turn them into memories that last forever.
          </p>
        </div>
      </section>

      {/* Diamond Gallery with Connect Now at the centre */}
      <section className="about-gallery">
        <div className="about-diamond">

          {aboutImages.slice(0, 4).map((item, index) => (
            <div
              className={`diamond-image diamond-image-${index + 1}`}
              key={item.id}
            >
              <img
                src={item.img}
                alt={`About Arul Photography ${index + 1}`}
              />
            </div>
          ))}

          <div className="diamond-center">
            <div className="diamond-center-ring" />
            <button
              className="connect-now-btn"
              onClick={() => {
                window.location.href = "/contact";
              }}
            >
              Connect now
              <span>→</span>
            </button>
          </div>

        </div>
      </section>

      {/* About Content */}
      <section className="about-story">
        <div className="about-story-content">

          <span className="about-label">Our approach</span>

          <h2>
            Your moments.
            <br />
            <em>Our perspective.</em>
          </h2>

          <p>
            Photography is more than simply taking a picture.
            It's about capturing the emotions, the people,
            the atmosphere and all those little moments that
            make your story uniquely yours.
          </p>

          <p>
            From intimate celebrations to grand occasions,
            we focus on creating photographs that feel natural,
            timeless and genuinely you.
          </p>

          <p>
            Arul Photography began with a simple belief: the best
            pictures happen when people forget the camera is there.
            What started as a one-person passion project has grown
            into a full studio, built around honest storytelling
            rather than staged perfection. We work closely with every
            client, from the first phone call to the final delivered
            gallery, so nothing about the process feels rushed or
            impersonal.
          </p>

          <p>
            Every session begins with a conversation, not a checklist.
            We take the time to understand who you are, what feels
            natural to you, and what you'll want to look back on in
            twenty years — so the day itself feels less like a shoot
            and more like an experience shared.
          </p>

        </div>
      </section>

      {/* Highlights */}
      <section className="about-highlights">
        <div className="about-highlights-content">

          <span className="about-label">Why Arul Photography</span>

          <h2>
            Built on trust,
            <br />
            <em>shaped by craft.</em>
          </h2>

          <div className="highlights-grid">

            <div className="highlight-item">
              <strong>12+</strong>
              <p>Years spent photographing weddings, portraits and everyday milestones.</p>
            </div>

            <div className="highlight-item">
              <strong>600+</strong>
              <p>Stories told for families and couples who trusted us with their day.</p>
            </div>

            <div className="highlight-item">
              <strong>100%</strong>
              <p>Candid, documentary-style coverage — real moments over rehearsed poses.</p>
            </div>

          </div>

        </div>
      </section>

      {/* Closing CTA */}
      <section className="about-closing">
        <div className="about-closing-content">
          <h2>
            Let's create something
            <br />
            <em>beautiful together.</em>
          </h2>

          <p>
            Have a date in mind, or just curious how we work?
            We'd love to hear about it.
          </p>

          <button
            className="connect-now-btn"
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            Connect now
            <span>→</span>
          </button>
        </div>
      </section>

    </main>
  );
}

export default About;