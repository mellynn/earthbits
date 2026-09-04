"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DESKTOP_MQ, REDUCE_MOTION_MQ } from "@/lib/match-media";

type ParallaxFrameProps = {
  /** Signed pixel travel of the frame across the hero scroll (negative = opposite). */
  shift: number;
  /** Extra travel for the cropped media inside the frame. */
  inner?: number;
  children: ReactNode;
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function reset(layer: HTMLElement, media: HTMLElement | null) {
  layer.style.transform = "none";
  if (media) media.style.transform = "none";
}

/**
 * Desktop-only frame + inner-media parallax. On small viewports this is a
 * no-op: no scroll listeners are attached (matches earthbits.xyz).
 * Also no-ops when prefers-reduced-motion is set.
 */
export function ParallaxFrame({
  shift,
  inner = 0,
  children,
  className,
}: ParallaxFrameProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const media = mediaRef.current;
    if (!layer) return;

    const desktop = window.matchMedia(DESKTOP_MQ);
    const motion = window.matchMedia(REDUCE_MOTION_MQ);
    let frame = 0;
    let listening = false;

    const update = () => {
      if (!desktop.matches || motion.matches) {
        reset(layer, media);
        return;
      }

      const root =
        layer.closest("[data-hero-parallax]") ?? document.documentElement;
      const rect = root.getBoundingClientRect();
      const range = Math.max(rect.height * 0.7, window.innerHeight * 0.55);
      const progress = clamp(-rect.top / range, 0, 1);

      layer.style.transform = `translate3d(0, ${(progress * shift).toFixed(1)}px, 0)`;
      if (media) {
        media.style.transform = `translate3d(0, ${(progress * inner).toFixed(1)}px, 0) scale(1.2)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const stop = () => {
      if (!listening) return;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      listening = false;
      cancelAnimationFrame(frame);
      reset(layer, media);
    };

    const start = () => {
      if (listening) return;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      listening = true;
      update();
    };

    const syncMode = () => {
      if (desktop.matches && !motion.matches) start();
      else stop();
    };

    syncMode();
    desktop.addEventListener("change", syncMode);
    motion.addEventListener("change", syncMode);
    return () => {
      desktop.removeEventListener("change", syncMode);
      motion.removeEventListener("change", syncMode);
      stop();
    };
  }, [shift, inner]);

  return (
    <div ref={layerRef} className={cn("hero-parallax-layer", className)}>
      <div className="overflow-hidden">
        <div ref={mediaRef} className="hero-parallax-media origin-center">
          {children}
        </div>
      </div>
    </div>
  );
}
