/**
 * gallery.js — Carmela Sherwood Photography
 * Handles: portfolio filter, lightbox, keyboard navigation
 */

// ============================================================
// PORTFOLIO DATA
// ============================================================
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Quiet Morning',
    category: 'PORTRAIT',
    categorySlug: 'portraits',
    description: 'A portrait session built around natural morning light and the quiet confidence of an individual at ease. No performance — only presence.',
    image: 'https://i.postimg.cc/KvpZWP5b/file-00000000eef881f4a1042f6d724e52f0.png',
    alt: 'Elegant portrait photograph in warm natural light',
  },
  {
    id: 2,
    title: 'Autumn Ceremony',
    category: 'WEDDING',
    categorySlug: 'weddings',
    description: 'An intimate autumn wedding documented with honesty and care — the laughter, the stillness, and all the moments between.',
    image: 'https://i.postimg.cc/cLKsGvDw/file-00000000e690821081bf2d888cca442d.png',
    alt: 'Intimate wedding photography in warm autumn light',
  },
  {
    id: 3,
    title: 'Connected',
    category: 'COUPLES',
    categorySlug: 'couples',
    description: 'Two people, one afternoon, and a collection of images that capture the feeling between them — unhurried, honest and real.',
    image: 'https://i.postimg.cc/GmBcn4M4/file-00000000e79c8210b33d49c7db768e6b.png',
    alt: 'Couples portrait photography showing genuine connection',
  },
  {
    id: 4,
    title: 'Editorial Form',
    category: 'EDITORIAL',
    categorySlug: 'editorial',
    description: 'A visual storytelling commission exploring the relationship between subject, space and intentional composition.',
    image: 'https://i.postimg.cc/Bn8qfjh2/file-00000000889c82108929903057d665ee.png',
    alt: 'Editorial photography with strong composition and form',
  },
  {
    id: 5,
    title: 'Everyday Light',
    category: 'LIFESTYLE',
    categorySlug: 'lifestyle',
    description: 'A lifestyle story built around ordinary moments — the kind that become meaningful precisely because they are never posed.',
    image: 'https://i.postimg.cc/YC4pBvXm/file-000000006f3882108ea36dd233d0b4d4.png',
    alt: 'Lifestyle photography capturing authentic everyday moments',
  },
];

// ============================================================
// LIGHTBOX STATE
// ============================================================
let lightboxItems = [];
let lightboxIndex = 0;

// ============================================================
// LIGHTBOX CORE
// ============================================================
function openLightbox(items, index) {
  lightboxItems = items;
  lightboxIndex = index;

  const lb = document.getElementById('lightbox');
  if (!lb) return;

  renderLightboxSlide();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Focus close button for accessibility
  const closeBtn = lb.querySelector('.lightbox-close');
  if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxPrev() {
  if (lightboxItems.length === 0) return;
  lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
  renderLightboxSlide();
}

function lightboxNext() {
  if (lightboxItems.length === 0) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
  renderLightboxSlide();
}

function renderLightboxSlide() {
  const lb   = document.getElementById('lightbox');
  if (!lb) return;
  const item = lightboxItems[lightboxIndex];
  if (!item) return;

  const img      = lb.querySelector('.lightbox-img');
  const title    = lb.querySelector('.lightbox-title');
  const category = lb.querySelector('.lightbox-category');
  const desc     = lb.querySelector('.lightbox-desc');
  const counter  = lb.querySelector('.lightbox-counter');
  const prev     = lb.querySelector('.lightbox-prev');
  const next     = lb.querySelector('.lightbox-next');

  if (img) {
    img.setAttribute('referrerpolicy', 'no-referrer');
    img.referrerPolicy = 'no-referrer';
    img.onerror = function() {
      if (this.dataset.fallbackApplied) return;
      this.dataset.fallbackApplied = 'true';
      if (typeof getPlaceholderSvg === 'function') {
        this.src = getPlaceholderSvg(item.title, item.category);
      }
    };
    img.src = item.image;
    img.alt = item.alt;
  }
  if (title)    title.textContent = item.title;
  if (category) category.textContent = item.category;
  if (desc)     desc.textContent = item.description;
  if (counter)  counter.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;

  if (prev) prev.style.display = lightboxItems.length > 1 ? '' : 'none';
  if (next) next.style.display = lightboxItems.length > 1 ? '' : 'none';
}

function initLightboxControls() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  lb.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lb.querySelector('.lightbox-prev')?.addEventListener('click', lightboxPrev);
  lb.querySelector('.lightbox-next')?.addEventListener('click', lightboxNext);

  // Backdrop click
  lb.addEventListener('click', e => {
    if (e.target === lb) closeLightbox();
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   lightboxPrev();
    if (e.key === 'ArrowRight')  lightboxNext();
  });
}

