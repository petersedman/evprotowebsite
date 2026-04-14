# Polarsteps Marketing Clone — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a six-page static marketing website that mirrors the layout, structure, and visual language of polarsteps.com, using original copy and placeholder imagery.

**Architecture:** Astro 4 static site with Tailwind CSS design tokens, Motion One scroll animations, and Astro content collections for the blog. Pages compose reusable Astro components under a shared `Base` layout. Animations are enhancement-only; the site must remain fully usable with JavaScript disabled.

**Tech Stack:** Astro 4, Tailwind CSS 3, Motion One, lucide-astro, Inter (Google Fonts), Astro content collections, TypeScript.

**Spec:** `docs/superpowers/specs/2026-04-14-polarsteps-marketing-clone-design.md`

**Working directory:** `/Users/petersedman/temp/website`

**Note on verification:** Astro components are not unit-tested here. Verification for each task is: `npm run build` succeeds with zero errors/warnings, `npm run dev` renders the relevant page, and a manual visual check confirms the component looks right. Commits after each task via `git` (repo initialised in Task 1).

**Note on copyright:** All copy must be original; no phrasing lifted from polarsteps.com. All imagery must be placeholder (Unsplash or SVG mockups). No trademark assets.

---

## File Structure

```
website/
├── .gitignore
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   ├── images/                 (unsplash downloads for hero/feature imagery)
│   └── mockups/                (svg phone frames, placeholder app-screen svgs)
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Button.astro
│   │   ├── PhoneFrame.astro
│   │   ├── FeatureRow.astro
│   │   ├── Testimonial.astro
│   │   ├── PressLogos.astro
│   │   ├── PricingCard.astro
│   │   ├── FAQ.astro
│   │   └── scroll/
│   │       ├── FadeInSection.astro
│   │       ├── ParallaxImage.astro
│   │       └── StickyPhoneMorph.astro
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── travel-book.astro
│   │   ├── premium.astro
│   │   ├── download.astro
│   │   ├── about.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   ├── content/
│   │   ├── config.ts
│   │   └── blog/
│   │       ├── hidden-gems-portugal.md
│   │       ├── packing-light-guide.md
│   │       └── solo-travel-first-time.md
│   ├── styles/
│   │   └── global.css
│   └── scripts/
│       └── scroll.ts
└── README.md
```

---

## Task 1: Project scaffold and design tokens

**Files:**
- Create: `website/` (the Astro project root — `cd /Users/petersedman/temp/website`)
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `.gitignore`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro` (placeholder body)
- Create: `public/favicon.svg`
- Create: `README.md`

- [ ] **Step 1: Initialise git repo**

Run:

```bash
cd /Users/petersedman/temp/website
git init
```

Expected: `Initialized empty Git repository`

- [ ] **Step 2: Scaffold Astro with Tailwind**

Run:

```bash
cd /Users/petersedman/temp/website
npm create astro@latest -- . --template minimal --typescript strict --install --no-git --yes
npx astro add tailwind --yes
```

Expected: Astro project scaffolded, Tailwind integration installed, `astro.config.mjs` updated to include `tailwind()`.

- [ ] **Step 3: Install runtime dependencies**

Run:

```bash
npm install motion lucide-astro
```

Expected: `motion` and `lucide-astro` added to `package.json` dependencies.

- [ ] **Step 4: Write `tailwind.config.mjs` with design tokens**

Replace the file contents with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF2E5',
        navy: {
          DEFAULT: '#00293D',
          muted: 'rgba(0, 41, 61, 0.72)',
        },
        teal: {
          DEFAULT: '#00DB9A',
          dark: '#00B07B',
        },
        red: {
          DEFAULT: '#E60F3D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        hero: ['clamp(3rem, 8vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '800' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Write `src/styles/global.css`**

Replace with:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-cream text-navy font-sans antialiased;
  }

  :focus-visible {
    @apply outline-2 outline-offset-2 outline-teal;
  }
}

@layer utilities {
  .section-pad {
    @apply py-12 md:py-16 lg:py-24;
  }

  .container-x {
    @apply mx-auto max-w-8xl px-5 md:px-8 lg:px-12;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 6: Write `public/favicon.svg`**

Replace with:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#00293D"/><circle cx="16" cy="16" r="6" fill="#00DB9A"/></svg>
```

- [ ] **Step 7: Write a minimal `src/pages/index.astro` to verify the stack**

Replace with:

```astro
---
import '../styles/global.css';
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Scaffold check</title>
  </head>
  <body class="min-h-screen flex items-center justify-center">
    <h1 class="text-display text-navy">Cream + Navy, Inter loaded.</h1>
  </body>
</html>
```

- [ ] **Step 8: Write `.gitignore`**

Replace with:

```
node_modules
dist
.astro
.env
.DS_Store
.superpowers
```

- [ ] **Step 9: Run build to verify**

Run:

```bash
npm run build
```

Expected: exits 0, `dist/index.html` exists, contains the headline text.

- [ ] **Step 10: Commit**

Run:

```bash
git add -A
git commit -m "chore: scaffold Astro + Tailwind with design tokens"
```

---

## Task 2: Base layout with shared `<head>`

**Files:**
- Create: `src/layouts/Base.astro`
- Modify: `src/pages/index.astro` to use the layout

- [ ] **Step 1: Write `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const {
  title,
  description = 'Travel the world. Keep every step.',
  image = '/images/og-default.jpg',
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site ?? 'http://localhost/');
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonicalURL} />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body class="min-h-screen">
    <slot name="nav" />
    <main>
      <slot />
    </main>
    <slot name="footer" />
  </body>
</html>
```

- [ ] **Step 2: Update `src/pages/index.astro` to use the layout**

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="Home — Polarsteps-style Clone">
  <section class="container-x section-pad">
    <h1 class="text-hero">Travel the world. Keep every step.</h1>
    <p class="mt-6 max-w-2xl text-xl text-navy-muted">
      A marketing-site clone built with Astro and Tailwind.
    </p>
  </section>
</Base>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0. `dist/index.html` contains the new headline and `<meta name="description">`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(layout): add Base layout with shared head and OG tags"
```

---

## Task 3: `Nav` component

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro` to render it via the `nav` slot

- [ ] **Step 1: Write `src/components/Nav.astro`**

```astro
---
import { Menu, X } from 'lucide-astro';

const links = [
  { href: '/travel-book', label: 'Travel Book' },
  { href: '/premium', label: 'Premium' },
  { href: '/download', label: 'Download' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

const currentPath = Astro.url.pathname;
---
<header
  data-nav
  class="sticky top-0 z-40 bg-cream/85 backdrop-blur transition-shadow duration-200"
>
  <div class="container-x flex h-16 items-center justify-between md:h-20">
    <a href="/" class="flex items-center gap-2 font-extrabold tracking-tight text-navy">
      <span class="inline-block h-7 w-7 rounded-full bg-navy">
        <span class="block h-full w-full scale-[0.4] rounded-full bg-teal"></span>
      </span>
      <span class="text-lg">Tripsteps</span>
    </a>
    <nav class="hidden items-center gap-8 md:flex">
      {links.map(({ href, label }) => (
        <a
          href={href}
          class:list={[
            'text-sm font-medium transition-colors hover:text-teal-dark',
            currentPath.startsWith(href) ? 'text-teal-dark' : 'text-navy',
          ]}
        >
          {label}
        </a>
      ))}
    </nav>
    <div class="flex items-center gap-3">
      <a href="#" class="hidden text-sm font-medium text-navy md:inline">Log in</a>
      <a
        href="/download"
        class="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:shadow-lg md:inline-block"
      >
        Get the app
      </a>
      <button
        type="button"
        class="md:hidden"
        aria-label="Open menu"
        data-menu-open
      >
        <Menu size={24} />
      </button>
    </div>
  </div>

  <div
    class="fixed inset-0 z-50 hidden flex-col bg-cream md:hidden"
    data-mobile-menu
    role="dialog"
    aria-modal="true"
  >
    <div class="container-x flex h-16 items-center justify-between">
      <span class="font-extrabold text-navy">Menu</span>
      <button type="button" aria-label="Close menu" data-menu-close>
        <X size={24} />
      </button>
    </div>
    <div class="container-x flex flex-1 flex-col gap-6 pt-8 text-3xl font-extrabold text-navy">
      {links.map(({ href, label }) => <a href={href}>{label}</a>)}
      <a href="/download" class="mt-auto mb-12 rounded-full bg-navy px-6 py-4 text-center text-cream">
        Get the app
      </a>
    </div>
  </div>
</header>

<script>
  const header = document.querySelector('[data-nav]');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const menu = document.querySelector('[data-mobile-menu]');

  openBtn?.addEventListener('click', () => {
    menu?.classList.remove('hidden');
    menu?.classList.add('flex');
  });
  closeBtn?.addEventListener('click', () => {
    menu?.classList.add('hidden');
    menu?.classList.remove('flex');
  });

  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 4) header.classList.add('shadow-sm');
    else header.classList.remove('shadow-sm');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
</script>
```

