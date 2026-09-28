import { useState } from 'react'
import { services } from '../data/services'
import ScrollReveal from '../components/ui/ScrollReveal'
import Button from '../components/ui/Button'
import './ServicesPage.css'

const FAQS = [
  {
    question: 'How far in advance should we book a session?',
    answer:
      'For wedding commissions, I recommend booking 6 to 12 months in advance, especially for weekend dates during the peak autumn and spring seasons. For portrait, couples, and editorial sessions, 3 to 6 weeks notice is typically ideal, though last-minute commissions are accommodated whenever scheduling permits.',
  },
  {
    question: 'What happens if the weather does not cooperate for outdoor shoots?',
    answer:
      'Overcast skies and soft mist often create stunning, atmospheric light. However, in the event of persistent heavy rain or harsh storms, we will reschedule to our mutually agreed backup date at no additional fee. Your comfort and safety always come first.',
  },
  {
    question: 'How and when will our final photographs be delivered?',
    answer:
      'You will receive a private, high-resolution online gallery with full downloading and printing rights. Portrait and lifestyle collections are delivered within 2 to 3 weeks; wedding galleries are delivered within 6 to 8 weeks, with an early highlight preview within 48 hours.',
  },
  {
    question: 'Do you help with wardrobe, styling, and location selection?',
    answer:
      'Yes, absolutely. Once your session is confirmed, you will receive a curated wardrobe and preparation guide. We will also consult on locations that reflect the mood you envision, whether that is natural landscapes, intimate interior spaces, or urban architecture.',
  },
  {
    question: 'Can these packages be tailored to our specific ideas?',
    answer:
      'Every collection can be tailored. Whether you need extended hours, multi-day coverage, or specialized print albums, I am happy to design a custom proposal specifically for your project.',
  },
]

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="services-page">
      {/* Header Banner */}
      <section className="services-header section section--cream">
        <div className="container container--narrow text-center">
          <ScrollReveal>
            <span className="label label--accent">OFFERINGS & INVESTMENT</span>
            <h1 className="services-header__title heading-1">INVESTMENT & SERVICES</h1>
            <div className="divider divider--center" />
            <p className="services-header__subtitle body-large">
              Thoughtful collections designed around honest storytelling. Every session is an unhurried, intentional experience.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-list-section section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.id}
                delay={index * 0.08}
                className="services-card-wrap"
              >
                <article className="service-card">
                  <div className="service-card__top">
                    <span className="label service-card__category">{service.shortTitle}</span>
                    <h2 className="service-card__title heading-3">{service.title}</h2>
                    <p className="service-card__subtitle">{service.subtitle}</p>
                    
                    <div className="service-card__pricing">
                      <span className="service-card__price">{service.price}</span>
                      <span className="service-card__duration">Duration: {service.duration}</span>
                      <span className="service-card__note">{service.priceNote}</span>
                    </div>
                  </div>

                  <div className="service-card__body">
                    <p className="service-card__description body-base">
                      {service.description}
                    </p>

                    <div className="service-card__includes">
                      <span className="service-card__includes-title label">WHAT IS INCLUDED</span>
                      <ul className="service-card__includes-list">
                        {service.includes.map((item, i) => (
                          <li key={i} className="service-card__includes-item">
                            <svg
                              className="service-card__check"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="service-card__footer">
                    <Button
                      to={`/booking?service=${service.slug}`}
                      variant="primary"
                      className="service-card__btn"
                    >
                      INQUIRE ABOUT THIS SERVICE
                    </Button>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Guide & Philosophy Section */}
      <section className="services-guide section section--cream">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="services-guide__box">
              <span className="label label--accent">SESSION PREPARATION</span>
              <h2 className="heading-2 services-guide__title">What to Expect on Your Session</h2>
              <div className="divider" />
              <div className="services-guide__steps">
                <div className="services-guide__step">
                  <span className="services-guide__num">01</span>
                  <div className="services-guide__info">
                    <h3 className="heading-4">THE CONVERSATION</h3>
                    <p className="body-base">
                      Before picking up a camera, we establish how you want your story told. We discuss lighting, location mood, and personal aesthetic to ensure mutual alignment.
                    </p>
                  </div>
                </div>
                <div className="services-guide__step">
                  <span className="services-guide__num">02</span>
                  <div className="services-guide__info">
                    <h3 className="heading-4">NATURAL DIRECTION</h3>
                    <p className="body-base">
                      Never stiff posing. I guide you naturally into good light and comfortable motion, allowing real emotion and spontaneous gestures to unfold.
                    </p>
                  </div>
                </div>
                <div className="services-guide__step">
                  <span className="services-guide__num">03</span>
                  <div className="services-guide__info">
                    <h3 className="heading-4">THE ART OF CURATION</h3>
                    <p className="body-base">
                      Each photograph is treated individually with true-to-tone, timeless color grading that respects skin tones and organic warmth rather than passing filter trends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="services-faq section">
        <div className="container container--narrow">
          <ScrollReveal className="text-center">
            <span className="label label--accent">COMMON QUESTIONS</span>
            <h2 className="heading-2 services-faq__title">Frequently Asked Questions</h2>
            <div className="divider divider--center" />
          </ScrollReveal>

          <div className="services-faq__list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className={`services-faq__item ${isOpen ? 'services-faq__item--open' : ''}`}
                >
                  <button
                    className="services-faq__question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="services-faq__icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="services-faq__answer">
                      <p className="body-base">{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="services-faq__cta text-center">
            <p className="body-large">Have a question not addressed here?</p>
            <Button to="/contact" variant="secondary">
              GET IN TOUCH DIRECTLY
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
