import Link from "next/link";
import { cn } from "@/lib/cn";

export function PillLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full border border-paper/55 px-7 py-2.5 text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-accent hover:text-accent",
    className,
  );
  const isHttp = href.startsWith("http");
  const isMail = href.startsWith("mailto:");

  if (external || isHttp || isMail) {
    return (
      <a
        href={href}
        className={classes}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
