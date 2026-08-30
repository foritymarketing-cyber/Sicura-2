// Scroll-Einblendungen — Notion "18 – Designsystem", Abschnitt 4:
// maximal 8px, nur nach oben, einmalig je Element, kein Parallax.
// Ohne JavaScript oder mit reduzierter Bewegung bleibt alles sofort sichtbar
// (siehe .js-Gate in global.css) — progressive Verbesserung, kein Blocker.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (items.length === 0) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const groups = new Map<Element | null, HTMLElement[]>();
  items.forEach((el) => {
    const group = el.closest('[data-reveal-group]');
    const list = groups.get(group) ?? [];
    list.push(el);
    groups.set(group, list);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const group = el.closest('[data-reveal-group]');
        const siblings = group ? (groups.get(group) ?? [el]) : [el];
        const index = siblings.indexOf(el);
        el.style.transitionDelay = `${Math.min(index, 6) * 40}ms`;
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  items.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}
