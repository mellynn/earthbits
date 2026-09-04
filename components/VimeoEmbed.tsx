import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { parseVimeoId, vimeoEmbedSrc } from "@/lib/vimeo";

export function VimeoEmbed({ url }: { url?: string }) {
  const id = parseVimeoId(url);

  if (!id) {
    return (
      <div>
        <PlaceholderMedia
          motif="waveform"
          seed={4}
          alt="Vimeo embed slot"
          aspect="wide"
        />
        <p className="mt-3 text-sm text-muted">
          Video embed slot — add a Vimeo URL or ID to this work’s JSON (`vimeoUrl`).
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden bg-[#262323]">
      <iframe
        src={vimeoEmbedSrc(id)}
        title="Project video"
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
