import { IMAGES } from '../data/portfolio'
import ScrollReveal from '../components/ui/ScrollReveal'
import Button from '../components/ui/Button'
import Process from '../components/sections/Process'
import './AboutPage.css'

const CORE_VALUES = [
  {
    title: 'NATURAL LIGHT & ATMOSPHERE',
    description:
      'I work almost exclusively with available natural light — morning glow, diffuse window light, and the amber quiet of late afternoons. Light dictates the mood, creating honest dimension without artificial intrusion.',
  },
  {
    title: 'PATIENCE & PRESENCE',
    description:
      'Meaningful photographs cannot be hurried. My sessions are unhurried spaces where you have permission to breathe, settle in, and forget the presence of the lens.',
  },
  {
    title: 'TIMELESS TONALITY',
    description:
      'Color grading is treated with subtle discipline. I prioritize authentic skin tones, organic midtones, and delicate shadow detail that will look as true thirty years from now as it does today.',
  },
  {
    title: 'HUMAN CONNECTION',
    description:
      'Technical mastery is secondary to emotional perception. The most resonant image is always the one that captures an honest expression or an unspoken feeling between people.',
  },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Editorial Split Hero */}
      <section className="about-hero section">
        <div className="container">
          <div className="about-hero__grid">
            {/* Left: Portrait of Carmela */}
            <ScrollReveal className="about-hero__image-col">
              <div className="about-hero__image-frame">
                <div className="about-hero__image-wrap">
                  <img
                    src={IMAGES.img1}
                    alt="Carmela Sherwood — Photographer and Visual Storyteller"
                    className="about-hero__img"
                  />
                </div>
                <div className="about-hero__caption">
                  <span className="label">CARMELA SHERWOOD</span>
                  <span className="about-hero__caption-sub">PHOTOGRAPHER &amp; VISUAL STORYTELLER</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Meet Carmela & Artistic Bio */}
            <ScrollReveal delay={0.15} className="about-hero__content-col">
              <span className="label label--accent">ABOUT</span>
              <h1 className="about-hero__title heading-1">
                MEET CARMELA
              </h1>
              <div className="divider" />
              
              <div className="about-hero__bio body-large">
                <p>
                  “I’m Carmela — a photographer drawn to honest moments, beautiful light and the stories hidden inside ordinary days.”
                </p>
                <p>
                  Her approach combines editorial composition with natural, emotionally authentic imagery. Rather than staging artificial poses, she focuses on natural emotion, thoughtful atmosphere, and the subtle nuances that make each person and gathering completely unique.
                </p>
                <p>
                  Every session is designed to feel unhurried, comfortable, and collaborative. By allowing space for genuine interaction, the resulting photographs carry the depth, feeling, and quiet grace of real life.
                </p>
              </div>

              <div className="about-hero__action">
                <Button to="/booking" variant="primary" size="lg">
                  LET'S WORK TOGETHER
                </Button>
                <Button to="/portfolio" variant="secondary" size="lg">
                  EXPLORE THE ARCHIVE
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Artist Statement Banner */}
      <section className="about-quote section section--cream">
        <div className="container container--text text-center">
          <ScrollReveal>
            <span className="label label--accent">ARTISTIC PHILOSOPHY</span>
            <blockquote className="about-quote__text font-serif">
              "A photograph is not taken; it is recognized. It exists in the subtle spaces between words, in the glance held for half a second longer than usual, and in the amber tilt of late afternoon sunlight."
            </blockquote>
            <cite className="about-quote__author label">— Carmela Sherwood</cite>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Artistic Values Grid */}
      <section className="about-values section">
        <div className="container">
          <ScrollReveal className="text-center">
            <span className="label label--accent">THE PRINCIPLES</span>
            <h2 className="heading-2 about-values__title">How I Approach the Craft</h2>
            <div className="divider divider--center" />
          </ScrollReveal>

          <div className="about-values__grid">
            {CORE_VALUES.map((val, index) => (
              <ScrollReveal
                key={index}
                delay={index * 0.1}
                className="about-value-card"
              >
                <span className="about-value-card__num font-serif">0{index + 1}</span>
                <h3 className="heading-4 about-value-card__title">{val.title}</h3>
                <p className="body-base about-value-card__desc">{val.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Component Embedded */}
      <Process />

      {/* Bottom CTA */}
      <section className="about-cta section section--dark">
        <div className="container container--narrow text-center">
          <ScrollReveal>
            <span className="label label--accent">BEGIN A DIALOGUE</span>
            <h2 className="heading-2 about-cta__title">Ready to document your story?</h2>
            <p className="body-large about-cta__text">
              Commission dates are intentionally limited each season to ensure dedicated creative focus for every client.
            </p>
            <Button to="/booking" variant="primary" size="lg">
              INQUIRE ABOUT AVAILABILITY
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
