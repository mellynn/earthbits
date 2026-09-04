import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { HERO_PARALLAX, heroParallaxTransform } from "./hero-parallax.ts";

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

test("Parallax scene uses one scroll listener and skips small viewports", () => {
  const src = read("components/ParallaxFrame.tsx");
  const mq = read("lib/match-media.ts");
  assert.match(mq, /min-width: 768px/);
  assert.match(src, /DESKTOP_MQ/);
  assert.match(src, /desktop\.matches && !motion\.matches/);
  assert.match(src, /if \(!listening\) return/);
  assert.equal(src.split('addEventListener("scroll"').length - 1, 1);
  assert.match(src, /window\.scrollY/);
  assert.match(src, /heroParallaxTransform/);
});

test("live desktop rates at scrollY 100 match measured translate3d", () => {
  assert.equal(
    heroParallaxTransform(100, HERO_PARALLAX.block),
    "translate3d(0, 12.4px, 8.9px)",
  );
  assert.equal(
    heroParallaxTransform(100, HERO_PARALLAX.left),
    "translate3d(0, -5.3px, 5.3px)",
  );
  assert.equal(
    heroParallaxTransform(100, HERO_PARALLAX.middle),
    "translate3d(0, -8.9px, 5.3px)",
  );
  assert.equal(
    heroParallaxTransform(100, HERO_PARALLAX.video),
    "translate3d(0, -8.9px, 8.9px)",
  );
});

test("desktop hero wires live layer ids and opposing rates", () => {
  const src = read("components/Hero.tsx");
  assert.match(src, /layer="hero-block"/);
  assert.match(src, /layer="left-image"/);
  assert.match(src, /layer="middle-image"/);
  assert.match(src, /layer="hero-auto-video"/);
  assert.match(src, /HERO_PARALLAX\.block/);
  assert.match(src, /HERO_PARALLAX\.left/);
  assert.match(src, /HERO_PARALLAX\.middle/);
  assert.match(src, /HERO_PARALLAX\.video/);
  assert.match(src, /<HeroParallaxScene/);
  assert.equal(src.includes("<ParallaxLayer"), true);
  const mobile = src.slice(src.indexOf("function MobileHero"), src.indexOf("function DesktopHero"));
  assert.equal(mobile.includes("ParallaxLayer"), false);
  assert.equal(mobile.includes("HeroParallaxScene"), false);
});

test("VimeoEmbed defers iframe until near viewport", () => {
  const src = read("components/VimeoEmbed.tsx");
  assert.match(src, /IntersectionObserver/);
  assert.match(src, /loading="lazy"/);
  assert.match(src, /inView \?/);
});

test("scene CSS uses perspective and preserve-3d", () => {
  const css = read("app/globals.css");
  assert.match(css, /perspective:\s*1000px/);
  assert.match(css, /transform-style:\s*preserve-3d/);
  assert.match(css, /will-change:\s*transform/);
});
