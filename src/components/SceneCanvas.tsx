import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

// Fixed 3D background for the whole page. Three.js loads as its own chunk after the page is on screen,
// so it never delays the content; if WebGL isn't available the gradient underneath is the background.
export default function SceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let stop: (() => void) | undefined;
    let cancelled = false;

    const start = () =>
      import("../three/pointCloud")
        .then(({ startPointCloud }) => {
          if (cancelled) return;
          stop = startPointCloud(canvas, {
            animate: !prefersReducedMotion(),
            onReady: () => {
              canvas.dataset.ready = "true";
            },
          });
        })
        .catch(() => {
          // No WebGL (or the chunk failed to load): keep the gradient
        });

    // Wait until the page has loaded and the main thread is free, so the scene never competes with the content
    const whenIdle = () => {
      if ("requestIdleCallback" in window) requestIdleCallback(start, { timeout: 3000 });
      else setTimeout(start, 1500);
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", whenIdle);
      stop?.();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_15%,rgba(47,111,237,0.2),transparent_70%)]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1500ms] data-[ready=true]:opacity-100"
      />
      {/* Darken the bottom of the viewport so text over the scene stays legible */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />
    </div>
  );
}
