/**
 * Generates labeled gallery placeholder SVGs under public/works/.
 * Re-run with: node scripts/generate-placeholders.mjs
 * These are not original artworks — swap files listed in the README.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function hash(seed) {
  let h = 2166136261;
  const s = String(seed);
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rnd(seed, n = 0) {
  const x = Math.sin(hash(`${seed}:${n}`)) * 10000;
  return x - Math.floor(x);
}

function label(title, note) {
  return `
    <text x="28" y="36" fill="#e8bf96" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" letter-spacing="3.2">PLACEHOLDER</text>
    <text x="28" y="${note ? "94%" : "96%"}" fill="#f3eee8" font-family="ui-serif, Georgia, serif" font-size="18">${escapeXml(title)}</text>
    ${note ? `<text x="28" y="97.4%" fill="#b3aaa3" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11">${escapeXml(note)}</text>` : ""}
  `;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function svg({ w, h, title, note, art }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${escapeXml(title)} (placeholder)">
  <rect width="${w}" height="${h}" fill="#262323"/>
  ${art}
  ${label(title, note)}
</svg>
`;
}

function wireframeBloom(w, h, seed) {
  const cx = w * 0.5;
  const cy = h * 0.48;
  const rot = rnd(seed, 1) * 16 - 8;
  const petals = Array.from({ length: 7 }, (_, i) => {
    const a = -30 + i * 10 + rnd(seed, i) * 6;
    return `<ellipse cx="${cx}" cy="${cy - 12}" rx="${18 + i}" ry="${52 + i * 3}" transform="rotate(${a} ${cx} ${cy})" fill="none" stroke="#f3eee8" stroke-width="1.2" opacity="${0.35 + i * 0.08}"/>`;
  }).join("");
  return `
    <g fill="none" stroke="#e8bf96" stroke-width="0.8" opacity="0.45" transform="rotate(${rot} ${cx} ${cy})">
      <rect x="${cx - 90}" y="${cy - 90}" width="180" height="180"/>
      <path d="M${cx - 90} ${cy - 90} L${cx - 62} ${cy - 124} L${cx + 118} ${cy - 124} L${cx + 90} ${cy - 90}"/>
      <path d="M${cx + 90} ${cy - 90} L${cx + 118} ${cy - 124} L${cx + 118} ${cy + 56} L${cx + 90} ${cy + 90}"/>
    </g>
    ${petals}
    <circle cx="${cx}" cy="${cy + 8}" r="12" fill="#e8bf96" opacity="0.9"/>
  `;
}

function scanPortrait(w, h, seed) {
  const lines = Array.from({ length: 22 }, (_, i) => {
    const y = 48 + i * ((h - 90) / 22);
    return `<rect x="36" y="${y}" width="${w - 72}" height="1.2" fill="#e8bf96" opacity="${0.08 + (i % 5) * 0.04}"/>`;
  }).join("");
  const lean = rnd(seed, 2) * 10 - 5;
  return `
    ${lines}
    <g fill="none" stroke="#f3eee8" stroke-width="1.6" transform="translate(${lean} 0)">
      <path d="M${w * 0.5} ${h * 0.28} C ${w * 0.62} ${h * 0.32}, ${w * 0.68} ${h * 0.46}, ${w * 0.6} ${h * 0.58} C ${w * 0.55} ${h * 0.68}, ${w * 0.45} ${h * 0.68}, ${w * 0.4} ${h * 0.58} C ${w * 0.32} ${h * 0.46}, ${w * 0.38} ${h * 0.32}, ${w * 0.5} ${h * 0.28} Z"/>
      <path d="M${w * 0.5} ${h * 0.58} C ${w * 0.5} ${h * 0.7}, ${w * 0.54} ${h * 0.78}, ${w * 0.5} ${h * 0.86}"/>
    </g>
  `;
}

function vaseStudy(w, h, seed) {
  const cx = w * 0.5 + (rnd(seed, 3) * 20 - 10);
  const cy = h * 0.58;
  const lean = rnd(seed, 4) * 8 - 4;
  return `
    <g fill="none" stroke="#e8bf96" stroke-width="1.5" transform="rotate(${lean} ${cx} ${cy})">
      <path d="M${cx - 28} ${cy + 18} C ${cx - 32} ${cy + 70}, ${cx + 32} ${cy + 70}, ${cx + 28} ${cy + 18} L ${cx + 16} ${cy - 24} L ${cx - 16} ${cy - 24} Z"/>
      <path d="M${cx} ${cy - 24} V ${cy - 88}"/>
      <ellipse cx="${cx}" cy="${cy - 108}" rx="14" ry="32" transform="rotate(-20 ${cx} ${cy - 108})"/>
      <ellipse cx="${cx}" cy="${cy - 108}" rx="14" ry="32" transform="rotate(20 ${cx} ${cy - 108})"/>
      <ellipse cx="${cx}" cy="${cy - 112}" rx="12" ry="36"/>
      <circle cx="${cx}" cy="${cy - 92}" r="6" fill="#e8bf96" stroke="none"/>
    </g>
  `;
}

function pixelField(w, h, seed) {
  const palette = ["#e8bf96", "#7d9a86", "#6d7fa3", "#c27b6e", "#d7c4a4", "#8a6b84"];
  const cols = 11;
  const rows = 11;
  const pad = 48;
  const gw = (w - pad * 2) / cols;
  const gh = (h - pad * 2) / rows;
  const cells = [];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      if (rnd(`${seed}-${x}-${y}`, 1) < 0.16) continue;
      const color = palette[(x + y + hash(seed)) % palette.length];
      const s = Math.min(gw, gh) * (0.62 + rnd(`${seed}-s-${x}-${y}`) * 0.28);
      cells.push(
        `<rect x="${pad + x * gw + 4}" y="${pad + y * gh + 4}" width="${s}" height="${s}" fill="${color}" opacity="0.9"/>`,
      );
    }
  }
  return cells.join("");
}

function pointCloud(w, h, seed) {
  const dots = [];
  const cx = w * 0.5;
  const cy = h * 0.5;
  for (let i = 0; i < 140; i += 1) {
    const t = (i / 140) * Math.PI * 2;
    const layer = 28 + (i % 9) * 10 + rnd(seed, i) * 14;
    const x = cx + Math.cos(t) * layer * (0.55 + (i % 5) * 0.08);
    const y = cy + Math.sin(t) * layer * 0.95 - 8;
    dots.push(
      `<circle cx="${x}" cy="${y}" r="${0.8 + (i % 3) * 0.45}" fill="#e8bf96" opacity="${0.22 + rnd(seed, i + 9) * 0.7}"/>`,
    );
  }
  return `${dots.join("")}<circle cx="${cx}" cy="${cy + 6}" r="5" fill="#f3eee8"/>`;
}

function lidarLand(w, h, seed) {
  const shift = rnd(seed, 5) * 30 - 15;
  const waves = Array.from({ length: 7 }, (_, i) => {
    const y = 70 + i * ((h - 140) / 7);
    return `<path d="M24 ${y} C ${w * 0.28} ${y - 40 + shift}, ${w * 0.55} ${y + 36 - shift}, ${w - 24} ${y - 8}" fill="none" stroke="#e8bf96" stroke-width="${i === 3 ? 1.8 : 0.8}" opacity="${0.22 + i * 0.08}"/>`;
  }).join("");
  const dots = Array.from({ length: 50 }, (_, i) => {
    return `<circle cx="${30 + ((i * 47 + hash(seed)) % (w - 60))}" cy="${70 + ((i * 31 + hash(seed + 3)) % (h - 140))}" r="1.1" fill="#e8bf96" opacity="0.55"/>`;
  }).join("");
  return waves + dots;
}

function glassBloom(w, h, seed) {
  const a = 12 + rnd(seed, 6) * 24;
  return `
    <ellipse cx="${w * 0.44}" cy="${h * 0.48}" rx="${w * 0.22}" ry="${h * 0.26}" fill="#6d7fa3" opacity="0.38"/>
    <ellipse cx="${w * 0.6}" cy="${h * 0.54}" rx="${w * 0.2}" ry="${h * 0.24}" fill="#c27b6e" opacity="0.3"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.44}" rx="${w * 0.16}" ry="${h * 0.22}" fill="#e8bf96" opacity="0.48"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="${w * 0.09}" ry="${h * 0.18}" fill="none" stroke="#f3eee8" stroke-width="1" transform="rotate(${a} ${w * 0.5} ${h * 0.5})"/>
  `;
}

function photogrammetry(w, h, seed) {
  return `
    <rect x="28" y="44" width="${w - 56}" height="${h - 88}" fill="none" stroke="#e8bf96" stroke-width="0.8" opacity="0.4"/>
    <path d="M28 68 H${w - 28}" stroke="#e8bf96" stroke-width="0.6" opacity="0.35"/>
    <circle cx="46" cy="56" r="4" fill="#c27b6e"/>
    <circle cx="60" cy="56" r="4" fill="#e8bf96"/>
    <circle cx="74" cy="56" r="4" fill="#7d9a86"/>
    ${pointCloud(w, h, seed + 11)}
  `;
}

function waveform(w, h, seed) {
  const bars = Array.from({ length: 42 }, (_, i) => {
    const bh = 18 + rnd(seed, i) * (h * 0.42);
    const x = 40 + i * ((w - 80) / 42);
    return `<rect x="${x}" y="${h / 2 - bh / 2}" width="4" height="${bh}" fill="#e8bf96" opacity="0.78"/>`;
  }).join("");
  return `${bars}<path d="M36 ${h / 2} C ${w * 0.25} ${h * 0.32}, ${w * 0.45} ${h * 0.68}, ${w * 0.62} ${h / 2} S ${w * 0.88} ${h * 0.36}, ${w - 36} ${h / 2}" fill="none" stroke="#f3eee8" stroke-width="1.1" opacity="0.55"/>`;
}

function deskStudy(w, h) {
  const cx = w * 0.5;
  return `
    <g fill="none" stroke="#e8bf96" stroke-width="1.4">
      <rect x="${cx - 110}" y="${h * 0.32}" width="220" height="120"/>
      <rect x="${cx - 90}" y="${h * 0.38}" width="180" height="86" opacity="0.5"/>
      <path d="M${cx - 140} ${h * 0.7} H${cx + 140}"/>
      <path d="M${cx - 70} ${h * 0.7} V${h * 0.82} M${cx + 70} ${h * 0.7} V${h * 0.82}"/>
      <path d="M${cx + 118} ${h * 0.62} C ${cx + 126} ${h * 0.54}, ${cx + 150} ${h * 0.54}, ${cx + 146} ${h * 0.66}"/>
      <circle cx="${cx + 146}" cy="${h * 0.5}" r="12"/>
    </g>
  `;
}

function studioWall(w, h) {
  return `
    <g fill="none" stroke="#e8bf96" stroke-width="1.3">
      <rect x="${w * 0.12}" y="${h * 0.28}" width="${w * 0.28}" height="${h * 0.38}"/>
      <rect x="${w * 0.46}" y="${h * 0.22}" width="${w * 0.2}" height="${w * 0.2}"/>
      <rect x="${w * 0.46}" y="${h * 0.52}" width="${w * 0.4}" height="${h * 0.24}"/>
    </g>
  `;
}

function glitchPortrait(w, h, seed) {
  const off = 6 + rnd(seed, 8) * 8;
  return `
    <g transform="translate(${-off} 0)" opacity="0.45" fill="none" stroke="#6d7fa3" stroke-width="1.5">
      <circle cx="${w * 0.5}" cy="${h * 0.38}" r="${Math.min(w, h) * 0.16}"/>
      <path d="M${w * 0.38} ${h * 0.56} C ${w * 0.38} ${h * 0.74}, ${w * 0.62} ${h * 0.74}, ${w * 0.62} ${h * 0.56}"/>
    </g>
    <g transform="translate(${off} 4)" opacity="0.85" fill="none" stroke="#e8bf96" stroke-width="1.5">
      <circle cx="${w * 0.5}" cy="${h * 0.38}" r="${Math.min(w, h) * 0.16}"/>
      <path d="M${w * 0.38} ${h * 0.56} C ${w * 0.38} ${h * 0.74}, ${w * 0.62} ${h * 0.74}, ${w * 0.62} ${h * 0.56}"/>
    </g>
  `;
}

const S = 800;
const P = { w: 600, h: 800 };
const W = { w: 1280, h: 720 };

const files = [
  ["flora-in-frequency/cover.svg", S, S, "Flora in Frequency", "cover", wireframeBloom],
  ["flora-in-frequency/hero-scan.svg", P.w, P.h, "Flora in Frequency", "hero — scan study", scanPortrait],
  ["flora-in-frequency/hero-wireframe.svg", S, S, "Flora in Frequency", "hero — wireframe", wireframeBloom],
  ["flora-in-frequency/hero-vase.svg", S, S, "Flora in Frequency", "hero — still life", vaseStudy],
  ["flora-in-frequency/process-flora-1.svg", S, S, "Flora in Frequency", "process — local flora 1", vaseStudy],
  ["flora-in-frequency/process-flora-2.svg", S, S, "Flora in Frequency", "process — local flora 2", vaseStudy],
  ["flora-in-frequency/process-flora-3.svg", S, S, "Flora in Frequency", "process — local flora 3", vaseStudy],
  ["flora-in-frequency/process-scan-1.svg", S, S, "Flora in Frequency", "process — photogrammetry 1", photogrammetry],
  ["flora-in-frequency/process-scan-2.svg", S, S, "Flora in Frequency", "process — photogrammetry 2", photogrammetry],
  ["flora-in-frequency/process-scan-3.svg", S, S, "Flora in Frequency", "process — photogrammetry 3", photogrammetry],
  ["flora-in-frequency/process-animation.svg", W.w, W.h, "Flora in Frequency", "process — animation", wireframeBloom],
  ["flora-in-frequency/process-material-1.svg", S, S, "Flora in Frequency", "process — material 1", glassBloom],
  ["flora-in-frequency/process-material-2.svg", S, S, "Flora in Frequency", "process — material 2", glassBloom],
  ["flora-in-frequency/process-material-3.svg", S, S, "Flora in Frequency", "process — material 3", glassBloom],
  ["flora-in-frequency/process-sound-1.svg", W.w, W.h, "Flora in Frequency", "process — PlantWave / DAW", waveform],
  ["flora-in-frequency/process-sound-2.svg", W.w, W.h, "Flora in Frequency", "process — studio desk", deskStudy],
  ["flora-in-frequency/final-1.svg", P.w, P.h, "Flora in Frequency", "final still 1", pointCloud],
  ["flora-in-frequency/final-2.svg", P.w, P.h, "Flora in Frequency", "final still 2", pixelField],
  ["flora-in-frequency/final-3.svg", P.w, P.h, "Flora in Frequency", "final still 3", glassBloom],
  ["sidewalks/cover.svg", S, S, "Sidewalks", "cover", pixelField],
  ["sidewalks/gallery-1.svg", S, S, "Sidewalks", "gallery 1", pixelField],
  ["sidewalks/gallery-2.svg", S, S, "Sidewalks", "gallery 2", pixelField],
  ["sidewalks/gallery-3.svg", S, S, "Sidewalks", "gallery 3", vaseStudy],
  ["transience/cover.svg", S, S, "Transience", "cover", pointCloud],
  ["transience/gallery-1.svg", P.w, P.h, "Transience", "gallery 1", pointCloud],
  ["transience/gallery-2.svg", P.w, P.h, "Transience", "gallery 2", pointCloud],
  ["transience/gallery-3.svg", P.w, P.h, "Transience", "gallery 3", scanPortrait],
  ["gardenscapes/cover.svg", S, S, "Gardenscapes", "cover", lidarLand],
  ["gardenscapes/gallery-1.svg", S, S, "Gardenscapes", "gallery 1", lidarLand],
  ["gardenscapes/gallery-2.svg", S, S, "Gardenscapes", "gallery 2", lidarLand],
  ["gardenscapes/gallery-3.svg", S, S, "Gardenscapes", "gallery 3", glassBloom],
  ["about/floral.svg", S, S, "About", "floral study", vaseStudy],
  ["about/portrait.svg", S, S, "About", "portrait study", glitchPortrait],
  ["about/gallery.svg", S, S, "About", "gallery study", studioWall],
];

for (const [rel, w, h, title, note, art] of files) {
  const dest = join(root, "public/works", rel);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(
    dest,
    svg({ w, h, title, note, art: art(w, h, rel) }),
    "utf8",
  );
}

console.log(`Wrote ${files.length} placeholder SVGs under public/works/`);
