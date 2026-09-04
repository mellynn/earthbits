export type VimeoRef = {
  id: string;
  hash?: string;
};

function asUrl(value: string): URL | null {
  try {
    return new URL(value.startsWith("http") ? value : `https://${value}`);
  } catch {
    return null;
  }
}

function pathHash(segment?: string): string | undefined {
  if (!segment) return undefined;
  return /^[a-zA-Z0-9]+$/.test(segment) ? segment : undefined;
}

/**
 * Accepts a numeric ID, public URLs, player URLs, and unlisted
 * `vimeo.com/{id}/{hash}` (or `?h=`) forms used for private art cuts.
 */
export function parseVimeo(input?: string): VimeoRef | null {
  if (!input?.trim()) return null;
  const value = input.trim();
  if (/^\d+$/.test(value)) return { id: value };

  const url = asUrl(value);
  if (!url) return null;

  const host = url.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;

  const queryHash = url.searchParams.get("h") || undefined;
  const parts = url.pathname.split("/").filter(Boolean);

  const fromVideoSegment = (): VimeoRef | null => {
    const index = parts.indexOf("video");
    const id = index >= 0 ? parts[index + 1] : undefined;
    if (!id || !/^\d+$/.test(id)) return null;
    return {
      id,
      hash: pathHash(parts[index + 2]) ?? queryHash,
    };
  };

  if (host === "player.vimeo.com") {
    return fromVideoSegment();
  }

  if (parts[0] && /^\d+$/.test(parts[0])) {
    return {
      id: parts[0],
      hash: pathHash(parts[1]) ?? queryHash,
    };
  }

  return fromVideoSegment();
}

export function parseVimeoId(input?: string): string | null {
  return parseVimeo(input)?.id ?? null;
}

export function vimeoEmbedSrc(ref: VimeoRef | string) {
  const parsed = typeof ref === "string" ? { id: ref } : ref;
  const params = new URLSearchParams();
  if (parsed.hash) params.set("h", parsed.hash);
  const query = params.toString();
  return `https://player.vimeo.com/video/${parsed.id}${query ? `?${query}` : ""}`;
}