- [ ] **Step 2: Render `Nav` via slot in `index.astro`**

Replace `src/pages/index.astro` contents with:

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
---
<Base title="Home — Polarsteps-style Clone">
  <Nav slot="nav" />
  <section class="container-x section-pad">
    <h1 class="text-hero">Travel the world. Keep every step.</h1>
    <p class="mt-6 max-w-2xl text-xl text-navy-muted">
      A marketing-site clone built with Astro and Tailwind.
    </p>
  </section>
</Base>
```

- [ ] **Step 3: Verify**

Run `npm run build`; expect exit 0. Run `npm run dev` and open the page — desktop shows horizontal links and "Get the app" pill; mobile (≤768px) shows hamburger which opens a full-screen menu.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(nav): add sticky nav with desktop links and mobile overlay menu"
```

---

## Task 4: `Footer` component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro` to render it via the `footer` slot

- [ ] **Step 1: Write `src/components/Footer.astro`**

```astro
---
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-astro';

const columns = [
  {
    title: 'Product',
    links: [
      { href: '/travel-book', label: 'Travel Book' },
      { href: '/premium', label: 'Premium' },
      { href: '/download', label: 'Download' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
      { href: '#', label: 'Careers' },
      { href: '#', label: 'Press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '#', label: 'Help Center' },
      { href: '#', label: 'Contact' },
      { href: '#', label: 'Status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '#', label: 'Privacy' },
      { href: '#', label: 'Terms' },
      { href: '#', label: 'Cookies' },
    ],
  },
];

const year = new Date().getFullYear();
---
<footer class="mt-24 bg-navy text-cream">
  <div class="container-x py-16 lg:py-24">
    <div class="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
      <div>
        <a href="/" class="flex items-center gap-2 text-xl font-extrabold">
          <span class="inline-block h-7 w-7 rounded-full bg-cream">
            <span class="block h-full w-full scale-[0.4] rounded-full bg-teal"></span>
          </span>
          Tripsteps
        </a>
        <p class="mt-4 max-w-sm text-cream/70">
          A journaling home for travellers. Built as a marketing-site study.
        </p>
        <form class="mt-6 flex max-w-sm gap-2">
          <input
            type="email"
            placeholder="you@example.com"
            class="flex-1 rounded-full bg-cream/10 px-4 py-3 text-cream placeholder:text-cream/50 focus:bg-cream/20"
          />
          <button type="submit" class="rounded-full bg-teal px-5 py-3 font-semibold text-navy">
            Subscribe
          </button>
        </form>
      </div>
      {columns.map((col) => (
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-cream/60">{col.title}</h4>
          <ul class="mt-4 space-y-3">
            {col.links.map((l) => (
              <li><a href={l.href} class="text-cream/90 hover:text-teal">{l.label}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div class="mt-16 flex flex-col items-start justify-between gap-6 border-t border-cream/10 pt-8 md:flex-row md:items-center">
      <p class="text-sm text-cream/60">© {year} Tripsteps. Marketing-site study. Imagery via Unsplash.</p>
      <div class="flex gap-4">
        <a href="#" aria-label="Instagram" class="text-cream/80 hover:text-teal"><Instagram size={20} /></a>
        <a href="#" aria-label="Facebook" class="text-cream/80 hover:text-teal"><Facebook size={20} /></a>
        <a href="#" aria-label="Twitter" class="text-cream/80 hover:text-teal"><Twitter size={20} /></a>
        <a href="#" aria-label="YouTube" class="text-cream/80 hover:text-teal"><Youtube size={20} /></a>
      </div>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Add `Footer` to `index.astro`**

Replace `src/pages/index.astro` with:

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
---
<Base title="Home — Polarsteps-style Clone">
  <Nav slot="nav" />
  <section class="container-x section-pad">
    <h1 class="text-hero">Travel the world. Keep every step.</h1>
    <p class="mt-6 max-w-2xl text-xl text-navy-muted">
      A marketing-site clone built with Astro and Tailwind.
    </p>
  </section>
  <Footer slot="footer" />
</Base>
```

- [ ] **Step 3: Verify**

`npm run build` exits 0. `npm run dev` shows the footer with 4 link columns, newsletter form, and social icons row.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(footer): add four-column footer with newsletter form"
```

---

## Task 5: `Button` primitive

**Files:**
- Create: `src/components/Button.astro`

- [ ] **Step 1: Write `src/components/Button.astro`**

```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit';
  class?: string;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  class: className = '',
} = Astro.props;

const base =
  'inline-flex items-center justify-center rounded-full font-semibold transition transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal';

const variants = {
  primary: 'bg-navy text-cream hover:bg-navy/90',
  secondary: 'bg-teal text-navy hover:bg-teal-dark',
  ghost: 'bg-transparent text-navy border border-navy hover:bg-navy hover:text-cream',
};

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-4 text-base',
};

const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
---
{href ? (
  <a href={href} class={classes}><slot /></a>
) : (
  <button type={type} class={classes}><slot /></button>
)}
```

- [ ] **Step 2: Verify**

Run `npm run build`; expect exit 0.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(ui): add Button primitive with primary/secondary/ghost variants"
```

---

## Task 6: `PhoneFrame` primitive

**Files:**
- Create: `src/components/PhoneFrame.astro`
- Create: `public/mockups/screen-map.svg`
- Create: `public/mockups/screen-journal.svg`
- Create: `public/mockups/screen-timeline.svg`
- Create: `public/mockups/screen-stats.svg`

- [ ] **Step 1: Write `src/components/PhoneFrame.astro`**

```astro
---
interface Props {
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const { size = 'md', class: className = '' } = Astro.props;

const sizes = {
  sm: 'w-[220px] h-[460px] rounded-[36px] p-2',
  md: 'w-[280px] h-[580px] rounded-[44px] p-2.5',
  lg: 'w-[340px] h-[700px] rounded-[52px] p-3',
};
---
<div class={`relative bg-navy shadow-2xl ${sizes[size]} ${className}`}>
  <div class="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-navy z-10"></div>
  <div class="h-full w-full overflow-hidden rounded-[inherit] bg-cream">
    <slot />
  </div>
</div>
```

- [ ] **Step 2: Write the four placeholder screen SVGs**

Each is a stylised static UI mockup. Create `public/mockups/screen-map.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 580" preserveAspectRatio="xMidYMid slice">
  <rect width="280" height="580" fill="#E8F5EC"/>
  <path d="M-20 200 Q 80 160 160 220 T 320 180 L 320 620 L -20 620 Z" fill="#CFE8D8"/>
  <path d="M-20 340 Q 100 300 180 360 T 320 340 L 320 620 L -20 620 Z" fill="#A8D4B8"/>
  <circle cx="140" cy="260" r="10" fill="#E60F3D"/>
  <circle cx="140" cy="260" r="18" fill="#E60F3D" opacity="0.25"/>
  <path d="M60 380 L 140 260 L 220 320 L 260 420" stroke="#00293D" stroke-width="3" stroke-dasharray="4 6" fill="none"/>
  <circle cx="60" cy="380" r="6" fill="#00293D"/>
  <circle cx="220" cy="320" r="6" fill="#00293D"/>
  <circle cx="260" cy="420" r="6" fill="#00293D"/>
  <rect x="20" y="40" width="240" height="44" rx="22" fill="#FFF" opacity="0.9"/>
  <circle cx="44" cy="62" r="10" fill="#00293D" opacity="0.6"/>
  <rect x="60" y="56" width="140" height="12" rx="6" fill="#00293D" opacity="0.25"/>
</svg>
```

Create `public/mockups/screen-journal.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 580" preserveAspectRatio="xMidYMid slice">
  <rect width="280" height="580" fill="#FFF2E5"/>
  <rect x="20" y="40" width="240" height="180" rx="20" fill="#00293D"/>
  <circle cx="70" cy="90" r="20" fill="#00DB9A"/>
  <rect x="100" y="80" width="120" height="10" rx="5" fill="#FFF2E5" opacity="0.9"/>
  <rect x="100" y="100" width="80" height="8" rx="4" fill="#FFF2E5" opacity="0.5"/>
  <rect x="40" y="130" width="200" height="8" rx="4" fill="#FFF2E5" opacity="0.3"/>
  <rect x="40" y="150" width="170" height="8" rx="4" fill="#FFF2E5" opacity="0.3"/>
  <rect x="40" y="170" width="200" height="8" rx="4" fill="#FFF2E5" opacity="0.3"/>
  <rect x="20" y="240" width="240" height="140" rx="20" fill="#00DB9A" opacity="0.2"/>
  <rect x="20" y="400" width="240" height="140" rx="20" fill="#E60F3D" opacity="0.18"/>
</svg>
```

