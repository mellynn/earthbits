import { getSite } from "@/lib/content";

export function AboutCopy({ className }: { className?: string }) {
  const site = getSite();

  return (
    <div className={className}>
      {site.about.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="mt-6 text-[15px] leading-8 text-muted first:mt-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function ExhibitsList() {
  const site = getSite();

  return (
    <div>
      <h3 className="text-center text-[11px] uppercase tracking-[0.22em] text-accent">
        Exhibits & Appearances
      </h3>
      <ul className="mx-auto mt-6 max-w-lg space-y-3 text-center text-sm leading-7 text-muted">
        {site.exhibits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
