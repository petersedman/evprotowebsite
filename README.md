# Tripsteps Marketing Clone

A static marketing site built with Astro + Tailwind CSS as a visual study of polarsteps.com.
All copy is original and imagery is placeholder (Unsplash). No copyrighted assets.

## Pages

- `/` — Home (with sticky-phone-morph scroll sequence)
- `/travel-book` — Travel Book product page
- `/premium` — Free vs Premium pricing
- `/download` — App store buttons + QR
- `/about` — Team, values, stats
- `/blog` — Listing
- `/blog/[slug]` — Individual posts (3 samples included)

## Stack

- **Astro 6** — static site generator
- **Tailwind CSS 4** — styling, design tokens via `@theme` in `src/styles/global.css`
- **Motion One** — scroll animations (fade-in, parallax, sticky phone morph)
- **lucide-astro** — icon set
- **Inter** (Google Fonts) — typography

## Development

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static site to dist/
npm run preview  # serve built site
```

## Things to test in a browser

The build verifies code correctness; the following needs human/Lighthouse review:
- Responsive layouts at 390px / 768px / 1280px+
- Scroll animations (fade-in, parallax, sticky phone morph)
- Mobile menu open/close (hamburger, Escape key, close button)
- `prefers-reduced-motion` honour
- Lighthouse: target performance ≥ 90, accessibility = 100, best practices ≥ 95, SEO ≥ 95

## Imagery

All photographs from [Unsplash](https://unsplash.com); credited collectively in the site footer.
