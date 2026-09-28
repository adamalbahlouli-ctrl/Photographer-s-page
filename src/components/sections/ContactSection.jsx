import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import './ContactSection.css'

export default function ContactSection() {
  return (
    <section className="contact-section section section--dark" aria-label="Contact and Inquiry">
      <div className="container">
        <div className="contact-section__wrapper">
          {/* Main Inquiry Pitch */}
          <div className="contact-section__main">
            <ScrollReveal>
              <span className="label label--accent">LET'S TALK</span>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h2 className="contact-section__heading font-serif">
                Have an idea, a story or a moment you'd like to capture?
                <br />
                <span className="contact-section__heading-sub">I'd love to hear about it.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="divider" />
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <div className="contact-section__cta-wrap">
                <Link to="/booking" className="contact-section__cta-btn">
                  <span>START AN INQUIRY</span>
                  <span className="contact-section__arrow" aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Details & Channels */}
          <div className="contact-section__info">
            <ScrollReveal delay={0.2} className="contact-section__info-group">
              <span className="contact-section__info-label">DIRECT EMAIL</span>
              <a
                href="mailto:hello@carmelasherwood.com"
                className="contact-section__info-link font-serif"
              >
                hello@carmelasherwood.com
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="contact-section__info-group">
              <span className="contact-section__info-label">SOCIAL</span>
              <a
                href="https://instagram.com/carmelasherwood.photo"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-section__info-link font-serif"
              >
                @carmelasherwood.photo
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="contact-section__info-group">
              <span className="contact-section__info-label">BASED &amp; TRAVEL</span>
              <p className="contact-section__info-text font-serif">
                Available worldwide
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
