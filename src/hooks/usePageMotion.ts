import { useEffect } from "react";
import { DESKTOP_MOTION, FINE_POINTER, MOTION_OK, ScrollTrigger, SplitText, gsap } from "../lib/motion";

const all = <T extends Element = HTMLElement>(selector: string) => gsap.utils.toArray<T>(selector);

/** Adds a listener and returns the function that removes it */
const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
  el.addEventListener(type, fn);
  return () => el.removeEventListener(type, fn);
};

/**
 * Every scroll and hover animation on the page, driven by data attributes in the markup.
 * Nothing here runs when the OS asks for reduced motion, so the static (pre-rendered) page is the fallback.
 * Setup waits until the browser is idle: splitting text and measuring ~45 triggers would otherwise
 * compete with hydration. Only content below the hero is affected, so nothing visibly changes.
 *
 *   data-reveal            fade up when scrolled into view (batched, staggered)
 *   data-split             heading lines rise from a mask
 *   data-scrub-words       words brighten as you scroll past
 *   data-hero-content      hero drifts up and fades as you leave it
 *   data-progress          the nav's scroll progress bar
 *   data-timeline          experience line draws itself; holds data-timeline-progress
 *   data-stack-card        featured projects stack and recede (desktop)
 *   data-magnetic          pulls toward the cursor (mouse only)
 *   data-tilt              tilts in 3D toward the cursor (mouse only)
 */
export function usePageMotion() {
  useEffect(() => {
    let ctx: gsap.Context | undefined;
    const setup = () => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(MOTION_OK, () => {
          gsap.set("[data-reveal]", { autoAlpha: 0, y: 40 });
          ScrollTrigger.batch("[data-reveal]", {
            start: "top 90%",
            once: true,
            onEnter: (els) =>
              gsap.to(els, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08, overwrite: true }),
          });

          all("[data-split]").forEach((el) => {
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              // Line spans don't change how the text reads, so leave the element's accessibility alone
              aria: "none",
              autoSplit: true,
              onSplit: (self) => {
                // Tight letter-spacing lets the last glyph overhang its line; give the mask room so it isn't clipped
                self.masks.forEach((mask) => gsap.set(mask, { paddingRight: "0.12em", marginRight: "-0.12em" }));
                return gsap.from(self.lines, {
                  yPercent: 110,
                  duration: 1.2,
                  ease: "power4.out",
                  stagger: 0.1,
                  scrollTrigger: { trigger: el, start: "top 88%", once: true },
                });
              },
            });
          });

          all("[data-scrub-words]").forEach((el) => {
            SplitText.create(el, {
              type: "words",
              aria: "none",
              autoSplit: true,
              onSplit: (self) =>
                gsap.fromTo(
                  self.words,
                  // 0.45 keeps even the dim words above 3:1 contrast for large text
                  { opacity: 0.45 },
                  {
                    opacity: 1,
                    ease: "none",
                    stagger: 0.1,
                    scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true },
                  },
                ),
            });
          });

          gsap.to("[data-hero-content]", {
            yPercent: -12,
            opacity: 0.15,
            ease: "none",
            scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
          });

          gsap.fromTo(
            "[data-progress]",
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
          );

          all("[data-timeline]").forEach((el) => {
            gsap.fromTo(
              el.querySelector("[data-timeline-progress]"),
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: true },
              },
            );
          });
        });

        // Featured projects pile up like cards: each one shrinks slightly as the next slides over it.
        // No dimming: a half-darkened card is what you'd see if you stopped scrolling mid-transition.
        mm.add(DESKTOP_MOTION, () => {
          const cards = all("[data-stack-card]");
          cards.forEach((card, i) => {
            const next = cards[i + 1];
            if (!next) return;
            gsap.to(card.querySelector("[data-stack-inner]"), {
              scale: 0.94,
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
            });
          });
        });

        mm.add(FINE_POINTER, () => {
          const cleanups: (() => void)[] = [];

          all("[data-magnetic]").forEach((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
            cleanups.push(
              on(el, "pointermove", (e) => {
                const r = el.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
                yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
              }),
              on(el, "pointerleave", () => {
                xTo(0);
                yTo(0);
              }),
            );
          });

          all("[data-tilt]").forEach((el) => {
            gsap.set(el, { transformPerspective: 1200 });
            const rxTo = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
            const ryTo = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
            cleanups.push(
              on(el, "pointermove", (e) => {
                const r = el.getBoundingClientRect();
                rxTo(((e.clientY - r.top) / r.height - 0.5) * -8);
                ryTo(((e.clientX - r.left) / r.width - 0.5) * 8);
              }),
              on(el, "pointerleave", () => {
                rxTo(0);
                ryTo(0);
              }),
            );
          });

          return () => cleanups.forEach((fn) => fn());
        });
      });
    };

    const idle = "requestIdleCallback" in window;
    const id = idle ? requestIdleCallback(setup, { timeout: 1500 }) : window.setTimeout(setup, 300);
    return () => {
      if (idle) cancelIdleCallback(id);
      else window.clearTimeout(id);
      ctx?.revert();
    };
  }, []);
}
