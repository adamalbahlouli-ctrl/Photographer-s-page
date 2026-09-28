import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import './Header.css'

const navLinks = [
  { to: '/portfolio', label: 'WORK' },
  { to: '/about', label: 'ABOUT' },
  { to: '/services', label: 'SERVICES' },
  { to: '/journal', label: 'JOURNAL' },
  { to: '/contact', label: 'CONTACT' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const headerClass = [
    'header',
    scrolled || !isHome ? 'header--solid' : 'header--transparent',
    menuOpen ? 'header--menu-open' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <header className={headerClass} role="banner">
        <div className="header__inner">
          {/* Wordmark */}
          <Link to="/" className="header__wordmark" aria-label="Carmela Sherwood — Home">
            <span className="header__wordmark-name">CARMELA SHERWOOD</span>
            <span className="header__wordmark-title">PHOTOGRAPHER</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header__nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="header__actions">
            <Link
              to="/booking"
              className="header__cta"
              aria-label="Book a photography session"
            >
              BOOK A SESSION
            </Link>
            <button
              className="header__menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="header__menu-icon">
                <span className={`header__menu-line ${menuOpen ? 'header__menu-line--open' : ''}`} />
                <span className={`header__menu-line ${menuOpen ? 'header__menu-line--open' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        navLinks={navLinks}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}
