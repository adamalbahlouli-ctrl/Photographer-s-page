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
// ACTIVE NAV LINK
// ============================================================
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === './') || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initHeroImage();
  initScrollReveal();
  initTestimonials();
  initFAQ();
  initArticleModals();
  initActiveNav();
});
