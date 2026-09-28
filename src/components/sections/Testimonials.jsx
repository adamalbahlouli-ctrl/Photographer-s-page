import { useState } from 'react'
import { testimonials } from '../../data/testimonials'
import ScrollReveal from '../ui/ScrollReveal'
import './Testimonials.css'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const current = testimonials[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const handleDotClick = (idx) => {
    setCurrentIndex(idx)
  }

  return (
    <section className="testimonials section" aria-label="Client Testimonials">
      <div className="container container--narrow">
        {/* Section Header */}
        <ScrollReveal className="testimonials__header">
          <span className="label label--accent">WORDS OF APPRECIATION</span>
          <h2 className="sr-only">Words of Appreciation</h2>
        </ScrollReveal>

        {/* Carousel Container */}
        <div className="testimonials__carousel" role="region" aria-roledescription="carousel">
          <div className="testimonials__quote-container" aria-live="polite">
            <span className="testimonials__quote-mark font-serif" aria-hidden="true">&ldquo;</span>
            <blockquote className="testimonials__quote font-serif">
              {current.quote}
            </blockquote>

            <div className="testimonials__meta">
              <cite className="testimonials__author">
                &mdash; {current.author}
              </cite>
              <span className="testimonials__separator" aria-hidden="true">&bull;</span>
              <span className="testimonials__context">{current.context}</span>
              {current.isDemo && (
                <span className="testimonials__demo-badge" title="Demo content">
                  Demo Testimonial
                </span>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="testimonials__controls">
            <button
              type="button"
              className="testimonials__arrow testimonials__arrow--prev"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="testimonials__dots" role="tablist" aria-label="Testimonial slides">
              {testimonials.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`testimonials__dot ${idx === currentIndex ? 'is-active' : ''}`}
                  onClick={() => handleDotClick(idx)}
                />
              ))}
            </div>

            <button
              type="button"
              className="testimonials__arrow testimonials__arrow--next"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
