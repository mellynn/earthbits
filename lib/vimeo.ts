export function parseVimeoId(input?: string): string | null {
  if (!input?.trim()) return null;
  const value = input.trim();
  if (/^\d+$/.test(value)) return value;
  const match = value.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return match?.[1] ?? null;
}

export function vimeoEmbedSrc(id: string) {
  return `https://player.vimeo.com/video/${id}`;
}
