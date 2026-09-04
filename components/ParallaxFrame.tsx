"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ParallaxFrameProps = {
  /** Multiply `window.scrollY` by this factor. Keep small (about 0.04–0.16). */
  factor: number;
  children: ReactNode;
  className?: string;
};

/** Subtle translateY parallax. No-ops when prefers-reduced-motion is set. */
export function ParallaxFrame({
  factor,
  children,
  className,
}: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      if (motion.matches) {
        el.style.transform = "none";
        return;
      }
      el.style.transform = `translate3d(0, ${window.scrollY * factor}px, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    motion.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      motion.removeEventListener("change", update);
      cancelAnimationFrame(frame);
    };
  }, [factor]);

  return (
    <div ref={ref} className={cn("hero-parallax", className)}>
      {children}
    </div>
  );
}
