/**
 * [data-reveal] elements fade up once, the first time they scroll into view.
 * [data-play] elements get .is-playing only while visible, so looping demos
 * don't burn battery off-screen and restart fresh each time you come back.
 */
export function initReveal() {
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        reveal.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));

  const play = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.classList.toggle('is-playing', entry.isIntersecting);
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll('[data-play]').forEach((el) => play.observe(el));
}
