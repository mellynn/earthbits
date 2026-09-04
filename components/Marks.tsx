import { cn } from "@/lib/cn";

export function StarMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("fill-accent", className)}
    >
      <path d="M12 1.5 L13.2 10.8 L22.5 12 L13.2 13.2 L12 22.5 L10.8 13.2 L1.5 12 L10.8 10.8 Z" />
    </svg>
  );
}

export function RaysMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("stroke-accent", className)}
      fill="none"
      strokeWidth="1.4"
    >
      <path d="M4 20 L12 4" />
      <path d="M12 20 L16 4" />
      <path d="M18 20 L20 8" />
    </svg>
  );
}

export function ArcMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 18"
      aria-hidden="true"
      className={cn("stroke-accent", className)}
      fill="none"
      strokeWidth="1.3"
    >
      <path d="M2 16 C 8 2, 24 2, 30 16" />
    </svg>
  );
}

export function ArrowMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("stroke-accent", className)}
      fill="none"
      strokeWidth="1.3"
    >
      <path d="M3 13 L13 3" />
      <path d="M6 3 H13 V10" />
    </svg>
  );
}
