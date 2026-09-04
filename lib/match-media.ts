export const DESKTOP_MQ = "(min-width: 768px)";
export const REDUCE_MOTION_MQ = "(prefers-reduced-motion: reduce)";

export function subscribeMatchMedia(query: string) {
  return (onStoreChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onStoreChange);
    return () => mq.removeEventListener("change", onStoreChange);
  };
}

export function matchesMedia(query: string) {
  return window.matchMedia(query).matches;
}
