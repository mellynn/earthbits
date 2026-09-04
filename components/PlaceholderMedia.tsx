import { cn } from "@/lib/cn";
import type { MediaAspect, PlaceholderMotif } from "@/lib/types";

const aspectClass: Record<MediaAspect, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
};

function hash(seed: number, salt: number) {
  return ((seed * 47 + salt * 13) % 100) / 100;
}

function Motif({ motif, seed }: { motif: PlaceholderMotif; seed: number }) {
  switch (motif) {
    case "point-cloud":
      return <PointCloud seed={seed} />;
    case "pixel-field":
      return <PixelField seed={seed} />;
    case "lidar-land":
      return <LidarLand seed={seed} />;
    case "vase-study":
      return <VaseStudy seed={seed} />;
    case "scan-portrait":
      return <ScanPortrait seed={seed} />;
    case "glass-bloom":
      return <GlassBloom seed={seed} />;
    case "photogrammetry":
      return <Photogrammetry seed={seed} />;
    case "waveform":
      return <Waveform seed={seed} />;
    case "desk-study":
      return <DeskStudy />;
    case "studio-wall":
      return <StudioWall />;
    case "glitch-portrait":
      return <GlitchPortrait seed={seed} />;
    default:
      return <WireframeBloom seed={seed} />;
  }
}

function WireframeBloom({ seed }: { seed: number }) {
  const rot = hash(seed, 2) * 12 - 6;
  return (
    <g>
      <g
        fill="none"
        stroke="#e8bf96"
        strokeWidth="0.6"
        opacity="0.45"
        transform={`translate(100 108) rotate(${rot})`}
      >
        <rect x="-42" y="-42" width="84" height="84" />
        <path d="M-42 -42 L-28 -58 L56 -58 L42 -42" />
        <path d="M42 -42 L56 -58 L56 26 L42 42" />
      </g>
      <g transform="translate(100 112)" fill="none" stroke="#f3eee8" strokeWidth="1">
        <ellipse cx="0" cy="-8" rx="10" ry="22" transform="rotate(-18)" />
        <ellipse cx="0" cy="-8" rx="10" ry="22" transform="rotate(18)" />
        <ellipse cx="0" cy="-10" rx="9" ry="24" />
        <ellipse cx="0" cy="-6" rx="14" ry="16" transform="rotate(-40)" opacity="0.7" />
        <ellipse cx="0" cy="-6" rx="14" ry="16" transform="rotate(40)" opacity="0.7" />
        <circle cx="0" cy="2" r="5" fill="#e8bf96" stroke="none" opacity="0.85" />
      </g>
    </g>
  );
}

function PointCloud({ seed }: { seed: number }) {
  const dots = Array.from({ length: 90 }, (_, i) => {
    const t = (i / 90) * Math.PI * 2;
    const layer = 18 + (i % 7) * 6 + hash(seed, i) * 8;
    const x = 100 + Math.cos(t) * layer * (0.55 + (i % 5) * 0.08);
    const y = 108 + Math.sin(t) * layer * 0.9 - 8;
    return { x, y, r: 0.7 + (i % 3) * 0.35, o: 0.25 + hash(seed, i + 3) * 0.7 };
  });
  return (
    <g fill="#e8bf96">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} opacity={d.o} />
      ))}
      <circle cx="100" cy="110" r="3.5" fill="#f3eee8" />
    </g>
  );
}

function PixelField({ seed }: { seed: number }) {
  const palette = ["#e8bf96", "#7d9a86", "#6d7fa3", "#c27b6e", "#d7c4a4", "#8a6b84"];
  const cells = [];
  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      const skip = hash(seed, x * 10 + y) < 0.18;
      if (skip) continue;
      cells.push({
        x: 28 + x * 14.4,
        y: 28 + y * 14.4,
        color: palette[(x + y + seed) % palette.length],
        s: 9 + hash(seed, x + y) * 3,
      });
    }
  }
  return (
    <g>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={c.s} height={c.s} fill={c.color} opacity="0.88" />
      ))}
    </g>
  );
}

