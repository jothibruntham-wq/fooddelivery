import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/style/style.css";

import logoImg from "../assets/images/logo.png";
import biryaniImg from "../assets/images/biryani.png";
import chawalImg from "../assets/images/chawal.png";
import chickenImg from "../assets/images/chicken.png";
import paneerImg from "../assets/images/paneer.png";

const dishes = [
  { id: 1, script: "Jeera", name: "Chawal", price: 180, old: 200, rating: 4.5, img: chawalImg, color: "green" },
  { id: 2, script: "Kadai", name: "Chicken", price: 220, old: 260, rating: 4.5, img: chickenImg, color: "orange" },
  { id: 3, script: "Palak", name: "Paneer", price: 200, old: 220, rating: 4.5, img: paneerImg, color: "green" },
];

const DESC =
  "Aromatic, soft, and tender chunks of lamb layered with rice infused with the flavors of spices...";

const Stars = ({ value = 4.5 }) => (
  <span className="stars" aria-label={`${value} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <i key={n} className={n <= Math.floor(value) ? "on" : n - 0.5 <= value ? "half" : ""}>
        ★
      </i>
    ))}
  </span>
);

const PriceBadge = ({ price, old, small }) => (
  <div className={`price-badge ${small ? "small" : ""}`}>
    <span className="pb-label">PRICE</span>
    <span className="pb-price">
      <small>₹</small>
      {price}
    </span>
    <span className="pb-old">₹{old}</span>
  </div>
);

export default function Home() {
  const [start, setStart] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 60 });
  }, []);

  // show 3 cards on desktop, rotate with arrows
  const visible = [0, 1, 2].map((i) => dishes[(start + i) % dishes.length]);
  const prev = () => setStart((s) => (s - 1 + dishes.length) % dishes.length);
  const next = () => setStart((s) => (s + 1) % dishes.length);

  return (
    <div className="kg-page">
      {/* NAVBAR */}
      <header className="kg-nav" data-aos="fade-down">
        <a className="kg-logo" href="#home">
          <img src={logoImg} alt="Biryani Mane" onError={(e) => (e.currentTarget.style.display = "none")} />
          <span>
            <b>BIRYANI MANE</b>
          </span>
        </a>

        <nav className="kg-nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#menu">Menu</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="kg-nav-right">
          <a href="tel:+919000790007" className="kg-call">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#6f8a2a" strokeWidth="2">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
            </svg>
            CALL: <strong>8904303697</strong>
          </a>
          <button className="kg-login">LOGIN</button>

          <button className="kg-burger" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="kg-hero" id="home">
        <div className="hero-img" data-aos="zoom-in" data-aos-duration="1200">
          <img src={biryaniImg} alt="Chicken Biryani" />
        </div>

        <div className="hero-info">
          <div className="hero-title" data-aos="fade-left">
            <PriceBadge price={360} old={410} />
            <span className="script">Chicken</span>
            <h1>Biryani</h1>
          </div>

          <div className="rating-row" data-aos="fade-left" data-aos-delay="150">
            <Stars value={4.5} />
            <b>4.5</b>
            <a href="#reviews">521 Reviews</a>
          </div>

          <p className="hero-desc" data-aos="fade-left" data-aos-delay="250">
            Aromatic, soft, and tender chunks of lamb layered with rice infused with the flavors of spices. The
            delicate blend of cardamom, cloves, and cinnamon creates a symphony of tastes in every bite.
          </p>

          <div className="hero-btns" data-aos="fade-up" data-aos-delay="350">
            <button className="btn-fill">ORDER NOW</button>
            <button className="btn-outline">EXPLORE MORE</button>
          </div>
        </div>
      </section>

      {/* WAVE TOP */}
      <svg className="wave wave-top" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60 C 240 0, 480 20, 720 55 S 1200 110, 1440 40 L1440 120 L0 120 Z" fill="#fff" />
      </svg>

      {/* MENU CARDS */}
      <section className="kg-menu" id="menu">
        <button className="arrow left" onClick={prev} aria-label="Previous">‹</button>

        <div className="cards">
          {visible.map((d, i) => (
            <article
              key={d.id + "-" + start}
              className={`card ${d.color}`}
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <img className="card-img" src={d.img} alt={`${d.script} ${d.name}`} />
              <PriceBadge price={d.price} old={d.old} small />
              <span className="script">{d.script}</span>
              <h2>{d.name}</h2>
              <div className="card-rating">
                <span className="pill"><Stars value={d.rating} /></span>
                <b>{d.rating}</b>
              </div>
              <p>{DESC}</p>
              <button className="btn-dark">ORDER NOW</button>
            </article>
          ))}
        </div>

        <button className="arrow right" onClick={next} aria-label="Next">›</button>
      </section>

      {/* WAVE BOTTOM */}
      <svg className="wave wave-bottom" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 50 C 300 100, 600 0, 900 40 S 1300 90, 1440 30 L1440 120 L0 120 Z" fill="#efecf1" />
      </svg>

      {/* ABOUT */}
      <section className="kg-about" id="about" data-aos="fade-up">
        <div className="about-content">
          <div className="section-header">
            <span className="script">Our Story</span>
            <h1>Biryani Mane About Us</h1>
          </div>
          <p className="about-intro">
            Welcome to Biryani Mane, where every bite brings you the authentic taste of traditional Indian biryani!
          </p>
          <p className="about-text">
            At Biryani Mane, we believe that great food brings people together. Our biryani is prepared using premium-quality basmati rice, fresh ingredients, handpicked spices, and traditional cooking methods.
          </p>
          <p className="about-text">
            Our passion is to deliver delicious, flavourful, and aromatic biryani that makes every meal special. From spicy chicken biryani to delicious mutton and vegetarian varieties, we serve happiness on every plate.
          </p>

          <div className="about-grid">
            <div className="about-card" data-aos="fade-up" data-aos-delay="100">
              <h3>Our Mission</h3>
              <ul>
                <li>To serve authentic and delicious biryani.</li>
                <li>To maintain high-quality ingredients and hygiene.</li>
                <li>To provide excellent customer service.</li>
                <li>To make every customer happy with our food.</li>
              </ul>
            </div>

            <div className="about-card" data-aos="fade-up" data-aos-delay="200">
              <h3>Why Choose Biryani Mane?</h3>
              <ul>
                <li>Authentic traditional taste.</li>
                <li>Freshly prepared food.</li>
                <li>Premium-quality ingredients.</li>
                <li>Affordable prices.</li>
                <li>Friendly service and quick delivery.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="kg-contact" id="contact" data-aos="fade-up">
        <div className="contact-content">
          <div className="section-header">
            <span className="script">Get in Touch</span>
            <h1>Contact Us</h1>
          </div>
          <p className="contact-intro">
            We'd Love to Hear From You!
          </p>
          <p className="contact-subtext">
            Have questions, feedback, or want to enjoy our delicious biryani? Get in touch with Biryani Mane. We are always happy to serve you!
          </p>

          <div className="contact-grid">
            <div className="contact-details" data-aos="fade-right">
              <h3>Our Contact Details</h3>
              <ul>
                <li>
                  <strong>Address:</strong>
                  <span>Biryani Mane, Tamil Nadu, India</span>
                </li>
                <li>
                  <strong>Phone:</strong>
                  <a href="tel:+919876543210">+91 8904303697</a>
                </li>
                <li>
                  <strong>Email:</strong>
                  <a href="mailto:biryanimane@gmail.com">biryanimane@gmail.com</a>
                </li>
                <li>
                  <strong>Opening Hours:</strong>
                  <span>Monday – Sunday, 11:00 AM – 11:00 PM</span>
                </li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()} data-aos="fade-left">
              <h3>Send a Message</h3>
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" />
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Your Message" rows="4" required></textarea>
              <button type="submit" className="btn-fill">SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="kg-footer" data-aos="fade-up">
        <div className="socials">
          {["f", "p", "t", "i"].map((s) => (
            <a key={s} href="#home" aria-label={s}>{s}</a>
          ))}
        </div>
        <nav>
          {["Home", "About Us", "Menu", "Blog", "Contact", "Return Policy"].map((l, i, a) => (
            <React.Fragment key={l}>
              <a href="#home">{l}</a>
              {i < a.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </nav>
        <p>Copyright © 2010-2024 Biryani Mane. All rights reserved.</p>
      </footer>
    </div>
  );
}
