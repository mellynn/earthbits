import { AboutCopy, ExhibitsList } from "@/components/AboutCopy";
import { Hero } from "@/components/Hero";
import { MediaFrame } from "@/components/MediaFrame";
import { PillLink } from "@/components/PillLink";
import { WorkGrid } from "@/components/WorkCard";
import { getSite } from "@/lib/site";
import { getWorks } from "@/lib/content";

export default function Home() {
  const site = getSite();
  const works = getWorks();

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-3xl px-6 py-24 md:px-10">
        <h2 className="text-center font-display text-6xl font-light tracking-tight md:text-7xl">
          About
        </h2>
        <AboutCopy className="mx-auto mt-10 max-w-2xl text-center" />
        <div className="mt-16">
          <ExhibitsList />
        </div>
        <div className="mt-16 grid grid-cols-3 gap-3 md:gap-5">
          <MediaFrame
            slot={{
              alt: "Floral study",
              src: "/works/about/floral.svg",
              placeholder: true,
            }}
          />
          <MediaFrame
            slot={{
              alt: "Portrait study",
              src: "/works/about/portrait.svg",
              placeholder: true,
            }}
          />
          <MediaFrame
            slot={{
              alt: "Gallery study",
              src: "/works/about/gallery.svg",
              placeholder: true,
            }}
          />
        </div>
        <p className="mt-12 text-center text-sm text-muted">
          Check her out on{" "}
          <a
            href={site.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper underline-offset-4 hover:text-accent hover:underline"
          >
            Instagram
          </a>{" "}
          and{" "}
          <a
            href={site.socials.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper underline-offset-4 hover:text-accent hover:underline"
          >
            Twitter
          </a>
        </p>
        <div className="mt-8 text-center">
          <PillLink href="/about#contact">Get in touch</PillLink>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28 md:px-10">
        <header className="mb-14 text-center">
          <h2 className="font-display text-6xl font-light tracking-tight md:text-7xl">
            Work
          </h2>
          <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
            Nature, art, and technology
          </p>
        </header>
        <WorkGrid works={works} />
        <div className="mt-14 text-center">
          <PillLink href="/work">View all</PillLink>
        </div>
      </section>
    </main>
  );
}
