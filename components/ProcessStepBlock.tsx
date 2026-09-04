import { MediaFrame } from "@/components/MediaFrame";
import { cn } from "@/lib/cn";
import type { ProcessStep } from "@/lib/types";

const layoutClass = {
  thirds: "grid gap-4 sm:grid-cols-3",
  pair: "grid gap-4 sm:grid-cols-2",
  wide: "grid gap-4",
};

export function ProcessStepBlock({ step }: { step: ProcessStep }) {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <h3 className="font-display text-3xl font-light text-paper md:text-4xl">
          {step.title}
        </h3>
        {step.body ? <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p> : null}
      </div>
      <div className={cn(layoutClass[step.layout])}>
        {step.media.map((slot, index) => (
          <MediaFrame
            key={`${slot.alt}-${index}`}
            slot={{
              ...slot,
              aspect: slot.aspect ?? (step.layout === "wide" ? "wide" : "square"),
            }}
          />
        ))}
      </div>
    </section>
  );
}
