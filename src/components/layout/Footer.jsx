import { Link } from 'react-router-dom'
import './Footer.css'

const footerNav = [
  { to: '/portfolio', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <Link to="/" className="footer__wordmark">
                <span className="footer__name">CARMELA SHERWOOD</span>
                <span className="footer__descriptor">PHOTOGRAPHER / VISUAL STORYTELLER</span>
              </Link>
              <p className="footer__tagline">
                Photography with intention — portraits, weddings, editorial stories and authentic visual moments.
              </p>
              <Link to="/booking" className="footer__cta">
                BOOK A SESSION
              </Link>
            </div>

            {/* Navigation */}
            <div className="footer__col">
              <span className="footer__col-label">NAVIGATE</span>
              <nav aria-label="Footer navigation">
                {footerNav.map((link) => (
                  <Link key={link.to} to={link.to} className="footer__nav-link">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <span className="footer__col-label">CONTACT</span>
              <div className="footer__contact">
                <a href="mailto:hello@carmelasherwood.com" className="footer__contact-link">
                  hello@carmelasherwood.com
                </a>
                <a
                  href="https://instagram.com/carmelasherwood.photo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__contact-link"
                >
                  @carmelasherwood.photo
                </a>
                <span className="footer__contact-text">Available for commissions worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p className="footer__copy">
              © 2026 Carmela Sherwood — Demo Website
            </p>
            <p className="footer__demo-note">
              This is a demonstration website. All content, contact details and testimonials are fictional.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
