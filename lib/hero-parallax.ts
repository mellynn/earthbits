/** Live earthbits.xyz: translate3d(0, y * travel, z * travel). */
export type ParallaxRate = { y: number; z: number };

/**
 * Live desktop (~1280) at scrollY 300. Transforms stay identity through
 * scrollY 100, then travel = scrollY − 100.
 *
 * `.hero-block` (title + role) drifts DOWN; framed cards drift UP.
 */
export const HERO_PARALLAX_KICKIN = 100;

export const HERO_PARALLAX = {
  block: { y: 0.295, z: 0.21 },
  left: { y: -0.125, z: 0.125 },
  middle: { y: -0.21, z: 0.125 },
  video: { y: -0.21, z: 0.21 },
} as const satisfies Record<string, ParallaxRate>;

export function heroParallaxTravel(scrollY: number) {
  return Math.max(0, scrollY - HERO_PARALLAX_KICKIN);
}

export function heroParallaxTransform(scrollY: number, rate: ParallaxRate) {
  const travel = heroParallaxTravel(scrollY);
  if (travel === 0) return "none";
  const y = travel * rate.y;
  const z = travel * rate.z;
  return `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px)`;
}