function LidarLand({ seed }: { seed: number }) {
  const shift = hash(seed, 4) * 16 - 8;
  return (
    <g fill="none" stroke="#e8bf96">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M12 ${48 + i * 18} C 50 ${28 + i * 14 + shift}, 90 ${70 + i * 10 - shift}, 188 ${40 + i * 16}`}
          strokeWidth={i === 2 ? 1.4 : 0.7}
          opacity={0.25 + i * 0.1}
        />
      ))}
      {Array.from({ length: 40 }, (_, i) => (
        <circle
          key={i}
          cx={20 + (i * 17) % 160}
          cy={50 + ((i * 29 + seed) % 110)}
          r="0.8"
          fill="#e8bf96"
          stroke="none"
          opacity="0.55"
        />
      ))}
    </g>
  );
}

function VaseStudy({ seed }: { seed: number }) {
  const lean = hash(seed, 1) * 10 - 5;
  return (
    <g
      fill="none"
      stroke="#e8bf96"
      strokeWidth="1.1"
      transform={`translate(100 118) rotate(${lean})`}
    >
      <path d="M-16 22 C-18 44, 18 44, 16 22 L10 -6 L-10 -6 Z" />
      <path d="M0 -6 V-38" />
      <ellipse cx="0" cy="-48" rx="7" ry="16" transform="rotate(-22)" />
      <ellipse cx="0" cy="-48" rx="7" ry="16" transform="rotate(22)" />
      <ellipse cx="0" cy="-50" rx="6" ry="18" />
      <circle cx="0" cy="-40" r="3.2" fill="#e8bf96" stroke="none" />
    </g>
  );
}

function ScanPortrait({ seed }: { seed: number }) {
  return (
    <g>
      {Array.from({ length: 18 }, (_, i) => (
        <rect
          key={i}
          x="24"
          y={22 + i * 8.8}
          width="152"
          height="1"
          fill="#e8bf96"
          opacity={0.08 + (i % 4) * 0.05}
        />
      ))}
      <g
        fill="none"
        stroke="#f3eee8"
        strokeWidth="1.1"
        transform={`translate(${6 + hash(seed, 5) * 8} 8)`}
      >
        <path d="M100 46 C118 52, 128 78, 116 108 C108 128, 92 128, 84 108 C72 78, 82 52, 100 46 Z" />
        <path d="M100 108 C100 132, 108 150, 100 168" />
      </g>
    </g>
  );
}

function GlassBloom({ seed }: { seed: number }) {
  const a = 20 + hash(seed, 2) * 20;
  return (
    <g>
      <ellipse cx="92" cy="96" rx="46" ry="58" fill="#6d7fa3" opacity="0.35" />
      <ellipse cx="118" cy="108" rx="40" ry="50" fill="#c27b6e" opacity="0.28" />
      <ellipse cx="100" cy="88" rx="32" ry="42" fill="#e8bf96" opacity="0.45" />
      <ellipse
        cx="100"
        cy="100"
        rx="18"
        ry="34"
        fill="none"
        stroke="#f3eee8"
        strokeWidth="0.8"
        transform={`rotate(${a} 100 100)`}
      />
    </g>
  );
}

function Photogrammetry({ seed }: { seed: number }) {
  return (
    <g>
      <rect x="18" y="22" width="164" height="156" fill="none" stroke="#e8bf96" strokeWidth="0.6" opacity="0.4" />
      <path d="M18 38 H182" stroke="#e8bf96" strokeWidth="0.5" opacity="0.35" />
      <circle cx="26" cy="30" r="2" fill="#c27b6e" />
      <circle cx="34" cy="30" r="2" fill="#e8bf96" />
      <circle cx="42" cy="30" r="2" fill="#7d9a86" />
      <PointCloud seed={seed + 3} />
    </g>
  );
}

function Waveform({ seed }: { seed: number }) {
  const bars = Array.from({ length: 36 }, (_, i) => {
    const h = 12 + hash(seed, i) * 70;
    return { x: 22 + i * 4.4, h };
  });
  return (
    <g fill="#e8bf96">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={100 - b.h / 2} width="2.2" height={b.h} opacity="0.75" />
      ))}
      <path
        d="M20 100 C 50 70, 80 130, 110 100 S 170 70, 184 100"
        fill="none"
        stroke="#f3eee8"
        strokeWidth="0.8"
        opacity="0.55"
      />
    </g>
  );
}

function DeskStudy() {
  return (
    <g fill="none" stroke="#e8bf96" strokeWidth="1">
      <rect x="48" y="58" width="104" height="64" />
      <rect x="58" y="68" width="84" height="44" opacity="0.5" />
      <path d="M40 136 H160" />
      <path d="M70 136 V152 M130 136 V152" />
      <path d="M150 118 C154 108, 166 108, 164 122" />
      <circle cx="164" cy="102" r="7" />
    </g>
  );
}

function StudioWall() {
  return (
    <g fill="none" stroke="#e8bf96" strokeWidth="0.9">
      <rect x="28" y="48" width="52" height="64" />
      <rect x="92" y="40" width="40" height="40" />
      <rect x="92" y="90" width="80" height="48" />
    </g>
  );
}

function GlitchPortrait({ seed }: { seed: number }) {
  const off = 4 + hash(seed, 8) * 6;
  return (
    <g>
      <g transform={`translate(${-off} 0)`} opacity="0.45" stroke="#6d7fa3" fill="none" strokeWidth="1.1">
        <circle cx="100" cy="78" r="28" />
        <path d="M78 118 C78 148, 122 148, 122 118" />
      </g>
      <g transform={`translate(${off} 2)`} opacity="0.8" stroke="#e8bf96" fill="none" strokeWidth="1.1">
        <circle cx="100" cy="78" r="28" />
        <path d="M78 118 C78 148, 122 148, 122 118" />
      </g>
    </g>
  );
}

export function PlaceholderMedia({
  motif = "wireframe-bloom",
  seed = 1,
  alt,
  aspect = "square",
  className,
}: {
  motif?: PlaceholderMotif;
  seed?: number;
  alt: string;
  aspect?: MediaAspect;
  className?: string;
}) {
  return (
    <figure
      aria-label={`${alt} (placeholder)`}
      className={cn("relative overflow-hidden bg-[#262323]", aspectClass[aspect], className)}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width="200" height="200" fill="#262323" />
        <Motif motif={motif} seed={seed} />
      </svg>
      <figcaption className="pointer-events-none absolute left-3 top-3 text-[10px] uppercase tracking-[0.22em] text-accent/80">
        Placeholder
      </figcaption>
    </figure>
  );
}
