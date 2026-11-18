# Jackson Bryant Portfolio

Personal portfolio at [www.jacksonbryant.com](https://www.jacksonbryant.com). The visual theme is a LiDAR point cloud, a nod to my autonomous-driving research: a live Three.js scan landscape sits behind the page, with GSAP-driven scroll animations on top.

## Features
- Three.js point-cloud background (custom shaders), loaded lazily after the page is idle
- GSAP + ScrollTrigger + SplitText animations, with Lenis smooth scrolling
- Pre-rendered to static HTML at build time, so content shows before JavaScript runs
- Respects `prefers-reduced-motion`: no smooth scroll, no scroll animations, a still 3D frame
- Accessible project dialog built on native `<dialog>`, skip link, keyboard support

## Tech stack
- React 19 + TypeScript + Vite
- Tailwind CSS
- GSAP, Lenis, Three.js

## Local setup
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check, build, and pre-render dist/index.html
npm run lint
```

## Where things live
- `src/constants/index.ts`: all content (projects, experience, education)
- `src/three/pointCloud.ts`: the 3D scene
- `src/hooks/usePageMotion.ts`: every scroll and hover animation, driven by `data-*` attributes
- `src/hooks/useSmoothScroll.ts`: Lenis setup and in-page link handling
- `tailwind.config.js`: design tokens (colors, fonts, sizes)

## License
MIT
