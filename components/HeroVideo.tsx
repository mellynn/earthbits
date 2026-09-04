"use client";

import { useSyncExternalStore } from "react";
import {
  DESKTOP_MQ,
  REDUCE_MOTION_MQ,
  matchesMedia,
  subscribeMatchMedia,
} from "@/lib/match-media";

type HeroVideoProps = {
  src: string;
  poster?: string;
};

/**
 * Muted autoplay loop. The <video> (and therefore the mp4) mounts only on
 * desktop when motion is allowed. SSR and mobile stay poster-only.
 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeMatchMedia(REDUCE_MOTION_MQ),
    () => matchesMedia(REDUCE_MOTION_MQ),
    () => true,
  );
  const isDesktop = useSyncExternalStore(
    subscribeMatchMedia(DESKTOP_MQ),
    () => matchesMedia(DESKTOP_MQ),
    () => false,
  );

  if (reduceMotion || !isDesktop) return null;

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
