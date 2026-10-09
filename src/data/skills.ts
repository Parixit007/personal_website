import {
  siC,
  siClaude,
  siFastapi,
  siGit,
  siGithub,
  siGooglechrome,
  siGoogleearthengine,
  siGooglegemini,
  siHuggingface,
  siJavascript,
  siJupyter,
  siLinux,
  siNodedotjs,
  siOllama,
  siPytest,
  siPython,
  siPytorch,
  siReact,
  siSqlite,
  siTypescript,
  siVite,
  type SimpleIcon,
} from 'simple-icons';

export interface Logo {
  name: string;
  icon: SimpleIcon;
}

// Logos that scroll by in the marquee.
export const logos: Logo[] = [
  { name: 'Python', icon: siPython },
  { name: 'PyTorch', icon: siPytorch },
  { name: 'Hugging Face', icon: siHuggingface },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'React', icon: siReact },
  { name: 'FastAPI', icon: siFastapi },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'Ollama', icon: siOllama },
  { name: 'Gemini', icon: siGooglegemini },
  { name: 'Earth Engine', icon: siGoogleearthengine },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'Vite', icon: siVite },
  { name: 'C', icon: siC },
  { name: 'SQLite', icon: siSqlite },
  { name: 'Linux', icon: siLinux },
  { name: 'Git', icon: siGit },
  { name: 'GitHub', icon: siGithub },
  { name: 'pytest', icon: siPytest },
  { name: 'Jupyter', icon: siJupyter },
  { name: 'Chrome', icon: siGooglechrome },
  { name: 'Claude Code', icon: siClaude },
];

// Languages shown as "app icons". `icon` is omitted for SQL, which gets a drawn database glyph.
export const languages: { name: string; icon?: SimpleIcon; tint: string; glyph?: string }[] = [
  { name: 'Python', icon: siPython, tint: '#3776AB' },
  { name: 'TypeScript', icon: siTypescript, tint: '#3178C6' },
  { name: 'JavaScript', icon: siJavascript, tint: '#E8C300', glyph: '#1d1d1f' },
  { name: 'C', icon: siC, tint: '#5C6BC0' },
  { name: 'SQL', tint: '#0F7B8C' },
];

export const skillGroups = {
  ai: {
    title: 'AI / ML',
    lead: 'Fine-tuning vision models, and wiring LLMs up to real tools.',
    items: [
      'PyTorch',
      'Hugging Face Transformers',
      'LoRA fine-tuning',
      'Grounding DINO',
      'PaliGemma',
      'U-Net',
      'LLM tool-calling',
      'Agentic orchestration',
      'Gemini · Groq · Ollama',
    ],
    tasks: ['Visual question answering', 'Visual grounding', 'Semantic segmentation', 'Change detection'],
  },
  web: {
    title: 'Backend & Web',
    lead: 'APIs, interfaces, and extensions for the tools I live in.',
    items: [
      'FastAPI',
      'Node.js',
      'REST APIs',
      'React',
      'Vite',
      'HTML & CSS',
      'Web scraping',
      'Automation',
      'Chrome extensions',
      'VS Code extensions',
    ],
  },
  tools: {
    title: 'Data & Tools',
    lead: 'The everyday kit.',
    items: ['SQL databases', 'Linux', 'Git & GitHub', 'pytest', 'Jupyter', 'Kaggle', 'Claude Code'],
  },
} as const;
