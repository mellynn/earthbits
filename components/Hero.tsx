"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowMark, RaysMark, StarMark } from "@/components/Marks";
import { MediaFrame } from "@/components/MediaFrame";
import { HeroParallaxScene, ParallaxLayer } from "@/components/ParallaxFrame";
import { cn } from "@/lib/cn";
import { HERO_PARALLAX } from "@/lib/hero-parallax";
import { getSite } from "@/lib/site";
import { getWork } from "@/lib/content";
import {
  DESKTOP_MQ,
  matchesMedia,
  subscribeMatchMedia,
} from "@/lib/match-media";
import type { MediaSlot } from "@/lib/types";

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

function RoleLine({ className }: { className?: string }) {
  const site = getSite();
  const parts = site.role.split(/(artist)/i);
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

function MobileHero({
  site,
  frames,
}: {
  site: { name: string };
  frames: MediaSlot[];
}) {
  return (
    <div className="overflow-x-clip">
      <div className="text-center">
        <h1 className="font-display text-[3.15rem] font-light leading-[0.9] tracking-tight text-paper">
          {site.name}
        </h1>
        <RoleLine className="mt-5" />
      </div>

      <div className="mt-10 flex flex-col">
        {frames[0] ? (
          <div className="mx-auto h-[400px] w-full max-w-[345px]">
            <MediaFrame
              slot={{ ...frames[0], aspect: "portrait" }}
              fill
              sizes="345px"
            />
          </div>
        ) : null}

        <div className="-mt-20 flex items-end justify-between gap-3 px-1">
          <FloraLink className="mb-3 shrink" />
          {frames[2] ? (
            <div className="relative h-[192px] w-[150px] shrink-0">
              <RaysMark className="absolute -top-7 right-2 h-7 w-7" />
              <MediaFrame
                slot={{ ...frames[2], aspect: "square" }}
                fill
                sizes="150px"
              />
            </div>
          ) : null}
        </div>

        {frames[1] ? (
          <div className="mt-6 h-[342px] w-[245px] max-w-full">
            <MediaFrame
              slot={{ ...frames[1], aspect: "portrait" }}
              fill
              sizes="245px"
            />
          </div>
        ) : null}

        <Tagline className="mt-8 self-end text-right" />
      </div>
    </div>
  );
}

function DesktopHero({
  site,
  frames,
}: {
  site: { name: string };
  frames: MediaSlot[];
}) {
  return (
    <HeroParallaxScene className="relative min-h-[min(72vw,52rem)]">
      <ParallaxLayer
        layer="hero-block"
        rate={HERO_PARALLAX.block}
        className="relative z-20 mx-auto w-[min(44.79vw,40rem)] pt-[8vw] text-center"
      >
        <StarMark className="absolute left-0 top-8 h-4 w-4" />
        <h1 className="font-display text-[clamp(3.75rem,8vw,8.5rem)] font-light leading-[0.9] tracking-tight text-paper">
          {site.name}
        </h1>
        <RoleLine className="mx-auto mt-8 max-w-[17.4vw]" />
      </ParallaxLayer>

      {frames[0] ? (
        <ParallaxLayer
          layer="left-image"
          rate={HERO_PARALLAX.left}
          className="absolute left-[2vw] top-[18vw] z-10 h-[23.48vw] w-[15.625vw]"
        >
          <MediaFrame
            slot={{ ...frames[0], aspect: "portrait" }}
            fill
            sizes="16vw"
          />
        </ParallaxLayer>
      ) : null}

      {frames[2] ? (
        <ParallaxLayer
          layer="middle-image"
          rate={HERO_PARALLAX.middle}
          className="absolute left-1/2 top-[38vw] z-10 ml-[-6.51vw] h-[16.66vw] w-[13.02vw]"
        >
          <RaysMark className="absolute -top-9 left-0 h-8 w-8" />
          <MediaFrame
            slot={{ ...frames[2], aspect: "square" }}
            fill
            sizes="13vw"
          />
        </ParallaxLayer>
      ) : null}

      {frames[1] ? (
        <ParallaxLayer
          layer="hero-auto-video"
          rate={HERO_PARALLAX.video}
          className="absolute right-[2vw] top-[6vw] z-[15] h-[29.06vw] w-[20.78vw]"
        >
          <MediaFrame
            slot={{ ...frames[1], aspect: "portrait" }}
            fill
            sizes="21vw"
          />
        </ParallaxLayer>
      ) : null}

      <div className="absolute bottom-[3vw] left-[2vw] z-30 flex items-center gap-3">
        <StarMark className="h-3.5 w-3.5" />
        <FloraLink />
      </div>
      <Tagline className="absolute bottom-[4vw] right-[2vw] z-30 text-right" />
    </HeroParallaxScene>
  );
}

export function Hero() {
  const site = getSite();
  const flora = getWork("flora-in-frequency");
  const frames = flora?.hero ?? [];
  const isDesktop = useSyncExternalStore(
    subscribeMatchMedia(DESKTOP_MQ),
    () => matchesMedia(DESKTOP_MQ),
    () => false,
  );

  return (
    <section data-hero-parallax className="relative">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className={cn(
          "relative px-6 pb-16 pt-12",
          isDesktop ? "px-[4vw] pb-[8vw] pt-6" : "overflow-x-clip",
        )}
      >
        {isDesktop ? (
          <DesktopHero site={site} frames={frames} />
        ) : (
          <MobileHero site={site} frames={frames} />
        )}
      </div>
    </section>
  );
}
