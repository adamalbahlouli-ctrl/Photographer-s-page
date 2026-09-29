/**
 * main.js — Carmela Sherwood Photography
 * Handles: navigation, mobile menu, scroll behavior,
 *          scroll reveal, testimonials carousel, FAQ,
 *          journal article modals
 */

// ============================================================
// CONSTANTS — images used across the site
// ============================================================
const IMAGES = {
  img1: 'https://i.postimg.cc/KvpZWP5b/file-00000000eef881f4a1042f6d724e52f0.png',
  img2: 'https://i.postimg.cc/cLKsGvDw/file-00000000e690821081bf2d888cca442d.png',
  img3: 'https://i.postimg.cc/GmBcn4M4/file-00000000e79c8210b33d49c7db768e6b.png',
  img4: 'https://i.postimg.cc/Bn8qfjh2/file-00000000889c82108929903057d665ee.png',
  img5: 'https://i.postimg.cc/YC4pBvXm/file-000000006f3882108ea36dd233d0b4d4.png',
};

// ============================================================
// HEADER — Transparent → Solid on scroll
// ============================================================
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const hero = document.querySelector('.hero');

  // If page has no hero, keep solid always
  if (!hero) {
    header.classList.add('header--solid');
    header.classList.remove('header-transparent');
    return;
  }

  header.classList.add('header-transparent');

  const update = () => {
    if (window.scrollY > 50) {
      header.classList.add('header--solid');
      header.classList.remove('header-transparent');
    } else {
      header.classList.remove('header--solid');
      header.classList.add('header-transparent');
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ============================================================
// MOBILE MENU
// ============================================================
function initMobileMenu() {
  const toggle  = document.querySelector('.menu-toggle');
  const menu    = document.querySelector('.mobile-menu');
  const header  = document.querySelector('.header');
  if (!toggle || !menu) return;

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.style.overflow = '';
    if (header && !document.querySelector('.hero')) {
      // keep solid on inner pages
    }
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open', !expanded);
    document.body.style.overflow = expanded ? '' : 'hidden';
  });

  // Close on nav link click
  menu.querySelectorAll('.mobile-nav-link, .mobile-menu-cta').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) close();
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      close();
    }
  });
}

// ============================================================
// HERO IMAGE — fade in on load
// ============================================================
function initHeroImage() {
  const img = document.querySelector('.hero-image');
  if (!img) return;

  const reveal = () => {
    img.classList.add('loaded');
    const text = document.querySelector('.hero-text');
    if (text) text.classList.add('visible');
  };

  if (img.complete && img.naturalWidth > 0) {
    reveal();
  } else {
    img.addEventListener('load', reveal);
    img.addEventListener('error', reveal); // still show text on error
  }
}

// ============================================================
// SCROLL REVEAL — IntersectionObserver
// ============================================================
function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================================
// TESTIMONIALS CAROUSEL
// ============================================================
const TESTIMONIALS = [
  {
    quote: 'Carmela made the entire experience feel effortless. The photographs feel exactly like us — unhurried, honest and more beautiful than we imagined.',
    author: 'SAMPLE CLIENT',
    context: 'Wedding Photography',
  },
  {
    quote: 'Beautiful direction, beautiful photographs, and an experience that felt genuinely personal from beginning to end.',
    author: 'SAMPLE CLIENT',
    context: 'Portrait Session',
  },
  {
    quote: 'She has a rare ability to put you completely at ease. The images capture something I had never seen in photographs of myself before.',
    author: 'SAMPLE CLIENT',
    context: 'Editorial & Brand',
  },
  {
    quote: 'Working with Carmela was one of the best decisions we made. The way she sees light and emotion is extraordinary.',
    author: 'SAMPLE CLIENT',
    context: 'Couples Session',
  },
];

