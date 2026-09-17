import  { useState } from "react";
import "./style/Booking.css";
import bgImage from "../public/images/img11.jpeg";

const API_BASE = "https://arulnode.onrender.com/api/arul";

const EVENT_TYPES = ["Wedding", "Pre-Wedding", "Birthday", "Portrait", "Others"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  eventType: EVENT_TYPES[0],
  date: "",
  location: "",
  message: "",
};

export default function Booking() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.date) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and preferred date.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, createdAt: new Date().toISOString() }),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        `Couldn't send your request — ${err.message}. Is json-server running on port 3001?`
      );
    }
  };

  return (
    <section className="booking-page">
      <img src={bgImage} alt="" className="booking-bg" />
      <div className="booking-scrim" />

      <div className="booking-layout">
        <div className="booking-intro">
          <span className="booking-eyebrow">Arul Photography</span>
          <h1>
            Let's plan
            <br />
            your day
          </h1>
          <p>
            Tell us a little about the occasion and we'll get back to you
            within 24 hours with availability and a tailored package.
          </p>

          <ul className="booking-highlights">
            <li>Weddings, pre-wedding, portraits &amp; birthdays</li>
            <li>Full-day and half-day coverage available</li>
            <li>Edited gallery delivered within 3 weeks</li>
          </ul>
        </div>

        <form className="booking-card" onSubmit={handleSubmit} noValidate>
          <h2>Request a booking</h2>

          <div className="booking-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="booking-row">
            <div className="booking-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="booking-field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 90000 00000"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="booking-row">
            <div className="booking-field">
              <label htmlFor="eventType">Event type</label>
              <select
                id="eventType"
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="booking-field">
              <label htmlFor="date">Preferred date</label>
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="booking-field">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Venue or city"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div className="booking-field">
            <label htmlFor="message">Tell us about your day</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Guest count, timings, must-have shots…"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {status === "error" && (
            <p className="booking-status booking-status-error">{errorMsg}</p>
          )}
          {status === "success" && (
            <p className="booking-status booking-status-success">
              Thank you — your request has been sent. We'll be in touch
              shortly.
            </p>
          )}

          <button
            type="submit"
            className="booking-submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Request Booking"}
          </button>
        </form>
      </div>
    </section>
  );
}