# personal_website

I'm making a personal website to have my own space on the internet where I can post my thoughts, and it also works as a portfolio for me. Through this project I'm learning how to work with GitHub, VS Code and web development.

**Live:** https://parixit.netlify.app/

## What's inside

- **Home**: a hero with the red ghost (it watches your cursor and says boo when clicked), an About section whose words light up as you scroll, a live New Delhi clock with a sky that follows the time of day, featured projects with little animated demos, a Journey timeline, Skills and Contact.
- **Notes**: a small blog. Write Markdown, and it gets its own page, a spot on the home page and an RSS feed.
- **Light and dark mode**: follows your system setting, with a toggle that reveals the new theme in a circle.
- Glassy, Apple-style design with spring animations. Everything calms down if your OS has "reduce motion" turned on.

## Tech

- [Astro](https://astro.build) builds the site into plain static HTML.
- Hand-written CSS (no framework). Design tokens live in `src/styles/global.css`.
- About 3 KB of TypeScript for the interactive bits (`src/scripts/`). No UI framework.
- Hosted on Netlify. `netlify.toml` tells it how to build.

## Running it locally

You need [Node.js](https://nodejs.org) 22.12 or newer.

```bash
npm install      # once
npm run dev      # start a dev server at http://localhost:4321
npm run build    # build the real site into dist/
npm run preview  # serve the built site locally
npm run check    # type-check everything
```

## Editing content

Most edits don't need you to touch any layout code:

| What | Where |
| --- | --- |
| Name, email, links, "open to internships" status | `src/data/site.ts` |
| Projects (featured and grid) | `src/data/projects.ts` |
| Journey timeline | `src/data/journey.ts` |
| Skills and the logo marquee | `src/data/skills.ts` |
| About text and hobby tiles | `src/components/About.astro` |

**Résumé button:** drop a PDF at `public/resume.pdf` and a "Résumé" button appears in the hero and contact section automatically. Remove the file and the buttons go away.

## Writing a note

1. Create `src/content/notes/my-note.md`. The file name becomes the URL (`/notes/my-note/`).
2. Start it with frontmatter:

   ```yaml
   ---
   title: My note
   description: One line for the list and link previews.
   date: 2026-10-01
   tags: [learning]
   draft: false
   ---
   ```

3. Write Markdown below it, then commit and push.

Notes with `draft: true` only show up in `npm run dev`, never on the live site. `src/content/notes/how-to-write-a-note.md` is a draft template you can copy. The Notes section and nav link only appear once at least one note is published.

## Deploying

Pushing to `main` deploys automatically. Netlify reads `netlify.toml`, runs `npm run build` and publishes `dist/`, so nothing needs to change in the Netlify dashboard. (If you deploy by drag-and-drop instead, run `npm run build` and drop the `dist` folder.)

## Project structure

```
public/              favicon, app icons, share image, robots.txt
scripts/             generate-icons.mjs (renders the PNG icons + share image)
src/
  components/        page sections (Hero, About, Work, …) and the ghost
    visuals/         the animated project demos
  content/notes/     your notes, in Markdown
  data/              all the editable content
  layouts/           the page shell: <head>, nav, footer
  pages/             routes: /, /notes, /notes/[slug], 404, rss.xml
  scripts/           theme, nav, scroll effects, ghost, clock
  styles/            global design tokens + note typography
```

## Colours

| | Light | Dark |
| --- | --- | --- |
| Background | `#f5f5f7` | `#000000` |
| Text | `#1d1d1f` | `#f5f5f7` |
| Ghost red | `#db3b3b` | `#db3b3b` |
| Warm gradient | `#ff453a → #ff9f0a → #ffc53d` | same |

After changing the ghost or the share-card text in `scripts/generate-icons.mjs`, run `npm run icons` to regenerate the PNGs.
