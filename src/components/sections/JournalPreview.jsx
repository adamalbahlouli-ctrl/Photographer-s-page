import { Link } from 'react-router-dom'
import { journalPosts } from '../../data/journal'
import ScrollReveal from '../ui/ScrollReveal'
import './JournalPreview.css'

export default function JournalPreview() {
  const posts = journalPosts.slice(0, 3)

  return (
    <section className="journal-preview section section--cream">
      <div className="container">
        {/* Section Header */}
        <div className="journal-preview__header-wrap">
          <ScrollReveal className="journal-preview__header">
            <span className="label label--accent">JOURNAL &amp; ESSAYS</span>
            <h2 className="journal-preview__title heading-2">
              Notes On Light &amp; Memory
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="journal-preview__header-link">
            <Link to="/journal" className="journal-preview__view-all">
              <span>EXPLORE ALL ESSAYS</span>
              <span className="journal-preview__link-line" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Journal Cards Grid */}
        <div className="journal-preview__grid">
          {posts.map((post, index) => (
            <ScrollReveal
              key={post.id}
              delay={index * 0.15}
              className="journal-preview__card-col"
            >
              <article className="journal-card">
                <div className="journal-card__meta-top">
                  <span className="journal-card__category label">
                    {post.category}
                  </span>
                  <div className="journal-card__time-info">
                    <span className="journal-card__date">{post.date}</span>
                    <span className="journal-card__bullet" aria-hidden="true">&bull;</span>
                    <span className="journal-card__read-time">{post.readTime}</span>
                  </div>
                </div>

                <h3 className="journal-card__title font-serif">
                  <Link to={`/journal/${post.slug}`} className="journal-card__title-link">
                    {post.title}
                  </Link>
                </h3>

                <p className="journal-card__excerpt body-base">
                  {post.excerpt}
                </p>

                <div className="journal-card__footer">
                  <Link
                    to={`/journal/${post.slug}`}
                    className="journal-card__read-link"
                    aria-label={`Read story: ${post.title}`}
                  >
                    <span>READ STORY</span>
                    <span className="journal-card__arrow" aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
