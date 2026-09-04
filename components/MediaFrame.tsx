import Image from "next/image";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { cn } from "@/lib/cn";
import type { MediaSlot } from "@/lib/types";

const aspectClass = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
} as const;

function isRemoteSrc(src: string) {
  return /^https?:\/\//i.test(src);
}

function isSvgSrc(src: string) {
  try {
    const path = isRemoteSrc(src) ? new URL(src).pathname : src;
    return /\.svg$/i.test(path);
  } catch {
    return /\.svg(\?|$)/i.test(src);
  }
}

export function MediaFrame({
  slot,
  className,
}: {
  slot: MediaSlot;
  className?: string;
}) {
  const aspect = slot.aspect ?? "square";

  if (!slot.src) {
    return (
      <div className={className}>
        <PlaceholderMedia
          motif={slot.motif}
          seed={slot.seed}
          alt={slot.alt}
          aspect={aspect}
        />
        {slot.caption ? (
          <p className="mt-3 text-sm text-muted">{slot.caption}</p>
        ) : null}
      </div>
    );
  }

  const svg = isSvgSrc(slot.src);

  return (
    <figure className={cn("relative overflow-hidden bg-[#262323]", className)}>
      <div className={cn("relative w-full", aspectClass[aspect])}>
        {svg ? (
          // SVGs skip next/image optimization; local placeholders live in /public.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slot.src}
            alt={slot.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        {slot.placeholder ? (
          <span className="pointer-events-none absolute left-3 top-3 text-[10px] uppercase tracking-[0.22em] text-accent/90">
            Placeholder
          </span>
        ) : null}
      </div>
      {slot.caption ? (
        <figcaption className="mt-3 text-sm text-muted">{slot.caption}</figcaption>
      ) : null}
    </figure>
  );
}
