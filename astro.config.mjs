// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://parixit.netlify.app',
  // Keep HTML-style whitespace between inline elements (Astro 7 defaults to JSX rules).
  compressHTML: true,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      // Both themes are emitted as CSS variables; global.css picks one per color scheme.
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
    },
  },
});
