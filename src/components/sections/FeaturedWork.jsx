import { useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolioItems } from '../../data/portfolio'
import ScrollReveal from '../ui/ScrollReveal'
import LightboxModal from '../ui/LightboxModal'
import './FeaturedWork.css'

export default function FeaturedWork() {
  const [lightboxItem, setLightboxItem] = useState(null)

  const featured = portfolioItems.slice(0, 5)

  function openLightbox(item) {
    setLightboxItem(item)
  }

  function closeLightbox() {
    setLightboxItem(null)
  }

  function navigateLightbox(dir) {
    const idx = featured.findIndex((i) => i.id === lightboxItem?.id)
    const next = featured[idx + dir]
    if (next) setLightboxItem(next)
  }

  return (
    <>
      <section className="featured-work section section--cream">
        <div className="container">
          <ScrollReveal className="featured-work__header">
            <span className="label">SELECTED WORK</span>
            <h2 className="featured-work__title heading-2">Selected Work</h2>
            <p className="featured-work__sub body-large">
              A collection of stories, portraits and moments captured with intention.
            </p>
          </ScrollReveal>

          {/* Asymmetric masonry grid */}
          <div className="featured-work__grid">
            {/* Large dominant — img 1 */}
            <ScrollReveal className="featured-work__item featured-work__item--large">
              <button
                className="featured-work__card"
                onClick={() => openLightbox(featured[0])}
                aria-label={`View story: ${featured[0].title}`}
              >
                <div className="featured-work__img-wrap">
                  <img
                    src={featured[0].image}
                    alt={featured[0].alt}
                    className="featured-work__img"
                    loading="lazy"
                  />
                  <div className="featured-work__hover-overlay">
                    <span className="featured-work__category">{featured[0].category}</span>
                    <h3 className="featured-work__item-title">{featured[0].title}</h3>
                    <span className="featured-work__view">VIEW STORY</span>
                  </div>
                </div>
              </button>
            </ScrollReveal>

            {/* Right column stacked */}
            <div className="featured-work__col">
              {/* img 2 */}
              <ScrollReveal className="featured-work__item featured-work__item--medium" delay={0.1}>
                <button
                  className="featured-work__card"
                  onClick={() => openLightbox(featured[1])}
                  aria-label={`View story: ${featured[1].title}`}
                >
                  <div className="featured-work__img-wrap">
                    <img
                      src={featured[1].image}
                      alt={featured[1].alt}
                      className="featured-work__img"
                      loading="lazy"
                    />
                    <div className="featured-work__hover-overlay">
                      <span className="featured-work__category">{featured[1].category}</span>
                      <h3 className="featured-work__item-title">{featured[1].title}</h3>
                      <span className="featured-work__view">VIEW STORY</span>
                    </div>
                  </div>
                </button>
              </ScrollReveal>

              {/* img 3 */}
              <ScrollReveal className="featured-work__item featured-work__item--medium" delay={0.2}>
                <button
                  className="featured-work__card"
                  onClick={() => openLightbox(featured[2])}
                  aria-label={`View story: ${featured[2].title}`}
                >
                  <div className="featured-work__img-wrap">
                    <img
                      src={featured[2].image}
                      alt={featured[2].alt}
                      className="featured-work__img"
                      loading="lazy"
                    />
                    <div className="featured-work__hover-overlay">
                      <span className="featured-work__category">{featured[2].category}</span>
                      <h3 className="featured-work__item-title">{featured[2].title}</h3>
                      <span className="featured-work__view">VIEW STORY</span>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            </div>

            {/* Wide bottom — img 4 */}
            <ScrollReveal className="featured-work__item featured-work__item--wide" delay={0.15}>
              <button
                className="featured-work__card"
                onClick={() => openLightbox(featured[3])}
                aria-label={`View story: ${featured[3].title}`}
              >
                <div className="featured-work__img-wrap">
                  <img
                    src={featured[3].image}
                    alt={featured[3].alt}
                    className="featured-work__img"
                    loading="lazy"
                  />
                  <div className="featured-work__hover-overlay">
                    <span className="featured-work__category">{featured[3].category}</span>
                    <h3 className="featured-work__item-title">{featured[3].title}</h3>
                    <span className="featured-work__view">VIEW STORY</span>
                  </div>
                </div>
              </button>
            </ScrollReveal>

            {/* Portrait — img 5 */}
            <ScrollReveal className="featured-work__item featured-work__item--portrait" delay={0.25}>
              <button
                className="featured-work__card"
                onClick={() => openLightbox(featured[4])}
                aria-label={`View story: ${featured[4].title}`}
              >
                <div className="featured-work__img-wrap">
                  <img
                    src={featured[4].image}
                    alt={featured[4].alt}
                    className="featured-work__img"
                    loading="lazy"
                  />
                  <div className="featured-work__hover-overlay">
                    <span className="featured-work__category">{featured[4].category}</span>
                    <h3 className="featured-work__item-title">{featured[4].title}</h3>
                    <span className="featured-work__view">VIEW STORY</span>
                  </div>
                </div>
              </button>
            </ScrollReveal>
          </div>

          <ScrollReveal className="featured-work__footer">
            <Link to="/portfolio" className="featured-work__all-link">
              VIEW ALL WORK
              <span className="featured-work__all-line" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {lightboxItem && (
        <LightboxModal
          item={lightboxItem}
          items={featured}
          onClose={closeLightbox}
          onPrev={() => navigateLightbox(-1)}
          onNext={() => navigateLightbox(1)}
        />
      )}
    </>
  )
}