function initTestimonials() {
  const container = document.querySelector('.testimonials-carousel');
  if (!container) return;

  let current = 0;
  let timer = null;

  // Build slides
  const slidesWrap = container.querySelector('.testimonials-slides');
  const dotsWrap   = container.querySelector('.testimonials-dots');
  const prevBtn    = container.querySelector('.testimonials-arrow.prev');
  const nextBtn    = container.querySelector('.testimonials-arrow.next');
  if (!slidesWrap || !dotsWrap) return;

  TESTIMONIALS.forEach((t, i) => {
    // Slide
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `
      <div class="testimonial-quote-mark" aria-hidden="true">"</div>
      <blockquote class="testimonial-quote font-serif">${t.quote}</blockquote>
      <div class="testimonial-author">&mdash; ${t.author}</div>
      <div class="testimonial-context">${t.context}</div>
      <span class="testimonial-demo-badge">Demo Testimonial</span>
    `;
    slidesWrap.appendChild(slide);

    // Dot
    const dot = document.createElement('button');
    dot.className = 'testimonials-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const slides = slidesWrap.querySelectorAll('.testimonial-slide');
  const dots   = dotsWrap.querySelectorAll('.testimonials-dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), 5500);
  }
  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }
  startTimer();
  container.addEventListener('mouseenter', () => clearInterval(timer));
  container.addEventListener('mouseleave', startTimer);

  // Touch / Mobile Swipe Support
  let touchStartX = 0;
  let touchStartY = 0;
  container.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      clearInterval(timer);
    }
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          goTo(current + 1); // Swiped left -> next
        } else {
          goTo(current - 1); // Swiped right -> prev
        }
      }
      startTimer();
    }
  }, { passive: true });
}

// ============================================================
// FAQ ACCORDION
// ============================================================
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

      if (!isOpen) item.classList.add('open');
    });
  });
}

// ============================================================
// JOURNAL ARTICLE MODALS
// ============================================================
const ARTICLES = {
  'art-of-natural-portraits': {
    category: 'PORTRAIT',
    date: 'September 2026',
    readTime: '4 min read',
    title: 'The Art of Natural Portraits',
    image: 'https://i.postimg.cc/KvpZWP5b/file-00000000eef881f4a1042f6d724e52f0.png',
    body: `
      <p>The best portrait photographs are rarely the most technically flawless. Instead, they are the ones that carry something authentic of the person in front of the lens — a quality that no amount of cosmetic retouching or artificial lighting can manufacture.</p>
      <p>When someone steps in front of a camera, their immediate impulse is often defensive. We are conditioned to "pose" — to present a curated version of ourselves designed for approval. My role during a portrait session is not to demand performance, but to dissolve that tension. We talk, we move, we let the quiet do its work.</p>
      <blockquote>"To photograph someone honestly is to give them permission to be seen without performance."</blockquote>
      <p>Natural portraiture requires genuine patience. When you wait through the awkward pauses, past the initial stiff smile, you witness the shoulders drop. The eyes soften. A fleeting expression emerges — a private thought passing across their face. That singular fraction of a second is where truth lives.</p>
    `,
  },
  'why-light-matters': {
    category: 'CRAFT',
    date: 'August 2026',
    readTime: '5 min read',
    title: 'Why Light Matters',
    image: 'https://i.postimg.cc/Bn8qfjh2/file-00000000889c82108929903057d665ee.png',
    body: `
      <p>Light is not merely illumination. In photography, light is time, atmosphere, and raw emotion. Understanding how to collaborate with natural light — rather than fighting it — changes everything about the story an image tells.</p>
      <p>Morning light has a crisp, inquisitive clarity. It cuts clean contours and paints the world with calm optimism. Late afternoon light is heavy with memory and romance; its long golden rake across skin creates warm intimacy that words struggle to replicate.</p>
      <blockquote>"When we respect how light falls, we elevate an ordinary room into an indelible cinematic frame."</blockquote>
      <p>Throughout my work, I deliberately seek directional window light and diffused shade. I love the way high-contrast light carves out mystery, while soft ambient illumination gently wraps around a subject. Understanding the character of light at different hours is the foundation of every session.</p>
    `,
  },
  'quiet-wedding-in-autumn': {
    category: 'WEDDING',
    date: 'October 2026',
    readTime: '6 min read',
    title: 'A Quiet Wedding in Autumn',
    image: 'https://i.postimg.cc/cLKsGvDw/file-00000000e690821081bf2d888cca442d.png',
    body: `
      <p>There is something profoundly peaceful about an autumn celebration — the golden honey tone of the low sun, the crisp whisper of dry leaves, and the lingering sense that summer has finally released its hold.</p>
      <p>Documenting an intimate wedding requires a documentary mindset: moving quietly, anticipating glances, and knowing when to step back completely.</p>
      <blockquote>"When looking through these frames, you don't just see what the day looked like — you feel the exact temperature of that afternoon."</blockquote>
      <p>The most resonant wedding photographs are never the formally posed ones. They are the whispered exchanges, the gentle hand-hold, the moment of stillness between two people who have chosen each other. That is what I am always waiting for.</p>
    `,
  },
  'behind-the-frame': {
    category: 'BEHIND THE LENS',
    date: 'July 2026',
    readTime: '3 min read',
    title: 'Behind the Frame',
    image: 'https://i.postimg.cc/GmBcn4M4/file-00000000e79c8210b33d49c7db768e6b.png',
    body: `
      <p>The photograph is only ever a fraction of the story. The rest lives in the spaces between — the quiet conversation before the first click of the shutter, the shared warmth, the moment of vulnerability when a client realizes they are completely safe.</p>
      <p>Great photographs happen because of trust. When a client trusts that their authentic self is welcomed with care, something extraordinary becomes possible.</p>
      <blockquote>"Photography is an act of reciprocity. I bring visual intuition; you bring your genuine self."</blockquote>
      <p>In the harmony between technical discipline and human connection, we make something that lasts. Something that, years from now, will bring back not just what a moment looked like — but exactly how it felt to be alive inside it.</p>
    `,
  },
};

