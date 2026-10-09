/**
 * Sets --p (0 → 1) on [data-scrub] elements as they travel through the viewport:
 * 0 when the top reaches 85% of the screen, 1 when the bottom reaches 40%.
 * CSS turns that into the word-by-word highlight in the About section.
 */
export function initScrub() {
  const elements = [...document.querySelectorAll<HTMLElement>('[data-scrub]')];
  if (elements.length === 0) return;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.style.setProperty('--p', '1'));
    return;
  }

  let raf = 0;
  const update = () => {
    raf = 0;
    const vh = innerHeight;
    for (const el of elements) {
      const r = el.getBoundingClientRect();
      const p = (vh * 0.85 - r.top) / (vh * 0.45 + r.height);
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4));
    }
  };
  const schedule = () => (raf ||= requestAnimationFrame(update));

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();
}
