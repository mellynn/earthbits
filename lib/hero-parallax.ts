/** Live earthbits.xyz rates: translate3d(0, y * scrollY, z * scrollY). */
export type ParallaxRate = { y: number; z: number };

/**
 * Text-vs-background only. Measured on www.earthbits.xyz at scrollY ≈ 100
 * for `.hero-block` (title + role). Frames stay with the background —
 * Mel’s follow-up: the effect is the type lagging/leading the scene,
 * not the cards drifting.
 *
 * Desktop + motion only (will-change + preserve-3d, perspective 1000px).
 */
export const HERO_PARALLAX = {
  block: { y: 0.124, z: 0.089 },
} as const satisfies Record<string, ParallaxRate>;

export function heroParallaxTransform(scrollY: number, rate: ParallaxRate) {
  const y = scrollY * rate.y;
  const z = scrollY * rate.z;
  return `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px)`;
}
