import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkCard";
import { getWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected works exploring nature, art, and technology.",
};

export default function WorkIndexPage() {
  const works = getWorks();

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <header className="mb-16 text-center">
        <h1 className="font-display text-6xl font-light tracking-tight md:text-7xl">
          Work
        </h1>
        <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
          Nature, art, and technology
        </p>
      </header>
      <WorkGrid works={works} />
    </main>
  );
}