Create `public/mockups/screen-timeline.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 580" preserveAspectRatio="xMidYMid slice">
  <rect width="280" height="580" fill="#FFF2E5"/>
  <line x1="40" y1="80" x2="40" y2="540" stroke="#00293D" stroke-width="2" stroke-dasharray="3 5"/>
  <g>
    <circle cx="40" cy="120" r="10" fill="#00DB9A"/>
    <rect x="70" y="100" width="180" height="60" rx="14" fill="#FFF"/>
    <rect x="84" y="114" width="80" height="10" rx="5" fill="#00293D"/>
    <rect x="84" y="134" width="130" height="8" rx="4" fill="#00293D" opacity="0.5"/>
  </g>
  <g>
    <circle cx="40" cy="240" r="10" fill="#00DB9A"/>
    <rect x="70" y="220" width="180" height="60" rx="14" fill="#FFF"/>
    <rect x="84" y="234" width="100" height="10" rx="5" fill="#00293D"/>
    <rect x="84" y="254" width="110" height="8" rx="4" fill="#00293D" opacity="0.5"/>
  </g>
  <g>
    <circle cx="40" cy="360" r="10" fill="#E60F3D"/>
    <rect x="70" y="340" width="180" height="60" rx="14" fill="#FFF"/>
    <rect x="84" y="354" width="90" height="10" rx="5" fill="#00293D"/>
    <rect x="84" y="374" width="140" height="8" rx="4" fill="#00293D" opacity="0.5"/>
  </g>
  <g>
    <circle cx="40" cy="480" r="10" fill="#00DB9A"/>
    <rect x="70" y="460" width="180" height="60" rx="14" fill="#FFF"/>
    <rect x="84" y="474" width="70" height="10" rx="5" fill="#00293D"/>
    <rect x="84" y="494" width="120" height="8" rx="4" fill="#00293D" opacity="0.5"/>
  </g>
</svg>
```

Create `public/mockups/screen-stats.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 580" preserveAspectRatio="xMidYMid slice">
  <rect width="280" height="580" fill="#00293D"/>
  <text x="24" y="64" font-family="Inter,sans-serif" font-size="14" fill="#FFF2E5" opacity="0.7">Your year</text>
  <text x="24" y="108" font-family="Inter,sans-serif" font-size="40" font-weight="800" fill="#FFF2E5">14</text>
  <text x="24" y="136" font-family="Inter,sans-serif" font-size="14" fill="#00DB9A">countries</text>
  <text x="140" y="108" font-family="Inter,sans-serif" font-size="40" font-weight="800" fill="#FFF2E5">28,412</text>
  <text x="140" y="136" font-family="Inter,sans-serif" font-size="14" fill="#00DB9A">km travelled</text>
  <rect x="24" y="180" width="232" height="8" rx="4" fill="#FFF2E5" opacity="0.15"/>
  <rect x="24" y="180" width="168" height="8" rx="4" fill="#00DB9A"/>
  <rect x="24" y="220" width="232" height="120" rx="16" fill="#FFF2E5" opacity="0.08"/>
  <polyline points="36,320 80,290 124,300 168,260 212,280 244,240" stroke="#00DB9A" stroke-width="3" fill="none"/>
  <rect x="24" y="360" width="232" height="180" rx="16" fill="#FFF2E5" opacity="0.08"/>
  <circle cx="90" cy="450" r="56" fill="#00DB9A" opacity="0.8"/>
  <path d="M90 394 A 56 56 0 0 1 138 478 L 90 450 Z" fill="#E60F3D"/>
</svg>
```

- [ ] **Step 3: Verify**

Run `npm run build`; expect exit 0. The SVGs exist in `public/mockups/`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(ui): add PhoneFrame and four placeholder app-screen SVGs"
```

---

## Task 7: `FeatureRow`, `Testimonial`, `PressLogos` components

**Files:**
- Create: `src/components/FeatureRow.astro`
- Create: `src/components/Testimonial.astro`
- Create: `src/components/PressLogos.astro`

- [ ] **Step 1: Write `src/components/FeatureRow.astro`**

```astro
---
interface Props {
  eyebrow?: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  reverse?: boolean;
}

const { eyebrow, title, body, image, alt, reverse = false } = Astro.props;
---
<div class={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${reverse ? 'lg:[&>div:first-child]:order-2' : ''}`}>
  <div>
    {eyebrow && <p class="text-xs font-semibold uppercase tracking-widest text-teal-dark">{eyebrow}</p>}
    <h3 class="mt-3 text-display">{title}</h3>
    <p class="mt-5 max-w-lg text-lg text-navy-muted">{body}</p>
  </div>
  <div class="overflow-hidden rounded-4xl">
    <img src={image} alt={alt} class="aspect-[4/3] w-full object-cover" loading="lazy" />
  </div>
</div>
```

- [ ] **Step 2: Write `src/components/Testimonial.astro`**

```astro
---
interface Props {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const { quote, author, role, avatar } = Astro.props;
---
<figure class="rounded-4xl bg-cream p-8 shadow-sm ring-1 ring-navy/5">
  <blockquote class="text-lg leading-relaxed text-navy">
    &ldquo;{quote}&rdquo;
  </blockquote>
  <figcaption class="mt-6 flex items-center gap-3">
    <img src={avatar} alt="" class="h-12 w-12 rounded-full object-cover" loading="lazy" />
    <div>
      <div class="font-semibold text-navy">{author}</div>
      <div class="text-sm text-navy-muted">{role}</div>
    </div>
  </figcaption>
</figure>
```

- [ ] **Step 3: Write `src/components/PressLogos.astro`**

```astro
---
const logos = ['Wired', 'The Verge', 'TechCrunch', 'Condé Nast', 'Lonely Planet', 'Outside'];
---
<div class="container-x section-pad">
  <p class="text-center text-xs font-semibold uppercase tracking-widest text-navy/50">Featured in</p>
  <div class="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
    {logos.map((name) => (
      <span class="text-xl font-extrabold tracking-tight text-navy/70">{name}</span>
    ))}
  </div>
</div>
```

- [ ] **Step 4: Verify**

Run `npm run build`; expect exit 0.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(ui): add FeatureRow, Testimonial, PressLogos components"
```

---

## Task 8: `PricingCard` and `FAQ` components

**Files:**
- Create: `src/components/PricingCard.astro`
- Create: `src/components/FAQ.astro`

- [ ] **Step 1: Write `src/components/PricingCard.astro`**

```astro
---
import { Check } from 'lucide-astro';
import Button from './Button.astro';

interface Props {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  ctaHref?: string;
  highlight?: boolean;
}

const { name, price, period, features, cta, ctaHref = '#', highlight = false } = Astro.props;
---
<div
  class:list={[
    'flex flex-col rounded-4xl p-8 ring-1',
    highlight ? 'bg-navy text-cream ring-navy shadow-xl' : 'bg-cream text-navy ring-navy/10',
  ]}
>
  <h3 class="text-2xl font-extrabold">{name}</h3>
  <div class="mt-6 flex items-baseline gap-1">
    <span class="text-5xl font-extrabold">{price}</span>
    <span class={highlight ? 'text-cream/70' : 'text-navy-muted'}>/{period}</span>
  </div>
  <ul class="mt-8 flex-1 space-y-3">
    {features.map((f) => (
      <li class="flex items-start gap-3">
        <Check size={20} class:list={[highlight ? 'text-teal' : 'text-teal-dark', 'mt-0.5 shrink-0']} />
        <span class={highlight ? 'text-cream/90' : 'text-navy'}>{f}</span>
      </li>
    ))}
  </ul>
  <div class="mt-8">
    <Button
      href={ctaHref}
      variant={highlight ? 'secondary' : 'primary'}
      size="lg"
      class="w-full"
    >
      {cta}
    </Button>
  </div>
</div>
```

- [ ] **Step 2: Write `src/components/FAQ.astro`**

```astro
---
interface FAQItem { q: string; a: string; }
interface Props {
  items: FAQItem[];
  title?: string;
}

const { items, title = 'Frequently asked questions' } = Astro.props;
---
<section class="container-x section-pad">
  <h2 class="text-center text-display">{title}</h2>
  <div class="mx-auto mt-12 max-w-3xl divide-y divide-navy/10">
    {items.map(({ q, a }) => (
      <details class="group py-5">
        <summary class="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-navy">
          {q}
          <span class="ml-4 shrink-0 text-2xl transition-transform group-open:rotate-45">+</span>
        </summary>
        <p class="mt-3 text-navy-muted">{a}</p>
      </details>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Verify**

Run `npm run build`; expect exit 0.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(ui): add PricingCard and FAQ components"
```

---

## Task 9: Scroll animation helpers

**Files:**
- Create: `src/components/scroll/FadeInSection.astro`
- Create: `src/components/scroll/ParallaxImage.astro`
- Create: `src/components/scroll/StickyPhoneMorph.astro`
- Create: `src/scripts/scroll.ts`
- Modify: `src/layouts/Base.astro` to import the scroll script

- [ ] **Step 1: Write `src/scripts/scroll.ts`**

```ts
import { animate, scroll } from 'motion';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const initFadeIns = () => {
  const targets = document.querySelectorAll<HTMLElement>('[data-fade-in]');
  if (reduced) {
    targets.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      const delay = Number(el.dataset.fadeDelay ?? 0);
      animate(el, { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] }, {
        duration: 0.7,
        delay: delay / 1000,
        easing: [0.22, 1, 0.36, 1],
      });
      io.unobserve(el);
    });
  }, { threshold: 0.15 });
  targets.forEach((el) => io.observe(el));
};

