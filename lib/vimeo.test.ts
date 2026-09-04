import assert from "node:assert/strict";
import test from "node:test";
import { parseVimeo, parseVimeoId, vimeoEmbedSrc } from "./vimeo.ts";

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

test("empty stays null (placeholder slot)", () => {
  assert.equal(parseVimeo(""), null);
  assert.equal(parseVimeoId(""), null);
});
