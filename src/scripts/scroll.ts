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
    const elements = Array.from(container.querySelectorAll<HTMLElement>('[data-morph-screen]'));
    if (elements.length === 0) return;

    const stepCount = Math.max(...elements.map((el) => Number(el.dataset.morphStep ?? 0))) + 1;
    const groups: HTMLElement[][] = Array.from({ length: stepCount }, () => []);
    elements.forEach((el) => {
      const i = Number(el.dataset.morphStep ?? 0);
      groups[i].push(el);
    });

    if (reduced) {
      groups.forEach((group, i) => {
        group.forEach((el) => { el.style.opacity = i === 0 ? '1' : '0'; });
      });
      return;
    }

    const step = 1 / stepCount;
    // @ts-expect-error motion scroll types may not match runtime signature
    scroll((progress: number) => {
      for (let i = 0; i < stepCount; i++) {
        const localStart = i * step;
        const localEnd = (i + 1) * step;
        let opacity = 0;
        if (progress >= localStart && progress <= localEnd) {
          const t = (progress - localStart) / step;
          opacity = t < 0.5 ? t * 2 : (1 - t) * 2;
        }
        if (i === 0 && progress < step * 0.5) opacity = 1 - progress / (step * 0.5);
        if (i === stepCount - 1 && progress > 1 - step * 0.5) opacity = (progress - (1 - step * 0.5)) / (step * 0.5);
        const clamped = String(Math.max(0, Math.min(1, opacity)));
        groups[i].forEach((el) => { el.style.opacity = clamped; });
      }
    }, { target: container, offset: ['start start', 'end end'] });
  });
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const phase = (progress: number, start: number, end: number) =>
  Math.max(0, Math.min(1, (progress - start) / (end - start)));

const initHeroPhoneMorph = () => {
  document.querySelectorAll<HTMLElement>('[data-hero-morph]').forEach((container) => {
    const bg = container.querySelector<HTMLElement>('[data-hero-bg]');
    const overlay = container.querySelector<HTMLElement>('[data-hero-overlay]');
    const phone = container.querySelector<HTMLElement>('[data-hero-phone]');
    const target = container.querySelector<HTMLElement>('[data-hero-phone-target]');

    const screenEls = Array.from(container.querySelectorAll<HTMLElement>('[data-morph-screen]'));
    const captionEls = Array.from(container.querySelectorAll<HTMLElement>('[data-morph-caption]'));
    const stepCount = Math.max(
      ...screenEls.map((el) => Number(el.dataset.morphStep ?? 0)),
      ...captionEls.map((el) => Number(el.dataset.morphStep ?? 0)),
      0,
    ) + 1;

    const screenGroups: HTMLElement[][] = Array.from({ length: stepCount }, () => []);
    screenEls.forEach((el) => screenGroups[Number(el.dataset.morphStep ?? 0)].push(el));
    const captionGroups: HTMLElement[][] = Array.from({ length: stepCount }, () => []);
    captionEls.forEach((el) => captionGroups[Number(el.dataset.morphStep ?? 0)].push(el));

    if (reduced) {
      if (bg) bg.style.opacity = '0';
      if (overlay) overlay.style.opacity = '0';
      if (phone) phone.style.transform = 'translate3d(0, 0, 0) scale(1)';
      screenGroups.forEach((g, i) => g.forEach((el) => (el.style.opacity = i === 0 ? '1' : '0')));
      captionGroups.forEach((g, i) => g.forEach((el) => (el.style.opacity = i === 0 ? '1' : '0')));
      return;
    }

    let deltaX = 0;
    const measure = () => {
      if (!phone || !target) return;
      const phoneRect = phone.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const phoneCenterX = phoneRect.left + phoneRect.width / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      deltaX = targetCenterX - phoneCenterX;
    };

    requestAnimationFrame(measure);
    window.addEventListener('resize', () => requestAnimationFrame(measure));

    const morphStart = 0.3;
    const morphSpan = 1 - morphStart;
    const groupWidth = morphSpan / stepCount;

    const groupOpacity = (progress: number, i: number) => {
      const localStart = morphStart + i * groupWidth;
      const localEnd = morphStart + (i + 1) * groupWidth;
      let opacity = 0;
      if (progress >= localStart && progress <= localEnd) {
        const t = (progress - localStart) / groupWidth;
        opacity = t < 0.5 ? t * 2 : (1 - t) * 2;
      }
      const firstEdge = morphStart + groupWidth * 0.5;
      if (i === 0 && progress < firstEdge) opacity = Math.max(opacity, (progress - morphStart + groupWidth * 0.5) / groupWidth);
      const lastEdge = 1 - groupWidth * 0.5;
      if (i === stepCount - 1 && progress > lastEdge) opacity = Math.max(opacity, (progress - lastEdge) / (groupWidth * 0.5));
      return Math.max(0, Math.min(1, opacity));
    };

    // @ts-expect-error motion scroll types may not match runtime signature
    scroll((progress: number) => {
      // Background fade
      if (bg) bg.style.opacity = String(1 - phase(progress, 0, 0.22));
      // Overlay fade
      if (overlay) overlay.style.opacity = String(1 - phase(progress, 0, 0.18));
      // Phone transform
      if (phone) {
        const t = easeInOut(phase(progress, 0.05, 0.30));
        const tx = lerp(0, deltaX, t);
        const ty = lerp(40, 0, t);
        const scale = lerp(1.15, 1, t);
        phone.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
      }
      // Screen + caption crossfade
      for (let i = 0; i < stepCount; i++) {
        const opacity = String(groupOpacity(progress, i));
        screenGroups[i].forEach((el) => (el.style.opacity = opacity));
        captionGroups[i].forEach((el) => (el.style.opacity = opacity));
      }
    }, { target: container, offset: ['start start', 'end end'] });
  });
};

const init = () => { initFadeIns(); initParallax(); initStickyMorph(); initHeroPhoneMorph(); };

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