// ============================================================
// PORTFOLIO GRID (portfolio.html)
// ============================================================
function initPortfolioGrid() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  // Render cards
  PORTFOLIO_ITEMS.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.setAttribute('data-category', item.categorySlug);
    card.setAttribute('data-id', item.id);
    card.innerHTML = `
      <div class="portfolio-card-img-wrap">
        <img
          src="${item.image}"
          alt="${item.alt}"
          class="portfolio-card-img"
          loading="lazy"
          referrerpolicy="no-referrer"
        />
        <div class="portfolio-card-overlay">
          <button class="portfolio-card-btn" aria-label="Open photo: ${item.title}">VIEW PHOTOGRAPH</button>
        </div>
      </div>
      <div class="portfolio-card-meta">
        <div class="portfolio-card-category">${item.category}</div>
        <h3 class="portfolio-card-title">${item.title}</h3>
      </div>
    `;

    const imgEl = card.querySelector('img');
    if (imgEl) {
      imgEl.onerror = function() {
        if (this.dataset.fallbackApplied) return;
        this.dataset.fallbackApplied = 'true';
        this.classList.add('img-fallback');
        if (typeof getPlaceholderSvg === 'function') {
          this.src = getPlaceholderSvg(item.title, item.category);
        }
      };
    }

    card.querySelector('.portfolio-card-btn').addEventListener('click', e => {
      e.stopPropagation();
      const visible = getVisibleItems();
      const visibleIndex = visible.findIndex(i => i.id === item.id);
      openLightbox(visible, visibleIndex >= 0 ? visibleIndex : 0);
    });

    card.addEventListener('click', () => {
      const visible = getVisibleItems();
      const visibleIndex = visible.findIndex(i => i.id === item.id);
      openLightbox(visible, visibleIndex >= 0 ? visibleIndex : 0);
    });

    grid.appendChild(card);
  });

  initPortfolioFilters();
}

function getVisibleItems() {
  const cards = document.querySelectorAll('#portfolio-grid .portfolio-card:not(.hidden)');
  return Array.from(cards).map(card => {
    const id = parseInt(card.getAttribute('data-id'), 10);
    return PORTFOLIO_ITEMS.find(i => i.id === id);
  }).filter(Boolean);
}

function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('portfolio-grid');
  if (!filterBtns.length || !grid) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = grid.querySelectorAll('.portfolio-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const matches = category === 'all' || cardCat === category;
        card.classList.toggle('hidden', !matches);
        if (matches) visibleCount++;
      });

      // Empty state
      let emptyEl = grid.querySelector('.portfolio-empty');
      if (visibleCount === 0) {
        if (!emptyEl) {
          emptyEl = document.createElement('div');
          emptyEl.className = 'portfolio-empty';
          emptyEl.innerHTML = `
            <p class="h3" style="margin-bottom:1rem;">No works in this category yet</p>
            <p class="body-base" style="margin-bottom:2rem;">New series are being curated. Browse all projects in the meantime.</p>
            <button class="btn btn-secondary btn-md" id="show-all-btn">VIEW ALL PROJECTS</button>
          `;
          grid.appendChild(emptyEl);
          emptyEl.querySelector('#show-all-btn').addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-category="all"]')?.classList.add('active');
            cards.forEach(c => c.classList.remove('hidden'));
            emptyEl.remove();
          });
        }
      } else if (emptyEl) {
        emptyEl.remove();
      }
    });
  });
}

// ============================================================
// HOMEPAGE FEATURED WORK CARDS (index.html)
// ============================================================
function initHomepageWorkCards() {
  document.querySelectorAll('[data-lightbox-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.getAttribute('data-lightbox-id'), 10);
      const index = PORTFOLIO_ITEMS.findIndex(i => i.id === id);
      if (index >= 0) openLightbox(PORTFOLIO_ITEMS, index);
    });
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initLightboxControls();
  initPortfolioGrid();
  initHomepageWorkCards();
});
