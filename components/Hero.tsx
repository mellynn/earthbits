import Link from "next/link";
import { ArcMark, ArrowMark, RaysMark, StarMark } from "@/components/Marks";
import { MediaFrame } from "@/components/MediaFrame";
import { ParallaxFrame } from "@/components/ParallaxFrame";
import { cn } from "@/lib/cn";
import { getSite } from "@/lib/site";
import { getWork } from "@/lib/content";
import type { MediaSlot } from "@/lib/types";

/** Signed px travel — large enough that frames obviously drift apart on scroll. */
const parallax = {
  left: { shift: 130, inner: -60 },
  right: { shift: -150, inner: 70 },
  center: { shift: 80, inner: -42 },
} as const;

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

function Tagline({ className }: { className?: string }) {
  return (
    <p className={cn("max-w-xs text-sm leading-7 text-muted", className)}>
      Exploring the intersection of{" "}
      <span className="font-medium text-accent">nature</span> and{" "}
      <span className="font-medium text-accent">technology</span>
    </p>
  );
}

function Frame({
  slot,
  aspect,
  motion,
}: {
  slot: MediaSlot;
  aspect: "portrait" | "square";
  motion: (typeof parallax)[keyof typeof parallax];
}) {
  return (
    <ParallaxFrame shift={motion.shift} inner={motion.inner}>
      <MediaFrame slot={{ ...slot, aspect }} />
    </ParallaxFrame>
  );
}

export function Hero() {
  const site = getSite();
  const flora = getWork("flora-in-frequency");
  const frames = flora?.hero ?? [];

  return (
    <section
      data-hero-parallax
      className="relative overflow-x-clip"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 md:px-10 md:pb-28 md:pt-20">
        {/* Mobile: stacked portraits like earthbits.xyz, not a 3-up thumbnail row. */}
        <div className="md:hidden">
          <div className="text-center">
            <h1 className="font-display text-[3.15rem] font-light leading-[0.9] tracking-tight text-paper">
              {site.name}
            </h1>
            <p className="mt-5 text-[15px] leading-snug text-muted">
              {site.role}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-7">
            {frames[0] ? (
              <div className="w-full">
                <Frame slot={frames[0]} aspect="portrait" motion={parallax.left} />
              </div>
            ) : null}

            <FloraLink />

            {frames[2] ? (
              <div className="w-[82%] self-end">
                <Frame slot={frames[2]} aspect="portrait" motion={parallax.center} />
              </div>
            ) : null}

            {frames[1] ? (
              <div className="w-[90%] self-start">
                <Frame slot={frames[1]} aspect="portrait" motion={parallax.right} />
              </div>
            ) : null}

            <Tagline className="self-center text-center" />
          </div>
        </div>

        {/* Desktop: staggered trio with stronger opposing parallax. */}
        <div className="relative hidden md:block">
          <div className="grid grid-cols-12 items-start gap-6">
            <div className="col-span-3 pt-24">
              {frames[0] ? (
                <Frame slot={frames[0]} aspect="portrait" motion={parallax.left} />
              ) : null}
            </div>
            <div className="relative col-span-6 flex flex-col items-center px-2 pt-10 text-center">
              <StarMark className="absolute left-2 top-2 h-4 w-4" />
              <RaysMark className="absolute right-4 top-0 h-8 w-8" />
              <h1 className="font-display text-7xl font-light tracking-tight text-paper lg:text-[7.25rem]">
                {site.name}
              </h1>
              <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-muted">
                {site.role}
              </p>
            </div>
            <div className="col-span-3 pt-2">
              {frames[1] ? (
                <Frame slot={frames[1]} aspect="portrait" motion={parallax.right} />
              ) : null}
            </div>
            <div className="relative col-span-4 col-start-5 mt-2">
              <ArcMark className="absolute -left-16 top-6 h-6 w-10" />
              {frames[2] ? (
                <Frame slot={frames[2]} aspect="square" motion={parallax.center} />
              ) : null}
            </div>
          </div>

          <div className="mt-16 flex items-end justify-between">
            <FloraLink />
            <Tagline className="text-right" />
          </div>
        </div>
      </div>
    </section>
  );
}
