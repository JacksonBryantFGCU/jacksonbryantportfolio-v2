import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

/** gsap.matchMedia queries: motion only when the OS allows it, hover effects only with a mouse */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const FINE_POINTER = "(prefers-reduced-motion: no-preference) and (pointer: fine)";
export const DESKTOP_MOTION = "(prefers-reduced-motion: no-preference) and (min-width: 1024px)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The one Lenis instance, set by useSmoothScroll; null when motion is reduced
let lenis: Lenis | null = null;
export const getLenis = () => lenis;
export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

/** Stop page scrolling while a dialog is open, with or without Lenis */
export const lockScroll = (locked: boolean) => {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  } else {
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }
};
