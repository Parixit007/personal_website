type Theme = 'light' | 'dark';

const root = document.documentElement;
const THEME_COLORS: Record<Theme, string> = { light: '#f5f5f7', dark: '#000000' };

function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem('theme');
    return t === 'light' || t === 'dark' ? t : null;
  } catch {
    return null;
  }
}

function currentTheme(): Theme {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function apply(theme: Theme) {
  root.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', THEME_COLORS[theme]));
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });
}

export function initTheme() {
  apply(currentTheme());

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch {}

      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduce) {
        apply(next);
        return;
      }

      // Reveal the new theme in a circle that grows out of the toggle.
      const r = button.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

      root.classList.add('theme-switching');
      const transition = document.startViewTransition(() => apply(next));
      transition.ready
        .then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
          );
        })
        .catch(() => {});
      transition.finished.finally(() => root.classList.remove('theme-switching'));
    });
  });

  // Follow the system setting until the visitor picks a theme themselves.
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!storedTheme()) apply(e.matches ? 'dark' : 'light');
  });
}
