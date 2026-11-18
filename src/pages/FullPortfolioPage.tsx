// src/pages/FullPortfolioPage.tsx
import Navbar from "../components/layout/Navbar";
import ProofStrip from "../components/ProofStrip";
import SceneCanvas from "../components/SceneCanvas";
import { usePageMotion } from "../hooks/usePageMotion";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import Home from "./Home";
import Projects from "./Projects";
import Experience from "./Experience";
import Education from "./Education";
import About from "./About";
import Contact from "./Contact";

export default function FullPortfolioPage() {
  useSmoothScroll();
  usePageMotion();

  return (
    <>
      <SceneCanvas />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Home />
        <ProofStrip />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  );
}