const initParallax = () => {
  if (reduced) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax ?? 0.3);
    scroll(animate(el, { transform: [`translateY(${60 * speed}px)`, `translateY(-${60 * speed}px)`] }), {
      target: el.parentElement ?? el,
      offset: ['start end', 'end start'],
    });
  });
};

const initStickyMorph = () => {
  document.querySelectorAll<HTMLElement>('[data-sticky-morph]').forEach((container) => {
    const screens = container.querySelectorAll<HTMLElement>('[data-morph-screen]');
    if (screens.length === 0) return;
    if (reduced) {
      screens.forEach((s, i) => { s.style.opacity = i === 0 ? '1' : '0'; });
      return;
    }
    const step = 1 / screens.length;
    scroll((progress) => {
      screens.forEach((screen, i) => {
        const localStart = i * step;
        const localEnd = (i + 1) * step;
        let opacity = 0;
        if (progress >= localStart && progress <= localEnd) {
          const t = (progress - localStart) / step;
          opacity = t < 0.5 ? t * 2 : (1 - t) * 2;
        }
        if (i === 0 && progress < step * 0.5) opacity = 1 - progress / (step * 0.5);
        if (i === screens.length - 1 && progress > 1 - step * 0.5) opacity = (progress - (1 - step * 0.5)) / (step * 0.5);
        screen.style.opacity = String(Math.max(0, Math.min(1, opacity)));
      });
    }, { target: container, offset: ['start start', 'end end'] });
  });
};

const init = () => { initFadeIns(); initParallax(); initStickyMorph(); };

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

- [ ] **Step 2: Write `src/components/scroll/FadeInSection.astro`**

```astro
---
interface Props {
  delay?: number;
  class?: string;
}
const { delay = 0, class: className = '' } = Astro.props;
---
<div
  data-fade-in
  data-fade-delay={delay}
  style="opacity: 0;"
  class={className}
>
  <slot />
</div>
```

- [ ] **Step 3: Write `src/components/scroll/ParallaxImage.astro`**

```astro
---
interface Props {
  src: string;
  alt: string;
  speed?: number;
  class?: string;
}
const { src, alt, speed = 0.3, class: className = '' } = Astro.props;
---
<div class={`overflow-hidden ${className}`}>
  <img
    src={src}
    alt={alt}
    data-parallax={speed}
    loading="lazy"
    class="h-full w-full object-cover will-change-transform"
  />
</div>
```

- [ ] **Step 4: Write `src/components/scroll/StickyPhoneMorph.astro`**

```astro
---
import PhoneFrame from '../PhoneFrame.astro';

interface Screen {
  src: string;
  alt: string;
  caption: string;
}
interface Props {
  screens: Screen[];
}
const { screens } = Astro.props;
---
<section data-sticky-morph class="relative" style={`height: ${screens.length * 100}vh;`}>
  <div class="sticky top-0 flex h-screen items-center justify-center">
    <div class="container-x grid w-full items-center gap-12 lg:grid-cols-2">
      <div class="relative h-[580px]">
        {screens.map((s, i) => (
          <div
            data-morph-screen
            class="absolute inset-0 flex items-center justify-center"
            style={`opacity: ${i === 0 ? 1 : 0};`}
          >
            <PhoneFrame size="md">
              <img src={s.src} alt={s.alt} class="h-full w-full object-cover" />
            </PhoneFrame>
          </div>
        ))}
      </div>
      <div class="relative h-[220px]">
        {screens.map((s, i) => (
          <div
            data-morph-screen
            class="absolute inset-0"
            style={`opacity: ${i === 0 ? 1 : 0};`}
          >
            <p class="text-xs font-semibold uppercase tracking-widest text-teal-dark">0{i + 1}</p>
            <h3 class="mt-3 text-display">{s.caption}</h3>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Wire the scroll script into `Base.astro`**

In `src/layouts/Base.astro`, replace the `<body>` opening and following `<slot name="nav" />` block so that the body ends with a script import. The final `Base.astro` should look like:

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const {
  title,
  description = 'Travel the world. Keep every step.',
  image = '/images/og-default.jpg',
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site ?? 'http://localhost/');
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonicalURL} />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body class="min-h-screen">
    <slot name="nav" />
    <main>
      <slot />
    </main>
    <slot name="footer" />
    <script>
      import '../scripts/scroll';
    </script>
  </body>
</html>
```

- [ ] **Step 6: Verify**

Run `npm run build`; expect exit 0. Boot `npm run dev` — no console errors; `motion` script loads without throwing.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(scroll): add FadeInSection, ParallaxImage, StickyPhoneMorph with Motion One"
```

---

## Task 10: Home page — static sections

**Files:**
- Modify: `src/pages/index.astro` — full homepage with all sections except `StickyPhoneMorph` (that's Task 11).
- Create: `public/images/hero.jpg` (Unsplash download — see step 1)
- Create: `public/images/avatar-{1,2,3}.jpg`
- Create: `public/images/feature-{1,2,3}.jpg`

- [ ] **Step 1: Download placeholder imagery from Unsplash**

Run:

```bash
mkdir -p public/images
curl -sSL "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80" -o public/images/hero.jpg
curl -sSL "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80" -o public/images/feature-1.jpg
curl -sSL "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&q=80" -o public/images/feature-2.jpg
curl -sSL "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&q=80" -o public/images/feature-3.jpg
curl -sSL "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" -o public/images/avatar-1.jpg
curl -sSL "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" -o public/images/avatar-2.jpg
curl -sSL "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" -o public/images/avatar-3.jpg
```

Expected: 7 files created in `public/images/`, all non-zero size.

- [ ] **Step 2: Replace `src/pages/index.astro` with the full home page**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import Button from '../components/Button.astro';
import FeatureRow from '../components/FeatureRow.astro';
import Testimonial from '../components/Testimonial.astro';
import PressLogos from '../components/PressLogos.astro';
import PhoneFrame from '../components/PhoneFrame.astro';
import FadeInSection from '../components/scroll/FadeInSection.astro';
import ParallaxImage from '../components/scroll/ParallaxImage.astro';

const testimonials = [
  {
    quote: 'I came home with 2,000 photos and no idea what order anything happened in. Tripsteps sorted every step by itself.',
    author: 'Ines Carvalho',
    role: 'Six months in Southeast Asia',
    avatar: '/images/avatar-1.jpg',
  },
  {
    quote: 'My parents followed along from the other side of the world without me lifting a finger. That alone paid for the trip.',
    author: 'Marcus Lindqvist',
    role: 'Van life across Patagonia',
    avatar: '/images/avatar-2.jpg',
  },
  {
    quote: 'The printed book arrived three weeks after I got home. Flipping through it feels like being back on the road.',
    author: 'Priya Shah',
    role: 'Weekend trips, monthly summaries',
    avatar: '/images/avatar-3.jpg',
  },
];
---
<Base title="Tripsteps — Travel the world. Keep every step.">
  <Nav slot="nav" />

  <section class="container-x section-pad text-center">
    <p class="text-xs font-semibold uppercase tracking-widest text-teal-dark">Travel journal · Automatic tracking</p>
    <h1 class="mx-auto mt-4 max-w-5xl text-hero">Travel the world. Keep every step.</h1>
    <p class="mx-auto mt-6 max-w-2xl text-xl text-navy-muted">
      A travel journal that writes itself. Drop your phone in a pocket — we map the route, collect the photos, and make a keepsake at the end.
    </p>
    <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
      <Button href="/download" variant="primary" size="lg">Get the app</Button>
      <Button href="/travel-book" variant="ghost" size="lg">See the travel book</Button>
    </div>
    <div class="mt-16 overflow-hidden rounded-5xl shadow-2xl">
      <ParallaxImage src="/images/hero.jpg" alt="Traveller overlooking a mountain landscape at sunrise" class="aspect-[16/9]" speed={0.25} />
    </div>
  </section>

  <FadeInSection>
    <PressLogos />
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad text-center">
      <h2 class="mx-auto max-w-3xl text-display">Three ways to keep the trip.</h2>
      <p class="mx-auto mt-5 max-w-2xl text-lg text-navy-muted">
        Auto-tracked, beautifully shared, and printed at the end.
      </p>
      <div class="mt-16 grid gap-8 md:grid-cols-3">
        <div class="rounded-4xl bg-white p-8 text-left ring-1 ring-navy/5">
          <div class="inline-flex rounded-full bg-teal/20 p-3"><span class="block h-3 w-3 rounded-full bg-teal-dark"></span></div>
          <h3 class="mt-6 text-2xl font-extrabold">Tracked for you</h3>
          <p class="mt-3 text-navy-muted">Leave the app in your pocket. Your route draws itself as you move.</p>
        </div>
        <div class="rounded-4xl bg-white p-8 text-left ring-1 ring-navy/5">
          <div class="inline-flex rounded-full bg-red/15 p-3"><span class="block h-3 w-3 rounded-full bg-red"></span></div>
          <h3 class="mt-6 text-2xl font-extrabold">Shared live</h3>
          <p class="mt-3 text-navy-muted">One link lets the whole family ride along, with no sign-up required.</p>
        </div>
        <div class="rounded-4xl bg-white p-8 text-left ring-1 ring-navy/5">
          <div class="inline-flex rounded-full bg-navy/10 p-3"><span class="block h-3 w-3 rounded-full bg-navy"></span></div>
          <h3 class="mt-6 text-2xl font-extrabold">Printed forever</h3>
          <p class="mt-3 text-navy-muted">Turn the whole thing into a hardcover book you'll flip through for years.</p>
        </div>
      </div>
    </section>
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad">
      <FeatureRow
        eyebrow="Tracked for you"
        title="Your route, drawn by walking."
        body="Start a trip and forget about it. Tripsteps stitches your movement into a living map — streets, ferries, mountain passes, dusty roads. The line grows while you do."
        image="/images/feature-1.jpg"
        alt="Winding mountain road at golden hour"
      />
    </section>
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad">
      <FeatureRow
        eyebrow="Shared live"
        title="One link. Everyone's invited."
        body="Family, friends, that one cousin who worries — they can follow along in the browser. No account, no app, no friction."
        image="/images/feature-2.jpg"
        alt="Two friends looking at a map"
        reverse
      />
    </section>
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad">
      <FeatureRow
        eyebrow="Printed forever"
        title="A book you'll actually open."
        body="When the trip is over, we print the highlight reel. Photos, words, and that beautiful meandering line — bound in a hardcover that lives on the shelf, not in a cloud."
        image="/images/feature-3.jpg"
        alt="Hands holding an open photo book"
      />
    </section>
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad">
      <h2 class="text-center text-display">Road-tested by thousands.</h2>
      <div class="mt-16 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => <Testimonial {...t} />)}
      </div>
    </section>
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad">
      <div class="rounded-5xl bg-navy p-10 text-center text-cream md:p-16">
        <h2 class="mx-auto max-w-3xl text-display">Your next trip deserves to be remembered.</h2>
        <p class="mx-auto mt-5 max-w-xl text-lg text-cream/70">
          Install Tripsteps, start a trip, and forget about it. We'll take it from here.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/download" variant="secondary" size="lg">Download the app</Button>
          <Button href="/travel-book" variant="ghost" size="lg" class="border-cream/40 !text-cream hover:!bg-cream hover:!text-navy">Learn about the book</Button>
        </div>
      </div>
    </section>
  </FadeInSection>

  <Footer slot="footer" />
</Base>
```

