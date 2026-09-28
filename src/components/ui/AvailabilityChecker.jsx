import { useState } from 'react'
import { availabilityCalendar, AVAILABILITY_STATUS, sessionTypes } from '../../data/availability'
import './AvailabilityChecker.css'

const MONTHS = [
  { value: '2026-10', label: 'October 2026' },
  { value: '2026-11', label: 'November 2026' },
  { value: '2026-12', label: 'December 2026' },
]

function getDaysInMonth(yearMonth) {
  const [year, month] = yearMonth.split('-').map(Number)
  return new Date(year, month, 0).getDate()
}

function getFirstDayOfMonth(yearMonth) {
  const [year, month] = yearMonth.split('-').map(Number)
  return new Date(year, month - 1, 1).getDay()
}

const STATUS_LABELS = {
  [AVAILABILITY_STATUS.AVAILABLE]: 'Available',
  [AVAILABILITY_STATUS.LIMITED]: 'Limited',
  [AVAILABILITY_STATUS.UNAVAILABLE]: 'Unavailable',
}

export default function AvailabilityChecker({ onDateSelect }) {
  const [selectedMonth, setSelectedMonth] = useState('2026-10')
  const [selectedType, setSelectedType] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)

  const daysInMonth = getDaysInMonth(selectedMonth)
  const firstDay = getFirstDayOfMonth(selectedMonth)

  function getDateKey(day) {
    const [year, month] = selectedMonth.split('-')
    return `${year}-${month}-${String(day).padStart(2, '0')}`
  }

  function getStatus(day) {
    const key = getDateKey(day)
    return availabilityCalendar[key] || null
  }

  function handleDayClick(day, status) {
    if (!status || status === AVAILABILITY_STATUS.UNAVAILABLE) return
    const dateKey = getDateKey(day)
    setSelectedDate(dateKey)
    onDateSelect?.(dateKey)
  }

  const selectedStatus = selectedDate ? availabilityCalendar[selectedDate] : null

  return (
    <div className="availability">
      <div className="availability__controls">
        <div className="availability__control-group">
          <label htmlFor="avail-month" className="availability__label">MONTH</label>
          <select
            id="avail-month"
            className="availability__select"
            value={selectedMonth}
            onChange={(e) => { setSelectedMonth(e.target.value); setSelectedDate(null) }}
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        <div className="availability__control-group">
          <label htmlFor="avail-type" className="availability__label">SESSION TYPE</label>
          <select
            id="avail-type"
            className="availability__select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Any session</option>
            {sessionTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="availability__calendar">
        {/* Weekday headers */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="availability__weekday">{d}</span>
        ))}

        {/* Empty cells for first day offset */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <span key={`empty-${i}`} className="availability__day availability__day--empty" />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const status = getStatus(day)
          const dateKey = getDateKey(day)
          const isSelected = selectedDate === dateKey
          const isClickable = status && status !== AVAILABILITY_STATUS.UNAVAILABLE

          return (
            <button
              key={day}
              className={[
                'availability__day',
                status ? `availability__day--${status}` : 'availability__day--none',
                isSelected ? 'availability__day--selected' : '',
                !isClickable ? 'availability__day--disabled' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => handleDayClick(day, status)}
              disabled={!isClickable}
              aria-label={`${day} ${selectedMonth} — ${status ? STATUS_LABELS[status] : 'No data'}`}
              aria-pressed={isSelected}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="availability__legend">
        <span className="availability__legend-item">
          <span className="availability__legend-dot availability__legend-dot--available" />
          Available
        </span>
        <span className="availability__legend-item">
          <span className="availability__legend-dot availability__legend-dot--limited" />
          Limited
        </span>
        <span className="availability__legend-item">
          <span className="availability__legend-dot availability__legend-dot--unavailable" />
          Unavailable
        </span>
      </div>

      {selectedDate && selectedStatus && (
        <div className={`availability__result availability__result--${selectedStatus}`}>
          <span className="availability__result-status">
            {STATUS_LABELS[selectedStatus].toUpperCase()}
          </span>
          <span className="availability__result-text">
            {selectedStatus === AVAILABILITY_STATUS.AVAILABLE
              ? 'This date appears to be open. Send an inquiry to confirm.'
              : selectedStatus === AVAILABILITY_STATUS.LIMITED
              ? 'Limited availability. Inquire early to secure your date.'
              : 'This date is not available.'}
          </span>
        </div>
      )}

      <p className="availability__disclaimer">
        Demo availability data only. Confirm dates by sending an inquiry.
      </p>
    </div>
  )
}
