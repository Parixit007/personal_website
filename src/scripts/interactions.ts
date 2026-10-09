const finePointer = () => matchMedia('(pointer: fine)').matches;
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Soft light that follows the cursor across cards, plus a gentle tilt on project cards. */
function initCards() {
  if (!finePointer()) return;

  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  if (reduceMotion()) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', `${(x * 4).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

let toastTimer = 0;
export function toast(message: string) {
  const el = document.querySelector<HTMLElement>('[data-toast]');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('is-visible');
  void el.offsetWidth;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove('is-visible'), 2200);
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers, or clipboard access denied: fall back to a hidden textarea.
    const area = Object.assign(document.createElement('textarea'), { value: text, readOnly: true });
    area.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

function initCopy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    let timer = 0;
    button.addEventListener('click', async () => {
      const text = button.dataset.copy ?? '';
      if (!(await copyText(text))) {
        toast(text);
        return;
      }
      button.classList.add('is-copied');
      toast('Email copied to clipboard');
      clearTimeout(timer);
      timer = window.setTimeout(() => button.classList.remove('is-copied'), 2000);
    });
  });
}

/** Numbers count up from zero the first time they're seen. */
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (els.length === 0 || reduceMotion()) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.count);
        if (!Number.isFinite(target) || target === 0) continue;
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = String(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        el.textContent = '0';
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.6 },
  );
  els.forEach((el) => io.observe(el));
}

/** Live Delhi time, with a sky that follows the hour. */
function initClock() {
  const clock = document.querySelector<HTMLElement>('[data-clock]');
  const sky = document.querySelector<HTMLElement>('[data-sky]');
  const note = document.querySelector<HTMLElement>('[data-clock-note]');
  if (!clock) return;

  const timeFmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' });
  const hourFmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hourCycle: 'h23' });

  const render = () => {
    const now = new Date();
    clock.textContent = timeFmt.format(now);
    const hour = Number(hourFmt.format(now));
    const daypart = hour >= 5 && hour < 8 ? 'dawn' : hour >= 8 && hour < 17 ? 'day' : hour >= 17 && hour < 20 ? 'dusk' : 'night';
    sky?.setAttribute('data-daypart', daypart);
    if (note) {
      note.textContent =
        hour >= 23 || hour < 5
          ? 'Late-night learning session, probably.'
          : hour < 12
            ? 'Good morning from Delhi.'
            : hour < 17
              ? 'Afternoon in Delhi.'
              : hour < 20
                ? 'Evening in Delhi.'
                : 'Night in Delhi. Prime building hours.';
    }
  };
  render();
  setInterval(render, 15_000);
}

/** Keeps the degree progress bar honest between deploys. */
function initDegree() {
  const el = document.querySelector<HTMLElement>('[data-degree]');
  if (!el) return;
  const start = Date.parse(el.dataset.start ?? '');
  const end = Date.parse(el.dataset.end ?? '');
  if (!start || !end) return;
  const progress = Math.min(1, Math.max(0, (Date.now() - start) / (end - start)));
  const year = Math.min(4, Math.max(1, Math.floor((Date.now() - start) / (365.25 * 864e5)) + 1));
  el.style.setProperty('--progress', progress.toFixed(4));
  const label = el.querySelector('[data-degree-label]');
  if (label) label.textContent = progress >= 1 ? 'Graduated' : `Year ${year} of 4`;
}

export function initInteractions() {
  initCards();
  initCopy();
  initCounters();
  initClock();
  initDegree();
}
