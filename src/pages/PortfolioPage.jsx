import { useState, useMemo } from 'react'
import { portfolioItems, categories } from '../data/portfolio'
import LightboxModal from '../components/ui/LightboxModal'
import ScrollReveal from '../components/ui/ScrollReveal'
import Button from '../components/ui/Button'
import './PortfolioPage.css'

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxItem, setLightboxItem] = useState(null)

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return portfolioItems
    return portfolioItems.filter((item) => item.categorySlug === activeCategory)
  }, [activeCategory])

  const openLightbox = (item) => {
    setLightboxItem(item)
  }

  const closeLightbox = () => {
    setLightboxItem(null)
  }

  const navigateLightbox = (dir) => {
    const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem?.id)
    if (currentIndex === -1) return
    const nextIndex = currentIndex + dir
    if (nextIndex >= 0 && nextIndex < filteredItems.length) {
      setLightboxItem(filteredItems[nextIndex])
    }
  }

  return (
    <div className="portfolio-page">
      {/* Header Banner */}
      <section className="portfolio-header section section--cream">
        <div className="container container--narrow text-center">
          <ScrollReveal>
            <span className="label label--accent">SELECTED ARCHIVE</span>
            <h1 className="portfolio-header__title heading-1">PORTFOLIO</h1>
            <div className="divider divider--center" />
            <p className="portfolio-header__subtitle body-large">
              A curated selection of work spanning portraits, weddings, editorial assignments, and intimate stories.
            </p>
          </ScrollReveal>

          {/* Filter Categories Tabs */}
          <ScrollReveal delay={0.15}>
            <div className="portfolio-filter" role="tablist" aria-label="Portfolio category filter">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.value
                const count = cat.value === 'all'
                  ? portfolioItems.length
                  : portfolioItems.filter(i => i.categorySlug === cat.value).length

                return (
                  <button
                    key={cat.value}
                    role="tab"
                    aria-selected={isActive}
                    className={`portfolio-filter__tab ${isActive ? 'portfolio-filter__tab--active' : ''}`}
                    onClick={() => setActiveCategory(cat.value)}
                  >
                    <span>{cat.label}</span>
                    <span className="portfolio-filter__count">({count})</span>
                  </button>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="portfolio-gallery section">
        <div className="container">
          {filteredItems.length === 0 ? (
            <div className="portfolio-empty">
              <p className="portfolio-empty__title heading-3">No works currently listed</p>
              <p className="portfolio-empty__text body-base">
                New series are currently being curated for this collection. Please check back soon or browse all projects.
              </p>
              <Button variant="secondary" onClick={() => setActiveCategory('all')}>
                VIEW ALL PROJECTS
              </Button>
            </div>
          ) : (
            <div className="portfolio-grid">
              {filteredItems.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className={`portfolio-card portfolio-card--${item.size || 'medium'}`}
                  >
                    <button
                      type="button"
                      className="portfolio-card__inner"
                      onClick={() => openLightbox(item)}
                      aria-label={`Open photo view: ${item.title}`}
                    >
                      <div className="portfolio-card__img-container">
                        <img
                          src={item.image}
                          alt={item.alt}
                          loading="lazy"
                          className="portfolio-card__img"
                        />
                        <div className="portfolio-card__overlay">
                          <span className="portfolio-card__overlay-btn">
                            VIEW PHOTOGRAPH
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="portfolio-card__meta">
                        <div className="portfolio-card__info">
                          <span className="portfolio-card__category label">{item.category}</span>
                          <h3 className="portfolio-card__title heading-3">{item.title}</h3>
                        </div>
                        <p className="portfolio-card__desc body-base">{item.description}</p>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="portfolio-cta">
            <ScrollReveal>
              <div className="portfolio-cta__box">
                <span className="label label--accent">HAVE A PROJECT IN MIND?</span>
                <h2 className="portfolio-cta__title heading-2">Let’s discuss your vision</h2>
                <p className="portfolio-cta__text body-large">
                  Every project begins with understanding your story and what you wish to hold onto.
                </p>
                <Button to="/booking" variant="primary" size="lg">
                  INQUIRE ABOUT A SESSION
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <LightboxModal
          item={lightboxItem}
          items={filteredItems}
          onClose={closeLightbox}
          onPrev={() => navigateLightbox(-1)}
          onNext={() => navigateLightbox(1)}
        />
      )}
    </div>
  )
}
