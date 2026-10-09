export interface Milestone {
  date: string;
  title: string;
  text: string;
}

// Newest last — the timeline reads top to bottom like a story.
export const journey: Milestone[] = [
  {
    date: 'Jul 2025',
    title: 'Hello, World.',
    text: 'My first repository, written in C.',
  },
  {
    date: 'Aug 2025',
    title: 'Started a B.Tech in CSE',
    text: 'Joined South Asian University in New Delhi.',
  },
  {
    date: 'Dec 2025',
    title: 'First things shipped',
    text: 'Built Declutter, my first Chrome extension, and the first version of this website.',
  },
  {
    date: 'Mar 2026',
    title: 'Local LLMs',
    text: 'Built a WhatsApp assistant that runs on models hosted on my own machine with Ollama.',
  },
  {
    date: 'Apr 2026',
    title: 'Tools for developers',
    text: 'Started The Greatest Code Highlighter, a VS Code extension in TypeScript.',
  },
  {
    date: 'Aug 2026',
    title: 'Satellites',
    text: 'Built SatQuery AI: fine-tuned vision models behind an LLM that orchestrates tools.',
  },
  {
    date: 'Sep 2026',
    title: 'Shipping season',
    text: 'Released Code Highlighter v0.1.0 and built Poker Bankroll for game nights with friends.',
  },
];
