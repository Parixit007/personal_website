/** Every ghost watches the pointer, blinks now and then, and interactive ones say boo. */
export function initGhosts() {
  const ghosts = [...document.querySelectorAll<HTMLElement>('.ghost')];
  if (ghosts.length === 0) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const stage = document.querySelector<HTMLElement>('[data-ghost-stage]');

  let px = innerWidth / 2;
  let py = innerHeight / 2;
  let raf = 0;

  const look = () => {
    raf = 0;
    for (const ghost of ghosts) {
      const r = ghost.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) continue;
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height * 0.42);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, dist / 260) * 7; // SVG units; the eyes can drift 7 of 200
      ghost.style.setProperty('--ex', ((dx / dist) * reach).toFixed(2));
      ghost.style.setProperty('--ey', ((dy / dist) * reach * 0.8).toFixed(2));
    }
    if (stage && !reduceMotion) {
      const r = stage.getBoundingClientRect();
      const lean = ((px - (r.left + r.width / 2)) / innerWidth) * 14;
      stage.style.setProperty('--lean', `${lean.toFixed(2)}deg`);
    }
  };
  const schedule = () => (raf ||= requestAnimationFrame(look));

  if (finePointer) {
    addEventListener(
      'pointermove',
      (e) => {
        px = e.clientX;
        py = e.clientY;
        schedule();
      },
      { passive: true },
    );
    addEventListener('scroll', schedule, { passive: true });
  } else if (!reduceMotion) {
    // No cursor to follow on touch screens, so the ghosts glance around instead.
    setInterval(() => {
      px = Math.random() * innerWidth;
      py = Math.random() * innerHeight;
      schedule();
    }, 2800);
  }
  schedule();

  if (!reduceMotion) {
    const blink = () => {
      ghosts.forEach((g) => g.classList.add('is-blinking'));
      setTimeout(() => ghosts.forEach((g) => g.classList.remove('is-blinking')), 150);
      setTimeout(blink, 2600 + Math.random() * 3800);
    };
    setTimeout(blink, 2400);
  }

  document.querySelectorAll<HTMLElement>('[data-ghost]').forEach((ghost) => {
    let timer = 0;
    const boo = () => {
      ghost.classList.remove('is-booing');
      void ghost.offsetWidth; // restart the animation on repeat clicks
      ghost.classList.add('is-booing');
      clearTimeout(timer);
      timer = window.setTimeout(() => ghost.classList.remove('is-booing'), 1400);
    };
    ghost.addEventListener('click', boo);
    ghost.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        boo();
      }
    });
  });
}
