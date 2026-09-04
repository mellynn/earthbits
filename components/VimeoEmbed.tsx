"use client";

import { useEffect, useRef, useState } from "react";
import { parseVimeo, vimeoEmbedSrc } from "@/lib/vimeo";

type VimeoEmbedProps = {
  url?: string;
  /** Work title for the iframe; falls back to a generic label. */
  title?: string;
};

/** Renders a Vimeo player once it nears the viewport, or nothing when invalid. */
export function VimeoEmbed({ url, title }: VimeoEmbedProps) {
  const parsed = parseVimeo(url);
  const boxRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || !parsed || inView) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { rootMargin: "240px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [parsed, inView]);

  if (!parsed) return null;

  return (
    <div ref={boxRef} className="aspect-video overflow-hidden bg-[#262323]">
      {inView ? (
        <iframe
          src={vimeoEmbedSrc(parsed)}
          title={title?.trim() ? `${title.trim()} video` : "Project video"}
          className="h-full w-full"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : null}
    </div>
  );
}
