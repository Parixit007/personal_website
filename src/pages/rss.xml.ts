import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNotes } from '../lib/notes';
import { site } from '../data/site';

export async function GET(context: APIContext) {
  const notes = (await getNotes()).filter((note) => !note.data.draft);
  return rss({
    title: `${site.name} — Notes`,
    description: 'Thoughts and things I’m learning along the way.',
    site: context.site ?? site.url,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.date,
      link: `/notes/${note.id}/`,
      categories: note.data.tags,
    })),
  });
}
