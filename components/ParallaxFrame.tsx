"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

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

/**
 * Frame + inner-media parallax. Progress is based on the hero section's
 * position in the viewport so motion stays visible while the hero is on screen.
 * Honors prefers-reduced-motion (CSS + JS).
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

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      if (motion.matches) {
        layer.style.transform = "none";
        if (media) media.style.transform = "none";
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

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    motion.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motion.removeEventListener("change", update);
      cancelAnimationFrame(frame);
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
