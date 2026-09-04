"use client";

import { useSyncExternalStore } from "react";
import {
  REDUCE_MOTION_MQ,
  matchesMedia,
  subscribeMatchMedia,
} from "@/lib/match-media";

type HeroVideoProps = {
  src: string;
  poster?: string;
};

/**
 * Muted autoplay loop. When prefers-reduced-motion is set (or unknown on the
 * server) the <video> is not mounted, so the mp4 is never requested.
 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeMatchMedia(REDUCE_MOTION_MQ),
    () => matchesMedia(REDUCE_MOTION_MQ),
    () => true,
  );

  if (reduceMotion) return null;

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
