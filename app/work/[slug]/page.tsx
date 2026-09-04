import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProcessStepBlock } from "@/components/ProcessStepBlock";
import { MediaFrame } from "@/components/MediaFrame";
import { VimeoEmbed } from "@/components/VimeoEmbed";
import { WorkGrid } from "@/components/WorkCard";
import { getRelatedWorks, getWork, getWorks } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getWorks().map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Work" };
  return {
    title: work.title,
    description: work.about[0],
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const related = getRelatedWorks(work.slug);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
        <Link href="/work" className="hover:text-accent">
          Work
        </Link>
      </p>
      <h1 className="mt-4 font-display text-5xl font-light tracking-tight text-paper md:text-7xl">
        {work.title}
      </h1>
      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-muted">
        {work.client ? (
          <div>
            <dt className="text-accent">Client</dt>
            <dd className="mt-1 text-paper">{work.client}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-accent">Category</dt>
          <dd className="mt-1 text-paper">{work.categories.join(", ")}</dd>
        </div>
        {work.tools && work.tools.length > 0 ? (
          <div>
            <dt className="text-accent">Tools</dt>
            <dd className="mt-1 text-paper">{work.tools.join(", ")}</dd>
          </div>
        ) : null}
      </dl>

      <section className="mt-16 max-w-2xl">
        <h2 className="font-display text-4xl font-light">About</h2>
        {work.about.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="mt-5 text-[15px] leading-8 text-muted">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-16">
        <VimeoEmbed url={work.vimeoUrl} />
      </section>

      {work.processIntro || (work.process && work.process.length > 0) ? (
        <section className="mt-20 space-y-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-light">Process</h2>
            {work.processIntro ? (
              <p className="mt-5 text-[15px] leading-8 text-muted">{work.processIntro}</p>
            ) : null}
          </div>
          {work.process?.map((step) => (
            <ProcessStepBlock key={step.title} step={step} />
          ))}
        </section>
      ) : null}

      {work.final ? (
        <section className="mt-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-light">{work.final.title}</h2>
            {work.final.body ? (
              <p className="mt-5 text-[15px] leading-8 text-muted">{work.final.body}</p>
            ) : null}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {work.final.media.map((slot, index) => (
              <MediaFrame key={`${slot.alt}-${index}`} slot={slot} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-24">
        <h2 className="mb-10 font-display text-4xl font-light">Work</h2>
        <WorkGrid works={related} />
      </section>
    </main>
  );
}
