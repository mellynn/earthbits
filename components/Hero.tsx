"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowMark, RaysMark, StarMark } from "@/components/Marks";
import { MediaFrame } from "@/components/MediaFrame";
import { HeroParallaxScene, ParallaxLayer } from "@/components/ParallaxFrame";
import { cn } from "@/lib/cn";
import { HERO_PARALLAX, type ParallaxRate } from "@/lib/hero-parallax";
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
    <p className={cn("text-[15px] leading-snug text-paper md:text-[1.15rem]", className)}>
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

function HeroCard({
  slot,
  name,
  rate,
  aspect,
  sizes,
  className,
  children,
}: {
  slot: MediaSlot;
  name: "left-image" | "middle-image" | "hero-auto-video";
  rate: ParallaxRate;
  aspect: NonNullable<MediaSlot["aspect"]>;
  sizes: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ParallaxLayer
      layer={name}
      rate={rate}
      className={className}
    >
      <div data-hero-slot={name} className="relative h-full w-full">
        {children}
        <MediaFrame slot={{ ...slot, aspect }} fill sizes={sizes} />
      </div>
    </ParallaxLayer>
  );
}

/**
 * One responsive tree. CSS switches mobile stack vs desktop collage —
 * no matchMedia remount, so wide viewports do not CLS from Mobile→Desktop.
 *
 * Desktop: `.hero-block` (title + role) vs framed cards, opposite rates.
 * Mobile / reduced-motion: no parallax.
 */
export function Hero({ name, role, frames }: HeroProps) {
  return (
    <section data-hero-parallax className="relative">
      <div
        className="hero-grid pointer-events-none absolute inset-x-0 top-0 mx-auto h-full w-full md:w-[76vw]"
        aria-hidden="true"
      />
      <HeroParallaxScene className="relative mx-auto flex w-full flex-col overflow-x-clip px-6 pb-16 pt-12 md:block md:w-[76vw] md:min-h-[42rem] md:overflow-visible md:px-0 md:pb-28 md:pt-10">
        <ParallaxLayer
          layer="hero-block"
          rate={HERO_PARALLAX.block}
          className="relative z-20 text-center md:mx-auto md:w-[44.79vw] md:pt-8"
        >
          <StarMark className="hero-desktop-only absolute left-0 top-6 h-4 w-4" />
          <h1 className="font-display text-[3.15rem] font-light leading-[0.9] tracking-tight text-paper md:text-[clamp(3.5rem,7.2vw,6.75rem)]">
            {name}
          </h1>
          <RoleLine role={role} className="mt-5 md:mx-auto md:mt-6 md:max-w-[17.4vw]" />
        </ParallaxLayer>

        {frames[0] ? (
          <HeroCard
            name="left-image"
            rate={HERO_PARALLAX.left}
            slot={frames[0]}
            aspect="portrait"
            sizes="(min-width: 768px) 200px, 345px"
            className="mx-auto mt-10 h-[400px] w-full max-w-[345px] md:absolute md:left-0 md:top-[16vw] md:mt-0 md:h-[min(23.48vw,300px)] md:w-[min(15.625vw,200px)] md:max-w-none"
          />
        ) : null}

        <div className="-mt-20 flex items-end justify-between gap-3 px-1 md:contents">
          <div className="mb-3 flex items-center gap-3 md:absolute md:bottom-8 md:left-0 md:z-30 md:mb-0">
            <StarMark className="hero-desktop-only h-3.5 w-3.5" />
            <FloraLink />
          </div>
          {frames[2] ? (
            <HeroCard
              name="middle-image"
              rate={HERO_PARALLAX.middle}
              slot={frames[2]}
              aspect="portrait"
              sizes="(min-width: 768px) 167px, 150px"
              className="relative h-[192px] w-[150px] shrink-0 md:absolute md:left-[calc(50%-min(6.51vw,83.5px))] md:top-[30vw] md:h-[min(16.66vw,213px)] md:w-[min(13.02vw,167px)]"
            >
              <RaysMark className="absolute -top-7 right-2 z-10 h-7 w-7 md:-top-9 md:left-0 md:right-auto md:h-8 md:w-8" />
            </HeroCard>
          ) : null}
        </div>

        {frames[1] ? (
          <HeroCard
            name="hero-auto-video"
            rate={HERO_PARALLAX.video}
            slot={frames[1]}
            aspect="portrait"
            sizes="(min-width: 768px) 266px, 245px"
            className="mt-6 h-[342px] w-[245px] max-w-full md:absolute md:right-0 md:top-[3vw] md:mt-0 md:h-[min(29.06vw,372px)] md:w-[min(20.78vw,266px)] md:max-w-none"
          />
        ) : null}

        <Tagline className="mt-8 self-end text-right md:absolute md:bottom-8 md:right-0 md:z-30 md:mt-0" />
      </HeroParallaxScene>
    </section>
  );
}