- [ ] **Step 3: Verify**

Run `npm run build`; expect exit 0. Boot `npm run dev` and visit `http://localhost:4321/`. Verify all sections render: hero, press logos, 3-card row, three feature rows (alternating), testimonials grid, dark CTA, footer. Scroll — fade-ins should trigger on sections; hero image should parallax.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(home): build full homepage with hero, features, testimonials, CTA"
```

---

## Task 11: Home page — sticky phone morph scroll sequence

**Files:**
- Modify: `src/pages/index.astro` — insert `StickyPhoneMorph` between the 3-card row and the first `FeatureRow`.

- [ ] **Step 1: Update `src/pages/index.astro` to import and insert `StickyPhoneMorph`**

At the top of the frontmatter, add:

```astro
import StickyPhoneMorph from '../components/scroll/StickyPhoneMorph.astro';

const morphScreens = [
  { src: '/mockups/screen-map.svg', alt: 'Map showing a travel route', caption: 'Your route draws itself as you walk.' },
  { src: '/mockups/screen-timeline.svg', alt: 'Chronological timeline of trip stops', caption: 'Every stop, in the order it happened.' },
  { src: '/mockups/screen-journal.svg', alt: 'Trip journal entry with photos', caption: 'Photos and notes collected in one place.' },
  { src: '/mockups/screen-stats.svg', alt: 'Annual travel statistics dashboard', caption: 'Look back and see the whole year.' },
];
```

Then in the body, insert this section immediately after the first `FadeInSection` that contains the 3-card row (the one with "Three ways to keep the trip."):

```astro
<StickyPhoneMorph screens={morphScreens} />
```

- [ ] **Step 2: Verify**

Run `npm run build`; expect exit 0. Boot `npm run dev`. Scroll through the section — the phone should stay pinned center-screen while the screen content and caption cross-fade between the four screens. At the end, the next section (feature rows) appears.

- [ ] **Step 3: Verify reduced-motion behaviour**

In Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Reload. The first screen should remain visible, no scroll-driven cross-fade. Other sections should appear instantly without fades.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(home): add sticky phone morph scroll sequence"
```

---

## Task 12: Travel Book page

**Files:**
- Create: `src/pages/travel-book.astro`
- Create: `public/images/book-{1,2,3}.jpg`

- [ ] **Step 1: Download imagery**

```bash
curl -sSL "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80" -o public/images/book-1.jpg
curl -sSL "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80" -o public/images/book-2.jpg
curl -sSL "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80" -o public/images/book-3.jpg
```

- [ ] **Step 2: Write `src/pages/travel-book.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import Button from '../components/Button.astro';
import FeatureRow from '../components/FeatureRow.astro';
import FAQ from '../components/FAQ.astro';
import FadeInSection from '../components/scroll/FadeInSection.astro';

const steps = [
  { n: 1, title: 'Travel', body: 'Let the app track the trip in the background.' },
  { n: 2, title: 'Pick your favourites', body: 'We suggest the photos and entries worth keeping. Tweak as you like.' },
  { n: 3, title: 'Order the book', body: 'Hardcover, matte paper, printed in your region, delivered in two weeks.' },
];

const faq = [
  { q: 'How big is the book?', a: 'Standard size is 20 × 25 cm, 80 to 200 pages depending on your trip.' },
  { q: 'What paper is it printed on?', a: 'Matte 170 gsm interior; hardcover with textured linen finish.' },
  { q: 'How long does shipping take?', a: 'Books print and ship within 10 business days from the region closest to you.' },
  { q: 'Can I preview it first?', a: 'Yes. Every book goes through a free digital proof before you confirm.' },
];
---
<Base title="Travel Book — Tripsteps">
  <Nav slot="nav" />

  <section class="container-x section-pad text-center">
    <p class="text-xs font-semibold uppercase tracking-widest text-teal-dark">Hardcover · Printed in your region</p>
    <h1 class="mx-auto mt-4 max-w-4xl text-hero">Your trip, printed and bound.</h1>
    <p class="mx-auto mt-6 max-w-2xl text-xl text-navy-muted">
      Turn the whole adventure into a hardcover book. Maps, photos, and handwritten notes, all in the right order.
    </p>
    <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
      <Button href="#order" variant="primary" size="lg">Order from $39</Button>
      <Button href="#preview" variant="ghost" size="lg">See a sample</Button>
    </div>
    <div class="mt-16 overflow-hidden rounded-5xl shadow-2xl">
      <img src="/images/book-1.jpg" alt="Open photo book on a wooden table" class="aspect-[16/9] w-full object-cover" />
    </div>
  </section>

  <FadeInSection>
    <section class="container-x section-pad" id="preview">
      <FeatureRow
        eyebrow="Sample spreads"
        title="Designed for reading, not just scrolling."
        body="Each spread mixes your photos with the day's map and notes. Typography is tuned for travel writing — big captions, generous margins, no AI slop."
        image="/images/book-2.jpg"
        alt="Close-up of a printed photo book spread"
      />
    </section>
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad">
      <h2 class="text-center text-display">How it works.</h2>
      <div class="mt-16 grid gap-8 md:grid-cols-3">
        {steps.map(({ n, title, body }) => (
          <div class="rounded-4xl bg-white p-8 ring-1 ring-navy/5">
            <div class="text-xs font-semibold uppercase tracking-widest text-teal-dark">Step 0{n}</div>
            <h3 class="mt-3 text-2xl font-extrabold">{title}</h3>
            <p class="mt-3 text-navy-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad" id="order">
      <div class="rounded-5xl bg-navy p-10 text-center text-cream md:p-16">
        <h2 class="mx-auto max-w-3xl text-display">Ready to print your trip?</h2>
        <p class="mx-auto mt-5 max-w-xl text-lg text-cream/70">
          Open the app, pick a trip, and hit "Make book." We'll handle the layout.
        </p>
        <div class="mt-8"><Button href="/download" variant="secondary" size="lg">Start a book</Button></div>
      </div>
    </section>
  </FadeInSection>

  <FadeInSection>
    <FAQ items={faq} />
  </FadeInSection>

  <Footer slot="footer" />
</Base>
```

- [ ] **Step 3: Verify**

