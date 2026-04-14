---
title: Polarsteps Marketing Site Clone — Design
date: 2026-04-14
status: draft
---

# Polarsteps Marketing Site Clone

## Summary

Build a marketing website that mirrors the layout, structure, and visual language of polarsteps.com. Six pages (Home, Travel Book, Premium, Download, About, Blog), built as a static site with Astro + Tailwind and high-fidelity scroll animations.

## Scope and boundaries

**In scope**

- All six listed pages, fully populated with original copy and placeholder imagery.
- Responsive layouts (mobile, tablet, desktop).
- Shared nav and footer.
- Scroll-driven animations: parallax, fade-ins, sticky phone morph in hero-to-features transition.
- Blog content collection with 2–3 sample posts.
- Local dev (`npm run dev`) and static build (`npm run build`) both working.

**Out of scope**

- Auth, signup, user accounts.
- Actual app functionality (map view, GPS, trips). Any "app screenshots" are static mockups.
- Backend, database, or dynamic content beyond static-generated blog posts.
- Real brand assets, photography, or copy from polarsteps.com. All content is original or licensed placeholder (Unsplash).
- Analytics, tag managers, cookie banners, CMS integration.
- Deployment configuration beyond producing a static `dist/` folder.

## Design system

**Colors**

| Token | Hex | Usage |
| --- | --- | --- |
| `cream` | `#FFF2E5` | page background, inverted text on dark sections |
| `navy` | `#00293D` | primary text, dark sections, primary buttons |
| `teal` | `#00DB9A` | primary accent (links, highlights, emphasis) |
| `red` | `#E60F3D` | secondary accent (badges, rare highlights) |
| `navy-muted` | `rgba(0, 41, 61, 0.72)` | body text on cream |
| `cream-muted` | `rgba(255, 242, 229, 0.72)` | body text on navy |

**Typography**

- `Inter` (Google Fonts, weights 400/500/600/700/800) as free substitute for Polarsteps' Fellix.
- Display headings: 48–80px, weight 800, letter-spacing `-0.02em`, line-height 1.05.
- Body: 16–20px, weight 400, line-height 1.5.
- Labels: 12–14px, uppercase, weight 600, letter-spacing `0.08em`.

**Shape and imagery**

- Border radius scale: 8 (inputs), 16 (cards), 24 (media), 32–42 (large feature cards), 999 (pills, buttons).
- Travel photography from Unsplash, credited in footer.
- App mockups: SVG phone bezel wrapping a static placeholder UI (generic map + journal view).

**Spacing**

- Tailwind default scale. Section vertical padding: `py-24` desktop, `py-16` tablet, `py-12` mobile.
- Max content width: `max-w-7xl` (1280px).

## Information architecture

### Pages

1. **Home** (`/`) — hero, sticky phone-morph scroll sequence, feature highlights (3–4 rows), travel-book teaser, testimonials, press logos, final CTA.
2. **Travel Book** (`/travel-book`) — hero, what-is-it section, sample spreads (carousel), how it works (steps), pricing/order CTA, FAQ.
3. **Premium** (`/premium`) — hero, feature comparison table (free vs premium), pricing cards (monthly/yearly), testimonials, FAQ.
4. **Download** (`/download`) — hero with App Store / Play Store buttons, QR code, feature grid, device screenshots carousel.
5. **About** (`/about`) — story hero, mission statement, values grid, stats band, team grid.
6. **Blog** (`/blog`) — listing grid with filter/category chips. `/blog/[slug]` for individual posts.

### Shared components

- **Nav** — sticky top, cream background with subtle shadow on scroll. Logo left; links: Travel Book, Premium, Download, About, Blog. Right side: "Log in" link + "Get the app" pill button. Mobile: hamburger → full-screen overlay.
- **Footer** — navy background, cream text. Four columns (Product, Company, Support, Legal), social icons row, newsletter signup (non-functional), bottom credit line.

## Tech stack

- **Astro 4** — static site generator.
- **Tailwind CSS 3** — utility-first styling with custom tokens (colors, font family, border radius).
- **Motion One** (`motion`, `motion/react` not needed) — scroll-driven animations. ~6kb gzipped, polyfills `ScrollTimeline`.
- **`lucide-astro`** — icon set.
- **Google Fonts** — Inter, self-hosted via build step or served via `<link>` (decide during scaffold; default to `<link>` for simplicity).
- **Astro content collections** — blog posts as Markdown files with frontmatter (title, date, author, cover, excerpt).

## Animation approach

