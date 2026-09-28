import { useEffect, useCallback } from 'react'
import './LightboxModal.css'

export default function LightboxModal({ item, items, onClose, onPrev, onNext }) {
  const currentIndex = items.findIndex((i) => i.id === item?.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < items.length - 1

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  if (!item) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph: ${item.title}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button className="lightbox__close" onClick={onClose} aria-label="Close lightbox">
        <span aria-hidden="true">✕</span>
      </button>

      {/* Navigation */}
      {hasPrev && (
        <button className="lightbox__nav lightbox__nav--prev" onClick={onPrev} aria-label="Previous photograph">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {hasNext && (
        <button className="lightbox__nav lightbox__nav--next" onClick={onNext} aria-label="Next photograph">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Content */}
      <div className="lightbox__content">
        <div className="lightbox__image-wrap">
          <img
            src={item.image}
            alt={item.alt}
            className="lightbox__image"
          />
        </div>
        <div className="lightbox__info">
          <span className="lightbox__category">{item.category}</span>
          <h2 className="lightbox__title">{item.title}</h2>
          <p className="lightbox__description">{item.description}</p>
          <span className="lightbox__counter">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>
    </div>
  )
}
