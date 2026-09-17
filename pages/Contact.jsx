import { useEffect } from "react";
import "./style/Contact.css";

const PHONE_NUMBER = "6385407797";
const PHONE_DISPLAY = "+91 63854 07797";

const WHATSAPP_MESSAGE =
  "Hi Arul Photography, I'd like to know more about your shoots.";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const callHref = `tel:+91${PHONE_NUMBER}`;

  const whatsappHref = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <main className="contact-page">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="contact-hero">
        <span className="contact-kicker">Get In Touch</span>

        <h1 className="contact-title">
          Let&rsquo;s Create <em>Something Timeless</em>
        </h1>

        <p className="contact-subtitle">
          Reach out directly — a quick call or a message on WhatsApp is the
          fastest way to talk dates, packages, and ideas.
        </p>
      </section>

      {/* =====================================================
          PRIMARY ACTIONS
      ====================================================== */}
      <section className="contact-actions">
        {/* ---------------- CALL ---------------- */}
        <a href={callHref} className="action-card action-call">
          <span className="action-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.6c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="action-text">
            <span className="action-label">Call Now</span>
            <span className="action-value">{PHONE_DISPLAY}</span>
          </div>

          <span className="action-arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>

        {/* ---------------- WHATSAPP ---------------- */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="action-card action-whatsapp"
        >
          <span className="action-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3C7.03 3 3 7.03 3 12c0 1.7.47 3.3 1.29 4.66L3 21l4.5-1.24A8.93 8.93 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9Zm4.9 12.7c-.2.57-1.16 1.1-1.6 1.16-.42.06-.9.08-1.45-.1-.33-.1-.76-.25-1.31-.5-2.3-1-3.8-3.3-3.92-3.46-.11-.16-.94-1.25-.94-2.38 0-1.13.6-1.68.8-1.9.2-.23.45-.28.6-.28h.44c.14 0 .33-.03.5.38.2.47.68 1.63.74 1.75.06.12.1.27.02.43-.08.16-.13.26-.25.4-.13.14-.27.31-.38.42-.13.13-.26.27-.11.53.14.27.63 1.05 1.36 1.71.94.85 1.73 1.11 2 1.24.26.13.42.11.57-.07.16-.18.68-.8.86-1.07.18-.28.36-.23.6-.14.25.1 1.58.75 1.85.88.27.14.45.2.52.32.07.12.07.68-.13 1.25Z"
                fill="currentColor"
              />
            </svg>
          </span>

          <div className="action-text">
            <span className="action-label">Chat on WhatsApp</span>
            <span className="action-value">{PHONE_DISPLAY}</span>
          </div>

          <span className="action-arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </section>

      {/* =====================================================
          DETAILS GRID
      ====================================================== */}
      <section className="contact-details">
        {/* ---------------- EMAIL ---------------- */}
        <div className="detail-card">
          <span className="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16v12H4V6Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />

              <path
                d="m4 7 8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <h3>Email</h3>

          <a href="mailto:hello@arulphotography.com">
            hello@arulphotography.com
          </a>
        </div>

        {/* ---------------- STUDIO ---------------- */}
        <div className="detail-card">
          <span className="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />

              <circle
                cx="12"
                cy="9.5"
                r="2.4"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span>

          <h3>Studio</h3>

          <p>
            No. 12, Camera Street,
            <br />
            Chennai, Tamil Nadu 600001
          </p>
        </div>

        {/* ---------------- HOURS ---------------- */}
        <div className="detail-card">
          <span className="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 7v5l3 2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="12"
                cy="12"
                r="8.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span>

          <h3>Hours</h3>

          <p>
            Mon &ndash; Sat: 10am &ndash; 8pm
            <br />
            Sunday: By appointment
          </p>
        </div>
      </section>

      {/* =====================================================
          SOCIALS
      ====================================================== */}
      <section className="contact-socials">
        <p>Follow the work</p>

        <div className="social-links">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

          <span className="social-dot" aria-hidden="true">
            &bull;
          </span>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>

          <span className="social-dot" aria-hidden="true">
            &bull;
          </span>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        </div>
      </section>
    </main>
  );
}

export default Contact;