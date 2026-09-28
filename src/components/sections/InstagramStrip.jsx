import { IMAGES } from '../../data/portfolio'
import ScrollReveal from '../ui/ScrollReveal'
import './InstagramStrip.css'

export default function InstagramStrip() {
  const photos = [
    { src: IMAGES.img1, alt: 'Carmela Sherwood photography portrait' },
    { src: IMAGES.img2, alt: 'Carmela Sherwood photography wedding moment' },
    { src: IMAGES.img3, alt: 'Carmela Sherwood photography couple connection' },
    { src: IMAGES.img4, alt: 'Carmela Sherwood photography editorial story' },
    { src: IMAGES.img5, alt: 'Carmela Sherwood photography lifestyle detail' },
  ]

  const instagramUrl = 'https://instagram.com/carmelasherwood.photo'

  return (
    <section className="instagram-strip" aria-label="Instagram Gallery">
      {/* Header */}
      <div className="container">
        <ScrollReveal className="instagram-strip__header">
          <span className="label label--accent">INSTAGRAM</span>
          <h2 className="instagram-strip__handle">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-strip__handle-link font-serif"
            >
              @carmelasherwood.photo
            </a>
          </h2>
        </ScrollReveal>
      </div>

      {/* 5-Image Strip */}
      <div className="instagram-strip__grid">
        {photos.map((photo, index) => (
          <a
            key={index}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-strip__item"
            aria-label={`View Instagram post ${index + 1}`}
          >
            <div className="instagram-strip__img-wrap">
              <img
                src={photo.src}
                alt={photo.alt}
                className="instagram-strip__img"
                loading="lazy"
              />
              <div className="instagram-strip__overlay">
                <svg
                  className="instagram-strip__icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span className="instagram-strip__view-text">VIEW POST</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
