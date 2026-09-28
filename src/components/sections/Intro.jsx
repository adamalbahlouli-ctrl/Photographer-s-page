import { Link } from 'react-router-dom'
import { IMAGES } from '../../data/portfolio'
import ScrollReveal from '../ui/ScrollReveal'
import './Intro.css'

export default function Intro() {
  return (
    <section className="intro section">
      <div className="container">
        <div className="intro__grid">
          {/* Image side */}
          <ScrollReveal className="intro__image-col">
            <div className="intro__image-wrap">
              <img
                src={IMAGES.img2}
                alt="Carmela Sherwood — intimate photography with natural light"
                className="intro__image"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Text side */}
          <div className="intro__text-col">
            <ScrollReveal>
              <span className="label label--accent">THE APPROACH</span>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h2 className="intro__heading">
                "Photography is not simply about seeing.
                It is about remembering how something felt."
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="divider" />
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="intro__body">
                Carmela Sherwood creates photographs with a quiet, editorial approach — focusing on
                natural emotion, thoughtful composition and the small details that make each story
                personal. Every session is shaped around you, your environment and the moments that
                are worth remembering.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Link to="/about" className="intro__cta">
                DISCOVER CARMELA
                <span className="intro__cta-line" aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
