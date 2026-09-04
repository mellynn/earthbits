import Link from "next/link";
import { ArcMark, ArrowMark, RaysMark, StarMark } from "@/components/Marks";
import { MediaFrame } from "@/components/MediaFrame";
import { getSite, getWork } from "@/lib/content";

export function Hero() {
  const site = getSite();
  const flora = getWork("flora-in-frequency");
  const frames = flora?.hero ?? [];

  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:px-10 md:pt-20">
        <div className="md:hidden">
          <div className="text-center">
            <h1 className="font-display text-6xl font-light tracking-tight text-paper">
              {site.name}
            </h1>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
              {site.role}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {frames.map((slot) => (
              <MediaFrame key={slot.alt} slot={{ ...slot, aspect: "square" }} />
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[34rem] md:block">
          <div className="absolute left-0 top-6 w-[22%]">
            {frames[0] ? (
              <MediaFrame slot={{ ...frames[0], aspect: "portrait" }} />
            ) : null}
          </div>
          <div className="absolute right-0 top-0 w-[20%]">
            {frames[1] ? (
              <MediaFrame slot={{ ...frames[1], aspect: "square" }} />
            ) : null}
          </div>
          <StarMark className="absolute left-[28%] top-16 h-4 w-4" />
          <RaysMark className="absolute right-[26%] top-24 h-8 w-8" />
          <ArcMark className="absolute bottom-28 left-[18%] h-6 w-10" />
          <div className="flex min-h-[34rem] flex-col items-center justify-center text-center">
            <h1 className="font-display text-8xl font-light tracking-tight text-paper lg:text-[7.5rem]">
              {site.name}
            </h1>
            <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-muted">
              {site.role}
            </p>
          </div>
          <div className="absolute bottom-8 left-1/2 w-[26%] -translate-x-1/2">
            {frames[2] ? (
              <MediaFrame slot={{ ...frames[2], aspect: "square" }} />
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
          <Link
            href="/work/flora-in-frequency"
            className="inline-flex items-center gap-2 text-[12px] text-paper transition-colors hover:text-accent"
          >
            <ArrowMark className="h-3.5 w-3.5" />
            Flora in Frequency
          </Link>
          <p className="max-w-xs text-sm leading-7 text-muted md:text-right">
            Exploring the intersection of{" "}
            <span className="font-medium text-accent">nature</span> and{" "}
            <span className="font-medium text-accent">technology</span>
          </p>
        </div>
      </div>
    </section>
  );
}
