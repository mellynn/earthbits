import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import type { Work } from "@/lib/types";

export function WorkCard({ work }: { work: Work }) {
  return (
    <article>
      <Link href={`/work/${work.slug}`} className="group block">
        <div className="overflow-hidden">
          <MediaFrame
            slot={{ ...work.cover, aspect: work.cover.aspect ?? "square" }}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <h3 className="font-display text-3xl font-light tracking-tight text-paper group-hover:text-accent">
            {work.title}
          </h3>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {work.categories.join(" · ")}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function WorkGrid({ works }: { works: Work[] }) {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
      {works.map((work) => (
        <WorkCard key={work.slug} work={work} />
      ))}
    </div>
  );
}
