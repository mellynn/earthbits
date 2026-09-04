import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  HERO_PARALLAX,
  heroParallaxTransform,
} from "./hero-parallax.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel: string) => readFileSync(join(root, rel), "utf8");

test("Hero is one CSS-responsive tree (no Mobile/Desktop remount)", () => {
  const src = read("components/Hero.tsx");
  assert.equal(src.includes("md:hidden"), false);
  assert.equal(src.includes("hidden md:block"), false);
  assert.equal(src.includes("isDesktop"), false);
  assert.equal(src.includes("MobileHero"), false);
  assert.equal(src.includes("DesktopHero"), false);
  assert.equal(src.includes("useSyncExternalStore"), false);
  assert.match(src, /HeroParallaxScene/);
  assert.match(src, /layer="hero-block"/);
  assert.match(src, /name="left-image"/);
  assert.match(src, /name="middle-image"/);
  assert.match(src, /name="hero-auto-video"/);
});

test("client Hero does not import work JSON / content loaders", () => {
  const src = read("components/Hero.tsx");
  assert.equal(src.includes("@/lib/content"), false);
  assert.equal(src.includes("@/lib/site"), false);
  assert.equal(src.includes("getWork"), false);
  assert.equal(src.includes("getSite"), false);
  assert.equal(src.includes("getWorks"), false);
  assert.match(src, /export type HeroProps/);
  const page = read("app/page.tsx");
  assert.match(page, /getWork\("flora-in-frequency"\)/);
  assert.match(page, /<Hero name=/);
});

test("HeroVideo skips src on reduced-motion and on mobile", () => {
  const src = read("components/HeroVideo.tsx");
  const mq = read("lib/match-media.ts");
  assert.match(mq, /prefers-reduced-motion: reduce/);
  assert.match(mq, /min-width: 768px/);
  assert.match(src, /REDUCE_MOTION_MQ/);
  assert.match(src, /DESKTOP_MQ/);
  assert.match(src, /if \(reduceMotion \|\| !isDesktop\) return null/);
  assert.match(src, /=> true/);
  assert.match(src, /=> false/);
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

test("live desktop transforms stay identity through scrollY 100", () => {
  for (const rate of Object.values(HERO_PARALLAX)) {
    assert.equal(heroParallaxTransform(0, rate), "none");
    assert.equal(heroParallaxTransform(100, rate), "none");
  }
});

test("live desktop rates at scrollY 300 match measured translate3d", () => {
  assert.equal(
    heroParallaxTransform(300, HERO_PARALLAX.block),
    "translate3d(0, 59.0px, 42.0px)",
  );
  assert.equal(
    heroParallaxTransform(300, HERO_PARALLAX.left),
    "translate3d(0, -25.0px, 25.0px)",
  );
  assert.equal(
    heroParallaxTransform(300, HERO_PARALLAX.middle),
    "translate3d(0, -42.0px, 25.0px)",
  );
  assert.equal(
    heroParallaxTransform(300, HERO_PARALLAX.video),
    "translate3d(0, -42.0px, 42.0px)",
  );
  assert.ok(HERO_PARALLAX.block.y > 0);
  assert.ok(HERO_PARALLAX.left.y < 0);
  assert.ok(HERO_PARALLAX.middle.y < 0);
  assert.ok(HERO_PARALLAX.video.y < 0);
});

test("desktop hero wires text-vs-cards layers inside a 76vw wrap", () => {
  const src = read("components/Hero.tsx");
  assert.match(src, /HERO_PARALLAX\.block/);
  assert.match(src, /HERO_PARALLAX\.left/);
  assert.match(src, /HERO_PARALLAX\.middle/);
  assert.match(src, /HERO_PARALLAX\.video/);
  assert.equal((src.match(/<ParallaxLayer/g) || []).length, 2);
  assert.equal((src.match(/<HeroCard/g) || []).length, 3);
  assert.match(src, /md:w-\[76vw\]/);
  assert.match(src, /md:w-\[44\.79vw\]/);
  assert.match(src, /text-accent/);
  assert.equal(src.includes("8.5rem"), false);
  assert.equal(src.includes("left-[2vw]"), false);
  assert.equal(src.includes("right-[2vw]"), false);
});

test("VimeoEmbed defers iframe and memoizes parse", () => {
  const src = read("components/VimeoEmbed.tsx");
  assert.match(src, /IntersectionObserver/);
  assert.match(src, /loading="lazy"/);
  assert.match(src, /inView \?/);
  assert.match(src, /useMemo\(\(\) => parseVimeo\(url\), \[url\]\)/);
  assert.match(src, /\[parsedId, parsedHash, inView\]/);
});

test("one video slot and one parallax scene (no dual-mount)", () => {
  const hero = read("components/Hero.tsx");
  assert.equal((hero.match(/<HeroParallaxScene/g) || []).length, 1);
  assert.equal((hero.match(/name="hero-auto-video"/g) || []).length, 1);
  assert.equal((hero.match(/<MediaFrame/g) || []).length, 1);
  assert.equal((hero.match(/<HeroVideo/g) || []).length, 0);
  const video = read("components/HeroVideo.tsx");
  assert.equal((video.match(/^\s*<video\b/gm) || []).length, 1);
  assert.match(video, /if \(reduceMotion \|\| !isDesktop\) return null/);
});

test("center hero still is not the leftover wireframe filename", () => {
  const flora = read("content/works/flora-in-frequency.json");
  assert.match(flora, /hero-center\.jpg/);
  assert.equal(flora.includes("hero-wireframe.jpg"), false);
  assert.match(flora, /Glass flower in a ceramic vase/);
});

test("scene CSS uses perspective and preserve-3d", () => {
  const css = read("app/globals.css");
  assert.match(css, /perspective:\s*1000px/);
  assert.match(css, /transform-style:\s*preserve-3d/);
  assert.match(css, /will-change:\s*transform/);
});
