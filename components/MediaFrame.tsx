import Image from "next/image";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { cn } from "@/lib/cn";
import type { MediaSlot } from "@/lib/types";

export function MediaFrame({
  slot,
  className,
}: {
  slot: MediaSlot;
  className?: string;
}) {
  const aspect = slot.aspect ?? "square";

  if (slot.src) {
    const aspectClass =
      aspect === "portrait"
        ? "aspect-[3/4]"
        : aspect === "wide"
          ? "aspect-[16/9]"
          : "aspect-square";

    return (
      <figure className={cn("relative overflow-hidden bg-[#262323]", className)}>
        <div className={cn("relative w-full", aspectClass)}>
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        {slot.caption ? (
          <figcaption className="mt-3 text-sm text-muted">{slot.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

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
