import { Link } from 'react-router-dom'
import './MobileMenu.css'

export default function MobileMenu({ isOpen, navLinks, onClose }) {
  return (
    <div
      id="mobile-menu"
      className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="mobile-menu__inner">
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="mobile-menu__link"
              onClick={onClose}
              style={{ '--delay': `${i * 0.08}s` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu__bottom">
          <Link
            to="/booking"
            className="mobile-menu__cta"
            onClick={onClose}
          >
            BOOK A SESSION
          </Link>
          <div className="mobile-menu__contact">
            <a href="mailto:hello@carmelasherwood.com" className="mobile-menu__email">
              hello@carmelasherwood.com
            </a>
            <a
              href="https://instagram.com/carmelasherwood.photo"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu__social"
            >
              @carmelasherwood.photo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
