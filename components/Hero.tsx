"use client";

import Link from "next/link";
import { ArrowMark, RaysMark, StarMark } from "@/components/Marks";
import { MediaFrame } from "@/components/MediaFrame";
import { HeroParallaxScene, ParallaxLayer } from "@/components/ParallaxFrame";
import { cn } from "@/lib/cn";
import { HERO_PARALLAX } from "@/lib/hero-parallax";
import type { MediaSlot } from "@/lib/types";

export type HeroProps = {
  name: string;
  role: string;
  frames: MediaSlot[];
};

function FloraLink({ className }: { className?: string }) {
  return (
    <Link
      href="/work/flora-in-frequency"
      className={cn(
        "inline-flex items-center gap-2 text-[12px] text-paper transition-colors hover:text-accent",
        className,
      )}
    >
      <ArrowMark className="h-3.5 w-3.5" />
      Flora in Frequency
    </Link>
  );
}

function RoleLine({ role, className }: { role: string; className?: string }) {
  const parts = role.split(/(artist)/i);
  return (
    <p className={cn("text-[15px] leading-snug text-paper", className)}>
      {parts.map((part, index) =>
        /artist/i.test(part) ? (
          <em key={`${part}-${index}`} className="font-display text-accent">
            {part}
          </em>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </p>
  );
}

function Tagline({ className }: { className?: string }) {
  return (
    <p className={cn("max-w-xs text-sm leading-7 text-muted", className)}>
      Exploring the intersection of{" "}
      <span className="font-medium text-paper">nature</span> and{" "}
      <span className="font-medium text-paper">technology</span>
    </p>
  );
}

/**
 * One responsive tree. CSS switches mobile stack vs desktop collage —
 * no matchMedia remount, so wide viewports do not CLS from Mobile→Desktop.
 */
export function Hero({ name, role, frames }: HeroProps) {
  return (
    <section data-hero-parallax className="relative">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <HeroParallaxScene className="relative flex flex-col overflow-x-clip px-6 pb-16 pt-12 md:block md:min-h-[min(72vw,52rem)] md:overflow-visible md:px-[4vw] md:pb-[8vw] md:pt-6">
        <ParallaxLayer
          layer="hero-block"
          rate={HERO_PARALLAX.block}
          className="relative z-20 text-center md:mx-auto md:w-[min(44.79vw,40rem)] md:pt-[8vw]"
        >
          <StarMark className="hero-desktop-only absolute left-0 top-8 h-4 w-4" />
          <h1 className="font-display text-[3.15rem] font-light leading-[0.9] tracking-tight text-paper md:text-[clamp(3.75rem,8vw,8.5rem)]">
            {name}
          </h1>
          <RoleLine
            role={role}
            className="mt-5 md:mx-auto md:mt-8 md:max-w-[17.4vw]"
          />
        </ParallaxLayer>

        {frames[0] ? (
          <ParallaxLayer
            layer="left-image"
            rate={HERO_PARALLAX.left}
            className="mx-auto mt-10 h-[400px] w-full max-w-[345px] md:absolute md:left-[2vw] md:top-[18vw] md:z-10 md:mt-0 md:h-[23.48vw] md:w-[15.625vw] md:max-w-none"
          >
            <MediaFrame
              slot={{ ...frames[0], aspect: "portrait" }}
              fill
              sizes="(min-width: 768px) 16vw, 345px"
            />
          </ParallaxLayer>
        ) : null}

        <div className="-mt-20 flex items-end justify-between gap-3 px-1 md:contents">
          <div className="mb-3 flex items-center gap-3 md:absolute md:bottom-[3vw] md:left-[2vw] md:z-30 md:mb-0">
            <StarMark className="hero-desktop-only h-3.5 w-3.5" />
            <FloraLink />
          </div>
          {frames[2] ? (
            <ParallaxLayer
              layer="middle-image"
              rate={HERO_PARALLAX.middle}
              className="relative h-[192px] w-[150px] shrink-0 md:absolute md:left-1/2 md:top-[38vw] md:z-10 md:ml-[-6.51vw] md:h-[16.66vw] md:w-[13.02vw]"
            >
              <RaysMark className="absolute -top-7 right-2 h-7 w-7 md:-top-9 md:left-0 md:right-auto md:h-8 md:w-8" />
              <MediaFrame
                slot={{ ...frames[2], aspect: "square" }}
                fill
                sizes="(min-width: 768px) 13vw, 150px"
              />
            </ParallaxLayer>
          ) : null}
        </div>

        {frames[1] ? (
          <ParallaxLayer
            layer="hero-auto-video"
            rate={HERO_PARALLAX.video}
            className="mt-6 h-[342px] w-[245px] max-w-full md:absolute md:right-[2vw] md:top-[6vw] md:z-[15] md:mt-0 md:h-[29.06vw] md:w-[20.78vw] md:max-w-none"
          >
            <MediaFrame
              slot={{ ...frames[1], aspect: "portrait" }}
              fill
              sizes="(min-width: 768px) 21vw, 245px"
            />
          </ParallaxLayer>
        ) : null}

        <Tagline className="mt-8 self-end text-right md:absolute md:bottom-[4vw] md:right-[2vw] md:z-30 md:mt-0" />
      </HeroParallaxScene>
    </section>
  );
}
