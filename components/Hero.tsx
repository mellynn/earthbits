"use client";

import type { ReactNode } from "react";
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
  aspect,
  sizes,
  className,
  children,
}: {
  slot: MediaSlot;
  name: "left-image" | "middle-image" | "hero-auto-video";
  aspect: NonNullable<MediaSlot["aspect"]>;
  sizes: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div data-hero-slot={name} className={className}>
      {children}
      <MediaFrame slot={{ ...slot, aspect }} sizes={sizes} />
    </div>
  );
}

/**
 * One responsive tree. CSS switches mobile stack vs desktop collage —
 * no matchMedia remount, so wide viewports do not CLS from Mobile→Desktop.
 *
 * Desktop parallax is text-only (title + role vs the framed scene).
 */
export function Hero({ name, role, frames }: HeroProps) {
  return (
    <section data-hero-parallax className="relative">
      <div
        className="hero-grid pointer-events-none absolute inset-x-0 top-0 mx-auto h-full max-w-6xl"
        aria-hidden="true"
      />
      <HeroParallaxScene className="relative mx-auto flex max-w-6xl flex-col overflow-x-clip px-6 pb-16 pt-12 md:grid md:min-h-[38rem] md:grid-cols-12 md:items-start md:gap-x-8 md:gap-y-6 md:overflow-visible md:px-10 md:pb-20 md:pt-10">
        <ParallaxLayer
          layer="hero-block"
          rate={HERO_PARALLAX.block}
          className="relative z-20 text-center md:col-span-6 md:col-start-4 md:row-start-1 md:pt-8"
        >
          <StarMark className="hero-desktop-only absolute left-0 top-6 h-4 w-4" />
          <h1 className="font-display text-[3.15rem] font-light leading-[0.9] tracking-tight text-paper md:text-[clamp(3.25rem,5.6vw,6.25rem)]">
            {name}
          </h1>
          <RoleLine role={role} className="mt-5 md:mx-auto md:mt-6 md:max-w-[16rem]" />
        </ParallaxLayer>

        {frames[0] ? (
          <HeroCard
            name="left-image"
            slot={frames[0]}
            aspect="portrait"
            sizes="(min-width: 768px) 220px, 345px"
            className="mx-auto mt-10 w-full max-w-[17.5rem] md:col-span-3 md:col-start-1 md:row-span-2 md:row-start-1 md:mx-0 md:mt-24 md:max-w-[13.75rem]"
          />
        ) : null}

        <div className="-mt-20 flex items-end justify-between gap-3 px-1 md:col-span-12 md:mt-0 md:contents">
          <div className="mb-3 flex items-center gap-3 md:col-span-3 md:col-start-1 md:row-start-3 md:mb-0 md:self-end">
            <StarMark className="hero-desktop-only h-3.5 w-3.5" />
            <FloraLink />
          </div>
          {frames[2] ? (
            <HeroCard
              name="middle-image"
              slot={frames[2]}
              aspect="square"
              sizes="(min-width: 768px) 176px, 150px"
              className="relative w-[150px] shrink-0 md:col-span-3 md:col-start-6 md:row-start-2 md:mt-2 md:w-full md:max-w-[11rem] md:justify-self-center"
            >
              <RaysMark className="absolute -top-7 right-2 h-7 w-7 md:-top-9 md:left-0 md:right-auto md:h-8 md:w-8" />
            </HeroCard>
          ) : null}
        </div>

        {frames[1] ? (
          <HeroCard
            name="hero-auto-video"
            slot={frames[1]}
            aspect="portrait"
            sizes="(min-width: 768px) 256px, 245px"
            className="mt-6 w-[245px] max-w-full md:col-span-3 md:col-start-10 md:row-span-2 md:row-start-1 md:mt-0 md:w-full md:max-w-[16rem] md:justify-self-end"
          />
        ) : null}

        <Tagline className="mt-8 self-end text-right md:col-span-3 md:col-start-10 md:row-start-3 md:mt-0 md:self-end" />
      </HeroParallaxScene>
    </section>
  );
}