Run `npm run build`; exit 0. `npm run dev`, visit `/travel-book`. Nav highlights "Travel Book", all sections render.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(travel-book): add Travel Book page"
```

---

## Task 13: Premium page

**Files:**
- Create: `src/pages/premium.astro`

- [ ] **Step 1: Write `src/pages/premium.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import Button from '../components/Button.astro';
import PricingCard from '../components/PricingCard.astro';
import FAQ from '../components/FAQ.astro';
import FadeInSection from '../components/scroll/FadeInSection.astro';
import { Check, X } from 'lucide-astro';

const rows = [
  { feature: 'Unlimited trip tracking', free: true, pro: true },
  { feature: 'Live trip sharing', free: true, pro: true },
  { feature: 'Offline maps', free: false, pro: true },
  { feature: '4K photo uploads', free: false, pro: true },
  { feature: 'Custom trip cover designs', free: false, pro: true },
  { feature: 'Priority book printing', free: false, pro: true },
  { feature: 'Advanced trip stats', free: false, pro: true },
];

const faq = [
  { q: 'Can I cancel anytime?', a: 'Yes. Premium cancels instantly; you keep access to the end of the billing period.' },
  { q: 'Does Premium include the travel book?', a: 'No — the book is a separate one-off purchase. Premium does give you priority printing.' },
  { q: 'Is there a free trial?', a: 'Yes, 14 days of Premium with full access. No card required to start.' },
];
---
<Base title="Premium — Tripsteps">
  <Nav slot="nav" />

  <section class="container-x section-pad text-center">
    <p class="text-xs font-semibold uppercase tracking-widest text-teal-dark">Premium</p>
    <h1 class="mx-auto mt-4 max-w-4xl text-hero">Everything Tripsteps can do, unlocked.</h1>
    <p class="mx-auto mt-6 max-w-2xl text-xl text-navy-muted">
      Offline maps for the back roads. 4K photos for the ones worth keeping. Priority on your book when you want to gift it.
    </p>
  </section>

  <FadeInSection>
    <section class="container-x section-pad">
      <div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <PricingCard
          name="Free"
          price="$0"
          period="forever"
          features={['Unlimited trips', 'Live sharing', 'Standard photo quality', 'Basic trip stats']}
          cta="Download the app"
          ctaHref="/download"
        />
        <PricingCard
          name="Premium"
          price="$29"
          period="year"
          features={['Everything in Free', 'Offline maps', '4K photo uploads', 'Priority book printing', 'Advanced stats']}
          cta="Start 14-day trial"
          ctaHref="/download"
          highlight
        />
      </div>
    </section>
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad">
      <h2 class="text-center text-display">Free vs Premium.</h2>
      <div class="mx-auto mt-12 max-w-3xl overflow-hidden rounded-4xl ring-1 ring-navy/10">
        <table class="w-full text-left">
          <thead class="bg-navy text-cream">
            <tr>
              <th class="px-6 py-4 font-semibold">Feature</th>
              <th class="px-6 py-4 text-center font-semibold">Free</th>
              <th class="px-6 py-4 text-center font-semibold">Premium</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-navy/10 bg-white">
            {rows.map(({ feature, free, pro }) => (
              <tr>
                <td class="px-6 py-4">{feature}</td>
                <td class="px-6 py-4 text-center">
                  {free ? <Check class="mx-auto text-teal-dark" size={20} /> : <X class="mx-auto text-navy/25" size={20} />}
                </td>
                <td class="px-6 py-4 text-center">
                  {pro ? <Check class="mx-auto text-teal-dark" size={20} /> : <X class="mx-auto text-navy/25" size={20} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </FadeInSection>

  <FadeInSection>
    <FAQ items={faq} />
  </FadeInSection>

  <Footer slot="footer" />
</Base>
```

- [ ] **Step 2: Verify**

`npm run build` exits 0. Visit `/premium`; two pricing cards, comparison table, FAQ all render. Premium card highlighted.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(premium): add Premium page with pricing cards, comparison table, FAQ"
```

---

## Task 14: Download page

**Files:**
- Create: `src/pages/download.astro`
- Create: `public/mockups/qr.svg`

- [ ] **Step 1: Write `public/mockups/qr.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#FFF"/>
  <g fill="#00293D">
    <rect x="10" y="10" width="50" height="50"/>
    <rect x="20" y="20" width="30" height="30" fill="#FFF"/>
    <rect x="28" y="28" width="14" height="14"/>
    <rect x="140" y="10" width="50" height="50"/>
    <rect x="150" y="20" width="30" height="30" fill="#FFF"/>
    <rect x="158" y="28" width="14" height="14"/>
    <rect x="10" y="140" width="50" height="50"/>
    <rect x="20" y="150" width="30" height="30" fill="#FFF"/>
    <rect x="28" y="158" width="14" height="14"/>
    <rect x="72" y="12" width="12" height="12"/>
    <rect x="92" y="24" width="12" height="12"/>
    <rect x="112" y="12" width="12" height="12"/>
    <rect x="80" y="44" width="12" height="12"/>
    <rect x="100" y="56" width="12" height="12"/>
    <rect x="120" y="44" width="12" height="12"/>
    <rect x="72" y="76" width="12" height="12"/>
    <rect x="92" y="88" width="12" height="12"/>
    <rect x="112" y="76" width="12" height="12"/>
    <rect x="80" y="108" width="12" height="12"/>
    <rect x="100" y="120" width="12" height="12"/>
    <rect x="120" y="108" width="12" height="12"/>
    <rect x="72" y="140" width="12" height="12"/>
    <rect x="92" y="152" width="12" height="12"/>
    <rect x="112" y="140" width="12" height="12"/>
    <rect x="140" y="80" width="12" height="12"/>
    <rect x="160" y="100" width="12" height="12"/>
    <rect x="140" y="120" width="12" height="12"/>
    <rect x="160" y="140" width="12" height="12"/>
    <rect x="140" y="160" width="12" height="12"/>
    <rect x="176" y="176" width="14" height="14"/>
  </g>
</svg>
```

- [ ] **Step 2: Write `src/pages/download.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import PhoneFrame from '../components/PhoneFrame.astro';
import FadeInSection from '../components/scroll/FadeInSection.astro';
import { Apple, Smartphone, Wifi, BatteryFull, Map, Camera } from 'lucide-astro';

const featureTiles = [
  { icon: Map, title: 'Auto-tracked route', body: 'Background GPS draws your path in real time.' },
  { icon: Camera, title: 'Photo sync', body: 'Photos attach to the right step by time and place.' },
  { icon: Wifi, title: 'Works offline', body: 'No signal? The trip still records. It uploads later.' },
  { icon: BatteryFull, title: 'Battery-friendly', body: 'Designed to last a full travel day on one charge.' },
];
---
<Base title="Download Tripsteps">
  <Nav slot="nav" />

  <section class="container-x section-pad">
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-teal-dark">Free on iOS & Android</p>
        <h1 class="mt-4 text-hero">Get Tripsteps.</h1>
        <p class="mt-6 max-w-xl text-xl text-navy-muted">
          Install the app, start a trip, and put your phone away. That's the whole setup.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#" class="flex items-center gap-3 rounded-2xl bg-navy px-5 py-3 text-cream">
            <Apple size={28} />
            <span class="text-left">
              <span class="block text-[10px] uppercase tracking-widest opacity-70">Download on the</span>
              <span class="block text-lg font-semibold">App Store</span>
            </span>
          </a>
          <a href="#" class="flex items-center gap-3 rounded-2xl bg-navy px-5 py-3 text-cream">
            <Smartphone size={28} />
            <span class="text-left">
              <span class="block text-[10px] uppercase tracking-widest opacity-70">Get it on</span>
              <span class="block text-lg font-semibold">Google Play</span>
            </span>
          </a>
        </div>
        <div class="mt-10 flex items-center gap-6">
          <img src="/mockups/qr.svg" alt="QR code placeholder" class="h-32 w-32 rounded-2xl bg-white p-3 ring-1 ring-navy/10" />
          <p class="max-w-[200px] text-sm text-navy-muted">Point your camera here to open the download page on your phone.</p>
        </div>
      </div>
      <div class="flex justify-center">
        <PhoneFrame size="lg">
          <img src="/mockups/screen-map.svg" alt="App map view preview" class="h-full w-full object-cover" />
        </PhoneFrame>
      </div>
    </div>
  </section>

  <FadeInSection>
    <section class="container-x section-pad">
      <h2 class="text-center text-display">Built for the road.</h2>
      <div class="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {featureTiles.map(({ icon: Icon, title, body }) => (
          <div class="rounded-4xl bg-white p-6 ring-1 ring-navy/5">
            <Icon class="text-teal-dark" size={28} />
            <h3 class="mt-4 text-xl font-extrabold">{title}</h3>
            <p class="mt-2 text-navy-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  </FadeInSection>

  <Footer slot="footer" />
</Base>
```

- [ ] **Step 3: Verify**

`npm run build` exits 0. Visit `/download`. App Store / Google Play buttons render; QR SVG visible; 4 feature tiles; phone mockup shows map screen.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(download): add Download page with store buttons, QR, and feature tiles"
```

---

## Task 15: About page

**Files:**
- Create: `src/pages/about.astro`
- Create: `public/images/team-{1,2,3,4}.jpg`

- [ ] **Step 1: Download team avatars**

```bash
curl -sSL "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80" -o public/images/team-1.jpg
curl -sSL "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" -o public/images/team-2.jpg
curl -sSL "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" -o public/images/team-3.jpg
curl -sSL "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80" -o public/images/team-4.jpg
```

- [ ] **Step 2: Write `src/pages/about.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import FadeInSection from '../components/scroll/FadeInSection.astro';

const values = [
  { title: 'Travel stories worth keeping', body: 'Not another photo dump. Journals you'll reopen in ten years.' },
  { title: 'Quiet technology', body: 'The app stays out of the way. The trip comes first.' },
  { title: 'Print matters', body: 'The best memories live on a shelf, not in a cloud.' },
];

const stats = [
  { n: '7M+', label: 'trips tracked' },
  { n: '195', label: 'countries visited' },
  { n: '420M', label: 'kilometres logged' },
  { n: '60k', label: 'books printed' },
];

const team = [
  { name: 'Elena Ruiz', role: 'Co-founder & CEO', img: '/images/team-1.jpg' },
  { name: 'Jonas Beck', role: 'Co-founder & CTO', img: '/images/team-2.jpg' },
  { name: 'Amara Okafor', role: 'Head of Design', img: '/images/team-3.jpg' },
  { name: 'Yuto Saito', role: 'Head of Mobile', img: '/images/team-4.jpg' },
];
---
<Base title="About — Tripsteps">
  <Nav slot="nav" />

  <section class="container-x section-pad text-center">
    <p class="text-xs font-semibold uppercase tracking-widest text-teal-dark">Who we are</p>
    <h1 class="mx-auto mt-4 max-w-4xl text-hero">A small team making travel memory worth keeping.</h1>
    <p class="mx-auto mt-6 max-w-2xl text-xl text-navy-muted">
      We started Tripsteps because after every big trip, we came home with a camera roll we never looked at again. That felt like a waste.
    </p>
  </section>

  <FadeInSection>
    <section class="container-x section-pad">
      <div class="grid gap-8 md:grid-cols-3">
        {values.map(({ title, body }) => (
          <div class="rounded-4xl bg-white p-8 ring-1 ring-navy/5">
            <h3 class="text-2xl font-extrabold">{title}</h3>
            <p class="mt-3 text-navy-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad">
      <div class="rounded-5xl bg-navy p-10 text-cream md:p-16">
        <div class="grid gap-8 text-center md:grid-cols-4">
          {stats.map(({ n, label }) => (
            <div>
              <div class="text-5xl font-extrabold text-teal">{n}</div>
              <div class="mt-2 text-cream/70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </FadeInSection>

  <FadeInSection>
    <section class="container-x section-pad">
      <h2 class="text-center text-display">The crew.</h2>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map(({ name, role, img }) => (
          <div class="rounded-4xl bg-white p-6 text-center ring-1 ring-navy/5">
            <img src={img} alt="" class="mx-auto h-32 w-32 rounded-full object-cover" loading="lazy" />
            <h3 class="mt-4 text-lg font-extrabold">{name}</h3>
            <p class="text-sm text-navy-muted">{role}</p>
          </div>
        ))}
      </div>
    </section>
  </FadeInSection>

  <Footer slot="footer" />
</Base>
```

Note: the apostrophe in `"Not another photo dump. Journals you'll reopen in ten years."` must be escaped or use curly-apostrophe since Astro treats `'` inside a JS string. Rewrite as `"Not another photo dump. Journals you will reopen in ten years."` to avoid escaping concerns.

- [ ] **Step 3: Fix the string with apostrophe**

In the `values` array replace `"Not another photo dump. Journals you'll reopen in ten years."` with `"Not another photo dump. Journals you will reopen in ten years."`.

- [ ] **Step 4: Verify**

`npm run build` exits 0. Visit `/about`. Values cards, stats band, team grid all render.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(about): add About page with values, stats, team grid"
```

---

## Task 16: Blog content collection and sample posts

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/blog/hidden-gems-portugal.md`
- Create: `src/content/blog/packing-light-guide.md`
- Create: `src/content/blog/solo-travel-first-time.md`
- Create: `public/images/blog-{1,2,3}.jpg`

- [ ] **Step 1: Download blog cover images**

```bash
curl -sSL "https://images.unsplash.com/photo-1580323956657-cafb8537b3a8?w=1600&q=80" -o public/images/blog-1.jpg
curl -sSL "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=1600&q=80" -o public/images/blog-2.jpg
curl -sSL "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=1600&q=80" -o public/images/blog-3.jpg
```

- [ ] **Step 2: Write `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    excerpt: z.string(),
    cover: z.string(),
    category: z.enum(['Destinations', 'Tips', 'Stories']),
  }),
});

export const collections = { blog };
```

- [ ] **Step 3: Write `src/content/blog/hidden-gems-portugal.md`**

```md
---
title: "Six quiet corners of Portugal you have not heard of"
date: 2026-03-18
author: "Elena Ruiz"
excerpt: "The coastline past Lisbon is world-famous. These six places never made the brochure."
cover: "/images/blog-1.jpg"
category: "Destinations"
---

The road south from Lisbon empties out around kilometre forty, and that is when Portugal quietly gets good.

## 1. Azenhas do Mar

A fishing village built straight into the cliff. Lunch at the seawater pool restaurant and then walk the shoreline back to Colares.

## 2. Idanha-a-Velha

Population fewer than a hundred. Roman walls, a Visigoth basilica, and a cafe run by someone who will insist you try the cheese.

## 3. Piódão

A schist-stone hamlet clinging to a mountain. Nothing to do except look — which is the point.

## 4. São Mamede

A natural park on the Spanish border. Griffon vultures overhead, cork oaks underfoot, and exactly one bakery.

## 5. Milreu

Roman ruins you can walk straight into. No ticket gate, no tour bus, no entrance fee.

## 6. Ria Formosa islands

A ferry from Olhão drops you on sandbars that stretch for thirty kilometres. Bring water. Bring a hat. Keep walking.
```

- [ ] **Step 4: Write `src/content/blog/packing-light-guide.md`**

```md
---
title: "The packing list I have used for every trip since 2021"
date: 2026-02-09
author: "Jonas Beck"
excerpt: "One backpack. Seven days. Five years. Here is exactly what I bring, and what I stopped bringing."
cover: "/images/blog-2.jpg"
category: "Tips"
---

After a decade of over-packing, I gave myself a rule: one 30-litre backpack, regardless of trip length. Everything had to fit.

## What survived

- Two merino t-shirts. One rolled, one worn.
- One pair of trousers that work hiking and at dinner.
- Rain shell. Not a raincoat — a shell.
- Book. Physical. Always.

## What did not

- Extra shoes. The ones on your feet are the ones you bring.
- Chargers you do not use. One multi-port plug covers everything.
- "Just in case" clothing. Buy it there if the weather surprises you.

## The bag itself

Size matters more than brand. If it fits in overhead, you never queue at baggage claim. That is forty minutes of your life back every trip.
```

- [ ] **Step 5: Write `src/content/blog/solo-travel-first-time.md`**

```md
---
title: "Solo travel, the first time"
date: 2026-01-22
author: "Amara Okafor"
excerpt: "Nobody tells you the first three days are the hardest. And nobody tells you the third week ruins you forever."
cover: "/images/blog-3.jpg"
category: "Stories"
---

I flew to Reykjavík with a friend who cancelled at the airport. I kept the ticket anyway.

## Day one

I walked around Laugavegur street for four hours trying to look like I had a destination. I did not. I had a hotel, a phrasebook I did not open, and a creeping sense that this was a mistake.

## Day three

I talked to a stranger at a coffee counter. She told me about a waterfall two hours out of town that tourists never find. I rented a car the next morning.

## Day ten

I was writing in a cafe in Akureyri. A couple asked where I was from. I told them. They asked where I was going next. I realised I had stopped thinking about that.

## Day twenty-one

The plane home landed in grey drizzle. I cried in the taxi. I had learned, somewhere between the waterfall and the cafe, that I was much better company than I had thought.
```

- [ ] **Step 6: Verify**

Run `npm run build`; expect exit 0 — Astro should pick up the collection schema and validate all three posts.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(blog): add content collection schema and three sample posts"
```

---

## Task 17: Blog listing and post pages

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`

- [ ] **Step 1: Write `src/pages/blog/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import FadeInSection from '../../components/scroll/FadeInSection.astro';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);

const categories = ['All', ...new Set(posts.map((p) => p.data.category))];
---
<Base title="Blog — Tripsteps">
  <Nav slot="nav" />

  <section class="container-x section-pad">
    <p class="text-xs font-semibold uppercase tracking-widest text-teal-dark">The Tripsteps blog</p>
    <h1 class="mt-4 text-hero">Travel, written down.</h1>

    <div class="mt-10 flex flex-wrap gap-2">
      {categories.map((cat) => (
        <span class="rounded-full border border-navy/15 px-4 py-2 text-sm text-navy/80">{cat}</span>
      ))}
    </div>
  </section>

  <FadeInSection>
    <section class="container-x pb-24">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <a href={`/blog/${post.slug}`} class="group block overflow-hidden rounded-4xl bg-white ring-1 ring-navy/5 transition hover:-translate-y-1 hover:shadow-xl">
            <div class="aspect-[4/3] overflow-hidden">
              <img src={post.data.cover} alt="" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
            </div>
            <div class="p-6">
              <div class="text-xs font-semibold uppercase tracking-widest text-teal-dark">{post.data.category}</div>
              <h2 class="mt-3 text-xl font-extrabold leading-tight">{post.data.title}</h2>
              <p class="mt-3 text-navy-muted">{post.data.excerpt}</p>
              <div class="mt-5 text-sm text-navy/60">
                {post.data.author} · {post.data.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  </FadeInSection>

  <Footer slot="footer" />
</Base>
```

- [ ] **Step 2: Write `src/pages/blog/[...slug].astro`**

```astro
---
import { getCollection } from 'astro:content';
import type { GetStaticPaths } from 'astro';
import Base from '../../layouts/Base.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}) satisfies GetStaticPaths;

const { post } = Astro.props;
const { Content } = await post.render();
---
<Base title={`${post.data.title} — Tripsteps`} description={post.data.excerpt} image={post.data.cover}>
  <Nav slot="nav" />

  <article class="container-x pb-24">
    <div class="mx-auto max-w-3xl pt-12">
      <p class="text-xs font-semibold uppercase tracking-widest text-teal-dark">{post.data.category}</p>
      <h1 class="mt-4 text-display">{post.data.title}</h1>
      <div class="mt-5 text-sm text-navy/60">
        {post.data.author} · {post.data.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
    </div>
    <div class="mt-12 overflow-hidden rounded-5xl">
      <img src={post.data.cover} alt="" class="aspect-[16/9] w-full object-cover" />
    </div>
    <div class="prose prose-lg mx-auto mt-12 max-w-3xl prose-headings:font-extrabold prose-headings:text-navy prose-p:text-navy prose-a:text-teal-dark">
      <Content />
    </div>
  </article>

  <Footer slot="footer" />
</Base>
```

- [ ] **Step 3: Install Tailwind typography plugin for post prose**

Run:

```bash
npm install -D @tailwindcss/typography
```

Then update `tailwind.config.mjs` to register the plugin — change the `plugins: []` line to:

```js
  plugins: [require('@tailwindcss/typography')],
```

If Astro is ESM-strict, use:

```js
import typography from '@tailwindcss/typography';
// ...
  plugins: [typography],
```

and add at the top: `import typography from '@tailwindcss/typography';`.

- [ ] **Step 4: Verify**

Run `npm run build`; expect exit 0. Visit `/blog` — 3 post cards sorted newest first. Click one; post page renders with image header, title, and Markdown body.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(blog): add blog listing and dynamic post pages"
```

---

## Task 18: Responsive and accessibility polish

**Files:**
- Modify: any page/component revealed to be broken by the checklist below.

- [ ] **Step 1: Check desktop (≥1280px)**

Boot `npm run dev`. Visit each page. Confirm: hero headlines do not wrap awkwardly; max-width container centres content; footer columns all visible.

- [ ] **Step 2: Check tablet (768px)**

In Chrome DevTools → Device mode → 768×1024. Visit each page. Confirm: nav still visible (links collapse to hamburger at <768); hero stacks; 3-col grids collapse to 2 where appropriate; footer columns collapse to 2.

- [ ] **Step 3: Check mobile (390px)**

Device mode → 390×844. Confirm: hamburger menu opens full-screen; hero images do not overflow; all text is readable (no text < 14px); CTA buttons are tappable (≥44px).

- [ ] **Step 4: Keyboard navigation check**

Reload each page. Tab through. Confirm: focus ring visible on all links and buttons (teal outline from global CSS); mobile menu can be opened with Enter and closed with Escape.

- [ ] **Step 5: Add Escape-to-close for mobile menu**

In `src/components/Nav.astro`, inside the `<script>` tag, add after the close-button handler:

```js
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !menu?.classList.contains('hidden')) {
    menu?.classList.add('hidden');
    menu?.classList.remove('flex');
  }
});
```

- [ ] **Step 6: Alt-text audit**

Run:

```bash
grep -rn 'alt=""' src/
```

Expected: purely decorative images only (testimonial avatars, team photos, blog post hero). Any semantic images must have descriptive alt. Fix any gaps inline.

- [ ] **Step 7: Verify reduced-motion on every page**

In DevTools → Rendering → emulate `prefers-reduced-motion: reduce`. Visit each page. Sections must still be visible (no content stuck at `opacity: 0`). The sticky phone morph must show the first screen statically; scrolling must work normally.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "fix(a11y): escape to close mobile menu, alt-text audit, reduced-motion fixes"
```

---

## Task 19: Performance and Lighthouse pass

**Files:** likely none; may add `loading="lazy"` to images that miss it.

- [ ] **Step 1: Run production build and preview**

```bash
npm run build
npm run preview
```

Expected: preview server on http://localhost:4321.

- [ ] **Step 2: Run Lighthouse on home page**

In Chrome → DevTools → Lighthouse → Desktop preset → analyse `http://localhost:4321/`.

Targets:
- Performance ≥ 90
- Accessibility = 100
- Best Practices ≥ 95
- SEO ≥ 95

- [ ] **Step 3: Fix anything below target**

Likely fixes if scores drop:
- **Performance**: ensure all `<img>` below the fold have `loading="lazy"` (grep `src/` for `<img` without `loading`); add `width` and `height` attributes to images to prevent CLS.
- **Accessibility**: check colour contrast of `text-navy-muted` on cream — should be ≥4.5:1. If it fails at any size, darken to `rgba(0, 41, 61, 0.8)`.
- **SEO**: confirm each page has unique `<title>` and `<meta name="description">` (already via `Base.astro` props).

- [ ] **Step 4: Repeat Lighthouse for the other 5 pages**

Run Lighthouse on `/travel-book`, `/premium`, `/download`, `/about`, `/blog`. Confirm all at target.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "perf: lazy-load images, add dims, tune contrast for Lighthouse targets"
```

---

## Task 20: README and final verification

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Write `README.md`**

```md
# Tripsteps Marketing Clone

A static marketing site built with Astro + Tailwind as a visual study of polarsteps.com.
All copy is original; imagery is placeholder (Unsplash).

## Development

```
npm install
npm run dev       # http://localhost:4321
npm run build     # static site to dist/
npm run preview   # serve built site
```

## Pages

- `/` — Home
- `/travel-book` — Travel Book product page
- `/premium` — Premium tier
- `/download` — App Store / Play Store
- `/about` — About the team
- `/blog` — Listing, with `/blog/[slug]` for posts

## Stack

Astro 4, Tailwind CSS 3, Motion One, lucide-astro, Inter.
```

- [ ] **Step 2: Final full-build verification**

Run:

```bash
rm -rf dist .astro node_modules/.astro
npm run build
```

Expected: exits 0. `dist/` contains `index.html`, `travel-book/index.html`, `premium/index.html`, `download/index.html`, `about/index.html`, `blog/index.html`, `blog/hidden-gems-portugal/index.html`, `blog/packing-light-guide/index.html`, `blog/solo-travel-first-time/index.html`, plus static assets.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: add README"
```

---

## Plan self-review

**Spec coverage check:**
- All 6 pages (Home, Travel Book, Premium, Download, About, Blog): Tasks 10–17 ✓
- Design system (tokens, fonts, radius): Task 1 ✓
- Nav + Footer: Tasks 3, 4 ✓
- Primitive components (Button, PhoneFrame, FeatureRow, Testimonial, PressLogos, PricingCard, FAQ): Tasks 5–8 ✓
- Scroll animation helpers (FadeIn, Parallax, StickyPhoneMorph): Task 9 ✓
- Sticky phone morph on home: Task 11 ✓
- Blog content collection + sample posts: Task 16 ✓
- Responsive + a11y + reduced-motion: Task 18 ✓
- Lighthouse targets: Task 19 ✓
- `npm run dev` + `npm run build` working: Task 1 step 9, Task 20 step 2 ✓
- README: Task 20 ✓
- No reproduced copy or brand assets: addressed throughout; all copy original, imagery Unsplash ✓

**Type consistency check:** Component names, prop types, and CSS class names used consistently across tasks (`PhoneFrame` size `md`, `PricingCard` `highlight`, `FadeInSection`, `StickyPhoneMorph` screens shape `{ src, alt, caption }`).

**Placeholder scan:** no TBD/TODO/placeholder text; every step has concrete code.

Plan is complete and self-consistent.
