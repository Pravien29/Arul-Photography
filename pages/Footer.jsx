import { Link } from "react-router-dom";
import "./style/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-columns">
        <div className="footer-brand">
          <span className="brand-text">
            Arul <em>Photography</em>
          </span>
          <p>
            Capturing life's most beautiful moments with creativity, patience and purpose.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" aria-label="Instagram">IG</a>
            <a href="https://facebook.com" aria-label="Facebook">FB</a>
            <a href="https://youtube.com" aria-label="YouTube">YT</a>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/wedding-films">Wedding Films</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            <li>Wedding Photography</li>
            <li>Pre-Wedding Shoots</li>
            <li>Portraits &amp; Engagement</li>
            <li>Wedding Films</li>
            <li>Photo Editing</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="contact-list">
            <li>Chennai, Tamil Nadu, India</li>
            <li><a href="tel:+91 6385407797">+91 63854 07797</a></li>
            <li><a href="mailto:hello@arulphotography.com">hello@arulphotography.com</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Arul Photography. All rights reserved.</span>
        <span>
          <Link to="/privacy">Privacy Policy</Link> &nbsp;·&nbsp; <Link to="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;