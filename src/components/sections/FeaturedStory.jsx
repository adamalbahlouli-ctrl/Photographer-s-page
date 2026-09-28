import { Link } from 'react-router-dom'
import { IMAGES } from '../../data/portfolio'
import ScrollReveal from '../ui/ScrollReveal'
import './FeaturedStory.css'

export default function FeaturedStory() {
  return (
    <section className="featured-story section section--dark" aria-label="Featured Story">
      <div className="container">
        <div className="featured-story__grid">
          <ScrollReveal className="featured-story__image-wrap">
            <img
              src={IMAGES.img4}
              alt="Cinematic editorial moment captured by Carmela Sherwood"
              className="featured-story__image"
              loading="lazy"
            />
            <div className="featured-story__image-tag">
              <span>EDITORIAL ARCHIVE — SERIES IV</span>
            </div>
          </ScrollReveal>

          <div className="featured-story__content">
            <ScrollReveal delay={0.1}>
              <span className="label label--accent">SELECTED ESSAY</span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2 className="featured-story__heading">
                ONE MOMENT.<br />
                ONE STORY.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <blockquote className="featured-story__quote">
                “Some photographs are remembered because of what they show.
                Others because they bring you back to exactly how you felt.”
              </blockquote>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="featured-story__body">
                In every session, there is an unscripted second where posture softens, 
                guard drops, and authentic human resonance surfaces without pretense. 
                Our editorial storytelling captures that exact threshold — timeless, 
                tender, and completely free of artificial performance.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="featured-story__actions">
                <Link to="/portfolio" className="featured-story__cta">
                  VIEW THE STORY
                  <span className="featured-story__arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
