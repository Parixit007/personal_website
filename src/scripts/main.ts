import { initTheme } from './theme';
import { initNav } from './nav';
import { initReveal } from './reveal';
import { initGhosts } from './ghost';
import { initScrub } from './scrub';
import { initInteractions } from './interactions';

declare global {
  interface Window {
    __ready?: boolean;
  }
}

// Each feature starts on its own, so one failing can't take the others down.
for (const init of [initReveal, initTheme, initNav, initGhosts, initScrub, initInteractions]) {
  try {
    init();
  } catch (error) {
    console.error(error);
  }
}
window.__ready = true;
