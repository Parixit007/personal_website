// Everything personal about the site lives here — edit this file to update your details.

export const site = {
  name: 'Parixit Singh Balot',
  firstName: 'Parixit',
  url: 'https://parixit.netlify.app',
  title: 'Parixit Singh Balot — AI systems & developer tools',
  description:
    'B.Tech CSE student at South Asian University, New Delhi, building agentic AI systems, computer vision pipelines and developer tools.',
  location: 'New Delhi, India',
  timeZone: 'Asia/Kolkata',
  email: 'parixitsinghbalot@gmail.com',
  status: 'Open to AI/ML & SWE internships',
  education: {
    degree: 'B.Tech, Computer Science & Engineering',
    school: 'South Asian University',
    city: 'New Delhi',
    start: '2025-08-01',
    end: '2029-07-31',
  },
  socials: {
    github: 'https://github.com/Parixit007',
    linkedin: 'https://www.linkedin.com/in/parixit-singh-balot-37a531291',
  },
} as const;

// In-page sections, in scroll order. `id` must match the section's id attribute.
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'notes', label: 'Notes' },
  { id: 'contact', label: 'Contact' },
] as const;