function initArticleModals() {
  const modal     = document.getElementById('article-modal');
  const closeBtn  = document.getElementById('article-modal-close');
  if (!modal) return;

  function openArticle(slug) {
    const art = ARTICLES[slug];
    if (!art) return;

    modal.querySelector('.article-category').textContent  = art.category;
    modal.querySelector('.article-date').textContent      = art.date;
    modal.querySelector('.article-read-time').textContent = art.readTime;
    modal.querySelector('.article-title').textContent     = art.title;
    modal.querySelector('.article-body').innerHTML        = art.body;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeArticle() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeArticle);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeArticle();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeArticle();
  });

  document.querySelectorAll('[data-article]').forEach(btn => {
    btn.addEventListener('click', () => openArticle(btn.getAttribute('data-article')));
  });
}

// ============================================================
// SAFE IMAGE FALLBACKS
// ============================================================
function getPlaceholderSvg(title, category) {
  const t = encodeURIComponent(title || 'Carmela Sherwood');
  const c = encodeURIComponent(category || 'Photograph Archive');
  return `data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%201000%22%20width%3D%22800%22%20height%3D%221000%22%3E%3Crect%20width%3D%22800%22%20height%3D%221000%22%20fill%3D%22%23EDE9E1%22%2F%3E%3Crect%20x%3D%2240%22%20y%3D%2240%22%20width%3D%22720%22%20height%3D%22920%22%20fill%3D%22none%22%20stroke%3D%22%23B8935A%22%20stroke-width%3D%221%22%20opacity%3D%220.4%22%2F%3E%3Ctext%20x%3D%22400%22%20y%3D%22480%22%20font-family%3D%22Georgia%2C%20serif%22%20font-size%3D%2226%22%20font-weight%3D%22300%22%20fill%3D%22%231C1A17%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%222%22%3E${t}%3C%2Ftext%3E%3Ctext%20x%3D%22400%22%20y%3D%22520%22%20font-family%3D%22sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%238A8278%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%224%22%3E${c}%3C%2Ftext%3E%3C%2Fsvg%3E`;
}

function initImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    // Ensure referrer-policy is no-referrer on all images
    img.setAttribute('referrerpolicy', 'no-referrer');
    img.referrerPolicy = 'no-referrer';

    img.addEventListener('error', function() {
      if (this.dataset.fallbackApplied) return;
      this.dataset.fallbackApplied = 'true';
      this.classList.add('img-fallback');
      const title = this.getAttribute('alt') || 'Photograph';
      this.src = getPlaceholderSvg(title, 'CARMELA SHERWOOD');
    });
  });
}

// ============================================================
// ACTIVE NAV LINK (supports .html and Vercel clean URLs)
// ============================================================
function initActiveNav() {
  let path = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  if (!path.includes('.')) {
    path = path + '.html';
  }
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    let href = link.getAttribute('href') || '';
    if (href.startsWith('/')) href = href.slice(1);
    const linkBase = href.split('?')[0].split('#')[0];
    if (linkBase === path || (path === 'index.html' && (linkBase === '' || linkBase === './' || linkBase === 'index.html'))) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// FLOATING BACK TO TOP BUTTON
// ============================================================
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>`;
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initImageFallbacks();
  initHeader();
  initMobileMenu();
  initHeroImage();
  initScrollReveal();
  initTestimonials();
  initFAQ();
  initArticleModals();
  initActiveNav();
  initBackToTop();
});
