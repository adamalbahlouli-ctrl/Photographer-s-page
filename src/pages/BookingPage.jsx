import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { sessionTypes, budgetRanges } from '../data/availability'
import AvailabilityChecker from '../components/ui/AvailabilityChecker'
import ScrollReveal from '../components/ui/ScrollReveal'
import Button from '../components/ui/Button'
import './BookingPage.css'

const TIME_PREFERENCES = [
  { value: 'morning', label: 'Morning Light' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'golden-hour', label: 'Golden Hour / Sunset' },
  { value: 'flexible', label: 'Flexible / Any time' },
]

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const initialService = searchParams.get('service') || ''

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    sessionType: '',
    preferredDate: '',
    preferredTime: 'flexible',
    location: '',
    peopleCount: '1-2',
    budgetRange: '250-500',
    message: '',
  })

  useEffect(() => {
    if (initialService) {
      const match = sessionTypes.find(
        (t) => t.value.toLowerCase() === initialService.toLowerCase()
      )
      if (match) {
        setFormData((prev) => ({ ...prev, sessionType: match.value }))
      }
    }
  }, [initialService])

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.'
    }

    if (!formData.sessionType) {
      newErrors.sessionType = 'Please select a session type.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please share a brief note about what you are envisioning.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please tell us a little more about your idea (at least 10 characters).'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleDateFromCalendar = (dateStr) => {
    setFormData((prev) => ({ ...prev, preferredDate: dateStr }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validate()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      const firstError = Object.keys(formErrors)[0]
      const el = document.getElementById(`booking-${firstError}`)
      el?.focus()
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1200)
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      sessionType: '',
      preferredDate: '',
      preferredTime: 'flexible',
      location: '',
      peopleCount: '1-2',
      budgetRange: '250-500',
      message: '',
    })
    setErrors({})
    setIsSubmitted(false)
  }

  return (
    <div className="booking-page">
      {/* Header Banner */}
      <section className="booking-header section section--cream">
        <div className="container container--narrow text-center">
          <ScrollReveal>
            <span className="label label--accent">RESERVE A DATE</span>
            <h1 className="booking-header__title heading-1">BOOK A SESSION</h1>
            <div className="divider divider--center" />
            <p className="booking-header__subtitle body-large">
              Let's create something meaningful together. Complete the inquiry below, and I will be in touch with detailed proposals and availability.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section className="booking-content section">
        <div className="container">
          <div className="booking-layout">
            {/* Left Column: Form */}
            <div className="booking-form-col">
              <div className="booking-card">
                {isSubmitted ? (
                  <div className="booking-success" role="status">
                    <div className="booking-success__icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="label label--accent">INQUIRY SENT</span>
                    <h2 className="heading-2 booking-success__title">Thank you, {formData.fullName}.</h2>
                    <p className="body-large booking-success__text">
                      Your inquiry has been received. Carmela will get back to you shortly.
                    </p>
                    <div className="booking-success__demo-box">
                      <p className="body-base">
                        <strong>Demo Note:</strong> This is a demonstration website. No actual booking has occurred and no payment was requested.
                      </p>
                    </div>
                    <Button variant="secondary" onClick={handleReset}>
                      SUBMIT ANOTHER INQUIRY
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="booking-form" noValidate>
                    <div className="booking-form__header">
                      <h2 className="heading-3">Session Inquiry Form</h2>
                      <p className="body-base">Fields marked with an asterisk (*) are required.</p>
                    </div>

                    {/* Full Name */}
                    <div className="form-group">
                      <label htmlFor="booking-fullName" className="form-label">
                        FULL NAME *
                      </label>
                      <input
                        id="booking-fullName"
                        name="fullName"
                        type="text"
                        className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                      {errors.fullName && (
                        <span className="form-error">{errors.fullName}</span>
                      )}
                    </div>

                    {/* Email & Phone */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="booking-email" className="form-label">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          id="booking-email"
                          name="email"
                          type="email"
                          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                          placeholder="eleanor@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                        {errors.email && (
                          <span className="form-error">{errors.email}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="booking-phone" className="form-label">
                          PHONE NUMBER
                        </label>
                        <input
                          id="booking-phone"
                          name="phone"
                          type="tel"
                          className="form-input"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    {/* Session Type */}
                    <div className="form-group">
                      <label htmlFor="booking-sessionType" className="form-label">
                        SESSION TYPE *
                      </label>
                      <select
                        id="booking-sessionType"
                        name="sessionType"
                        className={`form-select ${errors.sessionType ? 'form-input--error' : ''}`}
                        value={formData.sessionType}
                        onChange={handleChange}
                      >
                        <option value="">Select a collection / session type...</option>
                        {sessionTypes.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                      {errors.sessionType && (
                        <span className="form-error">{errors.sessionType}</span>
                      )}
                    </div>

                    {/* Preferred Date & Time */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="booking-preferredDate" className="form-label">
                          PREFERRED DATE
                        </label>
                        <input
                          id="booking-preferredDate"
                          name="preferredDate"
                          type="date"
                          className="form-input"
                          value={formData.preferredDate}
                          onChange={handleChange}
                        />
                        <span className="form-hint">Tip: Click dates on the calendar to the right</span>
                      </div>

                      <div className="form-group">
                        <label htmlFor="booking-preferredTime" className="form-label">
                          PREFERRED TIME OF DAY
                        </label>
                        <select
                          id="booking-preferredTime"
                          name="preferredTime"
                          className="form-select"
                          value={formData.preferredTime}
                          onChange={handleChange}
                        >
                          {TIME_PREFERENCES.map((time) => (
                            <option key={time.value} value={time.value}>
                              {time.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Location & Number of People */}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="booking-location" className="form-label">
                          LOCATION / CITY / VENUE
                        </label>
                        <input
                          id="booking-location"
                          name="location"
                          type="text"
                          className="form-input"
                          placeholder="e.g. Portland studio, Oregon Coast, Home"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="booking-peopleCount" className="form-label">
                          NUMBER OF PEOPLE
                        </label>
                        <input
                          id="booking-peopleCount"
                          name="peopleCount"
                          type="text"
                          className="form-input"
                          placeholder="e.g. 1 person, 2 adults, 5 family"
                          value={formData.peopleCount}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Budget Range */}
                    <div className="form-group">
                      <label htmlFor="booking-budgetRange" className="form-label">
                        ESTIMATED BUDGET RANGE
                      </label>
                      <select
                        id="booking-budgetRange"
                        name="budgetRange"
                        className="form-select"
                        value={formData.budgetRange}
                        onChange={handleChange}
                      >
                        {budgetRanges.map((b) => (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tell me about your idea */}
                    <div className="form-group">
                      <label htmlFor="booking-message" className="form-label">
                        TELL ME ABOUT YOUR IDEA *
                      </label>
                      <textarea
                        id="booking-message"
                        name="message"
                        rows="5"
                        className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
                        placeholder="Share your story, desired atmosphere, special moments to capture, or any questions you have..."
                        value={formData.message}
                        onChange={handleChange}
                      />
                      {errors.message && (
                        <span className="form-error">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="booking-form__submit">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={isSubmitting}
                        className="booking-submit-btn"
                      >
                        SUBMIT INQUIRY
                      </Button>
                      <span className="booking-form__privacy body-base">
                        Your personal details are held in confidence and never shared.
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Calendar & Guide */}
            <div className="booking-sidebar-col">
              {/* Availability Checker Widget */}
              <div className="booking-sidebar-widget">
                <div className="booking-sidebar-widget__header">
                  <span className="label label--accent">LIVE CALENDAR</span>
                  <h3 className="heading-3">Check Availability</h3>
                  <p className="body-base">
                    Click an available date to populate your preferred date in the form.
                  </p>
                </div>
                <AvailabilityChecker onDateSelect={handleDateFromCalendar} />
              </div>

              {/* What Happens Next Guide */}
              <div className="booking-sidebar-widget booking-guide-widget">
                <span className="label label--accent">THE ROADMAP</span>
                <h3 className="heading-3 booking-guide-title">What Happens Next</h3>
                <div className="booking-guide-list">
                  <div className="booking-guide-item">
                    <span className="booking-guide-item__step">01</span>
                    <div className="booking-guide-item__content">
                      <h4 className="heading-4">INQUIRY REVIEW</h4>
                      <p className="body-base">
                        Carmela reviews your schedule and vision within 24–48 hours to confirm availability and date options.
                      </p>
                    </div>
                  </div>

                  <div className="booking-guide-item">
                    <span className="booking-guide-item__step">02</span>
                    <div className="booking-guide-item__content">
                      <h4 className="heading-4">CONSULTATION CALL</h4>
                      <p className="body-base">
                        A relaxed 15-minute phone or video conversation to align on lighting, location, and aesthetic preferences.
                      </p>
                    </div>
                  </div>

                  <div className="booking-guide-item">
                    <span className="booking-guide-item__step">03</span>
                    <div className="booking-guide-item__content">
                      <h4 className="heading-4">CONTRACT & RETAINER</h4>
                      <p className="body-base">
                        A straightforward agreement and deposit securely locks your date onto the calendar.
                      </p>
                    </div>
                  </div>

                  <div className="booking-guide-item">
                    <span className="booking-guide-item__step">04</span>
                    <div className="booking-guide-item__content">
                      <h4 className="heading-4">SESSION PREPARATION</h4>
                      <p className="body-base">
                        You receive our custom styling guide, moodboards, and location coordinates ahead of session day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
