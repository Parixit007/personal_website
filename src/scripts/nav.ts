export function initNav() {
  const wrap = document.querySelector<HTMLElement>('[data-nav]');
  if (!wrap) return;

  // Stronger glass once the page scrolls under the bar.
  const onScroll = () => wrap.classList.toggle('is-scrolled', scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  initIndicator(wrap);
  initMenu(wrap);
}

/** Slides the glass lens to whichever section is under the middle of the screen. */
function initIndicator(wrap: HTMLElement) {
  const indicator = wrap.querySelector<HTMLElement>('[data-nav-indicator]');
  const links = [...wrap.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const targets = links
    .map((link) => ({ link, section: document.getElementById(link.dataset.navLink ?? '') }))
    .filter((t): t is { link: HTMLAnchorElement; section: HTMLElement } => t.section !== null);
  if (!indicator) return;

  let active: HTMLAnchorElement | null = null;
  let placed = false;

  const place = (link: HTMLAnchorElement | null) => {
    if (link === active && placed) return;
    active = link;
    links.forEach((l) => l.classList.toggle('is-active', l === link));
    if (!link) {
      indicator.classList.remove('is-visible');
      return;
    }
    if (!placed) {
      // Appear in place the first time instead of sliding in from the left edge.
      indicator.style.transition = 'none';
      requestAnimationFrame(() => requestAnimationFrame(() => (indicator.style.transition = '')));
      placed = true;
    }
    indicator.style.setProperty('--x', `${link.offsetLeft}px`);
    indicator.style.setProperty('--w', `${link.offsetWidth}px`);
    indicator.classList.add('is-visible');
  };

  // Away from the home page (e.g. a note), the lens rests on the page's own link.
  const pageLink = links.find((l) => l.getAttribute('aria-current') === 'page') ?? null;

  let raf = 0;
  const update = () => {
    raf = 0;
    if (targets.length === 0) return place(pageLink);
    const line = innerHeight * 0.45;
    let current: HTMLAnchorElement | null = null;
    for (const { link, section } of targets) {
      if (section.getBoundingClientRect().top <= line) current = link;
    }
    place(current);
  };
  const schedule = () => (raf ||= requestAnimationFrame(update));

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', () => {
    placed = false;
    const link = active;
    active = null;
    place(link);
  });
  update();
}

function initMenu(wrap: HTMLElement) {
  const button = wrap.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = wrap.querySelector<HTMLElement>('[data-menu]');
  if (!button || !menu) return;

  const setOpen = (open: boolean) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
  };

  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target as Node)) setOpen(false);
  });
}
