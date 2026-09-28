import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGES } from '../../data/portfolio'
import './Hero.css'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const img = new Image()
    img.src = IMAGES.img1
    img.onload = () => setLoaded(true)
    img.onerror = () => setLoaded(true) // Still show on error
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        if (rect.bottom > 0) {
          setScrollY(window.scrollY * 0.35)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero" ref={heroRef} aria-label="Hero — Carmela Sherwood Photography">
      {/* Background image */}
      <div className="hero__image-wrap">
        <img
          src={IMAGES.img1}
          alt="Carmela Sherwood Photography — portrait in warm natural light"
          className={`hero__image ${loaded ? 'hero__image--loaded' : ''}`}
          style={{ transform: `translateY(${scrollY}px)` }}
          fetchpriority="high"
        />
        <div className="hero__overlay" />
      </div>

      {/* Content */}
      <div className="hero__content">
        <div className={`hero__text-block ${loaded ? 'hero__text-block--visible' : ''}`}>
          <span className="hero__eyebrow">PHOTOGRAPHER & VISUAL STORYTELLER</span>
          <h1 className="hero__heading">
            <span className="hero__heading-line">CARMELA</span>
            <span className="hero__heading-line hero__heading-line--serif">SHERWOOD</span>
          </h1>
          <p className="hero__quote">
            "Images that hold the feeling of a moment."
          </p>
          <p className="hero__sub">
            Portraits, weddings, editorial stories and intimate moments —<br className="hero__br" />
            photographed with intention, atmosphere and a timeless perspective.
          </p>
          <div className="hero__ctas">
            <Link to="/portfolio" className="hero__cta hero__cta--primary">
              VIEW MY WORK
            </Link>
            <Link to="/booking" className="hero__cta hero__cta--secondary">
              BOOK A SESSION
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <span className="hero__scroll-label">SCROLL</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </div>
    </section>
  )
}
