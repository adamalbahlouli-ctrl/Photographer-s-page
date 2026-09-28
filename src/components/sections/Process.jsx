import { processSteps } from '../../data/process'
import ScrollReveal from '../ui/ScrollReveal'
import './Process.css'

export default function Process() {
  return (
    <section className="process-section section section--cream">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal className="process-section__header">
          <span className="label label--accent">THE EXPERIENCE</span>
          <h2 className="process-section__title heading-2">The Experience</h2>
          <p className="process-section__sub body-large">
            How we bring your moments to life, from initial inquiry to final delivery.
          </p>
          <div className="divider" />
        </ScrollReveal>

        {/* 4-Step Grid */}
        <div className="process-section__grid">
          {processSteps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              delay={index * 0.12}
              className="process-section__col"
            >
              <div className="process-card">
                <div className="process-card__top-bar" aria-hidden="true" />
                <div className="process-card__number-wrap">
                  <span className="process-card__number font-serif">{step.number}</span>
                </div>
                <h3 className="process-card__title heading-4">{step.title}</h3>
                <p className="process-card__desc body-base">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
