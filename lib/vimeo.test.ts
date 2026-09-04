import assert from "node:assert/strict";
import test from "node:test";
import { parseVimeo, parseVimeoId, vimeoEmbedSrc, workVimeoUrls } from "./vimeo.ts";

test("numeric id", () => {
  assert.deepEqual(parseVimeo("123456789"), { id: "123456789" });
});

test("public url", () => {
  assert.deepEqual(parseVimeo("https://vimeo.com/123456789"), {
    id: "123456789",
    hash: undefined,
  });
});

test("unlisted id/hash path", () => {
  const ref = parseVimeo("https://vimeo.com/123456789/abcDEF12");
  assert.deepEqual(ref, { id: "123456789", hash: "abcDEF12" });
  assert.equal(
    vimeoEmbedSrc(ref!),
    "https://player.vimeo.com/video/123456789?h=abcDEF12",
  );
});

test("player url with h query", () => {
  const ref = parseVimeo(
    "https://player.vimeo.com/video/123456789?h=deadbeef",
  );
  assert.deepEqual(ref, { id: "123456789", hash: "deadbeef" });
});

test("empty stays null (no visitor-facing player)", () => {
  assert.equal(parseVimeo(""), null);
  assert.equal(parseVimeoId(""), null);
});

test("workVimeoUrls collects a list and skips empties", () => {
  assert.deepEqual(
    workVimeoUrls({
      vimeoUrls: [
        "https://vimeo.com/848178093/5f1199062e",
        "https://vimeo.com/848178106",
        "https://vimeo.com/848178121",
      ],
    }),
    [
      "https://vimeo.com/848178093/5f1199062e",
      "https://vimeo.com/848178106",
      "https://vimeo.com/848178121",
    ],
  );
});

test("workVimeoUrls falls back to a single vimeoUrl", () => {
  assert.deepEqual(
    workVimeoUrls({ vimeoUrl: "https://vimeo.com/848177807" }),
    ["https://vimeo.com/848177807"],
  );
});

test("workVimeoUrls hides empty / invalid entries", () => {
  assert.deepEqual(workVimeoUrls({ vimeoUrls: [], vimeoUrl: "" }), []);
  assert.deepEqual(workVimeoUrls({ vimeoUrls: ["", "not-a-url"] }), []);
});

test("workVimeoUrls dedupes by id and keeps unlisted hashes", () => {
  const urls = workVimeoUrls({
    vimeoUrls: ["https://vimeo.com/848178144/7d9b4b9d48"],
    vimeoUrl: "https://vimeo.com/848178144",
  });
  assert.deepEqual(urls, ["https://vimeo.com/848178144/7d9b4b9d48"]);
  assert.equal(
    vimeoEmbedSrc(parseVimeo(urls[0])!),
    "https://player.vimeo.com/video/848178144?h=7d9b4b9d48",
  );
});
