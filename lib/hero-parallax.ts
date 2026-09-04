/** Live earthbits.xyz rates: translate3d(0, y * scrollY, z * scrollY). */
export type ParallaxRate = { y: number; z: number };

/**
 * Measured on www.earthbits.xyz at scrollY ≈ 100
 * (will-change + preserve-3d, perspective 1000px).
 */
export const HERO_PARALLAX = {
  block: { y: 0.124, z: 0.089 },
  left: { y: -0.053, z: 0.053 },
  middle: { y: -0.089, z: 0.053 },
  video: { y: -0.089, z: 0.089 },
} as const satisfies Record<string, ParallaxRate>;

export function heroParallaxTransform(scrollY: number, rate: ParallaxRate) {
  const y = scrollY * rate.y;
  const z = scrollY * rate.z;
  return `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px)`;
}