- **Entry fades** — all major sections fade + translate-y on entering viewport via `IntersectionObserver` wrapper component `<FadeInSection>`.
- **Parallax images** — `<ParallaxImage>` component uses `ScrollTimeline` (via Motion One) to translate images at ~0.3x scroll speed.
- **Sticky phone morph** — homepage hero-to-features: an iPhone mockup stays pinned center-screen while scrolling; the screenshot inside cross-fades through 3–4 states tied to scroll progress over a ~200vh section. Implemented in `StickyPhoneMorph.astro` with Motion One scroll-linked opacity keyframes.
- **Hover states** — buttons lift 2px + shadow increase on hover; cards tilt 1–2° on hover.
- **Reduced motion** — respect `prefers-reduced-motion`; all scroll animations short-circuit to instant.

## File structure

```
website/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── images/                 (unsplash downloads, favicon)
│   └── mockups/                (svg phone frames, placeholder screens)
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
│   │       ├── StickyPhoneMorph.astro
│   │       ├── FadeInSection.astro
│   │       └── ParallaxImage.astro
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
│   │       └── [slug].astro
│   ├── content/
│   │   ├── config.ts
│   │   └── blog/*.md
│   ├── styles/
│   │   └── global.css
│   └── scripts/
│       └── scroll.ts
└── README.md
```

## Component contracts

- `Button` — props: `variant` (`primary` | `secondary` | `ghost`), `size` (`md` | `lg`), `href` (renders `<a>`) or click (renders `<button>`).
- `PhoneFrame` — wraps a slotted child in an SVG bezel. Props: `size` (`sm` | `md` | `lg`).
- `FeatureRow` — props: `title`, `body`, `image`, `reverse` (flips image to right/left).
- `Testimonial` — props: `quote`, `author`, `role`, `avatar`.
- `PricingCard` — props: `name`, `price`, `period`, `features` (string[]), `cta`, `highlight` (boolean).
- `FAQ` — props: `items` ({ q, a }[]); uses native `<details>` for accessibility.
- `FadeInSection` — wrapper with IntersectionObserver; props: `delay` (ms), `threshold`.
- `ParallaxImage` — props: `src`, `speed` (0.1–0.5), `alt`.
- `StickyPhoneMorph` — accepts an array of `{ screen, caption }`; pins phone for duration of container and cross-fades screens.

## Build sequence

1. Scaffold Astro + Tailwind; wire design tokens into `tailwind.config.mjs`; set up Inter font; create `Base.astro` layout with empty nav/footer.
2. Build `Nav.astro` and `Footer.astro`. Verify across all (empty) pages.
3. Build primitive components: `Button`, `PhoneFrame`, `FeatureRow`, `Testimonial`, `PricingCard`, `FAQ`.
4. Build home page with static sections (no animations yet).
5. Add scroll animation components (`FadeInSection`, `ParallaxImage`, `StickyPhoneMorph`); wire into home.
6. Build remaining 5 pages, reusing primitives.
7. Blog content collection + 2–3 sample posts + `[slug].astro` template.
8. Responsive polish pass (mobile, tablet, desktop).
9. Accessibility pass (keyboard nav, focus rings, alt text, reduced-motion).
10. Performance pass; run Lighthouse; confirm targets.

## Success criteria

- All 6 pages (+ 2–3 blog posts) reachable and fully populated with original copy and placeholder imagery.
- Mobile (≤640px), tablet (641–1024px), desktop (≥1025px) layouts all usable and visually polished.
- Lighthouse desktop: performance ≥ 90, accessibility = 100, best practices ≥ 95, SEO ≥ 95.
- Scroll animations at ~60fps in latest Chrome, Safari, Firefox.
- `prefers-reduced-motion` respected: no scroll animation when enabled.
- `npm run dev` serves cleanly; `npm run build` produces a static `dist/` with no errors or warnings.
- No reproduced copy, imagery, or brand assets from polarsteps.com.

## Risks and mitigations

- **Scroll animation complexity** — Motion One's `ScrollTimeline` support varies; mitigate by using its polyfill and building `StickyPhoneMorph` with a fallback to simple fade-through if `ScrollTimeline` is unavailable.
- **Font substitution visual gap** — Inter is close to Fellix but not identical; acceptable tradeoff for avoiding paid font licensing.
- **Imagery authenticity** — Unsplash photos may look generic compared to Polarsteps' native travel content; mitigate by curating a consistent visual style during selection.

## Open questions

None at this stage; revisit if surfaced during implementation.
