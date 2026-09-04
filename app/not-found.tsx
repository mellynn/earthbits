import Link from "next/link";
import { PillLink } from "@/components/PillLink";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-accent">404</p>
      <h1 className="mt-4 font-display text-6xl font-light">Page not found</h1>
      <p className="mt-6 text-sm leading-7 text-muted">
        That path does not exist. Return home or browse the work.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <PillLink href="/">Home</PillLink>
        <Link
          href="/work"
          className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] text-muted hover:text-accent"
        >
          Work
        </Link>
      </div>
    </main>
  );
}
