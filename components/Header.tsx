"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { getSite } from "@/lib/content";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const site = getSite();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="text-[11px] font-medium uppercase tracking-[0.28em] text-paper"
        >
          {site.brand}
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = isActive(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[11px] uppercase tracking-[0.22em] transition-colors",
                  active ? "text-paper" : "text-muted hover:text-paper",
                )}
              >
                <span
                  className={cn(
                    "pb-1",
                    active && "border-b border-accent",
                  )}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="text-[11px] uppercase tracking-[0.22em] text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-4 border-t border-line px-6 py-5 md:hidden"
          aria-label="Mobile"
        >
          {links.map((link) => {
            const active = isActive(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm uppercase tracking-[0.2em]",
                  active ? "text-accent" : "text-paper",
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
