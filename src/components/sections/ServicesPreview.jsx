import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import ScrollReveal from '../ui/ScrollReveal'
import './ServicesPreview.css'

export default function ServicesPreview() {
  return (
    <section className="services-preview section">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal className="services-preview__header">
          <span className="label label--accent">SERVICES</span>
          <h2 className="services-preview__title heading-2">
            Thoughtful visual documentation tailored to your story.
          </h2>
          <div className="divider" />
        </ScrollReveal>

        {/* Services List / Rows */}
        <div className="services-preview__list">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.id}
              delay={index * 0.1}
              className="services-preview__row-wrap"
            >
              <div className="services-preview__row">
                <div className="services-preview__col-num">
                  <span className="services-preview__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="services-preview__col-info">
                  <h3 className="services-preview__item-title font-serif">
                    {service.title}
                  </h3>
                  <p className="services-preview__item-desc">
                    {service.description}
                  </p>
                </div>

                <div className="services-preview__col-pricing">
                  <span className="services-preview__price font-serif">
                    {service.price}
                  </span>
                  {service.priceNote && (
                    <span className="services-preview__price-note">
                      {service.priceNote}
                    </span>
                  )}
                </div>

                <div className="services-preview__col-action">
                  <Link
                    to={`/booking?service=${service.slug}`}
                    className="services-preview__link"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    <span>INQUIRE</span>
                    <span className="services-preview__arrow" aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Section Footer Link */}
        <ScrollReveal delay={0.4} className="services-preview__footer">
          <Link to="/services" className="services-preview__explore-btn">
            <span>EXPLORE ALL SERVICES &amp; DETAILS</span>
            <span className="services-preview__btn-line" aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
