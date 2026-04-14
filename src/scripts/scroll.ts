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
    // @ts-expect-error motion scroll types may not match runtime signature
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
    // @ts-expect-error motion scroll types may not match runtime signature
    scroll((progress: number) => {
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
