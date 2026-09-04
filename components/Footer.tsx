import { getSite } from "@/lib/content";

export function Footer() {
  const site = getSite();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-[11px] uppercase tracking-[0.18em] text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © {year} {site.name}
        </p>
        <div className="flex flex-wrap gap-6">
          <a
            href={site.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper transition-colors hover:text-accent"
          >
            Instagram
          </a>
          <a
            href={site.socials.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper transition-colors hover:text-accent"
          >
            Twitter
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-paper transition-colors hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
