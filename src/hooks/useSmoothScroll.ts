import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, getLenis, prefersReducedMotion, setLenis } from "../lib/motion";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Skipped entirely when the OS asks for reduced motion (native scrolling and anchors take over).
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Line breaks change once the web fonts arrive; re-measure every trigger
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    // In-page links: glide with Lenis, keep the URL hash, and move focus like a native jump would
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.hash.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      e.preventDefault();
      const offset = window.innerWidth >= 768 && id !== "home" ? -48 : 0;
      getLenis()?.scrollTo(target, { offset, duration: 1.4 });
      history.pushState(null, "", `#${id}`);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
}
