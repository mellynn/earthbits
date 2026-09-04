import Image from "next/image";
import { HeroVideo } from "@/components/HeroVideo";
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

function srcPath(src: string) {
  try {
    return isRemoteSrc(src) ? new URL(src).pathname : src;
  } catch {
    return src;
  }
}

function isSvgSrc(src: string) {
  return /\.svg(\?|$)/i.test(srcPath(src));
}

function isVideoSrc(src: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(srcPath(src));
}

export function MediaFrame({
  slot,
  className,
  fill,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
}: {
  slot: MediaSlot;
  className?: string;
  /** Fill the parent box instead of using the slot aspect ratio. */
  fill?: boolean;
  sizes?: string;
}) {
  const aspect = slot.aspect ?? "square";
  const boxClass = fill ? "relative h-full w-full" : cn("relative w-full", aspectClass[aspect]);
  const videoSrc =
    slot.video ?? (slot.src && isVideoSrc(slot.src) ? slot.src : undefined);
  const poster =
    slot.poster ??
    (slot.src && !isVideoSrc(slot.src) ? slot.src : undefined);

  if (videoSrc) {
    return (
      <figure className={cn("relative h-full overflow-hidden bg-[#262323]", className)}>
        <div className={boxClass}>
          {poster ? (
            <Image
              src={poster}
              alt={slot.alt}
              fill
              sizes={sizes}
              className="object-cover"
            />
          ) : null}
          <HeroVideo src={videoSrc} poster={poster} />
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
    <figure className={cn("relative h-full overflow-hidden bg-[#262323]", className)}>
      <div className={boxClass}>
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
            sizes={sizes}
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
