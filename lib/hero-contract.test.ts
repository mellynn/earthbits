import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel: string) => readFileSync(join(root, rel), "utf8");

test("Hero mounts one layout tree (no css-hidden twin)", () => {
  const src = read("components/Hero.tsx");
  assert.equal(src.includes("md:hidden"), false);
  assert.equal(src.includes("hidden md:block"), false);
  assert.match(src, /isDesktop \?/);
  assert.match(src, /<DesktopHero/);
  assert.match(src, /<MobileHero/);
});

test("HeroVideo does not attach src when reduced-motion", () => {
  const src = read("components/HeroVideo.tsx");
  const mq = read("lib/match-media.ts");
  assert.match(mq, /prefers-reduced-motion: reduce/);
  assert.match(src, /REDUCE_MOTION_MQ/);
  assert.match(src, /if \(reduceMotion\) return null/);
  assert.match(src, /=> true/);
});

test("ParallaxFrame does not subscribe on small viewports", () => {
  const src = read("components/ParallaxFrame.tsx");
  const mq = read("lib/match-media.ts");
  assert.match(mq, /min-width: 768px/);
  assert.match(src, /DESKTOP_MQ/);
  assert.match(src, /desktop\.matches && !motion\.matches/);
  assert.match(src, /if \(!listening\) return/);
});

test("VimeoEmbed defers iframe until near viewport", () => {
  const src = read("components/VimeoEmbed.tsx");
  assert.match(src, /IntersectionObserver/);
  assert.match(src, /loading="lazy"/);
  assert.match(src, /inView \?/);
});
