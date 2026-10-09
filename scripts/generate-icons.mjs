// Renders the PNG icons and the social share image into public/.
// Run with `npm run icons` after changing the ghost or the share card text.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';

const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

const ghostPath =
  'M24 96A76 76 0 0 1 176 96L176 188Q158 240 140 196Q129 172 118 196Q100 240 82 196Q71 172 60 196Q42 240 24 188Z';

const ghostDefs = `
  <linearGradient id="gb" x1="0.15" y1="0" x2="0.85" y2="1">
    <stop offset="0" stop-color="#ff8170"/><stop offset="0.42" stop-color="#e8453c"/><stop offset="1" stop-color="#b8252b"/>
  </linearGradient>
  <radialGradient id="gs" cx="0.3" cy="0.2" r="0.6">
    <stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="0.45" stop-color="#fff" stop-opacity="0.08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="gr" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0.9"/><stop offset="0.4" stop-color="#fff" stop-opacity="0.1"/><stop offset="0.75" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0.3"/>
  </linearGradient>`;

const ghost = `
  <path d="${ghostPath}" fill="url(#gb)"/>
  <path d="${ghostPath}" fill="url(#gs)"/>
  <path d="${ghostPath}" fill="none" stroke="url(#gr)" stroke-width="2.5"/>
  <path d="M52 70C62 46 86 32 110 31" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="74" cy="104" rx="11" ry="15" fill="#fff"/>
  <ellipse cx="126" cy="104" rx="11" ry="15" fill="#fff"/>`;

// App icon: the glass ghost on a dark, softly lit tile.
const appIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    ${ghostDefs}
    <radialGradient id="bg" cx="0.5" cy="0.35" r="0.75">
      <stop offset="0" stop-color="#3a1414"/><stop offset="0.55" stop-color="#120708"/><stop offset="1" stop-color="#050505"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <g transform="translate(81 44) scale(1.75)">${ghost}</g>
</svg>`;

// Link preview card (1200×630).
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    ${ghostDefs}
    <radialGradient id="a1" cx="0.18" cy="0.2" r="0.55"><stop offset="0" stop-color="#ff453a" stop-opacity="0.45"/><stop offset="1" stop-color="#ff453a" stop-opacity="0"/></radialGradient>
    <radialGradient id="a2" cx="0.85" cy="0.1" r="0.5"><stop offset="0" stop-color="#ff9f0a" stop-opacity="0.3"/><stop offset="1" stop-color="#ff9f0a" stop-opacity="0"/></radialGradient>
    <radialGradient id="a3" cx="0.7" cy="1" r="0.6"><stop offset="0" stop-color="#bf5af2" stop-opacity="0.28"/><stop offset="1" stop-color="#bf5af2" stop-opacity="0"/></radialGradient>
    <linearGradient id="warm" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ff453a"/><stop offset="0.45" stop-color="#ff6a3d"/><stop offset="1" stop-color="#ff9f0a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#000"/>
  <rect width="1200" height="630" fill="url(#a1)"/>
  <rect width="1200" height="630" fill="url(#a2)"/>
  <rect width="1200" height="630" fill="url(#a3)"/>

  <g transform="translate(92 150) scale(1.35)">${ghost}</g>

  <g font-family="System Font, Helvetica Neue, Helvetica, Arial, sans-serif">
    <rect x="410" y="152" width="396" height="46" rx="23" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.16"/>
    <circle cx="436" cy="175" r="6" fill="#30d158"/>
    <text x="454" y="183" font-size="22" font-weight="600" fill="#f5f5f7">Open to AI/ML &amp; SWE internships</text>

    <text x="408" y="296" font-size="84" font-weight="700" letter-spacing="-3" fill="#f5f5f7">Parixit Singh Balot</text>
    <text x="410" y="360" font-size="36" font-weight="600" letter-spacing="-0.8" fill="#a1a1a6">I build <tspan fill="url(#warm)">agentic AI</tspan>, computer vision</text>
    <text x="410" y="406" font-size="36" font-weight="600" letter-spacing="-0.8" fill="#a1a1a6">pipelines and developer tools.</text>

    <text x="410" y="506" font-size="22" font-weight="500" letter-spacing="1.5" fill="#86868b">B.TECH CSE · SOUTH ASIAN UNIVERSITY · NEW DELHI</text>
    <text x="410" y="548" font-size="24" font-weight="600" fill="#f5f5f7">parixit.netlify.app</text>
  </g>
</svg>`;

const icon = sharp(Buffer.from(appIcon));
await icon.clone().resize(512, 512).png().toFile(out('icon-512.png'));
await icon.clone().resize(192, 192).png().toFile(out('icon-192.png'));
await icon.clone().resize(180, 180).png().toFile(out('apple-touch-icon.png'));

await sharp(Buffer.from(og), { density: 144 }).resize(1200, 630).png({ compressionLevel: 9 }).toFile(out('og.png'));

// favicon.ico for crawlers and old browsers: a 32px PNG wrapped in a one-image ICO header.
const png = await sharp(fileURLToPath(new URL('../public/favicon.svg', import.meta.url)), { density: 300 })
  .resize(32, 32)
  .png()
  .toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette size
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png.length, 14); // image size
header.writeUInt32LE(22, 18); // image offset
await writeFile(out('favicon.ico'), Buffer.concat([header, png]));

console.log('Icons written to public/');
