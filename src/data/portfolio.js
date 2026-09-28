// ============================================================
// PORTFOLIO DATA — Replace with real project data
// ============================================================

export const IMAGES = {
  img1: 'https://i.postimg.cc/KvpZWP5b/file-00000000eef881f4a1042f6d724e52f0.png',
  img2: 'https://i.postimg.cc/cLKsGvDw/file-00000000e690821081bf2d888cca442d.png',
  img3: 'https://i.postimg.cc/GmBcn4M4/file-00000000e79c8210b33d49c7db768e6b.png',
  img4: 'https://i.postimg.cc/Bn8qfjh2/file-00000000889c82108929903057d665ee.png',
  img5: 'https://i.postimg.cc/YC4pBvXm/file-000000006f3882108ea36dd233d0b4d4.png',
};

export const portfolioItems = [
  {
    id: 1,
    slug: 'quiet-morning',
    title: 'Quiet Morning',
    category: 'PORTRAIT',
    categorySlug: 'portraits',
    description:
      'A portrait session built around natural morning light and the quiet confidence of an individual at ease. No performance — only presence.',
    image: IMAGES.img1,
    alt: 'Elegant portrait photograph in warm natural light',
    featured: true,
    size: 'large', // for masonry grid sizing
  },
  {
    id: 2,
    slug: 'autumn-ceremony',
    title: 'Autumn Ceremony',
    category: 'WEDDING',
    categorySlug: 'weddings',
    description:
      'An intimate autumn wedding documented with honesty and care — the laughter, the stillness, and all the moments between.',
    image: IMAGES.img2,
    alt: 'Intimate wedding photography in autumn light',
    featured: true,
    size: 'medium',
  },
  {
    id: 3,
    slug: 'connected',
    title: 'Connected',
    category: 'COUPLES',
    categorySlug: 'couples',
    description:
      'Two people, one afternoon, and a collection of images that capture the feeling between them — unhurried, honest and real.',
    image: IMAGES.img3,
    alt: 'Couples portrait photography showing genuine connection',
    featured: true,
    size: 'medium',
  },
  {
    id: 4,
    slug: 'editorial-form',
    title: 'Editorial Form',
    category: 'EDITORIAL',
    categorySlug: 'editorial',
    description:
      'A visual storytelling commission exploring the relationship between subject, space and intentional composition.',
    image: IMAGES.img4,
    alt: 'Editorial photography with strong composition and form',
    featured: false,
    size: 'wide',
  },
  {
    id: 5,
    slug: 'everyday-light',
    title: 'Everyday Light',
    category: 'LIFESTYLE',
    categorySlug: 'lifestyle',
    description:
      'A lifestyle story built around ordinary moments — the kind that become meaningful precisely because they are never posed.',
    image: IMAGES.img5,
    alt: 'Lifestyle photography capturing authentic everyday moments',
    featured: false,
    size: 'portrait',
  },
];

export const categories = [
  { label: 'ALL', value: 'all' },
  { label: 'PORTRAITS', value: 'portraits' },
  { label: 'WEDDINGS', value: 'weddings' },
  { label: 'EDITORIAL', value: 'editorial' },
  { label: 'LIFESTYLE', value: 'lifestyle' },
  { label: 'COUPLES', value: 'couples' },
];
