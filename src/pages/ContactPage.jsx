import { useState } from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
import Button from '../components/ui/Button'
import './ContactPage.css'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.'
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.'
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a subject.'
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.'
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validate()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1000)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
    setErrors({})
    setIsSubmitted(false)
  }

  return (
    <div className="contact-page">
      {/* Header Banner */}
      <section className="contact-header section section--cream">
        <div className="container container--narrow text-center">
          <ScrollReveal>
            <span className="label label--accent">GET IN TOUCH</span>
            <h1 className="contact-header__title heading-1">LET'S TALK</h1>
            <div className="divider divider--center" />
            <p className="contact-header__subtitle body-large">
              Have an idea, a story or a moment you'd like to capture?<br />
              I'd love to hear about it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-body section">
        <div className="container">
          <div className="contact-layout">
            {/* Direct Contact Details */}
            <div className="contact-info-col">
              <ScrollReveal>
                <div className="contact-info-card">
                  <span className="label label--accent">DIRECT DETAILS</span>
                  <h2 className="heading-3 contact-info-card__title">Studio & Communication</h2>
                  <div className="divider" />

                  <div className="contact-details-list">
                    <div className="contact-detail-item">
                      <span className="contact-detail-item__label label">EMAIL</span>
                      <a
                        href="mailto:hello@carmelasherwood.com"
                        className="contact-detail-item__value font-serif"
                      >
                        hello@carmelasherwood.com
                      </a>
                    </div>

                    <div className="contact-detail-item">
                      <span className="contact-detail-item__label label">INSTAGRAM</span>
                      <a
                        href="https://instagram.com/carmelasherwood.photo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-detail-item__value"
                      >
                        @carmelasherwood.photo
                      </a>
                    </div>

                    <div className="contact-detail-item">
                      <span className="contact-detail-item__label label">LOCATION</span>
                      <p className="contact-detail-item__text body-base">
                        Available for sessions and commissions worldwide.
                      </p>
                    </div>

                    <div className="contact-detail-item">
                      <span className="contact-detail-item__label label">OFFICE HOURS & RESPONSE</span>
                      <p className="contact-detail-item__text body-base">
                        Monday – Friday, 9:00 AM – 5:00 PM PST.<br />
                        <em>Inquiries typically answered within 24–48 hours.</em>
                      </p>
                    </div>
                  </div>

                  {/* Direct Booking Notice */}
                  <div className="contact-booking-box">
                    <h3 className="heading-4">PLANNING A SPECIFIC SESSION?</h3>
                    <p className="body-base">
                      If you are looking for collections, pricing details, or want to check open calendar dates:
                    </p>
                    <div className="contact-booking-links">
                      <Button to="/booking" variant="primary" size="sm">
                        GO TO SESSION BOOKING
                      </Button>
                      <Button to="/services" variant="secondary" size="sm">
                        VIEW SERVICES & PRICING
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Form */}
            <div className="contact-form-col">
              <ScrollReveal delay={0.15}>
                <div className="contact-form-card">
                  {isSubmitted ? (
                    <div className="contact-success" role="status">
                      <div className="contact-success__icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="label label--accent">MESSAGE SENT</span>
                      <h2 className="heading-3">Thank you, {formData.name}</h2>
                      <p className="body-base">
                        Your message has been sent successfully. We will review your note and respond to <strong>{formData.email}</strong> shortly.
                      </p>
                      <div className="contact-demo-notice">
                        <p className="body-base">
                          <strong>Demo Mode:</strong> This message was handled locally for demonstration purposes.
                        </p>
                      </div>
                      <Button variant="secondary" onClick={handleReset}>
                        SEND ANOTHER MESSAGE
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="contact-form" noValidate>
                      <div className="contact-form__intro">
                        <span className="label label--accent">SEND A MESSAGE</span>
                        <h2 className="heading-3">How can we help?</h2>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-name" className="form-label">
                          YOUR NAME *
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                          placeholder="e.g. Julian Hayes"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && <span className="form-error">{errors.name}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-email" className="form-label">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                          placeholder="julian@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && <span className="form-error">{errors.email}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-subject" className="form-label">
                          SUBJECT *
                        </label>
                        <input
                          id="contact-subject"
                          name="subject"
                          type="text"
                          className={`form-input ${errors.subject ? 'form-input--error' : ''}`}
                          placeholder="e.g. Print inquiry, Editorial collaboration..."
                          value={formData.subject}
                          onChange={handleChange}
                        />
                        {errors.subject && <span className="form-error">{errors.subject}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-message" className="form-label">
                          YOUR MESSAGE *
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows="6"
                          className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
                          placeholder="Tell us what's on your mind..."
                          value={formData.message}
                          onChange={handleChange}
                        />
                        {errors.message && <span className="form-error">{errors.message}</span>}
                      </div>

                      <div className="contact-form__submit">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          loading={isSubmitting}
                          className="contact-submit-btn"
                        >
                          SEND MESSAGE
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
