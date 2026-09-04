import { parseVimeo, vimeoEmbedSrc } from "@/lib/vimeo";

type VimeoEmbedProps = {
  url?: string;
  /** Work title for the iframe; falls back to a generic label. */
  title?: string;
};

/** Renders a Vimeo player, or nothing when `url` is missing/invalid. */
export function VimeoEmbed({ url, title }: VimeoEmbedProps) {
  const ref = parseVimeo(url);
  if (!ref) return null;

  return (
    <div className="aspect-video overflow-hidden bg-[#262323]">
      <iframe
        src={vimeoEmbedSrc(ref)}
        title={title?.trim() ? `${title.trim()} video` : "Project video"}
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
