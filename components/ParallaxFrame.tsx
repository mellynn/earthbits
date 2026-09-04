"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  heroParallaxTransform,
  type ParallaxRate,
} from "@/lib/hero-parallax";
import { DESKTOP_MQ, REDUCE_MOTION_MQ } from "@/lib/match-media";

type HeroParallaxSceneProps = {
  children: ReactNode;
  className?: string;
};

/**
 * One scroll listener for every [data-hero-layer] child. Desktop + motion
 * only — matches earthbits.xyz (mobile and reduced-motion are no-ops).
 * Title/role and framed cards use opposite rates (text DOWN, cards UP).
 */
export function HeroParallaxScene({
  children,
  className,
}: HeroParallaxSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const desktop = window.matchMedia(DESKTOP_MQ);
    const motion = window.matchMedia(REDUCE_MOTION_MQ);
    let frame = 0;
    let listening = false;

    const layers = () =>
      scene.querySelectorAll<HTMLElement>("[data-hero-layer]");

    const reset = () => {
      layers().forEach((el) => {
        el.style.transform = "none";
      });
    };

    const update = () => {
      if (!desktop.matches || motion.matches) {
        reset();
        return;
      }

      const scrollY = Math.max(0, window.scrollY);
      layers().forEach((el) => {
        el.style.transform = heroParallaxTransform(scrollY, {
          y: Number(el.dataset.yRate),
          z: Number(el.dataset.zRate),
        });
      });
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
      reset();
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
  }, []);

  return (
    <div ref={sceneRef} className={cn("hero-parallax-scene", className)}>
      {children}
    </div>
  );
}

type ParallaxLayerProps = {
  layer: string;
  rate: ParallaxRate;
  children: ReactNode;
  className?: string;
};

export function ParallaxLayer({
  layer,
  rate,
  children,
  className,
}: ParallaxLayerProps) {
  return (
    <div
      data-hero-layer={layer}
      data-y-rate={rate.y}
      data-z-rate={rate.z}
      className={cn("hero-parallax-layer", className)}
    >
      {children}
    </div>
  );
}
