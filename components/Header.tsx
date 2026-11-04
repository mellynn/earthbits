"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/work", label: "Work" },
];

function scrollToHash(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector("header");
  const headerH =
    header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;
  const gap = id === "about" ? 112 : 8;
  const top = window.scrollY + el.getBoundingClientRect().top - headerH - gap;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function isActive(href: string, pathname: string, hash: string) {
  if (href === "/#home") {
    return pathname === "/" && (hash === "" || hash === "#" || hash === "#home");
  }
  if (href === "/#about") {
    return pathname === "/" && hash === "#about";
  }
  if (href === "/work") {
    return pathname === "/work" || pathname.startsWith("/work/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ brand }: { brand: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    const frame = requestAnimationFrame(() => scrollToHash(id));
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  function onSectionClick(href: string, event: { preventDefault: () => void }) {
    setOpen(false);
    if (pathname !== "/" || !href.startsWith("/#")) return;
    event.preventDefault();
    const id = href.slice(2);
    window.history.pushState(null, "", href);
    setHash(`#${id}`);
    scrollToHash(id);
  }

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/#home"
          className="text-[13px] font-medium uppercase tracking-[0.28em] text-paper"
          onClick={(event) => onSectionClick("/#home", event)}
        >
          {brand}
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = isActive(link.href, pathname, hash);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[12px] font-medium uppercase tracking-[0.22em] transition-colors",
                  active ? "text-accent" : "text-paper hover:text-accent",
                )}
                onClick={(event) => onSectionClick(link.href, event)}
              >
                {link.label}
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
            const active = isActive(link.href, pathname, hash);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm uppercase tracking-[0.2em]",
                  active ? "text-accent" : "text-paper",
                )}
                onClick={(event) => onSectionClick(link.href, event)}
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
