// src/pages/FullPortfolioPage.tsx
import Navbar from "../components/layout/Navbar";
import ProofStrip from "../components/ProofStrip";
import Home from "./Home";
import Projects from "./Projects";
import Experience from "./Experience";
import Education from "./Education";
import About from "./About";
import Contact from "./Contact";

export default function FullPortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
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
