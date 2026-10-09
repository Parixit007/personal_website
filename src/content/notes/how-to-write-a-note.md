---
title: How to write a note
description: A template for new notes. Copy this file, change the frontmatter, and start writing.
date: 2026-09-25
tags: [meta]
draft: true
---

This note is a **draft**, so it only appears while you run `npm run dev`. It never ships to the live site. Keep it around as a template, or delete it once you've published your first real note.

## Making a new note

Create a Markdown file in `src/content/notes/`. The file name becomes the URL, so `learning-rust.md` is published at `/notes/learning-rust/`. Every note starts with a little block of settings called _frontmatter_:

```yaml
---
title: Learning Rust, week one
description: One line that shows up in the list and in link previews.
date: 2026-10-01
tags: [rust, learning]
draft: false
---
```

Set `draft: true` while you're still writing. Flip it to `false` (or delete the line) when it's ready, then commit and push. Netlify rebuilds the site, and the note shows up in the Notes section, on `/notes/`, and in the RSS feed.

## What you can use

Regular Markdown works: **bold**, _italics_, [links](https://github.com/Parixit007), lists, and tables.

- Headings with `##` and `###`
- Code blocks with syntax highlighting, which follow the light and dark theme
- Quotes, images and horizontal rules

> Quotes get a warm gradient rule on the left.

```python
def learn(topic: str) -> str:
    return f"finally understood {topic}"
```

To add an image, put it in `public/notes/` and reference it as `![What it shows](/notes/my-image.png)`.

---

That's it. Write like you talk.
