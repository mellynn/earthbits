import type { Metadata } from "next";
import { AboutCopy, ExhibitsList } from "@/components/AboutCopy";
import { ContactForm } from "@/components/ContactForm";
import { MediaFrame } from "@/components/MediaFrame";
import { PillLink } from "@/components/PillLink";
import { getSite } from "@/lib/content";

const site = getSite();

export const metadata: Metadata = {
  title: "About",
  description: site.about[0],
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:px-10">
      <header className="text-center">
        <p className="text-[11px] uppercase tracking-[0.24em] text-accent">{site.role}</p>
        <h1 className="mt-4 font-display text-6xl font-light tracking-tight md:text-7xl">
          About
        </h1>
      </header>

      <AboutCopy className="mx-auto mt-12 max-w-2xl" />

      <div className="mt-20">
        <ExhibitsList />
      </div>

      <div className="mt-16 grid grid-cols-3 gap-3 md:gap-5">
        <MediaFrame slot={{ alt: "Floral study", motif: "vase-study", seed: 201 }} />
        <MediaFrame slot={{ alt: "Portrait study", motif: "glitch-portrait", seed: 202 }} />
        <MediaFrame slot={{ alt: "Gallery study", motif: "studio-wall", seed: 203 }} />
      </div>

      <section id="contact" className="mt-24 scroll-mt-24 text-center">
        <h2 className="font-display text-5xl font-light">Get in touch</h2>
        <p className="mt-4 text-sm text-muted">
          <a href={`mailto:${site.email}`} className="text-paper hover:text-accent">
            {site.email}
          </a>
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <PillLink href={site.socials.instagram.url} external>
            Instagram
          </PillLink>
          <PillLink href={site.socials.twitter.url} external>
            Twitter
          </PillLink>
        </div>
        <div className="mt-12 text-left">
          <ContactForm email={site.email} />
        </div>
      </section>
    </main>
  );
}
