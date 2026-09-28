import { useState, useEffect, useCallback } from 'react'
import { journalPosts } from '../data/journal'
import { IMAGES } from '../data/portfolio'
import ScrollReveal from '../components/ui/ScrollReveal'
import Button from '../components/ui/Button'
import './JournalPage.css'

const ESSAY_CONTENT = {
  'art-of-natural-portraits': {
    image: IMAGES.img1,
    body: [
      "The best portrait photographs are rarely the most technically flawless. Instead, they are the ones that carry something authentic of the person in front of the lens — a quality that no amount of cosmetic retouching or artificial lighting can manufacture.",
      "When someone steps in front of a camera, their immediate impulse is often defensive. We are conditioned to 'pose,' to present a curated version of ourselves designed for approval. My role during a portrait session is not to demand performance, but to dissolve that tension. We talk about the weather, childhood memories, or nothing at all. We let the quiet do the work.",
      "Natural portraiture requires genuine patience. When you wait through the awkward pauses, past the initial stiff smile, you witness the shoulders drop. The eyes soften. A fleeting expression emerges — a private thought passing across their face. That singular fraction of a second is where truth lives.",
      "To photograph someone honestly is to give them permission to be seen without performance."
    ]
  },
  'why-light-matters': {
    image: IMAGES.img4,
    body: [
      "Light is not merely illumination. In photography, light is time, atmosphere, and raw emotion. Understanding how to collaborate with natural light — rather than fighting it — changes everything about the story an image tells.",
      "Morning light has a crisp, inquisitive clarity. It cuts clean contours and paints the world with calm optimism. Late afternoon light, on the other hand, is heavy with memory and romance; its long golden rake across skin creates warm intimacy that words struggle to replicate.",
      "Throughout my work, I deliberately seek out directional window light and diffused shade. I love the way high-contrast light carves out mystery, while soft ambient illumination gently wraps around a subject. When we respect how photons fall, we elevate an ordinary room into an indelible cinematic frame."
    ]
  },
  'quiet-wedding-in-autumn': {
    image: IMAGES.img2,
    body: [
      "There is something profoundly peaceful about an autumn celebration — the golden honey tone of the low sun, the crisp whisper of dry leaves underfoot, and the lingering sense that summer has finally released its hold.",
      "Elena and Thomas chose a secluded orchard surrounded by old stone barns. There was no grand spectacle, no choreographed grand entrance for social media. Just twenty close friends and family, warm wool blankets, and heartfelt vows spoken in the quiet breeze.",
      "Documenting an intimate wedding requires a documentary mindset: moving quietly, anticipating glances, and knowing when to step back completely. When looking through these frames, you don't just see what the day looked like — you feel the exact temperature of that afternoon."
    ]
  },
  'behind-the-frame': {
    image: IMAGES.img3,
    body: [
      "The photograph is only ever a fraction of the story. The rest lives in the liminal spaces — the quiet conversation before the first click of the shutter, the shared tea, the moment of vulnerability when a client realizes they are completely safe.",
      "Over the years, I have learned that great photographs happen because of trust. When a client trusts that their wrinkles, their quirks, or their quiet reservations are welcomed as beauty, magic occurs.",
      "Photography is an act of reciprocity. I bring my technical discipline and visual intuition; you bring your genuine self. In the harmony between the two, we make something that lasts."
    ]
  }
}

export default function JournalPage() {
  const [activeArticle, setActiveArticle] = useState(null)

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') setActiveArticle(null)
    },
    []
  )

  useEffect(() => {
    if (activeArticle) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeArticle, handleKeyDown])

  return (
    <div className="journal-page">
      {/* Header Banner */}
      <section className="journal-header section section--cream">
        <div className="container container--narrow text-center">
          <ScrollReveal>
            <span className="label label--accent">THOUGHTS & STORIES</span>
            <h1 className="journal-header__title heading-1">JOURNAL</h1>
            <div className="divider divider--center" />
            <p className="journal-header__subtitle body-large">
              Reflections on photography, light, intimacy, and the craft of visual storytelling.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="journal-grid-section section">
        <div className="container">
          <div className="journal-grid">
            {journalPosts.map((post, index) => {
              const essay = ESSAY_CONTENT[post.slug]
              return (
                <ScrollReveal
                  key={post.id}
                  delay={index * 0.1}
                  className="journal-card-wrapper"
                >
                  <article className="journal-card">
                    {essay?.image && (
                      <div className="journal-card__image-wrap">
                        <img
                          src={essay.image}
                          alt={post.title}
                          className="journal-card__image"
                          loading="lazy"
                        />
                        <span className="journal-card__category label">
                          {post.category}
                        </span>
                      </div>
                    )}
                    <div className="journal-card__content">
                      <div className="journal-card__meta">
                        <span className="journal-card__date">{post.date}</span>
                        <span className="journal-card__dot" aria-hidden="true">•</span>
                        <span className="journal-card__read-time">{post.readTime}</span>
                      </div>

                      <h2 className="journal-card__title heading-3">
                        {post.title}
                      </h2>

                      <p className="journal-card__excerpt body-base">
                        {post.excerpt}
                      </p>

                      <div className="journal-card__action">
                        <button
                          type="button"
                          className="journal-card__read-btn"
                          onClick={() => setActiveArticle({ ...post, ...essay })}
                        >
                          <span>READ STORY</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="journal-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
          onClick={(e) => e.target === e.currentTarget && setActiveArticle(null)}
        >
          <div className="journal-modal__inner">
            <button
              className="journal-modal__close"
              onClick={() => setActiveArticle(null)}
              aria-label="Close story reader"
            >
              <span aria-hidden="true">✕</span>
            </button>

            <article className="journal-modal__article">
              <header className="journal-modal__header">
                <div className="journal-modal__meta">
                  <span className="label label--accent">{activeArticle.category}</span>
                  <span className="journal-modal__date">{activeArticle.date}</span>
                  <span className="journal-modal__time">{activeArticle.readTime}</span>
                </div>
                <h1 id="modal-article-title" className="journal-modal__title heading-2">
                  {activeArticle.title}
                </h1>
                <div className="divider" />
              </header>

              {activeArticle.image && (
                <div className="journal-modal__feature-img-wrap">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="journal-modal__feature-img"
                  />
                </div>
              )}

              <div className="journal-modal__body body-large">
                {activeArticle.body?.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <footer className="journal-modal__footer">
                <div className="journal-modal__author">
                  <span className="label">WRITTEN BY</span>
                  <p className="font-serif journal-modal__author-name">Carmela Sherwood</p>
                  <p className="body-base journal-modal__author-bio">
                    Photographer exploring light, honest intimacy, and timeless perspective.
                  </p>
                </div>
                <div className="journal-modal__actions">
                  <Button variant="secondary" onClick={() => setActiveArticle(null)}>
                    CLOSE STORY
                  </Button>
                  <Button to="/booking" variant="primary">
                    BOOK A SESSION
                  </Button>
                </div>
              </footer>
            </article>
          </div>
        </div>
      )}
    </div>
  )
}
